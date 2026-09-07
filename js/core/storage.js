/* localStorage wrapper. Every read is defensive: a corrupt or oversized save
   should drop the player back to the menu, never crash the game. */

const PREFIX = 'sewers-of-study:';

export const KEYS = {
  save: 'save',
  settings: 'settings',
  meta: 'meta',
  custom: 'custom-subjects'
};

export function load(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[storage] could not read "${key}"`, err);
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[storage] could not write "${key}"`, err);
    return false;
  }
}

export function remove(key) {
  try { localStorage.removeItem(PREFIX + key); } catch { /* ignore */ }
}

export function usageBytes() {
  let total = 0;
  try {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(PREFIX)) total += key.length + (localStorage.getItem(key)?.length || 0);
    }
  } catch { /* ignore */ }
  return total * 2; // UTF-16 code units
}

export function exportAll() {
  const dump = {};
  for (const key of Object.values(KEYS)) {
    const value = load(key, undefined);
    if (value !== undefined) dump[key] = value;
  }
  return { version: 1, exportedAt: new Date().toISOString(), data: dump };
}

export function importAll(dump) {
  if (!dump || typeof dump !== 'object' || !dump.data) throw new Error('Not a Sewers of Study save file.');
  for (const [key, value] of Object.entries(dump.data)) {
    if (Object.values(KEYS).includes(key)) save(key, value);
  }
}
