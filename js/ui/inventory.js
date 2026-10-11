/* Inventory: a paper doll of everything you wear, the pack, and item use.

   The hero in the middle is drawn with whatever is equipped, so trying on a
   helmet or a second weapon shows straight away. Clicking an empty slot
   filters the pack to things that fit it; the details panel offers each slot
   an item can go in, with what it would replace and the change in stats. */

import { el, panel, button, bar, toast, itemIcon, rarityClass, itemDetail, setChildren } from './dom.js';
import { go } from './screens.js';
import {
  game, derived, inventoryEntries, equip, unequip, removeItem, countItem, saveRun, MAX_ENERGY,
} from '../game/state.js';
import {
  SLOTS, slotMeta, slotUnlocked, canEquip, equippedCount, DUAL_WIELD_LEVEL,
} from '../game/equipment.js';
import { getItem, isGear, STAT_LABEL, PERCENT_STATS } from '../data/items.js';
import { spriteElement } from '../art/render.js';
import { sfx } from '../core/audio.js';

const GROUPS = [
  { kinds: ['consumable'], label: 'Consumables' },
  { kinds: ['weapon', 'shield'], label: 'Weapons & shields' },
  { kinds: ['helmet', 'armour', 'boots'], label: 'Armour' },
  { kinds: ['ring', 'charm'], label: 'Rings & charms' },
  { kinds: ['material'], label: 'Materials' },
];

const SLOT_HINT = {
  head: 'helmet', chest: 'armour', feet: 'boots', main: 'weapon', off: 'shield or weapon',
  ring1: 'ring', ring2: 'ring', ring3: 'ring', charm1: 'charm', charm2: 'charm',
};

/** "ATK +4  DEF −1" — what swapping `next` in for `current` changes. */
function statDelta(next, current, offHand = false) {
  const delta = {};
  const add = (item, sign) => {
    for (const [key, value] of Object.entries(item?.stats || {})) {
      const share = offHand && item.kind === 'weapon' && key === 'atk' ? 0.6 : 1;
      delta[key] = (delta[key] || 0) + sign * value * share;
    }
  };
  add(next, 1);
  add(current, -1);
  return Object.entries(delta)
    .filter(([, v]) => Math.abs(v) > 0.001)
    .map(([key, v]) => {
      const shown = PERCENT_STATS.has(key) ? `${Math.round(v * 100)}%` : `${Math.round(v * 10) / 10}`;
      return `${STAT_LABEL[key] || key} ${v > 0 ? '+' : '−'}${shown.replace('-', '')}`;
    })
    .join('  ');
}

