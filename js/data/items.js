/* Items, rarities and the drop table.

   `kind` decides where an item goes:
     consumable — usable in combat and from the inventory screen
     material   — crafting input only
     weapon     — main hand; from level 6 a one-handed weapon can go in the
                  off hand too (dual wielding)
     shield     — off hand
     helmet / armour / boots — head, chest and feet
     ring       — up to three, unlocking at levels 1, 5 and 10
     charm      — up to two, unlocking at levels 1 and 8

   Gear stats:
     atk, def, maxHp, crit, luck, energyGain — as before
     block   — chance a shield turns a blow aside (the hit is cut to 40%)
     dodge   — chance to avoid a hit entirely
     regen   — HP restored at the end of each enemy turn
     thorns  — damage dealt back to anything that hits you
     xpBonus — extra experience from every kill

   `look` tells the art how to draw an equipped item on the character. */

export const RARITIES = {
  common:    { id: 'common',    name: 'Common',    weight: 56, colour: 'var(--rar-common)',    mult: 1.0 },
  uncommon:  { id: 'uncommon',  name: 'Uncommon',  weight: 26, colour: 'var(--rar-uncommon)',  mult: 1.4 },
  rare:      { id: 'rare',      name: 'Rare',      weight: 12, colour: 'var(--rar-rare)',      mult: 2.0 },
  epic:      { id: 'epic',      name: 'Epic',      weight: 5,  colour: 'var(--rar-epic)',      mult: 3.0 },
  legendary: { id: 'legendary', name: 'Legendary', weight: 1,  colour: 'var(--rar-legendary)', mult: 4.5 }
};

export const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

export const GEAR_KINDS = ['weapon', 'shield', 'helmet', 'armour', 'boots', 'ring', 'charm'];

export const KIND_LABEL = {
  consumable: 'Consumable', material: 'Material', weapon: 'Weapon', shield: 'Shield',
  helmet: 'Helmet', armour: 'Chest armour', boots: 'Boots', ring: 'Ring', charm: 'Charm',
};

export const STAT_LABEL = {
  atk: 'ATK', def: 'DEF', maxHp: 'Max HP', crit: 'Crit', luck: 'Luck', energyGain: 'Energy gain',
  block: 'Block', dodge: 'Dodge', regen: 'Regen', thorns: 'Thorns', xpBonus: 'XP',
};

