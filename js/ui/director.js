/* The battle director: turns combat events into choreography.

   Combat resolves instantly in game/combat.js and hands back a list of
   events. The director plays them out in order on the fighters — the hero
   winds up, dashes in and swings; the blow lands at the moment the blade
   connects, with sparks, hit-stop and a flinch; the enemy answers with its
   own attack — and only shows the damage number and drains the HP bar when
   the hit actually lands.

   It runs on its own clock, which slows almost to a stop for a few frames on
   each impact (hit-stop) so blows feel heavy. */

import { drawAnimeHero } from '../art/anime/hero.js';
import {
  heroFrame, heroTimeline, stanceOf, blinkAt, runPose, climbPose, ABILITY_MOTION,
} from '../art/anime/hero-anim.js';
import { WEAPON_REACH } from '../art/anime/gear.js';
import { creatureFrame, creatureInfo, drawCreatureAnime } from '../art/anime/creatures.js';
import { Effects, elementOf } from '../art/anime/vfx.js';
import { rgba } from '../art/anime/cel.js';

/** World pixels per art unit for every fighter. */
export const UNIT = 1.08;

const HERO_BOX = { x: -130, y: -300, w: 380, h: 320 };
// A tighter canvas while standing still: less to clear, paint and composite.
const HERO_IDLE_BOX = { x: -92, y: -238, w: 236, h: 252 };
const CUTIN_MS = 1000;

function boxFor(size) {
  const pad = 46;
  return { x: size.x - pad, y: size.y - pad, w: size.w + pad * 2, h: size.h + pad + 30 };
}

function makeActor(side) {
  return {
    side, anim: 'idle', start: 0, opts: {}, phys: {}, move: [0, 0],
    canvas: document.createElement('canvas'), trail: [], ghosts: [], flash: 0,
    gone: false, alpha: 1, dissolve: 0,
  };
}

export class Director {
  constructor(hooks) {
    this.hooks = hooks;          // { floater, sfx, actual, onCutin }
    this.fx = new Effects();
    this.clock = 0;
    this.hitstopLeft = 0;        // real ms of hit-stop remaining
    this.queue = [];             // { at, fn }
    this.cursor = 0;
    this.shake = 0;
    this.zoom = 0;
    this.cutin = null;
    this.idleWaiters = [];
    this.hero = makeActor('player');
    this.enemy = makeActor('enemy');
    this.enemyName = null;
    this.shown = { player: 0, enemy: 0 };
    this.chip = { player: 0, enemy: 0 };
    this.heroPose = null;        // 'run' | 'climb' | null
    // Frame pacing: on a slow device each fighter repaints on alternate
    // frames ("on twos") while movement and effects stay at full rate.
    this.frameNo = 0;
    this.avgDt = 16;
    this.onTwos = false;
  }

  /* ---------------- set-up ---------------- */

  setEnemy(name, hp) {
    this.enemy = makeActor('enemy');
    this.enemyName = name;
    this.shown.enemy = hp;
    this.chip.enemy = hp;
  }

  clearEnemy() {
    this.enemyName = null;
  }

  setPlayerHp(hp) {
    this.shown.player = hp;
    this.chip.player = hp;
  }

  /** Where things stand, in world pixels. Updated by the scene each frame. */
  setLayout(layout) {
    this.layout = layout;       // { playerX, enemyX, floorY }
  }

  get busy() {
    return this.queue.length > 0 || this.clock < this.cursor || !!this.cutin;
  }

  /** Run `fn` once every queued animation has played. */
  whenIdle(fn, linger = 250) {
    this.idleWaiters.push({ fn, linger });
  }

  at(time, fn) {
    this.queue.push({ at: time, fn });
    this.queue.sort((a, b) => a.at - b.at);
  }

  play(actor, anim, opts = {}, start = this.clock) {
    actor.anim = anim;
    actor.start = start;
    actor.opts = opts;
    actor.trail.length = 0;
  }

  /* ---------------- clock ---------------- */

