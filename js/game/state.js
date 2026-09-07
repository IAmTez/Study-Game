/* Central game state: settings, lifetime meta-progress, the active run, and
   imported custom subjects. Everything persists to localStorage. */

import * as storage from '../core/storage.js';
import { getRole } from '../data/roles.js';
import { ITEMS, getItem } from '../data/items.js';
import { emit } from '../core/bus.js';

/* Energy is a small pool built one or two points at a time, so an ultimate is
   a decision made several turns in advance rather than a per-turn resource. */
export const MAX_ENERGY = 20;

/* ---------------------------------------------------------------
   Defaults
   --------------------------------------------------------------- */

export function defaultSettings() {
  return {
    sfxVolume: 0.5,
    musicVolume: 0.2,
    fontSize: 'normal',        // small | normal | large
    reduceMotion: false,
    showExplanations: true,
    questionTypes: 'both',     // both | mc | short
    difficultyBias: 0,         // -1 easier, 0 normal, +1 harder
    enabledSubjects: null,     // null = all
    autoAdvance: false
  };
}

export function defaultMeta() {
  return {
    deepestFloor: 0,
    totalRuns: 0,
    bossesFelled: 0,
    enemiesFelled: 0,
    itemsFound: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    questionsPartial: 0,
    timePlayedMs: 0,
    /* Per-subject and per-topic accuracy — this is the actual study record. */
    bySubject: {},             // subjectId -> { seen, correct, partial }
    byTopic: {},               // "subjectId::topic" -> { seen, correct, partial }
    questionHistory: {},       // questionId -> { seen, correct, lastWrong }
    vault: {},                 // materials kept between runs
    unlockedRoles: ['knight', 'mage', 'rogue', 'cleric', 'scholar', 'warden'],
    sanctum: 0,                // deepest boss floor cleared — restart point
  };
}

/* ---------------------------------------------------------------
   The live store
   --------------------------------------------------------------- */

export const game = {
  settings: defaultSettings(),
  meta: defaultMeta(),
  run: null,
  customSubjects: [],
  sessionStart: Date.now()
};

export function loadGame() {
  game.settings = { ...defaultSettings(), ...storage.load(storage.KEYS.settings, {}) };
  game.meta = { ...defaultMeta(), ...storage.load(storage.KEYS.meta, {}) };
  game.customSubjects = storage.load(storage.KEYS.custom, []) || [];
  const savedRun = storage.load(storage.KEYS.save, null);
  game.run = savedRun && savedRun.roleId ? savedRun : null;
  game.sessionStart = Date.now();
}

export function saveSettings() {
  storage.save(storage.KEYS.settings, game.settings);
}

export function saveMeta() {
  game.meta.timePlayedMs += Date.now() - game.sessionStart;
  game.sessionStart = Date.now();
  storage.save(storage.KEYS.meta, game.meta);
}

export function saveRun() {
  if (game.run) storage.save(storage.KEYS.save, game.run);
  else storage.remove(storage.KEYS.save);
}

export function saveCustomSubjects() {
  return storage.save(storage.KEYS.custom, game.customSubjects);
}

export function saveAll() {
  saveSettings();
  saveMeta();
  saveRun();
  saveCustomSubjects();
}

/* ---------------------------------------------------------------
   Runs
   --------------------------------------------------------------- */

export function createRun(roleId, { fromSanctum = false } = {}) {
  const role = getRole(roleId);
  const startFloor = fromSanctum && game.meta.sanctum > 0 ? game.meta.sanctum + 1 : 1;

  const run = {
    roleId: role.id,
    level: 1,
    xp: 0,
    hp: role.stats.maxHp,
    energy: 0,
    floor: startFloor,
    startedAt: Date.now(),
    inventory: {},
    equipped: { weapon: null, armour: null, trinket: null },
    statuses: {},
    seed: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    recentQuestions: [],
    log: [],
    map: null,
    combat: null,
    floorsCleared: 0,
    kills: 0
  };

  addItem(run, 'small_potion', 2);
  addItem(run, 'study_ration', 1);
  addItem(run, 'hint_scroll', 1);
  addItem(run, 'rusty_shortsword', 1);
  addItem(run, 'patched_tunic', 1);
  equip(run, 'rusty_shortsword');
  equip(run, 'patched_tunic');

  // Materials banked from previous runs come back with you.
  for (const [id, count] of Object.entries(game.meta.vault || {})) {
    if (count > 0) addItem(run, id, count);
  }
  game.meta.vault = {};

  game.meta.totalRuns++;
  game.meta.deepestFloor = Math.max(game.meta.deepestFloor, run.floor);
  game.run = run;
  run.hp = derived(run).maxHp;
  saveRun();
  saveMeta();
  return run;
}

export function endRun({ died = true } = {}) {
  const run = game.run;
  if (!run) return;
  // A quarter of your materials survive the trip back up.
  if (died) {
    const vault = { ...(game.meta.vault || {}) };
    for (const [id, count] of Object.entries(run.inventory)) {
      const item = getItem(id);
      if (!item || item.kind !== 'material') continue;
      const kept = Math.floor(count * 0.25);
      if (kept > 0) vault[id] = (vault[id] || 0) + kept;
    }
    game.meta.vault = vault;
  }
  game.run = null;
  storage.remove(storage.KEYS.save);
  saveMeta();
}

