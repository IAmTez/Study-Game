/* Offline answer grading.

   Multiple choice is exact. Short answer is graded in two passes:
     1. fuzzy match against the `accept` model answers (tolerates typos)
     2. synonym-group keyword matching, which is what most answers hit

   Keyword matching works on whole words. A term only ever matches a word the
   player actually typed — equal to it, extending it (a stem like "gentrif"
   matches "gentrification"), or one typo away from a long word. It never
   matches letters buried inside another word: "so" is not found in "also".

   A keyword the question itself contains is ignored, so typing the prompt
   back scores nothing. If that leaves a synonym group empty, the group is
   dropped rather than becoming impossible to satisfy.

   Falling short of `minKeywords` but reaching at least half of it scores a
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
    .replace(/'/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokens(text) {
  return normalise(text).split(' ').filter(w => w && !FILLER.has(w));
}

/** Every word, filler included — phrases like "rather than" need them. */
function words(text) {
  const n = normalise(text);
  return n ? n.split(' ') : [];
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

/**
 * Edit distance that also counts a swap of two adjacent letters as one edit
 * (optimal string alignment), since "recieve" is the commonest kind of typo.
 */
function typoDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d = Array.from({ length: rows }, (_, i) => {
    const row = new Array(cols).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j < cols; j++) d[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

/**
 * Does the typed word `word` satisfy the keyword `term`?
 *
 * Short terms (three letters or fewer — "ai", "tax", "law") must match
 * exactly or as a plain plural, because as prefixes they would swallow
 * unrelated words. Longer terms also match as a prefix, which is how the
 * banks write stems. Long terms tolerate one typo (two from nine letters).
 */
export function wordMatches(word, term) {
  if (!word || !term) return false;
  if (word === term) return true;
  if (term.length <= 3) return word === `${term}s` || word === `${term}es`;
  if (word.startsWith(term)) return true;
  if (term.length >= 6 && word.length >= 5) {
    const tolerance = term.length >= 9 ? 2 : 1;
    if (Math.abs(word.length - term.length) <= tolerance && typoDistance(word, term) <= tolerance) return true;
    // A typo inside a stem: "gentrifcation" against "gentrif".
    if (word.length > term.length && typoDistance(word.slice(0, term.length), term) <= 1) return true;
  }
  return false;
}

/**
 * Find `term` (one or more words) in the word list. Returns the index of the
 * first matching word, or -1. Multi-word terms must appear as a contiguous
 * run; only the final word may be extended ("which mean" finds "which means").
 */
function findTerm(termWords, answerWords, used) {
  const n = termWords.length;
  for (let i = 0; i + n <= answerWords.length; i++) {
    let ok = true;
    for (let k = 0; k < n; k++) {
      if (used.has(i + k)) { ok = false; break; }
      const w = answerWords[i + k];
      const t = termWords[k];
      const isLast = k === n - 1;
      if (n === 1 ? !wordMatches(w, t) : !(w === t || (isLast && t.length >= 4 && w.startsWith(t)))) {
        ok = false;
        break;
      }
    }
    if (ok) return i;
  }
  return -1;
}

/** True when the question's own wording would satisfy this term. */
function echoedByPrompt(termWords, promptWords) {
  return findTerm(termWords, promptWords, new Set()) >= 0;
}

/**
 * The synonym groups that can actually be graded for this question: each
 * term normalised, terms the prompt already contains removed, and any group
 * left empty dropped.
 */
export function gradableGroups(question) {
  const promptWords = words(question.prompt);
  const groups = [];
  for (const group of question.keywords || []) {
    const list = (Array.isArray(group) ? group : [group])
      .map(term => ({ label: String(term).trim(), words: words(term) }))
      .filter(term => term.words.length && !echoedByPrompt(term.words, promptWords));
    if (list.length) groups.push(list);
  }
  return groups;
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
  const answerWords = words(response);
  const groups = gradableGroups(question);
  const labelOf = group => group[0].label;

  if (answerText.length < 2 || !tokens(response).length) {
    return { verdict: VERDICT.WRONG, matched: [], missed: groups.map(labelOf), reason: 'empty' };
  }

  // Pass 1 — whole-answer fuzzy match against model answers. The answer must
  // be close in length too, so a short fragment never "nearly" matches.
  for (const model of question.accept || []) {
    const target = normalise(model);
    if (!target) continue;
    if (answerText.length < target.length * 0.75) continue;
    const tolerance = Math.max(2, Math.floor(target.length * 0.15));
    if (levenshtein(answerText, target) <= tolerance) {
      return { verdict: VERDICT.CORRECT, matched: [], missed: [], reason: 'accept' };
    }
  }

  // Pass 2 — synonym-group keyword matching. Each typed word can count
  // towards one group only.
  if (!groups.length) {
    return { verdict: VERDICT.WRONG, matched: [], missed: [], reason: 'no-keywords' };
  }

  const used = new Set();
  const matched = [];
  const missed = [];
  for (const group of groups) {
    let hit = null;
    for (const term of group) {
      const at = findTerm(term.words, answerWords, used);
      if (at >= 0) {
        for (let k = 0; k < term.words.length; k++) used.add(at + k);
        hit = { idea: labelOf(group), typed: answerWords.slice(at, at + term.words.length).join(' ') };
        break;
      }
    }
    if (hit) matched.push(hit);
    else missed.push(labelOf(group));
  }

  const required = Math.max(1, Math.min(question.minKeywords || 1, groups.length));
  let verdict = VERDICT.WRONG;
  if (matched.length >= required) verdict = VERDICT.CORRECT;
  else if (required > 1 && matched.length >= Math.ceil(required / 2)) verdict = VERDICT.PARTIAL;

  return { verdict, matched, missed, required, reason: 'keywords' };
}

export function gradeAnswer(question, response) {
  return question.type === 'short'
    ? gradeShortAnswer(question, response)
    : gradeMultipleChoice(question, response);
}

/**
 * Text shown under the explanation, telling the player what the grader saw.
 * It quotes the words the player actually typed, so a match can always be
 * checked against the answer rather than taken on trust.
 */
export function gradingFeedback(question, result) {
  if (question.type !== 'short') return '';
  if (result.reason === 'accept') return 'Your answer matches the model answer.';
  if (result.reason === 'empty') return 'No answer was given.';
  if (!result.matched?.length) {
    return `None of the key ideas appeared in your answer. It was looking for: ${(result.missed || []).join(', ')}.`;
  }
  const found = result.matched.map(m => (m.typed === m.idea ? `"${m.typed}"` : `"${m.typed}" (${m.idea})`));
  const parts = [`Credited: ${found.join(', ')}.`];
  if (result.missed?.length) parts.push(`Not found: ${result.missed.join(', ')}.`);
  if (result.verdict !== VERDICT.CORRECT) {
    parts.push(`Full credit needs ${result.required} of ${result.matched.length + result.missed.length}.`);
  }
  return parts.join(' ');
}
