/* Crafting. Every recipe turns materials (and sometimes a lesser item)
   into something you cannot reliably farm from drops. */

export const RECIPES = [
  {
    id: 'craft_small_potion', result: 'small_potion', amount: 2,
    cost: { slime_core: 2 },
    desc: 'Slime cores boiled down make a serviceable salve.'
  },
  {
    id: 'craft_large_potion', result: 'large_potion', amount: 1,
    cost: { small_potion: 2, spore_cap: 1 },
    desc: 'Reduce two salves and fortify with spore extract.'
  },
  {
    id: 'craft_elixir', result: 'elixir', amount: 1,
    cost: { large_potion: 2, drowned_pearl: 1, aether_dust: 1 },
    desc: 'The pearl keeps it from spoiling. The dust does the rest.'
  },
  {
    id: 'craft_energy_draught', result: 'energy_draught', amount: 2,
    cost: { rat_tail: 2, ink_vial: 1 },
    desc: 'Bitter, and it works.'
  },
  {
    id: 'craft_focus_tonic', result: 'focus_tonic', amount: 1,
    cost: { energy_draught: 2, cultist_sigil: 1 },
    desc: 'The sigil focuses the mind. Try not to read it directly.'
  },
  {
    id: 'craft_antidote', result: 'antidote', amount: 2,
    cost: { spore_cap: 1, slime_core: 1 },
    desc: 'Fight spores with spores.'
  },
  {
    id: 'craft_hint_scroll', result: 'hint_scroll', amount: 1,
    cost: { ink_vial: 1, bone_shard: 2 },
    desc: 'Bone ash and ink. Someone else already worked this one out.'
  },
  {
    id: 'craft_greater_hint', result: 'greater_hint', amount: 1,
    cost: { hint_scroll: 2, cultist_sigil: 1 },
    desc: 'A full set of margin notes, stolen from a cultist.'
  },
  {
    id: 'craft_sewer_bomb', result: 'sewer_bomb', amount: 2,
    cost: { rusted_cog: 2, spore_cap: 1 },
    desc: 'Pack a cog casing with reactive spores.'
  },
  {
    id: 'craft_runic_bomb', result: 'runic_bomb', amount: 1,
    cost: { sewer_bomb: 2, cultist_sigil: 1 },
    desc: 'Considerably more bang, considerably less legal.'
  },
  {
    id: 'craft_ward_stone', result: 'ward_stone', amount: 1,
    cost: { drowned_pearl: 1, slime_core: 2 },
    desc: 'The pearl remembers being underwater and shields you the same way.'
  },
  {
    id: 'craft_revive_ankh', result: 'revive_ankh', amount: 1,
    cost: { bone_shard: 4, drowned_pearl: 2, aether_dust: 1 },
    desc: 'Death is negotiable, at a price.'
  },
  {
    id: 'craft_phoenix_ankh', result: 'phoenix_ankh', amount: 1,
    cost: { revive_ankh: 2, aether_dust: 3 },
    desc: 'Negotiable twice, apparently.'
  },

  /* --- equipment --- */
  {
    id: 'craft_sewer_cleaver', result: 'sewer_cleaver', amount: 1,
    cost: { rusty_shortsword: 1, rusted_cog: 3, bone_shard: 2 },
    desc: 'Weld scrap plate onto a bad sword until it becomes a good one.'
  },
  {
    id: 'craft_runed_blade', result: 'runed_blade', amount: 1,
    cost: { sewer_cleaver: 1, cultist_sigil: 2, ink_vial: 2 },
    desc: 'Etch the sigils along the fuller and hope you copied them right.'
  },
  {
    id: 'craft_plated_vest', result: 'plated_vest', amount: 1,
    cost: { patched_tunic: 1, rusted_cog: 3 },
    desc: 'Rivet cog plates over the worst of the holes.'
  },
  {
    id: 'craft_warden_mail', result: 'warden_mail', amount: 1,
    cost: { plated_vest: 1, drowned_pearl: 2, aether_dust: 1 },
    desc: 'Reforged to the old maintenance-crew pattern.'
  },
  {
    id: 'craft_scholars_lens', result: 'scholars_lens', amount: 1,
    cost: { lucky_coin: 1, ink_vial: 2, slime_core: 2 },
    desc: 'Slime resin, ground and polished until it is almost clear.'
  },
];

export function recipeById(id) {
  return RECIPES.find(r => r.id === id);
}
