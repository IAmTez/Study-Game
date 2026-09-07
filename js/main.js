/* Bootstrap: load saved data, register the screens, and open the menu. */

import { register, go } from './ui/screens.js';
import { menuScreen, roleScreen } from './ui/menu.js';
import { adventureScreen } from './ui/adventure.js';
import { inventoryScreen } from './ui/inventory.js';
import { craftingScreen } from './ui/crafting.js';
import { statsScreen } from './ui/stats.js';
import { settingsScreen } from './ui/settings.js';
import { subjectsScreen } from './ui/subjects.js';
import { applySettings } from './ui/apply-settings.js';
import { loadGame, saveAll, game } from './game/state.js';
import { validateSprites } from './art/render.js';
import { unlock } from './core/audio.js';
import { toast } from './ui/dom.js';

register('menu', menuScreen);
register('roles', roleScreen);
register('adventure', adventureScreen);
register('inventory', inventoryScreen);
register('crafting', craftingScreen);
register('stats', statsScreen);
register('settings', settingsScreen);
register('subjects', subjectsScreen);

/* Audio contexts may not be created until the player interacts. */
function unlockAudioOnce() {
  unlock();
  window.removeEventListener('pointerdown', unlockAudioOnce);
  window.removeEventListener('keydown', unlockAudioOnce);
}
window.addEventListener('pointerdown', unlockAudioOnce);
window.addEventListener('keydown', unlockAudioOnce);

/* A thrown error mid-screen would otherwise leave a blank page. */
window.addEventListener('error', (event) => {
  console.error('[game]', event.error || event.message);
  toast('Something went wrong — check the browser console.', 'bad');
});
window.addEventListener('unhandledrejection', (event) => {
  console.error('[game] unhandled rejection', event.reason);
});

window.addEventListener('beforeunload', () => saveAll());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveAll();
});

function start() {
  loadGame();
  applySettings();
  if (new URLSearchParams(window.location.search).has('debug')) validateSprites();
  go('menu');
}

/* Expose a little of the state for debugging from the console. */
window.SewersOfStudy = { game, go };

start();
