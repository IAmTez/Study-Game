/* Inventory: equipment slots, item grid and out-of-combat item use. */

import { el, panel, button, bar, toast, itemIcon, rarityClass, itemDetail, setChildren} from './dom.js';
import { go } from './screens.js';
import {
  game, derived, inventoryEntries, equip, unequip, removeItem, countItem, saveRun, MAX_ENERGY
} from '../game/state.js';
import { rarityMeta } from '../data/items.js';
import { sfx } from '../core/audio.js';

const SLOTS = [
  { key: 'weapon', label: 'Weapon' },
  { key: 'armour', label: 'Armour' },
  { key: 'trinket', label: 'Trinket' },
];

const GROUPS = [
  { kind: 'consumable', label: 'Consumables' },
  { kind: 'weapon', label: 'Weapons' },
  { kind: 'armour', label: 'Armour' },
  { kind: 'trinket', label: 'Trinkets' },
  { kind: 'material', label: 'Materials' },
];

export function inventoryScreen() {
  const run = game.run;
  if (!run) { go('menu'); return {}; }

  let selectedId = null;
  const detail = el('div', { className: 'col gap-sm' });
  const grids = el('div', { className: 'col gap-sm' });
  const equipment = el('div', { className: 'col gap-sm' });
  const summary = el('div', { className: 'col gap-sm' });

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

  function renderDetail() {
    const entry = selectedId ? inventoryEntries(run).find(e => e.item.id === selectedId) : null;
    if (!entry) {
      setChildren(detail, el('p', { className: 'small dim', text: 'Select an item to inspect it.' }));
      return;
    }
    const { item, count } = entry;
    const actions = [];

    if (['weapon', 'armour', 'trinket'].includes(item.kind)) {
      const isEquipped = run.equipped[item.kind] === item.id;
      actions.push(button(isEquipped ? 'Unequip' : 'Equip', () => {
        sfx.confirm();
        isEquipped ? unequip(run, item.kind) : equip(run, item.id);
        saveRun();
        render();
      }, { className: isEquipped ? 'btn--ghost btn--center' : 'btn--primary btn--center' }));
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
      itemDetail(item, el('div', { className: 'tiny dim', text: `You hold ${count}.` })),
      ...actions);
  }

  function renderGrids() {
    const children = [];
    for (const group of GROUPS) {
      const entries = inventoryEntries(run, group.kind);
      if (!entries.length) continue;
      children.push(el('div', { className: 'small dim', text: group.label }));
      children.push(el('div', { className: 'inv-grid' }, ...entries.map(({ item, count }) => {
        const equipped = run.equipped[item.kind] === item.id;
        return el('button', {
          className: `slot b-${item.rarity} ${selectedId === item.id ? 'is-selected' : ''}`,
          type: 'button',
          title: `${item.name} — ${item.desc}`,
          onClick: () => { selectedId = item.id; sfx.select(); render(); }
        },
          itemIcon(item, 2),
          count > 1 && el('span', { className: 'slot-count', text: String(count) }),
          equipped && el('span', { className: 'slot-equipped', text: 'E' }));
      })));
    }
    if (!children.length) {
      children.push(el('p', { className: 'small dim', text: 'Your pack is empty.' }));
    }
    setChildren(grids, ...children);
  }

  function renderEquipment() {
    setChildren(equipment, ...SLOTS.map(slot => {
      const id = run.equipped[slot.key];
      const entry = id ? inventoryEntries(run).find(e => e.item.id === id) : null;
      return el('div', { className: 'row center-y gap-sm' },
        entry
          ? el('div', { className: `slot b-${entry.item.rarity}`, style: { width: '54px', flex: '0 0 54px' } }, itemIcon(entry.item, 2))
          : el('div', { className: 'slot slot--empty', style: { width: '54px', flex: '0 0 54px' } }),
        el('div', { className: 'grow' },
          el('div', { className: 'tiny dim', text: slot.label }),
          entry
            ? el('div', { className: rarityClass(entry.item), text: entry.item.name })
            : el('div', { className: 'small dim', text: 'Empty' })));
    }));
  }

  function renderSummary() {
    const stats = derived(run);
    const nextLevel = Math.floor(45 * Math.pow(run.level, 1.45));
    setChildren(summary, 
      el('div', { className: 'hud-strip' },
        el('div', { className: 'hud-chip gold', text: `${stats.role.name} Lv ${run.level}` }),
        el('div', { className: 'hud-chip', text: `Floor ${run.floor}` }),
        el('div', { className: 'hud-chip', text: `ATK ${stats.atk}` }),
        el('div', { className: 'hud-chip', text: `DEF ${stats.def}` }),
        el('div', { className: 'hud-chip', text: `CRIT ${(stats.crit * 100).toFixed(0)}%` }),
        el('div', { className: 'hud-chip', text: `LUCK ${(stats.luck * 100).toFixed(0)}%` })),
      bar('hp', run.hp, stats.maxHp, `HP ${Math.ceil(run.hp)} / ${stats.maxHp}`),
      bar('energy', run.energy, MAX_ENERGY, `Energy ${Math.floor(run.energy)} / ${MAX_ENERGY}`),
      bar('xp', run.xp, nextLevel, `XP ${run.xp} / ${nextLevel}`));
  }

  function render() {
    renderSummary();
    renderEquipment();
    renderGrids();
    renderDetail();
  }

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, summary),
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'grow screen-scroll' }, panel('Pack', grids)),
      el('div', { className: 'col gap-sm screen-scroll', style: { flex: '0 0 320px' } },
        panel('Equipped', equipment),
        panel('Details', detail),
        button('Back to the tunnels', () => go('dungeon'), { className: 'btn--center' }),
        button('Crafting', () => go('crafting'), { className: 'btn--ghost btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'i' || event.key === 'I') { event.preventDefault(); go('dungeon'); }
  }

  return {
    node,
    mount() { render(); window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); saveRun(); }
  };
}