/* ---------------------------------------------------------------
   Derived stats
   --------------------------------------------------------------- */

export function xpForLevel(level) {
  return Math.floor(45 * Math.pow(level, 1.45));
}

export function derived(run) {
  const role = getRole(run.roleId);
  const level = run.level;

  const stats = {
    maxHp: role.stats.maxHp + Math.round((level - 1) * role.stats.maxHp * 0.11),
    atk: role.stats.atk + Math.round((level - 1) * 1.6),
    def: role.stats.def + Math.round((level - 1) * 0.85),
    crit: role.stats.crit,
    luck: role.stats.luck,
    energyGain: role.stats.energyGain
  };

  for (const slot of ['weapon', 'armour', 'trinket']) {
    const id = run.equipped[slot];
    const item = id && getItem(id);
    if (!item?.stats) continue;
    for (const [key, value] of Object.entries(item.stats)) {
      stats[key] = (stats[key] || 0) + value;
    }
  }

  stats.maxHp = Math.max(1, Math.round(stats.maxHp));
  stats.atk = Math.max(1, Math.round(stats.atk));
  stats.def = Math.max(0, Math.round(stats.def));
  stats.maxEnergy = MAX_ENERGY;
  stats.role = role;
  return stats;
}

export function grantXp(run, amount) {
  const role = getRole(run.roleId);
  const bonus = role.id === 'scholar' ? 1.25 : 1;
  const gained = Math.max(1, Math.round(amount * bonus));
  run.xp += gained;
  const levelsGained = [];
  while (run.xp >= xpForLevel(run.level)) {
    run.xp -= xpForLevel(run.level);
    run.level++;
    levelsGained.push(run.level);
    const stats = derived(run);
    run.hp = stats.maxHp;   // level up fully restores health
  }
  return { gained, levelsGained };
}

/* ---------------------------------------------------------------
   Inventory
   --------------------------------------------------------------- */

export function addItem(run, itemId, count = 1) {
  if (!ITEMS[itemId] || count <= 0) return false;
  run.inventory[itemId] = (run.inventory[itemId] || 0) + count;
  return true;
}

export function removeItem(run, itemId, count = 1) {
  const have = run.inventory[itemId] || 0;
  if (have < count) return false;
  if (have === count) delete run.inventory[itemId];
  else run.inventory[itemId] = have - count;
  return true;
}

export function countItem(run, itemId) {
  return run.inventory[itemId] || 0;
}

export function inventoryEntries(run, kind = null) {
  return Object.entries(run.inventory)
    .map(([id, count]) => ({ item: getItem(id), count }))
    .filter(entry => entry.item && (!kind || entry.item.kind === kind));
}

export function equip(run, itemId) {
  const item = getItem(itemId);
  if (!item || !['weapon', 'armour', 'trinket'].includes(item.kind)) return false;
  const previous = run.equipped[item.kind];
  if (previous === itemId) return false;
  run.equipped[item.kind] = itemId;
  const stats = derived(run);
  run.hp = Math.min(run.hp, stats.maxHp);
  emit('stats:changed');
  return true;
}

export function unequip(run, slot) {
  if (!run.equipped[slot]) return false;
  run.equipped[slot] = null;
  const stats = derived(run);
  run.hp = Math.min(run.hp, stats.maxHp);
  emit('stats:changed');
  return true;
}

/* ---------------------------------------------------------------
   Study statistics
   --------------------------------------------------------------- */

export function recordAnswer(question, verdict) {
  const meta = game.meta;
  meta.questionsAnswered++;
  if (verdict === 'correct') meta.questionsCorrect++;
  if (verdict === 'partial') meta.questionsPartial++;

  const bump = (bucket, key) => {
    const entry = bucket[key] || { seen: 0, correct: 0, partial: 0 };
    entry.seen++;
    if (verdict === 'correct') entry.correct++;
    if (verdict === 'partial') entry.partial++;
    bucket[key] = entry;
  };

  bump(meta.bySubject, question.subjectId);
  bump(meta.byTopic, `${question.subjectId}::${question.topic}`);

  const history = meta.questionHistory[question.id] || { seen: 0, correct: 0, lastWrong: false };
  history.seen++;
  if (verdict === 'correct') history.correct++;
  history.lastWrong = verdict !== 'correct';
  meta.questionHistory[question.id] = history;
}

export function accuracy(entry) {
  if (!entry || !entry.seen) return 0;
  return (entry.correct + entry.partial * 0.5) / entry.seen;
}

/** Topics sorted worst-first — used for the "weakest topics" study readout. */
export function weakestTopics(limit = 6, minSeen = 3) {
  return Object.entries(game.meta.byTopic || {})
    .filter(([, entry]) => entry.seen >= minSeen)
    .map(([key, entry]) => {
      const [subjectId, topic] = key.split('::');
      return { subjectId, topic, entry, accuracy: accuracy(entry) };
    })
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}

export function logLine(run, text, kind = '') {
  if (!run) return;
  run.log = run.log || [];
  run.log.push({ text, kind });
  if (run.log.length > 120) run.log.splice(0, run.log.length - 120);
  emit('log:changed', { text, kind });
}
