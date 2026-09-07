/* Combat state machine.

   Energy is never granted by answering — only by choosing a generating move
   (Rest banks 2, Strike banks 1). Answering well decides *whether* you act and
   how hard the blow lands; what you spend is up to you.

   The loop is driven by answering questions:
     choose-question -> answering -> result -> (correct) choose-action
                                            -> (wrong)   enemy attacks
   The UI calls into these functions and then drains `combat.events` to play
   the animations, so all rules live here and none live in the view. */

import { makeRng } from '../core/rng.js';
import { getAbility } from '../data/abilities.js';
import { getRole } from '../data/roles.js';
import { getItem } from '../data/items.js';
import { gradeAnswer, VERDICT } from './grading.js';
import { pickQuestionChoices, rememberQuestion, applyHint } from './questions.js';
import {
  game, derived, addItem, removeItem, countItem, grantXp, recordAnswer, logLine, MAX_ENERGY
} from './state.js';
import { rollEnemyDrops } from './loot.js';

export const PHASE = {
  QUESTION: 'choose-question',
  ANSWERING: 'answering',
  RESULT: 'result',
  ACTION: 'choose-action',
  VICTORY: 'victory',
  DEFEAT: 'defeat'
};

/* ---------------------------------------------------------------
   Status effects
   --------------------------------------------------------------- */

const STATUS_INFO = {
  burn:   { name: 'Burning', pct: 0.05, colour: 'var(--energy)' },
  poison: { name: 'Poisoned', pct: 0.045, colour: 'var(--rar-uncommon)' },
  bleed:  { name: 'Bleeding', pct: 0.055, colour: 'var(--blood)' },
  mark:   { name: 'Marked', pct: 0, colour: 'var(--rar-epic)' },
  stun:   { name: 'Stunned', pct: 0, colour: 'var(--mana)' },
  guard:  { name: 'Guarded', pct: 0, colour: 'var(--rar-rare)' }
};

export function statusInfo(id) {
  return STATUS_INFO[id] || { name: id, pct: 0, colour: 'var(--text-dim)' };
}

function applyStatus(target, id, turns) {
  target.statuses = target.statuses || {};
  target.statuses[id] = Math.max(target.statuses[id] || 0, turns);
}

function clearHarmfulStatuses(target) {
  if (!target.statuses) return;
  for (const id of ['burn', 'poison', 'bleed']) delete target.statuses[id];
}

/** Tick damage-over-time on a combatant. Returns total damage dealt. */
function tickStatuses(combat, target, maxHp, label, run = null) {
  if (!target.statuses) return 0;
  let total = 0;
  for (const [id, turns] of Object.entries({ ...target.statuses })) {
    if (turns <= 0) { delete target.statuses[id]; continue; }
    const info = STATUS_INFO[id];
    if (info?.pct) {
      const damage = Math.max(1, Math.round(maxHp * info.pct));
      total += damage;
      target.hp = Math.max(0, target.hp - damage);
      combat.events.push({ type: 'status-tick', side: label, status: id, amount: damage });

      // The Warden feeds on the rot it spreads.
      if (run && label === 'enemy' && id === 'poison' && getRole(run.roleId).id === 'warden') {
        const stats = derived(run);
        const leech = Math.max(1, Math.round(damage / 3));
        run.hp = Math.min(stats.maxHp, run.hp + leech);
        combat.events.push({ type: 'heal', side: 'player', amount: leech });
      }
      logLine(game.run, `${label === 'player' ? 'You take' : `${combat.enemy.name} takes`} ${damage} ${info.name.toLowerCase()} damage.`, 'bad');
    }
    target.statuses[id] = turns - 1;
    if (target.statuses[id] <= 0) delete target.statuses[id];
  }
  return total;
}

/* ---------------------------------------------------------------
   Starting combat
   --------------------------------------------------------------- */

