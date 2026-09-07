/* Settings: audio, readability, question behaviour and save-data management. */

import { el, panel, button, toast, modal, closeModal } from './dom.js';
import { go } from './screens.js';
import { game, saveSettings, saveAll, defaultMeta, defaultSettings } from '../game/state.js';
import { invalidatePool, questionPool } from '../game/questions.js';
import * as storage from '../core/storage.js';
import { setVolumes, sfx } from '../core/audio.js';
import { applySettings } from './apply-settings.js';

export function settingsScreen() {
  const settings = game.settings;

  function update(key, value) {
    settings[key] = value;
    applySettings();
    saveSettings();
  }

  const slider = (label, key, onInput) => {
    const output = el('span', { className: 'gold', text: `${Math.round(settings[key] * 100)}%` });
    return el('div', { className: 'mb' },
      el('div', { className: 'row between' }, el('label', { className: 'field', text: label }), output),
      el('input', {
        type: 'range', min: '0', max: '1', step: '0.05', value: String(settings[key]),
        onInput: (event) => {
          const value = parseFloat(event.target.value);
          output.textContent = `${Math.round(value * 100)}%`;
          update(key, value);
          onInput?.(value);
        }
      }));
  };

  const toggle = (label, key, description) => el('div', { className: 'mb' },
    el('label', { className: 'switch' },
      el('input', { type: 'checkbox', checked: !!settings[key], onChange: (e) => update(key, e.target.checked) }),
      el('span', { text: label })),
    description && el('div', { className: 'tiny dim', text: description }));

  const select = (label, key, options, description) => el('div', { className: 'mb' },
    el('label', { className: 'field', text: label }),
    el('select', {
      onChange: (event) => {
        const raw = event.target.value;
        update(key, /^-?\d+$/.test(raw) ? parseInt(raw, 10) : raw);
        invalidatePool();
        toast(`${questionPool().length} questions in the pool.`, '');
      }
    }, ...options.map(option => el('option', {
      value: String(option.value),
      selected: String(settings[key]) === String(option.value),
      text: option.label
    }))),
    description && el('div', { className: 'tiny dim', text: description }));

  /* --- save data --- */

  function exportSave() {
    const dump = storage.exportAll();
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = el('a', { href: url, download: `sewers-of-study-${new Date().toISOString().slice(0, 10)}.json` });
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('Save exported.', 'good');
  }

  function importSave() {
    const input = el('input', { type: 'file', accept: 'application/json,.json' });
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const dump = JSON.parse(await file.text());
        storage.importAll(dump);
        toast('Save imported. Reloading.', 'good');
        setTimeout(() => window.location.reload(), 700);
      } catch (err) {
        toast(`Could not import: ${err.message}`, 'bad');
      }
    });
    input.click();
  }

  function wipe() {
    modal('Erase everything?',
      el('p', { className: 'small dim', text:
        'This deletes your run, your lifetime statistics, your study record and every custom subject you have imported. It cannot be undone.' }), [
      button('Erase everything', () => {
        for (const key of Object.values(storage.KEYS)) storage.remove(key);
        closeModal();
        toast('All data erased. Reloading.', 'bad');
        setTimeout(() => window.location.reload(), 700);
      }, { className: 'btn--danger btn--inline btn--center' }),
      button('Cancel', () => closeModal(), { className: 'btn--ghost btn--inline btn--center' }),
    ]);
  }

  function resetStats() {
    modal('Reset study statistics?',
      el('p', { className: 'small dim', text:
        'Clears accuracy history, weakest topics and lifetime counters. Your current run, items and custom subjects are kept.' }), [
      button('Reset statistics', () => {
        const keep = { vault: game.meta.vault, sanctum: game.meta.sanctum, unlockedRoles: game.meta.unlockedRoles };
        game.meta = { ...defaultMeta(), ...keep };
        saveAll();
        closeModal();
        toast('Study statistics reset.', '');
        go('settings');
      }, { className: 'btn--danger btn--inline btn--center' }),
      button('Cancel', () => closeModal(), { className: 'btn--ghost btn--inline btn--center' }),
    ]);
  }

  const usage = (storage.usageBytes() / 1024).toFixed(1);

  const node = el('div', { className: 'screen col gap-sm' },
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'col gap-sm grow screen-scroll' },
        panel('Audio',
          slider('Sound effects', 'sfxVolume', (v) => { setVolumes({ sfx: v }); sfx.select(); }),
          slider('Ambience', 'musicVolume', (v) => setVolumes({ music: v }))),
        panel('Readability',
          select('Text size', 'fontSize', [
            { value: 'small', label: 'Small' },
            { value: 'normal', label: 'Normal' },
            { value: 'large', label: 'Large' },
          ]),
          toggle('Reduce motion', 'reduceMotion', 'Disables shakes, lunges and floating numbers.')),
        panel('Save data',
          el('p', { className: 'tiny dim mb', text: `Using about ${usage} KB of browser storage.` }),
          el('div', { className: 'col gap-sm' },
            button('Export save file', exportSave, { className: 'btn--center', sub: 'Download everything as JSON' }),
            button('Import save file', importSave, { className: 'btn--center', sub: 'Replace current data from a file' }),
            button('Reset study statistics', resetStats, { className: 'btn--ghost btn--center' }),
            button('Erase all data', wipe, { className: 'btn--danger btn--center' })))),

      el('div', { className: 'col gap-sm grow screen-scroll' },
        panel('Questions',
          select('Question types', 'questionTypes', [
            { value: 'both', label: 'Multiple choice and short answer' },
            { value: 'mc', label: 'Multiple choice only' },
            { value: 'short', label: 'Short answer only' },
          ], 'Short answers are graded on key ideas, not exact wording.'),
          select('Difficulty', 'difficultyBias', [
            { value: -1, label: 'Gentler — one tier easier' },
            { value: 0, label: 'Standard' },
            { value: 1, label: 'Harder — one tier harder' },
          ], 'Question tier still rises with depth; this shifts the whole curve.'),
          toggle('Show explanations after answering', 'showExplanations',
            'The explanations are the study notes. Turning this off makes the game faster and much less useful.'),
          el('div', { className: 'tiny dim mt', text: `${questionPool().length} questions currently in the pool.` }),
          button('Manage subjects', () => go('subjects'), { className: 'btn--center mt' })),
        panel('Controls',
          el('div', { className: 'small dim', style: { lineHeight: '2.2' } },
            el('div', {}, el('span', { className: 'kbd', text: 'I' }), ' inventory'),
            el('div', {}, el('span', { className: 'kbd', text: 'C' }), ' crafting'),
            el('div', {}, el('span', { className: 'kbd', text: 'Esc' }), ' back / menu'),
            el('div', {}, el('span', { className: 'kbd', text: 'Ctrl+Enter' }), ' submit a short answer'))),
        button('Back', () => go(game.run ? 'adventure' : 'menu'), { className: 'btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); go(game.run ? 'adventure' : 'menu'); }
  }

  return {
    node,
    mount() { window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); saveSettings(); }
  };
}
