# Sewers of Study

A browser dungeon-crawler RPG where your study notes are the combat system. Every
move costs an answer: get the question right and you attack, get it wrong and the
enemy attacks you. The floors are procedurally generated and never end.

Built for desktop browsers. No build step, no framework, no runtime dependencies —
plain ES modules, a canvas tile map, and hand-authored 16×16 pixel sprites drawn in
code.

## Running it

ES modules need to be served over HTTP, so opening `index.html` from the file system
will not work. From the project root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, `php -S localhost:8000`, a VS Code Live Server
extension, and so on).

## How it plays

1. **Pick a role.** Knight, Mage, Rogue, Cleric, Scholar or Warden. The choice is
   locked for the run and changes health, damage, how fast energy builds, and a
   passive that alters how you fight.
2. **Walk the sewers** with WASD or the arrow keys. Fog of war hides what you have
   not seen. Chests, maintenance shrines and stairs are scattered through each floor.
3. **Meet an enemy and you are offered three questions** — one below the floor's
   difficulty tier, one at it, one above. Harder cards bank more energy and hit
   harder, but a wrong answer hands the enemy a free strike.
4. **Answer.** Correct means you choose an attack. Incorrect means you get hit.
   A partially correct short answer still lands a weakened blow.
5. **Read the explanation.** This is the actual point of the game — every question
   carries a worked explanation, and they are written as revision notes rather than
   as answer keys.
6. **Spend or bank your energy.** Better abilities require you to have saved up to a
   threshold, so a run of good answers unlocks your heavy hitters.
7. **Every tenth floor is a boss.** Clearing one establishes a sanctum you can
   restart from after you die.

Controls: `WASD`/`arrows` move · `I` inventory · `C` crafting · `Esc` back ·
`Ctrl+Enter` submit a short answer.

## Subjects

Five NSW HSC subjects ship with the game, 36 questions each (180 total), tagged by
topic and by difficulty tier 1–5:

| Subject | Modules covered |
| --- | --- |
| Geography | Ecosystems at Risk · Urban Places · People and Economic Activity · Skills |
| Business Studies | Operations · Marketing · Finance · Human Resources |
| Design & Technology | Designing and Producing · Innovation · Major Design Project · Design Theory |
| Ancient History | Cities of Vesuvius · Ancient Societies · Personalities · Historical Periods |
| English Standard | Texts and Human Experiences · Language, Identity and Culture · Close Study · The Craft of Writing |

### Adding your own

The **Subjects** screen imports your own material as a new playable subject. Drop in
`.txt`, `.md`, `.csv`, `.tsv`, `.json`, `.docx` or `.pdf` files, or type cards by hand.
Five formats are recognised automatically:

```
Photosynthesis - the conversion of light energy into chemical energy   ← flashcards

Q: What causes coral bleaching?                                        ← question and answer
A: Heat stress causes coral to expel its zooxanthellae

1. Which gas do plants absorb?                                         ← numbered multiple choice
a) Oxygen
b) Carbon dioxide
Answer: b

question,answer,optionA,optionB,topic,difficulty                       ← CSV / TSV
What is the capital of France?,b,London,Paris,Geography,1

[{"question":"…","options":["…"],"answer":1,"difficulty":3}]           ← JSON
```

Flashcards become multiple choice when there are enough cards to build believable
distractors, and short answer otherwise. Word documents are unzipped and parsed
in the browser, so `.docx` import works with no internet connection. PDFs are the one
exception: `pdf.js` is fetched from a CDN the first time you import one.

### How short answers are graded

Grading runs entirely offline. Each short-answer question carries model answers and
groups of accepted synonyms; your response is matched against the model answers with
typo tolerance, then scored on how many key ideas it contains. Miss the threshold but
land at least one idea and you get a partial — a weakened attack rather than a wasted
turn. After answering, the game tells you which key ideas it found and which it missed.

## Progression

- **Items** have five rarity tiers, from Common to Legendary. Drop rates shift with
  your luck stat and with depth. Free Hints strike out wrong options mid-question;
  Free Revives are spent automatically when you would otherwise die.
- **Crafting** turns materials and lesser items into better ones — 18 recipes covering
  consumables, hint scrolls, revives, weapons and armour.
- **Enemies scale** with the floor, and bosses cycle through five encounters that grow
  stronger on each loop.
- **Dying** costs you the run but banks a quarter of your crafting materials, and your
  sanctum lets you restart from the last boss floor you cleared.
- **Your study record persists** across runs. Questions you got wrong are offered to
  you more often, and the Stats screen ranks your weakest topics.

Everything saves to `localStorage`. Settings has export and import if you want to move
your progress between browsers.

## Project layout

```
index.html            entry point
css/main.css          the 16-bit UI theme
js/core/              seeded RNG, event bus, storage, procedural audio
js/art/               16×16 sprite grids and the canvas renderer
js/data/              roles, abilities, items, enemies, recipes
js/data/questions/    the five subject banks
js/game/              state, floor generation, combat, grading, loot, crafting
js/import/            file readers (ZIP/DOCX, PDF) and the study-material parser
js/ui/                screens: menu, dungeon, combat, inventory, crafting, stats…
tools/balance-sim.mjs headless difficulty check
```

## Checking the difficulty curve

`tools/balance-sim.mjs` plays full runs through the real combat engine at a range of
answer accuracies and reports the mean floor reached. Run it after changing enemy
scaling, role stats or ability numbers:

```bash
node tools/balance-sim.mjs
```

Accuracy should drive depth for every role, and no role should be far outside the pack.
