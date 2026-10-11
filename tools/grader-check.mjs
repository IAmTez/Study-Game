/* Regression check for short-answer grading.

   Every built-in short-answer question is graded against answers that must
   NOT score — empty, gibberish, filler, the question typed back, and another
   question's model answer — and against its own model answer, which must.

   Also lints the banks: a synonym group whose every term appears in the
   prompt is dropped at runtime, which silently makes the question easier,
   so those are reported for fixing.

   Run: node tools/grader-check.mjs        (exits 1 on any failure) */

import { builtinSubjects } from '../js/data/questions/index.js';
import { gradeShortAnswer, gradableGroups, wordMatches } from '../js/game/grading.js';

const questions = builtinSubjects().flatMap(s => s.questions).filter(q => q.type === 'short');
const failures = [];
const fail = (msg) => failures.push(msg);

/* --- unit checks on word matching --- */
const unit = [
  ['also', 'so', false], ['person', 'son', false], ['something', 'so', false],
  ['said', 'ai', false], ['ship', 'ip', false], ['ai', 'ai', true], ['taxes', 'tax', true],
  ['gentrification', 'gentrif', true], ['gentrifcation', 'gentrif', true],
  ['transformed', 'transforming', false], ['interest', 'internal', false],
  ['costs', 'cost', true], ['recieve', 'receive', true], ['control', 'contract', false],
];
for (const [word, term, want] of unit) {
  if (wordMatches(word, term) !== want) fail(`wordMatches("${word}", "${term}") should be ${want}`);
}

/* --- answers that must never score --- */
const junk = {
  empty: '',
  gibberish: 'asdf qwerty zxcv lorem',
  filler: 'I am not sure, maybe it is something else entirely, also I do not know',
};

let parrotPartial = 0;
for (const q of questions) {
  for (const [label, text] of Object.entries(junk)) {
    const r = gradeShortAnswer(q, text);
    if (r.verdict !== 'wrong') fail(`${q.id}: ${label} answer scored ${r.verdict} via ${JSON.stringify(r.matched)}`);
  }

  const parrot = gradeShortAnswer(q, q.prompt);
  if (parrot.verdict === 'correct') fail(`${q.id}: typing the prompt back scored correct via ${JSON.stringify(parrot.matched)}`);
  if (parrot.verdict === 'partial') parrotPartial++;

  /* The model answer must be credited, both verbatim and when the keyword
     pass alone has to carry it (a slightly reworded version). */
  for (const model of q.accept || []) {
    if (gradeShortAnswer(q, model).verdict !== 'correct') fail(`${q.id}: its own model answer is not credited`);
    const reworded = `I think that ${model} overall`;
    const r = gradeShortAnswer(q, reworded);
    if (r.verdict !== 'correct') {
      fail(`${q.id}: reworded model answer scored ${r.verdict}; missing ${JSON.stringify(r.missed)}`);
    }
  }

  /* Lint: groups lost to prompt echo. */
  const before = (q.keywords || []).length;
  const after = gradableGroups(q).length;
  if (after < before) fail(`${q.id}: ${before - after} keyword group(s) consist only of words in the prompt`);
  if (after && (q.minKeywords || 1) > after) fail(`${q.id}: minKeywords ${q.minKeywords} exceeds ${after} gradable groups`);
}

/* --- another question's model answer should rarely be fully correct --- */
let crossCorrect = 0;
let crossTotal = 0;
for (const q of questions) {
  for (const other of questions) {
    if (other === q || other.subjectId !== q.subjectId || !other.accept?.[0]) continue;
    crossTotal++;
    if (gradeShortAnswer(q, other.accept[0]).verdict === 'correct') crossCorrect++;
  }
}
const crossRate = crossCorrect / Math.max(1, crossTotal);
if (crossRate > 0.035) fail(`answers to OTHER questions in the same subject were marked correct ${(crossRate * 100).toFixed(1)}% of the time`);

console.log(`${questions.length} short-answer questions checked`);
console.log(`  prompt typed back: 0 correct, ${parrotPartial} partial`);
console.log(`  other questions' answers marked correct: ${crossCorrect}/${crossTotal} (${(crossRate * 100).toFixed(1)}%)`);
if (failures.length) {
  console.log(`\n${failures.length} failure(s):`);
  failures.forEach(f => console.log('  ✗', f));
  process.exit(1);
}
console.log('  all checks passed');