export function startCombat(run, enemy) {
  const combat = {
    enemy,
    phase: PHASE.QUESTION,
    turn: 1,
    choices: [],
    current: null,
    result: null,
    hint: null,
    events: [],
    playerStatuses: run.statuses || {},
    guardStacks: 0,
    braced: false,
    rewards: null,
    fled: false
  };
  run.statuses = combat.playerStatuses;
  combat.rng = makeRng(`${run.seed}:combat:${enemy.uid}`);
  offerQuestions(run, combat);
  logLine(run, `${enemy.name} blocks the way.`, 'bad');
  if (enemy.isBoss && enemy.taunt) logLine(run, `"${enemy.taunt}"`, 'gold');
  return combat;
}

export function offerQuestions(run, combat) {
  combat.choices = pickQuestionChoices(combat.rng, run.floor, 3);
  combat.current = null;
  combat.result = null;
  combat.hint = null;
  combat.phase = combat.choices.length ? PHASE.QUESTION : PHASE.ACTION;
  if (!combat.choices.length) {
    // No questions available at all — let the player still fight.
    combat.current = null;
    combat.result = { verdict: VERDICT.CORRECT, matched: [], missed: [] };
  }
  return combat.choices;
}

export function selectQuestion(run, combat, index) {
  const choice = combat.choices[index];
  if (!choice) return false;
  combat.current = choice;
  combat.phase = PHASE.ANSWERING;
  combat.hint = null;
  return true;
}

/* ---------------------------------------------------------------
   Answering
   --------------------------------------------------------------- */

export function useHintOn(run, combat, itemId) {
  const item = getItem(itemId);
  if (!item?.inQuestion || !combat.current) return null;
  if (!removeItem(run, itemId, 1)) return null;
  combat.hint = applyHint(combat.current.question, item.use.hint || 1);
  logLine(run, `Used ${item.name}.`, 'info');
  return combat.hint;
}

export function submitAnswer(run, combat, response) {
  if (combat.phase !== PHASE.ANSWERING || !combat.current) return null;
  const stats = derived(run);
  const role = getRole(run.roleId);
  const question = combat.current.question;

  const result = gradeAnswer(question, response);
  combat.result = result;
  combat.phase = PHASE.RESULT;
  combat.response = response;

  recordAnswer(question, result.verdict);
  rememberQuestion(run, question.id);

  if (result.verdict === VERDICT.CORRECT || result.verdict === VERDICT.PARTIAL) {
    if (role.id === 'cleric' && result.verdict === VERDICT.CORRECT) {
      const heal = Math.max(1, Math.round(stats.maxHp * 0.06));
      run.hp = Math.min(stats.maxHp, run.hp + heal);
      combat.events.push({ type: 'heal', side: 'player', amount: heal });
      logLine(run, `Mend restores ${heal} HP.`, 'good');
    }
    if (run.equipped.trinket === 'infinite_index' && result.verdict === VERDICT.CORRECT) {
      run.hp = Math.min(stats.maxHp, run.hp + 5);
    }

    const bonus = Math.round(((combat.current?.damageBonus || 1) - 1) * 100);
    logLine(run, result.verdict === VERDICT.CORRECT
      ? `Correct.${bonus ? ` Your next blow lands at ${bonus > 0 ? '+' : ''}${bonus}%.` : ''}`
      : 'Partially correct. Your attack lands at half force.',
      result.verdict === VERDICT.CORRECT ? 'good' : 'info');
    combat.phase = PHASE.RESULT;
    combat.nextPhase = PHASE.ACTION;
  } else {
    logLine(run, 'Incorrect. The enemy strikes.', 'bad');
    combat.nextPhase = 'enemy';
  }
  return result;
}

/** Called by the UI once the player has read the explanation. */
export function continueFromResult(run, combat) {
  if (combat.nextPhase === PHASE.ACTION) {
    combat.phase = PHASE.ACTION;
    return { kind: 'action' };
  }
  return resolveEnemyTurn(run, combat);
}

/* ---------------------------------------------------------------
   Abilities
   --------------------------------------------------------------- */

/** Which abilities the player can pick right now, and why any are locked. */
export function availableAbilities(run) {
  const role = getRole(run.roleId);
  return role.abilities.map(id => {
    const ability = getAbility(id);
    const levelLocked = run.level < (ability.level || 1);
    const energyLocked = run.energy < Math.max(ability.require || 0, ability.cost || 0);
    return {
      ability,
      usable: !levelLocked && !energyLocked,
      levelLocked,
      energyLocked,
      reason: levelLocked ? `Unlocks at level ${ability.level}`
        : energyLocked ? `Needs ${Math.max(ability.require || 0, ability.cost || 0)} energy`
        : null
    };
  });
}