  update(dt) {
    dt = Math.min(dt, 50);
    this.frameNo++;
    this.avgDt = this.avgDt * 0.95 + dt * 0.05;
    if (!this.onTwos && this.avgDt > 21) this.onTwos = true;
    else if (this.onTwos && this.avgDt < 15) this.onTwos = false;
    const slow = this.hitstopLeft > 0 ? 0.06 : 1;
    this.hitstopLeft = Math.max(0, this.hitstopLeft - dt);
    this.clock += dt * slow;
    this.fx.update(dt * slow);
    while (this.queue.length && this.queue[0].at <= this.clock) {
      const { fn } = this.queue.shift();
      fn();
    }
    this.shake = Math.max(0, this.shake - dt * 0.004);
    this.zoom = Math.max(0, this.zoom - dt * 0.0006);
    this.hero.flash = Math.max(0, this.hero.flash - dt * 0.005);
    this.enemy.flash = Math.max(0, this.enemy.flash - dt * 0.005);
    if (this.cutin && this.clock - this.cutin.start > CUTIN_MS) this.cutin = null;

    // HP chip bars catch up with the shown value after a short delay.
    for (const side of ['player', 'enemy']) {
      const diff = this.shown[side] - this.chip[side];
      if (diff > 0) this.chip[side] = this.shown[side];
      else if (diff < 0) this.chip[side] = Math.max(this.shown[side], this.chip[side] - dt * 0.06 * Math.max(4, -diff));
    }

    if (!this.busy) {
      // Settle displayed HP to the truth once the show is over.
      const actual = this.hooks.actual();
      if (actual) {
        this.shown.player = actual.player;
        if (this.enemyName && actual.enemy != null && !this.enemy.dying) this.shown.enemy = actual.enemy;
      }
      if (this.idleWaiters.length) {
        const waiter = this.idleWaiters[0];
        waiter.since ??= this.clock;
        if (this.clock - waiter.since >= waiter.linger) {
          this.idleWaiters.shift();
          waiter.fn();
        }
      }
    }
  }

  hitstop(ms) {
    this.hitstopLeft = Math.max(this.hitstopLeft, ms);
  }

  /* ---------------- geometry ---------------- */

  enemyInfo() {
    return this.enemyName ? creatureInfo(this.enemyName) : null;
  }

  /** The enemy's body centre in world pixels (it faces left, toward the hero). */
  enemyCentre() {
    const info = this.enemyInfo();
    const { enemyX, floorY } = this.layout;
    if (!info) return [enemyX, floorY - 80];
    const s = info.size;
    const cx = s.x + s.w * 0.55;
    const cy = s.y + s.h * (info.hover ? 0.42 : 0.55);
    return [enemyX - (cx + this.enemy.move[0]) * UNIT, floorY + (cy + this.enemy.move[1]) * UNIT];
  }

  enemyTop() {
    const info = this.enemyInfo();
    return info ? -info.size.y * UNIT : 120;
  }

  heroCentre() {
    const { playerX, floorY } = this.layout;
    return [playerX + (6 + this.hero.move[0]) * UNIT, floorY + (-104 + this.hero.move[1]) * UNIT];
  }

  /** How far the hero dashes (art units) to land a blow with this weapon. */
  heroDashDistance(gear, kind) {
    const info = this.enemyInfo();
    const { playerX, enemyX } = this.layout;
    const front = info ? (info.size.x + info.size.w) * 0.8 : 60;
    const gap = (enemyX - playerX) / UNIT - front;
    const reach = kind === 'dash' ? 60 : 30 + (WEAPON_REACH[gear.main?.shape] || 40) * 0.85;
    return Math.max(0, gap - reach);
  }

  enemyDashDistance() {
    const info = this.enemyInfo();
    const { playerX, enemyX } = this.layout;
    const gap = (enemyX - playerX) / UNIT;
    return Math.max(0, gap - (info?.reach || 100) - 34);
  }

  /* ---------------- choreography ---------------- */

  /**
   * Queue a batch of combat events. `context` carries what the events alone
   * don't say: the hero's gear and role, and the enemy's max HP.
   */
  stage(events, context) {
    if (!events.length) return;
    const beats = [];
    let pendingEnergy = [];
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      if (e.type === 'energy') { pendingEnergy.push(e); continue; }
      if (e.type === 'attack' && e.side === 'player') {
        // Consecutive hits from one ability are one beat.
        const hits = [e];
        while (events[i + 1]?.type === 'attack' && events[i + 1].side === 'player' && events[i + 1].abilityId === e.abilityId && events[i + 1].hit > 0) hits.push(events[++i]);
        const after = [];
        while (events[i + 1]?.type === 'heal' && events[i + 1].side === 'player') after.push(events[++i]);
        beats.push({ kind: e.itemId ? 'throw' : 'ability', hits, after, energy: pendingEnergy });
        pendingEnergy = [];
        continue;
      }
      if (e.type === 'rest') { beats.push({ kind: 'rest', energy: pendingEnergy }); pendingEnergy = []; continue; }
      if ((e.type === 'attack' && e.side === 'enemy') || e.type === 'blocked' || e.type === 'dodged') {
        const after = [];
        while (events[i + 1]?.type === 'thorns') after.push(events[++i]);
        beats.push({ kind: 'enemy', event: e, after });
        continue;
      }
      beats.push({ kind: 'misc', event: e });
    }
    if (pendingEnergy.length) beats.push({ kind: 'misc', event: null, energy: pendingEnergy });

