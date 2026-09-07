/* Stats screen — the study record. Accuracy by subject and topic is the point
   of the whole game, so it gets the most space. */

import { el, panel, button, bar, statRow } from './dom.js';
import { go } from './screens.js';
import { game, accuracy, weakestTopics, derived, xpForLevel } from '../game/state.js';
import { allSubjects } from '../game/questions.js';

function pct(value) {
  return `${Math.round(value * 100)}%`;
}

function duration(ms) {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export function statsScreen() {
  const meta = game.meta;
  const run = game.run;
  const subjects = allSubjects();
  const overall = meta.questionsAnswered
    ? (meta.questionsCorrect + meta.questionsPartial * 0.5) / meta.questionsAnswered
    : 0;

  const subjectRows = subjects.map(subject => {
    const entry = meta.bySubject[subject.id];
    const value = accuracy(entry);
    return el('div', { className: 'col gap-sm mb' },
      el('div', { className: 'row between small' },
        el('span', { style: { color: subject.colour }, text: subject.name }),
        el('span', { className: 'dim', text: entry ? `${entry.correct}/${entry.seen} · ${pct(value)}` : 'not attempted' })),
      bar(value >= 0.7 ? 'xp' : value >= 0.45 ? 'energy' : 'hp', entry?.seen ? value * 100 : 0, 100, ' '));
  });

  const weak = weakestTopics(8, 2);
  const weakRows = weak.length
    ? weak.map(item => {
        const subject = subjects.find(s => s.id === item.subjectId);
        return el('div', { className: 'stat-row' },
          el('span', { text: `${subject?.short || item.subjectId} · ${item.topic}` }),
          el('span', { className: item.accuracy < 0.5 ? 'bad' : '', text: `${pct(item.accuracy)} of ${item.entry.seen}` }));
      })
    : [el('p', { className: 'small dim', text: 'Answer a few more questions and your weakest topics will be listed here.' })];

  const strongest = [...weakestTopics(200, 2)].reverse().slice(0, 5);
  const strongRows = strongest.length
    ? strongest.map(item => {
        const subject = subjects.find(s => s.id === item.subjectId);
        return el('div', { className: 'stat-row' },
          el('span', { text: `${subject?.short || item.subjectId} · ${item.topic}` }),
          el('span', { className: 'good', text: `${pct(item.accuracy)} of ${item.entry.seen}` }));
      })
    : [el('p', { className: 'small dim', text: 'Nothing mastered yet.' })];

  const runPanel = run
    ? panel('Current run',
        statRow('Role', derived(run).role.name),
        statRow('Level', run.level),
        statRow('Floor', run.floor),
        statRow('XP to next level', Math.max(0, xpForLevel(run.level) - run.xp)),
        statRow('Enemies felled this run', run.kills),
        statRow('Floors cleared this run', run.floorsCleared))
    : panel('Current run', el('p', { className: 'small dim', text: 'No run in progress.' }));

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, el('div', { className: 'hud-strip' },
      el('div', { className: 'hud-chip gold', text: `OVERALL ACCURACY ${pct(overall)}` }),
      el('div', { className: 'hud-chip', text: `${meta.questionsAnswered} answered` }),
      el('div', { className: 'hud-chip', text: `deepest floor ${meta.deepestFloor}` }),
      el('div', { className: 'hud-chip', text: `sanctum ${meta.sanctum || '—'}` }))),

    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'col gap-sm grow screen-scroll' },
        panel('Accuracy by subject', ...subjectRows),
        panel('Weakest topics — revise these',
          el('p', { className: 'tiny dim mb', text: 'Questions you have got wrong are offered to you more often.' }),
          ...weakRows)),

      el('div', { className: 'col gap-sm grow screen-scroll' },
        panel('Lifetime',
          statRow('Runs started', meta.totalRuns),
          statRow('Deepest floor', meta.deepestFloor),
          statRow('Bosses felled', meta.bossesFelled),
          statRow('Enemies felled', meta.enemiesFelled),
          statRow('Items found', meta.itemsFound),
          statRow('Questions answered', meta.questionsAnswered),
          statRow('Fully correct', meta.questionsCorrect),
          statRow('Partially correct', meta.questionsPartial),
          statRow('Time played', duration(meta.timePlayedMs + (Date.now() - game.sessionStart)))),
        panel('Strongest topics', ...strongRows),
        runPanel,
        button('Back', () => go(run ? 'dungeon' : 'menu'), { className: 'btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); go(run ? 'dungeon' : 'menu'); }
  }

  return {
    node,
    mount() { window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); }
  };
}