function rollPlayerDamage(run, combat, ability, { critBonus = 0 } = {}) {
  const stats = derived(run);
  const rng = combat.rng;
  const role = getRole(run.roleId);
  const enemy = combat.enemy;

  let power = ability.power;
  if (role.id === 'mage' && (ability.cost || 0) > 0) power *= 1.3;

  const questionBonus = combat.result?.verdict === VERDICT.PARTIAL
    ? 0.5
    : (combat.current?.damageBonus || 1);

  let damage = stats.atk * power * questionBonus;

  if (enemy.statuses?.mark) damage *= 1.3;
  if (ability.effect === 'execute' && enemy.hp / enemy.maxHp < 0.5) damage *= 2;

  const critChance = Math.min(0.75, stats.crit + critBonus);
  const crit = rng.chance(critChance);
  if (crit) damage *= 1.85;

  damage *= rng.range(0.93, 1.08);
  damage -= enemy.def * 0.45;
  // Wraiths phase through armour, and so does armour-ignoring damage.
  return { damage: Math.max(1, Math.round(damage)), crit };
}

export function useAbility(run, combat, abilityId) {
  if (combat.phase !== PHASE.ACTION) return null;
  const entry = availableAbilities(run).find(a => a.ability.id === abilityId);
  if (!entry || !entry.usable) return null;

  const ability = entry.ability;
  const enemy = combat.enemy;
  const stats = derived(run);
  run.energy = Math.max(0, run.energy - (ability.cost || 0));

  /* Generating moves bank a flat amount, plus whatever the role and gear add. */
  const bankEnergy = () => {
    if (!ability.gain) return 0;
    const gained = ability.gain + (stats.energyGain || 0);
    run.energy = Math.min(MAX_ENERGY, run.energy + gained);
    combat.events.push({ type: 'energy', amount: gained });
    return gained;
  };

  if (ability.effect === 'rest') {
    const gained = bankEnergy();
    combat.braced = true;
    combat.events.push({ type: 'brace' });
    logLine(run, `You rest. +${gained} energy, and the next blow is halved.`, 'info');
    return resolveEnemyTurn(run, combat);
  }

  const banked = bankEnergy();

  const hits = ability.effect === 'double' ? 2 : 1;
  let total = 0;
  for (let i = 0; i < hits; i++) {
    if (enemy.hp <= 0) break;
    const critBonus = ability.effect === 'crit' ? derived(run).crit : 0;
    const { damage, crit } = rollPlayerDamage(run, combat, ability, { critBonus });
    enemy.hp = Math.max(0, enemy.hp - damage);
    total += damage;
    combat.events.push({ type: 'attack', side: 'player', amount: damage, crit, ability: ability.name });
  }

  logLine(run, `${ability.name} hits ${enemy.name} for ${total}.${banked ? ` +${banked} energy.` : ''}`, 'good');

  /* --- ability side effects --- */
  const role = getRole(run.roleId);
  switch (ability.effect) {
    case 'stun':      applyStatus(enemy, 'stun', 1); break;
    case 'burn':      applyStatus(enemy, 'burn', 3); break;
    case 'bleed':     applyStatus(enemy, 'bleed', 3); break;
    case 'poison':    applyStatus(enemy, 'poison', ability.id === 'toxic_bloom' ? 5 : 4); break;
    case 'mark':      applyStatus(enemy, 'mark', 3); break;
    case 'guard':     combat.guardStacks += 2; break;
    case 'refund':    run.energy = Math.min(MAX_ENERGY, run.energy + 2); break;
    case 'lifesteal': {
      const heal = Math.max(1, Math.round(total * 0.4));
      run.hp = Math.min(stats.maxHp, run.hp + heal);
      combat.events.push({ type: 'heal', side: 'player', amount: heal });
      logLine(run, `You recover ${heal} HP.`, 'good');
      break;
    }
    case 'cleanse': {
      clearHarmfulStatuses({ statuses: combat.playerStatuses });
      const heal = Math.max(1, Math.round(stats.maxHp * 0.15));
      run.hp = Math.min(stats.maxHp, run.hp + heal);
      combat.events.push({ type: 'heal', side: 'player', amount: heal });
      logLine(run, `Consecration clears your afflictions and restores ${heal} HP.`, 'good');
      break;
    }
    default: break;
  }

  // Warden's passive poisons on every landed hit.
  if (role.id === 'warden' && total > 0) applyStatus(enemy, 'poison', 4);

  if (enemy.hp <= 0) return finishCombat(run, combat, true);
  return resolveEnemyTurn(run, combat);
}

