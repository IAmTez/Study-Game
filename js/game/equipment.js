/* Equipment slots and the rules for filling them.

   Everyone has a head, chest, feet, main hand and off hand. Extra ring and
   charm slots open as you level, and from level 6 the off hand can hold a
   second one-handed weapon instead of a shield. A two-handed weapon takes
   both hands.

   An equipped item stays in the inventory; a slot just points at it. Two
   slots can point at the same item only if you own two of it. */

import { getItem } from '../data/items.js';

export const DUAL_WIELD_LEVEL = 6;

/** An off-hand weapon adds this share of its attack. */
export const OFF_HAND_ATTACK = 0.6;

export const SLOTS = [
  { key: 'head',   label: 'Head',      accepts: ['helmet'] },
  { key: 'chest',  label: 'Chest',     accepts: ['armour'] },
  { key: 'feet',   label: 'Feet',      accepts: ['boots'] },
  { key: 'main',   label: 'Main hand', accepts: ['weapon'] },
  { key: 'off',    label: 'Off hand',  accepts: ['shield', 'weapon'] },
  { key: 'ring1',  label: 'Ring I',    accepts: ['ring'] },
  { key: 'ring2',  label: 'Ring II',   accepts: ['ring'], level: 5 },
  { key: 'ring3',  label: 'Ring III',  accepts: ['ring'], level: 10 },
  { key: 'charm1', label: 'Charm I',   accepts: ['charm'] },
  { key: 'charm2', label: 'Charm II',  accepts: ['charm'], level: 8 },
];

export const SLOT_KEYS = SLOTS.map(slot => slot.key);

export function slotMeta(key) {
  return SLOTS.find(slot => slot.key === key);
}

export function emptyEquipment() {
  return Object.fromEntries(SLOT_KEYS.map(key => [key, null]));
}

export function slotUnlocked(run, slotOrKey) {
  const slot = typeof slotOrKey === 'string' ? slotMeta(slotOrKey) : slotOrKey;
  return !!slot && run.level >= (slot.level || 1);
}

export function equippedCount(run, itemId) {
  return SLOT_KEYS.filter(key => run.equipped?.[key] === itemId).length;
}

export function isEquipped(run, itemId) {
  return equippedCount(run, itemId) > 0;
}

/** Every filled slot, in display order. */
export function equippedEntries(run) {
  return SLOTS
    .map(slot => ({ slot, item: run.equipped?.[slot.key] ? getItem(run.equipped[slot.key]) : null }))
    .filter(entry => entry.item);
}

/** The slots this kind of item can ever go in (locked or not). */
export function slotsForItem(item) {
  return SLOTS.filter(slot => slot.accepts.includes(item.kind));
}

/**
 * Can `item` go in `slotKey` right now? Returns { ok, reason }.
 * `owned` is how many the player holds; it guards against equipping one
 * ring into two slots.
 */
export function canEquip(run, item, slotKey, owned) {
  const slot = slotMeta(slotKey);
  if (!item || !slot || !slot.accepts.includes(item.kind)) return { ok: false, reason: 'That does not go there.' };
  if (!slotUnlocked(run, slot)) return { ok: false, reason: `${slot.label} unlocks at level ${slot.level}.` };
  if (run.equipped[slotKey] === item.id) return { ok: false, reason: 'Already equipped there.' };

  if (slotKey === 'off') {
    const main = run.equipped.main && getItem(run.equipped.main);
    if (main?.twoHanded) return { ok: false, reason: `${main.name} needs both hands.` };
    if (item.kind === 'weapon') {
      if (run.level < DUAL_WIELD_LEVEL) return { ok: false, reason: `Dual wielding unlocks at level ${DUAL_WIELD_LEVEL}.` };
      if (item.twoHanded) return { ok: false, reason: 'A two-handed weapon cannot go in the off hand.' };
    }
  }

  const elsewhere = equippedCount(run, item.id);
  if (elsewhere >= owned) return { ok: false, reason: owned > 1 ? `All ${owned} are already equipped.` : 'It is already equipped in another slot.' };
  return { ok: true };
}

/**
 * The slot an Equip button should use when the player does not pick one:
 * the first empty, unlocked slot that takes it, otherwise the first one
 * (which is then replaced). Weapons always default to the main hand.
 */
export function defaultSlot(run, item, owned) {
  const candidates = slotsForItem(item).filter(slot => slotUnlocked(run, slot));
  if (item.kind === 'weapon') return 'main';
  const empty = candidates.find(slot => !run.equipped[slot.key] && canEquip(run, item, slot.key, owned).ok);
  if (empty) return empty.key;
  const usable = candidates.find(slot => canEquip(run, item, slot.key, owned).ok);
  return usable ? usable.key : candidates[0]?.key || null;
}

/** Put `item` in `slotKey`. A two-handed weapon empties the off hand. */
export function placeInSlot(run, item, slotKey) {
  run.equipped[slotKey] = item.id;
  if (slotKey === 'main' && item.twoHanded) run.equipped.off = null;
  // Moving a weapon from one hand to the other should not leave it in both
  // unless there really are two of them — canEquip already guaranteed that.
}

/** Remove anything whose slot has become invalid (e.g. after a recipe used it up). */
export function pruneEquipment(run, countOf) {
  const seen = {};
  for (const key of SLOT_KEYS) {
    const id = run.equipped[key];
    if (!id) continue;
    const item = getItem(id);
    seen[id] = (seen[id] || 0) + 1;
    const slot = slotMeta(key);
    if (!item || !slot.accepts.includes(item.kind) || seen[id] > countOf(id)) run.equipped[key] = null;
  }
}

/**
 * Saves made before slots existed stored { weapon, armour, trinket }. Map
 * them onto the new slots so an in-progress run carries on wearing its gear.
 */
export function migrateEquipment(run) {
  const old = run.equipped || {};
  if (SLOT_KEYS.every(key => key in old) && !('weapon' in old) && !('trinket' in old)) return false;

  const next = emptyEquipment();
  for (const key of SLOT_KEYS) if (old[key]) next[key] = old[key];

  const place = (id) => {
    const item = id && getItem(id);
    if (!item) return;
    const target = { weapon: 'main', shield: 'off', helmet: 'head', armour: 'chest', boots: 'feet', ring: 'ring1', charm: 'charm1' }[item.kind];
    if (target && !next[target]) next[target] = id;
  };
  place(old.weapon);
  place(old.armour);
  place(old.trinket);

  run.equipped = next;
  return true;
}
