/* NSW HSC Design and Technology — Designing and Producing,
   Innovation and Emerging Technologies, and the Major Design Project. */

export const SUBJECT = {
  id: 'design',
  name: 'Design & Technology',
  short: 'D&T',
  colour: '#5aa9e6',
  syllabus: 'NSW HSC Design and Technology',
  topics: ['Designing and Producing', 'Innovation and Emerging Technologies', 'Major Design Project', 'Design Theory'],
  questions: [

    /* ---------------- Designing and Producing ---------------- */
    {
      id: 'dnt-01', topic: 'Designing and Producing', difficulty: 1, type: 'mc',
      prompt: 'A "design brief" is best described as:',
      options: [
        'A finished technical drawing of the solution',
        'A statement of the problem, requirements and constraints of a project',
        'A schedule of the tasks required to build the project',
        'A list of materials and their costs',
      ],
      answer: 1,
      explanation: 'The design brief states the need or opportunity, the requirements the solution must satisfy, and the constraints (budget, time, materials, skills, safety, regulations). Everything downstream — criteria for success, evaluation, the folio argument — refers back to it, so it must be written before designing begins.'
    },
    {
      id: 'dnt-02', topic: 'Designing and Producing', difficulty: 2, type: 'mc',
      prompt: 'Criteria to evaluate success should be written:',
      options: [
        'After the project is finished, based on the outcome achieved',
        'Early in the project, derived directly from the design brief',
        'Only if the teacher requests them',
        'At the halfway point, once the direction is clear',
      ],
      answer: 1,
      explanation: 'Criteria to evaluate success are written early, from the brief, and are used throughout — not just at the end. They must be measurable ("supports 15 kg without deflection greater than 3 mm") rather than vague ("must be strong"), because unmeasurable criteria cannot produce a defensible evaluation.'
    },
    {
      id: 'dnt-03', topic: 'Designing and Producing', difficulty: 2, type: 'mc',
      prompt: 'Which is an example of a FUNCTIONAL requirement rather than an aesthetic one?',
      options: [
        'The product uses a muted colour palette',
        'The product must be operable with one hand',
        'The surface finish is matte rather than gloss',
        'The form references mid-century furniture',
      ],
      answer: 1,
      explanation: 'Functional requirements concern what the product must DO — load, durability, ergonomics, safety, operation. Aesthetic requirements concern how it looks and feels — form, colour, texture, style. Good folios address both and acknowledge where they conflict.'
    },
    {
      id: 'dnt-04', topic: 'Designing and Producing', difficulty: 3, type: 'short',
      prompt: 'Explain the purpose of producing a prototype or model during development.',
      accept: ['a prototype tests whether the design actually works so problems are found and fixed before final production'],
      keywords: [
        ['test', 'trial', 'try', 'check', 'evaluate', 'prove'],
        ['problem', 'fault', 'error', 'issue', 'improve', 'refine', 'modify', 'iterate'],
        ['before', 'prior', 'final', 'production', 'risk', 'cost', 'time'],
      ],
      minKeywords: 2,
      explanation: 'Prototyping converts an idea into something testable. It reveals problems in fit, ergonomics, structure and manufacture while changes are still cheap, allows user testing to generate real feedback, and provides folio evidence of iterative development. Types range from low-fidelity mock-ups through appearance models to fully functional prototypes.'
    },
    {
      id: 'dnt-05', topic: 'Designing and Producing', difficulty: 3, type: 'mc',
      prompt: 'A Gantt chart in a design folio is used to:',
      options: [
        'Compare the cost of alternative materials',
        'Show tasks and their durations across the project timeline',
        'Record the results of user testing',
        'Present orthogonal views of the final product',
      ],
      answer: 1,
      explanation: 'A Gantt chart maps tasks against time, showing durations, sequence and overlap. In the folio it is evidence of project management. Update it as the project progresses and annotate variations — markers reward the reflection on why the schedule changed, not a pristine chart drawn at the end.'
    },
    {
      id: 'dnt-06', topic: 'Designing and Producing', difficulty: 4, type: 'mc',
      prompt: 'Which research method gives the most reliable evidence about how a product will be USED?',
      options: [
        'Reading manufacturer specifications for similar products',
        'Observing and testing with representative end users',
        'Surveying classmates about what looks best',
        'Reviewing historical design movements',
      ],
      answer: 1,
      explanation: 'Observation and testing with representative end users produces evidence about actual behaviour, not stated preference. All four methods have a place, but user testing is what turns a folio\'s claims about ergonomics and usability into demonstrated findings. Record what users did, not only what they said.'
    },
    {
      id: 'dnt-07', topic: 'Designing and Producing', difficulty: 4, type: 'short',
      prompt: 'Outline TWO ways a designer can reduce the environmental impact of a product.',
      accept: ['select recyclable or renewable materials and design the product to be repaired and disassembled'],
      keywords: [
        ['recycl', 'renewable', 'sustainable', 'biodegrad', 'reclaimed', 'material'],
        ['repair', 'disassembl', 'modular', 'durable', 'lifespan', 'longevity', 'reuse'],
        ['energy', 'waste', 'transport', 'emissions', 'efficient', 'packaging', 'local'],
      ],
      minKeywords: 2,
      explanation: 'Levers available to the designer: material selection (recycled, renewable, low-embodied-energy); design for disassembly and repair so components can be replaced rather than the whole product discarded; minimising material through efficient structure; reducing energy in manufacture and in use; local sourcing to cut transport emissions; and minimal or recyclable packaging. Life cycle analysis is the tool that quantifies these across cradle to grave.'
    },
    {
      id: 'dnt-08', topic: 'Designing and Producing', difficulty: 5, type: 'short',
      prompt: 'Explain why iterative design produces better outcomes than a single linear process.',
      accept: ['iteration lets the designer test refine and respond to feedback repeatedly rather than committing to one untested solution'],
      keywords: [
        ['iterat', 'repeat', 'cycle', 'loop', 'again', 'return'],
        ['test', 'feedback', 'evaluate', 'refine', 'improve', 'modif'],
        ['problem', 'error', 'assumption', 'unknown', 'discover', 'reveal'],
      ],
      minKeywords: 2,
      explanation: 'A linear process commits to one solution before the designer knows enough to choose well. Iteration treats each cycle of designing, producing and evaluating as a source of information: user feedback and prototype failures reveal requirements that were invisible at the brief stage. The folio should show this — evidence of a design that changed in response to testing is worth more than a design that never needed to.'
    },

    /* ---------------- Innovation and Emerging Technologies ---------------- */
    {
      id: 'dnt-09', topic: 'Innovation and Emerging Technologies', difficulty: 1, type: 'mc',
      prompt: 'The difference between an invention and an innovation is that an innovation:',
      options: [
        'Is always protected by a patent',
        'Is the successful application of an idea into use or market',
        'Must involve digital technology',
        'Is created by a team rather than an individual',
      ],
      answer: 1,
      explanation: 'An invention is a new device or process. An innovation is an idea successfully applied — brought into actual use or to market. Many inventions never become innovations because they fail commercially, technically or socially. This distinction is the foundation of the innovation case study.'
    },
    {
      id: 'dnt-10', topic: 'Innovation and Emerging Technologies', difficulty: 2, type: 'mc',
      prompt: 'Which factor is MOST likely to cause a technically sound innovation to fail?',
      options: [
        'Lack of market demand or consumer acceptance',
        'The use of an established manufacturing process',
        'Availability of venture capital',
        'Protection by intellectual property law',
      ],
      analysis: true,
      answer: 0,
      explanation: 'Innovations fail for market reasons far more often than technical ones: no identified need, price above what consumers will pay, entrenched competitors, poor timing, or a required behaviour change consumers reject. Other failure factors: inadequate finance, weak marketing, manufacturing that cannot scale, and regulatory barriers.'
    },
    {
      id: 'dnt-11', topic: 'Innovation and Emerging Technologies', difficulty: 2, type: 'mc',
      prompt: 'A patent protects:',
      options: [
        'A brand name and logo',
        'A new and inventive device, substance or process',
        'The specific visual appearance of a product',
        'An original written or artistic work',
      ],
      answer: 1,
      explanation: 'Patent = new, inventive, useful device/substance/method/process (standard patent, 20 years in Australia). Trade mark = brand identifiers. Registered design = the visual appearance of a product. Copyright = original literary, artistic, musical works (automatic, no registration). Confusing these is a common exam error.'
    },
    {
      id: 'dnt-12', topic: 'Innovation and Emerging Technologies', difficulty: 3, type: 'short',
      prompt: 'Explain ONE social impact of an emerging technology on a community.',
      accept: ['automation displaces workers from existing jobs changing employment patterns in the community'],
      keywords: [
        ['automation', 'ai', 'robot', 'digital', 'technology', 'machine'],
        ['job', 'employment', 'work', 'skill', 'access', 'privacy', 'health', 'isolation', 'connect', 'inequality'],
        ['community', 'people', 'society', 'social', 'change'],
      ],
      minKeywords: 2,
      explanation: 'Social impacts run both ways and good answers say so. Automation displaces some workers while creating demand for different skills; connectivity reduces isolation for remote communities but enables surveillance and erodes privacy; medical technology extends life while raising questions of access and cost. Name the technology, name the group affected, and state the change.'
    },
    {
      id: 'dnt-13', topic: 'Innovation and Emerging Technologies', difficulty: 3, type: 'mc',
      prompt: 'Additive manufacturing (3D printing) differs from subtractive manufacturing because it:',
      options: [
        'Removes material from a solid block to reach the final shape',
        'Builds the object layer by layer, adding material only where needed',
        'Requires a mould to be produced first',
        'Can only be used with metals',
      ],
      answer: 1,
      explanation: 'Additive builds up layer by layer (FDM, SLA, SLS); subtractive cuts away (CNC milling, turning). Additive advantages: complex internal geometry, no tooling, minimal waste, fast iteration for prototypes. Limitations: slower for volume production, anisotropic strength along layer lines, restricted material range and surface finish.'
    },
    {
      id: 'dnt-14', topic: 'Innovation and Emerging Technologies', difficulty: 4, type: 'mc',
      prompt: 'Which best describes "planned obsolescence"?',
      options: [
        'Designing a product so it can be upgraded indefinitely',
        'Deliberately limiting a product\'s useful life to drive replacement purchases',
        'Withdrawing a product from sale once demand declines',
        'Scheduling regular maintenance to extend product life',
      ],
      answer: 1,
      explanation: 'Planned obsolescence deliberately shortens useful life — through non-replaceable batteries, unavailable spare parts, withdrawn software support, or styling changes that make products look dated. It is a standard ethics question: economically rational for the manufacturer, but a driver of resource depletion and e-waste, and the target of "right to repair" legislation.'
    },
    {
      id: 'dnt-15', topic: 'Innovation and Emerging Technologies', difficulty: 5, type: 'short',
      prompt: 'Evaluate the ethical responsibility of a designer whose product could be misused.',
      accept: ['the designer should anticipate foreseeable misuse and design safeguards but cannot control every use'],
      keywords: [
        ['anticipate', 'foresee', 'predict', 'consider', 'aware', 'responsib'],
        ['safeguard', 'safety', 'prevent', 'mitigate', 'warning', 'design out', 'restrict'],
        ['control', 'cannot', 'limit', 'user', 'unforeseen', 'balance'],
      ],
      minKeywords: 2,
      explanation: 'The defensible position is a middle one: designers have a duty to anticipate reasonably foreseeable misuse and design against it — interlocks, guards, warnings, restricted functionality — but cannot be held responsible for every unforeseeable use. Argue with reference to the designer\'s knowledge advantage over the user, professional codes of practice, and product liability law, then take a clear position.'
    },

    /* ---------------- Major Design Project ---------------- */
    {
      id: 'dnt-16', topic: 'Major Design Project', difficulty: 2, type: 'mc',
      prompt: 'The MDP folio should present the design process as:',
      options: [
        'A polished record written after the project is complete',
        'Ongoing evidence of research, development, testing and reflection',
        'A collection of final presentation drawings only',
        'A written report with no images',
      ],
      answer: 1,
      explanation: 'The folio is evidence of process, compiled as you go. Markers look for genuine development: research that influenced decisions, ideas that were rejected and why, testing with results, and reflection on what changed. A folio assembled at the end reads as a justification rather than a record — and marks accordingly.'
    },
    {
      id: 'dnt-17', topic: 'Major Design Project', difficulty: 3, type: 'mc',
      prompt: 'In the MDP, "project management" evidence would MOST appropriately include:',
      options: [
        'Final rendered perspective drawings',
        'A timeline with recorded variations and finance/resource planning',
        'A survey of user preferences',
        'A statement of the design brief',
      ],
      answer: 1,
      explanation: 'Project management evidence: timeline (Gantt or similar) with actual versus planned progress, action plans, finance plan and budget tracking, materials and resource ordering, risk assessment and WHS documentation. The variations matter — showing how you recovered from a delay demonstrates management, whereas a plan that never changed suggests it was written retrospectively.'
    },
    {
      id: 'dnt-18', topic: 'Major Design Project', difficulty: 4, type: 'short',
      prompt: 'Explain why evaluation should occur THROUGHOUT the MDP rather than only at the end.',
      accept: ['ongoing evaluation lets problems be identified and corrected while there is still time to change the project'],
      keywords: [
        ['throughout', 'ongoing', 'during', 'continuous', 'each stage', 'progress'],
        ['identify', 'problem', 'issue', 'fault', 'weakness', 'feedback'],
        ['change', 'correct', 'modify', 'improve', 'adjust', 'time', 'before'],
      ],
      minKeywords: 2,
      explanation: 'Evaluation at the end can only describe what happened. Evaluation throughout changes the outcome: measuring each stage against the criteria for success reveals problems while there is still time and budget to act, and it produces the documented decision trail the folio is marked on. Final evaluation then judges the finished product against the criteria and reflects on the process as a whole.'
    },
    {
      id: 'dnt-19', topic: 'Major Design Project', difficulty: 4, type: 'mc',
      prompt: 'A student\'s criterion reads "the product should look good". The best improvement is:',
      options: [
        '"The product should look very good"',
        '"The product should use a consistent colour scheme of no more than three colours and match the target user\'s stated style preference"',
        '"The product should be attractive to everyone"',
        '"The product should look better than existing products"',
      ],
      answer: 1,
      explanation: 'Criteria must be specific and measurable so that evaluation can produce evidence rather than opinion. "Looks good" cannot be tested; a stated colour rule verified against documented user preference can. Apply the same test to every criterion you write: could someone else check whether it was met?'
    },
    {
      id: 'dnt-20', topic: 'Major Design Project', difficulty: 5, type: 'short',
      prompt: 'Outline how you would justify a major change of direction midway through the MDP.',
      accept: ['reference the testing evidence that showed the original solution failed a criterion and document the new decision'],
      keywords: [
        ['evidence', 'testing', 'test', 'result', 'feedback', 'research', 'data'],
        ['criteria', 'criterion', 'brief', 'requirement', 'fail', 'not meet'],
        ['document', 'record', 'folio', 'reflect', 'justify', 'decision'],
      ],
      minKeywords: 2,
      explanation: 'A change of direction is a strength if it is evidenced. Show the testing or feedback that revealed the original approach failed a criterion, state the alternatives you considered, explain the decision against the brief, and update the timeline and finance plan to reflect the consequence. An undocumented change looks like indecision; a documented one demonstrates exactly the responsive designing the course rewards.'
    },

    /* ---------------- Design Theory ---------------- */
    {
      id: 'dnt-21', topic: 'Design Theory', difficulty: 1, type: 'mc',
      prompt: 'Ergonomics is the study of:',
      options: [
        'How materials behave under load',
        'The relationship between people and the objects and environments they use',
        'The visual balance of a composition',
        'The environmental cost of manufacturing',
      ],
      answer: 1,
      explanation: 'Ergonomics (human factors) fits the product to the user rather than the reverse — reach, grip, posture, force, visibility, cognitive load. Anthropometric data (body measurements, usually expressed in percentiles) is how ergonomic requirements become measurable design criteria.'
    },
    {
      id: 'dnt-22', topic: 'Design Theory', difficulty: 2, type: 'mc',
      prompt: 'Anthropometric data expressed as the "5th to 95th percentile" is used to:',
      options: [
        'Design for the statistically average user only',
        'Accommodate the great majority of the intended user population',
        'Identify the strongest 5% of users',
        'Set the maximum load a product must carry',
      ],
      answer: 1,
      explanation: 'Designing for the 5th to 95th percentile accommodates about 90% of the population. Designing for the "average" user accommodates almost nobody, because no individual is average across multiple dimensions. Which percentile you choose depends on the consequence of exclusion — reach distances typically use the 5th percentile, clearances the 95th.'
    },
    {
      id: 'dnt-23', topic: 'Design Theory', difficulty: 3, type: 'mc',
      prompt: 'The Bauhaus is most associated with the principle that:',
      options: [
        'Ornament should be applied generously to elevate mass-produced goods',
        'Form follows function, uniting art with industrial production',
        'Historical revival styles should guide modern manufacture',
        'Handcraft should replace machine production entirely',
      ],
      answer: 1,
      explanation: 'The Bauhaus (Germany, 1919–1933) sought to unite art, craft and industrial production, favouring functional geometry and honest materials over applied ornament. It underpins modernist product design. Contrast with Arts and Crafts (rejection of industrial production) and postmodernism (a deliberate return to ornament, colour and historical reference).'
    },
    {
      id: 'dnt-24', topic: 'Design Theory', difficulty: 3, type: 'short',
      prompt: 'Define "universal design" and give one example.',
      accept: ['designing products usable by the widest range of people without adaptation such as lever door handles'],
      keywords: [
        ['all', 'everyone', 'widest', 'range', 'regardless', 'ability', 'age', 'disab'],
        ['without', 'no need', 'adaptation', 'specialised', 'modification', 'accessible'],
        ['example', 'lever', 'ramp', 'handle', 'captions', 'kerb', 'curb', 'grip', 'button'],
      ],
      minKeywords: 2,
      explanation: 'Universal design makes products and environments usable by the widest possible range of people without specialised adaptation. Examples: lever door handles (usable with a full hand, elbow or closed fist), kerb ramps, captioned video, large clear typography, front-loading appliances. The core insight is that designing for the extremes usually improves the experience for everyone.'
    },
    {
      id: 'dnt-25', topic: 'Design Theory', difficulty: 4, type: 'mc',
      prompt: 'Life cycle analysis assesses a product\'s impact:',
      options: [
        'During manufacture only',
        'From raw material extraction through use to disposal',
        'From the point of sale to the end of warranty',
        'Across the designer\'s full portfolio of products',
      ],
      answer: 1,
      explanation: 'LCA is cradle-to-grave: raw material extraction, processing, manufacture, packaging, distribution, use, maintenance and end-of-life disposal or recycling. It frequently overturns intuitions — a heavier product that lasts three times as long can carry a far lower lifetime impact than a light disposable one.'
    },
    {
      id: 'dnt-26', topic: 'Design Theory', difficulty: 2, type: 'short',
      prompt: 'Explain what is meant by "form follows function".',
      accept: ['the shape of an object should be determined by its intended purpose rather than decoration'],
      keywords: [
        ['form', 'shape', 'appearance', 'look'],
        ['function', 'purpose', 'use', 'job', 'work'],
        ['determin', 'follow', 'derive', 'based', 'rather than', 'not', 'decorat', 'ornament'],
      ],
      minKeywords: 2,
      explanation: 'Coined by Louis Sullivan and central to modernism: an object\'s shape should be derived from its purpose, not from applied decoration. Useful as a critical lens rather than a law — postmodern designers argued it produced sterile, culturally impoverished objects, and emotional and symbolic function are functions too.'
    },
    {
      id: 'dnt-27', topic: 'Design Theory', difficulty: 4, type: 'mc',
      prompt: 'A designer selects a composite material over steel primarily because composites:',
      options: [
        'Are always cheaper per kilogram',
        'Offer a high strength-to-weight ratio and can be shaped into complex forms',
        'Are easier to recycle at end of life',
        'Conduct heat and electricity more effectively',
      ],
      answer: 1,
      explanation: 'Composites (carbon fibre, fibreglass, reinforced polymers) combine a reinforcement and a matrix to achieve high strength-to-weight ratios and complex mouldable forms, with good corrosion resistance. Trade-offs: higher material and processing cost, difficult repair, and poor recyclability — which is an increasingly decisive objection in sustainable design.'
    },
    {
      id: 'dnt-28', topic: 'Design Theory', difficulty: 5, type: 'mc',
      prompt: 'The strongest argument that aesthetics is a FUNCTIONAL consideration is that:',
      options: [
        'Attractive products photograph better for marketing',
        'Appearance communicates how a product should be used and whether it will be kept',
        'Aesthetic products can be sold at higher prices',
        'Design awards are judged primarily on appearance',
      ],
      answer: 1,
      explanation: 'Appearance carries information: affordances signal how to operate a product, and perceived quality determines whether a user values, maintains and keeps it — directly affecting product lifespan and therefore sustainability. That reframes aesthetics from decoration to function. The other options are commercial arguments, which are real but weaker.'
    },
    {
      id: 'dnt-29', topic: 'Designing and Producing', difficulty: 1, type: 'short',
      prompt: 'List THREE constraints that commonly limit a design project.',
      accept: ['time budget materials skills safety regulations'],
      keywords: [
        ['time', 'deadline', 'schedule'],
        ['cost', 'budget', 'money', 'finance'],
        ['material', 'resource', 'equipment', 'tool', 'skill', 'safety', 'regulation', 'legal', 'standard', 'space'],
      ],
      minKeywords: 2,
      explanation: 'Typical constraints: time, budget, available materials and equipment, the designer\'s skill level, safety and WHS requirements, Australian Standards and other regulations, environmental limits, and the needs of the end user. Constraints belong in the brief — a solution that ignores them is not a solution.'
    },
    {
      id: 'dnt-30', topic: 'Innovation and Emerging Technologies', difficulty: 2, type: 'short',
      prompt: 'What is a "disruptive" innovation?',
      accept: ['an innovation that displaces an established product or market rather than improving it incrementally'],
      keywords: [
        ['displace', 'replace', 'overturn', 'disrupt', 'new market', 'existing'],
        ['established', 'incumbent', 'traditional', 'existing product', 'industry', 'market'],
        ['rather than', 'not', 'incremental', 'improve'],
      ],
      minKeywords: 2,
      explanation: 'Disruptive innovation displaces an established product or creates a new market, rather than incrementally improving what exists. It often begins as cheaper, simpler or lower-performing, serving customers the incumbents ignore, then improves until it takes the mainstream — digital photography against film being the standard example.'
    },
    {
      id: 'dnt-31', topic: 'Major Design Project', difficulty: 3, type: 'mc',
      prompt: 'Which is the best evidence of "creativity" in an MDP folio?',
      options: [
        'A large number of neatly presented final drawings',
        'Documented exploration of several genuinely different concepts before selection',
        'Use of the most expensive available materials',
        'A brief written in highly technical language',
      ],
      answer: 1,
      explanation: 'Creativity is evidenced by divergent exploration followed by reasoned convergence: several genuinely distinct concepts (not three versions of the same idea), evaluated against criteria, with the selection justified. Neat presentation of a single idea shows drawing skill, not creative process.'
    },
    {
      id: 'dnt-32', topic: 'Design Theory', difficulty: 3, type: 'mc',
      prompt: 'An "affordance" in design refers to:',
      options: [
        'The retail price the target market can afford',
        'A feature whose appearance suggests how it is to be used',
        'The tolerance allowed in a manufactured dimension',
        'The margin between production cost and selling price',
      ],
      answer: 1,
      explanation: 'An affordance is a property that signals its own use — a flat plate affords pushing, a handle affords pulling. Bad affordances create the classic "Norman door" that everyone pushes when it should be pulled. Designing clear affordances reduces the need for instructions and labels.'
    },
    {
      id: 'dnt-33', topic: 'Designing and Producing', difficulty: 2, type: 'mc',
      prompt: 'An orthogonal drawing shows:',
      options: [
        'A single three-dimensional view from one corner',
        'Multiple two-dimensional views (front, top, side) with dimensions',
        'A cutaway revealing internal components',
        'The product in its intended environment',
      ],
      answer: 1,
      explanation: 'Orthogonal (orthographic) drawings present front, top and side views in two dimensions with dimensions and tolerances — the drawings someone manufactures from. Pictorial drawings (isometric, perspective) communicate appearance. Sectional views reveal internal detail. A folio needs both communication and manufacturing drawings.'
    },
    {
      id: 'dnt-34', topic: 'Innovation and Emerging Technologies', difficulty: 4, type: 'short',
      prompt: 'Explain ONE reason a designer might choose NOT to patent an innovation.',
      accept: ['patents are expensive and publish the design publicly so trade secrecy may protect it better'],
      keywords: [
        ['cost', 'expensive', 'fee', 'money', 'afford'],
        ['public', 'publish', 'disclose', 'reveal', 'copy', 'secret', 'secrecy'],
        ['time', 'slow', 'expire', 'enforce', 'defend', 'litigation'],
      ],
      minKeywords: 2,
      explanation: 'Patents are costly to obtain and to enforce, take years, and require full public disclosure — after which competitors can design around the claims, and after 20 years anyone may use it freely. For fast-moving products the market may have moved on before grant. Trade secrecy (the Coca-Cola approach) can protect indefinitely, provided the innovation cannot be reverse-engineered.'
    },
    {
      id: 'dnt-35', topic: 'Design Theory', difficulty: 5, type: 'short',
      prompt: 'Evaluate the claim that sustainable design always costs more.',
      accept: ['higher initial cost is often offset by material savings durability and lower running costs over the life cycle'],
      keywords: [
        ['initial', 'upfront', 'purchase', 'higher', 'more expensive'],
        ['life cycle', 'lifetime', 'long term', 'running', 'durab', 'last', 'maintenance', 'energy', 'offset', 'saving'],
        ['material', 'waste', 'less', 'efficien', 'reduce'],
      ],
      minKeywords: 2,
      explanation: 'The claim holds for upfront cost in many cases, and fails over the life cycle. Sustainable strategies frequently reduce cost: using less material, designing out waste, lowering energy consumption in use, and extending lifespan so replacement is deferred. Where it genuinely costs more — certified materials, small production runs, take-back schemes — the honest evaluation weighs that against regulatory risk, brand value and the cost of the impact itself. Reach a judgement rather than sitting on the fence.'
    },
    {
      id: 'dnt-36', topic: 'Designing and Producing', difficulty: 1, type: 'mc',
      prompt: 'A risk assessment in the workshop is completed:',
      options: [
        'After an incident has occurred',
        'Before beginning a process, to identify hazards and control measures',
        'Only when using power tools',
        'At the end of the project as folio evidence',
      ],
      answer: 1,
      explanation: 'Risk assessment happens before the process: identify the hazard, assess likelihood and consequence, then apply controls using the hierarchy — elimination, substitution, isolation, engineering controls, administrative controls, and PPE last. It is both a legal WHS obligation and required folio evidence.'
    },

    /* ------- Innovation case studies and command-verb drills (post-trial) ------- */
    {
      id: 'dnt-37', topic: 'Innovation and Emerging Technologies', difficulty: 2, type: 'mc',
      prompt: 'The first multi-channel cochlear implant surgery was performed in 1978 by:',
      options: [
        'Professor Graeme Clark at the University of Melbourne',
        'James Dyson at the University of Bath',
        'Professor Fiona Wood in Perth',
        'Dr Barry Marshall in Western Australia',
      ],
      answer: 0,
      explanation: 'Graeme Clark, motivated by his deaf father, performed the first multi-channel cochlear implant surgery in 1978. It was commercialised through the Nucleus group under Paul Trainor from 1981, and Cochlear Ltd listed on the ASX in 1995. Always name the designer, the date and one hard statistic — that specificity is what separates a band 6 case study from a general description.'
    },
    {
      id: 'dnt-38', topic: 'Innovation and Emerging Technologies', difficulty: 3, type: 'mc',
      prompt: 'Clark\'s multi-channel implant was the invention. Which of these is the INNOVATION?',
      options: [
        'The behind-the-ear processor, the off-the-ear Kanso and smartphone streaming — improvements to the existing idea, commercialised',
        'The initial discovery that electrical stimulation of the auditory nerve produces sound perception',
        'The decision by Cochlear Ltd to list on the ASX in 1995',
        'The patenting of the original multi-channel electrode array',
      ],
      answer: 0,
      explanation: 'Invention is a wholly new product or process; innovation is the improvement or novel application of an existing idea, commercialised. Cochlear is the ideal case for the distinction because each generation since 1978 is innovation on the original invention — culminating in the Nucleus Nexa System launched in June 2025, the first "smart" cochlear implant with upgradeable firmware, the product of about 20 years of R&D. Listing on the ASX is entrepreneurial activity, and patenting is IP protection.'
    },
    {
      id: 'dnt-39', topic: 'Innovation and Emerging Technologies', difficulty: 3, type: 'mc',
      prompt: 'Cochlear reinvests about 12% of sales revenue in R&D — $292 million in FY25 — and holds over 2,300 patents. The relationship between those two facts is that:',
      options: [
        'The patent portfolio protects market position, so the returns it secures fund the continued R&D',
        'Patents are required by law before a business may claim R&D expenditure',
        'Each patent generates a fixed royalty that is reinvested automatically',
        'Patent numbers are a direct measure of a product\'s clinical effectiveness',
      ],
      answer: 0,
      explanation: 'The patents are the moat. They keep competitors out for the 20-year term, which sustains a global market share held above 60% and premium "gold standard" positioning rather than price competition, and those returns fund the roughly 12% of sales reinvested each year — over $3 billion since listing, across 100+ global research programs. That circular relationship between IP protection and R&D capacity is exactly what an "evaluate the importance of IP protection to innovation" question wants.'
    },
    {
      id: 'dnt-40', topic: 'Innovation and Emerging Technologies', difficulty: 2, type: 'mc',
      prompt: 'James Dyson built how many prototypes before his dual cyclone vacuum design worked?',
      options: ['5,127', '127', '512', '15,270'],
      answer: 0,
      explanation: '5,127 prototypes over roughly five years, 1979–1984. It is the definitive evidence for any question about the iterative nature of the design process, or the role of research and testing — and it maps directly onto your own MDP test-print cycle, which makes it easy to deploy alongside your folio evidence.'
    },
    {
      id: 'dnt-41', topic: 'Innovation and Emerging Technologies', difficulty: 3, type: 'mc',
      prompt: 'Every major vacuum manufacturer refused to license Dyson\'s design. The reason usually given is that they:',
      options: [
        'Earned ongoing revenue from selling replacement bags, which a bagless machine would destroy — a case of planned obsolescence',
        'Doubted that cyclonic separation was technically possible at domestic scale',
        'Were prevented from licensing by existing patents held by Hoover',
        'Considered the transparent bin visually unappealing to consumers',
      ],
      answer: 0,
      explanation: 'The bag was the profit stream, so the incumbents had no interest in a machine that eliminated it — a clean example of planned obsolescence shaping which innovations reach market. Dyson\'s response is the entrepreneurship: he launched the G-Force in Japan in 1986, used the royalties to fund his own company, and released the DC01 in the UK in 1993, where it became the country\'s best-selling vacuum. He later won a patent battle against Hoover in 2000.'
    },
    {
      id: 'dnt-42', topic: 'Innovation and Emerging Technologies', difficulty: 4, type: 'short',
      prompt: 'Define emerging technologies. A full-mark definition needs TWO distinct elements.',
      accept: ['technologies in the early stages of development or adoption that are not yet widely established but have the potential to significantly disrupt industries and change how people live and work such as artificial intelligence or additive manufacturing'],
      keywords: [
        ['early stage', 'not yet', 'new', 'recent', 'developing', 'emerging', 'not widely', 'not established'],
        ['potential', 'significant', 'disrupt', 'change', 'transform', 'impact society', 'way we live', 'industr'],
      ],
      minKeywords: 2,
      explanation: 'Two distinct elements, or the answer caps at half marks. Element one — what it IS: a technology in the early stages of development or adoption, not yet widely established. Element two — what makes it SIGNIFICANT: the potential to substantially disrupt existing industries and change the way people live and work. Then add an example if there is room: artificial intelligence, additive manufacturing, smart materials. Saying "recent", "new" and "unknown to the market" is one element repeated three times. The general rule for a 2-mark define: what it is, plus what makes it significant.'
    },
    {
      id: 'dnt-43', topic: 'Innovation and Emerging Technologies', difficulty: 4, type: 'short',
      prompt: 'Explain how additive manufacturing accelerates innovation. Show the mechanism, not just cause and effect.',
      accept: ['additive manufacturing lets designers prototype complex geometries in hours rather than weeks so more iterations fit the same budget and time which raises the chance of finding a successful solution'],
      keywords: [
        ['prototype', 'iterat', 'test', 'model', 'print'],
        ['hours', 'faster', 'quick', 'cheap', 'cost', 'budget', 'time', 'weeks'],
        ['more', 'increase', 'so ', 'which mean', 'leading to', 'therefore', 'likelihood', 'chance', 'success'],
      ],
      minKeywords: 3,
      explanation: 'Explain means show the mechanism — chain every claim in three links: emerging technology, the new capability it creates, the innovation that becomes possible. Additive manufacturing lets designers prototype complex geometries in hours rather than weeks, SO more design iterations fit within the same budget and timeline, INCREASING the likelihood of arriving at a successful solution. The counter-case is equally chainable: generative AI produces outputs based on patterns in existing work, SO over-reliance may lead to derivative rather than original solutions. Stating an outcome without the middle link is what caps these at two marks.'
    },
    {
      id: 'dnt-44', topic: 'Designing and Producing', difficulty: 3, type: 'short',
      prompt: 'Outline THREE considerations when selecting resources for a design project.',
      accept: ['cost so materials fit the budget sustainability so materials are recyclable or renewable with low embodied energy and ethical sourcing so suppliers use fair labour practices'],
      keywords: [
        ['cost', 'budget', 'price', 'afford'],
        ['sustainab', 'recycl', 'renewable', 'embodied energy', 'environment', 'life cycle'],
        ['ethic', 'labour', 'child labour', 'fair', 'working condition', 'supplier'],
      ],
      minKeywords: 3,
      explanation: 'When a question names a number, physically number your response so the marker finds all three, and develop them evenly — one strong point plus two mentions caps the mark. 1. Cost — materials must fit the project budget; exceeding it forces compromises elsewhere or makes the product unviable for the target market. 2. Sustainability — recyclable or renewable materials with low embodied energy reduce environmental impact across the life cycle. 3. Ethical sourcing — suppliers with fair labour practices, avoiding child labour and unsafe conditions, protecting workers and brand reputation. Others in the bank: availability and lead time, suitability of material properties to function, durability, and safety in use.'
    },
    {
      id: 'dnt-45', topic: 'Major Design Project', difficulty: 4, type: 'short',
      prompt: 'A question asks you to EVALUATE your MDP against its criteria for success. What two things must appear that a "describe" answer would omit?',
      accept: ['an explicit judgement on the degree of success stated up front and an acknowledged limitation of what has not yet been achieved'],
      keywords: [
        ['judgement', 'verdict', 'degree', 'how successful', 'largely', 'overall', 'extent'],
        ['limitation', 'not yet', 'shortfall', 'weakness', 'outstanding', 'further', 'improve', 'descoped'],
      ],
      minKeywords: 2,
      explanation: 'Evaluate demands a verdict on the DEGREE of success plus credible limitations — describing how each criterion was addressed is a "describe" answer. Two sentences to drop into any MDP evaluation. Opening judgement: "My MDP has been largely successful against its criteria for success, fully meeting X and Y, with Z requiring further development." Closing limitation: "However, [criterion] has not yet been fully achieved — [what is outstanding] — which will be addressed through [next step]." Admitting a shortfall makes the evaluation credible rather than promotional. Add end-user feedback as evidence too: "testing with [user] confirmed the mount remained stable on webbing during movement" turns a claim into verified evidence.'
    },
    {
      id: 'dnt-46', topic: 'Designing and Producing', difficulty: 3, type: 'mc',
      prompt: 'Which factor is MOST likely to cause a design solution to fail?',
      options: [
        'An unclear design brief',
        'Expensive research and testing',
        'Extensive consultation with end users',
        'Multiple rounds of prototyping',
      ],
      answer: 0,
      explanation: 'The design brief defines the problem, the criteria and the constraints, so if it is unclear everything downstream — research, ideation, evaluation — aims at the wrong target and the solution can be well executed yet still fail because it solves the wrong problem. Expensive research and testing is a budget pressure, not a cause of design failure; thorough testing generally makes success MORE likely, with cost as the trade-off. When every option looks plausible, ask which one attacks the foundation of the design process rather than a resource constraint — failure questions point back to the brief, the criteria or the user.'
    },
    {
      id: 'dnt-47', topic: 'Design Theory', difficulty: 2, type: 'mc',
      prompt: 'A florist designs an arrangement for a wedding. The design factor given highest priority is:',
      options: ['Aesthetics', 'Durability', 'Ergonomics', 'Obsolescence'],
      answer: 0,
      explanation: 'Match the design factor to the user and the context — this is the skill multiple choice tests every year. A short-lived decorative product for a single event prioritises visual appeal, not durability or ergonomics. By the same logic, a product for young children prioritises safety through non-toxic, durable materials over cost or aesthetics, and a wearable fitness device prioritises ergonomics and data privacy.'
    },
    {
      id: 'dnt-48', topic: 'Design Theory', difficulty: 2, type: 'mc',
      prompt: 'Which tool is used to track project progress against time, as opposed to analysing a situation or an environmental impact?',
      options: ['Gantt chart', 'SWOT analysis', 'Life cycle analysis', 'Venn diagram'],
      answer: 0,
      explanation: 'A Gantt chart sequences tasks against deadlines and exposes the critical path, so it is the scheduling tool. SWOT is situational analysis, life cycle analysis is a cradle-to-grave environmental assessment, and a Venn diagram is for comparison. Knowing which tool does which job is worth an easy multiple choice mark most years.'
    },
    {
      id: 'dnt-49', topic: 'Designing and Producing', difficulty: 3, type: 'short',
      prompt: 'Outline the role of prototyping in the development of a design project. Answer "role of", not just what a prototype is.',
      accept: ['prototyping lets a designer test and evaluate a concept in physical or functional form identifying faults early so modifications are made before final production which reduces risk and cost and each prototype informs the next iteration'],
      keywords: [
        ['test', 'evaluat', 'trial', 'try'],
        ['fault', 'issue', 'problem', 'refine', 'improve', 'modif', 'iterat'],
        ['early', 'before', 'risk', 'cost', 'final production', 'commit'],
      ],
      minKeywords: 2,
      explanation: 'Go beyond the definition and answer the role directly: prototyping tests and refines design concepts in physical or functional form, identifying faults and areas for refinement early so improvements are made before the expense of final production. Mention iteration explicitly — each prototype informs the next evolution of the design. Ground it in your own folio: testing a 3D-printed case prototype to check tolerances before committing to the final print, or the 45° rotated strap holes on your mount.'
    },
    {
      id: 'dnt-50', topic: 'Design Theory', difficulty: 3, type: 'mc',
      prompt: 'A patent protects an invention for 20 years. Design registration in Australia protects the visual appearance of a product for:',
      options: ['10 years', '20 years', '5 years', 'The life of the designer plus 70 years'],
      answer: 0,
      explanation: 'Patents — 20 years, protecting how something works. Design registration — 10 years, protecting how it looks. Trademarks — renewable indefinitely, protecting brand identifiers. Copyright — automatic on creation, life of the author plus 70 years, protecting original expression. Licensing lets another party use protected IP for a fee, which is exactly what every vacuum manufacturer refused Dyson.'
    },
    {
      id: 'dnt-51', topic: 'Designing and Producing', difficulty: 2, type: 'mc',
      prompt: 'Quality assurance differs from quality control in that assurance:',
      options: [
        'Is a system designed to PREVENT defects, while control INSPECTS to detect them',
        'Inspects finished products, while control designs the production system',
        'Applies only to services, while control applies only to goods',
        'Is carried out by an external auditor, while control is carried out internally',
      ],
      answer: 0,
      explanation: 'Assurance is preventative and systemic — building processes so defects do not occur. Control is detective — inspecting output to find defects that have already occurred. The design implication is that assurance is cheaper, because a defect caught by inspection has already consumed materials and time, and rework is most expensive late in production. That is why action plans embed QA checkpoints rather than relying on final inspection.'
    },
    {
      id: 'dnt-52', topic: 'Innovation and Emerging Technologies', difficulty: 4, type: 'short',
      prompt: 'Discuss the long-term environmental impact of lithium-ion rechargeable versus alkaline single-use batteries. Give a point for EACH and a judgement.',
      accept: ['lithium ion is rechargeable hundreds of times so far fewer units are manufactured and discarded but lithium and cobalt mining depletes resources and uses huge water volumes while alkaline single use means continuous manufacturing energy and landfill volume so lithium ion has lower cumulative impact if recycled properly'],
      keywords: [
        ['rechargeab', 'hundreds', 'reus', 'fewer unit', 'lifespan'],
        ['mining', 'lithium', 'cobalt', 'extraction', 'water', 'recycl', 'landfill', 'toxic', 'fire'],
        ['single-use', 'single use', 'disposab', 'continuous', 'manufactur', 'volume'],
      ],
      minKeywords: 2,
      explanation: 'Discuss means both sides for both options, then a judgement. Lithium-ion for: rechargeable hundreds of times, so far fewer units are manufactured and discarded over the product\'s life, and it enables renewable and cordless technology. Lithium-ion against: lithium and cobalt mining depletes finite resources, damages ecosystems and consumes huge volumes of water; the cells are hard to recycle and pose fire and toxicity risks in landfill. Alkaline for: less toxic than older chemistries, with some recycling streams available. Alkaline against: single use means continuous manufacturing energy and massive cumulative landfill volume per unit of energy delivered. Judgement: over the long term lithium-ion has the lower cumulative impact PROVIDED it is recycled properly; alkaline\'s disposability makes it worse at scale.'
    },
    {
      id: 'dnt-53', topic: 'Innovation and Emerging Technologies', difficulty: 4, type: 'short',
      prompt: 'Name TWO impacts of AI on designers that a top-band extended response must cover beyond efficiency gains.',
      accept: ['employment and role change as entry level tasks are automated shifting designers toward curation and judgement plus ethical and legal implications including copyright of ai generated work bias in training data and the energy cost of compute'],
      keywords: [
        ['employment', 'job', 'displace', 'role', 'entry level', 'automat', 'curat', 'judgement', 'prompt'],
        ['ethic', 'copyright', 'ip', 'intellectual property', 'bias', 'responsib', 'legal'],
        ['energy', 'compute', 'data centre', 'environment', 'water', 'democratis', 'concentrat'],
      ],
      minKeywords: 2,
      explanation: 'Efficiency alone is a band 4 answer. Employment and role change: automation of entry-level design tasks creates job displacement risk, especially in developing economies, and shifts the designer\'s role toward curation, prompting and judgement. Ethical and legal implications: copyright and IP ownership of AI-generated work, bias in training data, and where responsibility sits when an AI-assisted design fails. Environmental and social lens: the energy and water cost of AI compute in data centres, and the tension between democratising design tools and concentrating power in a few technology companies. Reference the stimulus directly, use cause-and-effect connectives, and conclude with a genuine judgement — that is what earned 15/15 in the trial.'
    },
    {
      id: 'dnt-54', topic: 'Design Theory', difficulty: 3, type: 'short',
      prompt: 'Describe ONE ethical issue in managing personal data collected by a product.',
      accept: ['privacy means designers must obtain informed consent collect only what is needed and store data securely because mismanagement such as selling data without consent or a breach violates users privacy rights and trust'],
      keywords: [
        ['privacy', 'consent', 'security', 'secure', 'confidential'],
        ['collect', 'store', 'share', 'sell', 'third part', 'access', 'breach'],
        ['trust', 'right', 'violat', 'harm', 'misuse', 'unauthorised'],
      ],
      minKeywords: 2,
      explanation: 'Pick ONE issue and develop it rather than listing several. Privacy: designers and companies collecting personal data have an ethical obligation to obtain informed consent, collect only what is needed, and store it securely against unauthorised access. Link back to management by naming the consequence of mishandling — selling data to third parties without clear consent, or weak security leading to a breach, violates users\' privacy rights and destroys trust. A concrete example anchors it: a fitness app sharing location data with advertisers without meaningful consent.'
    },
  ]
};