export function inventoryScreen() {
  const run = game.run;
  if (!run) { go('menu'); return {}; }

  let selectedId = null;
  let slotFilter = null;        // a slot key: show only what fits it

  const summary = el('div', { className: 'col gap-sm' });
  const doll = el('div', { className: 'col gap-sm' });
  const grids = el('div', { className: 'col gap-sm' });
  const detail = el('div', { className: 'col gap-sm' });

  /** Out-of-combat item use — heals, energy and cures only. */
  function useItem(item) {
    if (item.kind !== 'consumable') return;
    if (item.combatOnly) { toast(`${item.name} can only be used in combat.`, 'bad'); return; }
    if (item.inQuestion) { toast(`${item.name} is used while a question is open.`, 'bad'); return; }
    if (item.passive) { toast(`${item.name} works automatically when you fall.`, ''); return; }
    if (countItem(run, item.id) <= 0) return;

    const stats = derived(run);
    const use = item.use || {};
    let didSomething = false;

    if (use.healPct && run.hp < stats.maxHp) {
      run.hp = Math.min(stats.maxHp, run.hp + Math.round(stats.maxHp * use.healPct));
      didSomething = true;
    }
    if (use.heal && run.hp < stats.maxHp) {
      run.hp = Math.min(stats.maxHp, run.hp + use.heal);
      didSomething = true;
    }
    if (use.energy && run.energy < MAX_ENERGY) {
      run.energy = Math.min(MAX_ENERGY, run.energy + use.energy);
      didSomething = true;
    }
    if (use.cure && Object.keys(run.statuses || {}).length) {
      run.statuses = {};
      didSomething = true;
    }

    if (!didSomething) { toast('That would have no effect right now.', ''); return; }

    removeItem(run, item.id, 1);
    sfx.heal();
    toast(`Used ${item.name}.`, 'good');
    saveRun();
    render();
  }

  function doEquip(item, slotKey) {
    const result = equip(run, item.id, slotKey);
    if (!result.ok) { toast(result.reason, 'bad'); return; }
    sfx.confirm();
    slotFilter = null;
    saveRun();
    render();
  }

  function doUnequip(slotKey) {
    unequip(run, slotKey);
    sfx.back();
    saveRun();
    render();
  }

  /* ---------------- detail ---------------- */

  function gearActions(item) {
    const owned = countItem(run, item.id);
    const actions = [];
    const notes = [];
    for (const slot of SLOTS.filter(s => s.accepts.includes(item.kind))) {
      if (!slotUnlocked(run, slot)) { notes.push(`${slot.label} unlocks at level ${slot.level}.`); continue; }
      if (run.equipped[slot.key] === item.id) {
        actions.push(button(`Unequip — ${slot.label}`, () => doUnequip(slot.key), { className: 'btn--ghost btn--center' }));
        continue;
      }
      if (slot.key === 'off' && item.kind === 'weapon' && run.level < DUAL_WIELD_LEVEL) {
        notes.push(`Dual wielding (a weapon in the off hand) unlocks at level ${DUAL_WIELD_LEVEL}.`);
        continue;
      }
      const check = canEquip(run, item, slot.key, owned);
      const current = run.equipped[slot.key] ? getItem(run.equipped[slot.key]) : null;
      const delta = statDelta(item, current, slot.key === 'off');
      const sub = [current ? `Replaces ${current.name}` : 'Empty slot', delta].filter(Boolean).join(' · ');
      const preferred = slotFilter ? slot.key === slotFilter : actions.length === 0;
      actions.push(button(`Equip — ${slot.label}`, () => doEquip(item, slot.key), {
        className: `${preferred ? 'btn--primary' : ''} btn--center`,
        disabled: !check.ok,
        sub: check.ok ? sub : check.reason,
      }));
    }
    if (item.twoHanded) notes.push('Two-handed: equipping it in the main hand empties the off hand.');
    if (item.kind === 'ring' || item.kind === 'charm') {
      const total = SLOTS.filter(s => s.accepts.includes(item.kind)).length;
      notes.push(`You can wear up to ${total} ${item.kind}s as you level${owned > 1 ? `; you own ${owned} of this one` : ''}.`);
    }
    return [...actions, ...notes.map(text => el('div', { className: 'tiny dim', text }))];
  }

  function renderDetail() {
    const entry = selectedId ? inventoryEntries(run).find(e => e.item.id === selectedId) : null;
    if (!entry) {
      const slot = slotFilter && slotMeta(slotFilter);
      setChildren(detail, el('p', { className: 'small dim', text: slot
        ? `Showing what fits your ${slot.label.toLowerCase()}. Pick one to equip it there.`
        : 'Select an item to inspect it, or click an empty slot to see what fits.' }));
      return;
    }
    const { item, count } = entry;
    const worn = equippedCount(run, item.id);
    const actions = [];

    if (isGear(item)) {
      actions.push(...gearActions(item));
    } else if (item.kind === 'consumable') {
      const blocked = item.combatOnly || item.inQuestion || item.passive;
      actions.push(button('Use', () => useItem(item), {
        className: 'btn--primary btn--center',
        disabled: blocked,
        sub: item.combatOnly ? 'Combat only'
          : item.inQuestion ? 'Used while answering'
          : item.passive ? 'Triggers automatically on death'
          : null
      }));
    }

    setChildren(detail,
      itemDetail(item, el('div', { className: 'tiny dim', text: `You hold ${count}${worn ? ` · ${worn} equipped` : ''}.` })),
      ...actions);
  }

  /* ---------------- pack ---------------- */

  function fits(item) {
    if (!slotFilter) return true;
    const slot = slotMeta(slotFilter);
    if (!slot.accepts.includes(item.kind)) return false;
    if (slotFilter === 'off' && item.kind === 'weapon') return run.level >= DUAL_WIELD_LEVEL && !item.twoHanded;
    return true;
  }

  function renderGrids() {
    const children = [];
    if (slotFilter) {
      const slot = slotMeta(slotFilter);
      children.push(el('div', { className: 'row between center-y' },
        el('span', { className: 'small gold', text: `Items for: ${slot.label}` }),
        button('Show everything', () => { slotFilter = null; render(); }, { className: 'btn--sm btn--ghost btn--inline btn--center' })));
    }
    for (const group of GROUPS) {
      const entries = inventoryEntries(run)
        .filter(e => group.kinds.includes(e.item.kind) && fits(e.item))
        .sort((a, b) => a.item.kind.localeCompare(b.item.kind));
      if (!entries.length) continue;
      children.push(el('div', { className: 'tiny dim', text: group.label }));
      children.push(el('div', { className: 'inv-grid' }, ...entries.map(({ item, count }) => {
        const worn = equippedCount(run, item.id);
        return el('button', {
          className: `slot b-${item.rarity} ${selectedId === item.id ? 'is-selected' : ''}`,
          type: 'button',
          title: `${item.name} — ${item.desc}`,
          onClick: () => { selectedId = item.id; sfx.select(); render(); }
        },
          itemIcon(item, 4),
          count > 1 && el('span', { className: 'slot-count', text: `×${count}` }),
          worn && el('span', { className: 'slot-equipped', text: worn > 1 ? `E×${worn}` : 'E' }));
      })));
    }
    if (children.length <= (slotFilter ? 1 : 0)) {
      children.push(el('p', { className: 'small dim', text: slotFilter
        ? `Nothing in your pack fits there yet. Craft one, or find one in chests.`
        : 'Your pack is empty.' }));
    }
    setChildren(grids, ...children);
  }

  /* ---------------- paper doll ---------------- */

  function slotButton(key) {
    const slot = slotMeta(key);
    const id = run.equipped[key];
    const item = id ? getItem(id) : null;
    const locked = !slotUnlocked(run, slot);
    const classes = ['doll-slot'];
    if (item) classes.push('is-filled', `b-${item.rarity}`);
    if (locked) classes.push('is-locked');
    if (slotFilter === key) classes.push('is-target');
    return el('button', {
      className: classes.join(' '),
      type: 'button',
      title: locked ? `${slot.label} — unlocks at level ${slot.level}`
        : item ? `${slot.label}: ${item.name}` : `${slot.label} — empty (${SLOT_HINT[key]})`,
      onClick: () => {
        if (locked) { toast(`${slot.label} unlocks at level ${slot.level}.`, ''); return; }
        sfx.select();
        if (item) { selectedId = item.id; slotFilter = null; }
        else { slotFilter = slotFilter === key ? null : key; selectedId = null; }
        render();
      },
    },
      item ? itemIcon(item, 3.6) : locked ? el('div', { className: 'doll-lock', text: `Lv ${slot.level}` }) : null,
      el('span', { className: 'doll-slot-label', text: slot.label.replace(' hand', '') }));
  }

  function renderDoll() {
    const stats = derived(run);
    const figure = spriteElement(stats.role.sprite, 15, { equipped: run.equipped, pad: 0.02 });
    const extra = [
      ['Block', stats.block, true], ['Dodge', stats.dodge, true], ['Regen', stats.regen, false],
      ['Thorns', stats.thorns, false], ['XP bonus', stats.xpBonus, true], ['Energy gain', stats.energyGain, false],
    ];
    setChildren(doll,
      el('div', { className: 'doll' },
        el('div', { className: 'doll-col' }, slotButton('head'), slotButton('chest'), slotButton('feet')),
        el('div', { className: 'doll-figure' }, figure),
        el('div', { className: 'doll-col' }, slotButton('main'), slotButton('off'),
          el('div', { className: 'tiny dim center', text: stats.dualWield ? 'Dual wielding' : run.level >= DUAL_WIELD_LEVEL ? 'Off hand: shield or weapon' : `Dual wield at Lv ${DUAL_WIELD_LEVEL}` }))),
      el('div', { className: 'doll-row' }, slotButton('ring1'), slotButton('ring2'), slotButton('ring3'), slotButton('charm1'), slotButton('charm2')),
      el('div', { className: 'stat-grid mt' }, ...extra.map(([label, value, pct]) => el('div', { className: 'stat-row' },
        el('span', { className: 'dim', text: label }),
        el('span', { text: pct ? `${Math.round((value || 0) * 100)}%` : `${value || 0}` })))));
  }

  function renderSummary() {
    const stats = derived(run);
    const nextLevel = Math.floor(45 * Math.pow(run.level, 1.45));
    setChildren(summary,
      el('div', { className: 'hud-strip' },
        el('div', { className: 'hud-chip gold', text: `${stats.role.name} · Lv ${run.level}` }),
        el('div', { className: 'hud-chip', text: `Floor ${run.floor}` }),
        el('div', { className: 'hud-chip', text: `ATK ${stats.atk}` }),
        el('div', { className: 'hud-chip', text: `DEF ${stats.def}` }),
        el('div', { className: 'hud-chip', text: `Crit ${(stats.crit * 100).toFixed(0)}%` }),
        el('div', { className: 'hud-chip', text: `Luck ${(stats.luck * 100).toFixed(0)}%` })),
      el('div', { className: 'row gap-sm' },
        el('div', { className: 'grow' }, bar('hp', run.hp, stats.maxHp, `HP ${Math.ceil(run.hp)} / ${stats.maxHp}`)),
        el('div', { className: 'grow' }, bar('energy', run.energy, MAX_ENERGY, `Energy ${Math.floor(run.energy)} / ${MAX_ENERGY}`)),
        el('div', { className: 'grow' }, bar('xp', run.xp, nextLevel, `XP ${run.xp} / ${nextLevel}`))));
  }

  function render() {
    renderSummary();
    renderDoll();
    renderGrids();
    renderDetail();
  }

  const dollPanel = panel('Equipped', doll);
  dollPanel.classList.add('panel--fill');
  const packPanel = panel('Pack', grids);
  packPanel.classList.add('panel--fill');
  const detailPanel = panel('Details', detail);
  detailPanel.classList.add('panel--fill');

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, summary),
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'col', style: { flex: '0 0 410px', minHeight: '0' } }, dollPanel),
      el('div', { className: 'col grow', style: { minHeight: '0' } }, packPanel),
      el('div', { className: 'col gap-sm', style: { flex: '0 0 340px', minHeight: '0' } },
        detailPanel,
        button('Back to the fight', () => go('adventure'), { className: 'btn--center' }),
        button('Crafting', () => go('crafting'), { className: 'btn--ghost btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'i' || event.key === 'I') { event.preventDefault(); go('adventure'); }
  }

  return {
    node,
    mount() { render(); window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); saveRun(); }
  };
}

