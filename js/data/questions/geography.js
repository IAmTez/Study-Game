/* NSW HSC Geography — Ecosystems at Risk, Urban Places,
   People and Economic Activity, plus geographical skills.

   Short-answer questions grade offline: `accept` holds full answers matched
   fuzzily, `keywords` holds synonym groups of which `minKeywords` must appear. */

export const SUBJECT = {
  id: 'geography',
  name: 'Geography',
  short: 'GEO',
  colour: '#6fd66f',
  syllabus: 'NSW HSC Geography',
  topics: ['Ecosystems at Risk', 'Urban Places', 'People and Economic Activity', 'Geographical Skills'],
  questions: [

    /* ---------------- Ecosystems at Risk ---------------- */
    {
      id: 'geo-01', topic: 'Ecosystems at Risk', difficulty: 1, type: 'mc',
      prompt: 'Which four spheres interact to form the biophysical environment?',
      options: [
        'Atmosphere, hydrosphere, lithosphere, biosphere',
        'Atmosphere, stratosphere, lithosphere, biosphere',
        'Hydrosphere, cryosphere, biosphere, exosphere',
        'Lithosphere, hydrosphere, ionosphere, biosphere',
      ],
      answer: 0,
      explanation: 'The four biophysical components are the atmosphere (air and climate), hydrosphere (water), lithosphere (rock and soil) and biosphere (living things). Ecosystem questions almost always want you to show interaction between at least two of them.'
    },
    {
      id: 'geo-02', topic: 'Ecosystems at Risk', difficulty: 1, type: 'mc',
      prompt: 'Biodiversity is best defined as:',
      options: [
        'The total number of animals in a habitat',
        'The variety of genes, species and ecosystems in a given area',
        'The rate at which a species reproduces',
        'The amount of biomass produced each year',
      ],
      answer: 1,
      explanation: 'Biodiversity operates at three levels — genetic, species and ecosystem diversity. High biodiversity generally raises resilience, because a loss in one species can be absorbed by others filling the same niche.'
    },
    {
      id: 'geo-03', topic: 'Ecosystems at Risk', difficulty: 2, type: 'mc',
      prompt: 'An ecosystem\'s "resilience" refers to its ability to:',
      options: [
        'Resist all forms of human interference',
        'Support the largest possible number of species',
        'Absorb disturbance and return to its original state',
        'Expand into neighbouring ecosystems over time',
      ],
      answer: 2,
      explanation: 'Resilience is the capacity to absorb stress and recover. It is the inverse of vulnerability: low resilience plus high exposure to stress equals an ecosystem at risk. Small, isolated, specialised ecosystems (islands, coral reefs, alpine areas) tend to have low resilience.'
    },
    {
      id: 'geo-04', topic: 'Ecosystems at Risk', difficulty: 2, type: 'mc',
      prompt: 'Which of the following is a NATURAL stress on an ecosystem?',
      options: ['Land clearing for agriculture', 'Cyclone damage to a reef', 'Introduction of cane toads', 'Nutrient runoff from fertiliser'],
      answer: 1,
      explanation: 'Natural stress includes cyclones, drought, fire, disease and volcanic activity. Human-induced stress includes clearing, pollution, introduced species and over-exploitation. Most exam case studies require you to distinguish the two, then argue that human stress compounds natural stress.'
    },
    {
      id: 'geo-05', topic: 'Ecosystems at Risk', difficulty: 2, type: 'mc',
      prompt: 'Mass coral bleaching occurs primarily because:',
      options: [
        'Coral polyps are physically broken by wave action',
        'Sediment blocks light from reaching the coral',
        'Heat stress causes coral to expel its symbiotic zooxanthellae',
        'Predatory starfish consume the coral tissue',
      ],
      answer: 2,
      explanation: 'Sustained sea-surface temperatures roughly 1°C above the summer maximum cause coral to expel the zooxanthellae algae that give it colour and most of its energy. The coral is not immediately dead — it can recover if the heat stress passes — but repeated events (GBR: 2016, 2017, 2020, 2022, 2024) prevent recovery.'
    },
    {
      id: 'geo-06', topic: 'Ecosystems at Risk', difficulty: 3, type: 'short',
      prompt: 'Explain why an ecosystem with LOW resilience is considered "at risk".',
      accept: ['it cannot recover from disturbance so damage becomes permanent'],
      keywords: [
        ['recover', 'recovery', 'return', 'restore', 'bounce back'],
        ['disturbance', 'stress', 'damage', 'impact', 'shock'],
        ['permanent', 'irreversible', 'threshold', 'collapse', 'cannot', 'unable', 'slow'],
      ],
      minKeywords: 2,
      explanation: 'Low resilience means the ecosystem cannot absorb stress and return to its previous state. Once a threshold is crossed the change becomes effectively permanent — for example, a bleached reef shifting to an algae-dominated system. Risk = vulnerability × exposure to stress, so a low-resilience ecosystem under frequent stress is the classic "ecosystem at risk".'
    },
    {
      id: 'geo-07', topic: 'Ecosystems at Risk', difficulty: 1, type: 'short',
      prompt: 'Name the four biophysical spheres that interact in an ecosystem.',
      accept: ['atmosphere hydrosphere lithosphere biosphere'],
      keywords: [['atmosphere'], ['hydrosphere'], ['lithosphere'], ['biosphere']],
      minKeywords: 3,
      explanation: 'Atmosphere, hydrosphere, lithosphere, biosphere. A good ecosystem answer never lists them in isolation — it shows the interaction, e.g. rainfall (hydrosphere) weathering rock (lithosphere) to form the soil that vegetation (biosphere) depends on.'
    },
    {
      id: 'geo-08', topic: 'Ecosystems at Risk', difficulty: 3, type: 'mc',
      prompt: 'Zoning the Great Barrier Reef Marine Park into green (no-take) and blue (general use) zones is an example of:',
      options: [
        'A traditional management strategy',
        'A contemporary management strategy operating at a regional scale',
        'An international management strategy',
        'A non-interventionist approach',
      ],
      answer: 1,
      explanation: 'Zoning under the GBRMP Act is contemporary (science-based, legislated) and operates at the regional/national scale. The 2004 rezoning lifted no-take green zones from about 4.5% to over 33% of the park. Contrast with traditional strategies such as Indigenous fire-stick farming or seasonal harvesting bans.'
    },
    {
      id: 'geo-09', topic: 'Ecosystems at Risk', difficulty: 2, type: 'mc',
      prompt: 'The "utility value" of an ecosystem refers to its:',
      options: [
        'Intrinsic right to exist regardless of human use',
        'Usefulness to humans, such as resources, tourism or medicine',
        'Total biomass measured in tonnes per hectare',
        'Position within a global network of protected areas',
      ],
      answer: 1,
      explanation: 'Utility value is the human-use value — food, timber, tourism, genetic material for medicine, ecosystem services like water filtration. Intrinsic value is the argument that the ecosystem has worth independent of use. Strong answers argue BOTH when justifying management.'
    },
    {
      id: 'geo-10', topic: 'Ecosystems at Risk', difficulty: 4, type: 'mc',
      prompt: 'The Ramsar Convention specifically protects:',
      options: ['Coral reefs', 'Wetlands of international importance', 'Tropical rainforests', 'Migratory bird flyways only'],
      answer: 1,
      explanation: 'Ramsar (1971) is the international treaty for wetlands of international importance. Other international instruments worth naming: World Heritage Convention, CITES (trade in endangered species), the Convention on Biological Diversity, and JAMBA/CAMBA/ROKAMBA for migratory birds.'
    },
    {
      id: 'geo-11', topic: 'Ecosystems at Risk', difficulty: 3, type: 'short',
      prompt: 'Outline TWO human-induced modifications that place a coastal dune ecosystem at risk.',
      accept: ['vegetation clearing and vehicle or foot traffic destabilise the dunes causing erosion'],
      keywords: [
        ['clearing', 'removal', 'vegetation', 'development', 'building', 'urban'],
        ['traffic', 'trampling', 'vehicles', 'four wheel', '4wd', 'tourism', 'recreation'],
        ['erosion', 'destabilise', 'blowout', 'sand', 'weeds', 'introduced'],
      ],
      minKeywords: 2,
      explanation: 'Common dune modifications: clearing spinifex and marram grass for housing or car parks; trampling and 4WD traffic destroying the binding root mat; introduced species (bitou bush) outcompeting natives; sand mining. All reduce the vegetation cover that holds the dune together, causing blowouts and accelerated erosion during storm surge.'
    },
    {
      id: 'geo-12', topic: 'Ecosystems at Risk', difficulty: 2, type: 'mc',
      prompt: 'Ecological succession is best described as:',
      options: [
        'The extinction of a species from an ecosystem',
        'The predictable sequence of communities colonising an area over time',
        'The movement of nutrients through a food web',
        'The daily variation in an ecosystem\'s energy flow',
      ],
      answer: 1,
      explanation: 'Succession runs from pioneer species through seral stages to a climax community. Primary succession starts on bare substrate (new lava, retreating glacier); secondary succession follows a disturbance where soil remains (after fire). Understanding succession explains how ecosystems recover — and how long recovery takes.'
    },
    {
      id: 'geo-13', topic: 'Ecosystems at Risk', difficulty: 5, type: 'short',
      prompt: 'Evaluate ONE reason why management of an ecosystem at risk may fail despite strong legislation.',
      accept: ['legislation cannot address global causes such as climate change and enforcement is often underfunded'],
      keywords: [
        ['global', 'climate', 'warming', 'transboundary', 'outside', 'external'],
        ['enforce', 'funding', 'resources', 'compliance', 'monitoring', 'policing'],
        ['conflict', 'stakeholder', 'economic', 'political', 'industry', 'pressure'],
      ],
      minKeywords: 1,
      explanation: 'Three defensible lines of argument: (1) scale mismatch — local legislation cannot stop a global driver like ocean warming, so the GBR bleaches inside a well-managed park; (2) enforcement gap — legislation without funded monitoring and penalties is symbolic; (3) competing stakeholders — agricultural, tourism and mining interests dilute policy. Evaluation demands a judgement, so finish with a clear verdict on effectiveness.'
    },

    /* ---------------- Urban Places ---------------- */
    {
      id: 'geo-14', topic: 'Urban Places', difficulty: 1, type: 'mc',
      prompt: 'Urbanisation is defined as:',
      options: [
        'The physical growth of a city outward into rural land',
        'An increase in the PROPORTION of a population living in urban areas',
        'The movement of people from cities to country towns',
        'The redevelopment of run-down inner-city areas',
      ],
      answer: 1,
      explanation: 'Urbanisation is the increasing proportion of people living in urban areas — a percentage, not a raw number. Distinguish it from urban growth (absolute increase in city population), suburbanisation (outward spread) and counterurbanisation (movement out of cities).'
    },
    {
      id: 'geo-15', topic: 'Urban Places', difficulty: 2, type: 'mc',
      prompt: 'A "megacity" is conventionally defined as an urban area with a population exceeding:',
      options: ['1 million', '5 million', '10 million', '20 million'],
      answer: 2,
      explanation: '10 million is the standard threshold. Most megacity growth is now in the developing world (Delhi, Dhaka, Lagos), where growth outpaces infrastructure, producing informal settlements, congestion and service shortfalls.'
    },
    {
      id: 'geo-16', topic: 'Urban Places', difficulty: 3, type: 'mc',
      prompt: 'Gentrification most directly results in:',
      options: [
        'Falling property values and population loss',
        'Rising property values and displacement of lower-income residents',
        'Increased manufacturing employment in the inner city',
        'The conversion of urban land back to agricultural use',
      ],
      answer: 1,
      explanation: 'Gentrification is the influx of higher-income residents into a previously low-income inner-city area, raising rents and values and displacing existing residents. Sydney examples: Newtown, Redfern, Marrickville. It changes the social character of a suburb — a positive for some stakeholders, a negative for those priced out.'
    },
    {
      id: 'geo-17', topic: 'Urban Places', difficulty: 1, type: 'short',
      prompt: 'What is a "world city"? Give one characteristic.',
      accept: ['a city with global influence over finance and decision making such as london new york tokyo'],
      keywords: [
        ['global', 'world', 'international', 'transnational'],
        ['finance', 'financial', 'economic', 'business', 'headquarters', 'decision', 'command', 'control'],
        ['influence', 'power', 'centre', 'center', 'hub', 'node'],
      ],
      minKeywords: 2,
      explanation: 'A world city exerts influence beyond its own nation — concentrating corporate headquarters, financial markets, producer services, media and cultural power. London, New York and Tokyo are the top tier; Sydney is usually classed as a second-tier world city. Key idea: they are command-and-control nodes in the global economy.'
    },
    {
      id: 'geo-18', topic: 'Urban Places', difficulty: 3, type: 'mc',
      prompt: 'Urban consolidation refers to:',
      options: [
        'Expanding a city outward with low-density housing',
        'Increasing housing density within existing urban boundaries',
        'Merging two neighbouring local government areas',
        'Relocating industry from the inner city to the fringe',
      ],
      answer: 1,
      explanation: 'Urban consolidation increases density within the existing footprint — medium and high-density housing, dual occupancies, infill development. Benefits: cheaper infrastructure per dwelling, reduced sprawl onto farmland, viable public transport. Costs: loss of open space, pressure on existing services, community resistance to character change.'
    },
    {
      id: 'geo-19', topic: 'Urban Places', difficulty: 3, type: 'short',
      prompt: 'Define "spatial exclusion" in an urban context.',
      accept: ['when groups are separated into different areas of a city by cost or access'],
      keywords: [
        ['separate', 'separated', 'segregat', 'divide', 'excluded', 'exclusion', 'restricted', 'denied'],
        ['group', 'people', 'residents', 'low income', 'poor', 'disadvantaged'],
        ['area', 'space', 'suburb', 'access', 'cost', 'price', 'afford'],
      ],
      minKeywords: 2,
      explanation: 'Spatial exclusion is the process by which particular groups are kept out of parts of a city — through housing cost, gated communities, restricted transport access, or policing of public space. It produces socio-economic polarisation: advantage concentrates in some suburbs and disadvantage in others.'
    },
    {
      id: 'geo-20', topic: 'Urban Places', difficulty: 4, type: 'mc',
      prompt: 'Which set correctly lists urban dynamics of change?',
      options: [
        'Suburbanisation, exurbanisation, counterurbanisation, decentralisation, urban decay, urban renewal',
        'Erosion, deposition, weathering, mass movement',
        'Primary, secondary, tertiary, quaternary industry',
        'Birth rate, death rate, migration, natural increase',
      ],
      answer: 0,
      explanation: 'The HSC urban dynamics are: suburbanisation, exurbanisation, counterurbanisation, decentralisation, urban decay, urban renewal, urban consolidation, urban village, spatial exclusion. Learn a Sydney example for each — that specificity is what separates a Band 5 from a Band 4.'
    },
    {
      id: 'geo-21', topic: 'Urban Places', difficulty: 3, type: 'mc',
      prompt: 'A "primate city" is one that:',
      options: [
        'Has the highest GDP per capita in its region',
        'Is more than twice the size of the next largest city in the country',
        'Was the original colonial settlement of a country',
        'Contains the national parliament',
      ],
      answer: 1,
      explanation: 'Primacy means disproportionate dominance — conventionally at least twice the population of the second city. Bangkok and Lima are textbook examples. Primacy concentrates investment and opportunity in one place, draining the rest of the country and intensifying rural-to-urban migration.'
    },
    {
      id: 'geo-22', topic: 'Urban Places', difficulty: 5, type: 'short',
      prompt: 'Evaluate ONE positive and ONE negative consequence of urban renewal for existing residents.',
      accept: ['renewal improves infrastructure and safety but raises rents and displaces long term residents'],
      keywords: [
        ['improve', 'better', 'upgrade', 'infrastructure', 'services', 'amenity', 'safety', 'employment', 'jobs'],
        ['rent', 'price', 'cost', 'displace', 'afford', 'push out', 'gentrif'],
        ['community', 'character', 'residents', 'social'],
      ],
      minKeywords: 2,
      explanation: 'Positive: upgraded housing stock, better public space, new transport and employment, reduced crime — e.g. Pyrmont-Ultimo, Green Square. Negative: rising rents and rates displace long-term and low-income residents, loss of established community networks and cultural character, and the benefits often accrue to newcomers rather than the original population. Evaluation needs a weighted judgement, not just a list.'
    },

    /* ---------------- People and Economic Activity ---------------- */
    {
      id: 'geo-23', topic: 'People and Economic Activity', difficulty: 2, type: 'short',
      prompt: 'Define "economic activity".',
      accept: ['the production distribution and consumption of goods and services'],
      keywords: [
        ['production', 'produce', 'making', 'manufacture'],
        ['distribution', 'consumption', 'exchange', 'selling', 'trade'],
        ['goods', 'services', 'products'],
      ],
      minKeywords: 2,
      explanation: 'Economic activity is the production, distribution and consumption of goods and services. The HSC study requires you to examine one activity at a global scale and one enterprise at a local scale, analysing its ecological, economic, social, political and technological dimensions.'
    },
    {
      id: 'geo-24', topic: 'People and Economic Activity', difficulty: 3, type: 'mc',
      prompt: 'The "multiplier effect" of an economic enterprise refers to:',
      options: [
        'The rate at which the business increases its output each year',
        'Additional flow-on economic activity generated in the surrounding region',
        'The number of countries in which the business operates',
        'Compounding interest on the business\'s capital investment',
      ],
      answer: 1,
      explanation: 'The multiplier effect is the flow-on: an enterprise employs workers who spend locally, and buys from local suppliers, generating further jobs and income. It is a central argument used to justify approving developments — and its overstatement is a standard critique in evaluation questions.'
    },
    {
      id: 'geo-25', topic: 'People and Economic Activity', difficulty: 3, type: 'mc',
      prompt: 'Which is an ECOLOGICAL dimension of an economic activity?',
      options: [
        'Trade tariffs imposed on exports',
        'Effluent discharged into a river system',
        'Wage rates paid to employees',
        'Consumer brand loyalty',
      ],
      answer: 1,
      explanation: 'Ecological dimension = impacts on the biophysical environment (emissions, effluent, land clearing, water use, waste). Economic = employment, investment, multiplier. Social = community, health, working conditions. Political = regulation, tariffs, lobbying. Technological = automation, R&D.'
    },
    {
      id: 'geo-26', topic: 'People and Economic Activity', difficulty: 4, type: 'mc',
      prompt: 'A country specialising in producing what it can make at lowest opportunity cost is applying:',
      options: ['Absolute advantage', 'Comparative advantage', 'Economies of scale', 'The multiplier effect'],
      answer: 1,
      explanation: 'Comparative advantage is about lowest OPPORTUNITY cost, not lowest absolute cost. It is the theoretical justification for global trade specialisation — and explains why production of a given good concentrates in particular places, a key driver of global economic activity patterns.'
    },
    {
      id: 'geo-27', topic: 'People and Economic Activity', difficulty: 4, type: 'short',
      prompt: 'Outline ONE way global factors influence a local economic enterprise.',
      accept: ['global commodity prices or exchange rates determine the revenue the local enterprise receives'],
      keywords: [
        ['global', 'world', 'international', 'overseas', 'foreign'],
        ['price', 'demand', 'exchange rate', 'currency', 'competition', 'tariff', 'supply chain', 'trade'],
        ['local', 'enterprise', 'business', 'profit', 'revenue', 'cost', 'employment'],
      ],
      minKeywords: 2,
      explanation: 'Standard links: world commodity prices set the revenue a local producer receives regardless of local conditions; exchange rate movements change export competitiveness; overseas competition forces automation or closure; global supply chains dictate input costs; international environmental standards and trade agreements shape what may be sold and how.'
    },

    /* ---------------- Geographical Skills ---------------- */
    {
      id: 'geo-28', topic: 'Geographical Skills', difficulty: 2, type: 'mc',
      prompt: 'A choropleth map displays data by:',
      options: [
        'Proportional symbols placed at point locations',
        'Shading areas in different tones according to value',
        'Lines joining points of equal value',
        'Flow arrows of varying width',
      ],
      answer: 1,
      explanation: 'Choropleth = shaded areas, tone intensity proportional to value. Isoline maps join equal values (contours, isobars). Proportional symbol maps size a symbol by value. Flow maps use arrow width. Know which suits which data type — that is a common short-answer skills question.'
    },
    {
      id: 'geo-29', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'On a synoptic chart, isobars packed closely together indicate:',
      options: ['Light winds', 'Strong winds', 'High rainfall', 'Stable high pressure'],
      answer: 1,
      explanation: 'Closely spaced isobars mean a steep pressure gradient, which means strong winds. Widely spaced isobars mean light winds. Also memorise: in the Southern Hemisphere, air circulates clockwise around a low and anticlockwise around a high.'
    },
    {
      id: 'geo-30', topic: 'Geographical Skills', difficulty: 2, type: 'short',
      prompt: 'On a topographic map, what does the "contour interval" tell you?',
      accept: ['the vertical height difference between adjacent contour lines'],
      keywords: [
        ['vertical', 'height', 'elevation', 'altitude'],
        ['difference', 'change', 'between', 'gap', 'interval'],
        ['contour', 'lines'],
      ],
      minKeywords: 2,
      explanation: 'The contour interval is the vertical distance between successive contour lines (commonly 10 m or 20 m on NSW 1:25 000 maps). Closely spaced contours = steep slope; widely spaced = gentle slope. Combine with the linear scale to calculate gradient as a ratio: gradient = rise ÷ run.'
    },
    {
      id: 'geo-31', topic: 'Geographical Skills', difficulty: 3, type: 'mc',
      prompt: 'A six-figure grid reference on a topographic map locates a point to the nearest:',
      options: ['1 metre', '10 metres', '100 metres', '1 kilometre'],
      answer: 2,
      explanation: 'Four-figure references identify a 1 km grid square; six-figure references divide each square into tenths, locating to 100 m. Always read eastings (across) before northings (up) — "along the corridor, then up the stairs".'
    },
    {
      id: 'geo-32', topic: 'Geographical Skills', difficulty: 4, type: 'mc',
      prompt: 'A gradient calculated as a rise of 80 m over a run of 4000 m is expressed as:',
      options: ['1:5', '1:50', '1:500', '1:8'],
      answer: 1,
      explanation: 'Gradient = rise ÷ run = 80 ÷ 4000 = 1 ÷ 50, written 1:50. Both measurements must be in the same unit before dividing — converting the map distance using the linear scale is where most marks are lost.'
    },
    {
      id: 'geo-33', topic: 'Ecosystems at Risk', difficulty: 4, type: 'mc',
      prompt: 'Which best explains why island ecosystems are especially vulnerable?',
      options: [
        'They receive more solar radiation than mainland ecosystems',
        'Small size, isolation and high endemism leave little capacity to absorb loss',
        'They always have higher biodiversity than continental areas',
        'They are excluded from international conservation agreements',
      ],
      answer: 1,
      explanation: 'Island ecosystems combine small area, geographic isolation and high endemism. Species evolved without competitors or predators, so an introduced species can cause rapid extinction, and there is no adjacent population to recolonise from. That is low resilience in textbook form.'
    },
    {
      id: 'geo-34', topic: 'Urban Places', difficulty: 2, type: 'mc',
      prompt: 'Counterurbanisation refers to the movement of people:',
      options: [
        'From rural areas into cities',
        'From the inner city to the outer suburbs',
        'From urban areas to smaller towns and rural areas',
        'Between two cities of similar size',
      ],
      answer: 2,
      explanation: 'Counterurbanisation is movement out of urban areas entirely, to smaller regional towns — driven by housing cost, lifestyle ("sea change" / "tree change") and, increasingly, remote work. Suburbanisation, by contrast, stays within the city, just further out.'
    },
    {
      id: 'geo-35', topic: 'People and Economic Activity', difficulty: 5, type: 'short',
      prompt: 'Explain how technological change can alter the location of an economic activity.',
      accept: ['improved transport and communication technology frees firms from raw material locations allowing footloose industry'],
      keywords: [
        ['transport', 'communication', 'internet', 'automation', 'refrigeration', 'containeris', 'technology'],
        ['location', 'locate', 'move', 'relocate', 'footloose', 'anywhere'],
        ['cost', 'labour', 'raw material', 'market', 'access'],
      ],
      minKeywords: 2,
      explanation: 'Technology loosens locational constraints. Containerisation and refrigerated shipping cut transport cost, so production shifts to low-labour-cost regions. Telecommunications make service industries "footloose" — call centres and software can locate anywhere with connectivity. Automation reduces the pull of cheap labour, sometimes causing reshoring. The pattern of global economic activity is a map of these technological shifts.'
    },
    {
      id: 'geo-36', topic: 'Ecosystems at Risk', difficulty: 5, type: 'mc',
      prompt: 'The strongest justification for protecting an ecosystem at risk on INTRINSIC grounds is that:',
      options: [
        'It generates tourism revenue for the local economy',
        'It contains species that may yield future pharmaceutical compounds',
        'It has a right to exist independent of any human benefit',
        'It provides water filtration services worth billions annually',
      ],
      answer: 2,
      explanation: 'Intrinsic value = worth independent of human use. The other three options are all utility arguments (economic, genetic, ecosystem services). A high-band evaluation typically acknowledges that utility arguments are more politically persuasive, while intrinsic arguments are more ethically consistent — and then takes a position.'
    },
  ]
};
