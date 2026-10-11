/* Turn a run's equipped items into the looks the hero rig draws. */

import { getItem } from '../data/items.js';

export const STARTER_GEAR = { main: 'rusty_shortsword', chest: 'patched_tunic', feet: 'wading_boots' };

export function gearLooks(equipped = {}) {
  const item = (key) => (equipped[key] ? getItem(equipped[key]) : null);
  const look = (key) => (item(key)?.look ? { ...item(key).look } : null);
  const main = item('main');
  const off = item('off');
  return {
    head: look('head'),
    chest: look('chest'),
    feet: look('feet'),
    main: look('main'),
    mainTwoHanded: !!main?.twoHanded,
    off: main?.twoHanded ? null : look('off'),
    offKind: off ? (off.kind === 'weapon' ? 'weapon' : 'shield') : null,
    rings: ['ring1', 'ring2', 'ring3'].map(look).filter(Boolean),
    charms: ['charm1', 'charm2'].map(look).filter(Boolean),
  };
}
