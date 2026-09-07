/* NSW HSC English Standard — Common Module: Texts and Human Experiences,
   Module A: Language, Identity and Culture, Module B: Close Study of Literature,
   Module C: The Craft of Writing, plus techniques and exam skills.

   Questions are written to be text-agnostic where possible, since prescribed
   texts vary between schools. */

export const SUBJECT = {
  id: 'english',
  name: 'English Standard',
  short: 'ENG',
  colour: '#b06fe0',
  syllabus: 'NSW HSC English Standard',
  topics: ['Texts and Human Experiences', 'Language, Identity and Culture', 'Close Study of Literature', 'The Craft of Writing', 'Techniques'],
  questions: [

    /* ---------------- Common Module ---------------- */
    {
      id: 'eng-01', topic: 'Texts and Human Experiences', difficulty: 1, type: 'mc',
      prompt: 'The Common Module requires you to explore how texts represent:',
      options: [
        'Individual and collective human experiences',
        'The historical context of the composer only',
        'The differences between prose and poetry',
        'The influence of Australian identity on literature',
      ],
      answer: 0,
      explanation: 'The Common Module is "Texts and Human Experiences" — individual AND collective experiences, human qualities and emotions, anomalies, paradoxes and inconsistencies in human behaviour and motivations, and the way storytelling itself shapes and reflects lives. An essay that discusses only the individual is answering half the module.'
    },
    {
      id: 'eng-02', topic: 'Texts and Human Experiences', difficulty: 2, type: 'mc',
      prompt: 'In the Common Module, an "anomaly" or "paradox" in human behaviour refers to:',
      options: [
        'A grammatical error in the text',
        'A moment where behaviour contradicts expectation or a character contradicts themselves',
        'A gap in the plot the composer failed to resolve',
        'A difference between the text and its historical source',
      ],
      answer: 1,
      explanation: 'Anomalies and paradoxes are contradictions and inconsistencies in human behaviour — the character who acts against their stated values, the collective that behaves in ways no individual member would. These moments are where the highest-band analysis lives, because they resist simple thematic statements about the text.'
    },
    {
      id: 'eng-03', topic: 'Texts and Human Experiences', difficulty: 3, type: 'short',
      prompt: 'Explain the difference between an individual and a collective human experience.',
      accept: ['an individual experience belongs to one person while a collective experience is shared by a group or society'],
      keywords: [
        ['individual', 'one person', 'personal', 'single'],
        ['collective', 'group', 'shared', 'community', 'society', 'many'],
      ],
      minKeywords: 2,
      explanation: 'Individual experiences belong to a single person — a particular grief, a particular realisation. Collective experiences are shared by a group, community or society — war, migration, oppression, celebration. The strongest essays show the relationship BETWEEN them: how an individual experience is shaped by the collective, or how one person\'s story comes to represent many.'
    },
    {
      id: 'eng-04', topic: 'Texts and Human Experiences', difficulty: 3, type: 'mc',
      prompt: 'Which sentence makes the strongest thesis for a Common Module essay?',
      options: [
        'This essay will discuss human experiences in the text.',
        'The text shows that human experiences are important and interesting.',
        'By fracturing chronology, the text suggests that traumatic experience resists coherent narration, unsettling the reader\'s desire for resolution.',
        'The composer uses many techniques to represent human experiences effectively.',
      ],
      answer: 2,
      explanation: 'A strong thesis names a specific formal choice (fractured chronology), makes an arguable claim about meaning (trauma resists narration) and identifies an effect on the reader. The others announce intention, state the obvious, or gesture vaguely at "techniques". Markers reward a proposition someone could disagree with.'
    },
    {
      id: 'eng-05', topic: 'Texts and Human Experiences', difficulty: 4, type: 'short',
      prompt: 'Why is it insufficient to simply identify a technique in a body paragraph?',
      accept: ['you must analyse how the technique creates meaning and connects to the module rather than just naming it'],
      keywords: [
        ['effect', 'meaning', 'how', 'why', 'creates', 'shapes', 'positions'],
        ['analys', 'analyz', 'explain', 'link', 'connect', 'relate'],
        ['module', 'thesis', 'argument', 'question', 'idea', 'responder', 'reader', 'audience'],
      ],
      minKeywords: 2,
      explanation: 'Technique-spotting describes the text; analysis explains what the choice DOES — how it positions the responder, what meaning it constructs, and how that supports your thesis and the module concern. The reliable structure is: claim → evidence → analysis of effect → link back to the argument. Naming a metaphor earns nothing on its own.'
    },
    {
      id: 'eng-06', topic: 'Texts and Human Experiences', difficulty: 5, type: 'short',
      prompt: 'Explain how the FORM of a text can itself represent a human experience.',
      accept: ['formal choices such as structure and perspective mirror the experience so form enacts meaning rather than just containing it'],
      keywords: [
        ['form', 'structure', 'chronolog', 'perspective', 'point of view', 'genre', 'stage', 'verse', 'fragment'],
        ['mirror', 'reflect', 'enact', 'embod', 'replicate', 'parallel', 'mimic'],
        ['experience', 'meaning', 'reader', 'audience', 'effect'],
      ],
      minKeywords: 2,
      explanation: 'Form is an argument, not a container. Fragmented structure can enact the disorientation of trauma; a first-person unreliable narrator can make the reader experience self-deception rather than merely observe it; the constraints of a sonnet can perform the pressure of contained emotion. Writing about form this way is one of the clearest markers of a Band 6 response, because it treats the composer\'s decisions as meaningful rather than decorative.'
    },

    /* ---------------- Module A ---------------- */
    {
      id: 'eng-07', topic: 'Language, Identity and Culture', difficulty: 1, type: 'mc',
      prompt: 'Module A (Language, Identity and Culture) focuses on how language:',
      options: [
        'Follows fixed grammatical rules across all cultures',
        'Shapes and reflects personal and cultural identity',
        'Has changed historically from Old to Modern English',
        'Should be corrected to a single standard form',
      ],
      answer: 1,
      explanation: 'Module A examines the reciprocal relationship: language expresses identity, and language also shapes it. Key concerns include how texts represent particular cultures, how language can include or exclude, and how the responder\'s own cultural assumptions affect their reading.'
    },
    {
      id: 'eng-08', topic: 'Language, Identity and Culture', difficulty: 2, type: 'mc',
      prompt: 'When a text includes untranslated words from a character\'s first language, the most likely effect is to:',
      options: [
        'Confuse the reader and weaken the text',
        'Assert cultural identity and position the reader as an outsider to some degree',
        'Demonstrate the composer\'s language proficiency',
        'Make the text more difficult to publish',
      ],
      answer: 1,
      explanation: 'Untranslated language refuses to make a culture entirely accessible on the dominant language\'s terms. It asserts the validity of that language, marks identity, and briefly repositions the reader as the outsider — a reversal that is often the point. Discuss the effect on the responder, not just the presence of the words.'
    },
    {
      id: 'eng-09', topic: 'Language, Identity and Culture', difficulty: 3, type: 'short',
      prompt: 'Explain what is meant by a text "positioning" the responder.',
      accept: ['the composer uses language choices to shape how the reader interprets and judges what is represented'],
      keywords: [
        ['composer', 'author', 'writer', 'text', 'choices', 'language', 'technique'],
        ['shape', 'influence', 'guide', 'direct', 'encourage', 'invite', 'construct'],
        ['reader', 'responder', 'audience', 'view', 'judge', 'interpret', 'sympath', 'perspective'],
      ],
      minKeywords: 2,
      explanation: 'Positioning is the way textual choices guide the responder towards particular judgements — whose perspective we occupy, who is granted interiority, what is withheld, what diction and tone imply. Saying "the composer positions the responder to sympathise with X through Y" is far stronger than "the reader feels sorry for X", because it credits the choice rather than the reaction.'
    },
    {
      id: 'eng-10', topic: 'Language, Identity and Culture', difficulty: 4, type: 'mc',
      prompt: 'A text represents a marginalised community using only the perspective of an outside observer. The most useful critical observation is that:',
      options: [
        'The text is factually inaccurate',
        'The perspective controls whose voice is heard and whose is mediated, which shapes the culture\'s representation',
        'The text should have been written by a member of the community',
        'The text is unsuitable for study',
      ],
      answer: 1,
      explanation: 'The analytical move is to interrogate the perspective rather than to judge the composer. Ask who narrates, who is spoken about rather than speaking, what the outsider notices and cannot notice, and how that mediation shapes the responder\'s understanding. That is a Module A argument; the other options are assertions, not analysis.'
    },
    {
      id: 'eng-11', topic: 'Language, Identity and Culture', difficulty: 5, type: 'short',
      prompt: 'Explain how a responder\'s own context can affect their reading of a text about culture.',
      accept: ['a responders values and cultural background shape what they notice and how they judge the representation so meaning is not fixed'],
      keywords: [
        ['context', 'background', 'values', 'experience', 'culture', 'assumption', 'belief'],
        ['reading', 'interpret', 'meaning', 'understand', 'notice', 'judge', 'respond'],
        ['differ', 'vary', 'not fixed', 'change', 'personal', 'shift'],
      ],
      minKeywords: 2,
      explanation: 'Meaning is produced in the encounter between text and responder. A reader whose experience the text represents may read recognition where an outside reader reads exoticism; a reader from a later era may find confronting what contemporaries found unremarkable. Acknowledging this is not relativism — it lets you argue precisely about WHO the text positions and how successfully.'
    },

    /* ---------------- Module B ---------------- */
    {
      id: 'eng-12', topic: 'Close Study of Literature', difficulty: 1, type: 'mc',
      prompt: 'Module B (Close Study of Literature) primarily requires:',
      options: [
        'Comparison of two prescribed texts',
        'Sustained, detailed analysis of a single text and a personal, informed response to it',
        'Research into the composer\'s biography',
        'Rewriting a section of the text in a different form',
      ],
      answer: 1,
      explanation: 'Module B is depth on ONE text: its construction, content and language, developed into a personal and informed interpretation. The word "informed" matters — a personal response must be grounded in textual evidence and an understanding of context and form, not merely stated as preference.'
    },
    {
      id: 'eng-13', topic: 'Close Study of Literature', difficulty: 3, type: 'mc',
      prompt: 'Which best demonstrates a "personal, informed response" in Module B?',
      options: [
        '"I found this text boring and hard to relate to."',
        '"The text is universally regarded as a masterpiece."',
        '"The novel\'s refusal to resolve its central question initially frustrated me, but I came to read that refusal as its central argument about grief."',
        '"Many critics have written about this text\'s themes."',
        ],
      answer: 2,
      explanation: 'A personal informed response takes an actual position, acknowledges how the text produced it, and grounds it in a textual feature. Saying the text was boring is unsupported preference; calling it a universally regarded masterpiece, or noting that many critics have written about it, defers to authority instead of arguing. Markers explicitly reward a distinctive voice — provided it argues.'
    },
    {
      id: 'eng-14', topic: 'Close Study of Literature', difficulty: 3, type: 'short',
      prompt: 'Why is textual integrity a useful concept when studying a single text closely?',
      accept: ['textual integrity means the parts work together as a unified whole so form and content support each other'],
      keywords: [
        ['unity', 'unified', 'whole', 'coherent', 'consistent', 'integrated', 'together'],
        ['form', 'structure', 'language', 'content', 'meaning', 'part'],
        ['support', 'reinforce', 'contribute', 'connect', 'relationship'],
      ],
      minKeywords: 2,
      explanation: 'Textual integrity describes a text whose parts cohere — where form, structure and language work together to sustain meaning, and no element is merely decorative. It gives you an argumentative frame: instead of listing techniques, you show how a motif introduced in the opening is transformed by the close, and why that transformation carries the text\'s argument.'
    },
    {
      id: 'eng-15', topic: 'Close Study of Literature', difficulty: 4, type: 'mc',
      prompt: 'When integrating a critical reading of a text, the strongest approach is to:',
      options: [
        'Quote the critic and accept their view as authoritative',
        'Use the critical view to sharpen or contest your own argument',
        'List several critics to demonstrate wide reading',
        'Avoid critics entirely and rely on personal opinion',
      ],
      answer: 1,
      explanation: 'A critical perspective should do work in your argument — extend it, complicate it, or give you something to push against. Dropping in quotations to demonstrate reading adds length, not marks. In Standard English, a well-handled counter-reading of your own text is usually more valuable than a name-drop.'
    },
    {
      id: 'eng-16', topic: 'Close Study of Literature', difficulty: 5, type: 'short',
      prompt: 'Explain why quoting at length is usually weaker than quoting briefly.',
      accept: ['short embedded quotations leave room for analysis while long quotations take up space without demonstrating understanding'],
      keywords: [
        ['short', 'brief', 'embed', 'integrat', 'concise', 'selective'],
        ['analys', 'analyz', 'discuss', 'explain', 'unpack', 'room', 'space'],
        ['long', 'length', 'fill', 'padding', 'without'],
      ],
      minKeywords: 2,
      explanation: 'A long block quotation consumes space and demonstrates only that you can transcribe. Short quotations embedded in your own sentence prove selection — you have identified the precise words that matter — and leave the word count for analysis, which is what is actually marked. Aim to quote at the level of the phrase, and to analyse specific word choices within it.'
    },

    /* ---------------- Module C ---------------- */
    {
      id: 'eng-17', topic: 'The Craft of Writing', difficulty: 1, type: 'mc',
      prompt: 'Module C (The Craft of Writing) assesses your ability to:',
      options: [
        'Analyse two texts comparatively',
        'Compose imaginative, discursive and persuasive texts, and reflect on your own choices',
        'Memorise and reproduce model essays',
        'Research a topic and present findings',
      ],
      answer: 1,
      explanation: 'Module C asks you to write — imaginative, discursive, persuasive or informative — drawing on the craft of studied model texts, and to reflect on your own compositional decisions. The reflection is examinable: you must be able to explain WHY you made a choice and what effect you intended.'
    },
    {
      id: 'eng-18', topic: 'The Craft of Writing', difficulty: 2, type: 'mc',
      prompt: 'A discursive text is best characterised as one that:',
      options: [
        'Argues a single position and refutes opposing views',
        'Explores an idea from multiple angles, often in a personal and exploratory voice',
        'Narrates a fictional sequence of events',
        'Presents factual information in a neutral register',
      ],
      answer: 1,
      explanation: 'Discursive writing explores rather than argues to a fixed conclusion. It can shift perspective, digress, use anecdote and address the reader directly, and it need not resolve. Persuasive writing, by contrast, drives towards a position. Confusing the two is the most common Module C error — a discursive question answered with a persuasive essay loses marks for form.'
    },
    {
      id: 'eng-19', topic: 'The Craft of Writing', difficulty: 3, type: 'short',
      prompt: 'What should a Module C reflection statement actually do?',
      accept: ['explain the deliberate compositional choices you made and the effect you intended on the reader'],
      keywords: [
        ['choice', 'decision', 'technique', 'structure', 'form', 'language'],
        ['why', 'explain', 'justify', 'purpose', 'intend', 'effect', 'deliberate'],
        ['reader', 'audience', 'responder', 'influence', 'model', 'stimulus'],
      ],
      minKeywords: 2,
      explanation: 'A reflection explains and justifies your compositional decisions: what you were trying to achieve, which specific choices serve that purpose, what effect you intended on the reader, and how studied model texts influenced you. It is not a plot summary of your own piece and not an apology for it. Quote your own writing and analyse it as you would any other text.'
    },
    {
      id: 'eng-20', topic: 'The Craft of Writing', difficulty: 4, type: 'mc',
      prompt: 'A creative response to the stimulus "the door was already open" is strongest when it:',
      options: [
        'Uses the phrase as the opening sentence and then ignores it',
        'Integrates the stimulus so that it carries thematic weight in the piece',
        'Repeats the phrase at the start of each paragraph',
        'Explains the meaning of the stimulus in the final paragraph',
      ],
      answer: 1,
      explanation: 'A stimulus must be integrated, not merely inserted. The strongest responses let it operate on more than one level — a literal detail that also carries the piece\'s central idea. Bolting it on and abandoning it signals a pre-written piece being forced onto the question, which markers detect immediately.'
    },
    {
      id: 'eng-21', topic: 'The Craft of Writing', difficulty: 4, type: 'short',
      prompt: 'Explain why "show, don\'t tell" improves imaginative writing.',
      accept: ['showing through concrete detail lets the reader infer emotion which is more engaging than being told what to feel'],
      keywords: [
        ['detail', 'image', 'action', 'sensory', 'concrete', 'specific', 'dialogue', 'behaviour'],
        ['infer', 'imply', 'work out', 'experience', 'engage', 'immers', 'themselves'],
        ['tell', 'told', 'stating', 'state', 'named', 'abstract', 'emotion'],
      ],
      minKeywords: 2,
      explanation: 'Naming an emotion asks the reader to accept a claim; rendering it through concrete detail, action and dialogue lets the reader infer it, which is both more convincing and more involving. "She was devastated" reports; "she kept setting the second place at the table" creates the reader\'s own realisation. Use telling deliberately for pace and compression, not by default.'
    },
    {
      id: 'eng-22', topic: 'The Craft of Writing', difficulty: 5, type: 'short',
      prompt: 'Explain how sentence-level rhythm can contribute to meaning in your own writing.',
      accept: ['varying sentence length controls pace so short sentences create tension and long sentences create flow or accumulation'],
      keywords: [
        ['short', 'long', 'length', 'vary', 'variation', 'clause'],
        ['pace', 'rhythm', 'tension', 'urgency', 'slow', 'fast', 'breath', 'flow'],
        ['meaning', 'effect', 'emphas', 'reader', 'mirror', 'reinforce'],
      ],
      minKeywords: 2,
      explanation: 'Syntax carries meaning. Short declaratives create urgency, abruptness and finality; long accumulating sentences create flow, or the exhausting pile-up of experience. A sentence that breaks its own pattern lands emphasis on whatever follows. Deliberate rhythm is exactly the kind of choice a reflection statement should be able to name and justify.'
    },

    /* ---------------- Techniques and exam skills ---------------- */
    {
      id: 'eng-23', topic: 'Techniques', difficulty: 1, type: 'mc',
      prompt: '"The city groaned under the weight of another morning" primarily employs:',
      options: ['Simile', 'Personification', 'Hyperbole', 'Onomatopoeia'],
      answer: 1,
      explanation: 'Personification gives human qualities ("groaned", "weight" as burden) to the non-human city. Note there is no "like" or "as", ruling out simile. Naming the technique is the first step; the marks come from explaining that the personification transfers human exhaustion onto the urban environment, making the setting an extension of the inhabitants\' state.'
    },
    {
      id: 'eng-24', topic: 'Techniques', difficulty: 2, type: 'mc',
      prompt: 'Juxtaposition is best defined as:',
      options: [
        'Repeating a word at the start of successive clauses',
        'Placing two contrasting elements side by side to highlight difference',
        'A direct comparison using "like" or "as"',
        'An implied reference to another text',
      ],
      answer: 1,
      explanation: 'Juxtaposition places contrasting elements together so each throws the other into relief. Distinguish from: anaphora (repetition at the start of clauses), simile (explicit comparison), allusion (implied reference), and antithesis (contrast in balanced grammatical structure). Precision with terminology is itself assessed.'
    },
    {
      id: 'eng-25', topic: 'Techniques', difficulty: 2, type: 'short',
      prompt: 'Define "motif" and explain how it differs from a theme.',
      accept: ['a motif is a recurring image or detail while a theme is the underlying idea the motif helps develop'],
      keywords: [
        ['recur', 'repeat', 'repeated', 'returns', 'throughout'],
        ['image', 'object', 'symbol', 'detail', 'element', 'phrase'],
        ['theme', 'idea', 'concept', 'message', 'abstract', 'meaning'],
      ],
      minKeywords: 2,
      explanation: 'A motif is a concrete recurring element — an image, object, phrase or sound — that accumulates meaning through repetition. A theme is the abstract idea the text explores. Motifs are how themes are built: tracing a motif\'s transformation across a text is a reliable way to construct a Module B argument about textual integrity.'
    },
    {
      id: 'eng-26', topic: 'Techniques', difficulty: 3, type: 'mc',
      prompt: 'In a film, a low-angle shot of a character most typically:',
      options: [
        'Makes them appear powerful or dominant',
        'Suggests they are vulnerable or insignificant',
        'Indicates a flashback is occurring',
        'Signals the character is dishonest',
      ],
      answer: 0,
      explanation: 'Low angle looks up at the subject, conferring power and dominance; high angle looks down, diminishing them. Other visual techniques worth having ready: framing, close-up (intimacy or intensity), long shot (isolation), lighting and chiaroscuro, colour palette, mise-en-scène, diegetic and non-diegetic sound, and editing pace.'
    },
    {
      id: 'eng-27', topic: 'Techniques', difficulty: 3, type: 'mc',
      prompt: 'Enjambment in poetry refers to:',
      options: [
        'A pause at the end of a line marked by punctuation',
        'A sentence or phrase running over the line break without pause',
        'The repetition of consonant sounds',
        'A regular pattern of stressed and unstressed syllables',
      ],
      answer: 1,
      explanation: 'Enjambment carries sense across the line break, creating momentum, spilling one idea into the next, or setting up a surprise when the next line redirects the meaning. Its opposite is the end-stopped line, which creates closure and control. The effect always depends on WHERE the break falls — analyse the specific word left hanging.'
    },
    {
      id: 'eng-28', topic: 'Techniques', difficulty: 4, type: 'short',
      prompt: 'Explain the effect of an unreliable first-person narrator.',
      accept: ['the reader must question the narrators account and read against it creating irony and active interpretation'],
      keywords: [
        ['question', 'doubt', 'distrust', 'suspicious', 'against', 'beyond', 'behind'],
        ['irony', 'gap', 'discrepan', 'contradict', 'inconsist'],
        ['reader', 'responder', 'active', 'interpret', 'work out', 'engage'],
      ],
      minKeywords: 2,
      explanation: 'An unreliable narrator opens a gap between what is said and what the reader concludes, producing dramatic irony and forcing active interpretation. It also makes the narrator\'s self-deception the real subject: we watch someone construct a version of themselves. In Common Module terms, it is a direct way of representing the inconsistencies in human behaviour and motivation.'
    },
    {
      id: 'eng-29', topic: 'Techniques', difficulty: 4, type: 'mc',
      prompt: 'A composer uses cumulative listing: "the noise, the heat, the endless queuing, the forms, the waiting." The most likely effect is to:',
      options: [
        'Create a sense of accumulation and overwhelm',
        'Establish a formal, academic register',
        'Provide factual clarification for the reader',
        'Slow the pace to create calm',
      ],
      answer: 0,
      explanation: 'Cumulative listing (accumulation) piles items without hierarchy, replicating the experience of being overwhelmed and making the reader feel the weight rather than be told about it. Note the asyndeton — omitted conjunctions — which accelerates the list. Always tie the technique to the specific experience being represented.'
    },
    {
      id: 'eng-30', topic: 'Techniques', difficulty: 1, type: 'short',
      prompt: 'What is the difference between tone and mood?',
      accept: ['tone is the composers attitude conveyed by language while mood is the atmosphere the reader feels'],
      keywords: [
        ['tone', 'attitude', 'composer', 'writer', 'speaker', 'voice'],
        ['mood', 'atmosphere', 'feeling', 'reader', 'audience', 'evoke', 'created'],
      ],
      minKeywords: 2,
      explanation: 'Tone is the attitude of the composer or persona towards the subject, conveyed through diction, syntax and imagery — ironic, elegiac, indignant. Mood (atmosphere) is what the responder is made to feel — ominous, melancholy, tense. A text can have a detached tone and generate a distressing mood; that mismatch is often analytically productive.'
    },
    {
      id: 'eng-31', topic: 'Texts and Human Experiences', difficulty: 2, type: 'mc',
      prompt: 'In an unseen texts section, the most efficient first step is to:',
      options: [
        'Write down every technique you can identify',
        'Read the question to determine what is being asked, then read the text for that',
        'Summarise the plot of the text',
        'Compare the text to your prescribed text',
      ],
      answer: 1,
      explanation: 'Read the question first: it tells you what to look for and prevents you from annotating material you will not use. Then note the mark allocation — a 3-mark answer needs roughly one developed point with evidence and effect, a 5-mark answer two or three. Answer the question asked, not the one you prepared for.'
    },
    {
      id: 'eng-32', topic: 'Texts and Human Experiences', difficulty: 3, type: 'mc',
      prompt: 'A question asks you to "evaluate" a statement about your prescribed text. This requires you to:',
      options: [
        'Describe the events of the text in order',
        'Make and sustain a judgement about the statement\'s validity, supported by textual evidence',
        'List the techniques the composer uses',
        'Compare the text with a related text',
      ],
      answer: 1,
      explanation: 'Evaluate = make a judgement of value or validity and sustain it. Compare with the other NESA directives: analyse (identify components and relationships), explain (make cause and effect clear), assess (determine value or significance), discuss (issues for and against), and explore (examine in detail). Misreading the verb is one of the most costly and most avoidable errors.'
    },
    {
      id: 'eng-33', topic: 'Texts and Human Experiences', difficulty: 4, type: 'short',
      prompt: 'Why should an essay engage directly with the wording of the question rather than reciting a prepared response?',
      accept: ['markers assess how well you address the specific question so a prepared essay that ignores its wording cannot score highly'],
      keywords: [
        ['specific', 'wording', 'directive', 'terms', 'asked', 'question'],
        ['prepared', 'memoris', 'memoriz', 'pre written', 'generic', 'rehears'],
        ['mark', 'address', 'respond', 'relevan', 'score', 'band'],
      ],
      minKeywords: 2,
      explanation: 'Marking criteria reward a response to the question actually set. A memorised essay may contain accurate analysis and still sit in a middle band because it does not address the terms given. The workable approach is to prepare flexible arguments and evidence, then build the thesis around the question\'s specific wording — and to use that wording explicitly in your topic sentences.'
    },
    {
      id: 'eng-34', topic: 'Close Study of Literature', difficulty: 2, type: 'mc',
      prompt: 'Which is the best topic sentence for a body paragraph?',
      options: [
        'In chapter four, the protagonist leaves home.',
        'The composer uses symbolism, imagery and metaphor.',
        'The protagonist\'s departure reframes home as something chosen rather than inherited, unsettling the text\'s earlier certainties about belonging.',
        'This paragraph will discuss the theme of belonging.',
      ],
      answer: 2,
      explanation: 'A topic sentence should assert an arguable idea that advances the thesis. Naming what happens in chapter four narrates; listing symbolism, imagery and metaphor names techniques without making a claim; announcing that the paragraph will discuss belonging states an intention. The sentence about departure reframing home makes a specific claim about meaning that the rest of the paragraph can prove with evidence and analysis.'
    },
    {
      id: 'eng-35', topic: 'Language, Identity and Culture', difficulty: 2, type: 'short',
      prompt: 'Give one reason a composer might use colloquial language or dialect in a text.',
      accept: ['colloquial language creates authentic voice and signals a characters cultural or social identity'],
      keywords: [
        ['authentic', 'realistic', 'genuine', 'voice', 'natural'],
        ['identity', 'culture', 'class', 'region', 'background', 'belong', 'community'],
        ['character', 'relate', 'connect', 'reader', 'immediacy', 'intimacy'],
      ],
      minKeywords: 2,
      explanation: 'Colloquialism and dialect create an authentic voice, situate a character within a specific culture, class or region, and can build intimacy with readers who share that idiom while marking distance for those who do not. In Module A terms, the choice asserts that this way of speaking is legitimate literary language — a claim about whose identity gets represented on its own terms.'
    },
    {
      id: 'eng-36', topic: 'Techniques', difficulty: 5, type: 'mc',
      prompt: 'A poem\'s final line breaks the regular metre it has maintained throughout. The most sophisticated reading is that:',
      options: [
        'The poet made a technical error',
        'The disruption enacts the poem\'s meaning at the level of form, giving the departure emphasis',
        'The line should be read faster than the others',
        'The poem is unfinished',
      ],
      answer: 1,
      explanation: 'A metrical pattern establishes an expectation; breaking it makes the reader feel the departure before analysing it. Where the break falls at a moment of rupture, loss or realisation in the poem\'s content, form and meaning coincide — the strongest kind of formal analysis, and exactly what textual integrity describes.'
    },
  ]
};
