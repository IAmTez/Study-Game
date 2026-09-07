/* Screen router. Each screen is a function returning { node, mount?, unmount? }. */

const registry = new Map();
let current = null;
let currentName = '';

export function register(name, factory) {
  registry.set(name, factory);
}

export function currentScreen() {
  return currentName;
}

export function go(name, props = {}) {
  const factory = registry.get(name);
  if (!factory) {
    console.error(`[screens] no screen registered as "${name}"`);
    return;
  }
  const app = document.getElementById('app');
  if (current?.unmount) {
    try { current.unmount(); } catch (err) { console.error('[screens] unmount failed', err); }
  }
  while (app.firstChild) app.removeChild(app.firstChild);

  const screen = factory(props) || {};
  current = screen;
  currentName = name;
  if (screen.node) app.appendChild(screen.node);
  screen.mount?.();
  return screen;
}

/** Re-render the current screen in place (after inventory or stat changes). */
export function refresh(props) {
  if (currentName) go(currentName, props || {});
}
