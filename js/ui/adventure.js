/* The adventure screen: a side-on battle scene on canvas, with the question
   and action panels beneath it.

   There is no free movement. A floor is a run of stages; clearing one pans the
   camera to the next, and clearing the last pans to the ladder and climbs to
   the floor above. The scene owns the camera and the animation loop; all the
   combat rules live in game/combat.js. */

import {
  el, panel, button, toast, closeModal, itemIcon, rarityClass,
  isModalOpen, setChildren, bar,
} from './dom.js';
import { go } from './screens.js';
import { spriteCanvas } from '../art/render.js';
import {
  buildBackdrop, drawBackdrop, drawLadder, SCENE_W, SCENE_H, FLOOR_Y,
} from '../art/backdrop.js';
import { gradingFeedback, VERDICT } from '../game/grading.js';
import {
  PHASE, startCombat, selectQuestion, submitAnswer, continueFromResult,
  availableAbilities, useAbility, useItemInCombat, useHintOn, drainEvents, statusInfo,
} from '../game/combat.js';
import {
  ensureFloor, currentStage, clearStage, descend, openTreasure, useShrine,
  isFinalStage, isBossFloor,
} from '../game/stages.js';
import {
  game, derived, inventoryEntries, saveRun, saveMeta, endRun, MAX_ENERGY, xpForLevel,
} from '../game/state.js';
import { sfx } from '../core/audio.js';

