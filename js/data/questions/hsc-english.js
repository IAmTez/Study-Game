/* Past HSC English Standard essay questions, 2019–2025, as thesis drills.

   Each is the real question for this course's set texts — Slessor (Common
   Module), One Night the Moon (Module A) and FEED (Module B). The player writes
   a one-sentence thesis, marked for an idea that answers the question, the
   text's content, and a technique. NESA publishes no sample essays, so the
   model theses and advice are ours. Extracts and statements that NESA
   reproduced under licence are summarised rather than copied.

   Questions © NSW Education Standards Authority, reproduced for
   non-commercial study. */

import { pastDrill } from './past.js';

const S = 'english';
const drill = (year, q, topic, difficulty, prompt, accept, keywords, minKeywords, explanation, stimulus) => ({
  ...pastDrill(S, year, q, topic, difficulty, prompt, accept, keywords, minKeywords, explanation),
  ...(stimulus ? { stimulus } : {}),
});

const CM = 'Texts and Human Experiences — Slessor';
const MA = 'Language, Identity and Culture — One Night the Moon';
const MB = 'Close Study — FEED';

const SLESSOR = ['wild grapes', 'gulliver', 'out of time', 'vesper', 'marsden', 'william street', 'beach burial', 'slessor'];
const ONTM = ['albert', 'jim', 'rose', 'emily', 'tracker', 'this land is mine', 'perkins', 'kelly', 'ruby hunter', 'moon', 'search'];
const FEED = ['titus', 'violet', 'feednet', 'lesions', 'everything must go', 'calista', 'quendy', 'loga', 'link', 'anderson', 'school', 'corporat'];

const POETRY = ['imagery', 'metaphor', 'oxymoron', 'paradox', 'juxtapos', 'antithesis', 'hyperbole', 'refrain', 'monologue',
  'irony', 'ironic', 'sensory', 'symbol', 'personif', 'tone', 'enjamb', 'rhyme', 'sonnet', 'allitera', 'sibilan', 'caesura', 'motif', 'rhetorical'];
const FILM = ['song', 'music', 'lyric', 'score', 'long shot', 'close up', 'close-up', 'camera', 'framing', 'lighting', 'colour',
  'mise en scene', 'split screen', 'montage', 'motif', 'symbol', 'juxtapos', 'cinematograph', 'landscape', 'shot'];
const NOVEL = ['narrative voice', 'voice', 'first person', 'slang', 'neologism', 'fragment', 'satire', 'satiric', 'irony', 'ironic',
  'juxtapos', 'motif', 'symbol', 'hyperbole', 'characteris', 'dystopi', 'setting', 'foreshadow', 'ads', 'advertis'];

const SLESSOR_TEXT = 'Your prescribed text here: Kenneth Slessor, Selected Poems.';
const ONTM_TEXT = 'Your prescribed text here: Rachel Perkins, One Night the Moon (2001).';
const FEED_TEXT = 'Your prescribed text here: M T Anderson, Feed.';

