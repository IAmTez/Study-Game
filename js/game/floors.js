/* Floor lifecycle: generating, persisting and interacting with the current map.

   The live map holds a Set for revealed tiles, which JSON cannot carry, so the
   deserialised map is cached here and `run.map` always holds the plain form. */

import { makeRng } from '../core/rng.js';
import { generateFloor, serialiseMap, deserialiseMap, isBossFloor } from './dungeon.js';
import { rollChest } from './loot.js';
import { game, derived, addItem, logLine, saveRun } from './state.js';

let liveMap = null;
let liveKey = '';

export function ensureMap(run) {
  const key = `${run.seed}:${run.floor}`;
  if (liveMap && liveKey === key) return liveMap;

  if (run.map && run.map.floor === run.floor) {
    liveMap = deserialiseMap(run.map);
  } else {
    liveMap = generateFloor(run.seed, run.floor);
    logLine(run, isBossFloor(run.floor)
      ? `Floor ${run.floor}. Something enormous is waiting.`
      : `Floor ${run.floor}.`, isBossFloor(run.floor) ? 'gold' : 'info');
  }
  liveKey = key;
  revealAround(liveMap);
  syncMap(run);
  return liveMap;
}

export function syncMap(run) {
  if (liveMap) run.map = serialiseMap(liveMap);
}

export function forgetMap() {
  liveMap = null;
  liveKey = '';
}

export const VISION_RADIUS = 7;

/** Mark tiles near the player as seen, for the fog-of-war overlay. */
export function revealAround(map) {
  const { x, y } = map.player;
  for (let dy = -VISION_RADIUS; dy <= VISION_RADIUS; dy++) {
    for (let dx = -VISION_RADIUS; dx <= VISION_RADIUS; dx++) {
      if (dx * dx + dy * dy > VISION_RADIUS * VISION_RADIUS) continue;
      map.revealed.add(`${x + dx},${y + dy}`);
    }
  }
}

export function descend(run) {
  run.floor++;
  run.floorsCleared++;
  game.meta.deepestFloor = Math.max(game.meta.deepestFloor, run.floor);
  run.map = null;
  forgetMap();
  const map = ensureMap(run);
  saveRun();
  return map;
}

export function openChest(run, chest) {
  if (chest.opened) return [];
  chest.opened = true;
  const map = ensureMap(run);
  map.tiles[chest.y][chest.x] = 'chest_open';

  const stats = derived(run);
  const rng = makeRng(`${run.seed}:chest:${run.floor}:${chest.x},${chest.y}`);
  const drops = rollChest(rng, { luck: stats.luck, floor: run.floor });
  for (const drop of drops) {
    addItem(run, drop.item.id, drop.count);
    game.meta.itemsFound += drop.count;
    logLine(run, `Chest: ${drop.item.name}${drop.count > 1 ? ` x${drop.count}` : ''}.`, 'gold');
  }
  if (!drops.length) logLine(run, 'The chest is empty. Someone got here first.', 'info');
  syncMap(run);
  saveRun();
  return drops;
}

export function useAltar(run, altar) {
  if (altar.used) return null;
  altar.used = true;
  const stats = derived(run);
  const heal = Math.round(stats.maxHp * 0.45);
  const before = run.hp;
  run.hp = Math.min(stats.maxHp, run.hp + heal);
  run.energy = Math.min(120, run.energy + 25);
  run.statuses = {};
  logLine(run, `The old maintenance shrine restores ${run.hp - before} HP and 25 energy.`, 'good');
  syncMap(run);
  saveRun();
  return { healed: run.hp - before };
}

/** Remove a defeated enemy from the live map. */
export function removeEnemy(run, enemy) {
  const map = ensureMap(run);
  const index = map.enemies.findIndex(e => e.uid === enemy.uid);
  if (index >= 0) map.enemies.splice(index, 1);
  syncMap(run);
  saveRun();
}