const DIFFICULTY_LABEL = ['', 'Recall', 'Basic', 'Applied', 'Analysis', 'Evaluation'];

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

  const hud = el('div', { className: 'col gap-sm' });
  const main = el('div', { className: 'col gap-sm grow' });
  const sidebar = el('div', { className: 'col gap-sm' });
  const logBox = el('div', { className: 'log' });

  /* ------------------------------------------------------------
     Scene state
     ------------------------------------------------------------ */

  const camera = { x: floorState.index * SCENE_W, y: 0, mode: 'idle', from: 0, to: 0, started: 0 };
  const fx = { player: { lunge: 0, shake: 0, flash: 0 }, enemy: { lunge: 0, shake: 0, flash: 0 } };
  const floaters = [];
  let combat = null;
  let raf = null;
  let banner = null;

  const stageOriginX = () => floorState.index * SCENE_W;

  function showBanner(text, sub = '') {
    banner = { text, sub, born: performance.now() };
  }

  /* ------------------------------------------------------------
     Drawing
     ------------------------------------------------------------ */

  function drawFighter(sprite, worldX, scale, side, time, alive = true) {
    const shake = fx[side].shake > 0 ? (Math.random() - 0.5) * 10 : 0;
    const lunge = fx[side].lunge * (side === 'player' ? 34 : -34);
    const bob = Math.sin(time * 0.0022 + (side === 'player' ? 0 : 1.7)) * 3;

    const image = spriteCanvas(sprite, scale);
    const x = Math.round(worldX - camera.x + lunge + shake - image.width / 2);
    const y = Math.round(FLOOR_Y - image.height + bob - camera.y);

    if (x < -image.width || x > SCENE_W + image.width) return;

    // Contact shadow grounds the sprite on the walkway.
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x + image.width / 2, FLOOR_Y - camera.y + 4, image.width * 0.34, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Reflection in the channel: the sprite flipped, faded and squashed.
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.imageSmoothingEnabled = false;
    ctx.translate(0, (FLOOR_Y - camera.y) * 2 + 16);
    ctx.scale(1, -1);
    ctx.drawImage(image, x, FLOOR_Y - camera.y - image.height);
    ctx.restore();

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (!alive) ctx.globalAlpha = 0.35;
    if (side === 'enemy') {
      ctx.translate(x + image.width, y);
      ctx.scale(-1, 1);
      ctx.drawImage(image, 0, 0);
    } else {
      ctx.drawImage(image, x, y);
    }
    ctx.restore();

    if (fx[side].flash > 0) {
      ctx.save();
      ctx.globalAlpha = fx[side].flash * 0.75;
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(image, side === 'enemy' ? x : x, y);
      ctx.restore();
    }
  }

  /**
   * During the climb the player holds station on screen while the shaft scrolls
   * past, so they read as ascending rather than being left behind.
   */
  function drawClimbingPlayer(ladderWorldX, time) {
    const image = spriteCanvas(derived(run).role.sprite, 7);
    const x = Math.round(ladderWorldX - camera.x - image.width / 2);
    const clamber = Math.sin(time * 0.009) * 4;
    const y = Math.round(SCENE_H * 0.60 - image.height / 2 + clamber);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, x, y);
    ctx.restore();
  }

  /** Pokémon-style info box, drawn on the canvas rather than in the DOM. */
  function drawInfoBox(x, y, w, name, hp, maxHp, sub, accent, energy = null) {
    const h = energy == null ? 58 : 76;
    ctx.save();
    ctx.fillStyle = 'rgba(10,14,20,0.86)';
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e8e4d8';
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.textBaseline = 'top';
    ctx.fillText(name.length > 20 ? name.slice(0, 19) + '…' : name, x + 12, y + 11);

    if (sub) {
      ctx.fillStyle = '#97a1b0';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText(sub, x + w - 12 - ctx.measureText(sub).width, y + 13);
    }

    const barY = y + 30;
    const barW = w - 24;
    ctx.fillStyle = '#10141c';
    ctx.fillRect(x + 12, barY, barW, 10);
    const ratio = Math.max(0, Math.min(1, hp / maxHp));
    ctx.fillStyle = ratio > 0.5 ? '#63c76a' : ratio > 0.2 ? '#f0a13a' : '#d1454b';
    ctx.fillRect(x + 12, barY, Math.round(barW * ratio), 10);
    ctx.strokeStyle = 'rgba(0,0,0,0.7)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 12.5, barY + 0.5, barW - 1, 9);

    ctx.fillStyle = '#97a1b0';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(`${Math.ceil(hp)} / ${maxHp}`, x + 12, barY + 14);

    if (energy != null) {
      const eY = y + 58;
      ctx.fillStyle = '#10141c';
      ctx.fillRect(x + 12, eY, barW, 8);
      ctx.fillStyle = '#f0a13a';
      ctx.fillRect(x + 12, eY, Math.round(barW * (energy / MAX_ENERGY)), 8);
      ctx.fillStyle = '#e8e4d8';
      ctx.font = '8px "Press Start 2P", monospace';
      const label = `EN ${energy}/${MAX_ENERGY}`;
      ctx.fillText(label, x + w - 12 - ctx.measureText(label).width, eY - 1);
    }
    ctx.restore();
  }

  function drawStageProp(stage, originX) {
    if (!stage) return;
    const palette = backdrop.palette;
    if (stage.kind === 'treasure') {
      const image = spriteCanvas(stage.opened ? 'chest_open' : 'chest', 5);
      const x = Math.round(originX + ENEMY_X - camera.x - image.width / 2);
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, x, Math.round(FLOOR_Y - image.height - camera.y));
      ctx.restore();
    } else if (stage.kind === 'shrine') {
      const image = spriteCanvas('altar', 5);
      const x = Math.round(originX + ENEMY_X - camera.x - image.width / 2);
      const y = Math.round(FLOOR_Y - image.height - camera.y);
      ctx.save();
      if (!stage.used) {
        const glow = ctx.createRadialGradient(x + image.width / 2, y + 20, 4, x + image.width / 2, y + 20, 120);
        glow.addColorStop(0, palette.light);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - 120, y - 100, image.width + 240, 260);
      }
      ctx.imageSmoothingEnabled = false;
      ctx.globalAlpha = stage.used ? 0.5 : 1;
      ctx.drawImage(image, x, y);
      ctx.restore();
    }
  }

  function drawFloaters(now) {
    ctx.save();
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    for (let i = floaters.length - 1; i >= 0; i--) {
      const f = floaters[i];
      const age = (now - f.born) / 900;
      if (age >= 1) { floaters.splice(i, 1); continue; }
      ctx.globalAlpha = 1 - age;
      ctx.fillStyle = '#000';
      ctx.fillText(f.text, f.x - camera.x + 2, f.y - age * 46 + 2 - camera.y);
      ctx.fillStyle = f.colour;
      ctx.fillText(f.text, f.x - camera.x, f.y - age * 46 - camera.y);
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
    ctx.fillStyle = 'rgba(8,11,16,0.82)';
    ctx.fillRect(0, 150, SCENE_W, banner.sub ? 76 : 54);
    ctx.strokeStyle = 'rgba(242,193,78,0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 150); ctx.lineTo(SCENE_W, 150);
    ctx.moveTo(0, 150 + (banner.sub ? 76 : 54)); ctx.lineTo(SCENE_W, 150 + (banner.sub ? 76 : 54));
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f2c14e';
    ctx.font = '18px "Press Start 2P", monospace';
    ctx.fillText(banner.text, SCENE_W / 2, 180);
    if (banner.sub) {
      ctx.fillStyle = '#97a1b0';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText(banner.sub, SCENE_W / 2, 208);
    }
    ctx.restore();
  }

  function draw(now) {
    ctx.clearRect(0, 0, SCENE_W, SCENE_H);
    drawBackdrop(ctx, backdrop, camera.x, now, SCENE_W, SCENE_H, camera.y);

    // The ladder lives one slot past the final stage.
    const ladderWorldX = floorState.stages.length * SCENE_W + SCENE_W / 2;
    if (Math.abs(ladderWorldX - camera.x - SCENE_W / 2) < SCENE_W * 1.5) {
      drawLadder(ctx, backdrop.palette, ladderWorldX - camera.x, camera.y);
    }

    // Draw the current stage and its neighbour so panning shows both.
    for (let i = Math.max(0, floorState.index - 1); i <= Math.min(floorState.stages.length - 1, floorState.index + 1); i++) {
      const stage = floorState.stages[i];
      const originX = i * SCENE_W;
      if (Math.abs(originX - camera.x) > SCENE_W * 1.6) continue;
      drawStageProp(stage, originX);
      if (stage.kind === 'combat' && i === floorState.index && combat) {
        drawFighter(combat.enemy.sprite, originX + ENEMY_X, combat.enemy.isBoss ? 9 : 7, 'enemy', now, combat.enemy.hp > 0);
      } else if (stage.kind === 'combat' && !stage.cleared && stage.enemy.hp > 0) {
        drawFighter(stage.enemy.sprite, originX + ENEMY_X, stage.enemy.isBoss ? 9 : 7, 'enemy', now);
      }
    }

    if (camera.mode === 'climbing') {
      drawClimbingPlayer(ladderWorldX, now);
    } else {
      drawFighter(derived(run).role.sprite, stageOriginX() + PLAYER_X, 7, 'player', now);
    }

    const stats = derived(run);
    if (combat && combat.enemy.hp > 0 && camera.mode === 'idle') {
      drawInfoBox(28, 24, 330, combat.enemy.name, combat.enemy.hp, combat.enemy.maxHp,
        combat.enemy.isBoss ? 'BOSS' : '', combat.enemy.isBoss ? '#f2c14e' : '#c0562e');
      drawStatusPips(combat.enemy.statuses, 28, 86);
    }
    if (camera.mode === 'idle') {
      drawInfoBox(SCENE_W - 358, SCENE_H - 118, 330, stats.role.name, run.hp, stats.maxHp,
        `Lv ${run.level}`, '#63c76a', run.energy);
      drawStatusPips(run.statuses, SCENE_W - 358, SCENE_H - 134);
    }

    drawFloaters(now);
    drawBanner(now);
  }

  function drawStatusPips(statuses, x, y) {
    const entries = Object.entries(statuses || {}).filter(([, turns]) => turns > 0);
    ctx.save();
    ctx.font = '8px "Press Start 2P", monospace';
    let offset = 0;
    for (const [id, turns] of entries) {
      const info = statusInfo(id);
      const label = `${info.name} ${turns}`;
      const w = ctx.measureText(label).width + 12;
      ctx.fillStyle = 'rgba(10,14,20,0.85)';
      ctx.fillRect(x + offset, y, w, 16);
      ctx.strokeStyle = info.colour;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + offset + 0.5, y + 0.5, w - 1, 15);
      ctx.fillStyle = info.colour;
      ctx.fillText(label, x + offset + 6, y + 11);
      offset += w + 6;
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
    camera.x = stageOriginX();

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
      panTo(stageOriginX(), () => { beginStage(); });
      return;
    }
    // Floor cleared: pan to the ladder, then climb to the next floor.
    const ladderX = floorState.stages.length * SCENE_W;
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
        backdrop = buildBackdrop(floorState.biome, `${run.seed}:${run.floor}`);
        camera.x = 0;
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

  function renderHud() {
    const stats = derived(run);
    const total = floorState.stages.length;
    setChildren(hud,
      el('div', { className: 'hud-strip' },
        el('div', { className: 'hud-chip gold', text: `FLOOR ${run.floor}${isBossFloor(run.floor) ? ' — BOSS' : ''}` }),
        el('div', { className: 'hud-chip', text: floorState.biomeName }),
        el('div', { className: 'hud-chip', text: `Stage ${Math.min(floorState.index + 1, total)} / ${total}` }),
        el('div', { className: 'hud-chip', text: `${stats.role.name} Lv ${run.level}` }),
        el('div', { className: 'hud-chip', text: `ATK ${stats.atk}` }),
        el('div', { className: 'hud-chip', text: `DEF ${stats.def}` })),
      el('div', { className: 'row gap-sm' },
        el('div', { className: 'grow' }, bar('hp', run.hp, stats.maxHp, `HP ${Math.ceil(run.hp)} / ${stats.maxHp}`)),
        el('div', { className: 'grow' }, bar('energy', run.energy, MAX_ENERGY, `ENERGY ${run.energy} / ${MAX_ENERGY}`)),
        el('div', { className: 'grow' }, bar('xp', run.xp, xpForLevel(run.level), `XP ${run.xp} / ${xpForLevel(run.level)}`))));
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
      el('p', { className: 'small dim mb', text:
        'A harder question lands a heavier blow. Get it wrong and the enemy strikes instead — energy only comes from Rest and Strike.' }),
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
        el('span', { className: 'dim', text: `${DIFFICULTY_LABEL[q.difficulty]} (tier ${q.difficulty})` })),
      el('div', { className: 'q-prompt', text: q.prompt }),
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
      el('div', { className: verdictClass, text: verdictLabel }),
      el('div', { className: 'q-prompt', text: q.prompt }));

    if (q.type === 'mc') {
      const chosen = combat.response;
      body.appendChild(el('div', { className: 'opt-list' },
        ...q.options.map((option, index) => el('div', {
          className: `opt ${index === q.answer ? 'opt--correct' : index === chosen ? 'opt--wrong' : ''}`,
        },
          el('span', { className: 'opt-key', text: String.fromCharCode(65 + index) }),
          el('span', { text: option }),
          index === chosen && index !== q.answer
            ? el('span', { className: 'tiny', text: '← your answer' }) : null))));
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
        `Energy: ${run.energy} / ${MAX_ENERGY}. Rest banks 2 and softens the next hit; Strike banks 1 and still deals damage. Everything else spends what you have saved.` }),
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
          className: 'btn--sm',
          disabled: !allowed,
          sub: allowed ? item.desc : (isHint ? 'Only while a question is open' : 'Only when choosing your move'),
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
        el('p', { className: 'small dim', text: combat.enemy.flavour || '' }),
        el('div', { className: 'tiny dim mt', text:
          `ATK ${combat.enemy.atk} · DEF ${combat.enemy.def} · worth ${combat.enemy.xp} XP` }),
        combat.enemy.traits?.length
          ? el('div', { className: 'tiny gold mt', text: combat.enemy.traits.join(' · ') }) : null));
    }

    children.push(panel('Log', logBox));
    children.push(el('div', { className: 'row gap-sm' },
      button('Inventory', () => go('inventory'), { className: 'btn--sm btn--center' }),
      button('Craft', () => go('crafting'), { className: 'btn--sm btn--center' })));
    children.push(button('Menu', () => go('menu'), { className: 'btn--sm btn--ghost btn--center' }));

    setChildren(sidebar, ...children);
    renderLog();
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

  function onKeyDown(event) {
    if (isModalOpen()) { if (event.key === 'Escape') closeModal(); return; }
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') return;
    if (event.key === 'i' || event.key === 'I') { event.preventDefault(); go('inventory'); }
    else if (event.key === 'c' || event.key === 'C') { event.preventDefault(); go('crafting'); }
    else if (event.key === 'Escape') { event.preventDefault(); go('menu'); }
  }

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, hud),
    el('div', { className: 'scene-stage' }, canvas),
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'grow screen-scroll' }, main),
      el('div', { className: 'screen-scroll', style: { flex: '0 0 300px' } }, sidebar)));

  return {
    node,
    mount() {
      window.addEventListener('keydown', onKeyDown);
      showBanner(`Floor ${run.floor}`, floorState.biomeName);
      beginStage();
      raf = requestAnimationFrame(tick);
    },
    unmount() {
      window.removeEventListener('keydown', onKeyDown);
      if (raf) cancelAnimationFrame(raf);
      saveRun();
      saveMeta();
    },
  };
}