export const PAST_QUESTIONS = [

  /* ------------------------- Common Module: Slessor ------------------------- */
  drill(2019, '6(f)', CM, 4, 'To what extent does the exploration of human experience in Slessor’s poetry invite you to reconsider your understanding of struggle?',
    ['slessor invites me to reconsider struggle as an inner conflict with memory and time through the oxymoron in wild grapes and the hyperbole of gulliver'],
    [['conflict', 'suffer', 'hardship', 'pain', 'loss', 'grief', 'endur', 'resist', 'battle', 'trapped', 'constrain', 'memory', 'mortality', 'time', 'futil'],
     SLESSOR, POETRY], 3,
    'A sophisticated thesis redefines the key word rather than repeating it: “Slessor invites us to see struggle not as a heroic fight but as the quiet, unwinnable contest with time and memory — enacted through the oxymoron of ‘Wild Grapes’ and the trapped hyperbole of ‘Gulliver’.” Then answer “to what extent” — show where he does and does not change your view.'),
  drill(2020, '5', CM, 4, 'How effectively does your prescribed text tell stories to reveal both the personal and shared nature of human experiences?',
    ['slessor effectively moves from the personal grief of wild grapes to the collective loss of war in beach burial using sensory imagery and the irony of enlisted to show that private experience is also shared'],
    [['personal', 'private', 'individual', 'collective', 'universal', 'common', 'together', 'shared'],
     SLESSOR, POETRY], 3,
    'Answer “how effectively” with a judgement and address BOTH halves: “Slessor tells stories that move from private grief (‘Wild Grapes’) to collective loss (‘Beach Burial’), and his sensory imagery and the irony of ‘Enlisted on the other front’ reveal that personal experience is also universal.” Pair one inward poem with one collective poem.',
    SLESSOR_TEXT),
  drill(2021, '6', CM, 4, 'Analyse how your prescribed text represents the ways individuals respond to the challenges they face.',
    ['slessor represents individuals responding to challenges with resistance and acceptance as the trapped speaker of gulliver rages through hyperbole while william street embraces a harsh city through its refrain'],
    [['resist', 'accept', 'endur', 'defian', 'rage', 'despair', 'embrace', 'cope', 'resilien', 'escap', 'surrender', 'futil'],
     SLESSOR, POETRY], 3,
    'Name contrasting RESPONSES, not just challenges: “Slessor’s individuals respond to challenge in opposed ways — the speaker of ‘Gulliver’ rages against entrapment in futile hyperbole, while ‘William Street’ embraces a harsh city through its defiant refrain.”',
    SLESSOR_TEXT),
  drill(2022, '6(f)', CM, 4, 'How does Slessor represent the emotions arising from human experiences through the features of poetry?',
    ['slessor represents the grief and nostalgia of loss through sensory imagery and oxymoron in wild grapes and the quiet sorrow of war through the irony of beach burial'],
    [['grief', 'sorrow', 'nostalgi', 'longing', 'despair', 'frustrat', 'anger', 'rage', 'love', 'regret', 'melanchol', 'joy', 'pity', 'compassion'],
     SLESSOR, POETRY], 3,
    'Name specific emotions and tie each to a feature: “Slessor captures the bittersweet grief of memory through the oxymoron ‘Acid and gipsy-sweet’ in ‘Wild Grapes’, and the muted compassion of war through the irony of ‘Enlisted on the other front’ in ‘Beach Burial’.”'),
  drill(2023, '6', CM, 4, '‘A text can ignite ideas about collective human experiences that enrich our view of the world.’ To what extent do you agree with this statement in relation to your prescribed text?',
    ['i largely agree because beach burial uses the irony of enlisted to show that death unites enemies which enriches my view of war as a shared human experience'],
    [['agree', 'disagree', 'largely', 'partly', 'extent', 'shared', 'common', 'universal', 'unite', 'together', 'humanity', 'community'],
     SLESSOR, POETRY], 3,
    'State how far you agree, then why: “I largely agree — ‘Beach Burial’ uses the irony of ‘Enlisted on the other front’ to show death uniting enemies, enriching our view of war as a shared human experience — though poems like ‘Out of Time’ ignite ideas that are more private than collective.”',
    SLESSOR_TEXT),
  drill(2024, '6', CM, 4, 'In what ways has the study of your prescribed text given you insights into the complex relationship between human qualities, motivations and actions?',
    ['slessor shows that hypocrisy motivates cruelty in vesper song where marsdens piety is exposed by dramatic monologue and irony while love and memory drive the speaker of wild grapes'],
    [['hypocri', 'pious', 'piety', 'cruel', 'greed', 'love', 'desire', 'fear', 'pride', 'compassion', 'courage', 'memory', 'nostalgi', 'power'],
     SLESSOR, POETRY], 3,
    'Show the RELATIONSHIP, not a list: “Slessor exposes how a quality can contradict its actions — in ‘Vesper-Song’ the dramatic monologue lets Marsden’s piety reveal his cruelty — while in ‘Wild Grapes’ love and memory drive the speaker back to a place of loss.”',
    SLESSOR_TEXT),
  drill(2025, '6', CM, 4, 'Analyse how the representation of particular lives in your prescribed text enriches your understanding of the endurance of the human spirit.',
    ['slessor shows that the human spirit endures not by triumph but by memory and compassion as the sensory imagery of wild grapes preserves a lost life and beach burial honours the anonymous dead'],
    [['resilien', 'survive', 'persist', 'memory', 'compassion', 'dignity', 'hope', 'defian', 'mortality', 'remember', 'honour', 'humanity'],
     SLESSOR, POETRY], 3,
    'Complicate “resilience wins”: “Slessor suggests the human spirit endures not through triumph but through memory and compassion — the sensory imagery of ‘Wild Grapes’ keeps a lost life alive, and ‘Beach Burial’ honours the anonymous dead.”',
    SLESSOR_TEXT),

  /* ------------------------ Module A: One Night the Moon ------------------------ */
  drill(2019, '5', MA, 4, 'Film relies primarily on dialogue to create cultural tension. To what extent do you agree with this statement?',
    ['i disagree because perkins creates cultural tension mainly through song and visual contrast as the this land is mine duet and long shots of the landscape show the clash between jim and albert'],
    [['agree', 'disagree', 'largely', 'partly', 'limited', 'extent', 'rather than', 'more than', 'mainly', 'instead'],
     ONTM, FILM], 3,
    'One Night the Moon is a musical with very little dialogue, so you can disagree strongly: “Perkins creates cultural tension primarily through song and image rather than dialogue — the ‘This Land Is Mine’ duet and extreme long shots of the land set Jim’s ownership against Albert’s belonging.”',
    ONTM_TEXT),
  drill(2020, '1', MA, 4, 'To what extent does your prescribed text disrupt assumptions about culture?',
    ['perkins disrupts the settler assumption that land can be owned by juxtaposing jim and albert in the this land is mine duet which shows indigenous connection to country'],
    [['racism', 'racist', 'prejudice', 'colonial', 'settler', 'white', 'indigenous', 'aboriginal', 'country', 'ownership', 'belong', 'superior'],
     ONTM, FILM], 3,
    'Name the assumption and how it is disrupted: “Perkins disrupts the settler assumption that land is owned rather than belonged to — the ‘This Land Is Mine’ duet juxtaposes Jim’s claim with Albert’s connection to country, and Emily’s death shows the cost of Jim’s prejudice.”',
    ONTM_TEXT),
  drill(2021, '1', MA, 4, 'Analyse how language creates a sense of identity for individuals within a community in your prescribed text.',
    ['the lyrics of this land is mine give jim and albert opposed identities while close ups of rose show her identity shifting from her husbands community to compassion'],
    [['belong', 'ownership', 'culture', 'cultural', 'indigenous', 'aboriginal', 'settler', 'country', 'outsider', 'exclu', 'family', 'grief'],
     ONTM, FILM], 3,
    'In a film, “language” means the language of film AND song: “Perkins uses the contrasting lyrics of ‘This Land Is Mine’ to give Jim and Albert opposed identities, and close-ups of Rose to show her identity shifting from her husband’s community toward Albert’s.”',
    ONTM_TEXT),
  drill(2022, '1', MA, 4, 'Explain how the language used in your prescribed text changed your perceptions about identity.',
    ['the film changed my perception of identity as connection to country rather than ownership because the juxtaposed lyrics of this land is mine and long shots of the landscape show albert belongs to the land'],
    [['belong', 'ownership', 'country', 'connection', 'culture', 'indigenous', 'aboriginal', 'settler', 'place', 'land'],
     ONTM, FILM], 3,
    'Show the change: “One Night the Moon changed my view of identity from something you own to something you belong to — the juxtaposed lyrics of ‘This Land Is Mine’ and the extreme long shots of the ranges place Albert within the land and Jim against it.”',
    ONTM_TEXT),
  drill(2023, '1', MA, 4, 'Explain how ideas in this statement highlight the way cultural values and identity are represented in your prescribed text.',
    ['perkins shows that stories pass on cultural values as the songs of rose and albert carry grief and indigenous knowledge of country that jim rejects'],
    [['story', 'stories', 'storytell', 'values', 'pass on', 'tradition', 'knowledge', 'country', 'indigenous', 'aboriginal', 'belong', 'grief'],
     ONTM, FILM], 3,
    'Link the statement to the form: the film itself tells a story through song. “Perkins shows stories passing on cultural values — the songs of Rose and Albert carry grief and Indigenous knowledge of country, values Jim’s refusal shuts out until it is too late.”',
    `The statement (Olga and Christopher Werby, Twin Time) says that by telling each other stories we recreate ourselves, pass on our values as a society, and understand each other. ${ONTM_TEXT}`),
  drill(2024, '1(i)', MA, 4, 'How does your study of One Night the Moon inform your understanding of change and its connection to culture?',
    ['the film shows that cultural change comes too late for jim whose prejudice kills emily while rose changes and turns to albert shown through her song and close ups'],
    [['prejudice', 'racism', 'grief', 'regret', 'reconcil', 'transform', 'learn', 'too late', 'accept', 'respect', 'indigenous', 'aboriginal', 'settler'],
     ONTM, FILM], 3,
    'Track who changes and who does not: “One Night the Moon shows that cultural change can come too late — Jim’s prejudice costs Emily her life, while Rose’s change, traced in her song and close-ups, moves her toward Albert’s knowledge of country.”'),
  drill(2025, '1', MA, 4, 'How does your prescribed text reveal the benefits and challenges of belonging to specific cultures?',
    ['perkins shows that albert belonging to his indigenous culture gives him deep knowledge of country but also exposes him to jims racism shown through the contrasting songs and framing'],
    [['knowledge', 'connection', 'identity', 'community', 'support', 'racism', 'prejudice', 'exclu', 'outsider', 'isolat', 'indigenous', 'aboriginal', 'settler'],
     ONTM, FILM], 3,
    'Benefits AND challenges for at least one culture: “Albert’s belonging to his culture gives him a knowledge of country the settlers lack, but exposes him to Jim’s racism; Perkins frames this through contrasting songs and the way Albert is kept at the edge of shots.”',
    ONTM_TEXT),

  /* ------------------------------ Module B: FEED ------------------------------ */
  drill(2019, '7', MB, 4, 'Literature reinforces or challenges our understanding of ordinary situations. Discuss this statement.',
    ['feed challenges our understanding of ordinary situations like shopping and chatting with friends because the satire of titus voice makes everyday consumerism look disturbing'],
    [['consumer', 'shopping', 'everyday', 'normal', 'technolog', 'social media', 'friends', 'party', 'school', 'reinforce', 'familiar'],
     FEED, NOVEL], 3,
    'Discuss means weigh both verbs: “Feed challenges our view of ordinary life — shopping, partying, chatting — because Titus’s degraded, satirical voice makes everyday consumerism look disturbing, while it reinforces what we already suspect about technology.”',
    FEED_TEXT),
  drill(2020, '2(a)', MB, 4, 'In what ways does Feed invite questions about resistance and conformity?',
    ['feed invites questions about conformity through titus slang filled voice and about the cost of resistance through violet whose malfunctioning feed and death show that resistance is punished'],
    [['conform', 'resist', 'rebel', 'compl', 'consumer', 'control', 'individual', 'punish', 'freedom', 'malfunction', 'system'],
     ['titus', 'violet', 'feednet', 'lesions', 'everything must go', 'calista', 'quendy', 'loga', 'link', 'anderson', 'school', 'corporat'],
     NOVEL], 3,
    'Use the Titus/Violet juxtaposition: “Feed questions conformity through Titus’s slang-ridden voice, which shows how easily a teenager is absorbed by consumer culture, and questions resistance through Violet, whose rejected, malfunctioning feed shows the system punishing anyone who resists.”'),
  drill(2021, '2(a)', MB, 4, 'How does Anderson shape character and setting to create a personal and intellectual connection with the reader?',
    ['anderson makes titus relatable through his teenage first person voice while the satirical setting of the moon and a dying earth makes readers think critically about consumerism'],
    [['relatab', 'familiar', 'teenage', 'empath', 'sympath', 'think', 'critical', 'reflect', 'warn', 'question', 'recognis', 'complicit'],
     ['titus', 'violet', 'feednet', 'lesions', 'everything must go', 'calista', 'quendy', 'loga', 'link', 'moon', 'earth', 'school', 'corporat'],
     NOVEL], 3,
    'Personal = feeling; intellectual = thinking. “Anderson connects personally through Titus’s familiar teenage voice, then intellectually through a satirical setting — a trip to the moon, a dying Earth — that makes the reader recognise their own consumer habits.”'),
  drill(2022, '2(a)', MB, 4, 'Analyse how the central ideas of Feed are explored through the distinctive qualities of the text.',
    ['feed explores the dehumanising power of corporate technology through titus degraded first person voice and the ad fragments that interrupt chapters'],
    [['consumer', 'corporat', 'dehumanis', 'technolog', 'control', 'language', 'environment', 'apathy', 'mortality', 'identity', 'empath'],
     ['titus', 'violet', 'feednet', 'lesions', 'everything must go', 'calista', 'quendy', 'loga', 'link', 'anderson', 'school', 'hospital', 'disconnect'],
     NOVEL], 3,
    'Name ideas AND the qualities that carry them: “Feed explores the dehumanising power of corporate technology through its most distinctive qualities — Titus’s degraded first-person voice and the ad fragments spliced between chapters.” (The paper’s extract is from Titus waking in hospital, disconnected from the feed.)'),
  drill(2023, '2', MB, 4, 'How do the connections between ideas, form and language inform your understanding of the significance of your prescribed text?',
    ['feed matters because its form as a first person satire and its slang language enact its idea that corporate technology destroys thought so the reader feels the loss rather than being told'],
    [['significan', 'warning', 'warn', 'relevan', 'enduring', 'prophetic', 'today', 'consumer', 'corporat', 'technolog', 'destroy', 'dehumanis'],
     FEED, NOVEL], 3,
    'Show how form and language ENACT the idea: “Feed is significant because its form — a satirical first-person novel — and its broken slang enact its warning that corporate technology erodes thought, so the reader experiences the loss rather than being told about it.”',
    FEED_TEXT),
  drill(2024, '2', MB, 4, '‘Literature does not just describe our world, it shapes and enriches our understanding of it.’ To what extent does your prescribed text reflect the ideas about literature in this statement?',
    ['feed largely reflects this because its satire of consumer culture through titus voice reshapes how readers see their own dependence on technology and social media'],
    [['agree', 'largely', 'partly', 'extent', 'reshape', 'changes', 'warn', 'critical', 'reflect', 'social media', 'technolog', 'consumer', 'dependen'],
     FEED, NOVEL], 3,
    'Show it doing more than describing: “Feed largely reflects this — its satire of consumer culture, voiced through Titus, doesn’t just describe a future but reshapes how readers see their own dependence on technology and social media.”',
    FEED_TEXT),
  drill(2025, '2', MB, 4, 'Analyse how different values and attitudes are exposed through the key features of your prescribed text.',
    ['feed exposes titus apathy and consumerism against violets curiosity and empathy through juxtaposition and the satirical ads that reveal corporate values'],
    [['apath', 'consumer', 'greed', 'empath', 'curiosity', 'curious', 'indifferen', 'corporat', 'materialis', 'compassion', 'selfish', 'profit'],
     FEED, NOVEL], 3,
    'Contrast values through features: “Feed exposes Titus’s apathy and consumerism against Violet’s curiosity and empathy through juxtaposition, while the satirical ads and news fragments expose the corporate values behind them.”',
    FEED_TEXT),
];
