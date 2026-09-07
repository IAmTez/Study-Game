/* Subject manager: toggle which subjects appear, and import your own study
   material as a new playable subject. */

import { el, panel, button, toast, modal, closeModal, setChildren} from './dom.js';
import { go } from './screens.js';
import { game, saveCustomSubjects, saveSettings } from '../game/state.js';
import { allSubjects, enabledSubjectIds, invalidatePool, questionPool } from '../game/questions.js';
import { readStudyFile, ACCEPTED_EXTENSIONS, extensionOf } from '../import/files.js';
import { buildSubjectFromText } from '../import/parser.js';
import { sfx } from '../core/audio.js';

const FORMAT_LABEL = {
  json: 'JSON question list',
  table: 'CSV / TSV table',
  qa: 'question and answer prose',
  flashcards: 'term / definition flashcards',
  none: 'nothing recognisable'
};

export function subjectsScreen() {
  const listBox = el('div', { className: 'col gap-sm' });
  const importBox = el('div', { className: 'col gap-sm' });

  /* ------------------------------------------------------------
     Subject list
     ------------------------------------------------------------ */

  function setEnabled(id, enabled) {
    const all = allSubjects().map(s => s.id);
    const current = new Set(Array.isArray(game.settings.enabledSubjects) ? game.settings.enabledSubjects : all);
    enabled ? current.add(id) : current.delete(id);
    if (!current.size) {
      toast('At least one subject has to stay switched on.', 'bad');
      render();
      return;
    }
    game.settings.enabledSubjects = all.filter(x => current.has(x));
    saveSettings();
    invalidatePool();
    render();
  }

  function deleteCustom(subject) {
    modal(`Delete "${subject.name}"?`,
      el('p', { className: 'small dim', text: `${subject.questions.length} imported questions will be removed. Your accuracy history for them is kept but will no longer be shown.` }), [
      button('Delete', () => {
        game.customSubjects = game.customSubjects.filter(s => s.id !== subject.id);
        saveCustomSubjects();
        invalidatePool();
        closeModal();
        toast(`Deleted ${subject.name}.`, '');
        render();
      }, { className: 'btn--danger btn--inline btn--center' }),
      button('Keep', () => closeModal(), { className: 'btn--ghost btn--inline btn--center' }),
    ]);
  }

  function preview(subject) {
    const sample = subject.questions.slice(0, 8);
    modal(`${subject.name} — preview`,
      el('div', { className: 'col gap-sm' },
        el('div', { className: 'small dim', text: `${subject.questions.length} questions across ${subject.topics.length} topic(s).` }),
        ...sample.map(q => el('div', { className: 'subject-card' },
          el('div', { className: 'tiny dim', text: `${q.topic} · tier ${q.difficulty} · ${q.type === 'mc' ? 'multiple choice' : 'short answer'}` }),
          el('div', { className: 'small', text: q.prompt }),
          q.type === 'mc'
            ? el('div', { className: 'tiny good', text: `Answer: ${q.options[q.answer]}` })
            : el('div', { className: 'tiny good', text: `Looking for: ${(q.keywords || []).map(g => g[0]).join(', ') || (q.accept || [])[0] || '—'}` }))),
        subject.questions.length > sample.length
          && el('div', { className: 'tiny dim', text: `…and ${subject.questions.length - sample.length} more.` })),
      [button('Close', () => closeModal(), { className: 'btn--inline btn--center' })]);
  }

  function renderList() {
    const enabled = new Set(enabledSubjectIds());
    const subjects = allSubjects();

    setChildren(listBox, ...subjects.map(subject => el('div', { className: 'subject-card' },
      el('div', { className: 'row between center-y gap-sm wrap' },
        el('label', { className: 'switch' },
          el('input', {
            type: 'checkbox',
            checked: enabled.has(subject.id),
            onChange: (event) => setEnabled(subject.id, event.target.checked)
          }),
          el('span', { style: { color: subject.colour }, text: subject.name })),
        el('span', { className: 'pill', text: `${subject.questions.length} questions` })),
      el('div', { className: 'tiny dim', text: subject.syllabus || '' }),
      el('div', { className: 'tiny dim', text: subject.topics.join(' · ') }),
      el('div', { className: 'row gap-sm mt' },
        button('Preview', () => preview(subject), { className: 'btn--sm btn--ghost btn--center btn--inline' }),
        subject.custom && button('Delete', () => deleteCustom(subject), { className: 'btn--sm btn--danger btn--center btn--inline' })))));
  }

  /* ------------------------------------------------------------
     Importing
     ------------------------------------------------------------ */

  function confirmImport(subject) {
    if (!subject.questions.length) {
      toast('No questions could be read from that. Check the format guide below.', 'bad');
      return;
    }
    modal(`Import "${subject.name}"?`,
      el('div', { className: 'col gap-sm' },
        el('div', { className: 'small' , text: `Read as ${FORMAT_LABEL[subject.format] || subject.format}.` }),
        el('div', { className: 'small gold', text: `${subject.questions.length} questions generated.` }),
        el('div', { className: 'divider' }),
        ...subject.questions.slice(0, 5).map(q => el('div', { className: 'subject-card' },
          el('div', { className: 'small', text: q.prompt }),
          q.type === 'mc'
            ? el('div', { className: 'tiny good', text: `Answer: ${q.options[q.answer]}` })
            : el('div', { className: 'tiny good', text: `Looking for: ${(q.keywords || []).map(g => g[0]).join(', ')}` })))),
      [
        button('Add to the game', () => {
          game.customSubjects.push(subject);
          if (!saveCustomSubjects()) {
            game.customSubjects.pop();
            toast('Browser storage is full. Delete a subject and try again.', 'bad');
            closeModal();
            return;
          }
          // Newly imported subjects start switched on.
          if (Array.isArray(game.settings.enabledSubjects)) {
            game.settings.enabledSubjects.push(subject.id);
            saveSettings();
          }
          invalidatePool();
          sfx.loot();
          closeModal();
          toast(`${subject.name} added — ${subject.questions.length} questions.`, 'good');
          render();
        }, { className: 'btn--primary btn--inline btn--center' }),
        button('Cancel', () => closeModal(), { className: 'btn--ghost btn--inline btn--center' }),
      ]);
  }

  async function handleFiles(files) {
    for (const file of files) {
      const extension = extensionOf(file.name);
      if (!ACCEPTED_EXTENSIONS.includes(extension)) {
        toast(`Skipped ${file.name}: unsupported type.`, 'bad');
        continue;
      }
      toast(`Reading ${file.name}…`, '');
      try {
        const text = await readStudyFile(file, (page, total) => {
          if (page % 5 === 0) toast(`Reading page ${page} of ${total}…`, '');
        });
        const name = file.name.replace(/\.[a-z0-9]+$/i, '');
        const subject = buildSubjectFromText(name, text);
        confirmImport(subject);
      } catch (err) {
        toast(err.message || String(err), 'bad');
      }
    }
  }

  const dropzone = el('div', { className: 'dropzone' },
    el('div', { text: 'Drop study files here, or click to choose' }),
    el('div', { className: 'tiny', text: ACCEPTED_EXTENSIONS.join('  ') }));

  dropzone.addEventListener('click', () => {
    const input = el('input', { type: 'file', multiple: true, accept: ACCEPTED_EXTENSIONS.join(',') });
    input.addEventListener('change', () => handleFiles([...input.files]));
    input.click();
  });
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('is-over');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('is-over'));
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('is-over');
    handleFiles([...(event.dataTransfer?.files || [])]);
  });

  function manualBuilder() {
    const nameInput = el('input', { type: 'text', placeholder: 'Subject name, e.g. Chemistry Module 5' });
    const textInput = el('textarea', {
      className: 'short-input',
      style: { minHeight: '220px' },
      placeholder:
        'One card per line:\n\nMitochondria - the site of aerobic respiration\nOsmosis - movement of water across a partially permeable membrane\n\nOr full questions:\n\nQ: What causes coral bleaching?\nA: Heat stress causes coral to expel its zooxanthellae'
    });

    modal('Type your own cards',
      el('div', { className: 'col gap-sm' },
        el('label', { className: 'field', text: 'Subject name' }),
        nameInput,
        el('label', { className: 'field', text: 'Cards or questions' }),
        textInput),
      [
        button('Build subject', () => {
          const name = nameInput.value.trim() || 'My Notes';
          const text = textInput.value.trim();
          if (!text) { toast('Type some cards first.', 'bad'); return; }
          closeModal();
          confirmImport(buildSubjectFromText(name, text));
        }, { className: 'btn--primary btn--inline btn--center' }),
        button('Cancel', () => closeModal(), { className: 'btn--ghost btn--inline btn--center' }),
      ]);
  }

  function renderImport() {
    setChildren(importBox, 
      dropzone,
      el('div', { className: 'row gap-sm mt' },
        button('Type cards by hand', manualBuilder, { className: 'btn--center' })),
      el('div', { className: 'divider' }),
      el('div', { className: 'small dim', text: 'Recognised formats' }),
      el('div', { className: 'tiny dim', style: { lineHeight: '2.1' } },
        el('div', { text: '· Flashcards — "term - definition", one per line' }),
        el('div', { text: '· Q&A — "Q: …" then "A: …"' }),
        el('div', { text: '· Numbered multiple choice with an "Answer: b" line' }),
        el('div', { text: '· CSV/TSV with question, answer and option columns' }),
        el('div', { text: '· JSON array of question objects' })),
      el('div', { className: 'tiny dim mt', text:
        'Word documents are read directly in your browser. PDFs need an internet connection the first time, since the PDF reader is fetched on demand.' }),
    );
  }

  function render() {
    renderList();
    renderImport();
    countChip.textContent = `${questionPool().length} QUESTIONS IN POOL`;
    subjectChip.textContent = `${allSubjects().length} subjects`;
  }

  const countChip = el('div', { className: 'hud-chip gold', text: '' });
  const subjectChip = el('div', { className: 'hud-chip', text: '' });

  const node = el('div', { className: 'screen col gap-sm' },
    panel(null, el('div', { className: 'hud-strip' }, countChip, subjectChip)),
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'grow screen-scroll' }, panel('Subjects', listBox)),
      el('div', { className: 'col gap-sm screen-scroll', style: { flex: '0 0 380px' } },
        panel('Add your own material', importBox),
        button('Back', () => go(game.run ? 'dungeon' : 'menu'), { className: 'btn--center' }))),
  );

  function onKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); go(game.run ? 'dungeon' : 'menu'); }
  }

  return {
    node,
    mount() { render(); window.addEventListener('keydown', onKeyDown); },
    unmount() { window.removeEventListener('keydown', onKeyDown); }
  };
}
