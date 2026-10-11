# Sewers of Study

A browser RPG where your study notes are the combat system. Battles are turn-based
and side-on: get the question right and you attack, get it wrong and the enemy
attacks you. Floors are procedurally generated and never end.

Built for desktop browsers. No build step, no framework, no runtime dependencies —
plain ES modules and anime-style art drawn in code: every character, creature, item
and backdrop is cel-shaded layered paths, animated with a skeleton rig and rendered at
your screen's full resolution.

## Running it

**The quick way:** open `dist/sewers-of-study.html`. It is the whole game bundled
into one file — no server, no install, just double-click it.

**From source:** the playable source is a set of ES modules, which browsers only
load over HTTP, so `index.html` will not work straight off the file system. From the
project root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, `php -S localhost:8000`, a VS Code Live Server
extension, and so on). After changing anything under `js/` or `css/`, rebuild the
single-file version with:

```bash
node tools/bundle.mjs
```

## How it plays

1. **Pick a role.** Knight, Mage, Rogue, Cleric, Scholar or Warden. The choice is
   locked for the run and changes health, damage, how quickly energy banks, and a
   passive that alters how you fight.
2. **A floor is a run of stages** — three to five encounters, sometimes a supply
   cache or a maintenance shrine. There is no walking around: clear a stage and the
   camera pans across to the next one. Clear the last and it pans to the ladder and
   climbs to the floor below.
3. **Each turn you are offered three questions** — one below the floor's difficulty
   tier, one at it, one above. A harder card lands a heavier blow (up to +75%), an
   easier one softens it (−15%). Getting it wrong hands the enemy a free strike.
4. **Answer.** Correct means you choose a move. Incorrect means you get hit.
   A partially correct short answer still lands at half force.
5. **Read the explanation.** This is the actual point of the game — every question
   carries a worked explanation, written as revision notes rather than an answer key.
6. **Choose your move.** This is where the resource decision sits, and it works like
   a Pokémon battle:

   | Move | Energy |
   | --- | --- |
   | **Rest** | banks **+2**, but you forfeit your attack for the turn |
   | **Strike** | banks **+1** and still deals damage |
   | Everything else | **spends** 3, 6 or 12 |

   Energy caps at 20 and comes from nowhere else — not from answering, not over
   time. An ultimate is a decision you commit to several turns in advance. Since
   Strike banks a point *and* deals damage, Rest is the move you take to reach a
   threshold one turn sooner, at the cost of that turn's damage. Moves also stun,
   burn, poison, bleed, mark and shield.
7. **Every tenth floor is a boss**, at the end of a build-up of lesser fights.
   Clearing one establishes a sanctum you can restart from after you die.

Controls: `I` inventory · `C` crafting · `Esc` back · `Ctrl+Enter` submit a short
answer. Everything else is clicked.

## Subjects

Five NSW HSC subjects ship with the game — 665 questions in total, 351 of them taken
from past HSC papers. Every question is tagged by topic and by difficulty tier 1–5,
and the originals are written against the specific prescribed texts and case studies
of this course rather than the syllabus in general:

| Subject | Modules covered | Qs | Past HSC |
| --- | --- | --- | --- |
| Geography | Rural and Urban Places · Ecosystems and Global Biodiversity · Global Sustainability — Tourism · Geographical Skills | 79 | 2 |
| Business Studies | Operations · Marketing · Finance · Human Resources | 238 | 183 |
| Design & Technology | Designing and Producing · Innovation and Emerging Technologies · Major Design Project · Design Theory | 139 | 90 |
| Ancient History | Cities of Vesuvius · Sparta · Xerxes · The Greek World 500–440 BC | 146 | 55 |
| English Standard | Slessor · One Night the Moon · FEED · The Craft of Writing | 63 | 21 |

Each subject turns up equally often in play however many questions it holds, and the
three cards you are offered prefer different subjects.

Case studies are named rather than generic: Bellingen and Green Square, Kosciuszko
and the Great Barrier Reef, Taronga; Cochlear and Dyson; Eumachia, the Daiva
Inscription, the Great Rhetra. A number of questions drill exam technique directly
— explaining a mechanism instead of naming a link, stating a judgement before
justifying it, and serving the command verb the question actually uses.

Correct answers in the original questions are shuffled deterministically per question
id at load, so no option position is more likely to be right than any other.

### Past HSC questions

Past-paper questions are mixed into the normal pool and tagged with their source —
**HSC 2024 Q7** — on the card and while you answer. They are reproduced in NESA's
wording:

