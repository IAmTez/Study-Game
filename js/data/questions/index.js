/* Aggregates the built-in question banks and normalises every question so the
   rest of the game can treat built-in and user-imported questions identically. */

import { SUBJECT as geography } from './geography.js';
import { SUBJECT as business } from './business.js';
import { SUBJECT as design } from './design.js';
import { SUBJECT as ancient } from './ancient.js';
import { SUBJECT as english } from './english.js';

export const BUILTIN_SUBJECTS = [geography, business, design, ancient, english];

/** Fill in defaults so a hand-written or imported question is always complete. */
export function normaliseQuestion(question, subject) {
  const q = { ...question };
  q.subjectId = subject.id;
  q.subjectName = subject.name;
  q.subjectShort = subject.short || subject.name.slice(0, 3).toUpperCase();
  q.subjectColour = subject.colour || '#b9c2cf';
  q.topic = q.topic || 'General';
  q.difficulty = Math.max(1, Math.min(5, q.difficulty || 1));
  q.type = q.type === 'short' ? 'short' : 'mc';
  if (q.type === 'mc') {
    q.options = Array.isArray(q.options) ? q.options : [];
    q.answer = Number.isInteger(q.answer) ? q.answer : 0;
  } else {
    q.accept = Array.isArray(q.accept) ? q.accept : [];
    q.keywords = Array.isArray(q.keywords) ? q.keywords : [];
    if (!Number.isInteger(q.minKeywords)) {
      q.minKeywords = Math.max(1, Math.ceil(q.keywords.length * 0.6));
    }
  }
  q.explanation = q.explanation || 'No explanation was provided for this question.';
  return q;
}

export function normaliseSubject(subject) {
  return {
    ...subject,
    custom: !!subject.custom,
    questions: subject.questions.map(q => normaliseQuestion(q, subject))
  };
}

/** Every built-in subject, normalised. */
export function builtinSubjects() {
  return BUILTIN_SUBJECTS.map(normaliseSubject);
}
