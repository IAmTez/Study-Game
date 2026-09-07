/* NSW HSC Ancient History.

   Targeted at this course: the compulsory core (Cities of Vesuvius) plus
   Persia, Xerxes, and the Greek Wars. */

export const SUBJECT = {
  id: 'ancient',
  name: 'Ancient History',
  short: 'ANC',
  colour: '#d98f5a',
  syllabus: 'NSW HSC Ancient History',
  topics: ['Cities of Vesuvius', 'Persia', 'Xerxes', 'The Greek Wars'],
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
    /* ---------------- Persia ---------------- */
    {
      id: 'per-01', topic: 'Persia', difficulty: 1, type: 'mc',
      prompt: 'The Achaemenid Empire was founded by:',
      options: ['Darius I', 'Cyrus II (the Great)', 'Cambyses II', 'Xerxes I'],
      answer: 1,
      explanation: 'Cyrus II (559-530 BC) took Media in 550, Lydia around 546 and Babylon in 539, creating the largest empire the Near East had seen. Learn the sequence: Cyrus II, Cambyses II, Darius I, Xerxes I, Artaxerxes I.'
    },
    {
      id: 'per-02', topic: 'Persia', difficulty: 2, type: 'mc',
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
      id: 'per-03', topic: 'Persia', difficulty: 2, type: 'mc',
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
      id: 'per-04', topic: 'Persia', difficulty: 2, type: 'short',
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
      id: 'per-05', topic: 'Persia', difficulty: 3, type: 'mc',
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
      id: 'per-06', topic: 'Persia', difficulty: 3, type: 'mc',
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
      id: 'per-07', topic: 'Persia', difficulty: 3, type: 'short',
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
      id: 'per-08', topic: 'Persia', difficulty: 3, type: 'mc',
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
      id: 'per-09', topic: 'Persia', difficulty: 4, type: 'mc',
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
      id: 'per-10', topic: 'Persia', difficulty: 4, type: 'short',
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
      id: 'per-11', topic: 'Persia', difficulty: 2, type: 'mc',
      prompt: 'Which Persian capital was the ceremonial centre, used especially for the New Year festival?',
      options: ['Susa', 'Ecbatana', 'Persepolis', 'Pasargadae'],
      answer: 2,
      explanation: 'Persepolis was ceremonial and symbolic; Susa was the main administrative capital; Ecbatana was the cool summer residence; Pasargadae was Cyrus\'s foundation and held his tomb; Babylon remained a major centre. The court moved between them seasonally, which is itself a statement about how the empire was governed.'
    },
    {
      id: 'per-12', topic: 'Persia', difficulty: 4, type: 'mc',
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
      id: 'per-13', topic: 'Persia', difficulty: 1, type: 'short',
      prompt: 'Name the Achaemenid kings from Cyrus II to Xerxes I, in order.',
      accept: ['cyrus cambyses darius xerxes'],
      keywords: [['cyrus'], ['cambyses'], ['darius'], ['xerxes']],
      minKeywords: 3,
      explanation: 'Cyrus II (559-530), Cambyses II (530-522), Darius I (522-486), Xerxes I (486-465). Bardiya/Gaumata briefly holds power in 522 before Darius seizes the throne - the event the Behistun inscription exists to justify. Getting this spine secure makes every other date in the period easier to place.'
    },
    {
      id: 'per-14', topic: 'Persia', difficulty: 5, type: 'short',
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

    /* ---------------- The Greek Wars ---------------- */
    {
      id: 'grw-01', topic: 'The Greek Wars', difficulty: 1, type: 'mc',
      prompt: 'The Ionian Revolt against Persian rule began in 499 BC and was led initially by:',
      options: ['Themistocles of Athens', 'Aristagoras of Miletus', 'Leonidas of Sparta', 'Miltiades of Athens'],
      answer: 1,
      explanation: 'Aristagoras, tyrant of Miletus, launched the revolt after a failed expedition against Naxos left him exposed. He sought help in Greece: Sparta refused, Athens sent twenty ships and Eretria five. Sardis was burned in 498; the revolt was crushed at the naval battle of Lade in 494 and Miletus destroyed.'
    },
    {
      id: 'grw-02', topic: 'The Greek Wars', difficulty: 2, type: 'mc',
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
      id: 'grw-03', topic: 'The Greek Wars', difficulty: 1, type: 'mc',
      prompt: 'The battle of Marathon was fought in:',
      options: ['499 BC', '490 BC', '480 BC', '479 BC'],
      answer: 1,
      explanation: 'Marathon, 490 BC, ended Darius\'s punitive expedition under Datis and Artaphernes, which had already destroyed Eretria. Keep the two invasions distinct: Darius sends the expedition defeated at Marathon in 490; Xerxes leads the full invasion of 480-479 (Thermopylae, Artemisium and Salamis in 480; Plataea and Mycale in 479).'
    },
    {
      id: 'grw-04', topic: 'The Greek Wars', difficulty: 3, type: 'mc',
      prompt: 'At Marathon, the Athenian commander usually credited with the decisive plan was:',
      options: ['Callimachus', 'Miltiades', 'Aristides', 'Themistocles'],
      answer: 1,
      explanation: 'Miltiades, who knew Persian methods from service in the Chersonese, is credited with persuading the generals to attack and with thinning the Athenian centre so the strengthened wings could envelop the Persian flanks. Callimachus, the polemarch, held formal command and died in the fighting. Herodotus gives Athenian losses as 192 against 6,400 Persians - the disparity is plausible in outline, since most casualties in ancient battles came during the rout.'
    },
    {
      id: 'grw-05', topic: 'The Greek Wars', difficulty: 2, type: 'short',
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
      id: 'grw-06', topic: 'The Greek Wars', difficulty: 3, type: 'mc',
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
      id: 'grw-07', topic: 'The Greek Wars', difficulty: 2, type: 'mc',
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
      id: 'grw-08', topic: 'The Greek Wars', difficulty: 2, type: 'mc',
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
      id: 'grw-09', topic: 'The Greek Wars', difficulty: 3, type: 'short',
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
      id: 'grw-10', topic: 'The Greek Wars', difficulty: 3, type: 'mc',
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
      id: 'grw-11', topic: 'The Greek Wars', difficulty: 4, type: 'mc',
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
      id: 'grw-12', topic: 'The Greek Wars', difficulty: 4, type: 'short',
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
      id: 'grw-13', topic: 'The Greek Wars', difficulty: 2, type: 'mc',
      prompt: 'The Greek land victory at Plataea in 479 BC was commanded by:',
      options: ['Themistocles of Athens', 'Pausanias of Sparta', 'Aristides of Athens', 'Leotychidas of Sparta'],
      answer: 1,
      explanation: 'Pausanias, regent for the young Spartan king, commanded the largest Greek army yet assembled; Mardonius was killed and the Persian camp stormed. The naval victory at Mycale followed in the same year, sparking a renewed Ionian revolt. Plataea, not Salamis, ended the Persian presence in mainland Greece - though Salamis gets the attention because it saved the campaign from being lost in 480.'
    },
    {
      id: 'grw-14', topic: 'The Greek Wars', difficulty: 3, type: 'mc',
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
      id: 'grw-15', topic: 'The Greek Wars', difficulty: 4, type: 'mc',
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
      id: 'grw-16', topic: 'The Greek Wars', difficulty: 5, type: 'short',
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
      id: 'grw-17', topic: 'The Greek Wars', difficulty: 5, type: 'mc',
      prompt: 'The strongest caution to apply to the Greek "freedom versus despotism" framing of the wars is that:',
      options: [
        'It was invented by nineteenth-century historians and has no ancient basis',
        'It is the retrospective account of the winners, written by states that were themselves slave-owning and, in Athens\'s case, soon imperial',
        'The Persians left no written records of any kind',
        'Herodotus was not Greek and therefore had no stake in it'
      ],
      answer: 1,
      explanation: 'The framing is genuinely ancient - Aeschylus and Herodotus both work with it - but it is the victors\' account. The states defending "freedom" held slaves, many Greeks medised willingly, and within a generation Athens was coercing its own allies with the fleet built to resist Persia. From the Persian side this was a frontier setback, unrecorded in the royal inscriptions. Recognising the framing as a construction, without pretending it was invented later, is what a high-band answer does.'
    }
  ]
};
