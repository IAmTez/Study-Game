/* Turns arbitrary study material into playable questions.

   Handles four shapes, in order of confidence:
     1. JSON — an explicit question array, used as-is
     2. CSV/TSV — a header row naming question/answer/option columns
     3. Q&A prose — "Q: ... A: ..." or "1. ... Answer: b"
     4. Flashcards — "term - definition" lines, the most common case
   Flashcards become short-answer questions, or multiple choice once there are
   enough cards to supply plausible distractors. */

import { makeRng } from '../core/rng.js';

const FILLER = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'of', 'to', 'in',
  'on', 'at', 'for', 'with', 'and', 'or', 'but', 'that', 'this', 'it', 'its',
  'as', 'by', 'from', 'they', 'their', 'them', 'which', 'who', 'can', 'will',
  'when', 'where', 'what', 'how', 'why', 'you', 'your', 'has', 'have', 'had',
  'not', 'all', 'more', 'than', 'also', 'into', 'such', 'these', 'those',
]);

let idCounter = 0;
const nextId = (prefix) => `${prefix}-${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

/* ---------------------------------------------------------------
   Keyword extraction for short-answer grading
   --------------------------------------------------------------- */

/** Pull the load-bearing words out of a definition and group them for grading. */
export function deriveKeywords(answer, limit = 4) {
  const words = String(answer || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !FILLER.has(w));

  const seen = new Set();
  const unique = [];
  for (const word of words) {
    const stem = word.slice(0, 6);
    if (seen.has(stem)) continue;
    seen.add(stem);
    unique.push(word);
  }

  // Longer words carry more meaning than short connective ones.
  const ranked = unique.sort((a, b) => b.length - a.length).slice(0, limit);
  return ranked.map(word => {
    const group = [word];
    if (word.endsWith('s') && word.length > 4) group.push(word.slice(0, -1));
    if (word.endsWith('ing') && word.length > 6) group.push(word.slice(0, -3));
    if (word.endsWith('ed') && word.length > 5) group.push(word.slice(0, -2));
    return group;
  });
}

/* ---------------------------------------------------------------
   Format detection and parsing
   --------------------------------------------------------------- */

function tryJson(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) return null;
  let data;
  try { data = JSON.parse(trimmed); } catch { return null; }
  const list = Array.isArray(data) ? data
    : Array.isArray(data.questions) ? data.questions
    : Array.isArray(data.cards) ? data.cards
    : null;
  if (!list?.length) return null;

  const questions = [];
  const cards = [];
  for (const raw of list) {
    if (!raw || typeof raw !== 'object') continue;
    const prompt = raw.prompt || raw.question || raw.front || raw.term;
    if (!prompt) continue;
    if (Array.isArray(raw.options) && raw.options.length >= 2) {
      let answerIndex = 0;
      if (Number.isInteger(raw.answer)) answerIndex = raw.answer;
      else if (typeof raw.answer === 'string') {
        const found = raw.options.findIndex(o => String(o).trim().toLowerCase() === raw.answer.trim().toLowerCase());
        answerIndex = found >= 0 ? found : 0;
      }
      questions.push({
        id: raw.id || nextId('imp'),
        type: 'mc',
        topic: raw.topic || 'Imported',
        difficulty: raw.difficulty || 2,
        prompt: String(prompt),
        options: raw.options.map(String),
        answer: Math.max(0, Math.min(raw.options.length - 1, answerIndex)),
        explanation: raw.explanation || raw.note || ''
      });
    } else {
      const back = raw.answer ?? raw.back ?? raw.definition;
      if (back == null) continue;
      cards.push({ front: String(prompt), back: String(back), topic: raw.topic, difficulty: raw.difficulty });
    }
  }
  return questions.length || cards.length ? { questions, cards, format: 'json' } : null;
}

function splitDelimited(line, delimiter) {
  // Minimal CSV field splitter with quote support.
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === delimiter && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields.map(f => f.trim());
}

function tryDelimited(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return null;

  const delimiter = (lines[0].match(/\t/g) || []).length >= 1 ? '\t' : ',';
  const header = splitDelimited(lines[0], delimiter).map(h => h.toLowerCase());

  // The delimiter has to actually be doing something. Without this guard a
  // plain flashcard file whose first line happens to contain a word like
  // "definition" is mistaken for a headed CSV with one column.
  if (header.length < 2) return null;
  const columnCounts = lines.slice(1, 12).map(l => splitDelimited(l, delimiter).length);
  if (columnCounts.length && !columnCounts.some(c => c >= 2)) return null;

  const hasHeader = header.some(h => /question|prompt|term|front|answer|back|definition/.test(h));

  const index = (...names) => header.findIndex(h => names.some(n => h === n || h.includes(n)));
  const qCol = hasHeader ? index('question', 'prompt', 'term', 'front') : 0;
  const aCol = hasHeader ? index('answer', 'back', 'definition') : 1;
  if (hasHeader && (qCol < 0 || aCol < 0 || qCol === aCol)) return null;

  const optionCols = hasHeader
    ? header.map((h, i) => (/^option|^choice|^[abcd]$/.test(h) ? i : -1)).filter(i => i >= 0)
    : [];
  const topicCol = hasHeader ? index('topic', 'category', 'unit') : -1;
  const diffCol = hasHeader ? index('difficulty', 'level') : -1;
  const explainCol = hasHeader ? index('explanation', 'note', 'notes') : -1;

  const body = hasHeader ? lines.slice(1) : lines;
  const questions = [];
  const cards = [];

  for (const line of body) {
    const fields = splitDelimited(line, delimiter);
    const prompt = fields[qCol];
    const answer = fields[aCol];
    if (!prompt || !answer) continue;

    const topic = topicCol >= 0 ? fields[topicCol] : undefined;
    const difficulty = diffCol >= 0 ? parseInt(fields[diffCol], 10) : undefined;
    const explanation = explainCol >= 0 ? fields[explainCol] : '';

    const options = optionCols.map(i => fields[i]).filter(Boolean);
    if (options.length >= 2) {
      let answerIndex = options.findIndex(o => o.toLowerCase() === answer.toLowerCase());
      if (answerIndex < 0) {
        // "b" or "2" style answers
        const letter = answer.trim().toLowerCase();
        if (/^[a-h]$/.test(letter)) answerIndex = letter.charCodeAt(0) - 97;
        else if (/^\d+$/.test(letter)) answerIndex = parseInt(letter, 10) - 1;
      }
      if (answerIndex >= 0 && answerIndex < options.length) {
        questions.push({
          id: nextId('imp'), type: 'mc', topic: topic || 'Imported',
          difficulty: difficulty || 2, prompt, options,
          answer: answerIndex, explanation
        });
        continue;
      }
    }
    cards.push({ front: prompt, back: answer, topic, difficulty, explanation });
  }

  return questions.length || cards.length ? { questions, cards, format: 'table' } : null;
}

function tryQandA(text) {
  const questions = [];
  const cards = [];

  /* "Q: ... A: ..." pairs, possibly spanning lines. */
  const qaPattern = /(?:^|\n)\s*(?:Q|Question)\s*[:.)-]\s*([\s\S]*?)\n\s*(?:A|Answer|Ans)\s*[:.)-]\s*([\s\S]*?)(?=\n\s*(?:Q|Question)\s*[:.)-]|$)/gi;
  let match;
  while ((match = qaPattern.exec(text)) !== null) {
    const prompt = match[1].trim().replace(/\s+/g, ' ');
    const rest = match[2].trim();
    if (!prompt || !rest) continue;
    cards.push({ front: prompt, back: rest.split('\n')[0].trim() });
  }

  /* Numbered questions with lettered options and an "Answer: b" line. */
  const blocks = text.split(/\n(?=\s*\d+[.)]\s)/);
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length < 3) continue;
    const promptMatch = lines[0].match(/^\d+[.)]\s*(.+)$/);
    if (!promptMatch) continue;

    const options = [];
    let answerLetter = null;
    for (const line of lines.slice(1)) {
      const optionMatch = line.match(/^\(?([a-hA-H])[.)]\s*(.+)$/);
      const answerMatch = line.match(/^(?:answer|ans|correct)\s*[:.-]?\s*\(?([a-hA-H0-9])/i);
      if (answerMatch) answerLetter = answerMatch[1].toLowerCase();
      else if (optionMatch) options.push(optionMatch[2].trim());
    }
    if (options.length >= 2 && answerLetter) {
      const index = /^\d$/.test(answerLetter)
        ? parseInt(answerLetter, 10) - 1
        : answerLetter.charCodeAt(0) - 97;
      if (index >= 0 && index < options.length) {
        questions.push({
          id: nextId('imp'), type: 'mc', topic: 'Imported', difficulty: 2,
          prompt: promptMatch[1].trim(), options, answer: index, explanation: ''
        });
      }
    }
  }

  return questions.length || cards.length ? { questions, cards, format: 'qa' } : null;
}

function tryFlashcards(text) {
  const cards = [];
  const separators = [/\s+[—–]\s+/, /\s+-\s+/, /\s*\t+\s*/, /\s*:\s+/, /\s*=\s*/];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim().replace(/^[-*•]\s*/, '');
    if (line.length < 5 || line.length > 400) continue;
    if (/^#{1,6}\s/.test(line)) continue;      // markdown heading

    for (const separator of separators) {
      const parts = line.split(separator);
      if (parts.length < 2) continue;
      const front = parts[0].trim();
      const back = parts.slice(1).join(' ').trim();
      if (front.length < 2 || back.length < 2) break;
      if (front.length > 160) break;
      cards.push({ front, back });
      break;
    }
  }

  return cards.length ? { questions: [], cards, format: 'flashcards' } : null;
}

/** Run every parser and take the first that produces usable content. */
export function parseStudyText(text) {
  const parsed = tryJson(text) || tryDelimited(text) || tryQandA(text) || tryFlashcards(text);
  if (!parsed) return { questions: [], cards: [], format: 'none' };
  return parsed;
}

/* ---------------------------------------------------------------
   Turning cards into questions
   --------------------------------------------------------------- */

function shortish(text) {
  return text.length <= 90 && !/[.;]\s/.test(text);
}

/**
 * Cards become multiple choice where there are enough short, similar answers
 * to build believable distractors; otherwise short answer with derived keywords.
 */
export function cardsToQuestions(cards, { preferMultipleChoice = true } = {}) {
  const questions = [];
  const mcPool = cards.filter(c => shortish(c.back));
  const canBuildMc = preferMultipleChoice && mcPool.length >= 4;

  cards.forEach((card, cardIndex) => {
    const topic = card.topic || 'Imported';
    const difficulty = Math.max(1, Math.min(5, card.difficulty || 2));
    const isQuestion = /[?]$/.test(card.front);
    const rng = makeRng(`${card.front}|${cardIndex}`);

    if (canBuildMc && shortish(card.back)) {
      const distractors = [];
      const used = new Set([card.back.toLowerCase()]);
      // Walk the pool from a per-card offset so options differ between cards.
      for (let i = 1; i < mcPool.length && distractors.length < 3; i++) {
        const candidate = mcPool[(cardIndex + i * 3) % mcPool.length];
        const key = candidate.back.toLowerCase();
        if (used.has(key)) continue;
        used.add(key);
        distractors.push(candidate.back);
      }
      if (distractors.length === 3) {
        // Seeded per card so the correct answer is evenly spread across
        // positions, but the same card always shuffles the same way.
        const options = rng.shuffle([card.back, ...distractors]);
        questions.push({
          id: nextId('card'),
          type: 'mc',
          topic,
          difficulty,
          prompt: isQuestion ? card.front : `Which of these describes "${card.front}"?`,
          options,
          answer: options.indexOf(card.back),
          explanation: card.explanation || `${card.front} — ${card.back}`
        });
        return;
      }
    }

    const keywords = deriveKeywords(card.back);
    questions.push({
      id: nextId('card'),
      type: 'short',
      topic,
      difficulty,
      prompt: isQuestion ? card.front : `Define or explain: ${card.front}`,
      accept: [card.back],
      keywords,
      minKeywords: Math.max(1, Math.ceil(keywords.length * 0.5)),
      explanation: card.explanation || `${card.front} — ${card.back}`
    });
  });

  return questions;
}

/** Full pipeline: raw text in, a playable subject out. */
export function buildSubjectFromText(name, text, options = {}) {
  const parsed = parseStudyText(text);
  const generated = cardsToQuestions(parsed.cards, options);
  const questions = [...parsed.questions, ...generated].map(q => ({
    ...q,
    topic: q.topic || 'Imported',
    explanation: q.explanation || 'Imported from your own study material.'
  }));

  return {
    id: `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
    name,
    short: name.slice(0, 3).toUpperCase(),
    colour: '#e08a5a',
    syllabus: 'Imported study material',
    custom: true,
    createdAt: Date.now(),
    topics: [...new Set(questions.map(q => q.topic))],
    questions,
    format: parsed.format,
    sourceCards: parsed.cards.length
  };
}
