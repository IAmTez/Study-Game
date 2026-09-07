/* Applies settings that affect the document rather than any one screen. */

import { game } from '../game/state.js';
import { setVolumes, startMusic, stopMusic } from '../core/audio.js';

export function applySettings() {
  const { fontSize, reduceMotion, sfxVolume, musicVolume } = game.settings;
  document.body.classList.toggle('font-large', fontSize === 'large');
  document.body.classList.toggle('font-small', fontSize === 'small');
  document.body.classList.toggle('reduce-motion', !!reduceMotion);
  setVolumes({ sfx: sfxVolume, music: musicVolume });
  if (musicVolume > 0) startMusic(); else stopMusic();
}
