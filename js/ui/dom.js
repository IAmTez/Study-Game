/* Small DOM helpers. No framework — the screens are plain elements. */

import { spriteElement } from '../art/render.js';
import { rarityMeta } from '../data/items.js';

/** el('div', { className, onClick, ... }, ...children) */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props || {})) {
    if (value == null || value === false) continue;
    if (key === 'className') node.className = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key in node && typeof value !== 'object') {
      node[key] = value;
    } else {
      node.setAttribute(key, value);
    }
  }
  append(node, children);
  return node;
}

export function append(parent, children) {
  for (const child of children.flat(4)) {
    // `cond && node` yields 0 when cond is an empty array's length, which would
    // otherwise render a stray "0". Numbers for display always arrive via a
    // `text:` prop or a template string, so dropping a bare 0 is safe here.
    if (child == null || child === false || child === 0 || child === '') continue;
    parent.appendChild(typeof child === 'string' || typeof child === 'number'
      ? document.createTextNode(String(child))
      : child);
  }
  return parent;
}

/**
 * Replace a node's children, dropping the falsy placeholders that conditional
 * expressions produce. Node.replaceChildren stringifies non-Node values, so
 * `cond ? el(...) : null` would otherwise render the literal text "null".
 */
export function setChildren(node, ...children) {
  node.replaceChildren(...children.flat(4).filter(
    child => child != null && child !== false && child !== 0 && child !== '',
  ));
  return node;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
  return node;
}

/* ---------------------------------------------------------------
   Reusable pieces
   --------------------------------------------------------------- */

export function panel(title, ...children) {
  return el('div', { className: 'panel' },
    title && el('h2', { className: 'panel-title', text: title }),
    ...children);
}

export function button(label, onClick, { className = '', sub = '', disabled = false, title = '' } = {}) {
  return el('button', { className: `btn ${className}`, onClick, disabled, title, type: 'button' },
    el('span', { text: label }),
    sub && el('span', { className: 'btn-sub', text: sub }));
}

export function bar(kind, value, max, label) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return el('div', { className: 'bar' },
    el('div', { className: `bar-fill bar-fill--${kind}`, style: { width: `${pct}%` } }),
    el('div', { className: 'bar-label', text: label ?? `${Math.ceil(value)} / ${max}` }));
}

export function statRow(label, value) {
  return el('div', { className: 'stat-row' }, el('span', { text: label }), el('span', { text: String(value) }));
}

export function itemIcon(item, scale = 3) {
  return spriteElement(item.sprite, scale);
}

export function rarityClass(item) {
  return `rar-${item.rarity || 'common'}`;
}

export function itemName(item) {
  return el('span', { className: rarityClass(item), text: item.name });
}

/* ---------------------------------------------------------------
   Toasts
   --------------------------------------------------------------- */

export function toast(text, kind = '', duration = 3200) {
  const host = document.getElementById('toasts');
  if (!host) return;
  const node = el('div', { className: `toast ${kind ? `toast--${kind}` : ''}`, text });
  host.appendChild(node);
  setTimeout(() => {
    node.style.opacity = '0';
    setTimeout(() => node.remove(), 250);
  }, duration);
}

/* ---------------------------------------------------------------
   Modal
   --------------------------------------------------------------- */

let openModal = null;

export function modal(title, body, actions = []) {
  closeModal();
  const content = panel(title, body,
    actions.length ? el('div', { className: 'row wrap mt' }, ...actions) : null);
  content.classList.add('modal');
  const backdrop = el('div', { className: 'modal-backdrop', onClick: (e) => {
    if (e.target === backdrop) closeModal();
  } }, content);
  document.body.appendChild(backdrop);
  openModal = backdrop;
  return { close: closeModal, node: content };
}

export function closeModal() {
  if (openModal) { openModal.remove(); openModal = null; }
}

export function isModalOpen() {
  return !!openModal;
}

/** A tooltip-style item detail block used by inventory and loot screens. */
export function itemDetail(item, extra = null) {
  const rarity = rarityMeta(item.rarity);
  return el('div', { className: 'col gap-sm' },
    el('div', { className: 'row center-y gap-sm' },
      itemIcon(item, 3),
      el('div', {},
        el('div', { className: rarityClass(item), text: item.name }),
        el('div', { className: 'tiny dim', text: `${rarity.name} · ${item.kind}` }))),
    el('div', { className: 'small dim', text: item.desc }),
    item.stats && el('div', { className: 'tiny gold', text: Object.entries(item.stats)
      .map(([k, v]) => `${k === 'maxHp' ? 'Max HP' : k === 'energyGain' ? 'Energy gain' : k.toUpperCase()} +${v % 1 ? (v * 100).toFixed(0) + '%' : v}`)
      .join('   ') }),
    extra);
}