- **Multiple choice** (Business Studies 2017–2025, Design and Technology 2019–2025,
  Geography 2025) keeps the paper's A–D order, and the answer is the one in NESA's
  marking guidelines. Every one was checked word for word against the paper. Where an
  option was printed as a table row, its column names are written into the option, and
  tables the question relies on are shown beside it. Questions that need a graph, map
  or photo are left out.
- **Short answers** (Business, D&T Section II, the Vesuvius core, Sparta, Xerxes) carry
  a model answer adapted from NESA's sample answer or "answers could include" list. NESA
  publishes none for the Xerxes parts, so those model answers are ours and say so.
- **Essay questions** (Xerxes, the Greek World, and every English module for Slessor,
  One Night the Moon and FEED) are used as thesis drills: write one sentence that takes
  a position, marked for a judgement, the text or content, and — in English — a
  technique. Source extracts NESA reproduced under licence are not copied.

Past HSC questions © NSW Education Standards Authority, reproduced for non-commercial
study.

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
reach half of it and you get a partial — a weakened attack rather than a wasted turn.

Key ideas are matched as whole words: a keyword matches a word you typed, a longer
form of it ("gentrif" finds "gentrification"), or a long word with one typo — never
letters buried inside another word, so "so" is not found in "also". Words that appear
in the question itself don't count, so typing the question back scores nothing. After
answering, the game quotes the exact words it credited and names the ideas it missed.

`tools/grader-check.mjs` runs every built-in short answer against empty, gibberish
and filler answers, the question typed back, and every other question's model answer,
and fails if any of them score:

```bash
node tools/grader-check.mjs
```

## Progression

- **Equipment** fills ten slots, and everything you wear is drawn on your character:

  | Slot | Holds | Opens at |
  | --- | --- | --- |
  | Head, chest, feet | helmets, chest armour, boots | level 1 |
  | Main hand | any weapon; two-handed weapons take both hands | level 1 |
  | Off hand | a shield — or a second one-handed weapon (dual wielding) | shield 1 · weapon 6 |
  | Rings I, II, III | rings | 1, 5, 10 |
  | Charms I, II | charms | 1, 8 |

  You can wear two of the same ring if you own two. Gear adds attack, defence and
  health, and some of it carries something more: shields **block** (a blocked hit is
  cut to 40%), light boots and coats add **dodge**, some rings and helmets **regenerate**
  health each turn, barbed gear deals **thorns** damage back, and scholarly charms add
  **XP**. The inventory is a paper doll — click an empty slot to see what fits it, and
  each equip button shows what it replaces and how your stats change.
- **Items** have five rarity tiers, from Common to Legendary: 52 pieces of gear and
  14 consumables. Drop rates shift with your luck stat and with depth. Free Hints
  strike out wrong options mid-question; Free Revives are spent automatically when you
  would otherwise die.
- **Crafting** turns materials and lesser items into better ones — 54 recipes. Gear
  recipes chain, each tier upgrading the one below: Miner's Cap → Rivet Helm → Warden
  Helm → Diving Helm, Pot Lid → Grate Shield → Warden Kite → Barnacle Tower, and so on.
- **Enemies scale** with the floor — and with the fuller set of gear a deeper floor
  assumes — and bosses cycle through five encounters that grow stronger on each loop.
- **Biomes rotate** every ten floors, so each boss opens a new look.
- **Dying** costs you the run but banks a quarter of your crafting materials, and your
  sanctum lets you restart from the last boss floor you cleared.
- **Your study record persists** across runs. Questions you got wrong are offered to
  you more often, and the Stats screen ranks your weakest topics.

Everything saves to `localStorage`. Settings has export and import if you want to move
your progress between browsers.

## Project layout

