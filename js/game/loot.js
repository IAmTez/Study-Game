/* Drop rolls. Rarity is weighted, then a specific item of that rarity is
   chosen from what the current floor permits. */

import { RARITIES, RARITY_ORDER, droppableItems, ITEMS } from '../data/items.js';

/**
 * Roll a rarity. Luck shifts weight from common towards the top tiers, and
 * deeper floors do the same more gently.
 */
export function rollRarity(rng, { luck = 0, floor = 1, minimum = null } = {}) {
  const depthBonus = Math.min(1.6, floor / 25);
  const entries = RARITY_ORDER.map((id, index) => {
    const base = RARITIES[id].weight;
    // index 0 = common; higher tiers gain from luck and depth.
    const boost = index === 0 ? 1 / (1 + luck * 0.8 + depthBonus * 0.35)
                              : 1 + (luck * index * 0.55) + (depthBonus * index * 0.22);
    return { id, weight: base * boost };
  });

  let chosen = rng.weighted(entries).id;
  if (minimum) {
    const floorIndex = RARITY_ORDER.indexOf(minimum);
    if (RARITY_ORDER.indexOf(chosen) < floorIndex) chosen = minimum;
  }
  return chosen;
}

/** One item drop, or null if the roll produced nothing usable. */
export function rollItem(rng, { luck = 0, floor = 1, minimum = null } = {}) {
  const rarity = rollRarity(rng, { luck, floor, minimum });
  const candidates = droppableItems(floor).filter(it => it.rarity === rarity);
  if (!candidates.length) {
    // Nothing of that rarity is unlocked yet — step down until something is.
    for (let i = RARITY_ORDER.indexOf(rarity) - 1; i >= 0; i--) {
      const fallback = droppableItems(floor).filter(it => it.rarity === RARITY_ORDER[i]);
      if (fallback.length) return rng.pick(fallback);
    }
    return null;
  }
  return rng.pick(candidates);
}

/**
 * The full drop set for a defeated enemy: guaranteed materials from its table,
 * plus a chance at a real item.
 */
export function rollEnemyDrops(rng, enemy, { luck = 0, floor = 1, extraRolls = 0 } = {}) {
  const drops = [];

  for (const materialId of enemy.template.drops || []) {
    const item = ITEMS[materialId];
    if (!item) continue;
    const chance = item.kind === 'material' ? 0.55 : 0.18;
    if (rng.chance(chance * (1 + luck * 0.5))) {
      drops.push({ item, count: 1 });
    }
  }

  const baseChance = enemy.isBoss ? 1 : 0.34;
  const rolls = (enemy.isBoss ? 2 : 1) + extraRolls;
  for (let i = 0; i < rolls; i++) {
    if (!rng.chance(baseChance * (1 + luck))) continue;
    const item = rollItem(rng, {
      luck,
      floor,
      minimum: enemy.isBoss ? (i === 0 ? 'rare' : null) : null
    });
    if (item) drops.push({ item, count: 1 });
  }

  // Merge duplicates so the loot readout stays short.
  const merged = new Map();
  for (const drop of drops) {
    const existing = merged.get(drop.item.id);
    if (existing) existing.count += drop.count;
    else merged.set(drop.item.id, { ...drop });
  }
  return [...merged.values()];
}

/** Chest contents: two or three rolls with a decent rarity floor. */
export function rollChest(rng, { luck = 0, floor = 1 } = {}) {
  const count = rng.int(2, 3);
  const drops = [];
  for (let i = 0; i < count; i++) {
    const item = rollItem(rng, { luck, floor, minimum: i === 0 ? 'uncommon' : null });
    if (item) drops.push({ item, count: 1 });
  }
  const merged = new Map();
  for (const drop of drops) {
    const existing = merged.get(drop.item.id);
    if (existing) existing.count += drop.count;
    else merged.set(drop.item.id, { ...drop });
  }
  return [...merged.values()];
}
