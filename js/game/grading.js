/* Offline answer grading.

   Multiple choice is exact. Short answer is graded in two passes:
     1. fuzzy match against the `accept` model answers (tolerates typos)
     2. synonym-group keyword matching, which is what most answers hit
   Falling short of `minKeywords` but matching at least one group scores a
   partial — a weakened attack rather than a wasted turn. */

export const VERDICT = { CORRECT: 'correct', PARTIAL: 'partial', WRONG: 'wrong' };

const FILLER = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'of', 'to',
  'in', 'on', 'at', 'for', 'with', 'and', 'or', 'but', 'that', 'this', 'it', 'its',
  'as', 'by', 'from', 'they', 'their', 'them', 'which', 'who', 'can', 'will',
]);

export function normalise(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokens(text) {
  return normalise(text).split(' ').filter(w => w && !FILLER.has(w));
}

/** Standard Levenshtein distance, iterative two-row form. */
export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = new Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr.slice();
  }
  return prev[b.length];
}

/** True when `a` and `b` are the same word allowing for a typo or a suffix. */
function fuzzyEqual(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 3) return false;
  // Treat a shared stem of 5+ characters as a match (erode / eroded / erosion).
  const stem = Math.min(a.length, b.length);
  if (stem >= 5 && a.slice(0, 5) === b.slice(0, 5)) return true;
  const tolerance = a.length <= 4 ? 0 : a.length <= 7 ? 1 : 2;
  return levenshtein(a, b) <= tolerance;
}

/** Does `phrase` (one or more words) appear in the answer? */
function phraseMatches(phrase, answerText, answerTokens) {
  const needle = normalise(phrase);
  if (!needle) return false;
  if (answerText.includes(needle)) return true;
  const parts = needle.split(' ');
  if (parts.length > 1) {
    // Multi-word synonyms must appear contiguously; the direct includes above
    // already covers that, so anything reaching here has not matched.
    return false;
  }
  return answerTokens.some(word => fuzzyEqual(word, needle));
}

export function gradeMultipleChoice(question, chosenIndex) {
  const correct = chosenIndex === question.answer;
  return {
    verdict: correct ? VERDICT.CORRECT : VERDICT.WRONG,
    correctIndex: question.answer,
    matched: [],
    missed: []
  };
}

export function gradeShortAnswer(question, response) {
  const answerText = normalise(response);
  const answerTokens = tokens(response);

  if (answerText.length < 2) {
    return { verdict: VERDICT.WRONG, matched: [], missed: question.keywords || [], reason: 'empty' };
  }

  // Pass 1 — whole-answer fuzzy match against model answers.
  for (const model of question.accept || []) {
    const target = normalise(model);
    if (!target) continue;
    const tolerance = Math.max(2, Math.floor(target.length * 0.18));
    if (levenshtein(answerText, target) <= tolerance) {
      return { verdict: VERDICT.CORRECT, matched: ['model answer'], missed: [], reason: 'accept' };
    }
  }

  // Pass 2 — synonym-group keyword matching.
  const groups = question.keywords || [];
  if (!groups.length) {
    return { verdict: VERDICT.WRONG, matched: [], missed: [], reason: 'no-keywords' };
  }

  const matched = [];
  const missed = [];
  for (const group of groups) {
    const list = Array.isArray(group) ? group : [group];
    const hit = list.find(term => phraseMatches(term, answerText, answerTokens));
    if (hit) matched.push(list[0]);
    else missed.push(list[0]);
  }

  const required = Math.max(1, Math.min(question.minKeywords || 1, groups.length));
  let verdict = VERDICT.WRONG;
  if (matched.length >= required) verdict = VERDICT.CORRECT;
  else if (matched.length >= 1) verdict = VERDICT.PARTIAL;

  return { verdict, matched, missed, required, reason: 'keywords' };
}

export function gradeAnswer(question, response) {
  return question.type === 'short'
    ? gradeShortAnswer(question, response)
    : gradeMultipleChoice(question, response);
}

/** Text shown under the explanation, telling the player what the grader saw. */
export function gradingFeedback(question, result) {
  if (question.type !== 'short') return '';
  if (result.reason === 'accept') return 'Matched the model answer.';
  if (!result.matched?.length) {
    return `No key ideas detected. Looking for: ${(result.missed || []).join(', ')}.`;
  }
  const parts = [`Key ideas found: ${result.matched.join(', ')}.`];
  if (result.missed?.length) parts.push(`Missing: ${result.missed.join(', ')}.`);
  if (result.verdict === VERDICT.PARTIAL) {
    parts.push(`Needed ${result.required} of ${(result.matched.length + result.missed.length)} to score full credit.`);
  }
  return parts.join(' ');
}
