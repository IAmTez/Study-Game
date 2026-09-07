/* Combat view. Renders the current phase of the combat state machine and
   plays back the events each action produces. */

import {
  el, panel, button, bar, toast, modal, closeModal, itemIcon, rarityClass, isModalOpen,
  setChildren
} from './dom.js';
import { go } from './screens.js';
import { spriteElement } from '../art/render.js';
import { gradingFeedback, VERDICT } from '../game/grading.js';
import {
  PHASE, startCombat, selectQuestion, submitAnswer, continueFromResult,
  availableAbilities, useAbility, useItemInCombat, useHintOn, drainEvents, statusInfo
} from '../game/combat.js';
import { game, derived, inventoryEntries, countItem, saveRun, saveMeta, endRun, logLine } from '../game/state.js';
import { removeEnemy } from '../game/floors.js';
import { getItem } from '../data/items.js';
import { sfx } from '../core/audio.js';

const DIFFICULTY_LABEL = ['', 'Recall', 'Basic', 'Applied', 'Analysis', 'Evaluation'];

export function combatScreen({ enemy }) {
  const run = game.run;
  if (!run || !enemy) { go('dungeon'); return {}; }

  const combat = startCombat(run, enemy);

  const stage = el('div', { className: 'combat-stage' });
  const playerBox = el('div', { className: 'fighter' });
  const enemyBox = el('div', { className: 'fighter' });
  const main = el('div', { className: 'col gap-sm grow' });
  const sidebar = el('div', { className: 'col gap-sm', style: { width: '270px', flex: '0 0 270px' } });

  /* ------------------------------------------------------------
     Stage
     ------------------------------------------------------------ */

  function renderStage() {
    const stats = derived(run);
    setChildren(playerBox, 
      spriteElement(stats.role.sprite, 5),
      el('div', { className: 'fighter-name', text: `${stats.role.name} · Lv ${run.level}` }),
      bar('hp', run.hp, stats.maxHp, `${Math.ceil(run.hp)} / ${stats.maxHp}`),
      el('div', { className: 'mt' }, bar('energy', run.energy, 120, `Energy ${Math.floor(run.energy)}`)),
      statusRow(combat.playerStatuses));

    setChildren(enemyBox, 
      spriteElement(enemy.sprite, enemy.isBoss ? 6 : 5, { flip: true }),
      el('div', { className: `fighter-name ${enemy.isBoss ? 'gold' : ''}`, text: enemy.name }),
      bar('enemy', enemy.hp, enemy.maxHp, `${Math.ceil(enemy.hp)} / ${enemy.maxHp}`),
      el('div', { className: 'tiny dim mt', text: (enemy.traits || []).join(' · ') || 'no special traits' }),
      statusRow(enemy.statuses));

    if (!stage.contains(playerBox)) setChildren(stage, playerBox, enemyBox);
  }

  function statusRow(statuses) {
    const entries = Object.entries(statuses || {}).filter(([, turns]) => turns > 0);
    if (!entries.length) return el('div', { className: 'tiny dim mt', text: ' ' });
    return el('div', { className: 'row gap-sm wrap mt center-x' },
      ...entries.map(([id, turns]) => {
        const info = statusInfo(id);
        return el('span', { className: 'pill', style: { color: info.colour }, text: `${info.name} ${turns}` });
      }));
  }

  function floater(target, text, colour) {
    const node = el('div', { className: 'floater', text, style: { color: colour } });
    const rect = target.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    node.style.left = `${rect.left - stageRect.left + rect.width / 2 - 20}px`;
    node.style.top = `${rect.top - stageRect.top + 30}px`;
    stage.appendChild(node);
    setTimeout(() => node.remove(), 1000);
  }

  function playEvents() {
    for (const event of drainEvents(combat)) {
      switch (event.type) {
        case 'attack': {
          const attacker = event.side === 'player' ? playerBox : enemyBox;
          const victim = event.side === 'player' ? enemyBox : playerBox;
          attacker.classList.add(event.side === 'player' ? 'fighter--attack' : 'fighter--attack-left');
          victim.classList.add('fighter--hit');
          setTimeout(() => {
            attacker.classList.remove('fighter--attack', 'fighter--attack-left');
            victim.classList.remove('fighter--hit');
          }, 320);
          floater(victim, `-${event.amount}${event.crit ? '!' : ''}`, event.crit ? 'var(--gold)' : 'var(--blood)');
          event.crit ? sfx.crit() : (event.side === 'player' ? sfx.hit() : sfx.hurt());
          break;
        }
        case 'heal':
          floater(event.side === 'player' ? playerBox : enemyBox, `+${event.amount}`, 'var(--slime)');
          if (event.side === 'player') sfx.heal();
          break;
        case 'energy':
          floater(playerBox, `+${event.amount} EN`, 'var(--energy)');
          break;
        case 'status-tick':
          floater(event.side === 'player' ? playerBox : enemyBox, `-${event.amount}`, statusInfo(event.status).colour);
          break;
        case 'blocked':
          floater(playerBox, 'BLOCK', 'var(--rar-rare)');
          break;
        case 'revive':
          floater(playerBox, 'REVIVED', 'var(--gold)');
          toast(`${event.item} saves you.`, 'gold');
          sfx.levelUp();
          break;
        case 'victory': sfx.loot(); break;
        case 'defeat': sfx.death(); break;
        default: break;
      }
    }
  }

  /* ------------------------------------------------------------
     Phases
     ------------------------------------------------------------ */

  function renderQuestionChoice() {
    if (!combat.choices.length) { renderAction(); return; }
    setChildren(main, panel('Choose your question',
      el('p', { className: 'small dim mb', text:
        'Harder questions bank more energy and hit harder. Get it wrong and the enemy strikes instead.' }),
      el('div', { className: 'q-choices' }, ...combat.choices.map((choice, index) => {
        const q = choice.question;
        return el('button', { className: 'q-card', type: 'button', onClick: () => {
          sfx.select();
          selectQuestion(run, combat, index);
          render();
        } },
          el('div', { className: 'q-card-subject', style: { color: q.subjectColour }, text: q.subjectName }),
          el('div', { className: 'q-card-topic', text: q.topic }),
          el('div', { className: 'q-card-meta' },
            el('span', { className: 'dim', text: `${DIFFICULTY_LABEL[choice.offeredTier]} · T${choice.offeredTier}` }),
            el('span', { className: 'gold', text: `+${choice.energy} EN` })),
          el('div', { className: 'tiny dim', text: q.type === 'mc' ? 'Multiple choice' : 'Short answer' }));
      }))));
  }

  function renderAnswering() {
    const q = combat.current.question;
    const eliminated = combat.hint?.type === 'eliminate' ? new Set(combat.hint.indices) : new Set();

    const body = el('div', { className: 'col gap-sm' },
      el('div', { className: 'row between small' },
        el('span', { style: { color: q.subjectColour }, text: `${q.subjectName} — ${q.topic}` }),
        el('span', { className: 'dim', text: `${DIFFICULTY_LABEL[q.difficulty]} (tier ${q.difficulty})` })),
      el('div', { className: 'q-prompt', text: q.prompt }),
      combat.hint?.type === 'reveal' && el('div', { className: 'explain', text: `Answer: ${combat.hint.text}` }),
      combat.hint?.type === 'keyword' && el('div', { className: 'explain', text: combat.hint.text }));

    if (q.type === 'mc') {
      // The Scholar's Insight passive strikes out one wrong option for free.
      if (derived(run).role.id === 'scholar' && !eliminated.size) {
        const wrong = q.options.map((_, i) => i).filter(i => i !== q.answer);
        if (wrong.length) eliminated.add(wrong[(run.floor + combat.turn) % wrong.length]);
      }
      body.appendChild(el('div', { className: 'opt-list' },
        ...q.options.map((option, index) => el('button', {
          className: `opt ${eliminated.has(index) ? 'opt--gone' : ''}`,
          type: 'button',
          disabled: eliminated.has(index),
          onClick: () => answer(index)
        },
          el('span', { className: 'opt-key', text: String.fromCharCode(65 + index) }),
          el('span', { text: option })))));
    } else {
      const input = el('textarea', {
        className: 'short-input',
        placeholder: 'Write your answer. Key ideas matter more than exact wording.',
        onKeyDown: (event) => {
          if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); answer(input.value); }
        }
      });
      body.appendChild(input);
      body.appendChild(el('div', { className: 'row between center-y' },
        el('span', { className: 'tiny dim', text: 'Ctrl+Enter to submit' }),
        button('Submit answer', () => answer(input.value), { className: 'btn--primary btn--inline btn--center' })));
      setTimeout(() => input.focus(), 30);
    }

    setChildren(main, panel('Answer to act', body));
  }

  function answer(response) {
    const result = submitAnswer(run, combat, response);
    if (!result) return;
    result.verdict === VERDICT.WRONG ? sfx.wrong() : sfx.correct();
    saveMeta();
    render();
  }

  function renderResult() {
    const q = combat.current.question;
    const result = combat.result;
    const verdictLabel = result.verdict === VERDICT.CORRECT ? 'Correct'
      : result.verdict === VERDICT.PARTIAL ? 'Partially correct' : 'Incorrect';
    const verdictClass = result.verdict === VERDICT.CORRECT ? 'good'
      : result.verdict === VERDICT.PARTIAL ? 'gold' : 'bad';

    const body = el('div', { className: 'col gap-sm' },
      el('div', { className: `${verdictClass}`, text: verdictLabel }),
      el('div', { className: 'q-prompt', text: q.prompt }));

    if (q.type === 'mc') {
      const chosen = combat.response;
      body.appendChild(el('div', { className: 'opt-list' },
        ...q.options.map((option, index) => el('div', {
          className: `opt ${index === q.answer ? 'opt--correct'
            : index === chosen ? 'opt--wrong' : ''}`
        },
          el('span', { className: 'opt-key', text: String.fromCharCode(65 + index) }),
          el('span', { text: option }),
          index === chosen && index !== q.answer
            ? el('span', { className: 'tiny', text: '← your answer' })
            : null))));
    } else {
      body.appendChild(el('div', { className: 'small dim', text: `You wrote: ${combat.response || '(nothing)'}` }));
      const feedback = gradingFeedback(q, result);
      if (feedback) body.appendChild(el('div', { className: 'small', text: feedback }));
    }

    if (game.settings.showExplanations) {
      body.appendChild(el('div', { className: 'explain' },
        el('b', { text: 'Why: ' }), q.explanation));
    }

    const continueButton = button(
      combat.nextPhase === PHASE.ACTION ? 'Choose your attack' : 'Brace for the counterattack',
      () => {
        const outcome = continueFromResult(run, combat);
        playEvents();
        saveRun();
        if (outcome.kind === 'defeat') { renderDefeat(); return; }
        if (outcome.kind === 'victory') { renderVictory(); return; }
        render();
      },
      { className: 'btn--primary btn--center mt' });
    body.appendChild(continueButton);

    setChildren(main, panel('Result', body));
    // A long explanation can push the continue button below the fold.
    requestAnimationFrame(() => continueButton.scrollIntoView({ block: 'nearest' }));
  }

  function renderAction() {
    const entries = availableAbilities(run);
    const body = el('div', { className: 'col gap-sm' },
      el('p', { className: 'small dim', text:
        'Energy banks up as you answer. Spend it on stronger moves, or Brace to save it for something bigger.' }),
      ...entries.map(entry => {
        const ability = entry.ability;
        const cost = ability.cost ? `${ability.cost} energy` : 'free';
        return button(ability.name, () => {
          if (!entry.usable) return;
          sfx.confirm();
          const outcome = useAbility(run, combat, ability.id);
          playEvents();
          saveRun();
          if (!outcome) return;
          if (outcome.kind === 'victory') { renderVictory(); return; }
          if (outcome.kind === 'defeat') { renderDefeat(); return; }
          render();
        }, {
          className: entry.usable ? (ability.cost >= 40 ? 'btn--gold' : 'btn--primary') : '',
          disabled: !entry.usable,
          sub: entry.reason ? `${entry.reason} — ${ability.desc}` : `${cost} · ${ability.desc}`
        });
      }));
    setChildren(main, panel('Your move', body));
  }

  function renderVictory() {
    const rewards = combat.rewards || { xp: { gained: 0, levelsGained: [] }, drops: [] };
    removeEnemy(run, enemy);
    saveMeta();
    saveRun();

    const body = el('div', { className: 'col gap-sm' },
      el('div', { className: 'gold', text: `${enemy.name} is destroyed.` }),
      el('div', { className: 'small', text: `+${rewards.xp.gained} XP` }),
      ...rewards.xp.levelsGained.map(level =>
        el('div', { className: 'good small', text: `Level up — you are now level ${level}. Health restored.` })),
      rewards.drops.length
        ? el('div', { className: 'col gap-sm mt' },
            el('div', { className: 'small dim', text: 'Dropped:' }),
            ...rewards.drops.map(drop => el('div', { className: 'row center-y gap-sm' },
              itemIcon(drop.item, 2),
              el('div', {},
                el('div', { className: rarityClass(drop.item), text: `${drop.item.name}${drop.count > 1 ? ` x${drop.count}` : ''}` }),
                el('div', { className: 'tiny dim', text: drop.item.desc })))))
        : el('div', { className: 'small dim mt', text: 'It dropped nothing worth carrying.' }),
      button('Back to the tunnels', () => go('dungeon'), { className: 'btn--primary btn--center mt' }));

    if (rewards.xp.levelsGained.length) sfx.levelUp();
    setChildren(main, panel('Victory', body));
    renderSidebar();
    renderStage();
  }

  function renderDefeat() {
    const floor = run.floor;
    const kills = run.kills;
    game.meta.deepestFloor = Math.max(game.meta.deepestFloor, floor);
    endRun({ died: true });
    saveMeta();

    setChildren(main, panel('You died',
      el('div', { className: 'col gap-sm' },
        el('div', { className: 'bad', text: `${enemy.name} finished you on floor ${floor}.` }),
        el('div', { className: 'small dim', text: `${kills} enemies felled this run. A quarter of your crafting materials were carried back to the surface.` }),
        game.meta.sanctum > 0
          ? el('div', { className: 'small good', text: `Your sanctum holds at floor ${game.meta.sanctum}. Your next run can start from floor ${game.meta.sanctum + 1}.` })
          : el('div', { className: 'small dim', text: 'Clear a boss floor to establish a sanctum you can restart from.' }),
        button('Return to the surface', () => go('menu'), { className: 'btn--primary btn--center mt' }))));
    setChildren(sidebar);
  }

  /* ------------------------------------------------------------
     Sidebar — items usable right now
     ------------------------------------------------------------ */

  function renderSidebar() {
    const usable = inventoryEntries(run, 'consumable').filter(({ item }) => !item.passive);
    const questionOpen = combat.phase === PHASE.ANSWERING;

    const buttons = usable.map(({ item, count }) => {
      const isHint = !!item.inQuestion;
      const allowed = isHint ? questionOpen : combat.phase === PHASE.ACTION;
      return button(`${item.name} x${count}`, () => {
        if (!allowed) return;
        sfx.confirm();
        const outcome = isHint
          ? useHintOn(run, combat, item.id)
          : useItemInCombat(run, combat, item.id);
        playEvents();
        saveRun();
        if (outcome?.kind === 'victory') { renderVictory(); return; }
        if (outcome?.kind === 'defeat') { renderDefeat(); return; }
        render();
      }, {
        className: 'btn--sm',
        disabled: !allowed,
        sub: allowed ? item.desc : (isHint ? 'Only while a question is open' : 'Only when choosing your move')
      });
    });

    const passives = inventoryEntries(run, 'consumable').filter(({ item }) => item.passive);

    setChildren(sidebar, 
      panel('Items',
        buttons.length ? el('div', { className: 'col gap-sm' }, ...buttons)
          : el('p', { className: 'small dim', text: 'No usable items.' })),
      passives.length ? panel('Held in reserve',
        ...passives.map(({ item, count }) => el('div', { className: 'small' },
          el('span', { className: rarityClass(item), text: `${item.name} x${count}` }),
          el('div', { className: 'tiny dim', text: item.desc })))) : null,
      panel('Enemy',
        el('p', { className: 'small dim', text: enemy.flavour || '' }),
        el('div', { className: 'tiny dim mt', text: `ATK ${enemy.atk} · DEF ${enemy.def} · worth ${enemy.xp} XP` })),
    );
  }

  /* ------------------------------------------------------------
     Render
     ------------------------------------------------------------ */

  function render() {
    renderStage();
    renderSidebar();
    switch (combat.phase) {
      case PHASE.QUESTION: renderQuestionChoice(); break;
      case PHASE.ANSWERING: renderAnswering(); break;
      case PHASE.RESULT: renderResult(); break;
      case PHASE.ACTION: renderAction(); break;
      case PHASE.VICTORY: renderVictory(); break;
      case PHASE.DEFEAT: renderDefeat(); break;
      default: renderQuestionChoice();
    }
  }

  const node = el('div', { className: 'screen col gap-sm' },
    stage,
    el('div', { className: 'row gap-sm grow', style: { minHeight: '0' } },
      el('div', { className: 'grow screen-scroll' }, main),
      el('div', { className: 'screen-scroll', style: { flex: '0 0 270px' } }, sidebar)));

  return {
    node,
    mount() {
      if (enemy.isBoss) sfx.boss();
      render();
    },
    unmount() { saveRun(); saveMeta(); }
  };
}
