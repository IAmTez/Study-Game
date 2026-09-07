/* Title screen and role selection. */

import { el, panel, button, toast, modal, closeModal, statRow, setChildren} from './dom.js';
import { go } from './screens.js';
import { ROLES } from '../data/roles.js';
import { spriteElement } from '../art/render.js';
import { game, createRun, endRun, derived, saveAll } from '../game/state.js';
import { questionPool, enabledSubjects } from '../game/questions.js';
import { sfx } from '../core/audio.js';

export function menuScreen() {
  const run = game.run;
  const meta = game.meta;
  const poolSize = questionPool().length;
  const subjectCount = enabledSubjects().length;

  const items = [];

  if (run) {
    items.push(button('Continue Run', () => { sfx.confirm(); go('adventure'); }, {
      className: 'btn--primary btn--center span-2',
      sub: `${derived(run).role.name} · Level ${run.level} · Floor ${run.floor}`
    }));
    items.push(button('Abandon Run', () => {
      modal('Abandon this run?', el('p', { className: 'small dim',
        text: 'Your progress on this dive is lost. A quarter of your crafting materials are carried back up to the surface.' }), [
        button('Abandon', () => {
          endRun({ died: true });
          closeModal();
          toast('Run abandoned.', 'bad');
          go('menu');
        }, { className: 'btn--danger btn--inline btn--center' }),
        button('Keep diving', () => closeModal(), { className: 'btn--ghost btn--inline btn--center' }),
      ]);
    }, { className: 'btn--ghost btn--center' }));
  } else {
    items.push(button('Play', () => { sfx.confirm(); go('roles'); }, {
      className: 'btn--primary btn--center span-2',
      sub: meta.sanctum > 0 ? `Sanctum reached: floor ${meta.sanctum}` : 'Begin a new descent'
    }));
  }

  items.push(button('Inventory', () => go('inventory'), {
    className: 'btn--center', sub: run ? 'Equip gear and use items' : 'Requires an active run',
    disabled: !run
  }));
  items.push(button('Crafting', () => go('crafting'), {
    className: 'btn--center', sub: run ? 'Combine materials' : 'Requires an active run',
    disabled: !run
  }));
  items.push(button('Stats', () => go('stats'), { className: 'btn--center', sub: 'Your study record' }));
  items.push(button('Subjects', () => go('subjects'), {
    className: 'btn--center', sub: `${subjectCount} active · ${poolSize} questions`
  }));
  items.push(button('Settings', () => go('settings'), { className: 'btn--center span-2', sub: 'Audio, difficulty, save data' }));

  const node = el('div', { className: 'screen col gap-lg center-y center-x', style: { justifyContent: 'center' } },
    el('div', { className: 'title-wrap' },
      el('div', { className: 'row gap-sm center-y' },
        spriteElement('rat', 3),
        spriteElement('slime', 3),
        spriteElement('boss_ratking', 3),
        spriteElement('ghoul', 3),
        spriteElement('cultist', 3)),
      el('h1', { className: 'title-main', text: 'SEWERS OF STUDY' }),
      el('div', { className: 'title-sub', text: 'AN INFINITE REVISION DUNGEON' }),
      el('p', { className: 'title-tag', text:
        'Every move costs an answer. Choose your question, take your swing, and see how deep your notes will carry you.' })),
    el('div', { className: 'menu-grid' }, ...items),
    el('div', { className: 'row gap-lg small dim center-x wrap' },
      el('span', { text: `Deepest floor ${meta.deepestFloor}` }),
      el('span', { text: `Runs ${meta.totalRuns}` }),
      el('span', { text: `Bosses ${meta.bossesFelled}` }),
      el('span', { text: `Answered ${meta.questionsAnswered}` })),
  );

  return { node, unmount: () => saveAll() };
}

export function roleScreen() {
  let selected = ROLES[0].id;
  let startFromSanctum = game.meta.sanctum > 0;

  const cards = ROLES.map(role => {
    const card = el('button', {
      className: `role-card ${role.id === selected ? 'is-selected' : ''}`,
      type: 'button',
      onClick: () => {
        selected = role.id;
        sfx.select();
        for (const other of cards) other.classList.toggle('is-selected', other.dataset.role === selected);
        updateSummary();
      },
      dataset: { role: role.id }
    },
      spriteElement(role.sprite, 4),
      el('div', { className: 'role-name', text: role.name }),
      el('div', { className: 'role-desc', text: role.blurb }),
      el('div', { className: 'role-perk', text: `${role.perk.name}: ${role.perk.desc}` }),
      el('div', { className: 'tiny dim', text:
        `HP ${role.stats.maxHp}  ATK ${role.stats.atk}  DEF ${role.stats.def}  ENERGY x${role.stats.energyGain}` }));
    return card;
  });

  const summary = el('div', { className: 'col gap-sm' });
  function updateSummary() {
    const role = ROLES.find(r => r.id === selected);
    setChildren(summary, 
      el('div', { className: 'gold', text: role.name }),
      el('div', { className: 'small dim', text: role.blurb }),
      el('div', { className: 'small good', text: `${role.perk.name} — ${role.perk.desc}` }),
      el('div', { className: 'tiny dim mt', text: 'Abilities unlock as you level and as you bank energy:' }),
      ...role.abilities.map(id => el('div', { className: 'tiny', text: `· ${id.replace(/_/g, ' ')}` })),
    );
  }
  updateSummary();

  const sanctumToggle = game.meta.sanctum > 0
    ? el('label', { className: 'switch' },
        el('input', { type: 'checkbox', checked: true, onChange: (e) => { startFromSanctum = e.target.checked; } }),
        el('span', { text: `Start from your sanctum (floor ${game.meta.sanctum + 1}) instead of floor 1` }))
    : null;

  const node = el('div', { className: 'screen col gap-lg' },
    panel('Choose your role',
      el('p', { className: 'small dim mb', text:
        'Your role is fixed for the whole run. It sets your health, damage, how fast energy builds, and one passive that changes how you play.' }),
      el('div', { className: 'role-grid' }, ...cards)),
    el('div', { className: 'row gap-lg' },
      el('div', { className: 'grow' }, panel('Selected', summary)),
      el('div', { className: 'col grow' },
        panel('Begin',
          sanctumToggle,
          el('div', { className: 'col gap-sm mt' },
            button('Descend', () => {
              sfx.descend();
              createRun(selected, { fromSanctum: startFromSanctum });
              go('adventure');
            }, { className: 'btn--primary btn--center', sub: 'Enter the sewers' }),
            button('Back', () => go('menu'), { className: 'btn--ghost btn--center' }))),
        panel('Reminders',
          statRow('Questions available', questionPool().length),
          statRow('Active subjects', enabledSubjects().length),
          statRow('Boss every', '10 floors'),
          el('p', { className: 'tiny dim mt', text:
            'Answer correctly to attack. Answer wrongly and the enemy attacks you. Partially correct short answers still land a weakened hit.' })))),
  );

  return { node };
}