/** Stats shown as percentages rather than flat numbers. */
export const PERCENT_STATS = new Set(['crit', 'luck', 'block', 'dodge', 'xpBonus']);

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
  slime_core:    I({ id: 'slime_core', name: 'Slime Core', sprite: 'core', kind: 'material', rarity: 'common', desc: 'Still faintly warm.' }),
  bone_shard:    I({ id: 'bone_shard', name: 'Bone Shard', sprite: 'bone', kind: 'material', rarity: 'common', desc: 'Someone else did not make it out.' }),
  rusted_cog:    I({ id: 'rusted_cog', name: 'Rusted Cog', sprite: 'cog', kind: 'material', rarity: 'common', desc: 'From the pumps that once kept these tunnels dry.' }),
  leather_scrap: I({ id: 'leather_scrap', name: 'Leather Scrap', sprite: 'leather', kind: 'material', rarity: 'common', desc: 'Tough hide, cut from something that no longer needs it.' }),
  iron_scrap:    I({ id: 'iron_scrap', name: 'Iron Scrap', sprite: 'ingot', kind: 'material', rarity: 'common', desc: 'Pipe offcuts and bent plate. Hammer it into anything.' }),
  spore_cap:     I({ id: 'spore_cap', name: 'Spore Cap', sprite: 'shroom', kind: 'material', rarity: 'uncommon', desc: 'Handle with gloves.' }),
  ink_vial:      I({ id: 'ink_vial', name: 'Ink Vial', sprite: 'vial', kind: 'material', rarity: 'uncommon', desc: 'Cephalopod ink. Writes on anything.' }),
  scaled_hide:   I({ id: 'scaled_hide', name: 'Scaled Hide', sprite: 'scales', kind: 'material', rarity: 'uncommon', desc: 'Overlapping scales that turn a blade. Light, flexible, rank-smelling.' }),
  cultist_sigil: I({ id: 'cultist_sigil', name: 'Cultist Sigil', sprite: 'blueprint', kind: 'material', rarity: 'rare', desc: 'The diagram means something. You are not sure you want to know what.' }),
  drowned_pearl: I({ id: 'drowned_pearl', name: 'Drowned Pearl', sprite: 'pearl', kind: 'material', rarity: 'rare', desc: 'Cold no matter how long you hold it.' }),
  aether_dust:   I({ id: 'aether_dust', name: 'Aether Dust', sprite: 'dust', kind: 'material', rarity: 'epic', desc: 'The residue of a boss unmade. Survives death with you.' }),

  /* ---------------- weapons ---------------- */
  rusty_shortsword: I({
    id: 'rusty_shortsword', name: 'Rusty Shortsword', sprite: 'sword', kind: 'weapon', rarity: 'common',
    desc: 'Better than fists. Marginally.', stats: { atk: 3 }, floorMin: 1,
    look: { shape: 'sword', blade: '#9a8a78', hilt: '#6b4a2f' }
  }),
  bone_dagger: I({
    id: 'bone_dagger', name: 'Bone Dagger', sprite: 'dagger', kind: 'weapon', rarity: 'common',
    desc: 'Light and quick — a natural off-hand blade.', stats: { atk: 2, crit: 0.05 }, floorMin: 1,
    look: { shape: 'dagger', blade: '#e8dfc8', hilt: '#5b3d26' }
  }),
  sewer_cleaver: I({
    id: 'sewer_cleaver', name: 'Sewer Cleaver', sprite: 'cleaver', kind: 'weapon', rarity: 'uncommon',
    desc: 'Heavy, unbalanced, effective.', stats: { atk: 7 }, floorMin: 3,
    look: { shape: 'cleaver', blade: '#b9c2cf', hilt: '#4a3324' }
  }),
  pipe_hammer: I({
    id: 'pipe_hammer', name: 'Pipe Hammer', sprite: 'hammer', kind: 'weapon', rarity: 'uncommon', twoHanded: true,
    desc: 'A length of iron pipe with a valve wheel welded on. Two-handed.', stats: { atk: 10 }, floorMin: 3,
    look: { shape: 'hammer', blade: '#7d8590', hilt: '#3d4148', accent: '#b5523b' }
  }),
  runed_blade: I({
    id: 'runed_blade', name: 'Runed Blade', sprite: 'sword', kind: 'weapon', rarity: 'rare',
    desc: 'The runes brighten when you answer correctly.', stats: { atk: 12, crit: 0.05 }, floorMin: 6,
    look: { shape: 'sword', blade: '#cfe0f0', hilt: '#3b3f6b', glow: '#6fb4ff' }
  }),
  duelists_rapier: I({
    id: 'duelists_rapier', name: "Duelist's Rapier", sprite: 'rapier', kind: 'weapon', rarity: 'rare',
    desc: 'A needle of a blade with a cage of a guard.', stats: { atk: 9, crit: 0.12 }, floorMin: 6,
    look: { shape: 'rapier', blade: '#dfe6ee', hilt: '#c9a227' }
  }),
  tide_trident: I({
    id: 'tide_trident', name: 'Tide Trident', sprite: 'trident', kind: 'weapon', rarity: 'rare', twoHanded: true,
    desc: 'Long reach, three points, no mercy. Two-handed.', stats: { atk: 17, def: 2 }, floorMin: 6,
    look: { shape: 'trident', blade: '#7fd1c7', hilt: '#2f5d62' }
  }),
  archivists_quill: I({
    id: 'archivists_quill', name: "Archivist's Quill", sprite: 'quill', kind: 'weapon', rarity: 'epic',
    desc: 'Sharpened to a needle. Cuts arguments and flesh alike.',
    stats: { atk: 18, energyGain: 1 }, floorMin: 10,
    look: { shape: 'quill', blade: '#f3ecd9', hilt: '#1f2433', glow: '#c9a2ff' }
  }),
  obsidian_greataxe: I({
    id: 'obsidian_greataxe', name: 'Obsidian Greataxe', sprite: 'axe', kind: 'weapon', rarity: 'epic', twoHanded: true,
    desc: 'Volcanic glass, knapped to an edge no forge could match. Two-handed.', stats: { atk: 27, crit: 0.05 }, floorMin: 10,
    look: { shape: 'axe', blade: '#2b2533', hilt: '#5b3d26', glow: '#b48cff' }
  }),
  sovereigns_edge: I({
    id: 'sovereigns_edge', name: "Sovereign's Edge", sprite: 'sword', kind: 'weapon', rarity: 'legendary',
    desc: 'Taken from a king who drowned wearing it.',
    stats: { atk: 27, crit: 0.1, luck: 0.1 }, floorMin: 15,
    look: { shape: 'sword', blade: '#f6e7a8', hilt: '#8a5a12', glow: '#ffd56b' }
  }),
  leviathan_fang: I({
    id: 'leviathan_fang', name: 'Leviathan Fang', sprite: 'dagger', kind: 'weapon', rarity: 'legendary',
    desc: 'A tooth the length of your forearm. Deadly in either hand.', stats: { atk: 21, crit: 0.15, dodge: 0.04 }, floorMin: 15,
    look: { shape: 'fang', blade: '#f1f6f0', hilt: '#2f5d62', glow: '#7fd1c7' }
  }),

  /* ---------------- shields (off hand) ---------------- */
  pot_lid: I({
    id: 'pot_lid', name: 'Pot Lid', sprite: 'shield_round', kind: 'shield', rarity: 'common',
    desc: 'A saucepan lid with a handle bolted on. It has stopped worse.', stats: { def: 2, block: 0.08 }, floorMin: 1,
    look: { shape: 'round', colour: '#8f969e', trim: '#5d636b' }
  }),
  grate_shield: I({
    id: 'grate_shield', name: 'Grate Shield', sprite: 'shield_round', kind: 'shield', rarity: 'uncommon',
    desc: 'Cut from a storm-drain grate and backed with leather.', stats: { def: 4, block: 0.12, maxHp: 10 }, floorMin: 3,
    look: { shape: 'grate', colour: '#5f6670', trim: '#3a3f46' }
  }),
  warden_kite: I({
    id: 'warden_kite', name: 'Warden Kite Shield', sprite: 'shield_kite', kind: 'shield', rarity: 'rare',
    desc: 'The old maintenance crew’s crest, still legible under the grime.', stats: { def: 7, block: 0.16, maxHp: 20 }, floorMin: 6,
    look: { shape: 'kite', colour: '#3c6e71', trim: '#c9a227' }
  }),
  barnacle_tower: I({
    id: 'barnacle_tower', name: 'Barnacle Tower', sprite: 'shield_tower', kind: 'shield', rarity: 'epic',
    desc: 'A hull plate crusted with barnacles. Anything that hits it bleeds.', stats: { def: 11, block: 0.2, maxHp: 35, thorns: 4 }, floorMin: 10,
    look: { shape: 'tower', colour: '#4b5a52', trim: '#d8d2bf' }
  }),
  aegis_of_the_deep: I({
    id: 'aegis_of_the_deep', name: 'Aegis of the Deep', sprite: 'shield_kite', kind: 'shield', rarity: 'legendary',
    desc: 'The tunnels part around whoever carries this.', stats: { def: 15, block: 0.25, maxHp: 60 }, floorMin: 15,
    look: { shape: 'aegis', colour: '#1f4e79', trim: '#ffd56b', glow: '#6fb4ff' }
  }),

  /* ---------------- helmets ---------------- */
  miners_cap: I({
    id: 'miners_cap', name: "Miner's Cap", sprite: 'helm_cap', kind: 'helmet', rarity: 'common',
    desc: 'The lamp died long ago. The padding did not.', stats: { def: 1, maxHp: 8 }, floorMin: 1,
    look: { shape: 'cap', colour: '#c9a227', trim: '#6b5418' }
  }),
  scholars_hood: I({
    id: 'scholars_hood', name: "Scholar's Hood", sprite: 'hood', kind: 'helmet', rarity: 'uncommon',
    desc: 'Smells of library dust. Somehow it helps you think.', stats: { def: 1, crit: 0.04, maxHp: 6 }, floorMin: 2,
    look: { shape: 'hood', colour: '#4a3a6b', trim: '#c9a227' }
  }),
  rivet_helm: I({
    id: 'rivet_helm', name: 'Rivet Helm', sprite: 'helm', kind: 'helmet', rarity: 'uncommon',
    desc: 'A dented bucket of a helmet, generously riveted.', stats: { def: 3, maxHp: 14 }, floorMin: 3,
    look: { shape: 'helm', colour: '#8f969e', trim: '#5d636b' }
  }),
  warden_helm: I({
    id: 'warden_helm', name: 'Warden Helm', sprite: 'helm', kind: 'helmet', rarity: 'rare',
    desc: 'Full face, narrow slit, and a crest that used to mean something.', stats: { def: 5, maxHp: 24 }, floorMin: 6,
    look: { shape: 'greathelm', colour: '#3c6e71', trim: '#c9a227' }
  }),
  ratking_crown: I({
    id: 'ratking_crown', name: 'Rat King Crown', sprite: 'crown', kind: 'helmet', rarity: 'rare',
    desc: 'Wearing it, the smaller vermin hesitate.', stats: { atk: 5, luck: 0.2 }, floorMin: 10,
    look: { shape: 'crown', colour: '#b08d2c', trim: '#7a2e2e' }
  }),
  diving_helm: I({
    id: 'diving_helm', name: 'Diving Helm', sprite: 'diving_helm', kind: 'helmet', rarity: 'epic',
    desc: 'Brass, with a porthole and a slow, steady air feed. You heal as you breathe.', stats: { def: 8, maxHp: 40, regen: 2 }, floorMin: 10,
    look: { shape: 'diving', colour: '#b5833a', trim: '#7fd1c7' }
  }),
  crown_of_the_drowned: I({
    id: 'crown_of_the_drowned', name: 'Crown of the Drowned', sprite: 'crown', kind: 'helmet', rarity: 'legendary',
    desc: 'Coral grown into gold. It hums when you are right.', stats: { def: 10, maxHp: 50, crit: 0.08, energyGain: 1 }, floorMin: 15,
    look: { shape: 'crown', colour: '#e3c25b', trim: '#e0607e', glow: '#ffd56b' }
  }),

  /* ---------------- chest armour ---------------- */
  patched_tunic: I({
    id: 'patched_tunic', name: 'Patched Tunic', sprite: 'tunic', kind: 'armour', rarity: 'common',
    desc: 'Mostly holes, held together by optimism.', stats: { def: 2, maxHp: 10 }, floorMin: 1,
    look: { shape: 'tunic', colour: '#7a6a52', trim: '#5b4a36' }
  }),
  oilskin_coat: I({
    id: 'oilskin_coat', name: 'Oilskin Coat', sprite: 'coat', kind: 'armour', rarity: 'uncommon',
    desc: 'Waxed, waterproof, and slick enough that blows slide off.', stats: { def: 3, maxHp: 16, dodge: 0.04 }, floorMin: 3,
    look: { shape: 'coat', colour: '#c9a227', trim: '#6b5418' }
  }),
  plated_vest: I({
    id: 'plated_vest', name: 'Plated Vest', sprite: 'armour', kind: 'armour', rarity: 'uncommon',
    desc: 'Scavenged plate riveted to leather.', stats: { def: 5, maxHp: 22 }, floorMin: 3,
    look: { shape: 'vest', colour: '#8f969e', trim: '#6b4a2f' }
  }),
  scholars_robe: I({
    id: 'scholars_robe', name: "Scholar's Robe", sprite: 'robe', kind: 'armour', rarity: 'rare',
    desc: 'Embroidered with marginal notes. Every pocket holds a pencil.', stats: { def: 5, maxHp: 26, energyGain: 1 }, floorMin: 6,
    look: { shape: 'robe', colour: '#3b3f6b', trim: '#c9a227' }
  }),
  warden_mail: I({
    id: 'warden_mail', name: 'Warden Mail', sprite: 'armour', kind: 'armour', rarity: 'rare',
    desc: 'Issued to the last crew sent down here.', stats: { def: 9, maxHp: 42 }, floorMin: 6,
    look: { shape: 'mail', colour: '#9aa4ad', trim: '#3c6e71' }
  }),
  abyssal_plate: I({
    id: 'abyssal_plate', name: 'Abyssal Plate', sprite: 'armour', kind: 'armour', rarity: 'epic',
    desc: 'Barnacled, immensely heavy, worth it.', stats: { def: 14, maxHp: 72 }, floorMin: 10,
    look: { shape: 'plate', colour: '#2f3b45', trim: '#7fd1c7' }
  }),
  leviathan_scale: I({
    id: 'leviathan_scale', name: 'Leviathan Scale', sprite: 'armour', kind: 'armour', rarity: 'legendary',
    desc: 'Scales like shields, edges like knives.', stats: { def: 18, maxHp: 95, thorns: 6 }, floorMin: 15,
    look: { shape: 'scale', colour: '#2f5d62', trim: '#ffd56b', glow: '#7fd1c7' }
  }),

  /* ---------------- boots ---------------- */
  wading_boots: I({
    id: 'wading_boots', name: 'Wading Boots', sprite: 'boots', kind: 'boots', rarity: 'common',
    desc: 'Knee-high and mostly waterproof.', stats: { def: 1, maxHp: 6 }, floorMin: 1,
    look: { shape: 'boots', colour: '#3d4a3a', trim: '#2a3328' }
  }),
  runners_wraps: I({
    id: 'runners_wraps', name: "Runner's Wraps", sprite: 'wraps', kind: 'boots', rarity: 'uncommon',
    desc: 'Cloth wound tight around the feet. Silent and quick.', stats: { def: 1, dodge: 0.06 }, floorMin: 2,
    look: { shape: 'wraps', colour: '#cbbf9f', trim: '#8a7f62' }
  }),
  hobnail_boots: I({
    id: 'hobnail_boots', name: 'Hobnail Boots', sprite: 'boots', kind: 'boots', rarity: 'uncommon',
    desc: 'Iron studs grip the slime.', stats: { def: 3, maxHp: 10 }, floorMin: 3,
    look: { shape: 'boots', colour: '#5b3d26', trim: '#8f969e' }
  }),
  tunnel_striders: I({
    id: 'tunnel_striders', name: 'Tunnel Striders', sprite: 'boots', kind: 'boots', rarity: 'rare',
    desc: 'Scaled boots that never slip.', stats: { def: 4, dodge: 0.08 }, floorMin: 6,
    look: { shape: 'striders', colour: '#2f5d62', trim: '#9aa4ad' }
  }),
  eelskin_boots: I({
    id: 'eelskin_boots', name: 'Eelskin Boots', sprite: 'boots', kind: 'boots', rarity: 'epic',
    desc: 'Slippery in every useful way.', stats: { def: 6, dodge: 0.12, maxHp: 18 }, floorMin: 10,
    look: { shape: 'striders', colour: '#22343a', trim: '#7fd1c7' }
  }),
  tidewalkers: I({
    id: 'tidewalkers', name: 'Tidewalkers', sprite: 'boots', kind: 'boots', rarity: 'legendary',
    desc: 'Water steps aside for you. So do most blows.', stats: { def: 9, dodge: 0.15, maxHp: 30, energyGain: 1 }, floorMin: 15,
    look: { shape: 'striders', colour: '#1f4e79', trim: '#ffd56b', glow: '#6fb4ff' }
  }),

  /* ---------------- rings (up to three) ---------------- */
  copper_band: I({
    id: 'copper_band', name: 'Copper Band', sprite: 'ring', kind: 'ring', rarity: 'common',
    desc: 'Turns your finger green. Also your punches harder.', stats: { atk: 2 }, floorMin: 1,
    look: { colour: '#c46f3d' }
  }),
  lucky_coin: I({
    id: 'lucky_coin', name: 'Lucky Coin Ring', sprite: 'ring', kind: 'ring', rarity: 'common',
    desc: 'A bent coin hammered into a band. Slightly improves your drop luck.', stats: { luck: 0.15 }, floorMin: 1,
    look: { colour: '#e3c25b' }
  }),
  iron_band: I({
    id: 'iron_band', name: 'Iron Band', sprite: 'ring', kind: 'ring', rarity: 'uncommon',
    desc: 'Heavy and plain. You feel steadier.', stats: { def: 2, maxHp: 8 }, floorMin: 3,
    look: { colour: '#8f969e' }
  }),
  garnet_ring: I({
    id: 'garnet_ring', name: 'Garnet Ring', sprite: 'ring_gem', kind: 'ring', rarity: 'uncommon',
    desc: 'A blood-red stone. Your aim improves.', stats: { crit: 0.05 }, floorMin: 3,
    look: { colour: '#c9a227', gem: '#b02e3b' }
  }),
  sapphire_ring: I({
    id: 'sapphire_ring', name: 'Sapphire Ring', sprite: 'ring_gem', kind: 'ring', rarity: 'rare',
    desc: 'Cold blue fire in a silver claw.', stats: { atk: 4, crit: 0.05 }, floorMin: 6,
    look: { colour: '#c7ccd3', gem: '#2f6fd6' }
  }),
  ring_of_mending: I({
    id: 'ring_of_mending', name: 'Ring of Mending', sprite: 'ring_gem', kind: 'ring', rarity: 'rare',
    desc: 'Cuts close before you notice them.', stats: { regen: 2 }, floorMin: 6,
    look: { colour: '#c9a227', gem: '#4fbf6a' }
  }),
  serpent_coil: I({
    id: 'serpent_coil', name: 'Serpent Coil', sprite: 'ring_gem', kind: 'ring', rarity: 'epic',
    desc: 'It tightens when you strike true.', stats: { atk: 6, crit: 0.08, luck: 0.1 }, floorMin: 10,
    look: { colour: '#3f8f5a', gem: '#e3c25b' }
  }),
  band_of_the_tides: I({
    id: 'band_of_the_tides', name: 'Band of the Tides', sprite: 'ring_gem', kind: 'ring', rarity: 'epic',
    desc: 'It ebbs and flows with your breath.', stats: { energyGain: 1, maxHp: 20 }, floorMin: 10,
    look: { colour: '#c7ccd3', gem: '#7fd1c7' }
  }),
  ouroboros_ring: I({
    id: 'ouroboros_ring', name: 'Ouroboros Ring', sprite: 'ring_gem', kind: 'ring', rarity: 'legendary',
    desc: 'A serpent eating its tail. Every ending feeds a beginning.', stats: { atk: 8, crit: 0.1, regen: 3, luck: 0.1 }, floorMin: 15,
    look: { colour: '#e3c25b', gem: '#e0607e' }
  }),

  /* ---------------- charms (up to two) ---------------- */
  rat_tooth_charm: I({
    id: 'rat_tooth_charm', name: 'Rat-Tooth Charm', sprite: 'charm', kind: 'charm', rarity: 'common',
    desc: 'A necklace of incisors. The rats take it personally.', stats: { atk: 1, luck: 0.08 }, floorMin: 1,
    look: { colour: '#e8dfc8' }
  }),
  scribes_feather: I({
    id: 'scribes_feather', name: "Scribe's Feather", sprite: 'feather', kind: 'charm', rarity: 'uncommon',
    desc: 'Learn faster: more experience from every kill.', stats: { xpBonus: 0.15 }, floorMin: 2,
    look: { colour: '#dfe6ee' }
  }),
  scholars_lens: I({
    id: 'scholars_lens', name: "Scholar's Lens", sprite: 'lens', kind: 'charm', rarity: 'uncommon',
    desc: 'Reading is faster. Every generating move banks 1 extra energy.', stats: { energyGain: 1 }, floorMin: 3,
    look: { colour: '#9fd3e6' }
  }),
  ember_charm: I({
    id: 'ember_charm', name: 'Ember Charm', sprite: 'charm', kind: 'charm', rarity: 'rare',
    desc: 'Hot to the touch. Hurts whoever hits you.', stats: { atk: 3, thorns: 5 }, floorMin: 6,
    look: { colour: '#f06b2a' }
  }),
  sage_amulet: I({
    id: 'sage_amulet', name: 'Sage Amulet', sprite: 'amulet', kind: 'charm', rarity: 'rare',
    desc: 'An owl in tarnished silver. You learn from every fight.', stats: { xpBonus: 0.25, crit: 0.03 }, floorMin: 6,
    look: { colour: '#c7ccd3' }
  }),
  tide_charm: I({
    id: 'tide_charm', name: 'Tide Charm', sprite: 'amulet', kind: 'charm', rarity: 'epic',
    desc: 'You breathe easier in the flooded sections.', stats: { maxHp: 45, def: 5, energyGain: 1 }, floorMin: 12,
    look: { colour: '#7fd1c7' }
  }),
  infinite_index: I({
    id: 'infinite_index', name: 'The Infinite Index', sprite: 'book', kind: 'charm', rarity: 'legendary',
    desc: 'Every question you have ever answered, catalogued. Correct answers restore 5 HP.',
    stats: { energyGain: 1, luck: 0.3, atk: 6 }, special: 'index', floorMin: 20,
    look: { colour: '#c9a2ff' }
  })
};

export const ITEM_LIST = Object.values(ITEMS);

export function getItem(id) {
  return ITEMS[id];
}

export function rarityMeta(id) {
  return RARITIES[id] || RARITIES.common;
}

export function isGear(item) {
  return !!item && GEAR_KINDS.includes(item.kind);
}

/** Items a floor is allowed to drop, excluding pure crafting materials. */
export function droppableItems(floor) {
  return ITEM_LIST.filter(it => it.kind !== 'material' && (it.floorMin || 1) <= floor);
}

/** "ATK +7   Crit +5%" */
export function formatStats(stats = {}) {
  return Object.entries(stats)
    .map(([key, value]) => `${STAT_LABEL[key] || key} +${PERCENT_STATS.has(key) ? `${Math.round(value * 100)}%` : value}`)
    .join('   ');
}
