/* Enemy templates. Concrete stats are derived per-floor in game/stages.js —
   these are the shapes, not the numbers. */

export const ENEMIES = [
  {
    id: 'rat', name: 'Sewer Rat', sprite: 'rat', floorMin: 1, floorMax: 14,
    hp: 0.8, atk: 0.85, def: 0.6, xp: 0.9, weight: 10,
    drops: ['rat_tail', 'bone_shard'],
    flavour: 'Bloated, unbothered, and far too confident.'
  },
  {
    id: 'slime', name: 'Effluent Slime', sprite: 'slime', floorMin: 1, floorMax: 18,
    hp: 1.15, atk: 0.75, def: 0.9, xp: 1.0, weight: 10,
    drops: ['slime_core'], traits: ['armoured'],
    flavour: 'Absorbs blows the way a sponge absorbs rain.'
  },
  {
    id: 'bat', name: 'Grotto Bat', sprite: 'bat', floorMin: 2, floorMax: 20,
    hp: 0.7, atk: 1.05, def: 0.5, xp: 0.95, weight: 9,
    drops: ['bone_shard'], traits: ['swift'],
    flavour: 'Fast enough that a slow answer costs you.'
  },
  {
    id: 'crab', name: 'Iron Crab', sprite: 'crab', floorMin: 3, floorMax: 26,
    hp: 1.1, atk: 0.95, def: 1.5, xp: 1.15, weight: 8,
    drops: ['rusted_cog', 'drowned_pearl'], traits: ['armoured'],
    flavour: 'Its shell has taken on the colour of the pipes.'
  },
  {
    id: 'ghoul', name: 'Tunnel Ghoul', sprite: 'ghoul', floorMin: 4, floorMax: 32,
    hp: 1.2, atk: 1.15, def: 0.8, xp: 1.25, weight: 8,
    drops: ['bone_shard', 'rat_tail'], traits: ['enrage'],
    flavour: 'It remembers being a maintenance worker. Barely.'
  },
  {
    id: 'fungus', name: 'Fungal Horror', sprite: 'fungus', floorMin: 5, floorMax: 40,
    hp: 1.35, atk: 1.0, def: 0.9, xp: 1.3, weight: 7,
    drops: ['spore_cap'], traits: ['poisonous', 'regen'],
    flavour: 'The spores get into everything. Including you.'
  },
  {
    id: 'croc', name: 'Sewer Croc', sprite: 'croc', floorMin: 6, floorMax: 48,
    hp: 1.4, atk: 1.3, def: 1.0, xp: 1.45, weight: 7,
    drops: ['bone_shard', 'drowned_pearl'], traits: ['enrage'],
    flavour: 'The urban legend was true, and it is hungry.'
  },
  {
    id: 'cultist', name: 'Drain Cultist', sprite: 'cultist', floorMin: 7, floorMax: 60,
    hp: 1.15, atk: 1.4, def: 0.85, xp: 1.5, weight: 7,
    drops: ['cultist_sigil', 'ink_vial'], traits: ['swift'],
    flavour: 'Chanting something in a language that predates plumbing.'
  },
  {
    id: 'sludge', name: 'Sludge Golem', sprite: 'sludge', floorMin: 9, floorMax: 999,
    hp: 1.9, atk: 1.2, def: 1.4, xp: 1.7, weight: 6,
    drops: ['slime_core', 'rusted_cog'], traits: ['armoured', 'regen'],
    flavour: 'Every scrap the tunnels ever swallowed, walking.'
  },
  {
    id: 'wraith', name: 'Pipe Wraith', sprite: 'wraith', floorMin: 12, floorMax: 999,
    hp: 1.1, atk: 1.65, def: 0.7, xp: 1.85, weight: 6,
    drops: ['ink_vial', 'aether_dust'], traits: ['swift', 'phasing'],
    flavour: 'Armour is a suggestion to something with no body.'
  },
  {
    id: 'drowned', name: 'Drowned Watchman', sprite: 'drowned', floorMin: 14, floorMax: 999,
    hp: 1.6, atk: 1.5, def: 1.2, xp: 2.0, weight: 6,
    drops: ['drowned_pearl', 'rusted_cog'], traits: ['enrage', 'armoured'],
    flavour: 'Still holding the lantern. Still walking the route.'
  },
  {
    id: 'serpent', name: 'Effluvium Serpent', sprite: 'serpent', floorMin: 18, floorMax: 999,
    hp: 1.7, atk: 1.7, def: 1.0, xp: 2.2, weight: 5,
    drops: ['spore_cap', 'aether_dust'], traits: ['poisonous', 'swift'],
    flavour: 'It has been growing down here, uninterrupted, for a long time.'
  },
];

/* Bosses appear on every tenth floor and cycle, growing with each loop. */
export const BOSSES = [
  {
    id: 'ratking', name: 'The Rat King', sprite: 'boss_ratking',
    hp: 4.2, atk: 1.5, def: 1.2, xp: 6,
    drops: ['ratking_crown', 'aether_dust', 'rat_tail'],
    traits: ['enrage'],
    flavour: 'A knot of a hundred tails wearing a crown of gutter gold.',
    taunt: 'The tunnels answer to me. Do you have an answer for them?'
  },
  {
    id: 'leviathan', name: 'Sludge Leviathan', sprite: 'boss_leviathan',
    hp: 5.2, atk: 1.6, def: 1.6, xp: 7,
    drops: ['abyssal_plate', 'aether_dust', 'slime_core'],
    traits: ['armoured', 'regen'],
    flavour: 'The overflow channel is not a channel. It is a throat.',
    taunt: 'Everything washed down here eventually. So did you.'
  },
  {
    id: 'plague', name: 'Plague Warden', sprite: 'boss_plague',
    hp: 4.8, atk: 1.85, def: 1.3, xp: 8,
    drops: ['warden_mail', 'aether_dust', 'spore_cap'],
    traits: ['poisonous', 'enrage'],
    flavour: 'It was sent to contain the rot. It succeeded, from the inside.',
    taunt: 'Quarantine holds. You will be filed with the rest.'
  },
  {
    id: 'sovereign', name: 'The Drowned Sovereign', sprite: 'boss_sovereign',
    hp: 5.8, atk: 2.0, def: 1.7, xp: 9,
    drops: ['sovereigns_edge', 'aether_dust', 'drowned_pearl'],
    traits: ['armoured', 'enrage'],
    flavour: 'Crowned, waterlogged, and still holding court over nothing.',
    taunt: 'Kneel, or be corrected.'
  },
  {
    id: 'archivist', name: 'Archivist of the Deep', sprite: 'boss_archivist',
    hp: 6.4, atk: 2.1, def: 1.5, xp: 11,
    drops: ['infinite_index', 'archivists_quill', 'aether_dust'],
    traits: ['phasing', 'swift', 'enrage'],
    flavour: 'It has read every page that ever fell down a drain, including yours.',
    taunt: 'I have your working. Let us see if you can defend it.'
  },
];

/** Pick the boss for a boss floor (10, 20, 30 …), cycling through the list. */
export function bossForFloor(floor) {
  const index = Math.floor(floor / 10 - 1);
  return BOSSES[((index % BOSSES.length) + BOSSES.length) % BOSSES.length];
}

/** How many complete loops of the boss list have been cleared. */
export function bossLoop(floor) {
  return Math.floor((floor / 10 - 1) / BOSSES.length);
}

export function enemiesForFloor(floor) {
  const pool = ENEMIES.filter(e => floor >= e.floorMin && floor <= e.floorMax);
  return pool.length ? pool : ENEMIES.slice(-4);
}
