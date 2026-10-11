/* Builders for questions reproduced from past NSW HSC papers.

   Each one carries a `source` ({ exam, year, q }) which the game shows as a
   tag such as "HSC 2024 Q7", and `fixedOrder`, so multiple choice options stay
   in the paper's A–D order and the letter matches NESA's answer key.

   Questions © NSW Education Standards Authority, reproduced for
   non-commercial study. */

const PREFIX = { geography: 'geo', business: 'bus', design: 'dnt', ancient: 'anc', english: 'eng' };

/** "bus-h24-07", "dnt-h19-11b", "anc-h21-02c" — stable, readable, unique. */
export function pastId(subjectId, year, q) {
  const part = String(q).toLowerCase().replace(/[^a-z0-9]/g, '').replace(/^(\d)(?!\d)/, '0$1');
  return `${PREFIX[subjectId]}-h${String(year).slice(2)}-${part}`;
}

export function pastSource(year, q) {
  return { exam: 'HSC', year, q: String(q) };
}

/** A label for the tag: "HSC 2024 Q7". */
export function sourceLabel(source) {
  if (!source) return '';
  return `${source.exam || 'HSC'} ${source.year}${source.q ? ` Q${source.q}` : ''}`;
}

export function pastMc(subjectId, year, q, topic, difficulty, prompt, options, answerLetter, explanation, stimulus) {
  const answer = 'ABCD'.indexOf(answerLetter);
  if (answer < 0 || answer >= options.length) throw new Error(`${subjectId} ${year} Q${q}: bad answer ${answerLetter}`);
  return {
    id: pastId(subjectId, year, q), topic, difficulty, type: 'mc',
    source: pastSource(year, q), fixedOrder: true,
    ...(stimulus ? { stimulus } : {}),
    prompt, options, answer, explanation,
  };
}

/** A short-answer part, marked by our keywords against NESA's sample answer. */
export function pastShort(subjectId, year, q, topic, difficulty, prompt, accept, keywords, minKeywords, sample, stimulus) {
  return {
    id: pastId(subjectId, year, q), topic, difficulty, type: 'short',
    source: pastSource(year, q),
    ...(stimulus ? { stimulus } : {}),
    prompt, accept, keywords, minKeywords,
    explanation: `Model answer (adapted from the NESA marking guidelines): ${sample}`,
  };
}

/** As pastShort, for parts NESA published no sample answer for; the model answer is ours. */
export function pastShortOwn(subjectId, year, q, topic, difficulty, prompt, accept, keywords, minKeywords, answer, stimulus) {
  return {
    ...pastShort(subjectId, year, q, topic, difficulty, prompt, accept, keywords, minKeywords, '', stimulus),
    explanation: `Model answer (ours — NESA published no sample answer for this part): ${answer}`,
  };
}

/**
 * An extended-response question used as a thesis drill: the player writes a
 * one-sentence thesis, which is marked for a judgement plus relevant content.
 * The explanation is ours — NESA publishes no sample essays.
 */
export function pastDrill(subjectId, year, q, topic, difficulty, prompt, accept, keywords, minKeywords, explanation) {
  return {
    id: pastId(subjectId, year, q), topic, difficulty, type: 'short',
    source: { ...pastSource(year, q), drill: true },
    prompt: `${prompt}\n\nThesis drill: answer in one sentence that takes a clear position.`,
    accept, keywords, minKeywords, explanation,
  };
}
