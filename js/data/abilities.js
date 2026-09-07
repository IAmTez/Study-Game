/* Attack options offered after a correct answer.

   Energy is a small, slow pool. You only ever generate it by choosing a
   generating move — Rest banks 2, Strike banks 1 — and every other move
   spends it. That is the "save up for a better move" decision: a turn spent
   resting is a turn you did not attack.

   `cost` is energy spent, `gain` energy banked, `require` the energy you must
   already hold for the option to appear at all. `power` multiplies attack. */

export const ABILITIES = {
  /* --- universal --- */
  strike: {
    id: 'strike', name: 'Strike', cost: 0, gain: 1, require: 0, power: 1.0, level: 1,
    desc: 'A plain hit that banks 1 energy. Always available.'
  },
  rest: {
    id: 'rest', name: 'Rest', cost: 0, gain: 2, require: 0, power: 0, level: 1,
    effect: 'rest',
    desc: 'Give up your attack to bank 2 energy and halve the next hit you take.'
  },

  /* --- knight --- */
  shield_bash: {
    id: 'shield_bash', name: 'Shield Bash', cost: 3, require: 3, power: 1.5, level: 1,
    effect: 'stun', desc: 'Heavy hit. Stuns: the enemy misses its next attack.'
  },
  cleave: {
    id: 'cleave', name: 'Cleave', cost: 6, require: 6, power: 2.3, level: 4,
    effect: 'bleed', desc: 'A wide swing that leaves the enemy bleeding.'
  },
  ironclad_charge: {
    id: 'ironclad_charge', name: 'Ironclad Charge', cost: 12, require: 12, power: 3.5, level: 8,
    effect: 'guard', desc: 'Devastating charge. You also gain a shield for 2 turns.'
  },

  /* --- mage --- */
  ember: {
    id: 'ember', name: 'Ember', cost: 3, require: 3, power: 1.6, level: 1,
    effect: 'burn', desc: 'Sets the target alight for 3 turns.'
  },
  frost_lance: {
    id: 'frost_lance', name: 'Frost Lance', cost: 6, require: 6, power: 2.4, level: 4,
    effect: 'stun', desc: 'Pierces and freezes. The enemy misses its next attack.'
  },
  arcane_nova: {
    id: 'arcane_nova', name: 'Arcane Nova', cost: 12, require: 12, power: 4.1, level: 8,
    desc: 'Detonates every point of stored arcana at once.'
  },

  /* --- rogue --- */
  backstab: {
    id: 'backstab', name: 'Backstab', cost: 3, require: 3, power: 1.7, level: 1,
    effect: 'crit', desc: 'Doubled critical chance on this hit.'
  },
  twin_fang: {
    id: 'twin_fang', name: 'Twin Fang', cost: 6, require: 6, power: 1.35, level: 4,
    effect: 'double', desc: 'Strikes twice. Each hit rolls its own critical.'
  },
  shadow_execution: {
    id: 'shadow_execution', name: 'Shadow Execution', cost: 12, require: 12, power: 3.3, level: 8,
    effect: 'execute', desc: 'Deals up to double damage against enemies below half health.'
  },

  /* --- cleric --- */
  smite: {
    id: 'smite', name: 'Smite', cost: 3, require: 3, power: 1.5, level: 1,
    effect: 'lifesteal', desc: 'Holy hit. Heals you for 40% of the damage dealt.'
  },
  consecrate: {
    id: 'consecrate', name: 'Consecrate', cost: 6, require: 6, power: 2.0, level: 4,
    effect: 'cleanse', desc: 'Burns away your poison and burning, then heals 15% max HP.'
  },
  judgement: {
    id: 'judgement', name: 'Judgement', cost: 12, require: 12, power: 3.5, level: 8,
    effect: 'lifesteal', desc: 'A pillar of light. Heals you for 40% of the damage dealt.'
  },

  /* --- scholar --- */
  rebuttal: {
    id: 'rebuttal', name: 'Cited Rebuttal', cost: 3, require: 3, power: 1.6, level: 1,
    effect: 'refund', desc: 'Refunds 2 energy on impact.'
  },
  thesis_strike: {
    id: 'thesis_strike', name: 'Thesis Strike', cost: 6, require: 6, power: 2.2, level: 4,
    effect: 'mark', desc: 'Marks the enemy: it takes +30% damage for 3 turns.'
  },
  peer_review: {
    id: 'peer_review', name: 'Peer Review', cost: 12, require: 12, power: 3.7, level: 8,
    effect: 'mark', desc: 'A merciless critique that also marks the target.'
  },

  /* --- warden --- */
  vine_lash: {
    id: 'vine_lash', name: 'Vine Lash', cost: 3, require: 3, power: 1.6, level: 1,
    effect: 'bleed', desc: 'Thorned whip. Causes bleeding for 3 turns.'
  },
  toxic_bloom: {
    id: 'toxic_bloom', name: 'Toxic Bloom', cost: 6, require: 6, power: 2.1, level: 4,
    effect: 'poison', desc: 'Bursts spores, applying 5 turns of heavy poison.'
  },
  verdant_wrath: {
    id: 'verdant_wrath', name: 'Verdant Wrath', cost: 12, require: 12, power: 3.4, level: 8,
    effect: 'poison', desc: 'The sewer itself lashes out, poisoning deeply.'
  }
};

export function getAbility(id) {
  return ABILITIES[id];
}
