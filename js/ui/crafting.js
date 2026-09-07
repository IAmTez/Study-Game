/* Crafting screen: recipes, their costs, and what you are missing. */

import { el, panel, button, toast, itemIcon, rarityClass, itemDetail, setChildren} from './dom.js';
import { go } from './screens.js';
import { game, saveRun, countItem } from '../game/state.js';
import { allRecipeStatuses, craft } from '../game/crafting.js';
import { sfx } from '../core/audio.js';

export function craftingScreen() {
  const run = game.run;
  if (!run) { go('menu'); return {}; }

  let showOnlyCraftable = false;
  let selected = null;

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
      .sort((a, b) => Number(b.craftable) - Number(a.craftable));

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
        itemIcon(status.result, 2),
        el('div', { className: 'grow' },
          el('div', { className: rarityClass(status.result), text: status.result.name + (status.recipe.amount > 1 ? ` x${status.recipe.amount}` : '') }),
          el('div', { className: 'tiny dim', text: status.costs.map(c => `${c.item?.name || '?'} ${c.have}/${c.need}`).join(' · ') })),
        el('span', { className: status.craftable ? 'pill pill--good' : 'pill', text: status.craftable ? 'Ready' : 'Missing' })))));
  }

  function render() {
    renderList();
    renderDetail();
  }

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, el('div', { className: 'row between center-y wrap gap-sm' },
      el('div', { className: 'hud-strip' },
        el('div', { className: 'hud-chip gold', text: 'WORKBENCH' }),
        el('div', { className: 'hud-chip', text: `Floor ${run.floor}` })),
      el('label', { className: 'switch' },
        el('input', { type: 'checkbox', onChange: (e) => { showOnlyCraftable = e.target.checked; render(); } }),
        el('span', { text: 'Only show what I can make' })))),
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'grow screen-scroll' }, panel('Recipes', list)),
      el('div', { className: 'col gap-sm screen-scroll', style: { flex: '0 0 320px' } },
        panel('Details', detail),
        button('Back to the tunnels', () => go('dungeon'), { className: 'btn--center' }),
        button('Inventory', () => go('inventory'), { className: 'btn--ghost btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') { event.preventDefault(); go('dungeon'); }
  }

  return {
    node,
    mount() { render(); window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); saveRun(); }
  };
}
