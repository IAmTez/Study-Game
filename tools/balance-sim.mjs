/*
 * Headless balance simulation.
 *
 * Plays complete runs through the real combat engine — no browser, no DOM —
 * at a range of answer accuracies, and reports the mean floor reached. Use it
 * after changing enemy scaling, role stats or ability numbers to check that
 * accuracy still drives depth and that no role has fallen out of the pack.
 *
 *   node tools/balance-sim.mjs
 */
const store = new Map();
globalThis.localStorage = {
  getItem: k => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, v),
  removeItem: k => store.delete(k),
  get length() { return store.size; },
  key: i => [...store.keys()][i],
};
Object.defineProperty(globalThis.localStorage, Symbol.iterator, { value: undefined });
globalThis.Object_keys_ls = () => [...store.keys()];

const state = await import('../js/game/state.js');
const combatMod = await import('../js/game/combat.js');
const stages = await import('../js/game/stages.js');
const { makeRng } = await import('../js/core/rng.js');
const { ROLES } = await import('../js/data/roles.js');
const items = await import('../js/data/items.js');
const loot = await import('../js/game/loot.js');
const { PHASE } = combatMod;

state.loadGame();

function fight(run, enemy, rng, accuracy) {
  const combat = combatMod.startCombat(run, enemy);
  let guard = 0;
  while (combat.phase !== PHASE.VICTORY && combat.phase !== PHASE.DEFEAT && guard++ < 500) {
    if (combat.phase === PHASE.QUESTION) {
      // Prefer the middle-risk card.
      combatMod.selectQuestion(run, combat, Math.min(1, combat.choices.length - 1));
      continue;
    }
    if (combat.phase === PHASE.ANSWERING) {
      const q = combat.current.question;
      const right = rng.chance(accuracy);
      if (q.type === 'mc') {
        const wrong = q.options.map((_, i) => i).filter(i => i !== q.answer);
        combatMod.submitAnswer(run, combat, right ? q.answer : rng.pick(wrong));
      } else {
        combatMod.submitAnswer(run, combat, right ? (q.accept[0] || q.keywords.map(g => g[0]).join(' ')) : 'no idea');
      }
      continue;
    }
    if (combat.phase === PHASE.RESULT) { combatMod.continueFromResult(run, combat); continue; }
    if (combat.phase === PHASE.ACTION) {
      const stats = state.derived(run);
      // Heal when badly hurt and a potion is available.
      if (run.hp / stats.maxHp < 0.35) {
        const potion = ['elixir', 'large_potion', 'small_potion', 'study_ration'].find(id => state.countItem(run, id) > 0);
        if (potion) { combatMod.useItemInCombat(run, combat, potion); continue; }
      }
      const options = combatMod.availableAbilities(run);
      const affordable = options.filter(a => a.usable && a.ability.power > 0);
      const best = affordable.sort((a, b) => b.ability.power - a.ability.power)[0];
      // Rest when badly hurt and holding nothing worth spending; otherwise hit
      // with the strongest move currently affordable (Strike banks 1 by itself).
      if (!best || best.ability.id === 'strike') {
        const hurt = run.hp / state.derived(run).maxHp < 0.5;
        combatMod.useAbility(run, combat, hurt ? 'rest' : 'strike');
      } else {
        combatMod.useAbility(run, combat, best.ability.id);
      }
      continue;
    }
    break;
  }
  return combat.phase === PHASE.VICTORY;
}

const RARITY_RANK = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };

/** A real player equips upgrades; the simulation has to as well. */
function autoEquip(run) {
  for (const slot of ['weapon', 'armour', 'trinket']) {
    const owned = state.inventoryEntries(run, slot);
    if (!owned.length) continue;
    const best = owned.sort((a, b) => RARITY_RANK[b.item.rarity] - RARITY_RANK[a.item.rarity])[0];
    const current = run.equipped[slot];
    if (!current || RARITY_RANK[best.item.rarity] > RARITY_RANK[items.getItem(current).rarity]) {
      state.equip(run, best.item.id);
    }
  }
}

function simulate(roleId, accuracy, maxFloor = 60, seed = 0) {
  state.game.meta = state.defaultMeta();
  const run = state.createRun(roleId);
  run.seed = `sim-${roleId}-${accuracy}-${seed}`;
  const rng = makeRng(`${roleId}:${accuracy}:${seed}`);
  let floor = 1;
  for (; floor <= maxFloor; floor++) {
    run.floor = floor;
    const floorState = stages.generateFloor(run.seed, floor);
    for (const stage of floorState.stages) {
      if (stage.kind === 'combat') {
        if (!fight(run, stage.enemy, rng, accuracy)) return { floor, level: run.level, died: true };
        run.statuses = {};
        autoEquip(run);
      } else if (stage.kind === 'treasure') {
        for (const drop of loot.rollChest(rng, { luck: state.derived(run).luck, floor })) {
          state.addItem(run, drop.item.id, drop.count);
        }
        autoEquip(run);
      } else if (stage.kind === 'shrine') {
        const stats = state.derived(run);
        run.hp = Math.min(stats.maxHp, run.hp + Math.round(stats.maxHp * 0.45));
        run.energy = Math.min(20, run.energy + 4);
      }
    }
  }
  return { floor: maxFloor, level: run.level, died: false };
}

console.log('role       ' + [0.5, 0.65, 0.8, 0.95].map(a => (a*100+'%').padStart(8)).join('') + '     (mean floor of 5 seeds)');
console.log('-'.repeat(60));
for (const role of ROLES) {
  const cells = [];
  for (const accuracy of [0.5, 0.65, 0.8, 0.95]) {
    const runs = [0,1,2,3,4].map(seed => simulate(role.id, accuracy, 60, seed).floor);
    cells.push((runs.reduce((a,b)=>a+b,0)/runs.length).toFixed(1).padStart(8));
  }
  console.log(role.name.padEnd(11) + cells.join(''));
}
