/* Past HSC Geography questions.

   The 2025 paper is the first under the current Geography syllabus, and almost
   all of its multiple choice reads off a map, photo or graph. Only these two
   stand alone; they are in NESA's wording and order, with the official answer.

   Questions © NSW Education Standards Authority, reproduced for
   non-commercial study. */

import { pastMc } from './past.js';

const S = 'geography';
const mc = (...a) => pastMc(S, ...a);

export const PAST_QUESTIONS = [
  mc(2025, '1', 'Ecosystems and Global Biodiversity', 2,
    'Which term refers to ecosystems generating useful materials and absorbing waste for humans?',
    ['Biocapacity', 'Continentality', 'Geomorphic process', 'Ecological disturbance'], 'A',
    'Biocapacity is an ecosystem’s capacity to regenerate useful biological materials and absorb the waste humans produce. It is compared with the ecological footprint: when demand exceeds biocapacity, an area is in ecological deficit.'),
  mc(2025, '7', 'Geographical Skills', 2,
    'A geographer creates a cross-section from a topographic map. Why would vertical exaggeration be used?',
    ['To make the map look more accurate', 'To show the exact shape of landforms', 'To adjust the horizontal scale of the map', 'To make elevation changes more obvious'], 'D',
    'Vertical exaggeration stretches the vertical scale so changes in height stand out. It DISTORTS the true shape of landforms, so option B is the opposite. VE = horizontal scale ÷ vertical scale (e.g. 1:25 000 ÷ 1:2 500 = ×10).'),
];
