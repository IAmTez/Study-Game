/* Seeded pseudo-random number generator (mulberry32) so floors are reproducible. */

export function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function makeRng(seed) {
  let a = (typeof seed === 'string' ? hashString(seed) : seed >>> 0) || 1;
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  next.int = (min, max) => min + Math.floor(next() * (max - min + 1));
  next.pick = (arr) => arr[Math.floor(next() * arr.length)];
  next.chance = (p) => next() < p;
  next.range = (min, max) => min + next() * (max - min);
  next.shuffle = (arr) => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  /** Pick from [{ weight, ...}] entries. */
  next.weighted = (entries, weightKey = 'weight') => {
    const total = entries.reduce((s, e) => s + (e[weightKey] || 0), 0);
    if (total <= 0) return entries[0];
    let roll = next() * total;
    for (const e of entries) {
      roll -= (e[weightKey] || 0);
      if (roll <= 0) return e;
    }
    return entries[entries.length - 1];
  };
  return next;
}

/** Unseeded convenience RNG for cosmetic randomness. */
export const rand = makeRng(Date.now() ^ 0x9e3779b9);
