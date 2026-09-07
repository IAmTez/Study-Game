/* NSW HSC Ancient History — Cities of Vesuvius (core), Ancient Societies,
   Personalities in Their Times, and Historical Periods. */

export const SUBJECT = {
  id: 'ancient',
  name: 'Ancient History',
  short: 'ANC',
  colour: '#d98f5a',
  syllabus: 'NSW HSC Ancient History',
  topics: ['Cities of Vesuvius', 'Ancient Societies', 'Personalities in Their Times', 'Historical Periods'],
  questions: [

    /* ---------------- Cities of Vesuvius ---------------- */
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
      id: 'anc-13', topic: 'Ancient Societies', difficulty: 1, type: 'mc',
      prompt: 'In Spartan society, the helots were:',
      options: [
        'Free non-citizens who traded and manufactured goods',
        'An enserfed population, largely Messenian, who worked the land for Spartiates',
        'The elite council of elders',
        'Foreign mercenaries hired for campaigns',
      ],
      answer: 1,
      explanation: 'Helots were state-owned serfs, mostly Messenian, tied to the land and required to hand over a portion of produce to their Spartiate holder. Their labour freed Spartiates for full-time military life — and the constant fear of helot revolt shaped Spartan policy, including the krypteia. The perioikoi ("dwellers around") were the free non-citizens who handled trade and craft.'
    },
    {
      id: 'anc-14', topic: 'Ancient Societies', difficulty: 2, type: 'mc',
      prompt: 'The Spartan gerousia consisted of:',
      options: [
        '5 annually elected magistrates',
        '28 elders over 60 plus the two kings',
        'The full assembly of Spartiate males over 30',
        '30 hereditary aristocratic families',
      ],
      answer: 1,
      explanation: 'The gerousia was 28 elders aged over 60, elected for life, plus the two kings — 30 in total. It prepared business for the apella (assembly of Spartiates over 30) and acted as a court. The five ephors, elected annually, held wide executive and supervisory power, including over the kings. Sparta\'s dual kingship drew on the Agiad and Eurypontid houses.'
    },
    {
      id: 'anc-15', topic: 'Ancient Societies', difficulty: 3, type: 'short',
      prompt: 'Explain the purpose of the Spartan agoge.',
      accept: ['the agoge was the state education system that trained boys into disciplined obedient soldiers loyal to sparta'],
      keywords: [
        ['train', 'education', 'raise', 'upbringing', 'system'],
        ['boy', 'male', 'children', 'youth', 'seven'],
        ['soldier', 'warrior', 'military', 'discipline', 'obedien', 'endur', 'loyal', 'state'],
      ],
      minKeywords: 2,
      explanation: 'The agoge took boys from about age seven into a state-run system of communal living, physical hardship, deprivation, and training in obedience and endurance, continuing to age 30. Its purpose was to subordinate the individual to the state and produce disciplined hoplites. Be careful with sources here: much of the detail comes from Plutarch, writing centuries later, and reflects the idealising "Spartan mirage".'
    },
    {
      id: 'anc-16', topic: 'Ancient Societies', difficulty: 3, type: 'mc',
      prompt: 'In New Kingdom Egypt, the concept of ma\'at referred to:',
      options: [
        'The afterlife journey of the pharaoh',
        'Cosmic order, truth and justice, which the pharaoh was obliged to uphold',
        'The annual inundation of the Nile',
        'The priestly hierarchy of Amun at Karnak',
      ],
      answer: 1,
      explanation: 'Ma\'at was order, truth, balance and justice — set against isfet (chaos). The pharaoh\'s central ideological duty was to maintain ma\'at, which justified his rule, his building programs and his military campaigns against foreign enemies who embodied chaos. It is the interpretive key to most royal inscriptions and temple reliefs.'
    },
    {
      id: 'anc-17', topic: 'Ancient Societies', difficulty: 4, type: 'mc',
      prompt: 'The growing power of the Amun priesthood at Karnak during the New Kingdom is significant because it:',
      options: [
        'Created a rival power base that could constrain or influence the pharaoh',
        'Ended the practice of mummification',
        'Prevented Egypt from expanding into Nubia',
        'Replaced the vizier as head of the civil administration',
      ],
      answer: 0,
      explanation: 'Successive pharaohs, especially after Thutmose III\'s campaigns, endowed Amun\'s temples with land, plunder and personnel until the priesthood commanded enormous economic and political weight. This is a standard explanation for Akhenaten\'s religious revolution and, ultimately, for the priesthood\'s de facto rule in the Third Intermediate Period.'
    },
    {
      id: 'anc-18', topic: 'Ancient Societies', difficulty: 2, type: 'short',
      prompt: 'Name TWO groups in Spartan society besides the Spartiates.',
      accept: ['helots and perioikoi'],
      keywords: [['helot'], ['perioikoi', 'perioeci', 'perioik'], ['inferior', 'mothakes', 'neodamodeis', 'women']],
      minKeywords: 2,
      explanation: 'Spartiates (the homoioi or "equals"), perioikoi (free non-citizens in surrounding communities who conducted trade and manufacture and served militarily), and helots (state serfs). Lower-status groups also existed — mothakes, neodamodeis and hypomeiones — and the declining number of full Spartiates (oliganthropia) became a structural crisis.'
    },

    /* ---------------- Personalities in Their Times ---------------- */
    {
      id: 'anc-19', topic: 'Personalities in Their Times', difficulty: 1, type: 'mc',
      prompt: 'Hatshepsut\'s mortuary temple, Djeser-Djeseru, is located at:',
      options: ['Karnak', 'Deir el-Bahri', 'Abu Simbel', 'Saqqara'],
      answer: 1,
      explanation: 'Djeser-Djeseru ("Holy of Holies") at Deir el-Bahri, on the west bank at Thebes, beside the earlier temple of Mentuhotep II. Its terraced colonnades carry the reliefs of the Punt expedition and of her divine birth — both key propaganda images legitimising a female pharaoh. Her architect Senenmut is traditionally credited with the design.'
    },
    {
      id: 'anc-20', topic: 'Personalities in Their Times', difficulty: 2, type: 'mc',
      prompt: 'Hatshepsut is frequently depicted in statuary with a false beard and male kilt because:',
      options: [
        'She was believed to be physically male',
        'She was adopting the established iconography of pharaonic kingship to legitimise her rule',
        'Egyptian artists were forbidden from depicting women',
        'The statues were recarved after her death',
      ],
      answer: 1,
      explanation: 'The regalia — nemes headdress, false beard, shendyt kilt — were the visual language of kingship itself, not a claim about her body. Depicting herself in them asserted that she was a legitimate pharaoh performing the pharaoh\'s role. Her titulary, the divine birth reliefs and the claim of designation by Thutmose I served the same purpose.'
    },
    {
      id: 'anc-21', topic: 'Personalities in Their Times', difficulty: 4, type: 'short',
      prompt: 'Why is the erasure of Hatshepsut\'s images and names historically significant?',
      accept: ['the erasure occurred long after her death suggesting a political motive about the succession rather than personal revenge by thutmose iii'],
      keywords: [
        ['erase', 'removed', 'defaced', 'destroy', 'chiselled', 'damnatio'],
        ['thutmose', 'tuthmosis', 'successor', 'succession', 'legitimacy', 'political'],
        ['late', 'later', 'years after', 'decades', 'not immediate', 'delay', 'motive', 'revenge'],
      ],
      minKeywords: 2,
      explanation: 'Her images and cartouches were systematically removed from monuments, but evidence indicates this began around 20 years after her death, late in Thutmose III\'s reign. That timing undermines the older interpretation of personal vengeance by a resentful stepson, and supports a political reading: securing the succession for Amenhotep II by erasing an irregular female king from the official record. It is a standard example of how dating evidence overturns a historical interpretation.'
    },
    {
      id: 'anc-22', topic: 'Personalities in Their Times', difficulty: 2, type: 'mc',
      prompt: 'Agrippina the Younger was the mother of which emperor?',
      options: ['Claudius', 'Nero', 'Caligula', 'Titus'],
      answer: 1,
      explanation: 'Agrippina the Younger was sister of Caligula, niece and then wife of Claudius, and mother of Nero. She married Claudius in AD 49, secured Nero\'s adoption over Claudius\'s own son Britannicus, and was killed on Nero\'s orders in AD 59. Our picture comes largely from Tacitus, Suetonius and Cassius Dio.'
    },
    {
      id: 'anc-23', topic: 'Personalities in Their Times', difficulty: 4, type: 'short',
      prompt: 'Explain ONE reason to treat Tacitus\'s portrayal of Agrippina with caution.',
      accept: ['tacitus wrote decades later with a senatorial bias hostile to imperial women exercising power'],
      keywords: [
        ['later', 'after', 'decades', 'not contemporary', 'second hand'],
        ['bias', 'hostile', 'senatorial', 'moralis', 'stereotype', 'gender', 'women', 'agenda', 'rhetorical', 'dramatic'],
      ],
      minKeywords: 1,
      explanation: 'Tacitus wrote roughly fifty years after the events, from a senatorial standpoint hostile to the imperial system, and worked within a moralising tradition that cast politically active women as unnatural and scheming. His narrative is shaped for dramatic and didactic effect. This does not make him worthless — he names sources and preserves detail found nowhere else — but claims about Agrippina\'s motives and private conduct should be weighed against numismatic and epigraphic evidence, which shows her in an unprecedented public position.'
    },
    {
      id: 'anc-24', topic: 'Personalities in Their Times', difficulty: 3, type: 'mc',
      prompt: 'Xerxes\' invasion of Greece, including the battles of Thermopylae and Salamis, took place in:',
      options: ['490 BC', '480 BC', '431 BC', '404 BC'],
      answer: 1,
      explanation: '480 BC. Distinguish it from Darius\'s earlier expedition defeated at Marathon in 490 BC. In 480 the Greeks held at Thermopylae and were defeated, Athens was evacuated and burned, and the Greek fleet won decisively at Salamis; the land campaign ended at Plataea in 479 BC. Our main narrative source, Herodotus, is Greek and writing later.'
    },
    {
      id: 'anc-25', topic: 'Personalities in Their Times', difficulty: 5, type: 'short',
      prompt: 'Assess the difficulty of reconstructing Xerxes\' aims from the available evidence.',
      accept: ['greek sources are hostile and persian royal inscriptions are ideological so neither gives his actual motives'],
      keywords: [
        ['greek', 'herodotus', 'hostile', 'enemy', 'bias', 'stereotype', 'barbarian'],
        ['persian', 'inscription', 'daiva', 'royal', 'ideolog', 'propaganda', 'formulaic'],
        ['motive', 'aim', 'intention', 'reconstruct', 'limited', 'lack'],
      ],
      minKeywords: 2,
      explanation: 'The problem is that both bodies of evidence are shaped. Greek accounts — Herodotus above all, and Aeschylus\'s Persians — are written by the victors and cast Xerxes through the stereotype of the despotic, hubristic barbarian. Persian royal inscriptions (the Daiva inscription, Persepolis reliefs and foundation texts) are formulaic ideological statements about the king upholding order under Ahuramazda, not records of policy. There is no Persian narrative history. The honest conclusion is that his aims can be inferred from actions and imperial precedent but cannot be recovered from testimony.'
    },

    /* ---------------- Historical Periods ---------------- */
    {
      id: 'anc-26', topic: 'Historical Periods', difficulty: 1, type: 'mc',
      prompt: 'The Julio-Claudian emperors, in order, were:',
      options: [
        'Augustus, Tiberius, Caligula, Claudius, Nero',
        'Julius Caesar, Augustus, Tiberius, Claudius, Nero',
        'Augustus, Caligula, Tiberius, Nero, Claudius',
        'Tiberius, Augustus, Claudius, Caligula, Nero',
      ],
      answer: 0,
      explanation: 'Augustus (27 BC–AD 14), Tiberius (14–37), Caligula (37–41), Claudius (41–54), Nero (54–68). Julius Caesar was never emperor. The dynasty ended with Nero\'s suicide, followed by the civil war of AD 69, the Year of the Four Emperors.'
    },
    {
      id: 'anc-27', topic: 'Historical Periods', difficulty: 2, type: 'mc',
      prompt: 'The Delian League was founded in 478 BC primarily to:',
      options: [
        'Govern the internal affairs of Athens',
        'Continue the war against Persia and defend Greek states from renewed attack',
        'Coordinate trade across the Aegean',
        'Oppose Spartan expansion in the Peloponnese',
      ],
      answer: 1,
      explanation: 'Founded as an anti-Persian alliance with its treasury on Delos, members contributing ships or tribute. Athens progressively converted it into an empire: the treasury moved to Athens in 454 BC, secession was forcibly prevented (Naxos, Thasos), and tribute funded the Athenian building program. Thucydides presents this growth of Athenian power as the underlying cause of the Peloponnesian War.'
    },
    {
      id: 'anc-28', topic: 'Historical Periods', difficulty: 3, type: 'mc',
      prompt: 'The Behistun inscription is significant to historians of Persia because it:',
      options: [
        'Records Xerxes\' account of the invasion of Greece',
        'Is Darius I\'s trilingual account of his accession, and provided the key to deciphering cuneiform',
        'Lists every satrapy and its annual tribute',
        'Contains the Persian law code',
      ],
      answer: 1,
      explanation: 'Carved high on a cliff in three languages — Old Persian, Elamite and Babylonian — Darius I\'s account of defeating the rebels and taking the throne. Its trilingual form allowed Rawlinson to decipher cuneiform in the 19th century. As a source it is royal self-justification: it presents Darius as restoring order under Ahuramazda against "the Lie", not as a neutral record.'
    },
    {
      id: 'anc-29', topic: 'Historical Periods', difficulty: 3, type: 'short',
      prompt: 'What was a satrapy in the Persian Empire?',
      accept: ['a province of the persian empire governed by a satrap on behalf of the king'],
      keywords: [
        ['province', 'region', 'district', 'territory', 'administrative'],
        ['satrap', 'governor'],
        ['persian', 'king', 'empire', 'tribute', 'tax'],
      ],
      minKeywords: 2,
      explanation: 'A satrapy was an administrative province governed by a satrap appointed by the King of Kings, responsible for tribute, order and troop levies. Darius I systematised the arrangement — roughly twenty satrapies with fixed tribute, a standardised coinage (the daric), the Royal Road and a network of royal inspectors. It is the standard example of Persian administrative pragmatism: local custom and religion were generally left intact.'
    },
    {
      id: 'anc-30', topic: 'Historical Periods', difficulty: 4, type: 'mc',
      prompt: 'The principate established by Augustus is best characterised as:',
      options: [
        'An openly declared monarchy replacing the Republic',
        'Autocratic power exercised while preserving republican forms and titles',
        'A restored Republic in which the Senate genuinely governed',
        'A military dictatorship with the Senate abolished',
      ],
      answer: 1,
      explanation: 'Augustus held real power through a bundle of republican-looking instruments — imperium proconsulare maius, tribunicia potestas, control of the armies and the treasury — while presenting himself as princeps, "first citizen", and claiming in the Res Gestae to have restored the Republic. The forms were preserved; the substance was not. Tacitus\'s opening to the Annals is the classic ancient statement of this.'
    },
    {
      id: 'anc-31', topic: 'Historical Periods', difficulty: 5, type: 'short',
      prompt: 'Explain why archaeological evidence is often preferred to literary sources for social history.',
      accept: ['archaeology reflects the whole population including the poor while literary sources were written by and about the elite'],
      keywords: [
        ['elite', 'wealthy', 'upper class', 'rich', 'aristocra', 'educated', 'male'],
        ['ordinary', 'poor', 'everyday', 'common', 'whole', 'all', 'population', 'non elite', 'women', 'slave'],
        ['bias', 'agenda', 'unintentional', 'physical', 'material', 'direct'],
      ],
      minKeywords: 2,
      explanation: 'Literary sources were written by a tiny educated elite, usually male, usually about politics and war, often with a moral or political agenda, and frequently long after the events. Archaeological evidence is largely unintentional — housing, diet, tools, waste, skeletal pathology — and therefore reflects the whole population including those the texts ignore. It has its own limits: it rarely gives motive, names or dates, and interpretation is contested. The strongest history uses both, and says where they disagree.'
    },
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
      id: 'anc-34', topic: 'Ancient Societies', difficulty: 5, type: 'short',
      prompt: 'Explain the problem historians call the "Spartan mirage".',
      accept: ['our sources are non spartans writing later who idealised sparta so the picture may be distorted propaganda rather than reality'],
      keywords: [
        ['non spartan', 'outsider', 'foreign', 'athenian', 'plutarch', 'xenophon', 'not spartan'],
        ['idealis', 'idealiz', 'admire', 'romantic', 'exagger', 'distort', 'propaganda', 'myth', 'construct'],
        ['later', 'centuries', 'after', 'decline', 'no written', 'few sources'],
      ],
      minKeywords: 2,
      explanation: 'Sparta produced almost no literature of its own, so the picture comes from outsiders — Herodotus, Thucydides, Xenophon (an admirer), Aristotle, Plutarch (writing some 500 years later) — many of whom idealised or moralised about Spartan austerity for their own rhetorical purposes. Much of the "classic" detail describes a later, romanticised Sparta rather than the archaic reality. Historians therefore weight archaeology (Artemis Orthia dedications, the surprisingly rich material culture of early Sparta) against the literary tradition.'
    },
    {
      id: 'anc-35', topic: 'Historical Periods', difficulty: 2, type: 'short',
      prompt: 'Define "damnatio memoriae".',
      accept: ['the official condemnation of a persons memory by erasing their name and images from public monuments'],
      keywords: [
        ['erase', 'remove', 'destroy', 'deface', 'chisel', 'strike'],
        ['name', 'image', 'statue', 'inscription', 'record', 'memory', 'monument'],
        ['condemn', 'official', 'senate', 'punish', 'disgrace'],
      ],
      minKeywords: 2,
      explanation: 'A modern term for the Roman practice of condemning a disgraced individual\'s memory — erasing names from inscriptions, destroying or recarving statues, annulling acts. Applied to figures such as Sejanus, Nero and Domitian. For historians it is doubly useful: it removes evidence, but the visible gaps and recarvings are themselves evidence of the political judgement passed.'
    },
    {
      id: 'anc-36', topic: 'Cities of Vesuvius', difficulty: 1, type: 'mc',
      prompt: 'A thermopolium in Pompeii was a:',
      options: ['Public bath house', 'Counter-service food and drink shop', 'Bakery with attached mill', 'Public latrine'],
      answer: 1,
      explanation: 'A thermopolium served hot food and drink from dolia (large jars) set into a masonry counter — the Roman equivalent of a takeaway. Around 150 have been identified at Pompeii. Their number is evidence that many residents, especially in upper-floor apartments without kitchens, ate out routinely: an inference about daily life drawn from building function alone.'
    },
  ]
};
