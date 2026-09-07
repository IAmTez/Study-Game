/* The dungeon crawl view: a canvas tile map with fog of war, an HUD, the
   run log, and keyboard movement. */

import { el, panel, button, bar, toast, modal, closeModal, itemIcon, rarityClass, isModalOpen, setChildren} from './dom.js';
import { go } from './screens.js';
import { drawSprite, spriteElement, SPRITE_SIZE } from '../art/render.js';
import { makeRng } from '../core/rng.js';
import { game, derived, saveRun, saveMeta, logLine, endRun } from '../game/state.js';
import { tryMove, stepEnemies, MAP_W, MAP_H, isBossFloor } from '../game/dungeon.js';
import { ensureMap, syncMap, descend, openChest, useAltar, revealAround } from '../game/floors.js';
import { sfx } from '../core/audio.js';

const SCALE = 3;
const TILE = SPRITE_SIZE * SCALE;          // 48px on screen
const VIEW_W = 20;
const VIEW_H = 11;

export function dungeonScreen() {
  const run = game.run;
  if (!run) { go('menu'); return {}; }

  const map = ensureMap(run);
  const rng = makeRng(`${run.seed}:walk:${run.floor}`);

  const canvas = el('canvas', { id: 'map-canvas', width: VIEW_W * TILE, height: VIEW_H * TILE });
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const hud = el('div', { className: 'col gap-sm' });
  const logBox = el('div', { className: 'log' });
  let busy = false;

  /* ------------------------------------------------------------
     Rendering
     ------------------------------------------------------------ */

  function camera() {
    const cx = Math.max(0, Math.min(MAP_W - VIEW_W, map.player.x - Math.floor(VIEW_W / 2)));
    const cy = Math.max(0, Math.min(MAP_H - VIEW_H, map.player.y - Math.floor(VIEW_H / 2)));
    return { cx, cy };
  }

  function draw() {
    const { cx, cy } = camera();
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let vy = 0; vy < VIEW_H; vy++) {
      for (let vx = 0; vx < VIEW_W; vx++) {
        const x = cx + vx;
        const y = cy + vy;
        if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) continue;
        if (!map.revealed.has(`${x},${y}`)) continue;

        const distance = Math.hypot(x - map.player.x, y - map.player.y);
        const inSight = distance <= 7.5;
        const alpha = inSight ? 1 : 0.4;

        let sprite = map.tiles[y][x];
        if (sprite === 'floor') {
          // Deterministic floor variation so the pattern does not crawl.
          const hash = (x * 7 + y * 13 + run.floor * 3) % 10;
          sprite = hash === 0 ? 'floor_moss' : hash === 1 ? 'floor_crack' : 'floor';
        }
        drawSprite(ctx, sprite, vx * TILE, vy * TILE, SCALE, { alpha });
      }
    }

    for (const enemy of map.enemies) {
      if (enemy.hp <= 0) continue;
      if (!map.revealed.has(`${enemy.x},${enemy.y}`)) continue;
      if (Math.hypot(enemy.x - map.player.x, enemy.y - map.player.y) > 7.5) continue;
      const px = (enemy.x - cx) * TILE;
      const py = (enemy.y - cy) * TILE;
      if (px < -TILE || py < -TILE || px > canvas.width || py > canvas.height) continue;
      if (enemy.isBoss) {
        // Bosses render larger so they read as a threat on the map.
        const boss = spriteElement(enemy.sprite, SCALE + 2);
        ctx.drawImage(boss, px - TILE / 2, py - TILE);
      } else {
        drawSprite(ctx, enemy.sprite, px, py, SCALE);
      }
    }

    const role = derived(run).role;
    drawSprite(ctx, role.sprite, (map.player.x - cx) * TILE, (map.player.y - cy) * TILE, SCALE);
  }

  /* ------------------------------------------------------------
     HUD
     ------------------------------------------------------------ */

  function renderHud() {
    const stats = derived(run);
    const nextLevel = Math.floor(45 * Math.pow(run.level, 1.45));
    setChildren(hud, 
      el('div', { className: 'hud-strip' },
        el('div', { className: 'hud-chip gold', text: `FLOOR ${run.floor}${isBossFloor(run.floor) ? ' — BOSS' : ''}` }),
        el('div', { className: 'hud-chip', text: `${stats.role.name} Lv ${run.level}` }),
        el('div', { className: 'hud-chip', text: `ATK ${stats.atk}` }),
        el('div', { className: 'hud-chip', text: `DEF ${stats.def}` }),
        el('div', { className: 'hud-chip', text: `Enemies left ${map.enemies.length}` }),
      ),
      el('div', { className: 'row gap-sm' },
        el('div', { className: 'grow' }, bar('hp', run.hp, stats.maxHp, `HP ${Math.ceil(run.hp)} / ${stats.maxHp}`)),
        el('div', { className: 'grow' }, bar('energy', run.energy, 120, `ENERGY ${Math.floor(run.energy)} / 120`)),
        el('div', { className: 'grow' }, bar('xp', run.xp, nextLevel, `XP ${run.xp} / ${nextLevel}`))),
    );
  }

  function renderLog() {
    const lines = (run.log || []).slice(-40);
    setChildren(logBox, ...lines.map(line =>
      el('div', { className: `log-line ${line.kind ? `log-line--${line.kind}` : ''}`, text: line.text })));
    logBox.scrollTop = logBox.scrollHeight;
  }

  function refreshAll() {
    renderHud();
    renderLog();
    draw();
  }

  /* ------------------------------------------------------------
     Interactions
     ------------------------------------------------------------ */

  function handleChest(chest) {
    const drops = openChest(run, chest);
    sfx.loot();
    modal('Chest', el('div', { className: 'col gap-sm' },
      drops.length
        ? el('div', { className: 'col gap-sm' }, ...drops.map(drop =>
            el('div', { className: 'row center-y gap-sm' },
              itemIcon(drop.item, 2),
              el('div', {},
                el('div', { className: rarityClass(drop.item), text: `${drop.item.name}${drop.count > 1 ? ` x${drop.count}` : ''}` }),
                el('div', { className: 'tiny dim', text: drop.item.desc })))))
        : el('p', { className: 'small dim', text: 'Empty. Someone got here first.' })),
      [button('Take', () => { closeModal(); refreshAll(); }, { className: 'btn--primary btn--inline btn--center' })]);
    refreshAll();
  }

  function handleAltar(altar) {
    const result = useAltar(run, altar);
    sfx.heal();
    modal('Maintenance shrine', el('p', { className: 'small',
      text: `A cracked shrine left by the old sewer crew. You rest against it and recover ${result.healed} HP and 25 energy. Your afflictions clear.` }),
      [button('Move on', () => { closeModal(); refreshAll(); }, { className: 'btn--primary btn--inline btn--center' })]);
    refreshAll();
  }

  function handleStairs() {
    sfx.descend();
    descend(run);
    saveMeta();
    toast(`Descending to floor ${run.floor}.`, 'gold');
    go('dungeon');
  }

  function move(dx, dy) {
    if (busy || isModalOpen()) return;
    const result = tryMove(map, dx, dy);

    if (result.kind === 'blocked') {
      if (result.tile === 'water') toast('Too deep to wade through.', '');
      return;
    }
    if (result.kind === 'enemy') {
      syncMap(run);
      saveRun();
      go('combat', { enemy: result.enemy });
      return;
    }

    sfx.step();
    revealAround(map);

    if (result.kind === 'stairs') { handleStairs(); return; }
    if (result.kind === 'chest') { handleChest(result.chest); }
    if (result.kind === 'altar') { handleAltar(result.altar); }

    const contacts = stepEnemies(map, rng);
    syncMap(run);
    saveRun();

    if (contacts.length && !isModalOpen()) {
      go('combat', { enemy: contacts[0] });
      return;
    }
    refreshAll();
  }

  /* ------------------------------------------------------------
     Input
     ------------------------------------------------------------ */

  const KEYS = {
    ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
    w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
    W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0]
  };

  function onKeyDown(event) {
    if (isModalOpen()) {
      if (event.key === 'Escape') closeModal();
      return;
    }
    const direction = KEYS[event.key];
    if (direction) {
      event.preventDefault();
      move(direction[0], direction[1]);
      return;
    }
    if (event.key === 'i' || event.key === 'I') { event.preventDefault(); go('inventory'); }
    else if (event.key === 'c' || event.key === 'C') { event.preventDefault(); go('crafting'); }
    else if (event.key === 'Escape') { event.preventDefault(); go('menu'); }
  }

  const dpad = (label, dx, dy) => el('button', {
    className: 'btn btn--sm btn--center', type: 'button', onClick: () => move(dx, dy), text: label
  });

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, hud),
    el('div', { className: 'dungeon-stage' }, canvas),
    el('div', { className: 'row gap-sm' },
      el('div', { className: 'grow' }, logBox),
      el('div', { className: 'col gap-sm', style: { width: '250px', flex: '0 0 250px' } },
        el('div', { className: 'row gap-sm center-x' }, dpad('↑', 0, -1)),
        el('div', { className: 'row gap-sm center-x' }, dpad('←', -1, 0), dpad('↓', 0, 1), dpad('→', 1, 0)),
        el('div', { className: 'row gap-sm' },
          button('Inventory', () => go('inventory'), { className: 'btn--sm btn--center' }),
          button('Craft', () => go('crafting'), { className: 'btn--sm btn--center' })),
        button('Menu', () => go('menu'), { className: 'btn--sm btn--ghost btn--center' }),
        el('div', { className: 'tiny dim center', text: 'WASD / arrows to move · I inventory · C craft · Esc menu' }))),
  );

  return {
    node,
    mount() {
      window.addEventListener('keydown', onKeyDown);
      refreshAll();
    },
    unmount() {
      window.removeEventListener('keydown', onKeyDown);
      syncMap(run);
      saveRun();
    }
  };
}