/* ---------------------------------------------------------------
   Items in combat
   --------------------------------------------------------------- */

export function useItemInCombat(run, combat, itemId, { endsTurn = true } = {}) {
  const item = getItem(itemId);
  if (!item || item.kind !== 'consumable' || item.passive) return null;
  if (item.inQuestion) return useHintOn(run, combat, itemId);
  if (countItem(run, itemId) <= 0) return null;

  const stats = derived(run);
  removeItem(run, itemId, 1);
  const use = item.use || {};
  let acted = false;

  if (use.healPct) {
    const heal = Math.round(stats.maxHp * use.healPct);
    run.hp = Math.min(stats.maxHp, run.hp + heal);
    combat.events.push({ type: 'heal', side: 'player', amount: heal });
    acted = true;
  }
  if (use.heal) {
    run.hp = Math.min(stats.maxHp, run.hp + use.heal);
    combat.events.push({ type: 'heal', side: 'player', amount: use.heal });
    acted = true;
  }
  if (use.energy) {
    run.energy = Math.min(MAX_ENERGY, run.energy + use.energy);
    combat.events.push({ type: 'energy', amount: use.energy });
    acted = true;
  }
  if (use.cure) {
    clearHarmfulStatuses({ statuses: combat.playerStatuses });
    acted = true;
  }
  if (use.guard) {
    combat.guardStacks += use.guard;
    acted = true;
  }
  if (use.damage) {
    combat.enemy.hp = Math.max(0, combat.enemy.hp - use.damage);
    combat.events.push({ type: 'attack', side: 'player', amount: use.damage, crit: false, ability: item.name });
    acted = true;
  }

  logLine(run, `Used ${item.name}.`, 'info');
  if (!acted) return null;

  if (combat.enemy.hp <= 0) return finishCombat(run, combat, true);
  // Consumables spend your action unless used while a question is open.
  if (endsTurn && combat.phase === PHASE.ACTION) return resolveEnemyTurn(run, combat);
  return { kind: 'item-used' };
}

/* ---------------------------------------------------------------
   The enemy's turn
   --------------------------------------------------------------- */