```
index.html            entry point
css/main.css          the UI theme
js/core/              seeded RNG, event bus, storage, procedural audio
js/art/anime/cel.js   cel-shading toolkit: hard shadows, rim light, gloss, coloured line art
js/art/anime/rig.js   skeleton maths: two-bone IK, keyframed poses, spring chains for hair and cloth
js/art/anime/hero.js  the hero rig: six role designs, faces, hair, outfits, every equipped item drawn on
js/art/anime/hero-anim.js  hero timelines: idle, per-weapon attacks, casts, reactions, victory, defeat
js/art/anime/gear.js  weapons, shields and helmets (on the hero and as inventory icons)
js/art/anime/beasts.js, bosses.js  twelve enemies and five bosses, each with its own attack
js/art/anime/creatures.js  creature registry and their idle / attack / hurt / death timelines
js/art/anime/vfx.js   slash trails, impacts, elemental projectiles, magic circles, status auras
js/art/vector.js      colour helpers, and the simpler vector style used by consumable icons and props
js/art/icons.js       item icons and props
js/art/render.js      renders any drawing to a crisp canvas at screen resolution
js/art/backdrop.js    painted sewer sets with depth layers, god rays and fog, one palette per biome
js/data/              roles, abilities, items, enemies, recipes
js/data/questions/    the five subject banks, plus hsc-*.js past-paper questions
js/game/stages.js     floors, stages and enemy scaling
js/game/equipment.js  equipment slots, level gates, dual wielding, old-save migration
js/game/              state, combat, grading, loot, crafting, question selection
js/import/            file readers (ZIP/DOCX, PDF) and the study-material parser
js/ui/adventure.js    the battle scene, camera pans and the turn UI
js/ui/director.js     plays combat events out as choreography: hits land on contact, hit-stop, cut-ins
js/ui/                menu, inventory, crafting, stats, settings, subjects
tools/balance-sim.mjs headless difficulty check
tools/grader-check.mjs short-answer grading regression check
tools/bundle.mjs      inlines everything into dist/sewers-of-study.html
dist/                 the built single-file game
```

## Art direction

**Type.** Two faces, split by job. Cinzel — carved Roman capitals — sets titles,
buttons, labels and the battle boxes. Nunito, a rounded and very readable sans,
carries anything you actually read: questions, options, explanations.

**Layout.** The battle screen is three fixed bands that always add up to the
viewport — status strip, scene, console — so playing never turns into scrolling a
web page. The scene canvas sizes itself to whatever height is left and scales the
world to match, so a wide window simply sees more tunnel rather than black bars.

**Anime cel shading.** Everything is drawn in code as layered paths, painted the
way anime key art is: a base colour with a soft gradient for volume, a hard-edged
shadow in a cooler violet shade of that colour (never just darker), a thin rim
light along the back edge, gloss on metal and hair, and line art in a deep shade
of each fill rather than flat black. The shadow and rim are found automatically
from each shape, so a sleeve, a lock of hair or a boss's jaw all shade themselves.

**Characters.** The hero is a full-body rig of about six and a half heads, solved
from a pose each frame with two-bone IK for arms and legs. Faces have layered eyes
with gradient irises, highlights and lashes, brows and mouths that change with
expression, and blush. Hair is built from cap, bangs, side locks and back locks;
long hair, ponytails, braids, capes, scarves, coat tails and robes hang on spring
chains, so they swing, trail behind a dash and settle. Each role has its own design
— the knight's tabard, pauldron and cape, the mage's witch hat and floating
grimoire, the rogue's hood, mask and scarf, the cleric's halo and vestments, the
scholar's coat and glasses, the warden's leafy hood and braid — and every equipped
item draws onto the body: helmets replace hats, heavy armour covers the outfit
while light armour layers over it, boots, weapons, shields, a second weapon, rings
and charms.

**Animation.** Fighters breathe, blink and sway while idle. Attacks are keyframed
per weapon — a leaping slash for swords, a lunge for rapiers and tridents, a jumping
overhead smash for hammers and axes, a second off-hand cut when dual-wielding —
with wind-up, follow-through and a slash trail. Spells cast or channel over a rune
circle and fire elemental projectiles, pillars of light, vines or toxic clouds;
ultimates open with a cut-in of the hero's face and the ability's name. Hits land
when the blow connects, with sparks, hit-stop, a flinch and screen shake, and only
then does the number appear and the HP bar drain. Every enemy and boss has its own
wind-up and attack — bites, claw rakes, slams, sonic screams, spore clouds, venom,
a tidal wave, a barrage of books — plus hurt flinches and a dissolving death. The
hero dodges, raises a ward or shield, kneels to rest, collapses on defeat and lifts
a weapon in victory.

**Sets.** Each stage is framed like a stage set: stone columns and two great
arches, one behind each fighter, opening onto a fogged hall far below. God rays
pour through, lanterns flicker, and crystals, mushrooms, coral, candles or books
glow by biome — brickwork, flooded mains, spore galleries, ossuary, drowned court
and sunken archive, rotating every ten floors. Static layers are baked once per
floor; on slower machines the scene lowers its pixel density and repaints fighters
on alternate frames to keep the motion smooth.

## Checking the difficulty curve

`tools/balance-sim.mjs` plays full runs through the real combat engine at a range of
answer accuracies and reports the mean floor reached. Run it after changing enemy
scaling, role stats or ability numbers:

```bash
node tools/balance-sim.mjs
```

Accuracy should drive depth for every role, and no role should be far outside the pack.
