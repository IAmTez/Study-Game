/* Question pool assembly, difficulty scaling and the three-way choice offered
   each combat turn. */

import { builtinSubjects, normaliseSubject } from '../data/questions/index.js';
import { game } from './state.js';

let poolCache = null;
let poolKey = '';

/** Built-in subjects plus everything the player has imported. */
export function allSubjects() {
  const custom = (game.customSubjects || []).map(s => normaliseSubject({ ...s, custom: true }));
  return [...builtinSubjects(), ...custom];
}

export function enabledSubjectIds() {
  const enabled = game.settings.enabledSubjects;
  const all = allSubjects().map(s => s.id);
  if (!Array.isArray(enabled)) return all;
  const filtered = all.filter(id => enabled.includes(id));
  return filtered.length ? filtered : all;
}

export function enabledSubjects() {
  const ids = new Set(enabledSubjectIds());
  return allSubjects().filter(s => ids.has(s.id));
}

function cacheKey() {
  return [
    enabledSubjectIds().join(','),
    game.settings.questionTypes,
    (game.customSubjects || []).length,
    (game.customSubjects || []).reduce((n, s) => n + (s.questions?.length || 0), 0),
  ].join('|');
}

/** Every question currently eligible, flattened. */
export function questionPool() {
  const key = cacheKey();
  if (poolCache && poolKey === key) return poolCache;
  const wanted = game.settings.questionTypes;
  poolCache = enabledSubjects()
    .flatMap(s => s.questions)
    .filter(q => wanted === 'both' || q.type === wanted);
  poolKey = key;
  return poolCache;
}

export function invalidatePool() {
  poolCache = null;
  poolKey = '';
}

/** Difficulty tier 1-5 for a given floor, nudged by the difficulty setting. */
export function tierForFloor(floor) {
  const base = 1 + Math.floor((floor - 1) / 4);
  const biased = base + (game.settings.difficultyBias || 0);
  return Math.max(1, Math.min(5, biased));
}

/** Higher weight = more likely to be offered. Unseen and previously-wrong win. */
function weightFor(question, targetTier, recent) {
  if (recent.includes(question.id)) return 0;

  const history = game.meta.questionHistory[question.id];
  let weight = 10;
  if (!history) weight = 26;                       // never seen — show it
  else if (history.lastWrong) weight = 20;         // got it wrong last time — revise it
  else if (history.correct >= 3) weight = 3;       // well known — de-prioritise
  else weight = 9;

  const gap = Math.abs(question.difficulty - targetTier);
  weight *= gap === 0 ? 1 : gap === 1 ? 0.45 : 0.08;
  return Math.max(0.05, weight);
}

function pickWeighted(rng, candidates, targetTier, recent, exclude) {
  const entries = candidates
    .filter(q => !exclude.has(q.id))
    .map(q => ({ q, weight: weightFor(q, targetTier, recent) }))
    .filter(e => e.weight > 0);
  if (!entries.length) {
    const fallback = candidates.filter(q => !exclude.has(q.id));
    return fallback.length ? rng.pick(fallback) : null;
  }
  return rng.weighted(entries).q;
}

/**
 * Three questions to choose between: one below the floor's tier, one at it and
 * one above. Picking the harder card is the risk/reward decision each turn.
 */
export function pickQuestionChoices(rng, floor, count = 3) {
  const pool = questionPool();
  if (!pool.length) return [];

  const tier = tierForFloor(floor);
  const tiers = [
    Math.max(1, tier - 1),
    tier,
    Math.min(5, tier + 1),
  ].slice(0, count);

  const recent = game.run?.recentQuestions || [];
  const exclude = new Set();
  const chosen = [];

  for (const t of tiers) {
    const question = pickWeighted(rng, pool, t, recent, exclude);
    if (!question) continue;
    exclude.add(question.id);
    chosen.push({
      question,
      offeredTier: t,
      /* Reward scales with the tier you actually chose. */
      energy: Math.round(6 + t * 4),
      damageBonus: 1 + (t - 1) * 0.12
    });
  }

  // If the pool is tiny we may have fewer than `count`; that is fine.
  return chosen;
}

export function rememberQuestion(run, questionId) {
  run.recentQuestions = run.recentQuestions || [];
  run.recentQuestions.push(questionId);
  const limit = Math.min(40, Math.max(6, Math.floor(questionPool().length * 0.4)));
  if (run.recentQuestions.length > limit) {
    run.recentQuestions.splice(0, run.recentQuestions.length - limit);
  }
}

/** Applies a hint item to an open question. Returns what the UI should reveal. */
export function applyHint(question, strength) {
  if (question.type === 'mc') {
    const wrong = question.options
      .map((_, i) => i)
      .filter(i => i !== question.answer);
    if (strength >= 2) {
      return { type: 'eliminate', indices: wrong };
    }
    const shuffled = wrong.sort(() => Math.random() - 0.5);
    return { type: 'eliminate', indices: shuffled.slice(0, Math.min(2, wrong.length)) };
  }
  const groups = question.keywords || [];
  if (strength >= 2) {
    return { type: 'reveal', text: question.accept?.[0] || groups.map(g => g[0]).join(', ') };
  }
  const first = groups[0]?.[0];
  return {
    type: 'keyword',
    text: first ? `Your answer needs to mention: "${first}"` : 'No keyword hint is available for this question.'
  };
}