export function resolveEnemyTurn(run, combat) {
  const stats = derived(run);
  const enemy = combat.enemy;
  const rng = combat.rng;

  // Damage over time on the enemy resolves first.
  tickStatuses(combat, enemy, enemy.maxHp, 'enemy', run);
  if (enemy.hp <= 0) return finishCombat(run, combat, true);

  const stunned = enemy.statuses?.stun > 0;
  if (stunned) {
    logLine(run, `${enemy.name} is stunned and cannot act.`, 'good');
  } else {
    const attacks = enemy.traits.includes('swift') && rng.chance(0.25) ? 2 : 1;
    for (let i = 0; i < attacks; i++) {
      let damage = enemy.atk * rng.range(0.9, 1.12);

      // Wraiths and other phasing enemies bypass most armour.
      const armour = enemy.traits.includes('phasing') ? stats.def * 0.15 : stats.def * 0.5;
      damage -= armour;

      if (enemy.traits.includes('enrage') && enemy.hp / enemy.maxHp < 0.3) damage *= 1.35;
      if (getRole(run.roleId).id === 'knight') damage *= 0.75;
      if (combat.braced) { damage *= 0.5; combat.braced = false; }

      damage = Math.max(1, Math.round(damage));

      if (combat.guardStacks > 0) {
        combat.guardStacks--;
        combat.events.push({ type: 'blocked', side: 'player' });
        logLine(run, 'Your ward absorbs the blow.', 'info');
        continue;
      }

      run.hp = Math.max(0, run.hp - damage);
      combat.events.push({ type: 'attack', side: 'enemy', amount: damage, crit: false, ability: 'Attack' });
      logLine(run, `${enemy.name} hits you for ${damage}.`, 'bad');

      if (enemy.traits.includes('poisonous') && rng.chance(0.4)) {
        applyStatus({ statuses: combat.playerStatuses }, 'poison', 3);
        logLine(run, 'You have been poisoned.', 'bad');
      }
      if (run.hp <= 0) break;
    }
  }

  // Then the player's own afflictions tick.
  if (run.hp > 0) {
    const before = run.hp;
    const playerTarget = { hp: run.hp, statuses: combat.playerStatuses };
    tickStatuses(combat, playerTarget, stats.maxHp, 'player');
    run.hp = playerTarget.hp;
    if (run.hp < before) combat.events.push({ type: 'dot', side: 'player', amount: before - run.hp });
  }

  // Regenerating enemies heal a little each round.
  if (enemy.traits.includes('regen') && enemy.hp > 0) {
    const heal = Math.max(1, Math.round(enemy.maxHp * 0.03));
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + heal);
    combat.events.push({ type: 'heal', side: 'enemy', amount: heal });
  }

  if (run.hp <= 0) {
    const revived = tryRevive(run, combat);
    if (!revived) return finishCombat(run, combat, false);
  }

  combat.turn++;
  offerQuestions(run, combat);
  return { kind: 'next-turn' };
}

function tryRevive(run, combat) {
  for (const id of ['phoenix_ankh', 'revive_ankh']) {
    if (countItem(run, id) <= 0) continue;
    const item = getItem(id);
    removeItem(run, id, 1);
    const stats = derived(run);
    run.hp = Math.max(1, Math.round(stats.maxHp * (item.use.revive || 0.5)));
    if (item.use.cure) clearHarmfulStatuses({ statuses: combat.playerStatuses });
    if (id === 'phoenix_ankh') run.energy = MAX_ENERGY;
    combat.events.push({ type: 'revive', item: item.name, hp: run.hp });
    logLine(run, `${item.name} burns away — you get back up with ${run.hp} HP.`, 'gold');
    return true;
  }
  return false;
}

/* ---------------------------------------------------------------
   Resolution
   --------------------------------------------------------------- */

function finishCombat(run, combat, won) {
  if (!won) {
    combat.phase = PHASE.DEFEAT;
    combat.events.push({ type: 'defeat' });
    logLine(run, 'You fall in the dark water.', 'bad');
    return { kind: 'defeat' };
  }

  const stats = derived(run);
  const enemy = combat.enemy;
  const role = getRole(run.roleId);

  const xp = grantXp(run, enemy.xp);
  const drops = rollEnemyDrops(combat.rng, enemy, {
    luck: stats.luck + (role.id === 'rogue' ? 0.35 : 0),
    floor: run.floor,
    extraRolls: role.id === 'rogue' && enemy.isBoss ? 1 : 0
  });
  for (const drop of drops) {
    addItem(run, drop.item.id, drop.count);
    game.meta.itemsFound += drop.count;
  }

  game.meta.enemiesFelled++;
  run.kills++;
  if (enemy.isBoss) {
    game.meta.bossesFelled++;
    game.meta.sanctum = Math.max(game.meta.sanctum, run.floor);
  }

  combat.phase = PHASE.VICTORY;
  combat.rewards = { xp, drops };
  combat.events.push({ type: 'victory' });

  logLine(run, `${enemy.name} is destroyed. +${xp.gained} XP.`, 'gold');
  for (const level of xp.levelsGained) logLine(run, `Level up — you are now level ${level}.`, 'gold');
  for (const drop of drops) logLine(run, `Found ${drop.item.name}${drop.count > 1 ? ` x${drop.count}` : ''}.`, 'gold');

  return { kind: 'victory', rewards: combat.rewards };
}

export function drainEvents(combat) {
  const events = combat.events;
  combat.events = [];
  return events;
}
