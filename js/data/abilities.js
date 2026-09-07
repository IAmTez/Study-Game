/* Attack options offered after a correct answer.

   `cost` is energy spent. `require` is the energy you must have banked before
   the option even appears — that is the "save up energy to unlock better
   moves" progression. `power` multiplies your attack stat. */

export const ABILITIES = {
  /* --- universal --- */
  strike: {
    id: 'strike', name: 'Strike', cost: 0, require: 0, power: 1.0, level: 1,
    desc: 'A plain hit. Always available.'
  },
  brace: {
    id: 'brace', name: 'Brace', cost: 0, require: 0, power: 0, level: 1,
    effect: 'brace',
    desc: 'Skip the attack to bank +14 energy and halve the next hit you take.'
  },

  /* --- knight --- */
  shield_bash: {
    id: 'shield_bash', name: 'Shield Bash', cost: 12, require: 12, power: 1.5, level: 1,
    effect: 'stun', desc: 'Heavy hit. Stuns: the enemy misses its next attack.'
  },
  cleave: {
    id: 'cleave', name: 'Cleave', cost: 26, require: 30, power: 2.3, level: 4,
    effect: 'bleed', desc: 'A wide swing that leaves the enemy bleeding.'
  },
  ironclad_charge: {
    id: 'ironclad_charge', name: 'Ironclad Charge', cost: 48, require: 55, power: 3.5, level: 8,
    effect: 'guard', desc: 'Devastating charge. You also gain a shield for 2 turns.'
  },

  /* --- mage --- */
  ember: {
    id: 'ember', name: 'Ember', cost: 10, require: 10, power: 1.6, level: 1,
    effect: 'burn', desc: 'Sets the target alight for 3 turns.'
  },
  frost_lance: {
    id: 'frost_lance', name: 'Frost Lance', cost: 24, require: 28, power: 2.4, level: 4,
    effect: 'stun', desc: 'Pierces and freezes. The enemy misses its next attack.'
  },
  arcane_nova: {
    id: 'arcane_nova', name: 'Arcane Nova', cost: 50, require: 58, power: 4.1, level: 8,
    desc: 'Detonates every point of stored arcana at once.'
  },

  /* --- rogue --- */
  backstab: {
    id: 'backstab', name: 'Backstab', cost: 10, require: 10, power: 1.7, level: 1,
    effect: 'crit', desc: 'Doubled critical chance on this hit.'
  },
  twin_fang: {
    id: 'twin_fang', name: 'Twin Fang', cost: 24, require: 28, power: 1.35, level: 4,
    effect: 'double', desc: 'Strikes twice. Each hit rolls its own critical.'
  },
  shadow_execution: {
    id: 'shadow_execution', name: 'Shadow Execution', cost: 46, require: 52, power: 3.3, level: 8,
    effect: 'execute', desc: 'Deals up to double damage against enemies below half health.'
  },

  /* --- cleric --- */
  smite: {
    id: 'smite', name: 'Smite', cost: 12, require: 12, power: 1.5, level: 1,
    effect: 'lifesteal', desc: 'Holy hit. Heals you for 40% of the damage dealt.'
  },
  consecrate: {
    id: 'consecrate', name: 'Consecrate', cost: 26, require: 30, power: 2.0, level: 4,
    effect: 'cleanse', desc: 'Burns away your poison and burning, then heals 15% max HP.'
  },
  judgement: {
    id: 'judgement', name: 'Judgement', cost: 46, require: 54, power: 3.5, level: 8,
    effect: 'lifesteal', desc: 'A pillar of light. Heals you for 40% of the damage dealt.'
  },

  /* --- scholar --- */
  rebuttal: {
    id: 'rebuttal', name: 'Cited Rebuttal', cost: 10, require: 10, power: 1.6, level: 1,
    effect: 'refund', desc: 'Refunds 8 energy on impact.'
  },
  thesis_strike: {
    id: 'thesis_strike', name: 'Thesis Strike', cost: 24, require: 28, power: 2.2, level: 4,
    effect: 'mark', desc: 'Marks the enemy: it takes +30% damage for 3 turns.'
  },
  peer_review: {
    id: 'peer_review', name: 'Peer Review', cost: 46, require: 54, power: 3.7, level: 8,
    effect: 'mark', desc: 'A merciless critique that also marks the target.'
  },

  /* --- warden --- */
  vine_lash: {
    id: 'vine_lash', name: 'Vine Lash', cost: 10, require: 10, power: 1.6, level: 1,
    effect: 'bleed', desc: 'Thorned whip. Causes bleeding for 3 turns.'
  },
  toxic_bloom: {
    id: 'toxic_bloom', name: 'Toxic Bloom', cost: 26, require: 30, power: 2.1, level: 4,
    effect: 'poison', desc: 'Bursts spores, applying 5 turns of heavy poison.'
  },
  verdant_wrath: {
    id: 'verdant_wrath', name: 'Verdant Wrath', cost: 46, require: 54, power: 3.4, level: 8,
    effect: 'poison', desc: 'The sewer itself lashes out, poisoning deeply.'
  }
};

export function getAbility(id) {
  return ABILITIES[id];
}
