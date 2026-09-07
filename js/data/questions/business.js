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
  ]
};
