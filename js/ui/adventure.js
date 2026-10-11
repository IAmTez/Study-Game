/* The adventure screen: a side-on battle scene on canvas, with the question
   and action panels beneath it.

   There is no free movement. A floor is a run of stages; clearing one pans the
   camera to the next, and clearing the last pans to the ladder and climbs to
   the floor above. The scene owns the camera and the animation loop; all the
   combat rules live in game/combat.js. */

import {
  el, panel, button, toast, modal, closeModal, itemIcon, rarityClass,
  isModalOpen, setChildren,
} from './dom.js';
import { go } from './screens.js';
import { renderArt, pixelRatio } from '../art/render.js';
import { gearLooks } from '../art/gear.js';
import {
  buildBackdrop, drawBackdrop, drawLadder, SCENE_W, SCENE_H, FLOOR_Y,
} from '../art/backdrop.js';
import { gradingFeedback, VERDICT } from '../game/grading.js';
import { sourceLabel } from '../data/questions/past.js';
import { PAST_PAPER_CREDIT } from '../data/questions/index.js';
import {
  PHASE, startCombat, selectQuestion, submitAnswer, continueFromResult,
  availableAbilities, useAbility, useItemInCombat, useHintOn, drainEvents, statusInfo,
} from '../game/combat.js';
import {
  ensureFloor, currentStage, clearStage, descend, openTreasure, useShrine,
  isFinalStage, isBossFloor,
} from '../game/stages.js';
import {
  game, derived, inventoryEntries, saveRun, saveMeta, endRun, MAX_ENERGY,
} from '../game/state.js';
import { sfx } from '../core/audio.js';

const DIFFICULTY_LABEL = ['', 'Recall', 'Basic', 'Applied', 'Analysis', 'Evaluation'];

const DISPLAY_FONT = "'Cinzel', Georgia, serif";
const BODY_FONT = "'Nunito', 'Segoe UI', system-ui, sans-serif";

/** "HSC 2024 Q7" for a question taken from a past paper; nothing otherwise. */
function sourceTag(q) {
  if (!q.source) return null;
  return el('span', {
    className: 'q-source',
    title: PAST_PAPER_CREDIT,
    text: `${sourceLabel(q.source)}${q.source.drill ? ' · thesis drill' : ''}`,
  });
}

/** A table or description the question refers to, laid out as on the paper. */
function stimulusBlock(q) {
  return q.stimulus ? el('pre', { className: 'q-stimulus', text: q.stimulus }) : null;
}

