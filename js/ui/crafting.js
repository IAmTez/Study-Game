/* Crafting screen: recipes, their costs, and what you are missing. */

import { el, panel, button, toast, itemIcon, rarityClass, itemDetail, setChildren} from './dom.js';
import { go } from './screens.js';
import { game, saveRun } from '../game/state.js';
import { allRecipeStatuses, craft } from '../game/crafting.js';
import { sfx } from '../core/audio.js';

const CATEGORIES = [
  { id: 'all', label: 'All', kinds: [] },
  { id: 'consumable', label: 'Potions & tools', kinds: ['consumable'] },
  { id: 'weapon', label: 'Weapons & shields', kinds: ['weapon', 'shield'] },
  { id: 'armour', label: 'Armour', kinds: ['helmet', 'armour', 'boots'] },
  { id: 'jewellery', label: 'Rings & charms', kinds: ['ring', 'charm'] },
];

export function craftingScreen() {
  const run = game.run;
  if (!run) { go('menu'); return {}; }

  let showOnlyCraftable = false;
  let selected = null;
  let category = 'all';

  const list = el('div', { className: 'col gap-sm' });
  const detail = el('div', { className: 'col gap-sm' });

  function renderDetail() {
    if (!selected) {
      setChildren(detail, el('p', { className: 'small dim', text: 'Select a recipe to see what it needs.' }));
      return;
    }
    const status = allRecipeStatuses(run).find(s => s.recipe.id === selected);
    if (!status) { selected = null; renderDetail(); return; }

    setChildren(detail, 
      itemDetail(status.result),
      el('div', { className: 'small dim', text: status.recipe.desc }),
      el('div', { className: 'divider' }),
      el('div', { className: 'small dim', text: 'Requires:' }),
      ...status.costs.map(cost => el('div', { className: 'stat-row' },
        el('span', { className: cost.item ? rarityClass(cost.item) : '', text: cost.item?.name || '???' }),
        el('span', { className: cost.have >= cost.need ? 'good' : 'bad', text: `${cost.have} / ${cost.need}` }))),
      status.recipe.amount > 1 && el('div', { className: 'tiny gold', text: `Yields ${status.recipe.amount}.` }),
      button('Craft', () => {
        const result = craft(run, status.recipe.id);
        if (!result.ok) { toast(result.reason, 'bad'); return; }
        sfx.craft();
        toast(`Crafted ${result.result.name}${result.amount > 1 ? ` x${result.amount}` : ''}.`, 'gold');
        saveRun();
        render();
      }, { className: 'btn--primary btn--center mt', disabled: !status.craftable }));
  }

  function renderList() {
    const statuses = allRecipeStatuses(run)
      .filter(s => !showOnlyCraftable || s.craftable)
      .filter(s => category === 'all' || CATEGORIES.find(c => c.id === category).kinds.includes(s.result.kind))
      .sort((a, b) => Number(b.craftable) - Number(a.craftable));
    renderTabs();

    if (!statuses.length) {
      setChildren(list, el('p', { className: 'small dim', text: 'Nothing craftable yet. Kill things and open chests.' }));
      return;
    }

    setChildren(list, ...statuses.map(status => el('button', {
      className: `q-card ${selected === status.recipe.id ? 'is-selected' : ''}`,
      type: 'button',
      style: selected === status.recipe.id ? { borderColor: 'var(--gold)' } : {},
      onClick: () => { selected = status.recipe.id; sfx.select(); render(); }
    },
      el('div', { className: 'row center-y gap-sm' },
        itemIcon(status.result, 2.8),
        el('div', { className: 'grow' },
          el('div', { className: rarityClass(status.result), text: status.result.name + (status.recipe.amount > 1 ? ` x${status.recipe.amount}` : '') }),
          el('div', { className: 'tiny dim', text: status.costs.map(c => `${c.item?.name || '?'} ${c.have}/${c.need}`).join(' · ') })),
        el('span', { className: status.craftable ? 'pill pill--good' : 'pill', text: status.craftable ? 'Ready' : 'Missing' })))));
  }

  const tabs = el('div', { className: 'rail-tabs' });
  function renderTabs() {
    const statuses = allRecipeStatuses(run);
    setChildren(tabs, ...CATEGORIES.map(c => {
      const ready = statuses.filter(s => s.craftable && (c.id === 'all' || c.kinds.includes(s.result.kind))).length;
      return button(`${c.label}${ready ? ` · ${ready}` : ''}`, () => { category = c.id; sfx.select(); render(); }, {
        className: `btn--sm btn--inline btn--center ${category === c.id ? 'btn--gold' : 'btn--ghost'}`,
      });
    }));
  }

  function render() {
    renderList();
    renderDetail();
  }

  const recipePanel = panel('Recipes', tabs, list);
  recipePanel.classList.add('panel--fill');
  const detailPanel = panel('Details', detail);
  detailPanel.classList.add('panel--fill');

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, el('div', { className: 'row between center-y wrap gap-sm' },
      el('div', { className: 'hud-strip' },
        el('div', { className: 'hud-chip gold', text: 'WORKBENCH' }),
        el('div', { className: 'hud-chip', text: `Floor ${run.floor}` })),
      el('label', { className: 'switch' },
        el('input', { type: 'checkbox', onChange: (e) => { showOnlyCraftable = e.target.checked; render(); } }),
        el('span', { text: 'Only show what I can make' })))),
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'col grow', style: { minHeight: '0' } }, recipePanel),
      el('div', { className: 'col gap-sm', style: { flex: '0 0 380px', minHeight: '0' } },
        detailPanel,
        button('Back to the fight', () => go('adventure'), { className: 'btn--center' }),
        button('Inventory', () => go('inventory'), { className: 'btn--ghost btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') { event.preventDefault(); go('adventure'); }
  }

  return {
    node,
    mount() { render(); window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); saveRun(); }
  };
}