    let t = Math.max(this.clock, this.cursor);
    // A long backlog (fast clicking) is compressed rather than queued forever.
    if (t - this.clock > 2500) t = this.clock + 200;
    for (const beat of beats) t = this.scheduleBeat(beat, t, context);
    this.cursor = t;
  }

  scheduleBeat(beat, t, context) {
    const { floater, sfx } = this.hooks;
    const energy = beat.energy || [];
    for (const e of energy) this.at(t, () => floater('player', `+${e.amount} EN`, '#f4a63c', { small: true }));

    switch (beat.kind) {
      case 'ability': return this.scheduleAbility(beat, t, context);
      case 'throw': return this.scheduleThrow(beat, t, context);
      case 'rest': {
        this.at(t, () => {
          this.play(this.hero, 'rest');
          this.fx.magicCircle(this.clock, this.layout.playerX, this.layout.floorY, 'gold', 1100, 46);
          sfx('heal');
        });
        return t + 900;
      }
      case 'enemy': return this.scheduleEnemy(beat, t, context);
      default: {
        const e = beat.event;
        if (!e) return t + 100;
        this.at(t, () => this.applyMisc(e, context));
        if (e.type === 'victory') return t + 1300;
        if (e.type === 'defeat') return t + 1300;
        if (e.type === 'status-tick') return t + 380;
        if (e.type === 'revive') return t + 900;
        return t + 220;
      }
    }
  }

  scheduleAbility(beat, t, context) {
    const { gear, roleId } = context;
    const first = beat.hits[0];
    const motion = ABILITY_MOTION[first.abilityId] || { anim: 'melee', element: 'steel' };
    const stance = stanceOf(gear);
    const anim = motion.anim;
    const opts = { kind: motion.kind, dual: motion.dual };
    const timeline = heroTimeline(anim, stance, opts);
    const element = motion.element;
    const e = elementOf(element);
    let start = t;

    if (motion.ultimate) {
      this.at(t, () => {
        this.cutin = { start: this.clock, roleId, name: first.ability, element, gear };
        this.hooks.sfx('crit');
      });
      start = t + CUTIN_MS * 0.85;
    }

    const dist = anim === 'melee' || anim === 'dash' ? this.heroDashDistance(gear, anim) : 0;
    this.at(start, () => {
      this.play(this.hero, anim, { ...opts, dist, element, ghosts: anim === 'dash' || motion.ultimate, ultimate: !!motion.ultimate });
      if (anim === 'channel') this.fx.magicCircle(this.clock, this.layout.playerX + 6 * UNIT, this.layout.floorY, element, (timeline.release || 500) + 300, 58);
      if (anim === 'cast') this.fx.magicCircle(this.clock, this.layout.playerX + 6 * UNIT, this.layout.floorY, element, 600, 40);
    });

    // Projectiles and area effects leave at the release point.
    const hits = timeline.hits || [400];
    if (timeline.release != null) {
      const release = start + timeline.release;
      const flight = hits[0] - timeline.release;
      this.at(release, () => this.launch(element, anim, flight, motion.ultimate));
    }

    beat.hits.forEach((hit, i) => {
      const when = start + hits[Math.min(i, hits.length - 1)] + (i >= hits.length ? 140 * i : 0);
      this.at(when, () => this.landPlayerHit(hit, element, anim, motion.ultimate, context));
    });

    const end = start + timeline.duration;
    for (const heal of beat.after) {
      this.at(start + hits[hits.length - 1] + 200, () => {
        this.shown.player = Math.min(context.playerMax, this.shown.player + heal.amount);
        this.hooks.floater('player', `+${heal.amount}`, '#6fd66f');
        const [hx, hy] = this.heroCentre();
        this.fx.emit(hx, hy + 40, { count: 14, speed: [20, 80], colour: ['#9cff9c', '#e8ffe0'], kind: 'glow', life: [500, 900], size: [2, 4], up: 120, gravity: -60 });
        this.hooks.sfx('heal');
      });
    }
    return end - (anim === 'melee' || anim === 'dash' ? 140 : 80);
  }

  launch(element, anim, flight, ultimate) {
    const e = elementOf(element);
    const [hx, hy] = this.heroCentre();
    const [ex, ey] = this.enemyCentre();
    const from = [hx + 40 * UNIT, hy - 24 * UNIT];
    const now = this.clock;
    if (element === 'holy') {
      this.fx.pillar(now + flight - 160, ex, this.layout.floorY, 'holy', 760, ultimate ? 110 : 70);
      return;
    }
    if (element === 'nature' && anim !== 'cast') {
      this.fx.vines(now + flight - 200, ex, this.layout.floorY, '#4f8a3a', ultimate ? 7 : 5);
      this.fx.emit(ex, ey - 40, { count: 30, speed: [40, 180], colour: ['#ff9ec4', '#86d860', '#ffe680'], kind: 'petal', life: [700, 1400], size: [2, 3.5], gravity: 60, up: 60 });
      return;
    }
    if (element === 'nature') {
      this.fx.vines(now + flight - 160, ex, this.layout.floorY, '#4f8a3a', 3);
      return;
    }
    if (element === 'poison' && anim === 'channel') {
      this.fx.projectile(now, { from, to: [ex, ey], dur: flight, look: 'glob', colour: e.main, core: e.core, arc: 60 });
      this.fx.cloud(now + flight, ex, ey, e.main, 1000);
      return;
    }
    if (element === 'ink' && ultimate) {
      for (let i = 0; i < 6; i++) {
        this.fx.projectile(now + i * 40, { from: [from[0] - 20 + i * 8, from[1] - 80 - i * 10], to: [ex + (i - 3) * 10, ey + (i % 2) * 14], dur: flight - i * 20, look: 'orb', colour: e.main, core: e.core, trail: 'glyph' });
      }
      return;
    }
    const look = { fire: 'fireball', frost: 'ice', arcane: 'orb', ink: 'orb', shadow: 'orb', poison: 'glob' }[element] || 'orb';
    const big = ultimate || anim === 'channel';
    this.fx.projectile(now, { from, to: [ex, ey], dur: flight, look, colour: e.main, core: e.core, trail: element === 'ink' ? 'glyph' : 'glow', arc: element === 'poison' ? 40 : 0, scale: big ? 1.6 : 1 });
  }

  landPlayerHit(hit, element, anim, ultimate, context) {
    const { floater, sfx } = this.hooks;
    const [ex, ey] = this.enemyCentre();
    const power = (hit.crit ? 1.5 : 1) * (ultimate ? 1.6 : 1);
    this.fx.impact(this.clock, ex, ey, element, power, 1);
    if (anim === 'melee' || anim === 'dash') {
      this.fx.slash(this.clock, ex, ey, element, hit.hit ? 0.7 : -0.6, ultimate ? 1.5 : 1.05);
      if (ultimate && element === 'shadow') this.fx.slash(this.clock, ex, ey, element, 0.7, 1.5, 60);
      if (element === 'holy') this.fx.pillar(this.clock, ex, this.layout.floorY, 'holy', 600, 60);
      if (element === 'gold') this.fx.shockwave(this.clock, ex, this.layout.floorY, '#ffd56b', 1.2);
    }
    if (ultimate) {
      this.fx.add('ring', this.clock, { x: ex, y: ey, colour: elementOf(element).core, r0: 20, r1: 220, dur: 520, width: 10 });
      this.zoom = Math.max(this.zoom, 0.05);
    }
    this.shown.enemy = Math.max(0, this.shown.enemy - hit.amount);
    floater('enemy', `${hit.amount}`, hit.crit ? '#ffd05a' : '#ffffff', { crit: hit.crit, big: ultimate });
    this.enemy.flash = 1;
    this.shake = Math.max(this.shake, hit.crit || ultimate ? 1 : 0.55);
    this.hitstop(hit.crit || ultimate ? 120 : 70);
    if (hit.crit) this.zoom = Math.max(this.zoom, 0.035);
    hit.crit ? sfx('crit') : sfx('hit');
    if (this.shown.enemy <= 0) {
      this.enemy.dying = true;
      this.play(this.enemy, 'death');
    } else if (this.enemy.anim === 'idle' || this.enemy.anim === 'hurt') {
      this.play(this.enemy, 'hurt');
    }
    void context;
  }

  scheduleThrow(beat, t, context) {
    const stance = stanceOf(context.gear);
    const timeline = heroTimeline('throw', stance);
    const hit = beat.hits[0];
    this.at(t, () => this.play(this.hero, 'throw'));
    this.at(t + timeline.release, () => {
      const [hx, hy] = this.heroCentre();
      const [ex, ey] = this.enemyCentre();
      this.fx.projectile(this.clock, { from: [hx + 30, hy - 30], to: [ex, ey], dur: timeline.hits[0] - timeline.release, look: 'bomb', colour: '#ffcf5a', arc: 110 });
    });
    this.at(t + timeline.hits[0], () => {
      const [ex, ey] = this.enemyCentre();
      this.fx.impact(this.clock, ex, ey, 'fire', 1.6);
      this.fx.shockwave(this.clock, ex, this.layout.floorY, '#ffb04a', 1);
      this.shown.enemy = Math.max(0, this.shown.enemy - hit.amount);
      this.hooks.floater('enemy', `${hit.amount}`, '#ffb04a', { big: true });
      this.enemy.flash = 1;
      this.shake = 1;
      this.hitstop(90);
      this.hooks.sfx('crit');
      if (this.shown.enemy <= 0) { this.enemy.dying = true; this.play(this.enemy, 'death'); }
      else this.play(this.enemy, 'hurt');
    });
    return t + timeline.duration - 100;
  }

  scheduleEnemy(beat, t, context) {
    const info = this.enemyInfo();
    if (!info) return t;
    const { floater, sfx } = this.hooks;
    const e = beat.event;
    const attack = info.attack;
    const anim = attack.type === 'ranged' ? 'ranged' : 'melee';
    const dist = anim === 'melee' ? this.enemyDashDistance() : 0;
    const hitAt = anim === 'melee' ? 355 : 620;
    const release = 360;
    const stance = stanceOf(context.gear);

    this.at(t, () => {
      if (this.enemy.dying) return;
      this.play(this.enemy, anim, { dist });
      if (info.boss) this.fx.add('flash', this.clock, { x: this.enemyCentre()[0], y: this.enemyCentre()[1], colour: attack.colour, r: 120, dur: 300 });
    });
    if (anim === 'ranged') {
      this.at(t + release, () => this.launchEnemy(attack, hitAt - release));
    }
    if (e.type === 'dodged') {
      this.at(t + hitAt - 130, () => this.play(this.hero, 'dodge'));
      this.at(t + hitAt, () => {
        floater('player', 'MISS', '#9fd3e6', { small: true });
        sfx('select');
      });
    } else if (e.type === 'blocked') {
      this.at(t + hitAt - 60, () => this.play(this.hero, 'block'));
      this.at(t + hitAt, () => {
        const [hx, hy] = this.heroCentre();
        this.fx.add('ring', this.clock, { x: hx + 20, y: hy, colour: '#7ac0ff', r0: 30, r1: 90, dur: 360, width: 6 });
        this.fx.emit(hx + 30, hy, { count: 14, speed: [80, 260], angle: Math.PI, spread: 2, colour: ['#bfe0ff', '#ffffff'], kind: 'spark', life: [200, 400] });
        floater('player', 'WARD', '#7ac0ff', { small: true });
        this.shake = 0.4;
        this.hitstop(60);
        sfx('select');
      });
    } else {
      this.at(t + hitAt, () => {
        const [hx, hy] = this.heroCentre();
        this.enemyImpact(attack, hx, hy);
        if (e.shielded && stance.shield) this.play(this.hero, 'block');
        else this.play(this.hero, 'hurt');
        this.shown.player = Math.max(0, this.shown.player - e.amount);
        floater('player', `${e.amount}`, e.shielded ? '#9fc8ff' : '#ff6b6b', { label: e.shielded ? 'BLOCKED' : null });
        this.hero.flash = 0.9;
        this.shake = Math.max(this.shake, info.boss ? 1 : 0.7);
        this.hitstop(info.boss ? 100 : 70);
        sfx('hurt');
      });
    }
    let end = t + (anim === 'melee' ? 760 : 820);
    for (const thorns of beat.after) {
      this.at(t + hitAt + 120, () => {
        const [ex, ey] = this.enemyCentre();
        this.fx.impact(this.clock, ex, ey, 'nature', 0.6);
        this.shown.enemy = Math.max(0, this.shown.enemy - thorns.amount);
        floater('enemy', `${thorns.amount}`, '#f06b2a', { small: true, label: 'THORNS' });
        this.enemy.flash = 0.8;
        if (this.shown.enemy <= 0) { this.enemy.dying = true; this.play(this.enemy, 'death'); }
      });
      end += 60;
    }
    return end;
  }

  launchEnemy(attack, flight) {
    const info = this.enemyInfo();
    const { enemyX, floorY } = this.layout;
    const muzzle = info?.size ? (this.enemyName && attack.muzzle) : null;
    const from = muzzle
      ? [enemyX - (muzzle[0] + this.enemy.move[0]) * UNIT, floorY + muzzle[1] * UNIT]
      : this.enemyCentre();
    const [hx, hy] = this.heroCentre();
    const now = this.clock;
    const c = attack.colour;
    switch (attack.fx) {
      case 'wave':
        this.fx.wave(now, enemyX - 60, this.layout.playerX - 40, floorY + 6, c, flight + 140);
        break;
      case 'books':
        for (let i = 0; i < 4; i++) {
          this.fx.projectile(now + i * 50, { from: [from[0], from[1] - i * 12], to: [hx + (i - 2) * 6, hy + (i - 1.5) * 16], dur: flight - i * 30, look: 'book', colour: c, core: ['#8a2a3a', '#2a5a8a', '#3a7a4a', '#8a6a2a'][i], arc: 40 + i * 12 });
        }
        break;
      case 'spores':
      case 'toxic':
        this.fx.projectile(now, { from, to: [hx, hy], dur: flight, look: 'glob', colour: c, arc: 50 });
        this.fx.cloud(now + flight - 60, hx, hy, c, 900);
        break;
      case 'venom':
        this.fx.projectile(now, { from, to: [hx, hy], dur: flight, look: 'glob', colour: c, arc: 70 });
        break;
      case 'sonic':
      case 'wail':
        this.fx.projectile(now, { from, to: [hx, hy], dur: flight, look: 'sonic', colour: c });
        break;
      case 'darkbolt':
      default:
        this.fx.projectile(now, { from, to: [hx, hy], dur: flight, look: 'orb', colour: c, core: '#ffffff' });
    }
  }

  enemyImpact(attack, hx, hy) {
    const now = this.clock;
    const c = attack.colour;
    switch (attack.fx) {
      case 'bite':
      case 'snap':
        this.fx.add('slash', now, { x: hx, y: hy - 14, colour: '#ffffff', core: c, angle: Math.PI - 0.2, size: 0.5, dur: 220, thin: true });
        this.fx.add('slash', now + 40, { x: hx, y: hy + 14, colour: '#ffffff', core: c, angle: 0.2, size: 0.5, dur: 220, thin: true });
        this.fx.impact(now, hx, hy, 'blood', 0.8, -1);
        break;
      case 'claw':
        this.fx.claws(now, hx, hy, c, -1);
        this.fx.impact(now, hx, hy, 'blood', 0.7, -1);
        break;
      case 'slam':
      case 'smash':
        this.fx.shockwave(now, hx, this.layout.floorY, c, 1.1);
        this.fx.impact(now, hx, hy, 'steel', 1.1, -1);
        break;
      case 'thrust':
        this.fx.add('streaks', now, { x: hx, y: hy, colour: c, core: '#ffffff', r: 80, dur: 220, count: 6, seed: 1 });
        this.fx.impact(now, hx, hy, 'steel', 1, -1);
        break;
      case 'wave':
        this.fx.impact(now, hx, hy, 'water', 1.2, -1);
        this.fx.emit(hx, this.layout.floorY - 10, { count: 24, speed: [60, 240], angle: -Math.PI / 2, spread: 2.4, colour: ['#bfe8ff', '#7fd1ff', '#ffffff'], kind: 'drop', life: [400, 800], size: [1.6, 3.4], gravity: 600 });
        break;
      case 'spores':
      case 'toxic':
      case 'venom':
        this.fx.impact(now, hx, hy, 'poison', 0.9, -1);
        break;
      case 'books':
        this.fx.impact(now, hx, hy, 'arcane', 1.1, -1);
        break;
      default:
        this.fx.impact(now, hx, hy, 'shadow', 0.9, -1);
    }
  }

  applyMisc(e, context) {
    const { floater, sfx } = this.hooks;
    switch (e.type) {
      case 'heal': {
        const side = e.side === 'enemy' ? 'enemy' : 'player';
        const max = side === 'enemy' ? context.enemyMax : context.playerMax;
        this.shown[side] = Math.min(max || Infinity, this.shown[side] + e.amount);
        floater(side, `+${e.amount}`, '#6fd66f');
        const [x, y] = side === 'enemy' ? this.enemyCentre() : this.heroCentre();
        this.fx.emit(x, y + 40, { count: 12, speed: [20, 70], colour: ['#9cff9c', '#e8ffe0'], kind: 'glow', life: [500, 900], size: [2, 4], up: 110, gravity: -60 });
        if (side === 'player') sfx('heal');
        break;
      }
      case 'status-tick': {
        const side = e.side === 'enemy' ? 'enemy' : 'player';
        const colour = this.hooks.statusColour(e.status);
        this.shown[side] = Math.max(0, this.shown[side] - e.amount);
        floater(side, `${e.amount}`, colour, { small: true });
        const [x, y] = side === 'enemy' ? this.enemyCentre() : this.heroCentre();
        const element = { burn: 'fire', poison: 'poison', bleed: 'blood' }[e.status] || 'shadow';
        this.fx.impact(this.clock, x, y, element, 0.45);
        if (side === 'enemy') {
          this.enemy.flash = 0.6;
          if (this.shown.enemy <= 0) { this.enemy.dying = true; this.play(this.enemy, 'death'); }
          else this.play(this.enemy, 'hurt');
        } else {
          this.hero.flash = 0.6;
        }
        break;
      }
      case 'revive': {
        floater('player', 'REVIVED', '#f2c14e', { big: true });
        this.fx.pillar(this.clock, this.layout.playerX, this.layout.floorY, 'holy', 900, 90);
        this.shown.player = e.hp ?? this.shown.player;
        this.play(this.hero, 'victory');
        this.at(this.clock + 700, () => this.play(this.hero, 'idle'));
        sfx('levelUp');
        break;
      }
      case 'victory': {
        if (!this.enemy.dying) { this.enemy.dying = true; this.play(this.enemy, 'death'); }
        this.at(this.clock + 500, () => this.play(this.hero, 'victory'));
        sfx('loot');
        break;
      }
      case 'defeat': {
        this.play(this.hero, 'defeat');
        sfx('death');
        break;
      }
      default:
        break;
    }
  }

  /* ---------------- rendering ---------------- */

  /** Render the hero into its offscreen canvas; returns what the scene needs to place it. */
  renderHero(roleId, gear, res, now) {
    const actor = this.hero;
    const stance = stanceOf(gear);
    let pose;
    let move = [0, 0];
    let timeline = null;
    if (this.heroPose === 'run') pose = runPose(stance, now);
    else if (this.heroPose === 'climb') pose = climbPose(stance, now);
    else {
      const frame = heroFrame(actor.anim, this.clock - actor.start, stance, this.clock, actor.opts);
      if (frame.done && actor.anim !== 'idle') { actor.anim = 'idle'; actor.opts = {}; }
      pose = frame.pose;
      move = frame.move;
      timeline = frame.timeline;
    }
    actor.move = move;
    const box = actor.anim === 'idle' && this.heroPose !== 'climb' ? HERO_IDLE_BOX : HERO_BOX;
    const s = this.paint(actor, box, res, (ctx) => drawAnimeHero(ctx, roleId, gear, pose, {
      now: this.clock, phys: actor.phys, offset: move, blink: blinkAt(this.clock, 3),
    }));
    // Remember the blade's path for the slash trail.
    const ms = this.clock - actor.start;
    const swinging = timeline?.hits?.some(h => ms > h - 85 && ms < h + 70);
    if (s?.tip && swinging && (actor.anim === 'melee' || actor.anim === 'dash')) {
      const { playerX, floorY } = this.layout;
      const world = (p) => [playerX + (move[0] + p[0]) * UNIT, floorY + (move[1] + p[1]) * UNIT];
      const along = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
      actor.trail.push({ t: this.clock, tip: world(s.tip), base: world(along(s.handN, s.tip, 0.35)) });
      if (s.tipOff) actor.trail.push({ t: this.clock, tip: world(s.tipOff), base: world(along(s.handF, s.tipOff, 0.35)), off: true });
    }
    actor.trail = actor.trail.filter(p => this.clock - p.t < 130);
    // Afterimages while dashing.
    if (actor.opts.ghosts && Math.abs(move[0]) > 2) {
      const last = actor.ghosts[actor.ghosts.length - 1];
      if (!last || this.clock - last.t > 35) actor.ghosts.push({ t: this.clock, move: [...move] });
    }
    actor.ghosts = actor.ghosts.filter(g => this.clock - g.t < 220);
    return { actor, box: actor.paintedBox || box, move };
  }

  renderEnemy(res, name = this.enemyName, actor = this.enemy) {
    const info = creatureInfo(name);
    if (!info) return null;
    const frame = creatureFrame(name, actor.anim, this.clock - actor.start, this.clock, actor.opts);
    if (frame.done && actor.anim !== 'idle' && actor.anim !== 'death') { actor.anim = 'idle'; actor.opts = {}; }
    const a = { ...frame.a, phys: actor.phys, offset: frame.move };
    actor.move = frame.move;
    if (actor.anim === 'death') {
      const ms = this.clock - actor.start;
      actor.dissolve = Math.max(0, Math.min(1, (ms - 350) / 650));
      if (ms > 1100) actor.gone = true;
      if (ms > 350 && ms < 1000 && Math.random() < 0.8) {
        const [cx, cy] = this.enemyCentre();
        const s = info.size;
        this.fx.emit(cx + (Math.random() - 0.5) * s.w * UNIT * 0.7, cy + (Math.random() - 0.5) * s.h * UNIT * 0.6, {
          count: 2, speed: [10, 50], colour: [info.attack.colour, '#ffffff'], kind: 'glow', life: [500, 900], size: [1.5, 3.5], up: 80, gravity: -40,
        });
      }
    }
    const box = boxFor(info.size);
    this.paint(actor, box, res, (ctx) => drawCreatureAnime(ctx, name, a));
    return { actor, box: actor.paintedBox || box, move: frame.move, info };
  }

  paint(actor, box, res, draw) {
    if (this.onTwos && actor.painted && (this.frameNo + (actor.side === 'enemy' ? 1 : 0)) % 2) return actor.lastPaint;
    actor.painted = true;
    actor.paintedBox = box;
    res = Math.min(res, 2.2);
    const k = UNIT * res;
    const cw = Math.max(1, Math.ceil(box.w * k));
    const ch = Math.max(1, Math.ceil(box.h * k));
    const canvas = actor.canvas;
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    ctx.setTransform(k, 0, 0, k, -box.x * k, -box.y * k);
    let out = null;
    try { out = draw(ctx); } catch (err) { console.error(err); }
    actor.lastPaint = out;
    actor.res = res;
    return out;
  }

  /** The slash trail behind a swinging blade, in world space. */
  drawTrail(ctx, element) {
    const pts = this.hero.trail;
    if (pts.length < 2) return;
    const e = elementOf(element || this.hero.opts.element || 'steel');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const off of [false, true]) {
      const list = pts.filter(p => !!p.off === off);
      for (let i = 1; i < list.length; i++) {
        const a = list[i - 1];
        const b = list[i];
        const speed = Math.hypot(b.tip[0] - a.tip[0], b.tip[1] - a.tip[1]);
        if (speed < 6) continue;
        const age = (this.clock - b.t) / 130;
        ctx.fillStyle = rgba(e.main, 0.55 * (1 - age));
        ctx.beginPath();
        ctx.moveTo(...a.base);
        ctx.lineTo(...a.tip);
        ctx.lineTo(...b.tip);
        ctx.lineTo(...b.base);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = rgba(e.core, 0.9 * (1 - age));
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(...a.tip);
        ctx.lineTo(...b.tip);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /**
   * The ultimate cut-in: a slanted band across the scene with the hero's
   * face, speed lines and the ability's name. Drawn in view space.
   */
  drawCutin(ctx, viewW, viewH, fonts) {
    const c = this.cutin;
    if (!c) return;
    const age = this.clock - c.start;
    const f = age / CUTIN_MS;
    if (f >= 1) return;
    const e = elementOf(c.element);
    const slide = f < 0.18 ? 1 - Math.pow(1 - f / 0.18, 3) : f > 0.82 ? 1 - (f - 0.82) / 0.18 : 1;
    const bandH = 150;
    const cy = viewH * 0.42;
    ctx.save();
    // Dim the scene.
    ctx.fillStyle = `rgba(6,8,14,${0.45 * slide})`;
    ctx.fillRect(0, 0, viewW, viewH);
    ctx.translate(viewW / 2, cy);
    ctx.rotate(-0.08);
    ctx.translate(-viewW / 2, 0);
    const x0 = -viewW * (1 - slide);
    ctx.beginPath();
    ctx.rect(x0 - 40, -bandH / 2, viewW + 80, bandH);
    ctx.save();
    ctx.clip();
    const g = ctx.createLinearGradient(0, -bandH / 2, 0, bandH / 2);
    g.addColorStop(0, e.dark);
    g.addColorStop(0.5, rgba(e.main, 0.95));
    g.addColorStop(1, e.dark);
    ctx.fillStyle = g;
    ctx.fillRect(x0 - 40, -bandH / 2, viewW + 80, bandH);
    // Speed lines.
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 26; i++) {
      const y = ((i * 37) % bandH) - bandH / 2;
      const len = 120 + (i * 53) % 220;
      const x = ((i * 211 + age * 2.2) % (viewW + 400)) - 200;
      ctx.strokeStyle = rgba(e.core, 0.18 + (i % 3) * 0.08);
      ctx.lineWidth = 1 + (i % 3);
      ctx.beginPath();
      ctx.moveTo(viewW - x, y);
      ctx.lineTo(viewW - x - len, y);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    // The hero's face, large.
    ctx.save();
    const k = 3.1;
    ctx.translate(x0 + viewW * 0.3 + age * 0.02, 480);
    ctx.scale(k, k);
    try {
      drawAnimeHero(ctx, c.roleId, c.gear, { ...HERO_CUTIN_POSE }, { now: this.clock, face: f < 0.5 ? 'fierce' : 'shout' });
    } catch (err) { console.error(err); }
    ctx.restore();
    ctx.restore();
    // Edges.
    ctx.strokeStyle = e.core;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x0 - 40, -bandH / 2); ctx.lineTo(x0 + viewW + 40, -bandH / 2);
    ctx.moveTo(x0 - 40, bandH / 2); ctx.lineTo(x0 + viewW + 40, bandH / 2);
    ctx.stroke();
    // The ability's name.
    const textX = viewW * 0.56 + (1 - slide) * 200;
    ctx.textAlign = 'left';
    ctx.font = `800 13px ${fonts.body}`;
    ctx.fillStyle = rgba(e.core, 0.9 * slide);
    ctx.fillText('ULTIMATE', textX, -22);
    ctx.font = `700 44px ${fonts.display}`;
    ctx.lineWidth = 6;
    ctx.strokeStyle = rgba(e.dark, 0.9 * slide);
    ctx.strokeText(c.name, textX, 24);
    ctx.fillStyle = rgba('#ffffff', slide);
    ctx.fillText(c.name, textX, 24);
    ctx.restore();
  }
}

/* A three-quarter bust pose for the cut-in: leaning in, weapon raised. */
const HERO_CUTIN_POSE = {
  x: 0, y: 0, lean: 0.12, neck: 0.05, head: -0.05,
  hand: [30, -40], off: [24, -10], footN: [-14, 0], footF: [14, 0], liftN: 0, liftF: 0,
  w: -70, wo: -30, face: 'fierce',
};

