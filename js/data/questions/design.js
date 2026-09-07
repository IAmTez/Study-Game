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
  ]
};
