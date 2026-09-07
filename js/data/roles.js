/* Player roles. The choice is made once at the start of a run and shapes
   stat spread, energy economy, ability list and a passive perk. */

export const ROLES = [
  {
    id: 'knight',
    name: 'Knight',
    sprite: 'knight',
    blurb: 'Heavily armoured, slow to fall. Forgiving for long dives.',
    stats: { maxHp: 145, atk: 10, def: 9, energyGain: 0.85, crit: 0.05, luck: 0.0 },
    perk: { name: 'Bulwark', desc: 'Take 25% less damage from wrong answers.' },
    abilities: ['strike', 'brace', 'shield_bash', 'cleave', 'ironclad_charge']
  },
  {
    id: 'mage',
    name: 'Mage',
    sprite: 'mage',
    blurb: 'Glass cannon. Ends fights before they start — if you know your stuff.',
    stats: { maxHp: 92, atk: 17, def: 3, energyGain: 1.3, crit: 0.08, luck: 0.05 },
    perk: { name: 'Arcane Surge', desc: 'Abilities deal +30% damage.' },
    abilities: ['strike', 'brace', 'ember', 'frost_lance', 'arcane_nova']
  },
  {
    id: 'rogue',
    name: 'Rogue',
    sprite: 'rogue',
    blurb: 'Fast, lucky, light on health. Finds far more loot.',
    stats: { maxHp: 106, atk: 13, def: 5, energyGain: 1.1, crit: 0.2, luck: 0.35 },
    perk: { name: 'Scavenger', desc: '+35% drop chance and an extra loot roll from bosses.' },
    abilities: ['strike', 'brace', 'backstab', 'twin_fang', 'shadow_execution']
  },
  {
    id: 'cleric',
    name: 'Cleric',
    sprite: 'cleric',
    blurb: 'Sustains through long floors. Rewards steady, accurate study.',
    stats: { maxHp: 124, atk: 10, def: 7, energyGain: 1.0, crit: 0.05, luck: 0.1 },
    perk: { name: 'Mend', desc: 'Restore 6% of max HP on every correct answer.' },
    abilities: ['strike', 'brace', 'smite', 'consecrate', 'judgement']
  },
  {
    id: 'scholar',
    name: 'Scholar',
    sprite: 'scholar',
    blurb: 'Built around the questions themselves. Best for revision runs.',
    stats: { maxHp: 100, atk: 12, def: 5, energyGain: 1.25, crit: 0.1, luck: 0.15 },
    perk: { name: 'Insight', desc: 'One wrong option is struck out on every multiple choice, and you gain +25% XP.' },
    abilities: ['strike', 'brace', 'rebuttal', 'thesis_strike', 'peer_review']
  },
  {
    id: 'warden',
    name: 'Warden',
    sprite: 'warden',
    blurb: 'Attrition fighter. Poisons stack while you answer.',
    stats: { maxHp: 122, atk: 12, def: 7, energyGain: 1.05, crit: 0.08, luck: 0.15 },
    perk: { name: 'Rot', desc: 'Every hit you land also applies 4 turns of poison, and poison damage heals you for a third of what it deals.' },
    abilities: ['strike', 'brace', 'vine_lash', 'toxic_bloom', 'verdant_wrath']
  },
];

export const ROLE_BY_ID = Object.fromEntries(ROLES.map(r => [r.id, r]));

export function getRole(id) {
  return ROLE_BY_ID[id] || ROLES[0];
}
