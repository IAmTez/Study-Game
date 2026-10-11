/* Crafting. Every recipe turns materials (and sometimes a lesser item)
   into something you cannot reliably farm from drops. Gear recipes chain:
   each tier is made by upgrading the one below it. */

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

  /* --- weapons --- */
  {
    id: 'craft_bone_dagger', result: 'bone_dagger', amount: 1,
    cost: { bone_shard: 3, rat_tail: 1 },
    desc: 'Grind a shard to a point and bind the grip with tail.'
  },
  {
    id: 'craft_sewer_cleaver', result: 'sewer_cleaver', amount: 1,
    cost: { rusty_shortsword: 1, rusted_cog: 3, bone_shard: 2 },
    desc: 'Weld scrap plate onto a bad sword until it becomes a good one.'
  },
  {
    id: 'craft_pipe_hammer', result: 'pipe_hammer', amount: 1,
    cost: { iron_scrap: 3, rusted_cog: 2 },
    desc: 'A valve wheel, a length of pipe, and no subtlety at all.'
  },
  {
    id: 'craft_runed_blade', result: 'runed_blade', amount: 1,
    cost: { sewer_cleaver: 1, cultist_sigil: 2, ink_vial: 2 },
    desc: 'Etch the sigils along the fuller and hope you copied them right.'
  },
  {
    id: 'craft_duelists_rapier', result: 'duelists_rapier', amount: 1,
    cost: { iron_scrap: 4, drowned_pearl: 1, ink_vial: 1 },
    desc: 'Draw the iron fine and cage the grip. The pearl sets the balance.'
  },
  {
    id: 'craft_tide_trident', result: 'tide_trident', amount: 1,
    cost: { iron_scrap: 4, scaled_hide: 1, drowned_pearl: 2 },
    desc: 'Three tines on a long haft, wrapped in hide for grip.'
  },
  {
    id: 'craft_archivists_quill', result: 'archivists_quill', amount: 1,
    cost: { runed_blade: 1, ink_vial: 3, aether_dust: 1 },
    desc: 'Reforge the runes into a nib that never runs dry.'
  },
  {
    id: 'craft_obsidian_greataxe', result: 'obsidian_greataxe', amount: 1,
    cost: { pipe_hammer: 1, cultist_sigil: 2, aether_dust: 1 },
    desc: 'The cultists knew where the black glass was. Now so do you.'
  },
  {
    id: 'craft_leviathan_fang', result: 'leviathan_fang', amount: 1,
    cost: { duelists_rapier: 1, scaled_hide: 3, aether_dust: 2 },
    desc: 'Set a fang in the rapier’s cage hilt.'
  },

  /* --- shields --- */
  {
    id: 'craft_pot_lid', result: 'pot_lid', amount: 1,
    cost: { rusted_cog: 2 },
    desc: 'Flatten two cogs, bolt on a handle, call it a shield.'
  },
  {
    id: 'craft_grate_shield', result: 'grate_shield', amount: 1,
    cost: { pot_lid: 1, iron_scrap: 3 },
    desc: 'Cut a drain grate to size and back it with the old lid.'
  },
  {
    id: 'craft_warden_kite', result: 'warden_kite', amount: 1,
    cost: { grate_shield: 1, leather_scrap: 2, drowned_pearl: 1 },
    desc: 'Reshape to the crew’s kite pattern; the pearl goes in the boss.'
  },
  {
    id: 'craft_barnacle_tower', result: 'barnacle_tower', amount: 1,
    cost: { warden_kite: 1, drowned_pearl: 2, aether_dust: 1 },
    desc: 'Let the barnacles take it. They know what they are doing.'
  },

  /* --- helmets --- */
  {
    id: 'craft_miners_cap', result: 'miners_cap', amount: 1,
    cost: { leather_scrap: 2, rusted_cog: 1 },
    desc: 'Stitch a leather crown and rivet a cog over the brow.'
  },
  {
    id: 'craft_scholars_hood', result: 'scholars_hood', amount: 1,
    cost: { leather_scrap: 2, ink_vial: 1 },
    desc: 'Dye the leather dark and line it with notes.'
  },
  {
    id: 'craft_rivet_helm', result: 'rivet_helm', amount: 1,
    cost: { miners_cap: 1, iron_scrap: 2 },
    desc: 'More rivets. Then more again.'
  },
  {
    id: 'craft_warden_helm', result: 'warden_helm', amount: 1,
    cost: { rivet_helm: 1, iron_scrap: 2, drowned_pearl: 1 },
    desc: 'Close the face and add the crew’s crest.'
  },
  {
    id: 'craft_diving_helm', result: 'diving_helm', amount: 1,
    cost: { warden_helm: 1, drowned_pearl: 2, aether_dust: 1 },
    desc: 'Seal it, fit a porthole, and pipe in air that heals.'
  },

  /* --- chest armour --- */
  {
    id: 'craft_oilskin_coat', result: 'oilskin_coat', amount: 1,
    cost: { leather_scrap: 3, slime_core: 2 },
    desc: 'Slime makes an excellent wax, it turns out.'
  },
  {
    id: 'craft_plated_vest', result: 'plated_vest', amount: 1,
    cost: { patched_tunic: 1, rusted_cog: 3 },
    desc: 'Rivet cog plates over the worst of the holes.'
  },
  {
    id: 'craft_scholars_robe', result: 'scholars_robe', amount: 1,
    cost: { oilskin_coat: 1, ink_vial: 2, cultist_sigil: 1 },
    desc: 'Embroider the margins with everything you have learned.'
  },
  {
    id: 'craft_warden_mail', result: 'warden_mail', amount: 1,
    cost: { plated_vest: 1, drowned_pearl: 2, aether_dust: 1 },
    desc: 'Reforged to the old maintenance-crew pattern.'
  },
  {
    id: 'craft_abyssal_plate', result: 'abyssal_plate', amount: 1,
    cost: { warden_mail: 1, iron_scrap: 4, aether_dust: 2 },
    desc: 'Layer plate over the mail until it could anchor a ship.'
  },

  /* --- boots --- */
  {
    id: 'craft_wading_boots', result: 'wading_boots', amount: 1,
    cost: { leather_scrap: 2, slime_core: 1 },
    desc: 'Stitch them high and seal the seams with slime.'
  },
  {
    id: 'craft_runners_wraps', result: 'runners_wraps', amount: 1,
    cost: { rat_tail: 3, leather_scrap: 1 },
    desc: 'Wind them tight. Move quietly.'
  },
  {
    id: 'craft_hobnail_boots', result: 'hobnail_boots', amount: 1,
    cost: { wading_boots: 1, iron_scrap: 2 },
    desc: 'Hammer studs into the soles for grip.'
  },
  {
    id: 'craft_tunnel_striders', result: 'tunnel_striders', amount: 1,
    cost: { runners_wraps: 1, scaled_hide: 1, bone_shard: 2 },
    desc: 'Scale the wraps and stiffen the soles with bone.'
  },
  {
    id: 'craft_eelskin_boots', result: 'eelskin_boots', amount: 1,
    cost: { tunnel_striders: 1, scaled_hide: 2, aether_dust: 1 },
    desc: 'Slick hide over striders. Nothing catches you now.'
  },

  /* --- rings --- */
  {
    id: 'craft_copper_band', result: 'copper_band', amount: 1,
    cost: { rusted_cog: 1, iron_scrap: 1 },
    desc: 'Pull the copper winding from a dead pump and twist it into a band.'
  },
  {
    id: 'craft_iron_band', result: 'iron_band', amount: 1,
    cost: { copper_band: 1, iron_scrap: 2 },
    desc: 'Sleeve the copper in iron.'
  },
  {
    id: 'craft_garnet_ring', result: 'garnet_ring', amount: 1,
    cost: { copper_band: 1, spore_cap: 1, bone_shard: 2 },
    desc: 'The spore pigment sets red and hard as a stone.'
  },
  {
    id: 'craft_sapphire_ring', result: 'sapphire_ring', amount: 1,
    cost: { garnet_ring: 1, drowned_pearl: 2 },
    desc: 'Cold water turns the stone blue.'
  },
  {
    id: 'craft_ring_of_mending', result: 'ring_of_mending', amount: 1,
    cost: { iron_band: 1, spore_cap: 2, slime_core: 2 },
    desc: 'Living slime under the stone keeps sealing cuts.'
  },
  {
    id: 'craft_serpent_coil', result: 'serpent_coil', amount: 1,
    cost: { sapphire_ring: 1, scaled_hide: 2, aether_dust: 1 },
    desc: 'Wind the scales around the stone until the coil holds itself.'
  },
  {
    id: 'craft_band_of_the_tides', result: 'band_of_the_tides', amount: 1,
    cost: { ring_of_mending: 1, drowned_pearl: 2, aether_dust: 1 },
    desc: 'Set a pearl that rises and falls with your breathing.'
  },

  /* --- charms --- */
  {
    id: 'craft_rat_tooth_charm', result: 'rat_tooth_charm', amount: 1,
    cost: { rat_tail: 1, bone_shard: 2 },
    desc: 'String the teeth on a tail. Wear it with pride, or at least defiance.'
  },
  {
    id: 'craft_scribes_feather', result: 'scribes_feather', amount: 1,
    cost: { ink_vial: 1, rat_tail: 2 },
    desc: 'A quill dipped once and kept. It remembers what you learn.'
  },
  {
    id: 'craft_scholars_lens', result: 'scholars_lens', amount: 1,
    cost: { lucky_coin: 1, ink_vial: 2, slime_core: 2 },
    desc: 'Slime resin, ground and polished until it is almost clear.'
  },
  {
    id: 'craft_ember_charm', result: 'ember_charm', amount: 1,
    cost: { spore_cap: 2, cultist_sigil: 1 },
    desc: 'The sigil smoulders when the spores touch it. Keep it off bare skin.'
  },
  {
    id: 'craft_sage_amulet', result: 'sage_amulet', amount: 1,
    cost: { scribes_feather: 1, cultist_sigil: 1, ink_vial: 2 },
    desc: 'Cast the owl around the feather.'
  },
  {
    id: 'craft_tide_charm', result: 'tide_charm', amount: 1,
    cost: { drowned_pearl: 3, slime_core: 2, aether_dust: 1 },
    desc: 'Three pearls in a circle of hardened slime.'
  },
];

export function recipeById(id) {
  return RECIPES.find(r => r.id === id);
}
