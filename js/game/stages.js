/* Floors, stages and enemy scaling.

   There is no map and no free movement. A floor is an ordered list of stages,
   each one a side-on scene: an encounter, a treasure cache or a shrine. Clear a
   stage and the camera pans to the next; clear the last and it pans to the
   ladder and up to the floor above.

   Everything here is plain JSON-safe data so a run can be saved mid-floor. */

import { makeRng } from '../core/rng.js';
import { enemiesForFloor, bossForFloor, bossLoop } from '../data/enemies.js';
import { rollChest } from './loot.js';
import { game, derived, addItem, logLine, saveRun, MAX_ENERGY } from './state.js';

/* Biomes rotate every ten floors, so the boss floor always opens a new look. */
export const BIOMES = ['brick', 'flooded', 'fungal', 'bone', 'drowned', 'archive'];

export const BIOME_NAMES = {
  brick: 'The Old Brickworks',
  flooded: 'The Flooded Mains',
  fungal: 'The Spore Galleries',
  bone: 'The Ossuary Drains',
  drowned: 'The Drowned Court',
  archive: 'The Sunken Archive',
};

export function biomeForFloor(floor) {
  return BIOMES[Math.floor(floor / 10) % BIOMES.length];
}

export function isBossFloor(floor) {
  return floor > 0 && floor % 10 === 0;
}

/* ---------------------------------------------------------------
   Enemy scaling
   --------------------------------------------------------------- */

export function scaleEnemy(template, floor, rng, { isBoss = false } = {}) {
  const growth = 1 + (floor - 1) * 0.155;
  // Beyond floor 20 the curve steepens so late floors stay threatening.
  const lateSpike = Math.pow(1.035, Math.max(0, floor - 20));
  const loops = isBoss ? bossLoop(floor) : 0;
  const loopBonus = 1 + loops * 0.45;

  const maxHp = Math.round(15 * template.hp * growth * lateSpike * loopBonus);
  const atk = Math.round(6.5 * template.atk * Math.pow(growth, 0.94) * lateSpike * (1 + loops * 0.2));
  const def = Math.round(2.2 * template.def * Math.pow(growth, 0.8) * (1 + loops * 0.15));
  const xp = Math.round(13 * template.xp * Math.pow(growth, 0.88) * loopBonus);

  return {
    uid: `${template.id}-${rng.int(1000, 999999)}`,
    templateId: template.id,
    template,
    name: loops > 0 && isBoss ? `${template.name} (Echo ${loops + 1})` : template.name,
    sprite: template.sprite,
    maxHp,
    hp: maxHp,
    atk: Math.max(2, atk),
    def: Math.max(0, def),
    xp: Math.max(4, xp),
    traits: template.traits || [],
    flavour: template.flavour,
    taunt: template.taunt,
    isBoss,
    statuses: {},
  };
}

/* ---------------------------------------------------------------
   Floor generation
   --------------------------------------------------------------- */

function combatStage(template, floor, rng, isBoss = false) {
  return { kind: 'combat', enemy: scaleEnemy(template, floor, rng, { isBoss }), cleared: false };
}

/**
 * A floor is three to five stages. Boss floors run two escorts and then the
 * boss, so the fight always arrives at the end of a build-up.
 */
export function generateFloor(seedBase, floor) {
  const rng = makeRng(`${seedBase}:floor:${floor}`);
  const boss = isBossFloor(floor);
  const pool = enemiesForFloor(floor);
  const pick = () => rng.weighted(pool.map(t => ({ ...t, weight: t.weight || 5 })));

  const stages = [];

  if (boss) {
    stages.push(combatStage(pick(), floor, rng));
    stages.push(combatStage(pick(), floor, rng));
    stages.push({ kind: 'shrine', used: false, cleared: false });
    stages.push(combatStage(bossForFloor(floor), floor, rng, true));
  } else {
    const fights = rng.int(3, 4);
    for (let i = 0; i < fights; i++) stages.push(combatStage(pick(), floor, rng));

    // A treasure cache on most floors, and a shrine every third floor. Both
    // are spliced before the final fight so a floor never ends on a freebie.
    if (rng.chance(0.7)) {
      stages.splice(rng.int(1, stages.length - 1), 0, { kind: 'treasure', opened: false, cleared: false });
    }
    if (floor % 3 === 0) {
      stages.splice(rng.int(1, stages.length - 1), 0, { kind: 'shrine', used: false, cleared: false });
    }
  }

  return {
    floor,
    biome: biomeForFloor(floor),
    biomeName: BIOME_NAMES[biomeForFloor(floor)],
    isBoss: boss,
    seed: `${seedBase}:floor:${floor}`,
    stages,
    index: 0,
  };
}

export function ensureFloor(run) {
  if (!run.floorState || run.floorState.floor !== run.floor) {
    run.floorState = generateFloor(run.seed, run.floor);
    logLine(run, isBossFloor(run.floor)
      ? `Floor ${run.floor} — ${run.floorState.biomeName}. Something enormous is waiting.`
      : `Floor ${run.floor} — ${run.floorState.biomeName}.`,
      isBossFloor(run.floor) ? 'gold' : 'info');
  }
  return run.floorState;
}

export function currentStage(run) {
  const state = ensureFloor(run);
  return state.stages[state.index] || null;
}

export function stagesRemaining(run) {
  const state = ensureFloor(run);
  return state.stages.length - state.index;
}

export function isFinalStage(run) {
  const state = ensureFloor(run);
  return state.index >= state.stages.length - 1;
}

/** Mark the current stage done. Returns 'next-stage' or 'floor-cleared'. */
export function clearStage(run) {
  const state = ensureFloor(run);
  const stage = state.stages[state.index];
  if (stage) stage.cleared = true;
  if (state.index < state.stages.length - 1) {
    state.index++;
    saveRun();
    return 'next-stage';
  }
  saveRun();
  return 'floor-cleared';
}

export function descend(run) {
  run.floor++;
  run.floorsCleared++;
  game.meta.deepestFloor = Math.max(game.meta.deepestFloor, run.floor);
  run.floorState = null;
  const state = ensureFloor(run);
  saveRun();
  return state;
}

/* ---------------------------------------------------------------
   Non-combat stages
   --------------------------------------------------------------- */

export function openTreasure(run, stage) {
  if (stage.opened) return [];
  stage.opened = true;
  const stats = derived(run);
  const rng = makeRng(`${run.seed}:chest:${run.floor}:${run.floorState.index}`);
  const drops = rollChest(rng, { luck: stats.luck, floor: run.floor });
  for (const drop of drops) {
    addItem(run, drop.item.id, drop.count);
    game.meta.itemsFound += drop.count;
    logLine(run, `Cache: ${drop.item.name}${drop.count > 1 ? ` x${drop.count}` : ''}.`, 'gold');
  }
  if (!drops.length) logLine(run, 'The cache is empty. Someone got here first.', 'info');
  saveRun();
  return drops;
}

export function useShrine(run, stage) {
  if (stage.used) return null;
  stage.used = true;
  const stats = derived(run);
  const before = run.hp;
  run.hp = Math.min(stats.maxHp, run.hp + Math.round(stats.maxHp * 0.45));
  run.energy = Math.min(MAX_ENERGY, run.energy + 4);
  run.statuses = {};
  const healed = run.hp - before;
  logLine(run, `The maintenance shrine restores ${healed} HP and 4 energy.`, 'good');
  saveRun();
  return { healed };
}
