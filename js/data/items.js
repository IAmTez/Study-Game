/* Items, rarities and the drop table.

   `kind` decides where an item can be used:
     consumable — usable in combat and from the inventory screen
     material   — crafting input only
     weapon / armour / trinket — equippable, one of each at a time
*/

export const RARITIES = {
  common:    { id: 'common',    name: 'Common',    weight: 56, colour: 'var(--rar-common)',    mult: 1.0 },
  uncommon:  { id: 'uncommon',  name: 'Uncommon',  weight: 26, colour: 'var(--rar-uncommon)',  mult: 1.4 },
  rare:      { id: 'rare',      name: 'Rare',      weight: 12, colour: 'var(--rar-rare)',      mult: 2.0 },
  epic:      { id: 'epic',      name: 'Epic',      weight: 5,  colour: 'var(--rar-epic)',      mult: 3.0 },
  legendary: { id: 'legendary', name: 'Legendary', weight: 1,  colour: 'var(--rar-legendary)', mult: 4.5 }
};

export const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

const I = (item) => item;

export const ITEMS = {

  /* ---------------- consumables ---------------- */
  study_ration: I({
    id: 'study_ration', name: 'Study Ration', sprite: 'shroom', kind: 'consumable', rarity: 'common',
    desc: 'Cold sewer mushroom stew. Restores 22 HP and 2 energy.',
    use: { heal: 22, energy: 2 }, floorMin: 1
  }),
  small_potion: I({
    id: 'small_potion', name: 'Minor Salve', sprite: 'potion_hp', kind: 'consumable', rarity: 'common',
    desc: 'Restores 35 HP.', use: { heal: 35 }, floorMin: 1
  }),
  large_potion: I({
    id: 'large_potion', name: 'Greater Salve', sprite: 'potion_hp', kind: 'consumable', rarity: 'uncommon',
    desc: 'Restores 85 HP.', use: { heal: 85 }, floorMin: 3
  }),
  elixir: I({
    id: 'elixir', name: 'Full Elixir', sprite: 'potion_hp', kind: 'consumable', rarity: 'epic',
    desc: 'Restores all HP and clears every status effect.',
    use: { healPct: 1, cure: true }, floorMin: 8
  }),
  energy_draught: I({
    id: 'energy_draught', name: 'Energy Draught', sprite: 'potion_energy', kind: 'consumable', rarity: 'common',
    desc: 'Banks 5 energy immediately.', use: { energy: 5 }, floorMin: 1
  }),
  focus_tonic: I({
    id: 'focus_tonic', name: 'Focus Tonic', sprite: 'potion_energy', kind: 'consumable', rarity: 'rare',
    desc: 'Banks 12 energy — a full ultimate in one gulp.',
    use: { energy: 12 }, floorMin: 5
  }),
  antidote: I({
    id: 'antidote', name: 'Antidote', sprite: 'potion_cure', kind: 'consumable', rarity: 'common',
    desc: 'Clears poison, burning and bleeding.', use: { cure: true }, floorMin: 2
  }),
  hint_scroll: I({
    id: 'hint_scroll', name: 'Free Hint', sprite: 'scroll', kind: 'consumable', rarity: 'uncommon',
    desc: 'Strikes out two wrong options, or reveals a required keyword on a short answer. Usable while a question is open.',
    use: { hint: 1 }, inQuestion: true, floorMin: 1
  }),
  greater_hint: I({
    id: 'greater_hint', name: 'Marginalia', sprite: 'scroll', kind: 'consumable', rarity: 'rare',
    desc: 'Reveals the answer outright. You still have to read it. Usable while a question is open.',
    use: { hint: 2 }, inQuestion: true, floorMin: 4
  }),
  revive_ankh: I({
    id: 'revive_ankh', name: 'Free Revive', sprite: 'ankh', kind: 'consumable', rarity: 'epic',
    desc: 'Consumed automatically on death: you get back up with 50% HP.',
    use: { revive: 0.5 }, passive: true, floorMin: 5
  }),
  phoenix_ankh: I({
    id: 'phoenix_ankh', name: 'Phoenix Ankh', sprite: 'ankh', kind: 'consumable', rarity: 'legendary',
    desc: 'Consumed automatically on death: full HP, full energy, statuses cleared.',
    use: { revive: 1, cure: true }, passive: true, floorMin: 10
  }),
  sewer_bomb: I({
    id: 'sewer_bomb', name: 'Sewer Bomb', sprite: 'bomb', kind: 'consumable', rarity: 'uncommon',
    desc: 'Deals 45 damage, ignoring armour.', use: { damage: 45 }, combatOnly: true, floorMin: 2
  }),
  runic_bomb: I({
    id: 'runic_bomb', name: 'Runic Charge', sprite: 'bomb', kind: 'consumable', rarity: 'rare',
    desc: 'Deals 110 damage, ignoring armour.', use: { damage: 110 }, combatOnly: true, floorMin: 6
  }),
  ward_stone: I({
    id: 'ward_stone', name: 'Ward Stone', sprite: 'gem', kind: 'consumable', rarity: 'uncommon',
    desc: 'Blocks the next two enemy attacks entirely.', use: { guard: 2 }, combatOnly: true, floorMin: 3
  }),

  /* ---------------- materials ---------------- */
  rat_tail:      I({ id: 'rat_tail', name: 'Rat Tail', sprite: 'tail', kind: 'material', rarity: 'common', desc: 'Sinewy. Useful as cord.' }),
  slime_core:    I({ id: 'slime_core', name: 'Slime Core', sprite: 'gem', kind: 'material', rarity: 'common', desc: 'Still faintly warm.' }),
  bone_shard:    I({ id: 'bone_shard', name: 'Bone Shard', sprite: 'bone', kind: 'material', rarity: 'common', desc: 'Someone else did not make it out.' }),
  rusted_cog:    I({ id: 'rusted_cog', name: 'Rusted Cog', sprite: 'cog', kind: 'material', rarity: 'common', desc: 'From the pumps that once kept these tunnels dry.' }),
  spore_cap:     I({ id: 'spore_cap', name: 'Spore Cap', sprite: 'shroom', kind: 'material', rarity: 'uncommon', desc: 'Handle with gloves.' }),
  ink_vial:      I({ id: 'ink_vial', name: 'Ink Vial', sprite: 'vial', kind: 'material', rarity: 'uncommon', desc: 'Cephalopod ink. Writes on anything.' }),
  cultist_sigil: I({ id: 'cultist_sigil', name: 'Cultist Sigil', sprite: 'blueprint', kind: 'material', rarity: 'rare', desc: 'The diagram means something. You are not sure you want to know what.' }),
  drowned_pearl: I({ id: 'drowned_pearl', name: 'Drowned Pearl', sprite: 'gem', kind: 'material', rarity: 'rare', desc: 'Cold no matter how long you hold it.' }),
  aether_dust:   I({ id: 'aether_dust', name: 'Aether Dust', sprite: 'dust', kind: 'material', rarity: 'epic', desc: 'The residue of a boss unmade. Survives death with you.' }),

  /* ---------------- weapons ---------------- */
  rusty_shortsword: I({
    id: 'rusty_shortsword', name: 'Rusty Shortsword', sprite: 'sword', kind: 'weapon', rarity: 'common',
    desc: 'Better than fists. Marginally.', stats: { atk: 3 }, floorMin: 1
  }),
  sewer_cleaver: I({
    id: 'sewer_cleaver', name: 'Sewer Cleaver', sprite: 'sword', kind: 'weapon', rarity: 'uncommon',
    desc: 'Heavy, unbalanced, effective.', stats: { atk: 7 }, floorMin: 3
  }),
  runed_blade: I({
    id: 'runed_blade', name: 'Runed Blade', sprite: 'sword', kind: 'weapon', rarity: 'rare',
    desc: 'The runes brighten when you answer correctly.', stats: { atk: 12, crit: 0.05 }, floorMin: 6
  }),
  archivists_quill: I({
    id: 'archivists_quill', name: "Archivist's Quill", sprite: 'sword', kind: 'weapon', rarity: 'epic',
    desc: 'Sharpened to a needle. Cuts arguments and flesh alike.',
    stats: { atk: 18, energyGain: 1 }, floorMin: 10
  }),
  sovereigns_edge: I({
    id: 'sovereigns_edge', name: "Sovereign's Edge", sprite: 'sword', kind: 'weapon', rarity: 'legendary',
    desc: 'Taken from a king who drowned wearing it.',
    stats: { atk: 27, crit: 0.1, luck: 0.1 }, floorMin: 15
  }),

  /* ---------------- armour ---------------- */
  patched_tunic: I({
    id: 'patched_tunic', name: 'Patched Tunic', sprite: 'armour', kind: 'armour', rarity: 'common',
    desc: 'Mostly holes, held together by optimism.', stats: { def: 2, maxHp: 10 }, floorMin: 1
  }),
  plated_vest: I({
    id: 'plated_vest', name: 'Plated Vest', sprite: 'armour', kind: 'armour', rarity: 'uncommon',
    desc: 'Scavenged plate riveted to leather.', stats: { def: 5, maxHp: 22 }, floorMin: 3
  }),
  warden_mail: I({
    id: 'warden_mail', name: 'Warden Mail', sprite: 'armour', kind: 'armour', rarity: 'rare',
    desc: 'Issued to the last crew sent down here.', stats: { def: 9, maxHp: 42 }, floorMin: 6
  }),
  abyssal_plate: I({
    id: 'abyssal_plate', name: 'Abyssal Plate', sprite: 'armour', kind: 'armour', rarity: 'epic',
    desc: 'Barnacled, immensely heavy, worth it.', stats: { def: 14, maxHp: 72 }, floorMin: 10
  }),
  aegis_of_the_deep: I({
    id: 'aegis_of_the_deep', name: 'Aegis of the Deep', sprite: 'shield', kind: 'armour', rarity: 'legendary',
    desc: 'The tunnels part around whoever wears this.', stats: { def: 21, maxHp: 115 }, floorMin: 15
  }),

  /* ---------------- trinkets ---------------- */
  lucky_coin: I({
    id: 'lucky_coin', name: 'Lucky Coin', sprite: 'ring', kind: 'trinket', rarity: 'common',
    desc: 'Slightly improves your drop luck.', stats: { luck: 0.15 }, floorMin: 1
  }),
  scholars_lens: I({
    id: 'scholars_lens', name: "Scholar's Lens", sprite: 'ring', kind: 'trinket', rarity: 'uncommon',
    desc: 'Reading is faster. Every generating move banks 1 extra energy.', stats: { energyGain: 1 }, floorMin: 3
  }),
  ratking_crown: I({
    id: 'ratking_crown', name: 'Rat King Crown', sprite: 'amulet', kind: 'trinket', rarity: 'rare',
    desc: 'Wearing it, the smaller vermin hesitate.', stats: { atk: 5, luck: 0.2 }, floorMin: 10
  }),
  tide_charm: I({
    id: 'tide_charm', name: 'Tide Charm', sprite: 'amulet', kind: 'trinket', rarity: 'epic',
    desc: 'You breathe easier in the flooded sections.', stats: { maxHp: 45, def: 5, energyGain: 1 }, floorMin: 12
  }),
  infinite_index: I({
    id: 'infinite_index', name: 'The Infinite Index', sprite: 'book', kind: 'trinket', rarity: 'legendary',
    desc: 'Every question you have ever answered, catalogued. Correct answers restore 5 HP.',
    stats: { energyGain: 1, luck: 0.3, atk: 6 }, special: 'index', floorMin: 20
  })
};

export const ITEM_LIST = Object.values(ITEMS);

export function getItem(id) {
  return ITEMS[id];
}

export function rarityMeta(id) {
  return RARITIES[id] || RARITIES.common;
}

/** Items a floor is allowed to drop, excluding pure crafting materials. */
export function droppableItems(floor) {
  return ITEM_LIST.filter(it => it.kind !== 'material' && (it.floorMin || 1) <= floor);
}