const PLAYER_X = 300;   // offsets within a stage slot
const ENEMY_X = 810;
const PAN_MS = 1100;
const CLIMB_MS = 1500;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function adventureScreen() {
  const run = game.run;
  if (!run) { go('menu'); return {}; }

  let floorState = ensureFloor(run);
  let backdrop = buildBackdrop(floorState.biome, `${run.seed}:${run.floor}`);

  const canvas = el('canvas', { id: 'scene-canvas', width: SCENE_W, height: SCENE_H });
  const ctx = canvas.getContext('2d');

  /* The scene is drawn in world units SCENE_H tall. The canvas takes whatever
     size its box has and the world is scaled to that height, so a wide window
     simply sees more of the tunnel either side rather than black bars. */
  const view = { w: SCENE_W, h: SCENE_H, k: 1, dpr: 1 };

  function resizeCanvas() {
    const box = canvas.parentElement;
    if (!box) return;
    const w = Math.max(320, Math.floor(box.clientWidth));
    const h = Math.max(170, Math.floor(box.clientHeight));
    // Draw at the screen's real pixel density so the vector art stays sharp.
    view.dpr = pixelRatio();
    const dw = Math.round(w * view.dpr);
    const dh = Math.round(h * view.dpr);
    if (canvas.width !== dw || canvas.height !== dh) {
      canvas.width = dw;
      canvas.height = dh;
    }
    view.k = h / SCENE_H;
    view.h = SCENE_H;
    const previous = view.w;
    view.w = w / view.k;

    /* The console's height settles after webfonts load, which changes how much
       world fits on screen. Re-centre on the current stage whenever that
       happens, or the fighters drift toward the edges. */
    if (Math.abs(view.w - previous) > 1 && camera.mode === 'idle' && floorState) {
      camera.x = stageCam(floorState.index);
    }
  }

  /** Camera x that centres stage `i`'s slot in the current view. */
  function stageCam(i) {
    return i * SCENE_W - (view.w - SCENE_W) / 2;
  }

  const hud = el('div', { className: 'hud-strip grow' });
  const main = el('div', { className: 'col gap-sm grow' });
  const sidebar = el('div', { className: 'col gap-sm' });
  const logBox = el('div', { className: 'log' });

  /* ------------------------------------------------------------
     Scene state
     ------------------------------------------------------------ */

  const camera = { x: 0, y: 0, mode: 'idle', from: 0, to: 0, started: 0 };
  const fx = { player: { lunge: 0, shake: 0, flash: 0 }, enemy: { lunge: 0, shake: 0, flash: 0 } };
  const floaters = [];
  let combat = null;
  let raf = null;
  let banner = null;

  const stageOriginX = () => floorState.index * SCENE_W;
  const stageCamX = () => stageCam(floorState.index);

  function showBanner(text, sub = '') {
    banner = { text, sub, born: performance.now() };
  }

  /* ------------------------------------------------------------
     Drawing
     ------------------------------------------------------------ */

  /* Fighters are vector drawings, re-rendered every frame (they breathe,
     sway and swing) into one offscreen canvas per side at device resolution,
     then composited with a shadow, a reflection and the hit flash. */
  const FIGHTER_UNIT = 0.9;       // world pixels per art unit
  const fighterCanvas = { player: document.createElement('canvas'), enemy: document.createElement('canvas') };

  function renderFighter(side, name, time, extra = {}) {
    const opts = side === 'player'
      ? { gear: gearLooks(run.equipped), pose: { t: time, swing: fx.player.lunge, ...extra } }
      : { t: time, animated: true };
    return renderArt(name, FIGHTER_UNIT, view.k * view.dpr, { ...opts, animated: true }, fighterCanvas[side]);
  }

  function drawFighter(name, worldX, side, time, alive = true) {
    const shake = fx[side].shake > 0 ? (Math.random() - 0.5) * 10 : 0;
    const lunge = fx[side].lunge * (side === 'player' ? 34 : -34);
    const bob = Math.sin(time * 0.0022 + (side === 'player' ? 0 : 1.7)) * 2;

    const art = renderFighter(side, name, time);
    const flip = side === 'enemy';
    // Enemies are drawn facing right and mirrored to face the player.
    const originX = flip ? art.w - art.originX : art.originX;
    const x = worldX - camera.x + lunge + shake - originX;
    const y = FLOOR_Y - art.originY + bob - camera.y;

    if (x < -art.w || x > view.w + art.w) return;

    const blit = (dx, dy) => {
      if (flip) {
        ctx.save();
        ctx.translate(dx + art.w, dy);
        ctx.scale(-1, 1);
        ctx.drawImage(art.canvas, 0, 0, art.w, art.h);
        ctx.restore();
      } else {
        ctx.drawImage(art.canvas, dx, dy, art.w, art.h);
      }
    };

    // Contact shadow grounds the figure on the walkway.
    ctx.save();
    ctx.globalAlpha = 0.38;
    const shadow = ctx.createRadialGradient(x + originX, FLOOR_Y - camera.y + 4, 2, x + originX, FLOOR_Y - camera.y + 4, 60);
    shadow.addColorStop(0, 'rgba(0,0,0,0.9)');
    shadow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(x + originX, FLOOR_Y - camera.y + 4, Math.min(70, art.w * 0.4), 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Reflection in the channel: flipped, faded and squashed.
    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.translate(0, (FLOOR_Y - camera.y) * 2 + 16);
    ctx.scale(1, -1);
    blit(x, y + bob * 2);
    ctx.restore();

    ctx.save();
    if (!alive) ctx.globalAlpha = 0.35;
    blit(x, y);
    ctx.restore();

    if (fx[side].flash > 0) {
      ctx.save();
      ctx.globalAlpha = fx[side].flash * 0.7;
      ctx.globalCompositeOperation = 'lighter';
      blit(x, y);
      ctx.restore();
    }
  }

  /**
   * During the climb the player holds station on screen while the shaft scrolls
   * past, so they read as ascending rather than being left behind.
   */
  function drawClimbingPlayer(ladderWorldX, time) {
    const art = renderFighter('player', derived(run).role.sprite, time, { climb: true });
    const clamber = Math.sin(time * 0.009) * 4;
    const x = ladderWorldX - camera.x - art.originX;
    const y = SCENE_H * 0.60 - art.h / 2 + clamber;
    ctx.drawImage(art.canvas, x, y, art.w, art.h);
  }

  /**
   * Battle info box. Each fighter's box sits on that fighter's own side —
   * player left, enemy right — so at a glance the bar you are reading clearly
   * belongs to the character beneath it.
   */
  /** A rounded-rectangle path on the scene context. */
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawInfoBox(x, y, w, name, hp, maxHp, sub, accent, energy = null) {
    const h = energy == null ? 64 : 88;
    ctx.save();
    // Glassy panel with a coloured rim on the side facing the fighter.
    roundRect(x, y, w, h, 12);
    const bg = ctx.createLinearGradient(0, y, 0, y + h);
    bg.addColorStop(0, 'rgba(26,34,49,0.92)');
    bg.addColorStop(1, 'rgba(12,16,24,0.92)');
    ctx.fillStyle = bg;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 3;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255,236,190,0.16)';
    ctx.stroke();
    roundRect(x, y, 5, h, 3);
    ctx.fillStyle = accent;
    ctx.fill();

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f1e6c8';
    ctx.font = `700 17px ${DISPLAY_FONT}`;
    ctx.fillText(name.length > 24 ? name.slice(0, 23) + '…' : name, x + 16, y + 23);

    if (sub) {
      ctx.font = `800 12px ${BODY_FONT}`;
      const tw = ctx.measureText(sub).width;
      roundRect(x + w - 16 - tw - 14, y + 9, tw + 14, 18, 9);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.fillText(sub, x + w - 16 - tw - 7, y + 22);
    }

    const barY = y + 32;
    const barW = w - 30;
    const ratio = Math.max(0, Math.min(1, hp / maxHp));
    roundRect(x + 16, barY, barW, 12, 6);
    ctx.fillStyle = '#0b1017';
    ctx.fill();
    if (ratio > 0) {
      roundRect(x + 16, barY, Math.max(12, barW * ratio), 12, 6);
      const fill = ctx.createLinearGradient(0, barY, 0, barY + 12);
      const [top, bottom] = ratio > 0.5 ? ['#8be09b', '#2f9a52'] : ratio > 0.2 ? ['#ffd27a', '#e08a1e'] : ['#ff8a8f', '#d23b45'];
      fill.addColorStop(0, top);
      fill.addColorStop(1, bottom);
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.fillStyle = '#cfd6e0';
    ctx.font = `800 12px ${BODY_FONT}`;
    ctx.fillText(`${Math.ceil(hp)} / ${maxHp} HP`, x + 16, barY + 27);

    if (energy != null) {
      /* Energy is a small integer pool, so discrete pips read far faster than
         a continuous bar — you can count what an ability costs at a glance. */
      const eY = y + 66;
      ctx.fillStyle = '#f4a63c';
      ctx.font = `800 12px ${BODY_FONT}`;
      ctx.fillText('EN', x + 16, eY + 10);
      const pipW = 7;
      const gap = 2.5;
      for (let i = 0; i < MAX_ENERGY; i++) {
        const px = x + 42 + i * (pipW + gap);
        roundRect(px, eY, pipW, 12, 2.5);
        ctx.fillStyle = i < energy ? '#f4a63c' : '#1b222c';
        ctx.fill();
        if (i < energy) { ctx.strokeStyle = 'rgba(255,216,138,0.8)'; ctx.lineWidth = 1; ctx.stroke(); }
      }
      ctx.fillStyle = '#f1e6c8';
      ctx.fillText(String(energy), x + 42 + MAX_ENERGY * (pipW + gap) + 6, eY + 10);
    }
    ctx.restore();
  }

  function drawStageProp(stage, originX) {
    if (!stage) return;
    const palette = backdrop.palette;
    const res = view.k * view.dpr;
    if (stage.kind === 'treasure') {
      const art = renderArt(stage.opened ? 'chest_open' : 'chest', 1.6, res);
      const x = originX + ENEMY_X - camera.x - art.w / 2;
      ctx.drawImage(art.canvas, x, FLOOR_Y - art.h + 4 - camera.y, art.w, art.h);
    } else if (stage.kind === 'shrine') {
      const art = renderArt('altar', 1.8, res);
      const x = originX + ENEMY_X - camera.x - art.w / 2;
      const y = FLOOR_Y - art.h + 4 - camera.y;
      ctx.save();
      if (!stage.used) {
        const glow = ctx.createRadialGradient(x + art.w / 2, y + 20, 4, x + art.w / 2, y + 20, 120);
        glow.addColorStop(0, palette.light);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - 120, y - 100, art.w + 240, 260);
      }
      ctx.globalAlpha = stage.used ? 0.5 : 1;
      ctx.drawImage(art.canvas, x, y, art.w, art.h);
      ctx.restore();
    }
  }

  function drawFloaters(now) {
    ctx.save();
    ctx.font = `800 22px ${BODY_FONT}`;
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    for (let i = floaters.length - 1; i >= 0; i--) {
      const f = floaters[i];
      const age = (now - f.born) / 900;
      if (age >= 1) { floaters.splice(i, 1); continue; }
      ctx.globalAlpha = 1 - age * age;
      const fy = f.y - age * 46 - camera.y;
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(0,0,0,0.75)';
      ctx.strokeText(f.text, f.x - camera.x, fy);
      ctx.fillStyle = f.colour;
      ctx.fillText(f.text, f.x - camera.x, fy);
    }
    ctx.restore();
  }

  function drawBanner(now) {
    if (!banner) return;
    const age = now - banner.born;
    if (age > 2600) { banner = null; return; }
    const alpha = age < 300 ? age / 300 : age > 2200 ? (2600 - age) / 400 : 1;
    ctx.save();
    ctx.globalAlpha = alpha;
    const bandH = banner.sub ? 78 : 56;
    const band = ctx.createLinearGradient(0, 0, view.w, 0);
    band.addColorStop(0, 'rgba(8,11,16,0)');
    band.addColorStop(0.2, 'rgba(8,11,16,0.85)');
    band.addColorStop(0.8, 'rgba(8,11,16,0.85)');
    band.addColorStop(1, 'rgba(8,11,16,0)');
    ctx.fillStyle = band;
    ctx.fillRect(0, 150, view.w, bandH);
    const rule = ctx.createLinearGradient(0, 0, view.w, 0);
    rule.addColorStop(0, 'rgba(240,199,94,0)');
    rule.addColorStop(0.5, 'rgba(240,199,94,0.85)');
    rule.addColorStop(1, 'rgba(240,199,94,0)');
    ctx.fillStyle = rule;
    ctx.fillRect(0, 150, view.w, 1.5);
    ctx.fillRect(0, 150 + bandH - 1.5, view.w, 1.5);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f0c75e';
    ctx.font = `700 28px ${DISPLAY_FONT}`;
    ctx.fillText(banner.text, view.w / 2, 186);
    if (banner.sub) {
      ctx.fillStyle = '#b8c2d0';
      ctx.font = `600 15px ${BODY_FONT}`;
      ctx.fillText(banner.sub, view.w / 2, 212);
    }
    ctx.restore();
  }

  /** Rebuild the backdrop when the screen's pixel density changes a lot. */
  function ensureBackdropResolution() {
    const want = Math.max(1, Math.min(2.5, view.k * view.dpr));
    if (Math.abs((backdrop.res || 1) - want) > 0.3) {
      backdrop = buildBackdrop(floorState.biome, `${run.seed}:${run.floor}`, SCENE_W, SCENE_H, want);
    }
  }

  function draw(now) {
    resizeCanvas();
    ensureBackdropResolution();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(view.k * view.dpr, 0, 0, view.k * view.dpr, 0, 0);
    drawBackdrop(ctx, backdrop, camera.x, now, view.w, view.h, camera.y);

    // The ladder lives one slot past the final stage.
    const ladderWorldX = floorState.stages.length * SCENE_W + SCENE_W / 2;
    if (Math.abs(ladderWorldX - camera.x - SCENE_W / 2) < SCENE_W * 1.5) {
      drawLadder(ctx, backdrop.palette, ladderWorldX - camera.x, camera.y);
    }

    // Draw the current stage and its neighbour so panning shows both.
    for (let i = Math.max(0, floorState.index - 1); i <= Math.min(floorState.stages.length - 1, floorState.index + 1); i++) {
      const stage = floorState.stages[i];
      const originX = i * SCENE_W;
      if (Math.abs(originX - camera.x) > SCENE_W * 1.8) continue;
      drawStageProp(stage, originX);
      if (stage.kind === 'combat' && i === floorState.index && combat) {
        drawFighter(combat.enemy.sprite, originX + ENEMY_X, 'enemy', now, combat.enemy.hp > 0);
      } else if (stage.kind === 'combat' && !stage.cleared && stage.enemy.hp > 0) {
        drawFighter(stage.enemy.sprite, originX + ENEMY_X, 'enemy', now);
      }
    }

    if (camera.mode === 'climbing') {
      drawClimbingPlayer(ladderWorldX, now);
    } else {
      drawFighter(derived(run).role.sprite, stageOriginX() + PLAYER_X, 'player', now);
    }

    const stats = derived(run);
    const boxW = 372;
    if (combat && combat.enemy.hp > 0 && camera.mode === 'idle') {
      // Enemy is on the right of the scene, so its box is too.
      drawInfoBox(view.w - boxW - 26, 22, boxW, combat.enemy.name, combat.enemy.hp, combat.enemy.maxHp,
        combat.enemy.isBoss ? 'BOSS' : '', combat.enemy.isBoss ? '#f2c14e' : '#c0562e');
      drawStatusPips(combat.enemy.statuses, view.w - boxW - 26, 92);
    }
    if (camera.mode === 'idle') {
      // Player stands on the left, so its box is top-left, mirroring the enemy's.
      drawInfoBox(26, 22, boxW, stats.role.name, run.hp, stats.maxHp,
        `Lv ${run.level}`, '#63c76a', run.energy);
      drawStatusPips(run.statuses, 26, 118);
    }

    drawFloaters(now);
    drawBanner(now);
  }

  function drawStatusPips(statuses, x, y) {
    const entries = Object.entries(statuses || {}).filter(([, turns]) => turns > 0);
    ctx.save();
    ctx.font = `800 12px ${BODY_FONT}`;
    let offset = 0;
    for (const [id, turns] of entries) {
      const info = statusInfo(id);
      const label = `${info.name} ${turns}`;
      const w = ctx.measureText(label).width + 14;
      roundRect(x + offset, y, w, 18, 9);
      ctx.fillStyle = 'rgba(10,14,20,0.85)';
      ctx.fill();
      ctx.strokeStyle = info.colour;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = info.colour;
      ctx.fillText(label, x + offset + 7, y + 13);
      offset += w + 7;
    }
    ctx.restore();
  }

  /* ------------------------------------------------------------
     Animation loop
     ------------------------------------------------------------ */

  function tick(now) {
    for (const side of ['player', 'enemy']) {
      fx[side].lunge = Math.max(0, fx[side].lunge - 0.07);
      fx[side].shake = Math.max(0, fx[side].shake - 0.06);
      fx[side].flash = Math.max(0, fx[side].flash - 0.07);
    }

    if (camera.mode === 'panning' || camera.mode === 'climbing') {
      const progress = Math.min(1, (now - camera.started) / camera.duration);
      const eased = easeInOut(progress);
      if (camera.mode === 'panning') camera.x = camera.from + (camera.to - camera.from) * eased;
      else camera.y = camera.from + (camera.to - camera.from) * eased;
      if (progress >= 1) {
        const done = camera.onDone;
        camera.mode = 'idle';
        camera.onDone = null;
        done?.();
      }
    }

    draw(now);
    raf = requestAnimationFrame(tick);
  }

  function panTo(worldX, onDone, duration = PAN_MS) {
    camera.mode = 'panning';
    camera.from = camera.x;
    camera.to = worldX;
    camera.started = performance.now();
    camera.duration = duration;
    camera.onDone = onDone;
    setChildren(main, panel(null, el('p', { className: 'small dim center', text: 'Moving deeper…' })));
    setChildren(sidebar);
  }

  /* ------------------------------------------------------------
     Combat event playback
     ------------------------------------------------------------ */

  function floater(side, text, colour) {
    const originX = stageOriginX() + (side === 'player' ? PLAYER_X : ENEMY_X);
    floaters.push({ x: originX, y: FLOOR_Y - 110, text, colour, born: performance.now() });
  }

  function playEvents() {
    for (const event of drainEvents(combat)) {
      switch (event.type) {
        case 'attack': {
          const attacker = event.side === 'player' ? 'player' : 'enemy';
          const victim = event.side === 'player' ? 'enemy' : 'player';
          fx[attacker].lunge = 1;
          fx[victim].shake = 1;
          fx[victim].flash = 1;
          floater(victim, `-${event.amount}${event.crit ? '!' : ''}`, event.crit ? '#f2c14e' : '#ff6b6b');
          event.crit ? sfx.crit() : (event.side === 'player' ? sfx.hit() : sfx.hurt());
          break;
        }
        case 'heal':
          floater(event.side, `+${event.amount}`, '#6fd66f');
          if (event.side === 'player') sfx.heal();
          break;
        case 'energy':
          floater('player', `+${event.amount} EN`, '#f0a13a');
          break;
        case 'status-tick':
          floater(event.side, `-${event.amount}`, statusInfo(event.status).colour);
          break;
        case 'blocked':
          floater('player', 'BLOCK', '#4b9cf0');
          break;
        case 'dodged':
          floater('player', 'DODGE', '#9fd3e6');
          sfx.select();
          break;
        case 'thorns':
          floater('enemy', `-${event.amount}`, '#f06b2a');
          fx.enemy.flash = 1;
          break;
        case 'revive':
          floater('player', 'REVIVED', '#f2c14e');
          toast(`${event.item} saves you.`, 'gold');
          sfx.levelUp();
          break;
        case 'victory': sfx.loot(); break;
        case 'defeat': sfx.death(); break;
        default: break;
      }
    }
  }

  /* ------------------------------------------------------------
     Stage lifecycle
     ------------------------------------------------------------ */

  function beginStage() {
    const stage = currentStage(run);
    combat = null;
    camera.x = stageCamX();

    if (!stage) { advance(); return; }

    if (stage.kind === 'combat') {
      combat = startCombat(run, stage.enemy);
      if (stage.enemy.isBoss) { sfx.boss(); showBanner(stage.enemy.name, stage.enemy.taunt || ''); }
      render();
    } else if (stage.kind === 'treasure') {
      renderTreasure(stage);
    } else {
      renderShrine(stage);
    }
    renderHud();
  }

  /** Clear the current stage and move on, panning as we go. */
  function advance() {
    const result = clearStage(run);
    if (result === 'next-stage') {
      panTo(stageCamX(), () => { beginStage(); });
      return;
    }
    // Floor cleared: pan to the ladder, then climb to the next floor.
    const ladderX = stageCam(floorState.stages.length);
    panTo(ladderX, () => {
      sfx.descend();
      showBanner('The way up', 'The ladder leads deeper into the system.');
      camera.mode = 'climbing';
      camera.from = 0;
      camera.to = -SCENE_H;
      camera.started = performance.now();
      camera.duration = CLIMB_MS;
      camera.onDone = () => {
        descend(run);
        floorState = ensureFloor(run);
        backdrop = buildBackdrop(floorState.biome, `${run.seed}:${run.floor}`, SCENE_W, SCENE_H, Math.min(2.5, view.k * view.dpr));
        camera.x = stageCam(0);
        camera.y = 0;
        saveMeta();
        showBanner(`Floor ${run.floor}`, floorState.biomeName);
        beginStage();
      };
    });
  }

  /* ------------------------------------------------------------
     HUD and log
     ------------------------------------------------------------ */

  /**
   * The status strip. HP and XP already read clearly on the canvas boxes, so
   * this band leads with energy — the number every move decision turns on —
   * as counted pips rather than another thin bar lost among the others.
   */
  function renderHud() {
    const stats = derived(run);
    const total = floorState.stages.length;
    const cheapest = combat
      ? availableAbilities(run)
          .filter(a => !a.levelLocked && a.ability.cost > 0)
          .sort((a, b) => a.ability.cost - b.ability.cost)[0]
      : null;
    const affordable = cheapest && run.energy >= cheapest.ability.cost;

    const pips = el('div', { className: 'pips' },
      ...Array.from({ length: MAX_ENERGY }, (_, i) => el('div', {
        className: `pip ${i < run.energy ? 'is-full' : ''} ${
          affordable && i === cheapest.ability.cost - 1 ? 'is-ready' : ''}`,
      })));

    /* Two chips rather than five: on a narrow window the strip used to wrap to
       a second row and steal that height from the scene. */
    setChildren(hud,
      el('div', { className: 'hud-chip gold', text:
        `FLOOR ${run.floor}${isBossFloor(run.floor) ? ' BOSS' : ''} · ${floorState.biomeName}`
        + ` · ${Math.min(floorState.index + 1, total)}/${total}` }),
      el('div', { className: 'hud-chip', text:
        `${stats.role.name} Lv ${run.level} · ATK ${stats.atk} · DEF ${stats.def}` }),
      el('div', { className: 'energy-readout' },
        el('span', { className: 'label', text: `ENERGY ${run.energy}` }),
        pips,
        cheapest
          ? el('span', { className: 'tiny dim', text: affordable
              ? `${cheapest.ability.name} ready`
              : `${cheapest.ability.cost - run.energy} more for ${cheapest.ability.name}` })
          : null));
  }

  function renderLog() {
    const lines = (run.log || []).slice(-40);
    setChildren(logBox, ...lines.map(line =>
      el('div', { className: `log-line ${line.kind ? `log-line--${line.kind}` : ''}`, text: line.text })));
    logBox.scrollTop = logBox.scrollHeight;
  }

  /* ------------------------------------------------------------
     Non-combat stage panels
     ------------------------------------------------------------ */

  function renderTreasure(stage) {
    const body = el('div', { className: 'col gap-sm' });
    if (!stage.opened) {
      body.append(
        el('p', { className: 'small dim', text: 'A supply cache, left by whoever worked these tunnels last.' }),
        button('Open the cache', () => {
          const drops = openTreasure(run, stage);
          sfx.loot();
          renderTreasure(stage);
          toast(drops.length ? `Found ${drops.length} item${drops.length > 1 ? 's' : ''}.` : 'Empty.', drops.length ? 'gold' : '');
        }, { className: 'btn--gold btn--center' }));
    } else {
      body.append(el('p', { className: 'small good', text: 'Cache opened.' }),
        button('Move on', () => advance(), { className: 'btn--primary btn--center' }));
    }
    setChildren(main, panel('Supply cache', body));
    renderSidebar();
  }

  function renderShrine(stage) {
    const body = el('div', { className: 'col gap-sm' });
    if (!stage.used) {
      body.append(
        el('p', { className: 'small dim', text:
          'A cracked maintenance shrine. Resting here restores 45% of your health and 4 energy, and clears your afflictions.' }),
        button('Rest at the shrine', () => {
          const result = useShrine(run, stage);
          sfx.heal();
          toast(`Recovered ${result.healed} HP.`, 'good');
          renderShrine(stage);
          renderHud();
        }, { className: 'btn--primary btn--center' }));
    } else {
      body.append(el('p', { className: 'small good', text: 'You feel steadier.' }),
        button('Move on', () => advance(), { className: 'btn--primary btn--center' }));
    }
    setChildren(main, panel('Maintenance shrine', body));
    renderSidebar();
  }

  /* ------------------------------------------------------------
     Combat panels
     ------------------------------------------------------------ */

  function renderQuestionChoice() {
    if (!combat.choices.length) { renderAction(); return; }
    setChildren(main, panel('Choose your question',
      el('p', { className: 'small dim', text:
        'Harder question, heavier blow. Get it wrong and the enemy strikes instead.' }),
      el('div', { className: 'q-choices' }, ...combat.choices.map((choice, index) => {
        const q = choice.question;
        const bonus = Math.round((choice.damageBonus - 1) * 100);
        return el('button', { className: 'q-card', type: 'button', onClick: () => {
          sfx.select();
          selectQuestion(run, combat, index);
          render();
        } },
          el('div', { className: 'q-card-subject', style: { color: q.subjectColour }, text: q.subjectName }),
          el('div', { className: 'q-card-topic', text: q.topic }),
          sourceTag(q),
          el('div', { className: 'q-card-meta' },
            el('span', { className: 'dim', text: `${DIFFICULTY_LABEL[choice.offeredTier]} · T${choice.offeredTier}` }),
            el('span', { className: bonus >= 0 ? 'gold' : 'dim', text: `${bonus >= 0 ? '+' : ''}${bonus}% dmg` })),
          el('div', { className: 'tiny dim', text: q.type === 'mc' ? 'Multiple choice' : 'Short answer' }));
      }))));
  }

  function renderAnswering() {
    const q = combat.current.question;
    const eliminated = combat.hint?.type === 'eliminate' ? new Set(combat.hint.indices) : new Set();

    const body = el('div', { className: 'col gap-sm' },
      el('div', { className: 'row between small' },
        el('span', { style: { color: q.subjectColour }, text: `${q.subjectName} — ${q.topic}` }),
        el('span', { className: 'row gap-sm center-y' },
          sourceTag(q),
          el('span', { className: 'dim', text: `${DIFFICULTY_LABEL[q.difficulty]} (tier ${q.difficulty})` }))),
      el('div', { className: 'q-prompt', text: q.prompt }),
      stimulusBlock(q),
      combat.hint?.type === 'reveal' ? el('div', { className: 'explain', text: `Answer: ${combat.hint.text}` }) : null,
      combat.hint?.type === 'keyword' ? el('div', { className: 'explain', text: combat.hint.text }) : null);

    if (q.type === 'mc') {
      if (derived(run).role.id === 'scholar' && !eliminated.size) {
        const wrong = q.options.map((_, i) => i).filter(i => i !== q.answer);
        if (wrong.length) eliminated.add(wrong[(run.floor + combat.turn) % wrong.length]);
      }
      body.appendChild(el('div', { className: 'opt-list' },
        ...q.options.map((option, index) => el('button', {
          className: `opt ${eliminated.has(index) ? 'opt--gone' : ''}`,
          type: 'button',
          disabled: eliminated.has(index),
          onClick: () => answer(index),
        },
          el('span', { className: 'opt-key', text: String.fromCharCode(65 + index) }),
          el('span', { text: option })))));
    } else {
      const input = el('textarea', {
        className: 'short-input',
        placeholder: 'Write your answer. Key ideas matter more than exact wording.',
        onKeyDown: (event) => {
          if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); answer(input.value); }
        },
      });
      body.appendChild(input);
      body.appendChild(el('div', { className: 'row between center-y' },
        el('span', { className: 'tiny dim', text: 'Ctrl+Enter to submit' }),
        button('Submit answer', () => answer(input.value), { className: 'btn--primary btn--inline btn--center' })));
      setTimeout(() => input.focus(), 30);
    }

    setChildren(main, panel('Answer to act', body));
  }

  function answer(response) {
    const result = submitAnswer(run, combat, response);
    if (!result) return;
    result.verdict === VERDICT.WRONG ? sfx.wrong() : sfx.correct();
    playEvents();
    saveMeta();
    render();
  }

  function renderResult() {
    const q = combat.current.question;
    const result = combat.result;
    const verdictLabel = result.verdict === VERDICT.CORRECT ? 'Correct'
      : result.verdict === VERDICT.PARTIAL ? 'Partially correct' : 'Incorrect';
    const verdictClass = result.verdict === VERDICT.CORRECT ? 'good'
      : result.verdict === VERDICT.PARTIAL ? 'gold' : 'bad';

    const body = el('div', { className: 'col gap-sm' },
      el('div', { className: 'row between center-y' },
        el('div', { className: verdictClass, text: verdictLabel }),
        sourceTag(q)),
      el('div', { className: 'q-prompt', text: q.prompt }),
      stimulusBlock(q));

    if (q.type === 'mc') {
      const chosen = combat.response;
      // Re-listing all four options pushed the explanation — the part worth
      // reading — off screen. Show the answer, and the wrong pick if there was one.
      const letter = (i) => String.fromCharCode(65 + i);
      body.appendChild(el('div', { className: 'col gap-sm' },
        Number.isInteger(chosen) && chosen !== q.answer
          ? el('div', { className: 'answer-row answer-row--wrong' },
              el('span', { className: 'tag', text: `YOU ${letter(chosen)}` }),
              el('span', { text: q.options[chosen] }))
          : null,
        el('div', { className: 'answer-row answer-row--correct' },
          el('span', { className: 'tag', text: `ANS ${letter(q.answer)}` }),
          el('span', { text: q.options[q.answer] }))));
    } else {
      body.appendChild(el('div', { className: 'small dim', text: `You wrote: ${combat.response || '(nothing)'}` }));
      const feedback = gradingFeedback(q, result);
      if (feedback) body.appendChild(el('div', { className: 'small', text: feedback }));
    }

    if (game.settings.showExplanations) {
      body.appendChild(el('div', { className: 'explain' }, el('b', { text: 'Why: ' }), q.explanation));
    }

    const continueButton = button(
      combat.nextPhase === PHASE.ACTION ? 'Choose your move' : 'Brace for the counterattack',
      () => {
        const outcome = continueFromResult(run, combat);
        playEvents();
        saveRun();
        if (outcome.kind === 'defeat') { renderDefeat(); return; }
        if (outcome.kind === 'victory') { renderVictory(); return; }
        render();
      },
      { className: 'btn--primary btn--center mt' });
    body.appendChild(continueButton);

    setChildren(main, panel('Result', body));
    requestAnimationFrame(() => continueButton.scrollIntoView({ block: 'nearest' }));
  }

  function renderAction() {
    const entries = availableAbilities(run);
    const body = el('div', { className: 'col gap-sm' },
      el('p', { className: 'small dim', text:
        `Energy: ${run.energy} / ${MAX_ENERGY}. Rest banks 2 but forfeits your attack; Strike banks 1 and still hits. Everything else spends what you have saved.` }),
      ...entries.map(entry => {
        const ability = entry.ability;
        const economy = ability.gain ? `banks ${ability.gain} energy`
          : ability.cost ? `costs ${ability.cost} energy` : 'free';
        return button(ability.name, () => {
          if (!entry.usable) return;
          sfx.confirm();
          const outcome = useAbility(run, combat, ability.id);
          playEvents();
          saveRun();
          renderHud();
          if (!outcome) return;
          if (outcome.kind === 'victory') { renderVictory(); return; }
          if (outcome.kind === 'defeat') { renderDefeat(); return; }
          render();
        }, {
          className: entry.usable ? (ability.cost >= 12 ? 'btn--gold' : ability.gain ? 'btn--primary' : '') : '',
          disabled: !entry.usable,
          sub: entry.reason ? `${entry.reason} — ${ability.desc}` : `${economy} · ${ability.desc}`,
        });
      }));
    setChildren(main, panel('Your move', body));
  }

  function renderVictory() {
    const rewards = combat.rewards || { xp: { gained: 0, levelsGained: [] }, drops: [] };
    saveMeta();
    saveRun();

    const body = el('div', { className: 'col gap-sm' },
      el('div', { className: 'gold', text: `${combat.enemy.name} is destroyed.` }),
      el('div', { className: 'small', text: `+${rewards.xp.gained} XP` }),
      ...rewards.xp.levelsGained.map(level =>
        el('div', { className: 'good small', text: `Level up — you are now level ${level}. Health restored.` })),
      rewards.drops.length
        ? el('div', { className: 'col gap-sm mt' },
            el('div', { className: 'small dim', text: 'Dropped:' }),
            ...rewards.drops.map(drop => el('div', { className: 'row center-y gap-sm' },
              itemIcon(drop.item, 2),
              el('div', {},
                el('div', { className: rarityClass(drop.item), text: `${drop.item.name}${drop.count > 1 ? ` x${drop.count}` : ''}` }),
                el('div', { className: 'tiny dim', text: drop.item.desc })))))
        : el('div', { className: 'small dim mt', text: 'It dropped nothing worth carrying.' }),
      button(isFinalStage(run) ? 'Climb to the next floor' : 'Move on', () => advance(),
        { className: 'btn--primary btn--center mt' }));

    if (rewards.xp.levelsGained.length) sfx.levelUp();
    combat = null;
    setChildren(main, panel('Victory', body));
    renderSidebar();
    renderHud();
  }

  function renderDefeat() {
    const floor = run.floor;
    const kills = run.kills;
    const enemyName = combat.enemy.name;
    game.meta.deepestFloor = Math.max(game.meta.deepestFloor, floor);
    endRun({ died: true });
    saveMeta();
    combat = null;

    setChildren(main, panel('You died',
      el('div', { className: 'col gap-sm' },
        el('div', { className: 'bad', text: `${enemyName} finished you on floor ${floor}.` }),
        el('div', { className: 'small dim', text: `${kills} enemies felled this run. A quarter of your crafting materials were carried back to the surface.` }),
        game.meta.sanctum > 0
          ? el('div', { className: 'small good', text: `Your sanctum holds at floor ${game.meta.sanctum}. Your next run can start from floor ${game.meta.sanctum + 1}.` })
          : el('div', { className: 'small dim', text: 'Clear a boss floor to establish a sanctum you can restart from.' }),
        button('Return to the surface', () => go('menu'), { className: 'btn--primary btn--center mt' }))));
    setChildren(sidebar);
  }

  /* ------------------------------------------------------------
     Sidebar
     ------------------------------------------------------------ */

  function renderSidebar() {
    const children = [];

    if (combat) {
      const usable = inventoryEntries(run, 'consumable').filter(({ item }) => !item.passive);
      const questionOpen = combat.phase === PHASE.ANSWERING;
      const buttons = usable.map(({ item, count }) => {
        const isHint = !!item.inQuestion;
        const allowed = isHint ? questionOpen : combat.phase === PHASE.ACTION;
        return button(`${item.name} x${count}`, () => {
          if (!allowed) return;
          sfx.confirm();
          const outcome = isHint ? useHintOn(run, combat, item.id) : useItemInCombat(run, combat, item.id);
          playEvents();
          saveRun();
          renderHud();
          if (outcome?.kind === 'victory') { renderVictory(); return; }
          if (outcome?.kind === 'defeat') { renderDefeat(); return; }
          render();
        }, {
          className: 'btn--sm item-btn',
          disabled: !allowed,
          title: allowed ? item.desc
            : (isHint ? 'Only while a question is open' : 'Only when choosing your move'),
        });
      });
      children.push(panel('Items', buttons.length
        ? el('div', { className: 'col gap-sm' }, ...buttons)
        : el('p', { className: 'small dim', text: 'No usable items.' })));

      const passives = inventoryEntries(run, 'consumable').filter(({ item }) => item.passive);
      if (passives.length) {
        children.push(panel('Held in reserve', ...passives.map(({ item, count }) =>
          el('div', { className: 'small' },
            el('span', { className: rarityClass(item), text: `${item.name} x${count}` }),
            el('div', { className: 'tiny dim', text: item.desc })))));
      }
      children.push(panel('Enemy',
        el('div', { className: 'tiny dim', text:
          `ATK ${combat.enemy.atk} · DEF ${combat.enemy.def} · ${combat.enemy.xp} XP` }),
        combat.enemy.traits?.length
          ? el('div', { className: 'tiny gold', text: combat.enemy.traits.join(' · ') }) : null));
    }

    // Controls lead the rail so nothing important sits below a scroll. The
    // strip scrolls horizontally on its own rather than dragging the section.
    const controls = el('div', { className: 'rail-tabs' },
      button('Bag', () => go('inventory'), { className: 'btn--sm btn--center' }),
      button('Craft', () => go('crafting'), { className: 'btn--sm btn--center' }),
      button('Log', showLog, { className: 'btn--sm btn--ghost btn--center' }),
      button('Menu', () => go('menu'), { className: 'btn--sm btn--ghost btn--center' }));

    setChildren(sidebar, controls, ...children);
  }

  /* The battle log is history, not a control, so it sits behind a button and
     the items you might actually use lead the rail. */
  function showLog() {
    renderLog();
    modal('Battle log', logBox,
      [button('Close', () => closeModal(), { className: 'btn--inline btn--center' })]);
  }

  /* ------------------------------------------------------------
     Render dispatch
     ------------------------------------------------------------ */

  function render() {
    renderHud();
    renderSidebar();
    if (!combat) return;
    switch (combat.phase) {
      case PHASE.QUESTION: renderQuestionChoice(); break;
      case PHASE.ANSWERING: renderAnswering(); break;
      case PHASE.RESULT: renderResult(); break;
      case PHASE.ACTION: renderAction(); break;
      case PHASE.VICTORY: renderVictory(); break;
      case PHASE.DEFEAT: renderDefeat(); break;
      default: renderQuestionChoice();
    }
  }

  /* Re-centre on the current stage when the view width changes. */
  function onResize() {
    resizeCanvas();
    if (camera.mode === 'idle') camera.x = stageCamX();
  }

  function onKeyDown(event) {
    if (isModalOpen()) { if (event.key === 'Escape') closeModal(); return; }
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') return;
    if (event.key === 'i' || event.key === 'I') { event.preventDefault(); go('inventory'); }
    else if (event.key === 'c' || event.key === 'C') { event.preventDefault(); go('crafting'); }
    else if (event.key === 'Escape') { event.preventDefault(); go('menu'); }
  }

  const node = el('div', { className: 'screen battle' },
    el('div', { className: 'battle-top' }, hud),
    el('div', { className: 'scene-stage' }, canvas),
    el('div', { className: 'battle-console' },
      el('div', { className: 'battle-main' }, main),
      el('div', { className: 'battle-rail' }, sidebar)));

  return {
    node,
    mount() {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('resize', onResize);
      resizeCanvas();
      showBanner(`Floor ${run.floor}`, floorState.biomeName);
      beginStage();
      raf = requestAnimationFrame(tick);
    },
    unmount() {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      saveRun();
      saveMeta();
    },
  };
}
