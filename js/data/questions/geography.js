/* NSW HSC Geography (Stage 6, 2024+ syllabus).

   Written against this course: Rural and Urban Places (Bellingen and Green
   Square), Ecosystems and Global Biodiversity (Kosciuszko, with the Great
   Barrier Reef for contrast), Global Sustainability with tourism as the
   economic activity (Taronga fieldwork), and geographical skills.

   Several questions deliberately drill the three habits that cost marks in
   the trial: explaining a mechanism rather than naming a link, using named
   criteria when evaluating, and quoting figures from stimulus material. */

export const SUBJECT = {
  id: 'geography',
  name: 'Geography',
  short: 'GEO',
  colour: '#6fbf73',
  syllabus: 'NSW HSC Geography',
  topics: ['Rural and Urban Places', 'Ecosystems and Global Biodiversity', 'Global Sustainability — Tourism', 'Geographical Skills'],
  questions: [

    /* ---------------- Rural and Urban Places ---------------- */
    {
      id: 'geo-01', topic: 'Rural and Urban Places', difficulty: 1, type: 'mc',
      prompt: 'Counter-urbanisation is best defined as:',
      options: [
        'The movement of people from urban areas to rural and regional areas',
        'The movement of people from rural areas into cities',
        'The redevelopment of derelict industrial land inside a city',
        'The outward spread of a city into surrounding farmland',
      ],
      answer: 0,
      explanation: 'Counter-urbanisation is net movement out of cities into rural and regional places. Bellingen is a textbook case: amenity or "tree-change" migrants move for lifestyle, environment and (increasingly) the ability to work remotely. Movement the other way is urbanisation; redevelopment of derelict industrial land is urban renewal; outward spread is urban sprawl.'
    },
    {
      id: 'geo-02', topic: 'Rural and Urban Places', difficulty: 2, type: 'mc',
      prompt: 'At the 2021 Census, the median age of the Bellingen LGA was 50, against a NSW median of 39. The most useful conclusion to draw from this is that Bellingen:',
      options: [
        'Has an ageing population, which raises demand for health services and can shrink the local workforce',
        'Has a higher birth rate than the rest of NSW',
        'Is growing faster than the NSW average',
        'Has a larger population than the NSW average town',
      ],
      answer: 0,
      explanation: 'A median age eleven years above the state figure signals demographic ageing, driven by both youth out-migration and in-migration of older amenity migrants. The consequences are the mark-earning part: higher demand for health and aged care in a place with limited service access, a shrinking working-age base, and a higher dependency ratio. Median age says nothing about birth rate, growth rate or total population.'
    },
    {
      id: 'geo-03', topic: 'Rural and Urban Places', difficulty: 2, type: 'mc',
      prompt: 'Green Square is a redevelopment of approximately:',
      options: ['278 hectares of former industrial land', '75 hectares of former parkland', '1,200 hectares of greenfield farmland', '40 hectares of reclaimed harbour foreshore'],
      answer: 0,
      explanation: 'About 278 hectares of former industrial land across Beaconsfield and Zetland with parts of Rosebery, Alexandria and Waterloo — one of Australia\'s largest urban renewal projects, with roughly $13 billion of investment projected. Because it reuses already-developed land rather than expanding the urban edge, it is urban consolidation, not sprawl.'
    },
    {
      id: 'geo-04', topic: 'Rural and Urban Places', difficulty: 3, type: 'mc',
      prompt: 'At completion, Green Square is projected to reach a density of about 22,000 people per square kilometre. The significance of that figure is that it would:',
      options: [
        'Overtake Pyrmont, currently Australia\'s densest suburb at around 15,000 people per square kilometre',
        'Match the average density of Greater Sydney',
        'Be roughly the same density as Singapore as a whole',
        'Be the highest density recorded anywhere in the world',
      ],
      answer: 0,
      explanation: 'The projection would make Green Square the densest place in Australia, overtaking Pyrmont at roughly 15,000/km². Use the comparison rather than the bare number — a figure only earns marks once it is benchmarked against something. Be careful not to conflate the two: the 15,000 figure is Pyrmont\'s current density, not Green Square\'s.'
    },
    {
      id: 'geo-05', topic: 'Rural and Urban Places', difficulty: 3, type: 'short',
      prompt: 'Explain ONE social impact of urban renewal at Green Square. Give the mechanism, not just the outcome.',
      accept: ['gentrification raised housing costs which displaced lower income renters and workers from the area'],
      keywords: [
        ['gentrif', 'displace', 'afford', 'rent', 'housing cost', 'price', 'lower income', 'infrastructure lag', 'school', 'open space', 'community', 'placemaking', 'library', 'aquatic'],
        ['because', 'so ', 'which mean', 'leading to', 'therefore', 'result', 'as a result', 'causes', 'drives', 'lag'],
      ],
      minKeywords: 2,
      explanation: 'Either direction earns the mark provided the chain is shown. Negative: renewal raises land values, so rents and purchase prices rise, so lower-income renters and former industrial workers are priced out — gentrification and displacement. Positive: council placemaking investment in the Green Square Library (2018) and Gunyama Park Aquatic Centre (2021) gives a young, largely overseas-born apartment population (Zetland: 12,622 residents, median age 30, 2021 Census) shared civic space, building community identity where none previously existed. A strong answer also names infrastructure lag — school capacity and open space per person failing to keep pace with residential growth.'
    },
    {
      id: 'geo-06', topic: 'Rural and Urban Places', difficulty: 4, type: 'short',
      prompt: 'Explain how rural and urban places are interdependent. Name a flow in EACH direction.',
      accept: ['rural places supply food water and minerals to cities while cities supply capital services markets and migrants to rural places'],
      keywords: [
        ['food', 'mineral', 'copper', 'zinc', 'water', 'timber', 'dairy', 'beef', 'resource', 'energy', 'produce'],
        ['capital', 'investment', 'service', 'health', 'education', 'market', 'demand', 'tourist', 'migrant', 'technology', 'telecommunication'],
      ],
      minKeywords: 2,
      explanation: 'Interdependence means two-way flows, so structure the answer as flows. Rural to urban: food (Bellingen dairy and beef feeding Sydney), minerals (Mount Isa copper and zinc), water from rural catchments, renewable generation, carbon sequestration. Urban to rural: capital and investment, specialised health and tertiary services, markets and consumer demand, tourists and their spending, amenity migrants, telecommunications. The mechanism to spell out: cities cannot decarbonise without rural minerals — Berlin\'s 20,985 solar systems and its rail network need copper mined in places like Mount Isa — while urban demand and tree-change migration diversify rural economies away from single-industry dependence. The judgement worth landing: interdependence only supports sustainability when the exchange is equitable; if cities capture the value while rural places carry the environmental cost of extraction, it is dependence, not interdependence.'
    },
    {
      id: 'geo-07', topic: 'Rural and Urban Places', difficulty: 2, type: 'mc',
      prompt: 'Mount Isa is 883 km from Townsville and 1,829 km from Brisbane, with a population of about 19,000. Despite its small size it has a very large sphere of influence because it:',
      options: [
        'Acts as the transport, service and supply node for remote communities and cattle stations across north-west Queensland',
        'Has the largest population in Queensland outside Brisbane',
        'Is the state capital of a separate administrative region',
        'Contains Queensland\'s largest container port',
      ],
      answer: 0,
      explanation: 'Sphere of influence is the area a settlement services, not the area it covers. Mount Isa is isolated, so it becomes the only realistic supply, health, education and freight node for a vast surrounding area of remote communities and grazing properties — which is why a town of 19,000 functions like a much larger regional city. Its mineral exports move by road and rail to Townsville, where the port handles them.'
    },
    {
      id: 'geo-08', topic: 'Rural and Urban Places', difficulty: 4, type: 'short',
      prompt: 'Explain the causal chain by which Singapore\'s location has produced its global linkages. Give at least three links in the chain.',
      accept: ['deep harbour at the malacca strait chokepoint made it a transhipment hub which attracted shipping lines then finance and legal services then multinational headquarters and skilled migration'],
      keywords: [
        ['malacca', 'strait', 'chokepoint', 'harbour', 'port', 'location', 'shipping route'],
        ['transhipment', 'container', 'hub', 'changi', 'airport', 'trade'],
        ['finance', 'legal', 'insurance', 'headquarters', 'multinational', 'migration', 'skilled', 'services'],
      ],
      minKeywords: 3,
      explanation: 'This is the mechanism drill in its purest form. The chain: a deep, sheltered natural harbour sits at the Strait of Malacca, the chokepoint between the Indian and Pacific Oceans — so cargo can be transferred cheaply between vessels — so Singapore becomes one of the world\'s busiest transhipment ports — so shipping lines base regional operations there — so demand grows for finance, insurance and legal services — so multinational firms locate regional headquarters — so skilled migration follows, which in turn shapes the city\'s built form and multicultural identity. Stating only that "Singapore\'s position on a global shipping route links it to countries across the world" asserts the relationship without explaining it, which is exactly where marks are lost.'
    },
    {
      id: 'geo-09', topic: 'Rural and Urban Places', difficulty: 3, type: 'mc',
      prompt: 'About 80% of Singaporeans live in HDB public housing, which applies ethnic integration quotas to each block. This policy is best understood as:',
      options: [
        'Deliberate state intervention to prevent ethnic residential segregation',
        'A market response to a shortage of private housing',
        'A tourism strategy to present a multicultural image',
        'A consequence of land reclamation increasing available area',
      ],
      answer: 0,
      explanation: 'Singapore is the standout example of a strong interventionist planning state. The Ethnic Integration Policy caps the proportion of each ethnic group per block and precinct, deliberately engineering mixed neighbourhoods rather than allowing the residential clustering markets tend to produce. Use it whenever a question asks about political or governmental influences on urban social patterns.'
    },
    {
      id: 'geo-10', topic: 'Rural and Urban Places', difficulty: 3, type: 'mc',
      prompt: 'Berlin devotes 40–44% of its area to forests, parks, lakes and green-blue infrastructure and has over 2,500 parks and gardens. To answer a question on ecological footprint AND wellbeing, you must add that this green space:',
      options: [
        'Improves physical and mental health and provides recreation access regardless of income',
        'Reduces the cost of housing across the city',
        'Increases the density of the built-up area',
        'Guarantees the city meets all Sustainable Development Goals',
      ],
      answer: 0,
      explanation: 'Ecological footprint is only half of that question. Every environmental point needs a paired wellbeing outcome: green space supports physical and mental health; walkability builds social connection and cuts transport costs; free parks give recreation access to people on any income. On balance, note honestly that Germany scores 83.7 and ranks 4th of 167 on the Sustainable Development Report but has SDG 12 (responsible consumption) as a major challenge and stagnating — a high-performing city can still carry an outsized consumption footprint, and that nuance separates the top band.'
    },
    {
      id: 'geo-11', topic: 'Rural and Urban Places', difficulty: 2, type: 'mc',
      prompt: 'Transit-oriented development means:',
      options: [
        'Concentrating higher-density housing, jobs and services within walking distance of a public transport station',
        'Building new motorways to reduce congestion in the city centre',
        'Relocating industry to areas with good freight rail access',
        'Providing free public transport to all residents of a renewal precinct',
      ],
      answer: 0,
      explanation: 'TOD clusters density around a transit node so more trips can be made without a car, lowering per-capita transport emissions and supporting local retail. Green Square is a clear Australian example, built around Green Square station — although the station running over capacity at peak illustrates the risk that infrastructure lags the population it is meant to serve.'
    },
    {
      id: 'geo-12', topic: 'Rural and Urban Places', difficulty: 3, type: 'short',
      prompt: 'Outline TWO challenges to liveability facing a rural place you have studied.',
      accept: ['housing affordability pressure from amenity migrants and limited access to health services plus flood risk'],
      keywords: [
        ['housing', 'afford', 'price', 'rent', 'amenity migrant', 'tree change'],
        ['health', 'service', 'hospital', 'doctor', 'access', 'education', 'transport', 'isolat'],
        ['flood', 'fire', 'hazard', 'disaster', 'youth', 'out-migration', 'employment', 'job'],
      ],
      minKeywords: 2,
      explanation: 'Bellingen supplies all of these. Housing affordability: amenity migrants arriving with metropolitan capital bid up prices in a small market, pricing out local workers. Service access: a dispersed population of about 13,253 across the LGA cannot support the range of health services a city offers, and travel distances are long. Hazard exposure: the 2021–22 Waterfall Way and Kalang flooding cut road access and damaged property. Youth out-migration: young people leave for tertiary study and work, which both ages the population and thins the local labour force.'
    },
    {
      id: 'geo-13', topic: 'Rural and Urban Places', difficulty: 2, type: 'mc',
      prompt: 'The SEIFA index is used to measure:',
      options: [
        'Relative socio-economic advantage and disadvantage of an area',
        'The ecological footprint of a settlement',
        'Population density per square kilometre',
        'Distance decay between a service centre and its hinterland',
      ],
      answer: 0,
      explanation: 'SEIFA (Socio-Economic Indexes for Areas) is an ABS product that ranks areas on measures such as income, education, employment and housing. It is the standard tool for comparing advantage between suburbs or LGAs, so it is the evidence to cite when a question asks about social inequality between places.'
    },
    {
      id: 'geo-14', topic: 'Rural and Urban Places', difficulty: 4, type: 'short',
      prompt: 'Explain how Mount Isa is linked to other places. Name the specific places at each end of the link.',
      accept: ['road and rail carry minerals to townsville for export through its port while the airport carries fly in fly out workers and freight and services come inward from brisbane'],
      keywords: [
        ['townsville', 'port', 'rail', 'road', 'export'],
        ['airport', 'fly-in', 'fifo', 'freight', 'brisbane', 'capital'],
        ['cattle', 'station', 'remote', 'supply', 'community'],
      ],
      minKeywords: 2,
      explanation: 'The trial marker\'s comment on this exact question was "where are both places linked to exactly?" — so name them. Road and rail carry copper, lead, zinc and silver east to Townsville, 883 km away, for export through its port. Mount Isa Airport carries the fly-in fly-out workforce and high-value freight. Supply chains run outward to remote cattle stations across the north-west, and government and corporate services run inward from Brisbane, 1,829 km away, as the state capital. Each link needs its endpoint and its cargo.'
    },
    {
      id: 'geo-15', topic: 'Rural and Urban Places', difficulty: 1, type: 'mc',
      prompt: 'Urban consolidation refers to:',
      options: [
        'Increasing the density of housing within existing urban areas',
        'Extending the urban area outwards into surrounding farmland',
        'Merging two local government areas into one',
        'Demolishing high-rise housing to create parkland',
      ],
      answer: 0,
      explanation: 'Consolidation means doing more within the existing footprint — infill, apartments, medium density — as opposed to sprawl, which extends the edge. Consolidation lowers per-capita infrastructure and transport costs and preserves peri-urban land, but concentrates pressure on open space, schools and drainage, which is exactly the tension visible at Green Square.'
    },
    {
      id: 'geo-16', topic: 'Rural and Urban Places', difficulty: 3, type: 'mc',
      prompt: 'Zetland recorded 12,622 residents with a median age of 30, a majority born overseas and over 90% living in apartments (2021 Census). Taken together these figures indicate:',
      options: [
        'A young, mobile, culturally diverse population in high-density housing typical of an urban renewal precinct',
        'An established family suburb with an ageing population',
        'A declining population losing residents to counter-urbanisation',
        'A predominantly student population living in purpose-built accommodation',
      ],
      answer: 0,
      explanation: 'Read the indicators together rather than one at a time. A low median age, high overseas-born share and near-total apartment living is the demographic signature of new high-density renewal: it attracts young professionals and recent migrants, few of whom have school-age children yet — which is why open space and school provision become the pressure points as that cohort ages in place.'
    },

    /* ---------------- Ecosystems and Global Biodiversity ---------------- */
    {
      id: 'geo-17', topic: 'Ecosystems and Global Biodiversity', difficulty: 1, type: 'mc',
      prompt: 'Ecosystem resilience is best defined as:',
      options: [
        'The capacity of an ecosystem to absorb disturbance and recover its structure and function',
        'The total number of species an ecosystem contains',
        'The rate at which an ecosystem converts sunlight into biomass',
        'The degree to which an ecosystem is exposed to a threat',
      ],
      answer: 0,
      explanation: 'Resilience is recovery capacity. Vulnerability is the paired concept: exposure plus sensitivity, minus adaptive capacity. Small, isolated, specialised ecosystems such as alpine zones and individual reefs have low resilience because their species cannot migrate elsewhere or recolonise from a nearby population — which is why both Kosciuszko and the Great Barrier Reef degrade so readily.'
    },
    {
      id: 'geo-18', topic: 'Ecosystems and Global Biodiversity', difficulty: 2, type: 'mc',
      prompt: 'Australia\'s alpine and subalpine environments cover approximately what share of the continent?',
      options: ['0.15%', '1.5%', '5%', '12%'],
      answer: 0,
      explanation: 'About 0.15% — a vanishingly small share, which is precisely the point in an extended response. The alpine zone above the treeline at roughly 1,800 m has an altitudinal range of only about 400 m up to Mt Kosciuszko at 2,228 m. As warming pushes the treeline upslope, the zone is compressed from below and its species have nowhere higher to go: the "escalator to extinction".'
    },
    {
      id: 'geo-19', topic: 'Ecosystems and Global Biodiversity', difficulty: 2, type: 'mc',
      prompt: 'The single variable that most controls ecological function in the Kosciuszko alpine ecosystem is:',
      options: [
        'The snowpack — its depth and duration',
        'Soil pH',
        'Annual rainfall totals in the montane zone',
        'The number of visitors to the ski resorts',
      ],
      answer: 0,
      explanation: 'The snowpack insulates soil against extreme cold, shelters hibernating fauna such as the mountain pygmy-possum, and sets the length of the growing season. Because snow depth and duration control nearly everything else, warming is uniquely damaging here: it does not just stress individual species, it removes the variable the whole system is organised around.'
    },
    {
      id: 'geo-20', topic: 'Ecosystems and Global Biodiversity', difficulty: 3, type: 'mc',
      prompt: 'The mountain pygmy-possum is Australia\'s only hibernating marsupial, with fewer than 2,000 left in the wild. The collapse of the bogong moth threatens it because:',
      options: [
        'Bogong moths are about a third of its diet, so the collapse cut food supply during breeding',
        'Bogong moths pollinate the alpine plants the possum feeds on',
        'Bogong moths compete with the possum for shelter under boulder fields',
        'Bogong moth larvae aerate the alpine humus soils the possum digs in',
      ],
      answer: 0,
      explanation: 'Bogong moths migrate up to 1,000 km to aestivate in alpine boulder fields and make up roughly a third of the possum\'s diet. Numbers fell an estimated 99.5% in 2017–18, from around 4 billion moths, and the IUCN listed the species as Endangered in December 2021. In the worst year over 50% of monitored female possums lost their young. This is a textbook trophic cascade: lowland drought, agricultural pesticides and city light pollution disrupt the migration, and the consequence lands on an alpine species hundreds of kilometres away.'
    },
    {
      id: 'geo-21', topic: 'Ecosystems and Global Biodiversity', difficulty: 3, type: 'mc',
      prompt: 'The 2022 NPWS survey estimated 18,814 feral horses in Kosciuszko National Park, with a 95% confidence interval of 14,501–23,535. That confidence interval is useful in an exam because it:',
      options: [
        'Lets you evaluate the reliability of the data, since surveying moving animals across 6,900 km² is inherently uncertain',
        'Proves the survey was conducted incorrectly',
        'Shows the horse population is increasing',
        'Means the figure should not be quoted in a response',
      ],
      answer: 0,
      explanation: 'Evaluating geographical data is an assessed skill, so a wide confidence interval is an opportunity rather than a problem. Distance sampling across 690,000 hectares of rugged terrain cannot produce a precise count, and both sides of the feral horse debate exploit that uncertainty. Quote the figure, then note what the interval means for how confidently it can be used.'
    },
    {
      id: 'geo-22', topic: 'Ecosystems and Global Biodiversity', difficulty: 4, type: 'short',
      prompt: 'Outline the sequence of feral horse numbers in Kosciuszko from 2022 to 2025 and state what it shows about management effectiveness.',
      accept: ['18814 horses in 2022 then aerial shooting from late 2023 removed over 6000 and numbers fell in 2024 before rebounding in 2025 where control paused which shows gains reverse quickly without sustained control'],
      keywords: [
        ['18,814', '18814', '2022'],
        ['aerial', 'shooting', 'cull', '6,686', '6686', '6,041', '2023'],
        ['rebound', 'rose', 'increase', 'paused', '2025', '16,411', '6,476', 'reverse'],
      ],
      minKeywords: 2,
      explanation: 'The sequence demonstrates change over time, which is an assessed outcome. 2022 survey: 18,814 horses (95% CI 14,501–23,535), a 31% rise in two years under trapping and rehoming alone. Aerial shooting was reinstated in late 2023, removing 6,686 horses, 6,041 of them by aerial shooting. The 2024 survey found 1,579–4,007 in survey blocks. The November 2025 survey found 6,476–16,411, a rebound where aerial control had paused. The legal target is 3,000 horses in retention areas by 30 June 2027 under the Kosciuszko Wild Horse Heritage Act 2018. The judgement: control is effective when actually applied, but the rebound proves gains reverse quickly, and legislative protection of horses on cultural-heritage grounds has repeatedly delayed ecologically necessary action.'
    },
    {
      id: 'geo-23', topic: 'Ecosystems and Global Biodiversity', difficulty: 3, type: 'mc',
      prompt: 'The southern corroboree frog collapsed largely because of:',
      options: [
        'Chytrid fungus, introduced to Australia in the 1970s',
        'Feral horse trampling of its breeding pools',
        'Overcollection for the pet trade',
        'Competition from introduced trout',
      ],
      answer: 0,
      explanation: 'Chytrid fungus drove the collapse from a once-widespread subalpine distribution to fewer than 50 mature adults at natural sites, confined to a 51 km linear range within the park. Taronga and Zoos Victoria run captive breeding and reintroduction into chytrid-free exclosures. Note the compounding threat: the 2019–20 Black Summer fires burnt three of the four disease-free release sites.'
    },
    {
      id: 'geo-24', topic: 'Ecosystems and Global Biodiversity', difficulty: 2, type: 'mc',
      prompt: 'The 2019–20 Black Summer fires burnt approximately what proportion of Kosciuszko National Park?',
      options: ['33.5%, over 300,000 hectares', '5%, about 35,000 hectares', '60%, about 400,000 hectares', '15%, about 100,000 hectares'],
      answer: 0,
      explanation: 'About 33.5% of the park — over 300,000 hectares of its 690,000 hectare total. The severity for this ecosystem is that alpine herbfields and sphagnum bogs are fire-sensitive communities that recover very slowly, so a single event removes decades of accumulated structure from a system that was already compressed and fragmented.'
    },
    {
      id: 'geo-25', topic: 'Ecosystems and Global Biodiversity', difficulty: 4, type: 'short',
      prompt: 'Using a named example, explain why management of an ecosystem can succeed at the local scale while failing at the global scale.',
      accept: ['at kosciuszko site scale boardwalks and captive breeding work and grazing removal restored bogs but warming that shortens the snowpack is generated outside the park so no management authority has jurisdiction over the decisive driver'],
      keywords: [
        ['boardwalk', 'closure', 'grazing', 'breeding', 'taronga', 'frog', 'bog', 'local', 'site', 'track'],
        ['warming', 'climate', 'snowpack', 'emission', 'global', 'atmospher', 'temperature'],
        ['jurisdiction', 'outside', 'control', 'authority', 'beyond', 'cannot'],
      ],
      minKeywords: 2,
      explanation: 'The structure to use is scale. At site and species scale, boardwalks, track hardening and seasonal closures measurably reduce trampling of snowpatch feldmark, and Taronga\'s breeding program has returned 630 adult corroboree frogs and over 11,100 eggs to chytrid-free exclosures — funded by visitor revenue and Saving our Species grants. At state scale, removing high-country grazing from 1958–69 produced clear sphagnum bog recovery. At global scale, the defining threat — a shortening, thinning snowpack — is generated entirely outside the park by emissions no park agency has jurisdiction over, and the bogong moth collapse shows even lowland agricultural change cascading into alpine species loss. The judgement: management sustains the ecosystem\'s components while its defining processes continue to degrade. It is life support — necessary, measurably successful on its own terms, and insufficient alone. The Great Barrier Reef shows the identical structure at a completely different scale.'
    },
    {
      id: 'geo-26', topic: 'Ecosystems and Global Biodiversity', difficulty: 3, type: 'mc',
      prompt: 'The 2004 Great Barrier Reef Zoning Plan is internationally regarded as best practice because it:',
      options: [
        'Raised no-take green zones to about 33% of the marine park, producing measurable fish biomass recovery',
        'Banned all commercial shipping from the marine park',
        'Ended agricultural runoff from adjacent catchments',
        'Committed Australia to net zero emissions by 2050',
      ],
      answer: 0,
      explanation: 'The rezoning lifted no-take green zones to roughly a third of the park — a landmark in marine spatial planning, with measurable recovery in fish biomass. The evaluation line is the important part: zoning and water-quality regulation demonstrably improve resilience to local pressures, but resilience is meaningless if thermal stress recurs faster than recovery time. Coral needs roughly a decade between severe bleaching events. Local management extends the reef\'s survival window; only emissions reduction changes the outcome.'
    },
    {
      id: 'geo-27', topic: 'Ecosystems and Global Biodiversity', difficulty: 2, type: 'mc',
      prompt: 'In the HIPPO framework for biodiversity loss, the second P stands for:',
      options: ['Population pressure', 'Pesticides', 'Predation', 'Pollination collapse'],
      answer: 0,
      explanation: 'HIPPO: Habitat destruction, Invasive species, Pollution, Population pressure, Overexploitation. Climate change now cuts across all five as the dominant driver, which is why it belongs in every evaluation rather than being treated as one factor among equals.'
    },
    {
      id: 'geo-28', topic: 'Ecosystems and Global Biodiversity', difficulty: 3, type: 'mc',
      prompt: 'Alpine peaks and individual coral reefs are both described using island biogeography because:',
      options: [
        'Each is an isolated patch of habitat surrounded by unsuitable conditions, so species cannot easily recolonise after loss',
        'Both are literally surrounded by ocean',
        'Both support the same number of endemic species',
        'Both are managed under the same international convention',
      ],
      answer: 0,
      explanation: 'Island biogeography applies wherever habitat is patchy and isolated, not only to real islands. An alpine summit is an island of cold in a sea of warmer country; a reef is an island of hard substrate. Isolation means small populations, limited gene flow and no source population to recolonise from — so a local extinction tends to be permanent, and resilience is low.'
    },
    {
      id: 'geo-29', topic: 'Ecosystems and Global Biodiversity', difficulty: 2, type: 'mc',
      prompt: 'Which statement about the Snowy Mountains Scheme and Snowy 2.0 is correct?',
      options: [
        'The Scheme (1949–74) diverted rivers and cut the Snowy\'s flow drastically before environmental flows were partially restored; Snowy 2.0 raises new concerns about sediment and transferring invasive fish between reservoirs',
        'Both projects lie outside Kosciuszko National Park and have no ecological effect on it',
        'Snowy 2.0 was built to restore the natural flow of the Snowy River',
        'The Scheme was abandoned before construction began',
      ],
      answer: 0,
      explanation: 'The Scheme is the historic impact — river diversion reduced the Snowy\'s flow to a small fraction of natural levels, with environmental flows only partially restored later. Snowy 2.0 pumped hydro is the live controversy: construction impacts, sediment, and the risk of moving invasive fish between reservoirs, all inside a national park. It is a useful example of a renewable energy project generating an ecological cost — genuine two-sided material for an assess question.'
    },
    {
      id: 'geo-30', topic: 'Ecosystems and Global Biodiversity', difficulty: 3, type: 'short',
      prompt: 'Explain why conflicting perspectives make feral horse management in Kosciuszko difficult.',
      accept: ['ecological science demands removal but cultural heritage value protected in legislation plus tourism and animal welfare views oppose lethal control which delays action'],
      keywords: [
        ['ecolog', 'science', 'damage', 'bog', 'erosion', 'trampl', 'conservation'],
        ['cultural', 'heritage', 'brumby', 'legislat', 'act', 'welfare', 'tourism', 'aerial', 'public'],
      ],
      minKeywords: 2,
      explanation: 'Four perspectives collide. Ecological: horses trample sphagnum bogs and stream banks, causing pugging, erosion and water quality decline, so removal is necessary. Cultural heritage: brumbies are valued as part of high-country identity, protected in the Kosciuszko Wild Horse Heritage Act 2018 which mandates retention areas covering 32% of the park. Animal welfare and public opinion: aerial shooting is contested, and its suspension is what allowed the 2025 rebound. Traditional Owner and tourism interests add further claims. This is the ideal example for any question on the role of varying perspectives, because the conflict is not about the evidence but about competing values.'
    },
    {
      id: 'geo-31', topic: 'Ecosystems and Global Biodiversity', difficulty: 1, type: 'mc',
      prompt: 'Which of these is an example of an ecosystem service?',
      options: [
        'Water purification by an intact catchment',
        'The market price of timber harvested from a forest',
        'The number of visitors to a national park',
        'The area of a park in hectares',
      ],
      answer: 0,
      explanation: 'Ecosystem services are the benefits ecosystems provide to people: provisioning (food, water, fibre), regulating (climate, flood, water purification), supporting (nutrient cycling, soil formation) and cultural (recreation, spiritual value). They underpin the utility argument for biodiversity, which sits alongside intrinsic, heritage and ethical valuations.'
    },
    {
      id: 'geo-32', topic: 'Ecosystems and Global Biodiversity', difficulty: 2, type: 'mc',
      prompt: 'Kosciuszko National Park covers about 690,000 hectares and forms part of a larger network. That network is:',
      options: [
        'The 1.6 million hectare Australian Alps park network across NSW, Victoria and the ACT',
        'The Great Dividing Range Biosphere',
        'The Murray-Darling Basin Plan area',
        'The Snowy Monaro Conservation Corridor',
      ],
      answer: 0,
      explanation: 'Kosciuszko is the largest national park in NSW and part of the 1.6 million hectare Australian Alps network, National Heritage listed in 2008 and a UNESCO Biosphere Reserve. The cross-border cooperative agreement between NSW, Victoria and the ACT is genuinely effective management, because alpine species ranges ignore state boundaries — a rare case where the scale of the response matches the scale of the system.'
    },

    /* ---------------- Global Sustainability — Tourism ---------------- */
    {
      id: 'geo-33', topic: 'Global Sustainability — Tourism', difficulty: 1, type: 'mc',
      prompt: 'The Brundtland definition of sustainability is development that:',
      options: [
        'Meets present needs without compromising the ability of future generations to meet theirs',
        'Maximises economic growth while minimising government spending',
        'Reduces greenhouse gas emissions to net zero by 2050',
        'Uses only renewable resources and no fossil fuels',
      ],
      answer: 0,
      explanation: 'The Brundtland Report (1987) definition, and the one to quote when a question asks you to define sustainability. Its three pillars are environmental, economic and social, with cultural often added as a fourth. Intergenerational equity is fairness between generations; intragenerational equity is fairness between places and groups now.'
    },
    {
      id: 'geo-34', topic: 'Global Sustainability — Tourism', difficulty: 2, type: 'mc',
      prompt: 'In tourism, "leakage" refers to:',
      options: [
        'Tourist spending that leaves the destination economy, typically to foreign-owned operators',
        'Water lost from resort infrastructure',
        'Visitors straying off hardened walking tracks',
        'Seasonal decline in visitor numbers outside peak periods',
      ],
      answer: 0,
      explanation: 'Leakage is the share of tourist expenditure that never stays in the host economy — profits repatriated by foreign-owned hotels and airlines, imported food and fittings, expatriate management salaries. It is the key qualifier on the claim that tourism brings economic development: high headline revenue can deliver little local benefit if leakage is high.'
    },
    {
      id: 'geo-35', topic: 'Global Sustainability — Tourism', difficulty: 3, type: 'mc',
      prompt: 'Which of these is a measure of SOCIAL carrying capacity rather than ecological carrying capacity?',
      options: [
        'The number of visitors beyond which residents report unacceptable disruption to daily life',
        'The number of walkers a track can carry before soil erosion begins',
        'The volume of wastewater a treatment plant can process',
        'The number of divers a reef can absorb before coral damage occurs',
      ],
      answer: 0,
      explanation: 'Carrying capacity comes in four tourism-specific forms: physical (how many can fit), ecological (how much the environment absorbs before degrading), social (how much residents will tolerate) and perceptual (how crowded it feels before visitors\' own experience suffers). Overtourism is fundamentally a breach of social and perceptual capacity, which is why it produces political conflict long before environmental collapse.'
    },
    {
      id: 'geo-36', topic: 'Global Sustainability — Tourism', difficulty: 2, type: 'mc',
      prompt: 'International tourist arrivals were about 1.5 billion in 2019 and fell to about 400 million in 2020. That collapse is analytically useful because it:',
      options: [
        'Acted as a natural experiment in tourism\'s environmental impact',
        'Proved tourism is not a significant economic activity',
        'Permanently changed the global spatial pattern of tourism',
        'Ended the growth of aviation emissions',
      ],
      answer: 0,
      explanation: 'A roughly 73% collapse in a single year, followed by recovery to near pre-pandemic levels by 2024, gave an unrepeatable measurement of what tourism does to destinations — emissions, crowding, wildlife disturbance — by briefly removing it. Pre-2020, tourism accounted for around 10% of global GDP and roughly one in ten jobs.'
    },
    {
      id: 'geo-37', topic: 'Global Sustainability — Tourism', difficulty: 3, type: 'short',
      prompt: 'Explain the mechanism by which tourism revenue funds conservation at Taronga Zoo. Trace the money through to a conservation outcome.',
      accept: ['visitor admission revenue and saving our species grants fund quarantine breeding facilities and staff and transport which returned corroboree frogs and eggs to chytrid free exclosures in kosciuszko'],
      keywords: [
        ['admission', 'ticket', 'visitor', 'revenue', 'grant', 'saving our species', 'fund'],
        ['breeding', 'quarantine', 'facilit', 'staff', 'transport', 'helicopter', 'captive'],
        ['frog', 'corroboree', 'release', 'exclosure', '630', '11,100', 'reintroduc', 'kosciuszko'],
      ],
      minKeywords: 3,
      explanation: 'This is the mechanism drill applied to your fieldwork site. The chain: visitor admission revenue plus Saving our Species grants fund refrigerated quarantine breeding facilities, specialist staff and helicopter transport to remote release sites, which has returned 630 adult southern corroboree frogs and over 11,100 eggs to chytrid-free exclosures in Kosciuszko. Tourism revenue is the funding mechanism for conservation — that is the economic factor the question is asking about, and it is also the synthesis link between your Global Sustainability fieldwork and your Ecosystems case study, which examiners reward. Saying only that "Taronga has taken a large number captive to breed the species" states the outcome without the mechanism.'
    },
    {
      id: 'geo-38', topic: 'Global Sustainability — Tourism', difficulty: 4, type: 'short',
      prompt: 'Name a framework of criteria you could use to evaluate the effectiveness of a tourism management strategy, and list its components.',
      accept: ['the four pillars of sustainability environmental economic social and cultural or effectiveness criteria of measurable outcome cost scale of jurisdiction equity and durability'],
      keywords: [
        ['pillar', 'environmental', 'economic', 'social', 'cultural', 'sdg', 'sustainable development goal', 'criteri'],
        ['measurable', 'outcome', 'cost', 'fund', 'jurisdiction', 'scale', 'equity', 'durab', 'enforce'],
      ],
      minKeywords: 1,
      explanation: 'An evaluate or assess response loses marks purely for having no stated yardstick, so name the framework in the opening sentence. Framework A — the four pillars: environmental, economic, social, cultural. Framework B — the SDGs, naming the specific goal (SDG 8 decent work, 11 sustainable cities, 12 responsible consumption, 13 climate action, 14 life below water, 15 life on land). Framework C — effectiveness criteria: measurable outcome, cost and funding source, scale of jurisdiction versus scale of threat, equity of impact, durability over time. Opening template: "Assessed against the environmental, economic and social pillars of sustainability, tourism in [place] is [judgement], because…"'
    },
    {
      id: 'geo-39', topic: 'Global Sustainability — Tourism', difficulty: 2, type: 'mc',
      prompt: 'The global spatial pattern of international tourism is best described as:',
      options: [
        'Highly uneven, with flows concentrated in Europe, then Asia-Pacific and the Americas, and source regions dominated by high-income economies',
        'Evenly distributed across all world regions',
        'Concentrated almost entirely in tropical developing countries',
        'Dominated by domestic rather than international movement in every region',
      ],
      answer: 0,
      explanation: 'Europe takes the largest share of international arrivals, followed by Asia-Pacific and the Americas, and the dominant source regions are high-income economies — so tourism largely flows from wealthy countries to a concentrated set of destinations. Growth drivers: rising discretionary income, cheap aviation, airline deregulation, digital booking platforms, ageing affluent populations and social-media-driven destination demand.'
    },
    {
      id: 'geo-40', topic: 'Global Sustainability — Tourism', difficulty: 3, type: 'mc',
      prompt: 'The UNWTO Global Code of Ethics for Tourism is a weak response to tourism\'s environmental impacts primarily because it:',
      options: [
        'Is voluntary and unenforceable',
        'Applies only to developing countries',
        'Was withdrawn before it took effect',
        'Covers cultural impacts but not environmental ones',
      ],
      answer: 0,
      explanation: 'This is the standard scale argument. Local responses — visitor caps, boardwalks, guided-only access — are enforceable and produce measurable results. Global responses are voluntary: the Global Code of Ethics has no compliance mechanism, and aviation, the single largest source of tourism emissions, sits largely outside binding international climate agreements. Hence the judgement: responses succeed on tourism\'s localised, visible impacts and fail on its dispersed, structural ones, so individual destinations can be managed better while the sector\'s overall sustainability declines.'
    },
    {
      id: 'geo-41', topic: 'Global Sustainability — Tourism', difficulty: 2, type: 'mc',
      prompt: 'Which is an example of an INDUSTRY-scale response to tourism\'s impacts, as distinct from a site-scale one?',
      options: [
        'Certification schemes such as EarthCheck or Green Globe',
        'Boardwalks and hardened walking tracks',
        'Seasonal closure of a nesting beach',
        'Timed entry ticketing at a heritage site',
      ],
      answer: 0,
      explanation: 'Certification schemes operate across operators within the industry, alongside corporate carbon offsetting, sustainable supply chain sourcing and capacity caps set by tour operators. The other three are site-scale. Sorting responses by scale — international, national, industry, site, individual — is the structure that earns marks on any "at a range of scales" question.'
    },
    {
      id: 'geo-42', topic: 'Global Sustainability — Tourism', difficulty: 3, type: 'short',
      prompt: 'Identify THREE fieldwork methods you could use to investigate the sustainability of a tourism site.',
      accept: ['observation and site sketching visitor surveys and counts or transects with photographic evidence and gps mapping'],
      keywords: [
        ['observ', 'sketch', 'field sketch', 'photograph', 'photo'],
        ['survey', 'questionnaire', 'interview'],
        ['count', 'transect', 'tally', 'gps', 'gis', 'spatial technolog', 'mapping', 'measure'],
      ],
      minKeywords: 3,
      explanation: 'Name the methods you actually used at Taronga, because fieldwork marks come from your own data: observation and site sketching, visitor surveys, counts or transects, photographic evidence, and spatial technologies such as GPS/GIS mapping. Mention the ethical considerations that governed your data collection too — informed consent for surveys, privacy in photographs, minimal disturbance — since that is a separately assessed outcome.'
    },
    {
      id: 'geo-43', topic: 'Global Sustainability — Tourism', difficulty: 4, type: 'short',
      prompt: 'State the evaluative tension in using a zoo as a model of sustainable tourism.',
      accept: ['zoos deliver measurable conservation and education outcomes but depend on keeping animals in captivity and on high volume visitation so the case rests on whether conservation gains outweigh welfare and footprint costs'],
      keywords: [
        ['conservation', 'breeding', 'education', 'research', 'fund', 'outcome'],
        ['captiv', 'welfare', 'footprint', 'visitation', 'crowd', 'ethical', 'cost'],
      ],
      minKeywords: 2,
      explanation: 'A genuine evaluation needs both sides. For: Taronga\'s conservation-based tourism converts visitor revenue directly into measurable outcomes — captive breeding and reintroduction of threatened species, a wildlife hospital, research partnerships — plus visitor education that aims to shift attitudes and behaviour, a real if hard-to-measure social sustainability outcome. Against: the model depends on keeping animals in captivity and on high-volume visitation, with its own waste, water, energy and transport footprint. The judgement rests on whether the conservation gains outweigh the welfare and footprint costs, and saying so explicitly is what makes the response an evaluation rather than a description.'
    },
    {
      id: 'geo-44', topic: 'Global Sustainability — Tourism', difficulty: 2, type: 'mc',
      prompt: 'The precautionary principle states that:',
      options: [
        'A lack of full scientific certainty is not a reason to postpone action to prevent serious harm',
        'Development should proceed only where a full cost-benefit analysis shows net gain',
        'Polluters must pay the full cost of the damage they cause',
        'Environmental decisions should be made at the lowest effective level of government',
      ],
      answer: 0,
      explanation: 'The precautionary principle is the answer to "we do not know enough yet". It is particularly relevant where damage is potentially irreversible and evidence is uncertain — feral horse impacts within wide confidence intervals, or coral bleaching thresholds. The others describe cost-benefit analysis, the polluter pays principle and subsidiarity.'
    },
    {
      id: 'geo-45', topic: 'Global Sustainability — Tourism', difficulty: 1, type: 'mc',
      prompt: 'Ecological footprint measures:',
      options: [
        'The land and sea area required to support a population\'s consumption and absorb its waste',
        'The physical area occupied by buildings and roads in a settlement',
        'The number of species lost from an area over time',
        'The distance travelled by an average tourist per trip',
      ],
      answer: 0,
      explanation: 'Ecological footprint converts consumption into the biologically productive area needed to sustain it, which is why a compact, well-serviced city can still have a large footprint — Berlin scores well environmentally while Germany\'s SDG 12 on responsible consumption is a major challenge and stagnating. Footprint measures consumption, not land area.'
    },
    {
      id: 'geo-46', topic: 'Global Sustainability — Tourism', difficulty: 3, type: 'mc',
      prompt: 'Overtourism is best described as a situation where:',
      options: [
        'Visitor numbers exceed the social and perceptual carrying capacity of a destination, displacing residents and degrading the visitor experience',
        'A destination receives more visitors than the previous year',
        'Tourism contributes more than half of a destination\'s GDP',
        'Tourists concentrate in one season rather than spreading across the year',
      ],
      answer: 0,
      explanation: 'Overtourism is defined by capacity being exceeded, not by absolute numbers. Its symptoms are resident displacement through short-term letting, loss of access to public space, commodification of culture, crowding conflict and a degraded experience for the visitors themselves. Seasonality is a related but separate problem, generating insecure work and uneven pressure.'
    },

    /* ---------------- Geographical Skills ---------------- */
    {
      id: 'geo-47', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'On a 1:50 000 map two towns are 4 cm apart. The ground distance between them is:',
      options: ['2 km', '200 m', '20 km', '5 km'],
      answer: 0,
      explanation: 'Ground distance = map distance × scale denominator. 4 × 50 000 = 200 000 cm = 2 000 m = 2 km. Always show the conversion and state the units — both carry marks.'
    },
    {
      id: 'geo-48', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'A hill rises from 80 m to 200 m over a ground distance of 3 km. The gradient is:',
      options: ['1:25', '1:120', '1:3', '1:300'],
      answer: 0,
      explanation: 'Gradient = rise ÷ run in the same units. Rise = 200 − 80 = 120 m; run = 3 km = 3 000 m; 120/3 000 = 1:25, or 4%. Remember a steeper slope has the SMALLER denominator — 1:10 is steeper than 1:50.'
    },
    {
      id: 'geo-49', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'A cross-section is drawn with a vertical scale of 1:5 000 and a horizontal scale of 1:50 000. The vertical exaggeration is:',
      options: ['×10', '×0.1', '×5', '×250 000'],
      answer: 0,
      explanation: 'Vertical exaggeration = horizontal denominator ÷ vertical denominator = 50 000 ÷ 5 000 = ×10. Then say what it means: the relief appears ten times steeper than reality, so the section overstates the ruggedness of the terrain.'
    },
    {
      id: 'geo-50', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'Which of these is the LARGEST scale map?',
      options: ['1:10 000', '1:50 000', '1:250 000', '1:1 000 000'],
      answer: 0,
      explanation: 'Larger scale means more detail over a smaller area, so compare the denominators — the smallest number is the largest scale. 1:10 000 shows the most detail and the least ground. This one catches people out constantly because the intuition runs the wrong way.'
    },
    {
      id: 'geo-51', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'A grid reference is given as GR 347215. The "347" tells you:',
      options: [
        'The easting: 34 is the grid line and 7 is tenths of the way east into that square',
        'The northing: 34 is the grid line and 7 is tenths of the way north',
        'The elevation in metres above sea level',
        'The bearing in degrees from grid north',
      ],
      answer: 0,
      explanation: 'Eastings first, then northings — "along the corridor, up the stairs". A four-figure area reference names a whole grid square using its south-west corner lines; a six-figure grid reference adds tenths within the square for a precise point. So GR 347215 is 7/10 across and 5/10 up from AR 3421.'
    },
    {
      id: 'geo-52', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'Twenty-four buildings are counted across six grid squares on a standard Australian topographic map. The building density is:',
      options: ['4 buildings per km²', '4 buildings per grid square, which cannot be converted to km²', '24 buildings per km²', '0.25 buildings per km²'],
      answer: 0,
      explanation: 'On standard Australian topographic maps one grid square is 1 km² regardless of the map scale — the grid lines are always 1 km apart, so they sit 4 cm apart at 1:25 000 and 2 cm apart at 1:50 000. So 24 ÷ 6 = 4 buildings per km². Always state the units in the answer.'
    },
    {
      id: 'geo-53', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'A population rises from 12 000 to 15 000. The percentage change is:',
      options: ['+25%', '+20%', '+3%', '+30%'],
      answer: 0,
      explanation: 'Percentage change = (new − old) ÷ old × 100 = 3 000 ÷ 12 000 × 100 = +25%. The common error is dividing by the new figure, which gives 20%. Always divide by the ORIGINAL value.'
    },
    {
      id: 'geo-54', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'On a synoptic chart in the Southern Hemisphere, tightly packed isobars around a Low indicate:',
      options: [
        'Strong winds blowing clockwise into the Low, with cloud and rain likely',
        'Light winds blowing anticlockwise into the Low, with fine conditions',
        'Strong winds blowing anticlockwise out of the Low, with fine conditions',
        'Calm conditions with fog likely to form overnight',
      ],
      answer: 0,
      explanation: 'Close isobars mean a steep pressure gradient and therefore strong wind. A Low has rising air, so cloud and rain. In the Southern Hemisphere winds blow clockwise INTO a Low and anticlockwise OUT of a High — the reverse of the Northern Hemisphere, and a reliable source of lost marks.'
    },
    {
      id: 'geo-55', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'From a 340 m lookout you sight toward a 300 m hut. A 380 m ridge lies between them. The two points are:',
      options: [
        'Not intervisible, because the intervening ridge rises above the line of sight',
        'Intervisible, because the lookout is higher than the hut',
        'Intervisible, because the ridge is closer to the lookout than the hut is',
        'Not intervisible, because the hut is lower than the lookout',
      ],
      answer: 0,
      explanation: 'For intervisibility, rule a straight line between the two points: if any land between them rises above that line, the view is blocked. Here the 380 m ridge is higher than both endpoints, so it must interrupt the sight line. Note also that dense forest or tall buildings can block a line the contours alone say is clear.'
    },
    {
      id: 'geo-56', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'A bearing measured one-third of the way past East toward South should be written as:',
      options: ['120°', 'SE', '060°', '12°'],
      answer: 0,
      explanation: 'Bearings are measured clockwise from North and always written with three digits: N = 000°, E = 090°, S = 180°, W = 270°. One-third past East toward South is 090° + 30° = 120°. Writing "SE" is a compass direction, not a bearing, and will not score.'
    },
    {
      id: 'geo-57', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'Contour values on a slope decrease from 300 m down to 150 m toward the north. The aspect of the slope is:',
      options: ['Northerly', 'Southerly', 'Easterly', 'Westerly'],
      answer: 0,
      explanation: 'Aspect is the compass direction a slope FACES, which is the direction the land falls — so falling northward means a northerly aspect. Then add the geographical consequence: in the Southern Hemisphere north-facing slopes get more sunlight, so they are warmer and drier with less dense vegetation and faster snowmelt, which shapes land use and settlement.'
    },
    {
      id: 'geo-58', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'A photograph shows long shadows stretching toward the west, with building sides and the horizon visible. The photograph is:',
      options: [
        'An oblique aerial taken in the early morning',
        'A vertical aerial taken at midday',
        'A ground-level photo taken in the late afternoon',
        'A satellite image taken at dawn',
      ],
      answer: 0,
      explanation: 'Two separate readings. Shadow: long shadows pointing west mean the sun is low in the east, so early morning. Type: seeing the sides of buildings plus the horizon means the camera was angled — oblique aerial. A vertical aerial looks straight down like a map with no horizon; a ground shot is at eye level. In Australia shadows point south at solar noon, since the sun sits in the north.'
    },
    {
      id: 'geo-59', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'A population pyramid with a notch in the 20–34 age groups and a broad top is most likely to represent:',
      options: [
        'A rural area losing young adults to out-migration and with an ageing resident population',
        'A rapidly growing developing country with high fertility',
        'A new urban renewal precinct dominated by young professionals',
        'A city with high immigration of working-age adults',
      ],
      answer: 0,
      explanation: 'Read the shape as a history. A notch in the young-adult bars means that cohort left — classic rural youth out-migration for study and work — while a broad top means an ageing resident population, which is exactly Bellingen\'s profile with an LGA median age of 50. A wide base with a narrow top is high fertility; a bulge in working-age bars is in-migration. Dependency ratio = (under 15 + over 64) ÷ 15–64 × 100.'
    },
    {
      id: 'geo-60', topic: 'Geographical Skills', difficulty: 3, type: 'short',
      prompt: 'A scatter graph shows a strong positive relationship between two variables. What must you state about causation, and why?',
      accept: ['correlation does not prove causation because a third variable may drive both or the relationship may be coincidental'],
      keywords: [
        ['correlation', 'relationship', 'association'],
        ['not caus', 'does not prove', 'no causation', 'third variable', 'coincid', 'other factor'],
      ],
      minKeywords: 2,
      explanation: 'Correlation is not causation, and saying so explicitly earns a mark. A strong association may arise because a third variable drives both, because the causation runs the opposite way to the one assumed, or by coincidence in a small sample. The full answer structure for any scatter graph: state the direction (positive or negative), the strength (strong or weak), name any outliers, then add the causation caveat.'
    },
    {
      id: 'geo-61', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'On a ternary graph showing employment by sector, the three values plotted for any one place must:',
      options: ['Sum to 100%', 'Each fall between 0 and 33%', 'Be plotted in ascending order', 'Sum to the total workforce of that place'],
      answer: 0,
      explanation: 'A ternary graph has three axes each running 0–100%, and the three values for a single point always sum to 100 — which is why it works for proportional data such as primary, secondary and tertiary employment shares. Read each axis parallel to its own gridlines, not straight across the triangle.'
    },
    {
      id: 'geo-62', topic: 'Geographical Skills', difficulty: 3, type: 'short',
      prompt: 'State the three-part structure for answering any "describe the data shown" question.',
      accept: ['state the overall trend then quote supporting figures with units and dates then identify any anomaly or exception'],
      keywords: [
        ['trend', 'overall', 'general', 'pattern'],
        ['figure', 'data', 'statistic', 'quote', 'value', 'number', 'unit'],
        ['anomal', 'exception', 'outlier', 'however', 'contrast'],
      ],
      minKeywords: 3,
      explanation: 'Overall trend, then supporting figures, then the anomaly or exception. Quote every figure with its units and its date. The same skeleton works on line, bar, pie, compound and climate graphs — for a climate graph, state the annual rainfall total, the temperature range (hottest minus coldest month) and the wet season months, remembering the Southern Hemisphere summer peaks in December–February. The anomaly is where the higher marks are, because noticing it shows you read the data rather than just summarising its direction.'
    },
  ]
};
