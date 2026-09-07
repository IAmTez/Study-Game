/* NSW HSC English Standard.

   Written against this course's prescribed texts: Kenneth Slessor's Selected
   Poems for the Common Module, Rachel Perkins' One Night the Moon for
   Module A, M.T. Anderson's FEED for Module B, and the Craft of Writing.

   Quotations are the short phrases needed to identify a technique, in the
   same form as a study note; the analysis is the point, not the text. */

export const SUBJECT = {
  id: 'english',
  name: 'English Standard',
  short: 'ENG',
  colour: '#c98bd6',
  syllabus: 'NSW HSC English Standard',
  topics: ['Texts and Human Experiences — Slessor', 'Language, Identity and Culture — One Night the Moon', 'Close Study — FEED', 'The Craft of Writing'],
  questions: [

    /* ---------------- Common Module: Slessor ---------------- */
    {
      id: 'eng-01', topic: 'Texts and Human Experiences — Slessor', difficulty: 1, type: 'mc',
      prompt: 'Which set correctly lists the prescribed Slessor poems?',
      options: [
        "'Wild Grapes', 'Gulliver', 'Out of Time', 'Vesper-Song of the Reverend Samuel Marsden', 'William Street', 'Beach Burial'",
        "'Five Bells', 'South Country', 'Country Towns', 'Sleep', 'Waters', 'Elegy in a Botanic Gardens'",
        "'Beach Burial', 'Five Bells', 'The Night-Ride', 'Winter Dawn', 'Last Trams', 'Cock-Crow'",
        "'Out of Time', 'Five Bells', 'Sleep', 'William Street', 'Gulliver', 'Choker's Lane'",
      ],
      answer: 0,
      explanation: 'Six prescribed poems: \'Wild Grapes\', \'Gulliver\', \'Out of Time\', \'Vesper-Song of the Reverend Samuel Marsden\', \'William Street\' and \'Beach Burial\'. Slessor wrote \'Five Bells\' and \'Sleep\', but they are not on this prescription — writing about them wastes the essay. Choose two or three per essay, paired by concept.'
    },
    {
      id: 'eng-02', topic: 'Texts and Human Experiences — Slessor', difficulty: 2, type: 'mc',
      prompt: 'In \'Wild Grapes\', the oxymoron "Acid and gipsy-sweet" conveys:',
      options: [
        'Memory\'s paradox — pain and pleasure fused, so grief is treasured rather than discarded',
        'The literal ripeness of the fruit in the orchard',
        'The speaker\'s dislike of the countryside',
        'The passage of the seasons in a working farm',
      ],
      answer: 0,
      explanation: 'The oxymoron does the conceptual work: a taste both sour and sweet enacts how painful memories are preserved rather than released. The wider paradox in the poem is that the orchard is dead yet still fruits — absence produces presence — and Isabella persists in a memory that keeps its sharpness rather than softening into nostalgia.'
    },
    {
      id: 'eng-03', topic: 'Texts and Human Experiences — Slessor', difficulty: 3, type: 'mc',
      prompt: 'The final line of \'Wild Grapes\' — "Kissed here — or killed here — but who remembers now?" — is best analysed as:',
      options: [
        'Alliterative antithesis and a rhetorical question, which the poem itself answers by performing the act of remembrance it doubts',
        'A simple statement of the speaker\'s ignorance about local history',
        'A metaphor for the violence of the natural world reclaiming farmland',
        'An allusion to a specific historical crime in the district',
      ],
      answer: 0,
      explanation: 'Two techniques and one paradox. The alliterative antithesis of "kissed" and "killed" collapses love and violence into indistinguishability in memory, and the rhetorical question asserts that time erases. But the poem is itself the remembering — it answers its own question by existing. That self-contradiction is precisely the "anomaly, paradox or inconsistency" the rubric asks you to name.'
    },
    {
      id: 'eng-04', topic: 'Texts and Human Experiences — Slessor', difficulty: 2, type: 'mc',
      prompt: 'In \'Gulliver\', the line "One hair I break, ten thousand hairs entwine me" uses hyperbole and antithesis to convey:',
      options: [
        'Futility — trivial constraints multiply faster than we can escape them',
        'The physical strength of the giant compared with his captors',
        'The speaker\'s pride in his ability to break free',
        'The passage of time measured in individual moments',
      ],
      answer: 0,
      explanation: 'The inconsistency of scale is the poem\'s engine: no single bond is strong, yet together the trivial threads of daily life overpower a giant. The accumulative catalogue "Love, hunger, drunkenness, neuralgia, debt" names those threads as ordinary life itself, so the entrapment is by the mundane — and the speaker rages while remaining bound, which is awareness without freedom.'
    },
    {
      id: 'eng-05', topic: 'Texts and Human Experiences — Slessor', difficulty: 3, type: 'short',
      prompt: 'Identify the central paradox of \'Out of Time\' and name ONE technique that enacts it.',
      accept: ['time both creates and destroys since the same current that carries the beautiful moment sweeps it away and the circular structure looping the last line to the first enacts inescapability'],
      keywords: [
        ['creates', 'destroy', 'cradle', 'kill', 'both', 'beautiful', 'sweep', 'preserve', 'lose'],
        ['circular', 'loop', 'structure', 'sonnet', 'metaphor', 'personif', 'wave', 'knife', 'yacht', 'bubble'],
      ],
      minKeywords: 2,
      explanation: 'The paradox: time both creates and destroys — the same current that carries the beautiful moment is what sweeps it away. The dual metaphor carries it: "Time, the wave" against "Time, the bony knife, it runs me through" — cradle and killer in one figure. Structurally, the sonnet sequence loops its closing line back to its opening simile "Time flowing like a hundred yachts", so the form enacts inescapability while the poem itself preserves the very moment it declares lost. "Lensed in a bubble\'s ghostly camera" makes that preservation fragile by definition: the moment is beautiful because it cannot last.'
    },
    {
      id: 'eng-06', topic: 'Texts and Human Experiences — Slessor', difficulty: 3, type: 'mc',
      prompt: 'The dramatic monologue form of \'Vesper-Song of the Reverend Samuel Marsden\' is significant because it:',
      options: [
        'Lets Marsden condemn himself in his own voice, so the irony is produced by the persona rather than stated by the poet',
        'Allows Slessor to praise Marsden\'s missionary achievements directly',
        'Creates a neutral, documentary account of colonial punishment',
        'Signals that the speaker and the poet share the same values',
      ],
      answer: 0,
      explanation: 'Slessor never appears to judge; Marsden convicts himself. The savage irony sits in the gap between the hymn-like, jaunty rhythm and the brutal content — "Shall I not let God\'s leather in", "a tinker\'s litany of whips", "scourged to Paradise". The paradox is moral: prayer and piety voiced by a torturer, devotion and sadism in one persona, salvation reframed as brutality. Use it for questions about the darker human capacities or about self-deception.'
    },
    {
      id: 'eng-07', topic: 'Texts and Human Experiences — Slessor', difficulty: 2, type: 'mc',
      prompt: 'The refrain of \'William Street\', "You find this ugly, I find it lovely", functions primarily to:',
      options: [
        'Confront the reader directly, putting their assumptions rather than the street on trial',
        'Describe the changing appearance of Kings Cross across the seasons',
        'Establish the speaker as a detached, objective observer',
        'Signal a shift from present tense to past tense narration',
      ],
      answer: 0,
      explanation: 'The direct address plus antithesis makes the reader the subject of the poem. The perceptual anomaly is that what society calls ugly the speaker declares lovely, locating beauty in grease, neon and vice — "grease that blesses onions with a hiss" sanctifies the profane through religious personification and sibilance. The respectable reader\'s values, not the street, are exposed as the real inconsistency.'
    },
    {
      id: 'eng-08', topic: 'Texts and Human Experiences — Slessor', difficulty: 3, type: 'mc',
      prompt: 'In \'Beach Burial\', "the sand joins them together, / Enlisted on the other front" is powerful chiefly because the word "enlisted":',
      options: [
        'Converts military conscription into communion, so death re-recruits enemies into a shared human condition',
        'Confirms the sailors had all volunteered for service before dying',
        'Identifies which side of the conflict the dead men fought for',
        'Emphasises the military efficiency of the burial process',
      ],
      answer: 0,
      explanation: 'Zoom to the single word — that is what separates analysis from retelling. "Enlisted" belongs to the vocabulary of the war that killed them, and Slessor turns it against itself: the "other front" is death, where the distinctions men killed for dissolve. Pair it with the opening sibilance "Softly and humbly to the Gulf of Arabs", which creates funereal tenderness before the reader even knows the cause, and the epitaph "\'Unknown seaman\' — the ghostly pencil / Wavers and fades", where commemoration is undone as it is written.'
    },
    {
      id: 'eng-09', topic: 'Texts and Human Experiences — Slessor', difficulty: 4, type: 'short',
      prompt: 'The Common Module rubric asks you to name an anomaly, paradox or inconsistency. State the one in \'Beach Burial\'.',
      accept: ['men who died as enemies are united in death so identity is erased at the very moment of commemoration and gentle lulling sounds describe violent death'],
      keywords: [
        ['enem', 'united', 'together', 'joins', 'side', 'shared', 'common human'],
        ['erase', 'anonym', 'unknown', 'identity', 'fades', 'commemorat', 'gentle', 'tender', 'soft'],
      ],
      minKeywords: 2,
      explanation: 'Two overlapping paradoxes. First, men who died as enemies are united by the sand and tide, which are indifferent to sides — enmity is undone by the thing that killed them. Second, the burial is tender yet anonymous: identity is erased at the very moment of commemoration, as the pencilled "Unknown seaman" wavers and fades. Add the tonal inconsistency — gentle, lulling sound patterning used to describe violent death. Naming the paradox explicitly is rubric language and earns marks on its own.'
    },
    {
      id: 'eng-10', topic: 'Texts and Human Experiences — Slessor', difficulty: 4, type: 'short',
      prompt: 'For a question on "the endurance of the human spirit", what thesis about Slessor is more sophisticated than "resilience wins"?',
      accept: ['for slessor the spirit endures as persistence within time death and hardship rather than triumph over them through memory shared mortality and stubborn vitality'],
      keywords: [
        ['persist', 'not triumph', 'rather than triumph', 'within', 'continu', 'remain', 'endure in'],
        ['memory', 'mortal', 'death', 'shared', 'collective', 'vitality', 'poetry', 'storytell'],
      ],
      minKeywords: 2,
      explanation: 'Argue that endurance in Slessor is persistence rather than victory — the spirit endures most powerfully at the points where it appears defeated. Isabella endures in the sharpness of memory (\'Wild Grapes\'); the drowned seamen endure in a humanity deeper than enmity (\'Beach Burial\'); the "dips and molls" of William Street endure through sheer appetite, living with "death at their elbows, hunger at their heels" yet "ranging the pavements of their pasturage", the pastoral metaphor granting their scavenging existence dignity. Poetry itself becomes the act that makes that endurance visible. Best trio for this question: \'Beach Burial\' + \'William Street\' + \'Wild Grapes\'.'
    },
    {
      id: 'eng-11', topic: 'Texts and Human Experiences — Slessor', difficulty: 2, type: 'mc',
      prompt: 'For a Section I unseen question worth 3 marks, the most reliable structure is:',
      options: [
        'Technique → effect → link to human experience, at roughly 2–3 sentences per mark',
        'A summary of the text followed by your personal opinion',
        'A list of every technique you can identify in the extract',
        'A comparison with your prescribed text in every answer',
      ],
      answer: 0,
      explanation: 'Name the technique, explain its effect on the reader, then link that effect to the human experience the question asks about — about 2–3 sentences per mark. Listing techniques without effects scores nothing, and unseen questions do not ask for your prescribed text unless they say so. Useful verb bank: positions, foregrounds, juxtaposes, subverts, elicits, evokes.'
    },
    {
      id: 'eng-12', topic: 'Texts and Human Experiences — Slessor', difficulty: 3, type: 'mc',
      prompt: 'Which pairing of Slessor poems best suits a question about the individual versus the collective experience?',
      options: [
        "'Beach Burial' and 'William Street'",
        "'Out of Time' and 'Wild Grapes'",
        "'Vesper-Song' and 'Gulliver'",
        "'Gulliver' and 'Out of Time'",
      ],
      answer: 0,
      explanation: 'Pair by concept, not by preference. \'Beach Burial\' and \'William Street\' both handle collective experience — anonymous war dead, and the crowd of a city street. \'Out of Time\' with \'Wild Grapes\' handles time and memory; \'Vesper-Song\' with \'Gulliver\' handles the darker human capacities. Choosing the pairing that matches the question wording is half the essay planning.'
    },
    {
      id: 'eng-13', topic: 'Texts and Human Experiences — Slessor', difficulty: 3, type: 'short',
      prompt: 'Name THREE rubric terms from the Texts and Human Experiences module that should appear in a Slessor essay.',
      accept: ['individual and collective experiences human qualities and emotions anomalies paradoxes and inconsistencies seeing the world differently and the role of storytelling'],
      keywords: [
        ['individual', 'collective'],
        ['anomal', 'paradox', 'inconsist'],
        ['qualities', 'emotion', 'motivation', 'storytell', 'differently', 'assumption'],
      ],
      minKeywords: 3,
      explanation: 'The rubric language to weave in: individual and collective experiences; human qualities, emotions and motivations; anomalies, paradoxes and inconsistencies in human behaviour and motivations; how texts invite us to see the world differently and challenge assumptions; and the role of storytelling. Markers report that stronger responses select evidence purposefully from the most appropriate poems and move beyond retelling to a conceptual argument about the composer\'s purpose.'
    },

    /* ---------------- Module A: One Night the Moon ---------------- */
    {
      id: 'eng-14', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 1, type: 'mc',
      prompt: 'One Night the Moon (2001) was directed by:',
      options: ['Rachel Perkins', 'Warwick Thornton', 'Ivan Sen', 'Phillip Noyce'],
      answer: 0,
      explanation: 'Rachel Perkins, with music by Paul Kelly, Kev Carmody and Mairead Hannan. It is a 57-minute musical drama based on true events of 1932 — a child lost in the outback and the Aboriginal tracker, inspired by Alexander Riley, whose expertise was refused. Knowing the historical basis matters because the film\'s argument is about a real refusal with a real cost.'
    },
    {
      id: 'eng-15', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 3, type: 'mc',
      prompt: 'The "This Land Is Mine" sequence is the module\'s central scene because it:',
      options: [
        'Uses a contrapuntal duet across a fence line to juxtapose ownership against belonging in one composition',
        'Provides the only dialogue scene between Jim and Albert',
        'Explains the historical background of the 1932 disappearance',
        'Is the only sequence shot in daylight',
      ],
      answer: 0,
      explanation: 'The contrapuntal duet cross-cuts Jim and Albert riding the same fence line, each singing an opposed claim to the land. The fence divides the frame and the worldviews simultaneously, so the film\'s argument is delivered in film language rather than dialogue: Jim possesses the land, Albert belongs to it. In Module A a visual composition counts as a quotation — the split fence-line framing IS the evidence.'
    },
    {
      id: 'eng-16', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 3, type: 'short',
      prompt: 'Explain what Jim\'s refusal of Albert\'s tracking represents thematically.',
      accept: ['the refusal of aboriginal knowledge systems and emilys death is the cost of that refusal'],
      keywords: [
        ['refus', 'reject', 'exclu', 'deni', 'racism', 'prejudice'],
        ['knowledge', 'expertise', 'tracking', 'country', 'aboriginal', 'indigenous', 'skill'],
        ['cost', 'death', 'dies', 'emily', 'consequence', 'too late', 'price'],
      ],
      minKeywords: 2,
      explanation: 'Jim\'s "I don\'t want him on my land" refuses not a man but an entire knowledge system — Albert\'s embodied literacy of Country, set against Jim\'s colonial grammar of maps, boundaries and possession. Emily\'s death is the cost of that refusal, and Albert\'s eventual finding of her body vindicates the knowledge too late. The structural irony is that Jim\'s identity as provider and protector collapses precisely because possession of land proves meaningless without belonging to it, which is what destroys him.'
    },
    {
      id: 'eng-17', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 2, type: 'mc',
      prompt: 'Extreme long shots of figures dwarfed by ranges and sky primarily convey:',
      options: [
        'The land as vast and indifferent to colonial claims of control',
        'The characters\' physical fitness and endurance',
        'The historical accuracy of the film\'s outback setting',
        'The passage of time during the search',
      ],
      answer: 0,
      explanation: 'Scale is the argument. When the frame reduces people to specks, the fence lines and property boundaries they have drawn become visibly absurd against a landscape that does not recognise them. Pair it with the chiaroscuro low-key lighting of the homestead interiors after Emily disappears, where grief and moral darkness invade domestic space.'
    },
    {
      id: 'eng-18', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 3, type: 'mc',
      prompt: 'Rose\'s decision to defy Jim and engage Albert is significant because it:',
      options: [
        'Shows female agency crossing the racial line the film\'s male authority figures enforce',
        'Confirms that Jim was correct about the danger of the search',
        'Introduces the film\'s only comic relief',
        'Resolves the conflict between the two men',
      ],
      answer: 0,
      explanation: 'Rose acts where the sergeant and Jim have foreclosed the option, so the film locates moral clarity outside institutional authority. It also complicates any simple reading of settler culture as monolithic — the refusal is a choice individuals make, not an inevitability, which is what makes Jim culpable rather than merely typical.'
    },
    {
      id: 'eng-19', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 2, type: 'mc',
      prompt: 'The musical form itself contributes to the film\'s treatment of identity because song:',
      options: [
        'Externalises interior identity the characters cannot or will not speak aloud',
        'Makes the historical events easier for a young audience to follow',
        'Replaces the need for cinematography in conveying meaning',
        'Signals that the events depicted are fictional',
      ],
      answer: 0,
      explanation: 'These are people who do not talk about what they feel. Song carries what dialogue cannot, which is why the duet delivers the thematic conflict and Albert\'s mourning song delivers his grief. The counterpart is silence: the wordless stretches of Rose and Albert\'s search, and the finding of Emily, where music and silence carry meaning after language — including the police\'s words — has failed.'
    },
    {
      id: 'eng-20', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 3, type: 'mc',
      prompt: 'The recurring moon motif functions to represent:',
      options: [
        'The pull of the natural world and the innocence that settlers cannot fence',
        'The passage of a single night in real time',
        'The arrival of European surveying technology',
        'Albert\'s tracking method, which relies on moonlight',
      ],
      answer: 0,
      explanation: 'Emily is lured out by moonlight in the opening, and lunar imagery recurs across the film. The motif sets the natural world\'s pull against the human impulse to enclose: the moon is the one thing in the frame no fence can contain, and a child follows it out of a world of boundaries into one that has none.'
    },
    {
      id: 'eng-21', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 4, type: 'short',
      prompt: 'Write a thesis for: "How does Perkins use the language of film to represent the relationship between identity and place?"',
      accept: ['perkins uses the composite language of film image music and silence to juxtapose two literacies of the same land showing that identity is constituted by the language a culture uses to know its place'],
      keywords: [
        ['composite', 'language of film', 'song', 'music', 'image', 'silence', 'cinemat'],
        ['two literac', 'juxtapos', 'oppos', 'ownership', 'belonging', 'possession', 'country', 'custodian'],
        ['identity', 'constitut', 'shape', 'construct'],
      ],
      minKeywords: 2,
      explanation: 'Model thesis: identity is inseparable from the language a culture uses to know its place. Perkins deploys the composite language of the musical film — contrapuntal song, chiaroscuro lighting and the symbolism of fences — to juxtapose two literacies of the same land: Jim\'s colonial grammar of maps, boundaries and possession, and Albert\'s embodied reading of Country. By staging the duet across a fence line that divides both frame and worldview, she reveals that Jim\'s identity, built on ownership, is destroyed by the very knowledge he excludes, while Albert\'s belonging endures. The film therefore argues that language — spoken, sung and visual — does not merely express identity and culture but constitutes them.'
    },
    {
      id: 'eng-22', topic: 'Language, Identity and Culture — One Night the Moon', difficulty: 2, type: 'mc',
      prompt: 'Which technique contrast best captures the film\'s "two literacies of land"?',
      options: [
        'Jim\'s map and boundary riding against Albert reading tracks on the ground',
        'The use of colour film against black-and-white archival inserts',
        'Diegetic sound against non-diegetic sound',
        'The homestead interior against the police station interior',
      ],
      answer: 0,
      explanation: 'Jim reads the land through an imposed grid — the map, the fence, the survey. Albert reads it through embodied knowledge — tracks, ground, sign. Both are forms of literacy, which is why "two literacies" is a more precise formulation than "two cultures", and precision of that kind is what lifts a Module A paragraph.'
    },

    /* ---------------- Module B: FEED ---------------- */
    {
      id: 'eng-23', topic: 'Close Study — FEED', difficulty: 1, type: 'mc',
      prompt: 'FEED (2002) was written by:',
      options: ['M.T. Anderson', 'Cory Doctorow', 'Margaret Atwood', 'Neal Shusterman'],
      answer: 0,
      explanation: 'M.T. Anderson. It is a dystopian satire narrated by Titus, a teenager with the "feed" — a networked implant streaming advertising, chat and entertainment directly into consciousness. Violet, implanted late and dying from a malfunctioning feed, is the counter-voice. Module B assesses the distinctive qualities of THIS text plus your personal, informed response.'
    },
    {
      id: 'eng-24', topic: 'Close Study — FEED', difficulty: 3, type: 'mc',
      prompt: 'The novel\'s most distinctive quality is Titus\'s degraded narrative voice. Its central effect is that:',
      options: [
        'Form enacts theme — the impoverished prose is itself evidence of the cognitive decay the feed causes',
        'It makes the novel easier to read for a teenage audience',
        'It establishes Titus as an unreliable narrator who lies about events',
        'It distinguishes the novel\'s dialogue from its narration',
      ],
      answer: 0,
      explanation: 'The argument to make is that Anderson builds a narrator who cannot adequately narrate. Titus\'s limited lexicon — slang substituting for thought — means the prose demonstrates the claim rather than asserting it: when language is colonised by marketing, thinking itself contracts. Note the difference from unreliability: Titus is not lying, he genuinely lacks the interior resources to describe his world, which is worse.'
    },
    {
      id: 'eng-25', topic: 'Close Study — FEED', difficulty: 3, type: 'mc',
      prompt: 'The 2022 HSC extract came from the hospital section, where Titus wakes disconnected from the feednet. That section matters because:',
      options: [
        'Disconnection reveals dependence — his repetitive, circling syntax registers panic because he has no interior resources to fall back on',
        'It is the only section narrated by Violet rather than Titus',
        'It shows the feed being permanently removed from all characters',
        'It provides the novel\'s only description of the natural world',
      ],
      answer: 0,
      explanation: 'The hospital gives a brief life without the feed, and with it a glimpse of genuine connection between Titus and Violet. Analytically, the panic in the syntax proves the dependence: strip the feed away and there is very little person underneath. Practise linking a supplied passage outward to the whole novel, since the extract format can return.'
    },
    {
      id: 'eng-26', topic: 'Close Study — FEED', difficulty: 3, type: 'mc',
      prompt: 'Violet\'s "resistance" project is to:',
      options: [
        'Deliberately confuse her consumer profile by browsing incoherently, with the consequence that the corporation refuses to fund her feed repairs',
        'Organise other teenagers into a political movement against the feed corporations',
        'Have her feed surgically removed before it can fail',
        'Publish a manifesto exposing the feed companies to the public',
      ],
      answer: 0,
      explanation: 'She makes herself illegible as a customer, and the system\'s answer is chillingly commercial: an unprofitable profile is not worth repairing, so refusing to be a consumer costs her her life. This is where the satire turns tragic — the cost of the feed is measured in a person rather than an abstraction, and her death is what indicts both Titus and the reader.'
    },
    {
      id: 'eng-27', topic: 'Close Study — FEED', difficulty: 4, type: 'short',
      prompt: 'Explain how the novel makes the reader complicit, and why that matters for a Module B response.',
      accept: ['we experience the feeds seductions through titus so his failures of empathy become recognisable as our own which is the basis of a personal informed response'],
      keywords: [
        ['through titus', 'first person', 'narrat', 'perspective', 'inside', 'experience'],
        ['complicit', 'implicat', 'recognis', 'uncomfortab', 'our own', 'reader', 'my response', 'positions me'],
      ],
      minKeywords: 2,
      explanation: 'Because the future arrives through Titus\'s eyes, we enjoy the feed\'s seductions before we judge them — so when he deletes Violet\'s messages and goes shopping for jeans while she deteriorates, his failure of empathy is uncomfortably recognisable rather than safely alien. Module B rewards personal voice, so say it directly: "the novel positions me to…", "my response is shaped by…". Complicity is the hinge between the text\'s distinctive qualities and your informed personal response, which is exactly what the module asks for.'
    },
    {
      id: 'eng-28', topic: 'Close Study — FEED', difficulty: 3, type: 'mc',
      prompt: 'The ad, news and pop-lyric fragments spliced into the chapters function to:',
      options: [
        'Mimic the feed\'s assault on the reader, reducing news of ecological and political collapse to background noise',
        'Provide factual exposition the narrator is unable to give',
        'Mark the passage of time between chapters',
        'Introduce characters who do not otherwise appear',
      ],
      answer: 0,
      explanation: 'The structural interruption is a technique, so treat it as one. It does to the reader what the feed does to Titus — constant intrusion — and the content matters: the dying ocean, vanishing forests and political crises appear only as fragments nobody attends to. Desensitisation is enacted formally rather than described.'
    },
    {
      id: 'eng-29', topic: 'Close Study — FEED', difficulty: 3, type: 'mc',
      prompt: 'The lesions motif is significant because the lesions are:',
      options: [
        'Normalised into fashion, so bodily decay is aestheticised rather than treated as a warning',
        'A side effect of the feed that the corporations successfully cure',
        'Confined to Violet, marking her out as different from her peers',
        'A symptom of an infectious disease spread by physical contact',
      ],
      answer: 0,
      explanation: 'The horror is the normalisation: characters turn open sores into a style, and a popular show makes them aspirational. Bodily decay joins ecological decay — the dying sea, corporate skies, filet mignon farms — as the repressed truth consumer culture converts into aesthetics rather than confronting. That conversion is the satire\'s method throughout.'
    },
    {
      id: 'eng-30', topic: 'Close Study — FEED', difficulty: 4, type: 'short',
      prompt: 'Explain the triple meaning of the novel\'s closing phrase "Everything must go".',
      accept: ['it is a sale slogan and also names ecological collapse and violets death so consumer language becomes the only language available for grief'],
      keywords: [
        ['sale', 'slogan', 'advertis', 'clearance', 'retail'],
        ['ecolog', 'environment', 'collapse', 'world', 'planet', 'nature'],
        ['violet', 'death', 'dying', 'dies', 'her'],
      ],
      minKeywords: 3,
      explanation: 'Three readings at once: a clearance-sale slogan, the ecological collapse the novel has kept in its margins, and Violet dying as Titus narrates to her. The devastation is that the novel ends in the register of advertising because that is the only language Titus has left — even his grief arrives pre-branded. Note the structural irony too: the four part titles (moon, eden, utopia, slumberland) chart an anti-journey from escape to sedation rather than growth.'
    },
    {
      id: 'eng-31', topic: 'Close Study — FEED', difficulty: 2, type: 'mc',
      prompt: 'In a Module B paragraph, the most important thing to anchor your analysis in is:',
      options: [
        'A distinctive quality of the text — voice, structure, satire or characterisation',
        'A summary of the plot events in the section discussed',
        'The author\'s biography and the year of publication',
        'A comparison with another dystopian novel you have read',
      ],
      answer: 0,
      explanation: 'Module B is about the text\'s distinctive qualities, so a paragraph anchored only in theme drifts into retelling. Recent HSC questions have been deliberately generic across all prescribed texts — "distinctive qualities" in 2022, "key features" in 2025 — which means preparation transfers, provided every paragraph names a quality and then shows the central idea being produced by it.'
    },
    {
      id: 'eng-32', topic: 'Close Study — FEED', difficulty: 3, type: 'short',
      prompt: 'State the function of the juxtaposition between Titus and Violet.',
      accept: ['violets articulate allusive speech is the measure of an uncolonised mind so her decline dramatises the human cost of the feed and indicts titus'],
      keywords: [
        ['articulate', 'allusive', 'vocabulary', 'language', 'educated', 'precise', 'thinks'],
        ['measure', 'contrast', 'against', 'cost', 'indict', 'what is lost', 'decline', 'death'],
      ],
      minKeywords: 2,
      explanation: 'Violet functions as the novel\'s control variable. Implanted late, she retains an articulate, allusive register that Titus cannot access, so her speech measures precisely what the feed has taken from everyone else — the reader can only see Titus\'s poverty because Violet\'s fluency exists beside it. Her decline as the feed sustaining her fails converts that measurement into human cost, and her death indicts Titus\'s passivity and, through complicity, the reader\'s.'
    },
    {
      id: 'eng-33', topic: 'Close Study — FEED', difficulty: 2, type: 'mc',
      prompt: 'School™ is an example of the novel\'s use of:',
      options: [
        'Satiric irony — exaggerating a present trend, in this case corporate control of education, to critique it',
        'Allegory, where each character represents an abstract virtue',
        'Magic realism, where impossible events are treated as ordinary',
        'Unreliable narration, where the narrator deliberately misleads',
      ],
      answer: 0,
      explanation: 'Satire exaggerates the present rather than inventing a future. School™ trademarks education itself; parents select their children\'s features from a catalogue; a corporation offers customer-service condolences for a death it caused. The comedy curdles into horror precisely because each step is a small extension of something already recognisable.'
    },

    /* ---------------- Module C: The Craft of Writing ---------------- */
    {
      id: 'eng-34', topic: 'The Craft of Writing', difficulty: 2, type: 'mc',
      prompt: 'In Module C, the smartest preparation is to:',
      options: [
        'Prepare ONE flexible core — persona, setting, central image and a turn — that can be delivered as either imaginative or discursive',
        'Memorise one complete imaginative piece and reproduce it whatever the question asks',
        'Prepare four separate pieces, one for each likely stimulus type',
        'Write nothing in advance and improvise entirely from the stimulus',
      ],
      answer: 0,
      explanation: 'One core, two forms. As imaginative, you dramatise it: scene, sensory detail, sparse dialogue, the turn shown through action or image, and a circular ending that returns to the opening image changed. As discursive, you explore it: open with the same moment as an anecdote, widen to consider the idea from two or three angles, bring in an observation or allusion, and land a considered rather than preachy position. Reproducing a memorised piece wholesale is explicitly penalised.'
    },
    {
      id: 'eng-35', topic: 'The Craft of Writing', difficulty: 3, type: 'mc',
      prompt: 'When a stimulus is provided, the right five minutes of planning asks:',
      options: [
        'Where does this stimulus sit inside MY core — plant it in the opening and echo it at the close',
        'What entirely new story does this stimulus demand',
        'How can I mention the stimulus once in the middle of the piece',
        'Which prescribed text does this stimulus most resemble',
      ],
      answer: 0,
      explanation: 'The pivot, not a restart. Plant the stimulus — image, quote or sentence — in your opening paragraph as an image or an idea, and echo it at the close so the piece is visibly shaped by it. Building an unfamiliar piece from scratch under time pressure sacrifices the crafted language the module actually marks.'
    },
    {
      id: 'eng-36', topic: 'The Craft of Writing', difficulty: 3, type: 'short',
      prompt: 'List the four components of a strong Module C reflection.',
      accept: ['intent stating form audience and purpose then two or three specific language choices quoted from your own piece with technique and effect then the influence of a studied text then an evaluation of effectiveness'],
      keywords: [
        ['intent', 'purpose', 'audience', 'form'],
        ['choice', 'technique', 'quote', 'own piece', 'language', 'device'],
        ['influence', 'studied text', 'composer', 'borrow', 'adapt'],
        ['evaluat', 'judgement', 'effective', 'success'],
      ],
      minKeywords: 3,
      explanation: 'Four moves. Intent: one sentence naming form, audience and purpose. Choices — where the marks live: two or three specific language decisions, each QUOTED FROM YOUR OWN PIECE, with the technique named and the effect explained. Influence: one studied text that shaped a choice, naming the composer and the specific technique borrowed or adapted. Evaluation: a brief judgement of how effectively the piece met its purpose, using an evaluative verb such as "successfully positions" or "deliberately unsettles".'
    },
    {
      id: 'eng-37', topic: 'The Craft of Writing', difficulty: 3, type: 'mc',
      prompt: 'The practical implication of the reflection being worth close to half the marks is that you should:',
      options: [
        'Deliberately build 2–3 "reflectable" techniques into the piece so the reflection writes itself, and protect its time',
        'Write the reflection first and then compose a piece to match it',
        'Keep the creative piece to a single paragraph',
        'Spend the full 40 minutes on the piece and summarise the reflection in one line',
      ],
      answer: 0,
      explanation: 'Plant the material you intend to discuss — an extended metaphor, a structural choice, a deliberate shift in sentence length or person. Then guard the clock: plan 5 minutes, piece 22–25, reflection 8–10, check 2. An unfinished reflection bleeds marks that were easier to earn than anything in the creative piece.'
    },
    {
      id: 'eng-38', topic: 'The Craft of Writing', difficulty: 2, type: 'mc',
      prompt: 'If asked to draw on a studied text and free to choose, Slessor transfers well into Module C because he offers:',
      options: [
        'Sensory urban imagery for setting and an object holding memory as a plot device',
        'Extended dialogue models for character interaction',
        'A dystopian setting adaptable to speculative fiction',
        'A film-language vocabulary for describing visual scenes',
      ],
      answer: 0,
      explanation: '\'William Street\' models sensory urban description — neon, rain, grease, food smells — and \'Wild Grapes\' models an object that carries memory, which is a ready-made plot device. Either also works as the named "influence" in your reflection, which is why keeping Slessor as your Module C insurance saves preparation rather than adding to it.'
    },
    {
      id: 'eng-39', topic: 'The Craft of Writing', difficulty: 2, type: 'mc',
      prompt: 'A circular ending in an imaginative piece means:',
      options: [
        'Returning to the opening image or moment, changed by what has happened between',
        'Ending the piece with an unresolved question',
        'Repeating the first paragraph word for word at the close',
        'Telling the story in reverse chronological order',
      ],
      answer: 0,
      explanation: 'The return is what makes the change legible — same image, different meaning, so the reader feels the turn without being told about it. It also gives you something concrete to discuss in the reflection: name the structural choice, quote both instances, explain the effect.'
    },
    {
      id: 'eng-40', topic: 'The Craft of Writing', difficulty: 3, type: 'mc',
      prompt: 'In Paper 2, the single most important instruction before writing Module C is to:',
      options: [
        'Read both parts of the question, since the piece and the reflection may set different requirements',
        'Decide immediately whether to write imaginative or discursive',
        'Count the marks allocated to each part',
        'Choose which prescribed text to reference',
      ],
      answer: 0,
      explanation: 'Module C may come in two parts, and the second part frequently changes what the first one needs to contain — a nominated audience, a required form, or a text you must reference. Reading both first costs thirty seconds and prevents writing a piece the reflection cannot then discuss. The same discipline applies across Paper 2: all questions are unseen, so engage the actual command verb rather than recycling a prepared response.'
    },
    {
      id: 'eng-41', topic: 'The Craft of Writing', difficulty: 4, type: 'short',
      prompt: 'Write the opening sentence of a Module C reflection that states intent.',
      accept: ['i crafted an imaginative piece for a reflective adult audience to convey how memory attaches itself to ordinary objects'],
      keywords: [
        ['imaginative', 'discursive', 'piece', 'wrote', 'crafted', 'composed'],
        ['audience', 'reader'],
        ['convey', 'purpose', 'explore', 'position', 'evoke', 'to '],
      ],
      minKeywords: 3,
      explanation: 'The template names all three elements at once: form, audience, purpose. For example, "I crafted an imaginative piece for a reflective adult audience to convey how memory attaches itself to ordinary objects." One sentence, and the marker knows exactly what to assess the rest of the reflection against. Then move straight to your quoted choices, which is where the marks are concentrated.'
    },
    {
      id: 'eng-42', topic: 'The Craft of Writing', difficulty: 2, type: 'mc',
      prompt: 'A discursive piece differs from an imaginative one chiefly in that it:',
      options: [
        'Explores an idea from several angles in a crafted personal voice, rather than dramatising it as a scene',
        'Must be written in third person rather than first',
        'Requires a formal thesis and topic sentences like an essay',
        'Cannot include personal anecdote or humour',
      ],
      answer: 0,
      explanation: 'Discursive writing muses. It typically opens with a personal anecdote, widens to consider the idea from two or three angles, brings in an observation or allusion, and lands on a considered position without preaching. The voice is first person, conversational but crafted, and a wry tone is welcome — the difference from an essay is that it explores rather than argues to a predetermined conclusion.'
    },
  ]
};
