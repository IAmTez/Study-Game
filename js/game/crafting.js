/* Crafting: spend materials (and sometimes lesser items) for something better. */

import { RECIPES } from '../data/recipes.js';
import { getItem } from '../data/items.js';
import { addItem, countItem, removeItem, logLine, game } from './state.js';

/** A recipe annotated with whether the run can currently afford it. */
export function recipeStatus(run, recipe) {
  const costs = Object.entries(recipe.cost).map(([id, need]) => ({
    item: getItem(id),
    need,
    have: run ? countItem(run, id) : 0
  }));
  return {
    recipe,
    result: getItem(recipe.result),
    costs,
    craftable: !!run && costs.every(c => c.item && c.have >= c.need)
  };
}

export function allRecipeStatuses(run) {
  return RECIPES.map(recipe => recipeStatus(run, recipe))
    .filter(status => status.result);
}

export function craft(run, recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return { ok: false, reason: 'Unknown recipe.' };

  const status = recipeStatus(run, recipe);
  if (!status.craftable) return { ok: false, reason: 'You are missing materials.' };

  for (const [id, need] of Object.entries(recipe.cost)) {
    // Removing an equipped item would leave a dangling equip reference.
    if (run.equipped.weapon === id || run.equipped.armour === id || run.equipped.trinket === id) {
      const slot = ['weapon', 'armour', 'trinket'].find(s => run.equipped[s] === id);
      if (countItem(run, id) <= need) run.equipped[slot] = null;
    }
    removeItem(run, id, need);
  }

  const amount = recipe.amount || 1;
  addItem(run, recipe.result, amount);
  game.meta.itemsFound += amount;

  const result = getItem(recipe.result);
  logLine(run, `Crafted ${result.name}${amount > 1 ? ` x${amount}` : ''}.`, 'gold');
  return { ok: true, result, amount };
}
