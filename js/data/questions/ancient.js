/* NSW HSC Ancient History.

   Targeted at this course's four sections: the compulsory core study (Cities
   of Vesuvius), the ancient society (Sparta), the personality (Xerxes) and
   the historical period (The Greek World 500-440 BC).

   Several questions deliberately drill the errors that cost marks in the
   trial: ephors confused with the gerousia, Miltiades credited to
   Themistocles, Sardis placed in Persia, and Egypt confused with Babylon. */

export const SUBJECT = {
  id: 'ancient',
  name: 'Ancient History',
  short: 'ANC',
  colour: '#d98f5a',
  syllabus: 'NSW HSC Ancient History',
  topics: ['Cities of Vesuvius', 'Sparta', 'Xerxes', 'The Greek World 500–440 BC'],
  questions: [

    /* ---------------- Cities of Vesuvius (core) ---------------- */
    {
      id: 'anc-01', topic: 'Cities of Vesuvius', difficulty: 1, type: 'mc',
      prompt: 'In which year did the eruption of Mount Vesuvius bury Pompeii and Herculaneum?',
      options: ['AD 62', 'AD 79', 'AD 96', 'AD 117'],
      answer: 1,
      explanation: 'AD 79. The traditional date of 24 August comes from a manuscript of Pliny the Younger, but a charcoal inscription uncovered in 2018, together with autumn fruit remains and heavier clothing on victims, points to an October eruption. Note the separate earlier earthquake of AD 62 (Seneca) or AD 63 (Tacitus), from which both towns were still rebuilding.'
    },
    {
      id: 'anc-02', topic: 'Cities of Vesuvius', difficulty: 1, type: 'mc',
      prompt: 'Our only surviving eyewitness account of the AD 79 eruption was written by:',
      options: ['Tacitus', 'Pliny the Elder', 'Pliny the Younger', 'Suetonius'],
      answer: 2,
      explanation: 'Pliny the Younger, in two letters to Tacitus written about 25 years later. He watched from Misenum across the bay; his uncle Pliny the Elder sailed towards the eruption and died at Stabiae. The letters give us the eruption column ("like an umbrella pine"), the ash fall, the tremors and the panic — and the term "Plinian eruption".'
    },
    {
      id: 'anc-03', topic: 'Cities of Vesuvius', difficulty: 2, type: 'mc',
      prompt: 'Organic material such as wooden furniture, doors and food survives far better at Herculaneum than Pompeii because:',
      options: [
        'Herculaneum was buried by hot pyroclastic surges and flows that carbonised the material and sealed it deeply',
        'Herculaneum was abandoned before the eruption, so nothing burned',
        'Herculaneum was excavated much earlier, before decay set in',
        'Herculaneum was buried by mud that kept the material permanently wet',
      ],
      answer: 0,
      explanation: 'Pompeii was buried mainly by pumice and ash fall, then surges; Herculaneum was struck by successive pyroclastic surges and flows burying it up to about 20 metres deep. The intense heat carbonised organic material rather than destroying it, and the depth sealed it from oxygen — hence surviving beds, roof beams, rope, bread and the Villa of the Papyri scrolls.'
    },
    {
      id: 'anc-04', topic: 'Cities of Vesuvius', difficulty: 2, type: 'mc',
      prompt: 'Giuseppe Fiorelli is best known for:',
      options: [
        'Removing frescoes for display in the Naples museum',
        'Developing the plaster-cast technique and dividing Pompeii into regions and insulae',
        'Excavating the Villa of the Papyri by tunnelling',
        'Proving the eruption occurred in October',
      ],
      answer: 1,
      explanation: 'Fiorelli (director from 1863) poured plaster into the voids left by decayed bodies, producing casts that preserved posture and clothing detail. He also introduced systematic stratigraphic excavation from the top down, and the regio/insula/doorway numbering system still used today. Contrast with the earlier treasure-hunting of the Bourbon period.'
    },
    {
      id: 'anc-05', topic: 'Cities of Vesuvius', difficulty: 3, type: 'short',
      prompt: 'Explain ONE limitation of using Pompeian graffiti as historical evidence.',
      accept: ['graffiti is anonymous and undated so it cannot be reliably attributed or placed in context'],
      keywords: [
        ['anonymous', 'unknown', 'who wrote', 'attribut', 'author', 'undated', 'date'],
        ['context', 'bias', 'humour', 'joke', 'exagger', 'literal', 'representative', 'sample', 'literate', 'literacy'],
      ],
      minKeywords: 1,
      explanation: 'Limitations: the writer is usually anonymous and undatable; graffiti records only those able to write, so it is unrepresentative; intent is often unclear (boast, joke, insult, advertisement); and survival is accidental, so what remains is not a balanced sample. Its value is that it gives voice to non-elite Pompeians — electoral notices, prices, gladiator results, complaints — which the literary sources almost entirely omit.'
    },
    {
      id: 'anc-06', topic: 'Cities of Vesuvius', difficulty: 3, type: 'mc',
      prompt: 'The riot in the Pompeian amphitheatre in AD 59 between Pompeians and Nucerians is recorded by:',
      options: ['Pliny the Younger', 'Tacitus', 'Vitruvius', 'Strabo'],
      answer: 1,
      explanation: 'Tacitus, Annals 14.17. The Senate banned gladiatorial games at Pompeii for ten years as punishment. The event is also depicted in a well-known fresco from a Pompeian house showing fighting inside and around the amphitheatre — a useful example of written and archaeological evidence corroborating each other.'
    },
    {
      id: 'anc-07', topic: 'Cities of Vesuvius', difficulty: 3, type: 'mc',
      prompt: 'Water was distributed through Pompeii from the Serino aqueduct via:',
      options: [
        'Wells sunk into the water table in each insula',
        'The castellum aquae, then lead pipes to public fountains, baths and private houses',
        'Open channels running down the centre of each street',
        'Cisterns filled by rainwater alone',
      ],
      answer: 1,
      explanation: 'Water entered at the castellum aquae near the Vesuvian Gate and was distributed through lead pipes, with water towers maintaining pressure. Public fountains had priority, then baths, then private houses — a piped supply to your own house was a marker of wealth and status. Rainwater cisterns and wells remained as backup.'
    },
    {
      id: 'anc-08', topic: 'Cities of Vesuvius', difficulty: 4, type: 'mc',
      prompt: 'Estelle Lazer\'s study of the Pompeian skeletal remains is significant because it:',
      options: [
        'Proved that the victims were mostly slaves left behind by their owners',
        'Applied forensic analysis to a large sample, challenging assumptions that victims were the weak or elderly',
        'Established the precise date of the eruption',
        'Demonstrated that most residents escaped before the eruption began',
      ],
      answer: 1,
      explanation: 'Lazer analysed disarticulated bones stored at Pompeii, using forensic anthropology to estimate age, sex, height and pathology. Her findings undercut the romantic assumption that those who died were disproportionately the old, infirm or enslaved — the sample resembled a normal population. It is a model example of new methods reinterpreting long-held conclusions.'
    },
    {
      id: 'anc-09', topic: 'Cities of Vesuvius', difficulty: 4, type: 'short',
      prompt: 'Outline TWO threats to the conservation of Pompeii and Herculaneum today.',
      accept: ['mass tourism causes wear and weathering and exposure damages structures while funding is limited'],
      keywords: [
        ['tourism', 'tourist', 'visitor', 'foot traffic', 'wear'],
        ['weather', 'rain', 'sun', 'exposure', 'erosion', 'collapse', 'vegetation', 'earthquake'],
        ['fund', 'money', 'resource', 'management', 'looting', 'theft', 'vandal', 'pollution'],
      ],
      minKeywords: 2,
      explanation: 'Threats: roughly 2.5 million visitors a year causing physical wear; exposure to sun, rain and vegetation once structures are unearthed; structural collapse (the Schola Armaturarum in 2010); looting and vandalism; pollution; seismic activity; and chronically inconsistent funding and management. The Great Pompeii Project, EU-funded from 2012, was the response. A strong answer also notes the underlying tension: excavation itself is the primary cause of decay, which is why large areas are deliberately left unexcavated.'
    },
    {
      id: 'anc-10', topic: 'Cities of Vesuvius', difficulty: 2, type: 'short',
      prompt: 'What was garum, and why is it significant for understanding Pompeii\'s economy?',
      accept: ['garum was a fermented fish sauce produced and exported from pompeii showing local industry and trade'],
      keywords: [
        ['fish', 'fermented', 'sauce', 'condiment'],
        ['produce', 'manufactur', 'industry', 'trade', 'export', 'sold', 'economy', 'business'],
        ['scaurus', 'amphora', 'urceus', 'label'],
      ],
      minKeywords: 2,
      explanation: 'Garum was a fermented fish sauce used across the Roman world. Pompeii produced it commercially — amphorae stamped with the name of Umbricius Scaurus have been found widely, and his house features mosaic depictions of garum vessels. It is direct evidence of specialised local manufacturing, branding and export trade, alongside wine, wool-working and bakeries.'
    },
    {
      id: 'anc-11', topic: 'Cities of Vesuvius', difficulty: 5, type: 'short',
      prompt: 'Assess the ethical issues raised by displaying the body casts and human remains of Vesuvius victims.',
      accept: ['displaying human remains can educate the public but treats real victims as spectacle without their consent'],
      keywords: [
        ['consent', 'dignity', 'respect', 'spectacle', 'voyeur', 'exploit', 'sensational'],
        ['educat', 'research', 'understand', 'evidence', 'science', 'public', 'value'],
        ['human', 'remains', 'victim', 'dead', 'body', 'people'],
      ],
      minKeywords: 2,
      explanation: 'Arguments for display: the casts communicate the human reality of the disaster more powerfully than any artefact, and continued study yields genuine scientific knowledge. Arguments against: these were real people who cannot consent; display can become spectacle; and there is a live question about descendant communities and the appropriate treatment of the dead. A strong response also notes the conservation dimension — repeated handling and display damage the casts — and reaches a judgement rather than listing both sides.'
    },
    {
      id: 'anc-12', topic: 'Cities of Vesuvius', difficulty: 3, type: 'mc',
      prompt: 'The Villa of the Papyri at Herculaneum is most significant for:',
      options: [
        'Its collection of Greek and Roman bronze sculpture and a library of carbonised scrolls',
        'Being the only building to survive the eruption intact',
        'Containing the largest surviving Roman bath complex',
        'Its inscription recording the date of the eruption',
      ],
      answer: 0,
      explanation: 'Excavated by tunnelling under Karl Weber in the 18th century, the villa yielded an outstanding sculpture collection and around 1800 carbonised papyrus scrolls — largely Epicurean philosophy, including works of Philodemus. Modern imaging and AI-assisted "virtual unwrapping" is now reading scrolls that could never be physically opened.'
    },

    /* ---------------- Ancient Societies ---------------- */
    {
      id: 'anc-32', topic: 'Cities of Vesuvius', difficulty: 2, type: 'mc',
      prompt: 'A lararium found in a Pompeian house was used for:',
      options: [
        'Storing wine and oil amphorae',
        'Household worship of the lares and other protective deities',
        'Heating water for the private baths',
        'Displaying ancestral death masks in the atrium',
      ],
      answer: 1,
      explanation: 'The lararium was the household shrine to the lares, the penates and the genius of the paterfamilias — evidence of daily domestic religion, found in atria, kitchens and gardens. Public religion at Pompeii included the Capitoline triad in the forum temple, the imperial cult, and notably the Temple of Isis, which was fully rebuilt after the AD 62 earthquake.'
    },
    {
      id: 'anc-33', topic: 'Cities of Vesuvius', difficulty: 4, type: 'mc',
      prompt: 'The presence of over 300 skeletons in the boat sheds at Herculaneum revised earlier views by showing that:',
      options: [
        'Herculaneum was more populous than Pompeii',
        'Many residents did not escape, but died sheltering at the shoreline',
        'The eruption occurred at night while residents slept',
        'The town was evacuated successfully before the surges arrived',
      ],
      answer: 1,
      explanation: 'Until the boat sheds were excavated from the 1980s, the small number of bodies found within Herculaneum suggested near-total evacuation. The shoreline finds showed large numbers had gathered awaiting rescue and were killed by the pyroclastic surges — the extreme heat causing instantaneous death. It transformed the accepted narrative of the town\'s final hours.'
    },

    {
      id: 'anc-36', topic: 'Cities of Vesuvius', difficulty: 1, type: 'mc',
      prompt: 'A thermopolium in Pompeii was a:',
      options: ['Public bath house', 'Counter-service food and drink shop', 'Bakery with attached mill', 'Public latrine'],
      answer: 1,
      explanation: 'A thermopolium served hot food and drink from dolia (large jars) set into a masonry counter — the Roman equivalent of a takeaway. Around 150 have been identified at Pompeii. Their number is evidence that many residents, especially in upper-floor apartments without kitchens, ate out routinely: an inference about daily life drawn from building function alone.'
    },
    /* ------- Xerxes: survey of the Persian empire ------- */
    {
      id: 'per-01', topic: 'Xerxes', difficulty: 1, type: 'mc',
      prompt: 'The Achaemenid Empire was founded by:',
      options: ['Darius I', 'Cyrus II (the Great)', 'Cambyses II', 'Xerxes I'],
      answer: 1,
      explanation: 'Cyrus II (559-530 BC) took Media in 550, Lydia around 546 and Babylon in 539, creating the largest empire the Near East had seen. Learn the sequence: Cyrus II, Cambyses II, Darius I, Xerxes I, Artaxerxes I.'
    },
    {
      id: 'per-02', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'The Cyrus Cylinder is significant to historians because it:',
      options: [
        'Lists the annual tribute owed by every satrapy',
        'Presents Cyrus as restoring local cults and returning deported peoples, in the Babylonian royal tradition',
        'Records the Persian defeat at Salamis',
        'Contains the earliest Zoroastrian scripture'
      ],
      answer: 1,
      explanation: 'Written in Akkadian and found at Babylon, it casts Cyrus as chosen by Marduk to restore order after the impious Nabonidus. It is royal propaganda in a conventional Babylonian form, not a "charter of human rights" as it is sometimes popularly described, though it does reflect a real policy of conciliating subject peoples.'
    },
    {
      id: 'per-03', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'A satrapy was:',
      options: [
        'An elite Persian infantry regiment',
        'A province of the empire governed by a satrap on the King\'s behalf',
        'The royal treasury at Persepolis',
        'A council of Persian nobles advising the King'
      ],
      answer: 1,
      explanation: 'Darius I organised the empire into roughly twenty satrapies with fixed tribute. Power was deliberately split: the satrap governed, but a garrison commander and a royal secretary reported separately to the King, and travelling inspectors (the "King\'s Eye") checked on them all.'
    },
    {
      id: 'per-04', topic: 'Xerxes', difficulty: 2, type: 'short',
      prompt: 'What was the Royal Road, and what was it for?',
      accept: ['a highway from susa to sardis with staging posts that let royal messengers cross the empire quickly'],
      keywords: [
        ['susa', 'sardis', 'road', 'highway', 'route'],
        ['messenger', 'courier', 'post', 'staging', 'relay', 'communication', 'travel'],
        ['quick', 'fast', 'rapid', 'days', 'speed', 'control', 'administration']
      ],
      minKeywords: 2,
      explanation: 'The Royal Road ran roughly 2,700 km from Susa to Sardis with over a hundred staging posts holding fresh horses and riders. Herodotus says a royal courier could cover it in about nine days where an ordinary traveller took ninety. It is the clearest example of Persian administrative practicality: the empire was held together by communication as much as by armies.'
    },
    {
      id: 'per-05', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'The Behistun inscription matters to historians of Persia mainly because it:',
      options: [
        'Is Darius I\'s own trilingual account of his seizure of the throne, and provided the key to deciphering cuneiform',
        'Records Xerxes\' campaign against Greece in detail',
        'Preserves the complete text of the Avesta',
        'Lists every satrapy with its annual tribute in talents'
      ],
      answer: 0,
      explanation: 'Carved high on a cliff in Old Persian, Elamite and Babylonian, it recounts Darius defeating Gaumata and the rebels. Its trilingual form allowed Rawlinson to decipher cuneiform. As evidence it is self-justification: Darius presents himself as restoring Arta (truth and order) against the Drauga (the Lie), which is exactly what a usurper would need to say.'
    },
    {
      id: 'per-06', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'Which of these was NOT an administrative reform of Darius I?',
      options: [
        'A standardised gold coinage, the daric',
        'Fixed annual tribute assessed for each satrapy',
        'Abolition of local languages in favour of Old Persian',
        'A network of royal roads with relay staging posts'
      ],
      answer: 2,
      explanation: 'Persian administration worked through local languages and institutions, not against them: Aramaic served as the imperial lingua franca, Elamite was used in the Persepolis tablets, and local law and cult were generally left intact. Darius\'s reforms were fiscal and infrastructural - coinage, standardised weights, fixed tribute, roads, a canal from the Nile to the Red Sea.'
    },
    {
      id: 'per-07', topic: 'Xerxes', difficulty: 3, type: 'short',
      prompt: 'Explain the role of Ahuramazda in Achaemenid kingship.',
      accept: ['the king ruled by the favour of ahuramazda who granted him the throne and authority to uphold order against the lie'],
      keywords: [
        ['favour', 'grant', 'chosen', 'appointed', 'will', 'support', 'bestow'],
        ['king', 'kingship', 'throne', 'rule', 'authority', 'legitim'],
        ['order', 'truth', 'arta', 'lie', 'drauga', 'chaos', 'justice']
      ],
      minKeywords: 2,
      explanation: 'Royal inscriptions open with a formula: Ahuramazda is the great god who created the earth and made Darius (or Xerxes) king. The King rules "by the favour of Ahuramazda" and his duty is to uphold Arta - truth and order - against the Drauga, the Lie. This is not the same as Persian kings being worshipped as gods; it legitimises rule and frames rebellion as cosmic disorder.'
    },
    {
      id: 'per-08', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'The Apadana staircase reliefs at Persepolis depict:',
      options: [
        'The Persian army defeating the Greeks at Thermopylae',
        'Delegations from across the empire bringing gifts to the King',
        'The construction of the palace itself',
        'The King hunting lions in a royal park'
      ],
      answer: 1,
      explanation: 'Twenty-three delegations file up the stairs in distinctive dress, each bringing characteristic gifts - Lydians with vessels, Indians with gold dust, Nubians with an okapi. They are led by hand by Persian ushers, not driven. The programme presents empire as willing, ordered, cooperative tribute rather than conquest: an image of Persian ideology, and a superb source for the empire\'s diversity.'
    },
    {
      id: 'per-09', topic: 'Xerxes', difficulty: 4, type: 'mc',
      prompt: 'The Persepolis Fortification Tablets are important because they show that:',
      options: [
        'Persepolis was built by slave labour, confirming Greek accounts',
        'The workforce was organised and paid in rations of grain, wine and livestock, including women and skilled foreign craftsmen',
        'The palace was never actually finished',
        'Xerxes personally designed the Gate of All Nations'
      ],
      answer: 1,
      explanation: 'These Elamite administrative tablets record rations issued to work gangs and travellers. They show a paid, organised, ethnically mixed workforce - with women receiving rations, and higher rates for skilled work and after childbirth. That directly undercuts the Greek stereotype of an empire of slaves, and is a good example of documentary evidence correcting a hostile literary tradition.'
    },
    {
      id: 'per-10', topic: 'Xerxes', difficulty: 4, type: 'short',
      prompt: 'Give TWO reasons Herodotus must be used cautiously as a source for Persia.',
      accept: ['he was greek writing after the wars for a greek audience and relied on oral informants he could not verify'],
      keywords: [
        ['greek', 'hostile', 'enemy', 'bias', 'stereotype', 'barbarian', 'audience'],
        ['later', 'after', 'decades', 'not contemporary', 'second hand', 'oral', 'hearsay', 'informant'],
        ['no persian', 'language', 'numbers', 'exagger', 'inflated', 'unverif', 'dramatic', 'moralis']
      ],
      minKeywords: 2,
      explanation: 'Standard points: he was Greek, writing a generation or more later for a Greek audience shaped by victory; he could not read Persian and depended on oral informants of uneven reliability; his numbers are demonstrably inflated (a Persian army of over five million is impossible logistically); and he writes within a moralising tradition of hubris and divine retribution. He remains indispensable - he names sources, reports variants, and preserves detail found nowhere else - but he is a Greek account of Persia, not a Persian one.'
    },
    {
      id: 'per-11', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'Which Persian capital was the ceremonial centre, used especially for the New Year festival?',
      options: ['Susa', 'Ecbatana', 'Persepolis', 'Pasargadae'],
      answer: 2,
      explanation: 'Persepolis was ceremonial and symbolic; Susa was the main administrative capital; Ecbatana was the cool summer residence; Pasargadae was Cyrus\'s foundation and held his tomb; Babylon remained a major centre. The court moved between them seasonally, which is itself a statement about how the empire was governed.'
    },
    {
      id: 'per-12', topic: 'Xerxes', difficulty: 4, type: 'mc',
      prompt: 'The "Immortals" were:',
      options: [
        'Priests of Ahuramazda who attended the King',
        'A ten-thousand-strong elite infantry corps kept permanently at full strength',
        'The royal bodyguard of Median nobles only',
        'Persian cavalry recruited exclusively from satraps\' households'
      ],
      answer: 1,
      explanation: 'Herodotus explains the name: any man lost was immediately replaced, so the corps never fell below ten thousand. The term is Greek and may rest on a misunderstanding of a Persian word; no Persian source uses it. They were the core of a much larger army drawn as levies from across the satrapies - which is why Persian forces were diverse in equipment and, in Greek eyes, unwieldy.'
    },
    {
      id: 'per-13', topic: 'Xerxes', difficulty: 1, type: 'short',
      prompt: 'Name the Achaemenid kings from Cyrus II to Xerxes I, in order.',
      accept: ['cyrus cambyses darius xerxes'],
      keywords: [['cyrus'], ['cambyses'], ['darius'], ['xerxes']],
      minKeywords: 3,
      explanation: 'Cyrus II (559-530), Cambyses II (530-522), Darius I (522-486), Xerxes I (486-465). Bardiya/Gaumata briefly holds power in 522 before Darius seizes the throne - the event the Behistun inscription exists to justify. Getting this spine secure makes every other date in the period easier to place.'
    },
    {
      id: 'per-14', topic: 'Xerxes', difficulty: 5, type: 'short',
      prompt: 'Assess Persian policy towards the religions of subject peoples.',
      accept: ['the persians generally supported local cults because it secured cooperation though tolerance was pragmatic rather than principled'],
      keywords: [
        ['tolerant', 'tolerance', 'support', 'restore', 'respect', 'permit', 'allow', 'local cult'],
        ['pragmat', 'political', 'stability', 'loyalty', 'cooperat', 'control', 'useful', 'interest'],
        ['punish', 'rebel', 'destroy', 'exception', 'not principle', 'limit']
      ],
      minKeywords: 2,
      explanation: 'The evidence points to pragmatic support rather than tolerance as a principle. Cyrus restores Babylonian cult and authorises the rebuilding of the Jerusalem temple; Darius orders the satrap Gadatas to protect a sanctuary of Apollo. But temples that backed rebellion were treated harshly, and Xerxes\'s Daiva inscription claims the destruction of a sanctuary. The consistent thread is that religion was managed to secure loyalty: supporting local gods bought cooperation cheaply, and withdrawing that support punished revolt.'
    },

    /* ---------------- Xerxes ---------------- */
    {
      id: 'xer-01', topic: 'Xerxes', difficulty: 1, type: 'mc',
      prompt: 'Xerxes I was the son of:',
      options: [
        'Cyrus II and Cassandane',
        'Darius I and Atossa',
        'Cambyses II and Roxane',
        'Darius I and Artystone'
      ],
      answer: 1,
      explanation: 'Xerxes was the son of Darius I and Atossa, daughter of Cyrus the Great. That maternal descent from the founder mattered enormously: it gave Xerxes a claim to the throne that Darius, a usurper from a collateral line, could not supply himself.'
    },
    {
      id: 'xer-02', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'Xerxes was chosen as heir over his elder half-brother Artobazanes mainly because:',
      options: [
        'Artobazanes renounced his claim to become a satrap',
        'Xerxes was the eldest son born after Darius became king, and was Cyrus\'s grandson through Atossa',
        'Artobazanes was defeated by Xerxes in single combat',
        'The magi declared Xerxes the choice of Ahuramazda'
      ],
      answer: 1,
      explanation: 'Herodotus reports the argument that Artobazanes was born while Darius was a private citizen, whereas Xerxes was "born in the purple" - and credits the exiled Spartan king Demaratus with suggesting the precedent. The descent from Cyrus through Atossa was the stronger card. Darius\'s own inscription (DNa) simply states that Ahuramazda made him king, which tells you how such decisions were presented rather than how they were made.'
    },
    {
      id: 'xer-03', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'On his accession in 486 BC, Xerxes first had to deal with:',
      options: [
        'An invasion by the Scythians',
        'Revolts in Egypt and, shortly afterwards, in Babylon',
        'A famine across the Iranian plateau',
        'The secession of the Ionian cities'
      ],
      answer: 1,
      explanation: 'Egypt revolted in 486/5 and was suppressed, with Xerxes\'s brother Achaemenes installed as satrap; Babylon revolted under Bel-shimanni and then Shamash-eriba in the 480s. Consolidating the empire delayed the Greek campaign by several years - a useful corrective to the Greek picture of a king obsessed from the start with avenging Marathon.'
    },
    {
      id: 'xer-04', topic: 'Xerxes', difficulty: 3, type: 'short',
      prompt: 'What is the Daiva inscription, and why do historians disagree about it?',
      accept: ['an inscription of xerxes claiming he destroyed a sanctuary of false gods and established the worship of ahuramazda debated as either real intolerance or standard royal formula'],
      keywords: [
        ['xerxes', 'inscription', 'persepolis', 'xph'],
        ['daiva', 'false god', 'demons', 'sanctuary', 'destroy', 'worship', 'ahuramazda'],
        ['debate', 'disagree', 'formula', 'ideolog', 'propaganda', 'literal', 'intoleran', 'unnamed', 'which']
      ],
      minKeywords: 2,
      explanation: 'In XPh, from Persepolis, Xerxes says that in a rebellious land he destroyed a sanctuary of the daivas (false gods) and established the worship of Ahuramazda. The problem is that he never names the place or the date. Older scholarship read it as evidence of religious intolerance and linked it to Babylon or Greece; more recent work (Kuhrt, Sancisi-Weerdenburg) reads it as conventional royal ideology - the King putting down disorder - and warns against building a narrative of persecution on an undated, unlocated claim.'
    },
    {
      id: 'xer-05', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'Which structures at Persepolis are attributed to Xerxes?',
      options: [
        'The Gate of All Nations and the Hall of a Hundred Columns',
        'The tomb of Cyrus and the Pasargadae audience hall',
        'The Behistun relief and the Nile-Red Sea canal',
        'The Apadana foundations and the first city wall'
      ],
      answer: 0,
      explanation: 'Xerxes completed the Apadana his father had begun and added the Gate of All Nations, the Hall of a Hundred Columns (the Throne Hall), the Harem and Treasury extensions, plus work at Susa. The building programme is the strongest evidence against the Greek portrait of an incompetent: it is an enormous, sustained, well-administered undertaking.'
    },
    {
      id: 'xer-06', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'Herodotus\'s story that Xerxes had the Hellespont whipped and fettered after a storm destroyed his bridges functions in the Histories as:',
      options: [
        'A factual record of a documented Persian religious rite',
        'A characterisation of Xerxes\'s hubris - a mortal presuming to punish nature',
        'Evidence of Persian engineering expertise',
        'A digression unrelated to Xerxes\'s campaign'
      ],
      answer: 1,
      explanation: 'The episode belongs to Herodotus\'s moral architecture: hubris invites nemesis, and a king who lashes the sea and yokes two continents has overreached. Treat it as literary characterisation rather than reportage. The bridges themselves were real and impressive - roughly 674 boats in two lines, cabled and decked - and the story survives precisely because it made a memorable moral point to a Greek audience.'
    },
    {
      id: 'xer-07', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'The canal Xerxes cut through the Athos peninsula is significant because:',
      options: [
        'Herodotus cites it as proof of Xerxes\'s vanity, yet archaeology confirms it existed and served a real strategic purpose',
        'It was never actually begun',
        'It allowed the Persian army rather than the fleet to bypass Thermopylae',
        'It was built by Darius I and merely repaired by Xerxes'
      ],
      answer: 0,
      explanation: 'Herodotus presents the canal as ostentation, since the ships could have been dragged across. But a Persian fleet had been wrecked rounding Athos in 492 under Mardonius, so avoiding that headland was sound planning. Geophysical survey has confirmed the cutting. It is a clean example of Greek moralising and Persian logistics describing the same object very differently.'
    },
    {
      id: 'xer-08', topic: 'Xerxes', difficulty: 3, type: 'short',
      prompt: 'Outline TWO preparations Xerxes made before invading Greece in 480 BC.',
      accept: ['he bridged the hellespont with boats and cut a canal through athos while establishing supply depots along the route'],
      keywords: [
        ['bridge', 'hellespont', 'pontoon', 'boats'],
        ['canal', 'athos'],
        ['supply', 'depot', 'provision', 'stores', 'food', 'levy', 'troops', 'fleet', 'allies', 'four years']
      ],
      minKeywords: 2,
      explanation: 'Preparation ran roughly four years: levies raised from across the satrapies, a fleet assembled largely from Phoenician, Egyptian and Ionian contingents, two pontoon bridges over the Hellespont, the Athos canal, and supply depots stocked along the Thracian coast road. The scale is the point - this was a logistical operation as much as a military one, and its eventual failure owed much to supply strain.'
    },
    {
      id: 'xer-09', topic: 'Xerxes', difficulty: 4, type: 'mc',
      prompt: 'On Xerxes\'s treatment of Babylon after the revolts, current scholarship generally holds that:',
      options: [
        'He levelled the city and deported its entire population',
        'The later tradition that he destroyed Esagila and removed the statue of Marduk is probably exaggerated',
        'He took no action at all against the rebels',
        'He made Babylon his principal capital as a conciliatory gesture'
      ],
      answer: 1,
      explanation: 'Herodotus and later writers describe the destruction of the Esagila temple and the removal of Marduk\'s statue, and older accounts had Xerxes dismantling Babylonian religion. Archaeological and cuneiform evidence does not support destruction on that scale, and Babylonian business documents continue. The revolt was certainly punished, but the picture of systematic religious vandalism reflects a hostile tradition more than the record.'
    },
    {
      id: 'xer-10', topic: 'Xerxes', difficulty: 2, type: 'mc',
      prompt: 'Xerxes died in 465 BC:',
      options: [
        'In battle against the Greeks at Plataea',
        'Assassinated in a palace conspiracy led by Artabanus, commander of the royal bodyguard',
        'Of illness while campaigning in Bactria',
        'Executed by his son Artaxerxes after a failed revolt'
      ],
      answer: 1,
      explanation: 'He was murdered in a court conspiracy involving Artabanus, the commander of the royal bodyguard, and was succeeded by his son Artaxerxes I. The last fifteen years of the reign are poorly recorded: Greek interest drops away sharply once the invasion fails, which is itself a lesson about why our picture of Xerxes is so lopsided.'
    },
    {
      id: 'xer-11', topic: 'Xerxes', difficulty: 4, type: 'mc',
      prompt: 'Aeschylus\'s play The Persians (472 BC) is valuable to historians chiefly because it:',
      options: [
        'Was written by a veteran of the wars within eight years of Salamis, and presents the defeat from the Persian side',
        'Is a neutral chronicle of the campaign compiled from Persian records',
        'Preserves the text of Xerxes\'s own dispatches',
        'Was performed at the Persian court for Artaxerxes I'
      ],
      answer: 0,
      explanation: 'Aeschylus fought at Marathon and probably Salamis, and staged the play in Athens only eight years after the battle. It is the earliest surviving account, and it dramatises Persian grief rather than Greek triumph. But it is a tragedy written for an Athenian audience with Athenian preoccupations - hubris, divine retribution, the folly of overreach - not a neutral record.'
    },
    {
      id: 'xer-12', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'Herodotus places Xerxes during the battle of Salamis:',
      options: [
        'Commanding the Persian centre from a flagship',
        'Watching from a throne set on the slopes of Mount Aigaleos',
        'Already returning overland to Sardis',
        'Directing the army at Thermopylae'
      ],
      answer: 1,
      explanation: 'Herodotus has Xerxes enthroned above the straits with scribes recording who fought well - a scene Aeschylus also uses. It is a powerful image of a king who came to watch a victory and saw a defeat, and it lets Herodotus stage the reversal visually. Note how much of what you "know" about Xerxes comes from such carefully composed set pieces.'
    },
    {
      id: 'xer-13', topic: 'Xerxes', difficulty: 4, type: 'short',
      prompt: 'Why have modern historians reassessed Xerxes\'s reign?',
      accept: ['because persian evidence such as inscriptions and building works shows an effective administrator very unlike the hostile greek literary portrait'],
      keywords: [
        ['persian', 'inscription', 'archaeolog', 'tablet', 'building', 'persepolis', 'evidence'],
        ['greek', 'herodotus', 'hostile', 'bias', 'stereotype', 'literary', 'portrait'],
        ['administrat', 'effective', 'competent', 'builder', 'reassess', 'different', 'balance']
      ],
      minKeywords: 2,
      explanation: 'For centuries Xerxes was read almost entirely through Herodotus: vain, cruel, uxorious, undone by hubris. Working from Persian material instead - the Persepolis building programme, the royal inscriptions, the administrative tablets, the continuity of imperial government after 479 - historians such as Kuhrt, Sancisi-Weerdenburg and Briant present a capable ruler whose empire was barely dented by a failed campaign on its western fringe. The reassessment is really about which evidence you privilege.'
    },
    {
      id: 'xer-14', topic: 'Xerxes', difficulty: 5, type: 'short',
      prompt: 'Assess how far Xerxes\'s motives for invading Greece can be recovered from the evidence.',
      accept: ['they cannot be recovered securely because greek accounts assign motives dramatically and persian inscriptions are formulaic ideology rather than policy'],
      keywords: [
        ['herodotus', 'greek', 'motive', 'revenge', 'dream', 'council', 'dramatic', 'invent'],
        ['persian', 'inscription', 'formulaic', 'ideolog', 'silent', 'no record', 'propaganda'],
        ['infer', 'action', 'cannot', 'uncertain', 'speculat', 'expansion', 'precedent', 'imperial']
      ],
      minKeywords: 2,
      explanation: 'Herodotus supplies motives freely - avenging Marathon, the urging of Mardonius and the Aleuadae, a dream compelling him, the ambition to make Persian territory bounded only by the sky. These are narrative devices, staged in an invented council debate. The Persian record is silent on policy: royal inscriptions state that the King upholds order by the favour of Ahuramazda, and list lands, but never argue a strategy. What can be inferred is the imperial logic - Ionia was Persian, Athens and Eretria had backed its revolt, and unfinished business on a frontier invited settlement. A strong answer concludes that his actions are recoverable and his reasoning largely is not.'
    },

    /* ---------------- The Greek World 500–440 BC ---------------- */
    {
      id: 'grw-01', topic: 'The Greek World 500–440 BC', difficulty: 1, type: 'mc',
      prompt: 'The Ionian Revolt against Persian rule began in 499 BC and was led initially by:',
      options: ['Themistocles of Athens', 'Aristagoras of Miletus', 'Leonidas of Sparta', 'Miltiades of Athens'],
      answer: 1,
      explanation: 'Aristagoras, tyrant of Miletus, launched the revolt after a failed expedition against Naxos left him exposed. He sought help in Greece: Sparta refused, Athens sent twenty ships and Eretria five. Sardis was burned in 498; the revolt was crushed at the naval battle of Lade in 494 and Miletus destroyed.'
    },
    {
      id: 'grw-02', topic: 'The Greek World 500–440 BC', difficulty: 2, type: 'mc',
      prompt: 'Herodotus calls the Athenian ships sent to the Ionian Revolt "the beginning of evils" because:',
      options: [
        'They were lost with all hands in a storm',
        'They gave Darius a reason to turn on mainland Greece',
        'They were funded by a tax that caused civil strife in Athens',
        'They provoked Sparta into declaring war on Athens'
      ],
      answer: 1,
      explanation: 'It is a signposted turning point in the Histories. Athenian and Eretrian involvement in burning Sardis brought them to Darius\'s attention - Herodotus has him shoot an arrow skyward praying for vengeance and order a servant to repeat "Master, remember the Athenians" at every meal. Whether or not that is literally true, it marks where a provincial revolt becomes a war between Persia and Greece.'
    },
    {
      id: 'grw-03', topic: 'The Greek World 500–440 BC', difficulty: 1, type: 'mc',
      prompt: 'The battle of Marathon was fought in:',
      options: ['499 BC', '490 BC', '480 BC', '479 BC'],
      answer: 1,
      explanation: 'Marathon, 490 BC, ended Darius\'s punitive expedition under Datis and Artaphernes, which had already destroyed Eretria. Keep the two invasions distinct: Darius sends the expedition defeated at Marathon in 490; Xerxes leads the full invasion of 480-479 (Thermopylae, Artemisium and Salamis in 480; Plataea and Mycale in 479).'
    },
    {
      id: 'grw-04', topic: 'The Greek World 500–440 BC', difficulty: 3, type: 'mc',
      prompt: 'At Marathon, the Athenian commander usually credited with the decisive plan was:',
      options: ['Callimachus', 'Miltiades', 'Aristides', 'Themistocles'],
      answer: 1,
      explanation: 'Miltiades, who knew Persian methods from service in the Chersonese, is credited with persuading the generals to attack and with thinning the Athenian centre so the strengthened wings could envelop the Persian flanks. Callimachus, the polemarch, held formal command and died in the fighting. Herodotus gives Athenian losses as 192 against 6,400 Persians - the disparity is plausible in outline, since most casualties in ancient battles came during the rout.'
    },
    {
      id: 'grw-05', topic: 'The Greek World 500–440 BC', difficulty: 2, type: 'short',
      prompt: 'Why did the Spartans arrive at Marathon too late for the battle?',
      accept: ['they were celebrating the carneia festival and religious law prevented them marching until it ended'],
      keywords: [
        ['carneia', 'festival', 'religious', 'rite', 'sacred'],
        ['law', 'forbid', 'prevent', 'could not', 'delay', 'wait', 'full moon', 'until']
      ],
      minKeywords: 1,
      explanation: 'The Spartans were observing the Carneia, a festival of Apollo during which they would not march. They set out once it ended and arrived after the battle, viewing the Persian dead. Whether the religious scruple was genuine or a convenient excuse is a standard exam debate; note that Herodotus, whose sympathies are not anti-Spartan, reports it without cynicism. The messenger Pheidippides had run the roughly 240 km to Sparta to ask - the later legend of a run to Athens to announce victory is not in Herodotus.'
    },
    {
      id: 'grw-06', topic: 'The Greek World 500–440 BC', difficulty: 3, type: 'mc',
      prompt: 'Themistocles\'s naval building programme of about 483/2 BC was funded by:',
      options: [
        'Tribute from the Delian League',
        'A windfall from the state silver mines at Laurion',
        'A loan from the Spartan treasury',
        'The sale of Persian plunder taken at Marathon'
      ],
      answer: 1,
      explanation: 'A rich new strike at Laurion produced a surplus that was to be distributed to citizens. Themistocles persuaded the assembly to build triremes instead - ostensibly against Aegina. That fleet, around 200 ships, decided Salamis. It is the single most consequential political decision of the period, and it also shifted power inside Athens towards the poorer citizens who rowed the ships.'
    },
    {
      id: 'grw-07', topic: 'The Greek World 500–440 BC', difficulty: 2, type: 'mc',
      prompt: 'The Hellenic League, formed at Corinth in 481 BC, gave overall command:',
      options: [
        'To Athens, as the largest naval power',
        'To Sparta, on both land and sea',
        'Jointly to Athens and Sparta by rotation',
        'To Corinth, as the host city'
      ],
      answer: 1,
      explanation: 'Sparta held command on land and sea despite Athens supplying most of the ships - Athens conceded rather than fracture the alliance, and Herodotus notes the other Greeks would not serve under Athenian command. Only around 31 states joined; many stayed neutral or medised. Remembering how small the coalition was makes the victory look less inevitable.'
    },
    {
      id: 'grw-08', topic: 'The Greek World 500–440 BC', difficulty: 2, type: 'mc',
      prompt: 'The Greek position at Thermopylae was turned when:',
      options: [
        'The Persian fleet landed troops behind the pass',
        'Ephialtes showed the Persians the Anopaea mountain path',
        'Leonidas withdrew the Spartans during the night',
        'A Persian siege engine breached the Phocian wall'
      ],
      answer: 1,
      explanation: 'Ephialtes, a local, guided Hydarnes and the Immortals along the Anopaea path overnight; the Phocians posted to guard it were brushed aside. Leonidas dismissed most of the allies and held with the 300 Spartans, the Thespians and the Thebans. Militarily Thermopylae was a defeat that cost Persia several days; its lasting significance is as a moral exemplar - Simonides\'s epitaph, "tell them in Lakedaimon", was already doing that work within a generation.'
    },
    {
      id: 'grw-09', topic: 'The Greek World 500–440 BC', difficulty: 3, type: 'short',
      prompt: 'Explain why the Greeks held Thermopylae and Artemisium at the same time.',
      accept: ['the pass and the strait had to be held together because losing either would let the persians outflank the other position'],
      keywords: [
        ['land', 'pass', 'army', 'thermopylae'],
        ['sea', 'fleet', 'naval', 'strait', 'artemisium'],
        ['outflank', 'behind', 'bypass', 'land troops', 'together', 'both', 'combined', 'support', 'useless']
      ],
      minKeywords: 2,
      explanation: 'The two positions were interdependent. Holding the pass was pointless if the Persian fleet could sail past and land troops in the Greek rear; holding the strait was pointless if the army broke through and took the fleet\'s base from the landward side. The Persian advance depended on the fleet supplying the army, so the strategy aimed to stall both at a narrow point where numbers counted for least. When Thermopylae fell, Artemisium was abandoned the same night.'
    },
    {
      id: 'grw-10', topic: 'The Greek World 500–440 BC', difficulty: 3, type: 'mc',
      prompt: 'The Delphic oracle\'s advice that Athens would be saved by a "wooden wall" was interpreted by Themistocles to mean:',
      options: [
        'The palisade around the Acropolis should be rebuilt',
        'The Athenian fleet - so the city should be evacuated and the war fought at sea',
        'A wall should be built across the Isthmus of Corinth',
        'Athens should surrender and rely on Persian clemency'
      ],
      answer: 1,
      explanation: 'Others read the wooden wall as the Acropolis palisade, and those who stayed were killed when the Acropolis was stormed. Themistocles argued it meant the ships, and that the oracle\'s "divine Salamis" pointed to a battle there. Athens was evacuated to Troezen, Aegina and Salamis - a decision recorded in the disputed Troezen inscription, the so-called Themistocles Decree, whose authenticity is a live scholarly debate.'
    },
    {
      id: 'grw-11', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'mc',
      prompt: 'Themistocles secured battle at Salamis on his terms by:',
      options: [
        'Blockading the Persian fleet inside the Bay of Phaleron',
        'Sending his servant Sicinnus to tell Xerxes the Greeks were about to scatter',
        'Bribing the Persian admiral to withdraw the Egyptian squadron',
        'Persuading the Spartans to attack overland at the Isthmus'
      ],
      answer: 1,
      explanation: 'With the allied commanders arguing for withdrawal to the Isthmus, Themistocles sent Sicinnus to Xerxes claiming the Greeks were about to break up and that he himself favoured Persia. The Persians blocked both exits overnight and committed to fighting in the narrows - which removed the Greeks\' option to retreat and made their preferred battlefield unavoidable. It is manipulation of his own side as much as of the enemy.'
    },
    {
      id: 'grw-12', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'short',
      prompt: 'Explain why the narrow straits at Salamis favoured the Greek fleet.',
      accept: ['the narrows stopped the persians using their greater numbers and suited the heavier greek ships fighting at close quarters'],
      keywords: [
        ['narrow', 'confined', 'cramped', 'strait', 'space', 'room'],
        ['numbers', 'numerical', 'larger fleet', 'superior', 'more ships', 'advantage', 'outflank', 'manoeuvre', 'maneuver'],
        ['heavier', 'ram', 'boarding', 'close', 'greek ships', 'sturd', 'collide', 'disorder']
      ],
      minKeywords: 2,
      explanation: 'In open water the Persian fleet could use its numbers to outflank and its more manoeuvrable ships to execute the diekplous. In the straits neither was possible: the line could not extend, ships fouled one another, and a swell reportedly troubled the higher Persian decks. The heavier Greek triremes suited a close, crowded fight of ramming and boarding. Herodotus\'s figure of 1,207 Persian ships is certainly inflated, but the relevant point stands - superior numbers became a liability in a space too small to deploy them.'
    },
    {
      id: 'grw-13', topic: 'The Greek World 500–440 BC', difficulty: 2, type: 'mc',
      prompt: 'The Greek land victory at Plataea in 479 BC was commanded by:',
      options: ['Themistocles of Athens', 'Pausanias of Sparta', 'Aristides of Athens', 'Leotychidas of Sparta'],
      answer: 1,
      explanation: 'Pausanias, regent for the young Spartan king, commanded the largest Greek army yet assembled; Mardonius was killed and the Persian camp stormed. The naval victory at Mycale followed in the same year, sparking a renewed Ionian revolt. Plataea, not Salamis, ended the Persian presence in mainland Greece - though Salamis gets the attention because it saved the campaign from being lost in 480.'
    },
    {
      id: 'grw-14', topic: 'The Greek World 500–440 BC', difficulty: 3, type: 'mc',
      prompt: 'The Serpent Column dedicated at Delphi after the wars is valuable evidence because it:',
      options: [
        'Records Xerxes\'s terms of surrender',
        'Lists by name the Greek states that fought Persia, as a contemporary inscription',
        'Depicts the battle of Salamis in relief',
        'Preserves Herodotus\'s original manuscript'
      ],
      answer: 1,
      explanation: 'Made from melted Persian spoils and inscribed with the 31 states that resisted, it is contemporary, official and physical - a check on the literary tradition. It also shows how few states actually fought. Pausanias had a boastful personal couplet inscribed and the Spartans erased it, which tells you something about how the credit was contested straight away.'
    },
    {
      id: 'grw-15', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'mc',
      prompt: 'The Delian League, founded in 478/7 BC, was established primarily to:',
      options: [
        'Govern Athens\'s internal affairs after the war',
        'Continue the war against Persia and free the Greeks of Asia Minor',
        'Replace the Hellenic League as a defensive alliance against Sparta',
        'Regulate trade and coinage across the Aegean'
      ],
      answer: 1,
      explanation: 'Its aim was to carry on the war and take revenge for what Greece had suffered, with the treasury on Delos and Aristides assessing each member\'s contribution in ships or money. Athens converted it into an empire within a generation: secession was suppressed by force, and the treasury moved to Athens in 454. Thucydides makes the growth of Athenian power from this league the underlying cause of the Peloponnesian War.'
    },
    {
      id: 'grw-16', topic: 'The Greek World 500–440 BC', difficulty: 5, type: 'short',
      prompt: 'Assess the main reasons for the Greek victory over Persia.',
      accept: ['greek success rested on choosing narrow terrain that negated persian numbers superior hoplite equipment at close quarters themistocles naval strategy and persian supply strain'],
      keywords: [
        ['terrain', 'narrow', 'pass', 'strait', 'ground', 'confined', 'geography'],
        ['numbers', 'negat', 'outnumber', 'superior', 'unwieldy'],
        ['hoplite', 'armour', 'phalanx', 'spear', 'equipment', 'close quarters', 'trireme', 'fleet', 'navy'],
        ['supply', 'logistic', 'provision', 'distance', 'strategy', 'themistocles', 'leadership', 'unity', 'motivation']
      ],
      minKeywords: 2,
      explanation: 'Argue on several levels. Tactical: at Thermopylae, Artemisium, Salamis and Plataea the Greeks fought where Persian numbers and cavalry could not be brought to bear, and heavier hoplite armour told at close quarters. Strategic: Themistocles built the fleet, read the oracle to fit it, and forced the decisive battle into the narrows. Logistical: a huge force operating far from home, dependent on a fleet for supply, could not sustain a long campaign once that fleet was beaten. Political: the coalition, though small and quarrelsome, held together at the decisive moments. Weigh them rather than list them - and note that from Persepolis this was a failed operation on a distant frontier, not the catastrophe the Greek tradition made of it.'
    },
    {
      id: 'grw-17', topic: 'The Greek World 500–440 BC', difficulty: 5, type: 'mc',
      prompt: 'The strongest caution to apply to the Greek "freedom versus despotism" framing of the wars is that:',
      options: [
        'It was invented by nineteenth-century historians and has no ancient basis',
        'It is the retrospective account of the winners, written by states that were themselves slave-owning and, in Athens\'s case, soon imperial',
        'The Persians left no written records of any kind',
        'Herodotus was not Greek and therefore had no stake in it'
      ],
      answer: 1,
      explanation: 'The framing is genuinely ancient - Aeschylus and Herodotus both work with it - but it is the victors\' account. The states defending "freedom" held slaves, many Greeks medised willingly, and within a generation Athens was coercing its own allies with the fleet built to resist Persia. From the Persian side this was a frontier setback, unrecorded in the royal inscriptions. Recognising the framing as a construction, without pretending it was invented later, is what a high-band answer does.'
    },

    /* ---------------- Sparta: society to the Battle of Leuctra 371 BC ---------------- */
    {
      id: 'spa-01', topic: 'Sparta', difficulty: 1, type: 'mc',
      prompt: 'The Spartan gerousia consisted of:',
      options: [
        '28 elders aged over 60, elected for life, plus the two kings — 30 members in total',
        'Five magistrates elected annually from the whole citizen body',
        'All Spartiate males over the age of 30',
        'The two kings and their appointed military advisers',
      ],
      answer: 0,
      explanation: 'The gerousia was 28 gerontes over 60, elected for life by acclamation in the ekklesia, plus the two kings — 30 in all. Its powers were probouleutic (it prepared the business the assembly voted on) and judicial (it tried capital cases, including charges against kings). Do not confuse it with the ephorate: the gerousia is the council of elders, the ephors are the five annual magistrates.'
    },
    {
      id: 'spa-02', topic: 'Sparta', difficulty: 2, type: 'mc',
      prompt: 'The ephors differed from the gerousia in that they were:',
      options: [
        'Five magistrates elected annually from the whole Spartiate body, holding executive and supervisory power over the kings',
        'Thirty elders holding office for life who prepared business for the assembly',
        'A permanent priesthood responsible for the state cults',
        'The commanders of the Spartan army in the field',
      ],
      answer: 0,
      explanation: 'Five ephors, elected annually from all Spartiates and not eligible for immediate re-election — so unlike the gerousia the office was open and short-term. Their powers: presiding over the gerousia and ekklesia, supervising the kings (two accompanied a king on campaign, and they could arrest and prosecute one), controlling foreign policy and the agoge, expelling foreigners (xenelasia), and declaring war on the helots each year. Learn the institutions as a table — this distinction alone cost three marks in the trial.'
    },
    {
      id: 'spa-03', topic: 'Sparta', difficulty: 3, type: 'short',
      prompt: 'Set out the four Spartan institutions and give ONE power of each.',
      accept: ['two kings led the army and held priesthoods the gerousia of 28 elders plus the kings prepared business and tried capital cases the five ephors supervised the kings and controlled foreign policy and the ekklesia of spartiates over 30 voted on proposals'],
      keywords: [
        ['king', 'dyarch', 'agiad', 'eurypontid'],
        ['gerousia', 'elder', 'geront', '28', 'council'],
        ['ephor', 'five', '5 '],
        ['ekklesia', 'apella', 'assembly'],
      ],
      minKeywords: 4,
      explanation: 'Kings — two, from the Agiad and Eurypontid houses; military command abroad, state priesthoods, certain judicial powers, ceremonial privileges. Gerousia — 28 elders over 60 elected for life plus the two kings; probouleutic function and the court for capital cases. Ephors — five, elected annually from all Spartiates; supervision of the kings, presidency of the gerousia and assembly, foreign policy, oversight of the agoge, annual declaration of war on the helots. Ekklesia (apella) — all Spartiates over 30; voted by shouting on proposals put to it but could not debate them, and under the rider to the Great Rhetra the kings and gerousia could set aside a "crooked" decision. Writing this as four labelled points guarantees the marker finds all of them.'
    },
    {
      id: 'spa-04', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'The rider attached to the Great Rhetra is historically significant because it:',
      options: [
        'Allowed the kings and gerousia to set aside a decision of the assembly they judged "crooked", limiting popular power',
        'Gave the ekklesia the right to debate and amend proposals',
        'Established the ephorate as a check on the kings',
        'Abolished the dual kingship in favour of a single ruler',
      ],
      answer: 0,
      explanation: 'The Great Rhetra survives through Plutarch\'s Lycurgus 6, quoting a Delphic oracle. It sets out the tribes, the gerousia, and the assembly\'s power to decide — and then the rider lets the kings and elders overturn a decision they consider crooked. The rider matters because it shows the Spartan constitution was not democratic despite the assembly\'s formal sovereignty: the elite retained a veto. It is also a source problem, since Plutarch wrote some seven centuries later.'
    },
    {
      id: 'spa-05', topic: 'Sparta', difficulty: 4, type: 'short',
      prompt: 'Herodotus 6.56–58 sets out the powers and privileges of the Spartan kings. Name the FOUR strands.',
      accept: ['military command religious priesthoods and sacrifices judicial powers over heiresses adoptions and roads and privileges and honours including double portions and elaborate funerals'],
      keywords: [
        ['militar', 'army', 'command', 'war', 'campaign'],
        ['relig', 'priest', 'sacrifice', 'zeus', 'oracle', 'pythioi'],
        ['judic', 'legal', 'heiress', 'patrouch', 'adopt', 'road', 'court'],
        ['privileg', 'honour', 'double portion', 'funeral', 'front seat', 'booty'],
      ],
      minKeywords: 4,
      explanation: 'Four strands, and the trial question wanted all four. Military: command of the army on campaign, though from the fifth century only one king campaigned at a time. Religious: the priesthoods of Zeus Lakedaimon and Zeus Ouranios, sacrifice before crossing the frontier and before battle, and custody of oracles through the Pythioi. Judicial: jurisdiction over heiresses (patrouchoi), adoptions and the public roads. Privileges and honours: double portions at the common meals, front seats at festivals, a share of war booty, and the elaborate state funeral Herodotus describes at 6.58. Citing Herodotus 6.56–58 by number is the specificity that lifts the answer.'
    },
    {
      id: 'spa-06', topic: 'Sparta', difficulty: 2, type: 'mc',
      prompt: 'The helots were:',
      options: [
        'A state-owned subject population, largely Messenian and Laconian, who farmed Spartiate land allotments',
        'Free non-citizens who ran Sparta\'s crafts and trade and served in the army',
        'Foreign mercenaries hired to garrison the Spartan frontier',
        'Spartiates who had lost citizen status by failing to pay their mess dues',
      ],
      answer: 0,
      explanation: 'Helots were owned by the state rather than by individuals, and worked the kleroi so that Spartiates could train full-time — the whole system rests on them. The second option describes the perioikoi, "dwellers around": free, non-citizen, running crafts and trade and fighting in the army. The last describes the hypomeiones or "inferiors", Spartiates demoted for failing to contribute to their syssition.'
    },
    {
      id: 'spa-07', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'The ephors declared war on the helots at the start of each year of office. The purpose of this was to:',
      options: [
        'Allow a helot to be killed without incurring religious pollution',
        'Recruit helots into the army as light infantry',
        'Collect the annual tribute owed by the Messenian communities',
        'Formally renew the treaty between Sparta and its perioikic towns',
      ],
      answer: 0,
      explanation: 'Reported by Aristotle via Plutarch (Lycurgus 28). Killing a helot would otherwise be homicide and bring pollution; a standing declaration of war made it an act of war instead. Combined with the krypteia — young Spartiates sent into the countryside to kill helots by night — it shows terror as a deliberate instrument of control, and the constant fear of helot revolt explains Sparta\'s reluctance to campaign far from home.'
    },
    {
      id: 'spa-08', topic: 'Sparta', difficulty: 2, type: 'mc',
      prompt: 'The agoge began at what age, and what happened to a Spartiate who failed to maintain his syssition contributions?',
      options: [
        'Age 7; he lost full citizen status and became one of the hypomeiones or "inferiors"',
        'Age 12; he was exiled from Laconia permanently',
        'Age 7; he was demoted to the perioikoi and moved to a coastal town',
        'Age 18; he was required to serve an additional term in the krypteia',
      ],
      answer: 0,
      explanation: 'Boys entered the agoge at seven, were organised into herds under the paidonomos and older eirens, and continued in the common messes into their thirties. Membership of a syssition required a fixed contribution of produce from a man\'s kleros; failure to pay meant loss of full citizenship. This is the mechanism behind oliganthropia — as land concentrated in fewer hands, the pool of qualifying Spartiates shrank steadily.'
    },
    {
      id: 'spa-09', topic: 'Sparta', difficulty: 4, type: 'short',
      prompt: 'Name TWO archaeological sites or find-types that provide evidence for Spartan religion.',
      accept: ['the sanctuary of artemis orthia with its lead figurines and masks and the amyklaion sanctuary of apollo plus the menelaion and the temple of athena chalkioikos'],
      keywords: [
        ['artemis orthia', 'orthia', 'lead figurine', 'mask', 'ivory'],
        ['amyklaion', 'amyklai', 'apollo', 'menelaion', 'menelaus', 'helen', 'chalkioikos', 'bronze house', 'athena'],
      ],
      minKeywords: 2,
      explanation: 'This is where nine marks went in the trial: the answer named the right ideas but no named archaeology. The sanctuary of Artemis Orthia on the Eurotas produced tens of thousands of lead votive figurines, terracotta masks and carved ivory, evidence both of cult practice and of the wealth of archaic Sparta before the supposed austerity. The Amyklaion, the sanctuary of Apollo at Amyklai with the Throne of Apollo, hosted the Hyakinthia. The Menelaion was a hero shrine to Menelaus and Helen. The temple of Athena Chalkioikos, Athena of the Bronze House, stood on the acropolis — and is where the regent Pausanias was walled in and starved. Pair every claim about Spartan religion with one of these.'
    },
    {
      id: 'spa-10', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'The three major Spartan festivals were the:',
      options: [
        'Hyakinthia, Gymnopaedia and Karneia',
        'Panathenaia, Dionysia and Thesmophoria',
        'Olympia, Pythia and Isthmia',
        'Eleusinia, Lenaia and Anthesteria',
      ],
      answer: 0,
      explanation: 'Hyakinthia — Apollo and Hyakinthos at Amyklai, mourning turning to celebration. Gymnopaedia — a summer festival of naked youths dancing and competing in the agora. Karneia — Apollo Karneios, and militarily consequential: it is the reason Sparta sent only Leonidas and his advance force to Thermopylae and arrived too late for Marathon. The second option lists Athenian festivals; the third lists the panhellenic games.'
    },
    {
      id: 'spa-11', topic: 'Sparta', difficulty: 4, type: 'short',
      prompt: 'Explain how religion functioned as an instrument of the Spartan state, not just as private belief.',
      accept: ['kings held priesthoods and sacrificed before crossing the frontier and before battle while oracles were controlled through the pythioi and festivals such as the karneia could delay campaigns so religion legitimised royal authority and shaped military decisions'],
      keywords: [
        ['king', 'priest', 'sacrific', 'frontier', 'battle', 'omen'],
        ['oracle', 'delphi', 'pythioi', 'festival', 'karneia', 'delay', 'campaign'],
        ['legitim', 'authority', 'control', 'state', 'political', 'decision'],
      ],
      minKeywords: 2,
      explanation: 'Religion was constitutional machinery. The kings held the priesthoods of Zeus Lakedaimon and Zeus Ouranios and sacrificed before crossing the frontier and again before battle, so an unfavourable omen could halt an army — royal religious authority was therefore also military authority. Oracular consultation ran through the Pythioi, two royal appointees, giving the kings control of the channel to Delphi. Festivals overrode strategy: the Karneia delayed the Spartan response to both Marathon and Thermopylae. And the archaeology grounds it — Artemis Orthia\'s lead figurines and masks, the Amyklaion, the Menelaion, Athena Chalkioikos. Claim, named source, what it proves: that formula is what the marker rewarded elsewhere in the paper.'
    },
    {
      id: 'spa-12', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'Compared with women elsewhere in Greece, Spartan women were distinctive chiefly in that they:',
      options: [
        'Trained physically, married later, and could own and inherit land in their own right',
        'Voted in the assembly and held magistracies',
        'Underwent the agoge alongside boys from the age of seven',
        'Were forbidden to take part in public religious festivals',
      ],
      answer: 0,
      explanation: 'Physical training, marriage around eighteen rather than in the early teens, and above all property rights — Aristotle (Politics II) complains that by the fourth century women held around two-fifths of Spartan land, and treats their licence as a cause of Sparta\'s decline. They did not vote, hold office or go through the agoge. Note the source caution: nearly everything we have is written by hostile or admiring outsiders, so "Spartan women" as we meet them are partly a literary construct.'
    },
    {
      id: 'spa-13', topic: 'Sparta', difficulty: 2, type: 'mc',
      prompt: 'The poetry of Tyrtaeus is useful to historians of Sparta because it:',
      options: [
        'Is contemporary seventh-century material that shows the values the state promoted during the Messenian wars',
        'Provides a detailed narrative of the Spartan constitution written by a king',
        'Records the daily administration of the syssitia and the kleroi',
        'Is the only source written by a helot',
      ],
      answer: 0,
      explanation: 'Tyrtaeus is close to contemporary, which almost nothing else about archaic Sparta is. His exhortations to stand fast in the phalanx, and the Eunomia poem on good order, show what Spartans were told to value during the Second Messenian War. Alcman\'s Partheneion — maiden songs for female choruses — is the companion evidence for religion and for women\'s public role. Both are literary, so they show ideals rather than practice, which is the limitation to state.'
    },
    {
      id: 'spa-14', topic: 'Sparta', difficulty: 4, type: 'short',
      prompt: 'What is the "Spartan mirage", and why is it the central source problem for this topic?',
      accept: ['it is the idealised image of sparta created by admiring outsiders because sparta produced almost no written record of its own so nearly all our evidence is external late or hostile'],
      keywords: [
        ['idealis', 'image', 'myth', 'construct', 'distort', 'romantic', 'admir'],
        ['outsider', 'non-spartan', 'xenophon', 'plutarch', 'plato', 'aristotle', 'external', 'late'],
        ['no written', 'produced little', 'own record', 'silence', 'secre'],
      ],
      minKeywords: 2,
      explanation: 'The mirage spartiate, Ollier\'s term, is the idealised picture of Sparta transmitted by writers who were not Spartan: Xenophon, who lived there and admired it; Plato and Aristotle, using it as a political model or warning; and Plutarch, writing around 700 years later. Sparta itself produced almost no literature or documentary record and actively discouraged outside contact, so the historian is always working from external, often late, often ideologically motivated accounts. Every claim about Spartan society should therefore be attributed and dated — say who says it and when — rather than asserted flatly.'
    },
    {
      id: 'spa-15', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'Xenophon\'s Constitution of the Lacedaemonians must be used with caution mainly because he:',
      options: [
        'Was an admiring Athenian exile living under Spartan patronage, so his account is idealising',
        'Wrote several centuries after the events he describes',
        'Never visited Laconia and relied entirely on hearsay',
        'Was a helot writing to expose Spartan cruelty',
      ],
      answer: 0,
      explanation: 'Xenophon is the closest thing to an insider account, which is precisely the problem: an Athenian exile settled on a Spartan estate, with his sons educated in the agoge. He is invaluable on institutions and practice and unreliable on judgement. Plutarch is the one writing centuries later. Pairing Xenophon\'s admiration against Aristotle\'s criticism in Politics II gives you the two-sided source handling the top bands require.'
    },
    {
      id: 'spa-16', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'At the Battle of Leuctra in 371 BC:',
      options: [
        'Epaminondas and the Thebans defeated Sparta and killed King Cleombrotus, ending Spartan hegemony',
        'Sparta defeated Athens, ending the Peloponnesian War',
        'Sparta crushed a Messenian helot revolt and re-established control of Messenia',
        'A Persian-funded coalition forced Sparta to accept the King\'s Peace',
      ],
      answer: 0,
      explanation: 'Leuctra is the terminal point of this topic. Epaminondas massed the Theban left fifty shields deep against the Spartan right and broke it, killing King Cleombrotus. The defeat ended Spartan hegemony and led to the liberation of Messenia, which removed the helot base the whole system depended on. Sparta could not recover because of oliganthropia: Spartiate numbers had fallen from around 8,000 at the time of the Persian Wars to roughly 1,000 by Leuctra.'
    },
    {
      id: 'spa-17', topic: 'Sparta', difficulty: 4, type: 'short',
      prompt: 'Explain oliganthropia and how it contributed to Spartan decline.',
      accept: ['a shortage of full spartiate citizens caused by land concentrating in fewer hands so men could not meet their syssition contributions and lost citizen status leaving too few hoplites to sustain hegemony'],
      keywords: [
        ['shortage', 'decline in numbers', 'few', 'manpower', 'citizen numbers', 'oliganthropia'],
        ['land', 'kleros', 'property', 'inherit', 'wealth', 'concentrat', 'syssition', 'contribut'],
        ['status', 'hypomeiones', 'inferior', 'lost citizen', 'army', 'hoplite', 'hegemony'],
      ],
      minKeywords: 2,
      explanation: 'Oliganthropia is the shortage of full citizens. The mechanism matters more than the label: Spartiate status required a land allotment large enough to fund a fixed contribution to a syssition. As land concentrated through inheritance — Aristotle blames women\'s inheritance rights and the failure to redistribute — more men fell below the threshold and were demoted to hypomeiones. Numbers fell from about 8,000 to roughly 1,000 by Leuctra, so a single defeat could not be absorbed. Combine it with the earthquake of 464 and the losses at Sphacteria, and Sparta\'s system proves rigid rather than resilient.'
    },
    {
      id: 'spa-18', topic: 'Sparta', difficulty: 2, type: 'mc',
      prompt: 'The perioikoi differed from the helots in that they:',
      options: [
        'Were free, lived in their own communities, ran crafts and trade, and served in the Spartan army',
        'Were owned by individual Spartiates rather than by the state',
        'Held full Spartiate citizenship but lived outside Sparta itself',
        'Were foreign residents forbidden to bear arms',
      ],
      answer: 0,
      explanation: 'The perioikoi, "dwellers around", were free inhabitants of Laconian and Messenian towns who managed the economic activity Spartiates were barred from — crafts, trade, manufacture, including armour — and fought as hoplites alongside them. They lacked political rights at Sparta. Their loyalty is a useful counterweight to the picture of a society held together purely by terror: unlike the helots, the perioikoi rarely revolted.'
    },
    {
      id: 'spa-19', topic: 'Sparta', difficulty: 3, type: 'mc',
      prompt: 'The Spartan earthquake of about 464 BC is significant because it:',
      options: [
        'Triggered a major Messenian helot revolt, and Sparta\'s dismissal of the Athenian relief force under Cimon soured relations between the two states',
        'Destroyed the sanctuary of Artemis Orthia, ending the cult',
        'Forced Sparta to abandon the dual kingship',
        'Prompted the Persians to launch a third invasion of Greece',
      ],
      answer: 0,
      explanation: 'The earthquake devastated Sparta and the helots of Messenia seized the moment to revolt, besieging Mount Ithome. Sparta called for allied help, then sent Cimon\'s 4,000 Athenian hoplites home — reportedly fearing their revolutionary sympathies. The insult led directly to Cimon\'s ostracism, an Athenian alliance with Argos, and the drift toward the First Peloponnesian War. It is the clearest example of Spartan domestic vulnerability shaping Greek international politics.'
    },
    {
      id: 'spa-20', topic: 'Sparta', difficulty: 4, type: 'short',
      prompt: 'Give TWO ways the Spartan system prioritised military readiness over economic development.',
      accept: ['spartiates were barred from crafts and trade so the economy was left to perioikoi and helots while iron currency and austerity discouraged accumulation and full time training was funded by helot labour on the kleroi'],
      keywords: [
        ['barred', 'forbidden', 'not allowed', 'no trade', 'no craft', 'full time', 'training', 'agoge'],
        ['helot', 'kleros', 'perioikoi', 'labour', 'farm', 'land'],
        ['currency', 'iron', 'coin', 'austerity', 'wealth', 'luxury', 'accumulat'],
      ],
      minKeywords: 2,
      explanation: 'Spartiates were prohibited from crafts, trade and agriculture, so all productive activity fell to perioikoi and helots — the citizen body was in effect a standing army maintained by other people\'s labour on the kleroi. Sparta also refused minted silver coinage, retaining cumbersome iron spits, which discouraged the accumulation and exchange that built wealth elsewhere in Greece. The consequence is the historical judgement worth making: the system delivered unmatched hoplite quality but no economic depth and no mechanism for replacing citizen losses, which is why it could not survive Leuctra.'
    },

    /* ------- Targeted fixes for errors that cost trial marks ------- */
    {
      id: 'anc-37', topic: 'The Greek World 500–440 BC', difficulty: 2, type: 'mc',
      prompt: 'Sardis, burned in 498 BC, was:',
      options: [
        'The Lydian satrapal capital in western Asia Minor, burned during the Ionian Revolt',
        'A Persian royal capital in the empire\'s heartland, sacked during the Persian Wars',
        'An Athenian colony on the coast of Thrace',
        'The Persian naval base from which Xerxes launched the invasion of 480 BC',
      ],
      answer: 0,
      explanation: 'Sardis was the satrapal capital of Lydia in western Asia Minor and the western terminus of the Royal Road — not a city in Persia proper, and not a Persian War battle. Athenian and Eretrian forces burned it in 498 BC during the Ionian Revolt, and Herodotus 5.97 calls those twenty ships the beginning of evils. The Persian royal capitals were Persepolis, Susa, Ecbatana and Babylon. Placing Sardis in Persia is a factual slip that undercuts an otherwise sound answer.'
    },
    {
      id: 'anc-38', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'short',
      prompt: 'Explain the mechanism by which Miltiades\' tactics won Marathon. Say what he did and why it worked.',
      accept: ['he thinned the greek centre and reinforced the wings so the stronger persian centre pushed through into a deliberate trap and was enveloped from both sides converting numerical inferiority into a tactical advantage'],
      keywords: [
        ['thin', 'weak', 'centre', 'wing', 'strengthen', 'reinforc'],
        ['envelop', 'both sides', 'flank', 'surround', 'trap', 'close in', 'double'],
      ],
      minKeywords: 2,
      explanation: 'Naming a factor is not explaining it — this is the habit that cost the essay marks. Miltiades thinned the Greek centre and reinforced the wings, so the stronger Persian centre pushed through into a deliberate trap and the Greek wings wheeled inward to envelop it from both sides. Leadership converted numerical inferiority into a tactical advantage; that is the "how and why" sentence. Add Herodotus 6.117 for the casualty figures, roughly 6,400 Persian dead to 192 Athenian, with a note on Herodotean exaggeration. And note the person: it was Miltiades, who persuaded the polemarch Callimachus to give the deciding vote — not Themistocles, whose contribution came a decade later.'
    },
    {
      id: 'anc-39', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'short',
      prompt: 'Thermopylae was a defeat. Explain how a leadership essay converts it into evidence for Greek victory.',
      accept: ['leonidas chose a pass that neutralised persian cavalry and numbers and the delay plus the propaganda value bought time to evacuate attica and preserved the fleet so themistocles could win at salamis'],
      keywords: [
        ['pass', 'narrow', 'terrain', 'cavalry', 'numbers', 'neutralis', 'chose'],
        ['delay', 'time', 'evacuat', 'attica', 'fleet', 'preserv', 'morale', 'propaganda'],
        ['salamis', 'themistocles', 'later', 'victory'],
      ],
      minKeywords: 2,
      explanation: 'The marker\'s note was explicit: "this was a loss, so you needed to state how there was victory later due to Themistocles, at Salamis." The chain: the pass was chosen because it neutralised Persian cavalry and numerical superiority; when Ephialtes betrayed the Anopaea path, Leonidas dismissed the allies and held with a rearguard of 300 Spartiates, 700 Thespians and 400 Thebans; the delay and the enormous propaganda value bought the evacuation of Attica and preserved the fleet intact for Salamis. A tactical defeat converted into strategic benefit — which is a leadership decision, not an accident. Get the numbers right: Leonidas led about 7,000 allies initially and dismissed most before the final stand.'
    },
    {
      id: 'anc-40', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'short',
      prompt: 'A leadership essay must handle counter-factors such as terrain and hoplite armour. What is the framing that keeps them relevant?',
      accept: ['frame each counter factor as the product of a leadership decision since commanders chose thermopylae salamis and plataea and themistocles forced the naval engagement that broke persian supply'],
      keywords: [
        ['leadership decision', 'commanders chose', 'chose', 'decision', 'through leadership', 'because they'],
        ['terrain', 'narrow', 'battlefield', 'supply', 'fleet', 'armour', 'hoplite'],
      ],
      minKeywords: 2,
      explanation: 'The marker wrote that listing terrain, hoplite armour and Persian numbers "doesn\'t link to leadership unless you say it was strategy by the leaders" — so make every counter-factor operate through a leadership decision. Terrain mattered because commanders chose Thermopylae, Salamis and Plataea. Persian supply lines bit because Themistocles forced the naval engagement that broke Persian control of the sea. The Hellenic League held because Eurybiades deferred to Themistocles\' plan. Concede that leadership was necessary but not sufficient, then argue the other factors operated through it — that concession-then-reframe is what the top bands reward.'
    },
    {
      id: 'anc-41', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'Which contrast between Egypt and Babylon under Xerxes is correct?',
      options: [
        'Egypt kept its religious autonomy and local cults while Xerxes dropped "King of Babylon" from his titulary after the Babylonian revolts',
        'Babylon kept its religious autonomy while Egypt\'s temples were closed and its cults suppressed',
        'Both provinces lost their religious institutions entirely after their revolts',
        'Neither province revolted during Xerxes\' reign',
      ],
      answer: 0,
      explanation: 'Keep the two straight — confusing them was flagged in the trial. Egypt: revolted 486–484 BC, inherited from Darius\' final year, crushed by Xerxes with his brother Achaemenes installed as satrap; temples and local cults continued, and what changed was that Xerxes dropped the pharaonic titulary his father had used. Babylon: revolted around 484 and again in 482 under Bel-shimanni and then Shamash-eriba, suppressed by Megabyzus; Xerxes dropped "King of Babylon" from his titles, and later Greek tradition claims the Marduk statue was removed or melted — a claim modern scholars doubt.'
    },
    {
      id: 'anc-42', topic: 'Xerxes', difficulty: 3, type: 'mc',
      prompt: 'Besides Atossa\'s Cyrus bloodline and Artobazanes being born before Darius became king, Herodotus 7.3 adds that Darius was influenced by:',
      options: [
        'Demaratus, the exiled Spartan king, who advised that a son born after his father became king takes precedence',
        'Mardonius, who argued that Xerxes was the better military commander',
        'The Magi, who interpreted a dream in Xerxes\' favour',
        'Artabanus, who counselled against choosing the elder son',
      ],
      answer: 0,
      explanation: 'This is the addition the trial answer was missing. Herodotus 7.3 has Demaratus, the exiled Spartan king at the Persian court, advising Darius that among the Spartans a son born after his father became king takes precedence over an elder brother born before. The complete answer combines four elements: Atossa\'s descent from Cyrus, Artobazanes being born before Darius took the throne, Demaratus\' advice, and Xerxes\' own claim in the Harem Inscription (XPf) that Ahuramazda\'s will made him greatest after his father — Greek succession intrigue against serene royal propaganda.'
    },
    {
      id: 'anc-43', topic: 'Xerxes', difficulty: 4, type: 'short',
      prompt: 'Give TWO pieces of evidence you could use to argue AGAINST the view that Xerxes ended Persian religious tolerance.',
      accept: ['the daiva inscription names no place or date and uses stock royal phrasing so it may be timeless rhetoric while the persepolis fortification tablets record rations and offerings for non persian cults and egypt kept its religious autonomy'],
      keywords: [
        ['no place', 'no date', 'stock', 'formula', 'timeless', 'rhetoric', 'phrasing', 'earlier inscription'],
        ['fortification tablet', 'tablet', 'ration', 'offering', 'elamite', 'babylonian', 'local cult', 'funding'],
        ['egypt', 'autonomy', 'temple', 'continued'],
      ],
      minKeywords: 2,
      explanation: 'The marker noted you are allowed to disagree with a source, and that saying so explicitly is what moves this from 9/15. Against Source J\'s reading of Xerxes ending a laissez-faire approach: the Daiva Inscription (XPh) names no place and no date and uses stock royal phrasing found in earlier Achaemenid inscriptions, so it may be timeless royal rhetoric rather than a record of an event. The Persepolis Fortification Tablets show continued state funding of local cults, with rations for non-Persian religious personnel and offerings to Elamite and Babylonian deities alongside Ahuramazda. Egypt retained its religious autonomy. Briant and Kuhrt read the daiva episode as an assertion of royal order over "the Lie" rather than a programme of persecution. Set the source against the Persepolis evidence and then reach a judgement.'
    },
    {
      id: 'anc-44', topic: 'The Greek World 500–440 BC', difficulty: 4, type: 'short',
      prompt: 'Give TWO pieces of evidence that the Delian League had become an Athenian empire by 440 BC.',
      accept: ['naxos was subjugated around 470 contrary to custom and thasos was crushed in 465 for athenian economic interest while the treasury moved from delos to athens in 454 and tribute funded the parthenon'],
      keywords: [
        ['naxos', 'thasos', 'revolt', 'coerc', 'subjugat', 'crushed', 'walls razed'],
        ['treasury', '454', 'delos to athens', 'quota', 'tribute list', 'parthenon', 'athena', 'sixtieth'],
        ['ships', 'money', 'phoros', 'demilitaris', 'cleruch', 'garrison', 'imposed democrac'],
      ],
      minKeywords: 2,
      explanation: 'Coercion: Naxos around 470 was, in Thucydides 1.98, the first ally enslaved contrary to established custom; Thasos in 465 was besieged over mines and trade — Athenian economic interest, not the Persian war — its walls razed and fleet confiscated. Financial control: the treasury moved from Delos to Athens in 454, a sixtieth of tribute was dedicated to Athena, and tribute financed the Parthenon from 447; the epigraphic quota lists show allies as tribute-payers rather than partners. Structural control: Cimon\'s practice of commuting ship contributions to money demilitarised the allies while concentrating naval power in Athens (Plutarch, Cimon 11), reinforced by cleruchies, garrisons, imposed democracies and legal cases transferred to Athens. Note the historiographical debate: Thucydides blames allied laziness plus Athenian ambition, while Meiggs traces a gradual pragmatic slide rather than a plan.'
    },
    {
      id: 'anc-45', topic: 'Cities of Vesuvius', difficulty: 4, type: 'short',
      prompt: 'Explain ONE value of statues as evidence at Pompeii and Herculaneum, using a named example.',
      accept: ['statues carry inscriptions so the statue of eumachia dedicated by the fullers shows a woman as public priestess and patron of a trade guild which is direct evidence of female status and patronage'],
      keywords: [
        ['inscription', 'dedicat', 'honorific', 'epigraph'],
        ['eumachia', 'balbus', 'nonius', 'augustales', 'freedmen'],
        ['status', 'patron', 'priestess', 'career', 'benefactor', 'guild', 'mobility', 'women'],
      ],
      minKeywords: 2,
      explanation: 'The marker wanted the value explained through named evidence, not asserted. The key move: statues carry inscriptions, and the inscription is the historical evidence. The statue of Eumachia in her building on the forum, dedicated by the fullers, shows a woman as public priestess and patron of a trade guild — direct evidence of female status, patronage, and the link between economic and social power. At Herculaneum, Marcus Nonius Balbus has multiple statues plus an honorific inscription recording his career as proconsul and benefactor, and a funerary altar recording honours voted by the town council. Statues of freedmen and Augustales evidence routes of social mobility for ex-slaves. Then the limitations: idealised portrait types show status rather than likeness; only those who could afford or be voted a statue appear, so slaves, the poor and most women are invisible; and Bourbon-era removal stripped many of their original context.'
    },
    {
      id: 'anc-46', topic: 'Cities of Vesuvius', difficulty: 3, type: 'mc',
      prompt: 'The 2010 collapse of the Schola Armaturarum is significant because it:',
      options: [
        'Triggered UNESCO warnings and led to the €105m EU-funded Great Pompeii Project',
        'Destroyed the last unexcavated third of the site',
        'Proved that the AD 62 earthquake damage had never been repaired',
        'Ended all tourist access to Pompeii for a decade',
      ],
      answer: 0,
      explanation: 'The collapse of the Schola Armaturarum — called the House of the Gladiator in some marking guidelines — was the scandal that forced action. It brought UNESCO warnings and produced the Great Pompeii Project, roughly €105 million of EU funding for stabilisation, drainage and monitoring, under which the Regio V discoveries since 2018 were made: the thermopolium with its painted menu, the leopard fresco, and the Civita Giuliana chariot and slave room. It is the pivot of any answer on the costs and benefits of continued excavation.'
    },
    {
      id: 'anc-47', topic: 'Cities of Vesuvius', difficulty: 4, type: 'short',
      prompt: 'Give ONE benefit and ONE cost of continued excavation at Pompeii, then state a judgement.',
      accept: ['regio v discoveries and the vesuvius challenge reading carbonised papyri add knowledge but every newly exposed structure adds a permanent maintenance burden so benefits outweigh costs only where excavation is paired with funded conservation'],
      keywords: [
        ['regio v', 'thermopolium', 'chariot', 'slave room', 'papyri', 'vesuvius challenge', 'dna', 'ct', 'discover', 'knowledge'],
        ['maintenance', 'conserv', 'collapse', 'exposure', 'weather', 'burden', 'cost', 'unexcavated', 'tourist'],
        ['judgement', 'outweigh', 'only where', 'provided', 'therefore', 'conclude', 'should'],
      ],
      minKeywords: 2,
      explanation: 'Three paragraphs: benefits, costs, judgement — the trial answer ran them together in one block, which capped it at 6/10. Benefits: the Regio V discoveries since 2018, the Vesuvius Challenge virtually unrolling the Herculaneum papyri, DNA and CT analysis of the casts overturning assumptions about family groupings, and tourism revenue funding conservation. Costs: the Schola Armaturarum collapse in 2010, every newly exposed structure adding a permanent maintenance burden, weather, vegetation and over 2.5 million annual visitors — which is why roughly a third of Pompeii is deliberately left unexcavated for future methods. Judgement: commit in the opening line and hold it — that benefits outweigh costs only where excavation is paired with funded conservation, which is exactly the Great Pompeii Project model. And quote cleanly: one short phrase from a source, then explain it, rather than stitching fragments together.'
    },
  ]
};
