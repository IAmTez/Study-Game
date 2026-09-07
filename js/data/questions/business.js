/* NSW HSC Business Studies — Operations, Marketing, Finance, Human Resources. */

export const SUBJECT = {
  id: 'business',
  name: 'Business Studies',
  short: 'BUS',
  colour: '#f2c14e',
  syllabus: 'NSW HSC Business Studies',
  topics: ['Operations', 'Marketing', 'Finance', 'Human Resources'],
  questions: [

    /* ---------------- Operations ---------------- */
    {
      id: 'bus-01', topic: 'Operations', difficulty: 1, type: 'mc',
      prompt: 'The transformation process in operations converts:',
      options: [
        'Profits into dividends',
        'Inputs into outputs',
        'Liabilities into assets',
        'Wages into productivity',
      ],
      answer: 1,
      explanation: 'Operations is the input → transformation → output model. Inputs are the 4 Ms (materials, machinery, money, manpower) plus information; transformation adds value; outputs are the goods or services delivered to customers.'
    },
    {
      id: 'bus-02', topic: 'Operations', difficulty: 2, type: 'mc',
      prompt: 'The "four Vs" that characterise a transformation process are:',
      options: [
        'Value, volume, velocity, variance',
        'Volume, variety, variation in demand, visibility',
        'Vision, values, volume, viability',
        'Variety, velocity, value-adding, verification',
      ],
      answer: 1,
      explanation: 'Volume (how much), variety (how many different products), variation in demand (how much demand fluctuates), visibility (how much the customer sees of the process). High volume/low variety suits standardised mass production; low volume/high variety suits customisation.'
    },
    {
      id: 'bus-03', topic: 'Operations', difficulty: 2, type: 'mc',
      prompt: 'Just-in-time (JIT) inventory management aims to:',
      options: [
        'Hold large buffer stocks to guarantee supply',
        'Minimise holding costs by receiving inputs only as needed',
        'Purchase inventory in bulk to obtain discounts',
        'Store finished goods until prices rise',
      ],
      answer: 1,
      explanation: 'JIT minimises holding costs (storage, insurance, obsolescence, tied-up capital) by receiving materials exactly when required. The trade-off is vulnerability: a single supply disruption halts production, as global supply-chain shocks have repeatedly demonstrated.'
    },
    {
      id: 'bus-04', topic: 'Operations', difficulty: 3, type: 'mc',
      prompt: 'A business outsources its payroll function. This is best classified as:',
      options: [
        'Vertical integration',
        'A cost leadership strategy in marketing',
        'An operations strategy using an external provider for a non-core function',
        'A form of quality assurance',
      ],
      answer: 2,
      explanation: 'Outsourcing contracts a non-core function to a specialist provider, converting fixed costs into variable ones and accessing expertise. Risks: loss of control, security of data, dependency on the provider, and potential damage to reputation if the provider behaves unethically.'
    },
    {
      id: 'bus-05', topic: 'Operations', difficulty: 3, type: 'short',
      prompt: 'Distinguish between quality control and quality assurance.',
      accept: ['quality control inspects output after production while quality assurance builds standards into the process beforehand'],
      keywords: [
        ['control', 'inspect', 'inspection', 'check', 'after', 'end', 'defect', 'detect'],
        ['assurance', 'standard', 'process', 'before', 'prevent', 'system', 'iso'],
      ],
      minKeywords: 2,
      explanation: 'Quality control is reactive: inspect output and reject defects after they occur. Quality assurance is proactive: establish and certify a system (e.g. ISO 9001) so that defects are prevented. Quality improvement (TQM) goes further, making continuous improvement everyone\'s responsibility.'
    },
    {
      id: 'bus-06', topic: 'Operations', difficulty: 4, type: 'mc',
      prompt: 'Which is the clearest example of a business responding to "corporate social responsibility" in operations?',
      options: [
        'Reducing the selling price to gain market share',
        'Auditing suppliers to ensure no forced labour in the supply chain',
        'Issuing additional shares to raise capital',
        'Offering staff performance-based bonuses',
      ],
      answer: 1,
      explanation: 'CSR goes beyond legal compliance. In operations it shows up as ethical sourcing and supply-chain auditing, environmental sustainability (waste reduction, emissions), and safe working conditions. Distinguish genuine CSR from "greenwashing" — a favourite evaluation angle.'
    },
    {
      id: 'bus-07', topic: 'Operations', difficulty: 4, type: 'short',
      prompt: 'Explain ONE way globalisation influences a business\'s operations.',
      accept: ['global sourcing lets a business access cheaper inputs but exposes it to supply chain disruption'],
      keywords: [
        ['global', 'overseas', 'international', 'offshore', 'worldwide'],
        ['supplier', 'sourcing', 'supply chain', 'input', 'material', 'labour', 'market', 'competition'],
        ['cost', 'cheaper', 'price', 'quality', 'risk', 'disruption', 'standard'],
      ],
      minKeywords: 2,
      explanation: 'Globalisation lets a business source inputs anywhere, exposing it to cheaper labour and materials but also to currency movement, transport cost and supply-chain disruption. It also raises competitive pressure from global rivals and requires compliance with multiple regulatory regimes and consumer expectations about ethical sourcing.'
    },

    /* ---------------- Marketing ---------------- */
    {
      id: 'bus-08', topic: 'Marketing', difficulty: 1, type: 'mc',
      prompt: 'The marketing mix consists of:',
      options: [
        'Product, price, promotion, place',
        'People, process, physical evidence, profit',
        'Planning, positioning, promotion, pricing',
        'Product, profit, place, positioning',
      ],
      answer: 0,
      explanation: 'The four Ps: product, price, promotion, place. For services, three more are commonly added — people, process, physical evidence. The mix must be internally consistent: a premium price demands premium product, selective distribution and image-based promotion.'
    },
    {
      id: 'bus-09', topic: 'Marketing', difficulty: 2, type: 'mc',
      prompt: 'Market segmentation means:',
      options: [
        'Dividing the total market into groups with similar characteristics',
        'Reducing the number of products offered',
        'Setting different prices in different countries',
        'Splitting the marketing budget across media channels',
      ],
      answer: 0,
      explanation: 'Segmentation divides a market by demographic, geographic, psychographic or behavioural characteristics. It is followed by targeting (choosing which segments to pursue) and positioning (establishing a distinct place in the customer\'s mind relative to competitors).'
    },
    {
      id: 'bus-10', topic: 'Marketing', difficulty: 2, type: 'mc',
      prompt: 'Setting a low initial price to build market share quickly is called:',
      options: ['Price skimming', 'Price penetration', 'Loss leading', 'Cost-plus pricing'],
      answer: 1,
      explanation: 'Penetration pricing = low price, high volume, rapid share. Skimming = high initial price to recover development costs from early adopters, then lower it. Loss leading = pricing one item below cost to attract customers who buy other items. Cost-plus = cost + fixed margin.'
    },
    {
      id: 'bus-11', topic: 'Marketing', difficulty: 3, type: 'mc',
      prompt: 'A business in the DECLINE stage of the product life cycle would most likely:',
      options: [
        'Invest heavily in awareness advertising',
        'Extend the product\'s life through repositioning or new features, or withdraw it',
        'Set a skimming price to maximise early profit',
        'Expand distribution to as many outlets as possible',
      ],
      answer: 1,
      explanation: 'Life cycle: introduction (build awareness, high cost, low sales) → growth (rising sales and profit, build distribution) → maturity (peak sales, heavy competition, differentiation) → decline (falling sales; either extend via repositioning/new markets/new features, or harvest and withdraw).'
    },
    {
      id: 'bus-12', topic: 'Marketing', difficulty: 3, type: 'short',
      prompt: 'Explain the difference between primary and secondary marketing data.',
      accept: ['primary data is collected first hand by the business while secondary data already exists from other sources'],
      keywords: [
        ['primary', 'first hand', 'firsthand', 'original', 'survey', 'collect'],
        ['secondary', 'existing', 'already', 'published', 'external', 'abs', 'report'],
      ],
      minKeywords: 2,
      explanation: 'Primary data is gathered first-hand for the specific purpose — surveys, focus groups, observation, experiments. It is current and tailored but expensive and slow. Secondary data already exists — ABS statistics, industry reports, internal sales records. It is cheap and fast but may be dated or not fit the exact question.'
    },
    {
      id: 'bus-13', topic: 'Marketing', difficulty: 4, type: 'mc',
      prompt: 'Which is an example of an ETHICAL issue in marketing rather than a legal one?',
      options: [
        'Making a demonstrably false claim about a product\'s contents',
        'Targeting advertising for high-sugar products at young children',
        'Failing to honour a statutory warranty',
        'Engaging in price fixing with a competitor',
      ],
      answer: 1,
      explanation: 'The other three breach the Competition and Consumer Act (misleading conduct, statutory warranties, price fixing) — legal issues. Targeting children with junk-food advertising is generally lawful but widely regarded as unethical. Ethical marketing issues also include invasion of privacy, creating false needs and exploiting vulnerable consumers.'
    },
    {
      id: 'bus-14', topic: 'Marketing', difficulty: 4, type: 'short',
      prompt: 'Outline ONE reason a business would use a "global branding" strategy.',
      accept: ['a single consistent brand worldwide achieves economies of scale in promotion and instant recognition'],
      keywords: [
        ['consistent', 'same', 'uniform', 'single', 'standard'],
        ['economies of scale', 'cost', 'cheaper', 'efficient', 'recognition', 'recognisable', 'awareness', 'image'],
        ['global', 'world', 'international', 'market'],
      ],
      minKeywords: 2,
      explanation: 'Global branding uses one name, image and message worldwide. Advantages: economies of scale in promotion, instant recognition for travelling consumers, a single strong image. Disadvantage: it ignores local cultural difference, which is why many businesses "glocalise" — a global brand with locally adapted products, as McDonald\'s does with regional menu items.'
    },

    /* ---------------- Finance ---------------- */
    {
      id: 'bus-15', topic: 'Finance', difficulty: 1, type: 'mc',
      prompt: 'The accounting equation is:',
      options: [
        'Assets = Liabilities + Owner\'s Equity',
        'Assets = Revenue − Expenses',
        'Liabilities = Assets + Owner\'s Equity',
        'Owner\'s Equity = Assets + Liabilities',
      ],
      answer: 0,
      explanation: 'Assets = Liabilities + Owner\'s Equity. Everything the business controls is funded either by outsiders (liabilities) or owners (equity). The balance sheet is simply this equation set out at a point in time.'
    },
    {
      id: 'bus-16', topic: 'Finance', difficulty: 2, type: 'mc',
      prompt: 'Which is an INTERNAL source of finance?',
      options: ['Bank overdraft', 'Retained profits', 'Debenture issue', 'Leasing'],
      answer: 1,
      explanation: 'Internal finance = retained profits and owner\'s equity — no interest, no loss of control, but limited in size. External debt: overdraft, mortgage, debentures, leasing, factoring. External equity: ordinary shares, private equity. Short-term debt funds working capital; long-term debt funds non-current assets.'
    },
    {
      id: 'bus-17', topic: 'Finance', difficulty: 2, type: 'mc',
      prompt: 'The current ratio measures:',
      options: ['Profitability', 'Liquidity', 'Gearing', 'Efficiency'],
      answer: 1,
      explanation: 'Current ratio = current assets ÷ current liabilities. It measures liquidity — the ability to meet short-term debts. A benchmark of about 2:1 is often quoted, though the appropriate level varies by industry. Profitability ratios: gross/net profit ratio, return on equity. Gearing: debt to equity. Efficiency: expense ratio, accounts receivable turnover.'
    },
    {
      id: 'bus-18', topic: 'Finance', difficulty: 3, type: 'mc',
      prompt: 'A business with a debt-to-equity ratio of 1.8:1 is:',
      options: [
        'Highly geared, with greater risk but potentially higher returns',
        'Lowly geared and financially conservative',
        'Insolvent and unable to trade',
        'Operating with no external debt',
      ],
      answer: 0,
      explanation: 'Debt to equity above about 1:1 indicates high gearing. High gearing amplifies returns to owners when the business earns more than the interest cost, but magnifies losses and raises the risk of default when earnings fall — the core risk/return trade-off in financial management.'
    },
    {
      id: 'bus-19', topic: 'Finance', difficulty: 3, type: 'short',
      prompt: 'Explain why a profitable business can still fail.',
      accept: ['profit is an accounting measure but the business fails if it runs out of cash to pay debts when due'],
      keywords: [
        ['cash', 'cash flow', 'liquidity', 'liquid'],
        ['profit', 'profitable', 'accrual', 'accounting', 'paper'],
        ['pay', 'debts', 'due', 'obligation', 'creditors', 'insolvent', 'insolvency'],
      ],
      minKeywords: 2,
      explanation: 'Profit is recorded on an accrual basis — a sale counts as revenue when made, not when paid. A business can be profitable on paper while lacking the cash to meet wages, suppliers and loan repayments as they fall due. That is insolvency. Cash flow management (distribution of payments, factoring, discounts for early payment) exists precisely to bridge this gap.'
    },
    {
      id: 'bus-20', topic: 'Finance', difficulty: 4, type: 'mc',
      prompt: 'A business records net sales of $500 000, COGS of $300 000 and expenses of $150 000. Its net profit ratio is:',
      options: ['10%', '40%', '30%', '60%'],
      answer: 0,
      explanation: 'Gross profit = 500 000 − 300 000 = 200 000. Net profit = 200 000 − 150 000 = 50 000. Net profit ratio = 50 000 ÷ 500 000 = 10%. Gross profit ratio would be 200 000 ÷ 500 000 = 40%. Always divide by NET SALES, not by cost.'
    },
    {
      id: 'bus-21', topic: 'Finance', difficulty: 4, type: 'mc',
      prompt: 'Which is a LIMITATION of financial reports?',
      options: [
        'They are audited by qualified accountants',
        'Historical cost may not reflect the current value of assets',
        'They are prepared using consistent accounting standards',
        'They are publicly available for listed companies',
      ],
      answer: 1,
      explanation: 'Standard limitations: normalised earnings (one-off items distorting comparison), capitalising expenses, valuing assets (historical cost vs current market value), timing issues (recording revenue early), debt repayments (off-balance-sheet), and notes to financial statements. All are legal but can mislead — the exam wants you to name and explain them.'
    },
    {
      id: 'bus-22', topic: 'Finance', difficulty: 5, type: 'short',
      prompt: 'Evaluate the use of debt finance to fund a business expansion.',
      accept: ['debt is fast and preserves ownership control but interest must be paid regardless of profit which increases risk'],
      keywords: [
        ['control', 'ownership', 'dilut', 'shares', 'equity'],
        ['interest', 'repay', 'cost', 'obligation', 'fixed'],
        ['risk', 'gearing', 'geared', 'insolven', 'default', 'return'],
        ['tax', 'deduct'],
      ],
      minKeywords: 2,
      explanation: 'For: faster to arrange than equity, does not dilute ownership or control, interest is tax-deductible, and returns to owners are amplified if the business earns more than the interest rate. Against: interest and principal must be paid regardless of profit, increased gearing raises insolvency risk, lenders impose covenants and require security. Judgement usually turns on the stability of the business\'s cash flows.'
    },

    /* ---------------- Human Resources ---------------- */
    {
      id: 'bus-23', topic: 'Human Resources', difficulty: 1, type: 'mc',
      prompt: 'The human resource cycle consists of:',
      options: [
        'Planning, recruitment, selection, induction, training, appraisal, separation',
        'Acquisition, development, maintenance, separation',
        'Hiring, paying, promoting, firing',
        'Recruitment, motivation, retention, redundancy',
      ],
      answer: 1,
      explanation: 'The HSC processes are: acquisition (planning, recruitment, selection), development (induction, training, mentoring), maintenance (remuneration, benefits, workplace safety, compliance) and separation (voluntary or involuntary). The option listing planning, recruitment, selection, induction, training, appraisal and separation names real activities, but it is not the four-stage framework the syllabus uses.'
    },
    {
      id: 'bus-24', topic: 'Human Resources', difficulty: 2, type: 'mc',
      prompt: 'Which is an example of an INVOLUNTARY separation?',
      options: ['Resignation', 'Retirement', 'Redundancy', 'Voluntary redundancy accepted by the employee'],
      answer: 2,
      explanation: 'Involuntary separation is initiated by the employer: dismissal (for misconduct or poor performance) and retrenchment/redundancy (the position is no longer required). Voluntary separation is employee-initiated: resignation, retirement, voluntary redundancy. Unfair dismissal protections apply to involuntary separation.'
    },
    {
      id: 'bus-25', topic: 'Human Resources', difficulty: 2, type: 'mc',
      prompt: 'A "modern award" sets:',
      options: [
        'A bonus paid for exceptional performance',
        'Minimum industry-wide pay and conditions',
        'An individual contract negotiated with one employee',
        'The maximum wage an employer may pay',
      ],
      answer: 1,
      explanation: 'Modern awards set minimum industry or occupation-wide pay and conditions. Above them sit enterprise agreements (collectively bargained at the workplace, must pass the Better Off Overall Test) and common law contracts. The National Employment Standards form the floor beneath all of them.'
    },
    {
      id: 'bus-26', topic: 'Human Resources', difficulty: 3, type: 'mc',
      prompt: 'According to Maslow, which need must be satisfied BEFORE esteem needs?',
      options: ['Self-actualisation', 'Belonging and social needs', 'Aesthetic needs', 'Cognitive needs'],
      answer: 1,
      explanation: 'Maslow\'s hierarchy: physiological → safety → belonging/social → esteem → self-actualisation. Lower needs must be substantially met before higher ones motivate. Compare with Herzberg (hygiene factors prevent dissatisfaction; motivators create satisfaction) and Locke (specific, difficult, accepted goals raise performance).'
    },
    {
      id: 'bus-27', topic: 'Human Resources', difficulty: 3, type: 'short',
      prompt: 'Explain ONE benefit to a business of a diverse workforce.',
      accept: ['diversity brings varied perspectives that improve problem solving and help the business understand a wider customer base'],
      keywords: [
        ['perspective', 'idea', 'view', 'innovation', 'creative', 'problem solving', 'skills'],
        ['customer', 'market', 'client', 'community', 'understand', 'reflect'],
        ['reputation', 'talent', 'recruit', 'retention', 'legal', 'compliance'],
      ],
      minKeywords: 1,
      explanation: 'Benefits: a wider range of perspectives improving innovation and problem-solving; better understanding of a diverse customer base; access to a larger talent pool; improved reputation as an employer; and compliance with anti-discrimination law. Managing diversity requires more than hiring — training, inclusive policy and measurable accountability.'
    },
    {
      id: 'bus-28', topic: 'Human Resources', difficulty: 4, type: 'mc',
      prompt: 'The Better Off Overall Test (BOOT) requires that an enterprise agreement:',
      options: [
        'Provides employees with a wage above the national median',
        'Leaves each employee better off overall than under the relevant modern award',
        'Is approved by 100% of affected employees',
        'Reduces the employer\'s total wage bill',
      ],
      answer: 1,
      explanation: 'The BOOT is applied by the Fair Work Commission: each employee must be better off overall than under the relevant modern award. It permits trade-offs (e.g. higher base pay for reduced penalty rates) provided the net position improves. It is the key legal safeguard in enterprise bargaining.'
    },
    {
      id: 'bus-29', topic: 'Human Resources', difficulty: 4, type: 'short',
      prompt: 'Outline TWO indicators a business could use to assess HR effectiveness.',
      accept: ['staff turnover rate and absenteeism rate'],
      keywords: [
        ['turnover', 'retention', 'resignation', 'separation'],
        ['absentee', 'absence', 'sick leave'],
        ['dispute', 'grievance', 'accident', 'injury', 'safety', 'satisfaction', 'survey', 'productivity', 'performance', 'training'],
      ],
      minKeywords: 2,
      explanation: 'Standard indicators: corporate culture, benchmarking key variables, changes in staff turnover, absenteeism, accidents, levels of disputation, worker satisfaction surveys and productivity per employee. Strong answers pair each indicator with what a rising or falling value would suggest.'
    },
    {
      id: 'bus-30', topic: 'Human Resources', difficulty: 5, type: 'short',
      prompt: 'Evaluate the effectiveness of performance-based pay as a motivation strategy.',
      accept: ['it lifts measurable output but can damage teamwork and encourage short term behaviour'],
      keywords: [
        ['motivat', 'incentive', 'productivity', 'output', 'effort', 'performance'],
        ['team', 'cooperation', 'collaborat', 'competition', 'conflict', 'short term', 'quality', 'ethic', 'gaming'],
        ['measur', 'quantif', 'fair', 'subjective'],
      ],
      minKeywords: 2,
      explanation: 'Effective where output is individually measurable and quality is easy to verify — sales commission is the classic case. Less effective where work is collaborative (it undermines teamwork), where quality matters more than volume (it encourages corner-cutting), or where measurement is subjective (it breeds perceptions of unfairness). Herzberg would add that pay is a hygiene factor: its absence demotivates, but its presence does not create lasting satisfaction.'
    },
    {
      id: 'bus-31', topic: 'Operations', difficulty: 5, type: 'mc',
      prompt: 'A business adopts lean production. The MOST likely operational trade-off is:',
      options: [
        'Lower unit costs but reduced ability to absorb supply disruption',
        'Higher inventory costs but improved product variety',
        'Increased waste but faster delivery times',
        'Reduced quality but higher employee satisfaction',
      ],
      answer: 0,
      explanation: 'Lean production eliminates waste — excess inventory, waiting, overproduction, defects — lowering unit cost and freeing capital. The trade-off is fragility: with no buffer stock, a supplier failure, port delay or demand spike halts production immediately. Evaluation questions want you to name this trade-off explicitly.'
    },
    {
      id: 'bus-32', topic: 'Marketing', difficulty: 5, type: 'mc',
      prompt: 'A premium brand discounts heavily for a sustained period. The greatest long-term risk is:',
      options: [
        'A short-term fall in unit sales volume',
        'Erosion of the brand\'s perceived value and positioning',
        'Breach of the Competition and Consumer Act',
        'An immediate increase in production costs',
      ],
      answer: 1,
      explanation: 'Sustained discounting trains customers to wait for sales and undermines the price-quality inference that supports premium positioning. Once perceived value falls, restoring the original price is very difficult. This is why premium brands prefer value-adding, bundling or limited editions over open discounting.'
    },
    {
      id: 'bus-33', topic: 'Finance', difficulty: 2, type: 'short',
      prompt: 'What is working capital, and how is it calculated?',
      accept: ['working capital is current assets minus current liabilities and measures ability to meet short term debts'],
      keywords: [
        ['current assets'],
        ['current liabilities'],
        ['short term', 'day to day', 'debts', 'operating', 'liquidity'],
      ],
      minKeywords: 2,
      explanation: 'Working capital = current assets − current liabilities. It is the funding available for day-to-day operations. Managing it means controlling cash, receivables, inventory and payables — for example, offering discounts for early payment to accelerate cash inflow, or negotiating longer supplier terms to delay outflow.'
    },
    {
      id: 'bus-34', topic: 'Human Resources', difficulty: 1, type: 'short',
      prompt: 'Name the four stages of the human resource process.',
      accept: ['acquisition development maintenance separation'],
      keywords: [['acquisition', 'acquire', 'recruit'], ['development', 'develop', 'training'], ['maintenance', 'maintain'], ['separation', 'separate', 'termination']],
      minKeywords: 3,
      explanation: 'Acquisition → development → maintenance → separation. Each stage has a legal dimension (anti-discrimination in acquisition, work health and safety in maintenance, unfair dismissal in separation), which is where most extended-response marks sit.'
    },
    {
      id: 'bus-35', topic: 'Marketing', difficulty: 1, type: 'mc',
      prompt: 'Which is the best example of "place" in the marketing mix?',
      options: [
        'A 20% end-of-season discount',
        'Selling exclusively through a company-owned online store',
        'A television advertising campaign',
        'Redesigning the packaging',
      ],
      answer: 1,
      explanation: 'Place is distribution — the channels through which the product reaches the customer. Intensive distribution puts the product everywhere (confectionery), selective distribution limits it to chosen outlets, exclusive distribution restricts it to a single channel to protect brand image.'
    },
    {
      id: 'bus-36', topic: 'Operations', difficulty: 1, type: 'mc',
      prompt: 'Which of these is an operations INPUT rather than an output?',
      options: ['A finished car', 'Customer service delivered', 'Skilled labour', 'A completed haircut'],
      answer: 2,
      explanation: 'Inputs are the resources fed into transformation — materials, machinery, money, manpower (labour) and information. Outputs are the goods or services delivered. Note that for a service business the customer is often an input too, since they participate in the transformation process.'
    },

    /* ------- Syllabus dot-point wording and implications (post-trial drills) ------- */
    {
      id: 'bus-37', topic: 'Finance', difficulty: 3, type: 'mc',
      prompt: 'Which of these is a METHOD OF INTERNATIONAL PAYMENT?',
      options: ['Letter of credit', 'Hedging', 'A forward exchange contract', 'An interest rate swap'],
      answer: 0,
      explanation: 'Two separate syllabus dot points, and crossing them over costs marks. Methods of international payment are payment in advance, letter of credit, bill of exchange and clean payment. Hedging, derivatives, futures, options, swaps and forward contracts are methods of MANAGING FINANCIAL RISK in international markets. If a question asks for a method of payment, "hedging" scores nothing however well it is explained.'
    },
    {
      id: 'bus-38', topic: 'Finance', difficulty: 3, type: 'mc',
      prompt: 'Which method of international payment carries the HIGHEST risk for the seller?',
      options: ['Clean payment', 'Payment in advance', 'Letter of credit', 'Bill of exchange'],
      answer: 0,
      explanation: 'Learn the four as a risk spectrum. Payment in advance — buyer pays before goods ship, so the buyer carries the risk. Letter of credit — the buyer\'s bank guarantees payment once conditions such as shipping documents are met, so risk is balanced; this is the safe recommendation in a report. Bill of exchange — a written order to pay on demand or at a future date, document against payment or acceptance, so risk is shared. Clean payment — goods ship first and the buyer pays later, so the seller carries the highest risk.'
    },
    {
      id: 'bus-39', topic: 'Operations', difficulty: 2, type: 'mc',
      prompt: 'A battery manufacturer uses lithium sourced overseas and employs overseas workers in its plants. Which classification is correct?',
      options: [
        'Lithium is a transformed resource; the workers are a transforming resource',
        'Lithium is a transforming resource; the workers are a transformed resource',
        'Both lithium and the workers are transformed resources',
        'Both lithium and the workers are transforming resources',
      ],
      answer: 0,
      explanation: 'Transformed resources are what gets CHANGED by the process: materials, information and customers. Transforming resources are what DOES the changing: human resources and facilities. Memory hook — transformed = the thing that ends up different. Getting this backwards is a straight zero on a two-mark question, so the hook is worth memorising.'
    },
    {
      id: 'bus-40', topic: 'Operations', difficulty: 2, type: 'mc',
      prompt: 'A business redesigns its packaging to use recycled materials after new waste regulations and customer pressure. Named precisely, the operational influence at work is:',
      options: [
        'Environmental sustainability',
        'General changes to the law',
        'Customer preference',
        'Cost-based competition',
      ],
      answer: 0,
      explanation: 'Name the influence from the syllabus list rather than describing it generically — that is where two marks went in the trial. The list: globalisation, technology, quality expectations, cost-based competition, government policies, legal regulation, environmental sustainability, and corporate social responsibility (with its distinction between legal compliance and ethical responsibility). "Law changes" described generically is not the same as naming legal regulation or environmental sustainability as the influence.'
    },
    {
      id: 'bus-41', topic: 'Marketing', difficulty: 3, type: 'mc',
      prompt: 'The global marketing dot point that pairs identical worldwide branding against adapting to local markets is:',
      options: [
        'Standardisation versus customisation',
        'Opinion leaders and word of mouth',
        'Intensive versus exclusive distribution',
        'Skimming versus penetration pricing',
      ],
      answer: 0,
      explanation: 'Standardisation — identical product, branding and promotion in every market, giving economies of scale, a consistent global brand and lower cost; Coca-Cola is the example. Customisation — adapting product, packaging or promotion per market to meet local preferences and regulations; McDonald\'s menu localisation is the example. Global branding and global pricing are the other two dot points. Opinion leaders belong to promotion and the communication process, not global marketing — naming them for a global marketing question loses marks even when the reasoning is sound.'
    },
    {
      id: 'bus-42', topic: 'Human Resources', difficulty: 3, type: 'short',
      prompt: 'Staff turnover has risen sharply at a business. State what this indicates AND draw out the implication for the business.',
      accept: ['it indicates weak human resource effectiveness and it means recruitment and training costs of roughly 50 to 150 percent of salary plus lost corporate knowledge and reduced productivity while replacements get up to speed'],
      keywords: [
        ['recruit', 'training', 'replace', 'cost', 'hiring'],
        ['knowledge', 'experience', 'productivity', 'output', 'strain', 'morale', 'profitab'],
      ],
      minKeywords: 2,
      explanation: 'The circular answer — "high turnover shows HR is not effective" — caps at half marks. Draw out the effect on the business: recruitment and training costs of roughly 50–150% of the departing employee\'s salary, loss of corporate knowledge, reduced productivity while replacements get up to speed, and added strain on remaining staff, all of which reduce profitability. Australian staff turnover averages around 15% annually, which gives you a benchmark to compare against.'
    },
    {
      id: 'bus-43', topic: 'Human Resources', difficulty: 3, type: 'short',
      prompt: 'Name THREE indicators of HR effectiveness other than staff turnover, and give the business effect of ONE of them.',
      accept: ['absenteeism accidents levels of disputation worker satisfaction corporate culture and benchmarking with absenteeism causing lost output and overtime cover costs'],
      keywords: [
        ['absentee', 'accident', 'disputation', 'dispute', 'satisfaction', 'culture', 'benchmark'],
        ['lost output', 'overtime', 'cover', 'premium', 'downtime', 'reputation', 'days lost', 'productiv', 'liability'],
      ],
      minKeywords: 2,
      explanation: 'The indicators: corporate culture (values, symbols, rituals), benchmarking key variables, staff turnover, absenteeism, accidents, levels of disputation, and worker satisfaction. Each needs its effect attached. Absenteeism — lost output, overtime and casual cover costs, and a signal of low morale. Accidents — WHS liability, higher workers\' compensation premiums, downtime and reputational damage. Disputation — measured as disputes per 1,000 employees and working days lost, disrupting operations and damaging the employer brand. Worker satisfaction — measured by surveys and exit interviews, and predictive of both turnover and productivity.'
    },
    {
      id: 'bus-44', topic: 'Finance', difficulty: 3, type: 'mc',
      prompt: 'A business has current assets of $680,000 and current liabilities of $850,000. Its current ratio and the correct interpretation are:',
      options: [
        '0.80:1 — well below the ~2:1 benchmark, so it cannot comfortably cover its short-term debts',
        '1.25:1 — below the benchmark but adequate for most industries',
        '0.80:1 — above the benchmark, indicating strong liquidity',
        '1.25:1 — indicating the business holds too much idle cash',
      ],
      answer: 0,
      explanation: 'Current ratio = current assets ÷ current liabilities = 680,000 ÷ 850,000 = 0.80:1. The calculation alone is not the mark — the comparison is. Against a benchmark of roughly 2:1 this is a serious liquidity problem: the business has 80 cents of current assets for every dollar due within twelve months. Calculating every ratio the stimulus allows, and benchmarking each one, is the fastest way to move a business report up a band.'
    },
    {
      id: 'bus-45', topic: 'Finance', difficulty: 3, type: 'mc',
      prompt: 'Total liabilities are $1,600,000 and total equity is $880,000. The debt to equity ratio and its meaning are:',
      options: [
        '1.82:1 — highly geared, so the business carries high financial risk',
        '0.55:1 — conservatively financed with low risk',
        '1.82:1 — below the benchmark, indicating low gearing',
        '2.82:1 — the business is insolvent',
      ],
      answer: 0,
      explanation: 'Debt to equity = total liabilities ÷ total equity = 1,600,000 ÷ 880,000 = 1.82:1. The benchmark is under 1:1, with lower meaning safer and less leveraged, so 1.82:1 is highly geared: the business relies on borrowed funds, faces heavy interest obligations, and is vulnerable if earnings fall or rates rise. High gearing is not automatically bad — it magnifies returns in good conditions — but paired with a current ratio of 0.80:1 it signals real financial distress.'
    },
    {
      id: 'bus-46', topic: 'Finance', difficulty: 4, type: 'short',
      prompt: 'A business has $235,000 in accounts receivable and poor liquidity. Name and explain ONE debtor management strategy, applying it to the figure.',
      accept: ['debtor management by tightening credit terms and offering a discount for early payment would accelerate collection of the 235000 in receivables converting it to cash and lifting the current ratio'],
      keywords: [
        ['debtor', 'receivable', 'credit term', 'discount', 'collection', 'factoring'],
        ['cash', 'liquidity', 'current ratio', 'convert', 'accelerat', 'improv'],
      ],
      minKeywords: 2,
      explanation: 'The difference between listing and explaining. Listed: "request payment from accounts receivable." Explained: debtor management — tightening credit terms and offering a 2% discount for payment within 10 days — would accelerate collection of the $235,000 in accounts receivable; converting even half of this to cash would lift the current ratio from 0.80:1 toward 0.94:1, improving the ability to meet accounts payable without further borrowing. Name the syllabus strategy, define it, apply it to the stimulus figures, then state the effect on the business. Factoring — selling the receivables at a discount — is the alternative, faster but more costly.'
    },
    {
      id: 'bus-47', topic: 'Finance', difficulty: 4, type: 'short',
      prompt: 'State the four-step method for structuring a Section III business report.',
      accept: ['turn the questions bullets into headings in order then calculate every ratio the stimulus allows then name define apply and state the effect of each strategy then recommend with justification linked to the question wording'],
      keywords: [
        ['heading', 'bullet', 'question', 'order', 'structure'],
        ['ratio', 'calculat', 'figure', 'stimulus', 'benchmark'],
        ['define', 'apply', 'explain', 'effect', 'strategy'],
        ['recommend', 'justif', 'conclusion', 'link back'],
      ],
      minKeywords: 3,
      explanation: 'Step 1 — turn the question\'s bullets into your headings, in the question\'s order, and copy them down before writing anything; the trial report answered two of three bullets. Step 2 — calculate every ratio the stimulus allows and compare each to its benchmark; this is the mathematical outcome and it is free marks. Step 3 — for each strategy: name the syllabus strategy, define it, apply it to the stimulus figures, state the effect on the business. Step 4 — recommendations restating the strategies with justification, linked back to the question wording. And answer your own questions: if you raise a choice such as niche versus mass market, resolve it.'
    },
    {
      id: 'bus-48', topic: 'Human Resources', difficulty: 3, type: 'mc',
      prompt: 'The specific training and development process that orients a new employee to the business, its culture and their role is called:',
      options: ['Induction', 'Performance appraisal', 'Professional development', 'Benchmarking'],
      answer: 0,
      explanation: 'Be explicit with the syllabus term. "Stronger onboarding" describes the right idea in the wrong vocabulary; induction is the word the marking guidelines use. Induction sits in the acquisition/development stage of the employment cycle and links directly to corporate culture, since it is where values, symbols and rituals are first transmitted — which makes it the natural first paragraph in any HR-to-culture extended response.'
    },
    {
      id: 'bus-49', topic: 'Human Resources', difficulty: 2, type: 'mc',
      prompt: 'The four stages of the employment cycle, in order, are:',
      options: [
        'Acquisition, development, maintenance, separation',
        'Recruitment, selection, training, appraisal',
        'Planning, organising, leading, controlling',
        'Induction, motivation, evaluation, redundancy',
      ],
      answer: 0,
      explanation: 'Acquisition — identifying staffing needs, recruitment (internal versus external) and selection. Development — training, professional development, performance appraisal (developmental versus administrative) and career paths. Maintenance — communication and workplace culture, employee participation, monetary and non-monetary benefits, and legal compliance including WHS and anti-discrimination. Separation — voluntary (resignation, retirement, voluntary redundancy) versus involuntary (dismissal, retrenchment), with unfair dismissal risk. One process per paragraph is the natural structure for a 20-mark HR essay.'
    },
    {
      id: 'bus-50', topic: 'Operations', difficulty: 3, type: 'mc',
      prompt: 'Qantas outsourced about 1,700 ground-handling jobs in 2020 and the High Court ruled the action unlawful in 2023. The case is most useful as evidence that:',
      options: [
        'Outsourcing as a cost strategy carries legal, industrial and reputational risk, linking operations directly to human resources',
        'Outsourcing always reduces costs without any offsetting disadvantage',
        'Quality management systems prevent industrial disputes',
        'Global sourcing is prohibited under Australian law',
      ],
      answer: 0,
      explanation: 'One case study, several dot points — that is efficient revision. Operations: outsourcing as a cost leadership strategy, with advantages in cost and expertise and disadvantages in control, quality and backlash. HR: separation, levels of disputation as an effectiveness indicator, and the culture damage under Joyce that Hudson had to rebuild. Finance: heavy gearing from debt-funded fleet renewal, roughly $7 billion of accumulated COVID losses across FY20–22, then a recovery profit around $2.47 billion in FY23. Verify current figures before the exam.'
    },
    {
      id: 'bus-51', topic: 'Finance', difficulty: 3, type: 'mc',
      prompt: 'Recording an expense as an asset on the balance sheet, so that profit and asset values appear higher, is the limitation of financial reports known as:',
      options: ['Capitalising expenses', 'Normalised earnings', 'Timing issues', 'Valuing assets'],
      answer: 0,
      explanation: 'The limitations to know: capitalising expenses (recording expenses as assets, inflating both profit and asset values); normalised earnings (removing one-off events such as asset sales, which can flatter the trend); valuing assets (historical cost versus market value, with goodwill particularly subjective); timing issues (shifting transactions between periods to window-dress results); debt repayments (the reports do not show capacity to repay, timing or covenants); and notes to the financial statements (critical detail such as contingent liabilities sitting outside the headline figures).'
    },
    {
      id: 'bus-52', topic: 'Marketing', difficulty: 4, type: 'short',
      prompt: 'A question begins with the verb "assess". What must the first sentence of your response do?',
      accept: ['state the judgement explicitly in the first sentence and then justify it with evidence rather than building to a verdict at the end'],
      keywords: [
        ['judgement', 'verdict', 'decision', 'position', 'conclusion'],
        ['first', 'opening', 'start', 'upfront', 'immediately', 'then justif', 'then support'],
      ],
      minKeywords: 2,
      explanation: 'Make the judgement in the first sentence, then justify it — burying the verdict cost a mark in the trial even though the reasoning was sound. The verb glossary: Identify/Outline — name it with brief characteristics. Describe — features and characteristics. Explain — relate cause and effect, the why and how. Assess/Evaluate — a judgement, stated first, then justified. Recommend — reasons in favour of a specific course of action. Justify — argue the case with supporting evidence. Analyse — identify components and show their relationships.'
    },
    {
      id: 'bus-53', topic: 'Finance', difficulty: 2, type: 'mc',
      prompt: 'Return on equity is calculated as:',
      options: [
        'Net profit ÷ total equity',
        'Net profit ÷ sales',
        'Gross profit ÷ sales',
        'Total expenses ÷ sales',
      ],
      answer: 0,
      explanation: 'Return on equity = net profit ÷ total equity, with above 10% generally regarded as attractive. The rest of the bank: current ratio = current assets ÷ current liabilities (~2:1); debt to equity = total liabilities ÷ total equity (under 1:1); gross profit ratio = gross profit ÷ sales (industry-dependent); net profit ratio = net profit ÷ sales (higher means better cost control — note Woolworths and Coles sit around 2.5–4%, showing thin-margin retail); expense ratio = total expenses ÷ sales (lower is more efficient); accounts receivable turnover = sales ÷ accounts receivable (target around 30 days).'
    },
    {
      id: 'bus-54', topic: 'Marketing', difficulty: 2, type: 'mc',
      prompt: 'The steps of the marketing process, in order, begin with:',
      options: [
        'Situational analysis, then market research, then establishing market objectives',
        'Market research, then situational analysis, then developing strategies',
        'Identifying target markets, then market research, then situational analysis',
        'Establishing market objectives, then situational analysis, then implementation',
      ],
      answer: 0,
      explanation: 'Six steps in order: situational analysis (SWOT and product life cycle), market research, establishing market objectives, identifying target markets (mass, segmented or niche), developing marketing strategies, then implementation, monitoring and controlling. Questions frequently test the sequence, and it also gives you a ready-made structure for a marketing extended response.'
    },
    {
      id: 'bus-55', topic: 'Operations', difficulty: 4, type: 'short',
      prompt: 'Name the six operations performance objectives.',
      accept: ['quality speed dependability flexibility customisation and cost'],
      keywords: [
        ['quality'],
        ['speed', 'dependab', 'reliab'],
        ['flexib', 'customis'],
        ['cost'],
      ],
      minKeywords: 4,
      explanation: 'Quality, speed, dependability, flexibility, customisation and cost. They frequently trade off against each other, which is the analytical point worth making: pursuing customisation usually raises cost and reduces speed, while cost leadership constrains flexibility. Naming the objective a strategy serves — and the objective it sacrifices — turns a description into analysis.'
    },
  ]
};
