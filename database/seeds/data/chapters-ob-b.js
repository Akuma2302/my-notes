/* Organisational Behaviour topics 5-9. Notes summarised from the lecture slides; tutorial answers written from them. */
const chapters = [
{
  id: 'ob5', subject: 'ob', num: 5, theme: 'individual', title: 'Employee motivation', short: 'Motivation',
  lecture: 'Topic-5-(Employee motivation)',
  summary: 'Motivation and engagement, drives vs needs, Maslow, learned needs, four-drive theory, expectancy theory, behaviour modification, social cognitive theory, goal setting and feedback, and organisational justice (equity theory, procedural justice).',
  sections: [
    { h: 'Motivation and engagement', body: `
      <p><b>Motivation</b>: forces within a person that affect the <b>direction</b> (goal), <b>intensity</b> (effort) and <b>persistence</b> (time) of voluntary behaviour.</p>
      <p><b>Employee engagement</b>: emotional and cognitive motivation: focused, intense, persistent, purposive effort toward goals, with high <b>absorption</b> and high <b>self-efficacy</b>. Engagement adds the emotional, absorbed side to plain motivation.</p>` },
    { h: 'Drives, needs and need theories', pics: [{ flow: [['Drives', 'Hardwired; generate emotions'], ['Needs', 'Goal-directed forces'], ['Decisions and behaviour']], dir: 'h', color: 'p', title: 'Drives → needs → behaviour (shaped by self-concept, norms, experience)' }], body: `
      <p><b>Drives</b> (primary needs): hardwired brain states that generate emotions to correct deficiencies; prime movers of behaviour. <b>Needs</b>: goal-directed forces; we channel emotions toward specific goals shaped by <b>self-concept, social norms and experience</b>.</p>
      <p><b>Maslow</b>: seven categories, five in a hierarchy; the lowest unmet need is strongest. <b>Lacks empirical support</b>: hierarchies differ by person. <b>Contribution</b>: holistic (study needs together), humanistic (social influence), positive (self-actualisation, basis of positive OB).</p>
      <p><b>Learned needs theory</b>: needs are amplified or suppressed by self-concept, norms and experience. <b>nAch</b> (challenging goals, clear feedback, moderate risk), <b>nAff</b> (approval, avoid conflict; effective decision makers have low nAff), <b>nPow</b> (control the environment; <b>personalised</b> for self vs <b>socialised</b> for others).</p>` },
    { h: 'Four-drive theory', pics: [{ cards: [{ t: 'Drive to acquire', s: 'Seek, control, retain', c: 'p' }, { t: 'Drive to bond', s: 'Relationships, caring', c: 't' }, { t: 'Drive to comprehend', s: 'Curiosity, understanding', c: 'c' }, { t: 'Drive to defend', s: 'Protect self physically, socially', c: 'a' }], cols: 2, title: 'Four drives' }], body: `
      <ol><li>The four drives decide which <b>emotions are tagged</b> to incoming information.</li><li>Emotions are usually nonconscious, but become conscious when strong or conflicting.</li><li>Our <b>mental skill set</b> uses social norms, personal values and past experience to turn drive-based emotions into goal-directed choice and effort.</li></ol>
      <p><b>Implication:</b> give employees a <b>balanced</b> chance to fulfil all four drives.</p>` },
    { h: 'Expectancy theory', pics: [{ flow: [['Effort'], ['Performance', 'E-to-P expectancy'], ['Outcomes', 'P-to-O expectancy'], ['Valence', 'Value of each outcome']], dir: 'h', color: 't', title: 'Expectancy theory' }], body: `
      <ul><li><b>Raise E-to-P</b>: hire, train and match people to jobs; role clarity and resources; modelling and coaching.</li>
      <li><b>Raise P-to-O</b>: measure performance accurately; explain how rewards link to performance and past performance.</li>
      <li><b>Raise valences</b>: rewards people value; individualise rewards; minimise countervalent (unwanted) outcomes.</li></ul>` },
    { h: 'Behaviour modification and social cognitive theory', pics: [{ flow: [['Antecedent', 'Warning light'], ['Behaviour', 'Employee acts'], ['Consequence', 'Praise, penalty…']], dir: 'h', color: 'c', title: 'A-B-Cs of behaviour modification' }, { cards: [{ t: 'Positive reinforcement', s: 'Add good → behaviour up', c: 'g' }, { t: 'Negative reinforcement', s: 'Remove bad → behaviour up', c: 'g' }, { t: 'Punishment', s: 'Add bad → behaviour down', c: 'r' }, { t: 'Extinction', s: 'No consequence → behaviour down', c: 'x' }], cols: 2, title: 'Four consequences' }], body: `
      <p><b>Gamification</b> (Deloitte): badges and leader boards reinforce documenting meetings and online learning.</p>
      <p><b>Social cognitive theory</b>: learn by observing consequences others get, <b>behaviour modelling</b>, and <b>self-regulation</b> (set our own goals and standards and self-reinforce).</p>` },
    { h: 'Goal setting and feedback', pics: [{ cards: ['Specific', 'Measurable', 'Achievable', 'Relevant', 'Time-framed', 'Exciting', 'Reviewed'].map(t => ({ t, c: 'p' })), cols: 2, h: 40, title: 'SMARTER goals' }], body: `
      <p><b>Balanced scorecard</b>: organisational goals in financial, customer, internal process and learning/growth areas.</p>
      <p><b>Effective feedback</b>: specific, relevant, timely, credible, sufficiently frequent. <b>Nonsocial</b> sources (dashboards, surveys) are preferred for goal progress (more accurate, less damage to self-esteem); <b>social</b> sources for positive feedback.</p>` },
    { h: 'Organisational justice', pics: [{ compare: { a: { title: 'Your ratio', color: 'p', items: ['Your outcomes (pay)', '÷ your inputs (effort, skill)'] }, b: { title: 'Comparison other', color: 't', items: ['Their outcomes', '÷ their inputs'] } }, title: 'Equity theory' }], body: `
      <p><b>Distributive justice</b>: fairness of outcomes relative to contributions and others. <b>Procedural justice</b>: fairness of the procedures used.</p>
      <p><b>Correcting underreward:</b> reduce our inputs, increase our outcomes (ask for a raise), increase the other's inputs, reduce the other's outcomes, change perceptions, change comparison other, leave the field.</p>
      <p><b>Procedural fairness is higher with</b> voice, an unbiased decision maker, using all information, consistent policies, listening to all sides, and respectful, fully explained treatment of complaints.</p>` }
  ],
  links: [
    { to: 'ob2', topic: 'MARS motivation', text: 'Motivation is the M in the MARS model (Topic 2).' },
    { to: 'ob4', topic: 'Drives and emotions', text: 'Drives work through emotional markers from Topic 4.' },
    { to: 'ob12', topic: 'Rewards as artifacts', text: 'Topic 12: culturally consistent rewards strengthen culture.' },
    { to: 'ch7', topic: 'Measure what matters', text: 'Feedback and P-to-O expectancy need accurate measures, the same idea as software metrics in Software QA Ch 7.' }
  ],
  mindmaps: [{ center: 'Motivation', branches: [
    { label: 'Basics', color: 'p', kids: ['Direction, intensity, persistence', 'Engagement: absorbed + efficacy'] },
    { label: 'Need theories', color: 'p', kids: ['Drives vs needs', 'Maslow: 5 levels', 'nAch, nAff, nPow'] },
    { label: 'Four drives', color: 't', kids: ['Acquire, bond', 'Comprehend, defend', 'Keep in balance'] },
    { label: 'Expectancy', color: 't', kids: ['E-to-P', 'P-to-O', 'Valence'] },
    { label: 'Learning', color: 'c', kids: ['A-B-C', '+/- reinforcement', 'Punishment, extinction', 'Social cognitive'] },
    { label: 'Goals + justice', color: 'a', kids: ['SMARTER goals', 'Feedback sources', 'Equity theory', 'Procedural justice'] }
  ] }],
  cases: [
    { co: 'DHL Express', logo: 'DHL', color: 'a', year: 'lecture', title: 'Engaged couriers', story: 'DHL Express, part of Deutsche Post, builds highly engaged workforces in Africa and globally, saying motivated and engaged employees are crucial to success.', lesson: 'Engagement = emotional + cognitive motivation.' },
    { co: 'Deloitte', logo: 'DT', color: 'p', year: 'lecture', title: 'Gamified learning', story: 'Employees earn badges for documenting meetings and completing online modules; leader boards add friendly competition and status.', lesson: 'Positive reinforcement through gamification.' },
    { co: 'Wells Fargo', logo: 'WF', color: 'r', year: '2016', title: 'Sales targets gone wrong', story: 'Aggressive sales goals and incentives led employees to open millions of accounts customers had not asked for. The bank paid large fines and replaced leadership.', lesson: 'Goals and rewards shape behaviour, including counterproductive behaviour. Goals must be achievable and relevant.' }
  ],
  code: [
    { title: 'Expectancy theory and equity ratios', lang: 'Python', explain: 'Motivational force = E-to-P × sum of (P-to-O × valence). Equity compares outcome/input ratios.', src: String.raw`def motivational_force(e_to_p, outcomes):
    # outcomes: list of (p_to_o probability, valence -1..+1)
    return e_to_p * sum(p * v for p, v in outcomes)

print(motivational_force(0.8, [(0.9, 0.7), (0.5, -0.4)]))   # 0.344

def equity(my_out, my_in, other_out, other_in):
    mine, theirs = my_out / my_in, other_out / other_in
    if abs(mine - theirs) < 0.05: return "equity"
    return "underreward" if mine < theirs else "overreward"

print(equity(4000, 50, 4000, 40))   # underreward: I work more for the same pay` }
  ],
  beyond: [
    { skill: 'agile', why: 'Sprint goals are goal setting in practice: specific, time-framed and reviewed at the sprint review.' },
    { skill: 'observability', why: 'Dashboards are nonsocial feedback: accurate, frequent and not personal.' },
    { skill: 'estimation', why: 'Unrealistic deadlines destroy E-to-P expectancy; good estimation keeps goals achievable.' }
  ],
  cards: [
    ['Three parts of motivation', 'Direction, intensity, persistence.'],
    ['Three learned needs', 'Achievement (nAch), affiliation (nAff), power (nPow).'],
    ['Four drives', 'Acquire, bond, comprehend, defend.'],
    ['Expectancy theory components', 'E-to-P expectancy, P-to-O expectancy, outcome valences.'],
    ['Negative reinforcement', 'Removing an unpleasant consequence so a behaviour increases.'],
    ['SMARTER', 'Specific, Measurable, Achievable, Relevant, Time-framed, Exciting, Reviewed.'],
    ['Distributive vs procedural justice', 'Fairness of outcomes vs fairness of the procedures that decide them.']
  ],
  quiz: [
    { q: 'A manager stops nagging once a report is submitted on time. This is…', o: ['Positive reinforcement', 'Negative reinforcement', 'Punishment', 'Extinction'], a: 1, why: 'Removing an unpleasant consequence increases the behaviour.' },
    { q: 'Training employees mainly raises…', o: ['E-to-P expectancy', 'P-to-O expectancy', 'Valence', 'Equity'], a: 0, why: 'Better ability makes effort more likely to lead to performance.' },
    { q: 'The main criticism of Maslow’s theory is…', o: ['It ignores self-actualisation', 'Needs hierarchies are unique to each person', 'It has too few needs', 'It is only for managers'], a: 1, why: 'It lacks empirical support because hierarchies differ.' }
  ],
  tutorial: { no: 5, source: 'TUTORIAL-(5)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 5, q: 'Define motivation and its three components with a work example.', a: `<p>Forces within a person affecting the <b>direction</b>, <b>intensity</b> and <b>persistence</b> of voluntary behaviour. <i>Example:</i> a programmer chooses to fix the critical bug (direction), works hard on it (intensity) and keeps going for three days until it is solved (persistence).</p>` },
    { n: 'Q1(b)', m: 5, q: 'Define employee engagement, an engaged employee\'s characteristics, and how it differs from motivation.', a: `<p>Engagement is emotional and cognitive motivation: focused, intense, persistent and purposive effort toward goals. Engaged employees show high <b>absorption</b> (lose track of time) and high <b>self-efficacy</b>. It goes beyond motivation by adding emotional involvement and absorption in the work.</p>` },
    { n: 'Q2(a)', m: 4, q: 'Distinguish drives and needs and how self-concept, norms and experience translate drives into needs.', a: `<p><b>Drives</b>: hardwired neural states that generate emotions to correct deficiencies (primary needs). <b>Needs</b>: goal-directed forces we experience. Self-concept, social norms and past experience direct the emotions from drives toward specific goals, so the same drive becomes different needs in different people.</p>` },
    { n: 'Q2(b)', m: 6, q: 'Describe Maslow\'s theory, its categories, contribution and main criticism.', a: `<p>Seven categories (physiological, safety, belongingness/love, esteem, self-actualisation in a hierarchy, plus knowing/understanding and aesthetic). The <b>lowest unmet need is strongest</b>; when satisfied the next becomes primary. <b>Contribution:</b> holistic, humanistic and positive perspective (self-actualisation, foundation of positive OB). <b>Criticism:</b> little empirical support; each person's hierarchy is unique.</p>` },
    { n: 'Q3(a)', m: 5, q: 'Explain learned needs theory and the three learned needs (personalised vs socialised power).', a: `<p>Needs are amplified or suppressed through self-concept, social norms and experience, so they can be <b>learned</b> and strengthened through reinforcement and social conditions.</p><ul><li><b>nAch</b>: accomplish reasonably challenging goals; want clear feedback and moderate risk.</li><li><b>nAff</b>: seek approval, conform, avoid conflict (effective decision makers have low nAff).</li><li><b>nPow</b>: control the environment. <b>Personalised</b>: for own benefit; <b>socialised</b>: to help others and the organisation.</li></ul>` },
    { n: 'Q3(b)', m: 5, q: 'Outline four-drive theory and how norms, values and experience shape effort.', a: `<p>Drives to <b>acquire, bond, comprehend and defend</b>. They decide which emotions are automatically tagged to incoming information. A <b>mental skill set</b> uses social norms, personal values and past experience to resolve competing drive demands and turn the emotions into goal-directed choice and effort. Firms should help all four drives be fulfilled in balance.</p>` },
    { n: 'Q4(a)', m: 6, q: 'Explain expectancy theory\'s three components and two strategies to raise each.', a: `<ul><li><b>E-to-P</b>: probability effort leads to performance. Raise by training/matching people to jobs and giving role clarity and resources.</li><li><b>P-to-O</b>: probability performance leads to outcomes. Raise by measuring performance accurately and explaining how rewards link to performance.</li><li><b>Valence</b>: anticipated satisfaction from outcomes. Raise by giving valued rewards and individualising them.</li></ul>` },
    { n: 'Q4(b)', m: 4, q: 'Describe the A-B-Cs and the four consequences.', a: `<p>Antecedent → Behaviour → Consequence.</p><ul><li><b>Positive reinforcement</b>: introduce a consequence; behaviour increases.</li><li><b>Negative reinforcement</b>: remove a consequence; behaviour increases.</li><li><b>Punishment</b>: introduce a consequence; behaviour decreases.</li><li><b>Extinction</b>: no consequence; behaviour decreases.</li></ul>` },
    { n: 'Q5(a)', m: 4, q: 'Explain social cognitive theory.', a: `<ul><li><b>Learning behaviour outcomes</b>: observe consequences others experience and anticipate them for ourselves.</li><li><b>Behaviour modelling</b>: observe and copy others' behaviour.</li><li><b>Self-regulation</b>: intentional action; set goals and standards, anticipate consequences, reinforce ourselves.</li></ul>` },
    { n: 'Q5(b)', m: 3, q: 'Seven features of effective goal setting.', a: `<p>SMARTER: Specific, Measurable, Achievable, Relevant, Time-framed, Exciting, Reviewed.</p>` },
    { n: 'Q5(c)', m: 3, q: 'Characteristics of effective feedback; social vs nonsocial sources.', a: `<p>Specific, relevant, timely, credible, sufficiently frequent. <b>Social</b> sources (boss, customers) are better for <b>positive</b> feedback (boost self-esteem). <b>Nonsocial</b> sources (dashboards, survey results) are better for <b>goal progress</b>: seen as more accurate, and negative feedback hurts less.</p>` },
    { n: 'Q6(a)', m: 2, q: 'Define distributive and procedural justice.', a: `<p><b>Distributive</b>: perceived fairness in outcomes relative to our contributions and others'. <b>Procedural</b>: perceived fairness of the procedures used to distribute resources.</p>` },
    { n: 'Q6(b)', m: 3, q: 'Explain equity theory\'s three elements.', a: `<ul><li><b>Outcome/input ratio</b>: what we receive (pay) over what we contribute (skill, effort).</li><li><b>Comparison other</b>: the person or group we compare with.</li><li><b>Equity evaluation</b>: compare ratios; equal = equity, lower = underreward, higher = overreward.</li></ul>` },
    { n: 'Q6(c)', m: 5, q: 'Six categories of actions to correct inequity, with examples.', a: `<ol><li><b>Reduce our inputs</b>: less citizenship behaviour.</li><li><b>Increase our outcomes</b>: ask for a pay rise.</li><li><b>Increase other's inputs / reduce other's outcomes</b>: ask a coworker to work harder; ask the boss to stop favouring them.</li><li><b>Change our perceptions</b>: decide the coworker's perks are not that valuable.</li><li><b>Change comparison other</b>: compare with someone in a similar situation.</li><li><b>Leave the field</b>: quit.</li></ol>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(5): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob6', subject: 'ob', num: 6, theme: 'individual', title: 'Perception, decision making and creativity', short: 'Decision making',
  lecture: 'Topic-6-(Decision-making and creativity)-(EXT)',
  summary: 'Factors that influence perception, attribution theory and shortcuts in judging others, the rational model vs bounded rationality and intuition, eight decision biases, individual and organisational influences, three ethical criteria and the three-stage model of creativity.',
  sections: [
    { h: 'Perception and attribution', body: `
      <p>Perception: organising and interpreting sensory impressions to give meaning. It matters because <b>behaviour is based on perceived reality, not reality itself</b>. Influenced by the perceiver, the target and the situation.</p>
      <p><b>Attribution theory</b>: we judge whether behaviour is internally or externally caused using <b>distinctiveness, consensus and consistency</b>. Errors: <b>fundamental attribution error</b> and <b>self-serving bias</b>.</p>` },
    { h: 'Shortcuts in judging others', pics: [{ cards: ['Selective perception', 'Halo effect', 'Horns effect', 'Contrast effects', 'Stereotyping', 'Self-fulfilling prophecy', 'Social media screening'].map(t => ({ t, c: 'c' })), cols: 2, h: 40, title: 'Seven shortcuts' }], body: `
      <ul><li><b>Selective perception</b>: we notice what stands out.</li><li><b>Halo</b>: positive overall impression from one trait. <b>Horns</b>: negative overall impression from one trait.</li><li><b>Contrast effects</b>: judged relative to people just seen.</li><li><b>Stereotyping</b>: judged by group membership.</li></ul>
      <p><b>In organisations:</b> interviewers form impressions in the first 4–5 minutes; <b>self-fulfilling prophecy (Pygmalion)</b> shapes performance; subjective <b>performance evaluations</b> suffer these errors; about 4 in 10 firms screen applicants on <b>social media</b>, which adds bias. Remedies: AI-assisted assessments and decision-support systems.</p>` },
    { h: 'Rational model vs bounded rationality', pics: [{ flow: ['Define the problem', 'Identify decision criteria', 'Allocate weights to criteria', 'Develop alternatives', 'Evaluate alternatives', 'Select the best alternative'], color: 'p', title: 'Rational decision-making model' }], body: `
      <p>A <b>problem</b> is a gap between the current state and a desired state.</p>
      <p>Rational model assumes complete information, all options identified without bias, and choosing the highest utility. Real decisions rarely work like this.</p>
      <p><b>Bounded rationality</b>: we simplify complex problems and <b>satisfice</b> (accept satisfactory, sufficient solutions). <b>Intractable problem</b>: may change or become irrelevant before we finish analysing it.</p>
      <p><b>Intuition</b>: fast, holistic, emotionally charged, outside conscious thought. Not rational, but not inherently wrong.</p>` },
    { h: 'Biases and errors', pics: [{ cards: ['Overconfidence', 'Anchoring', 'Confirmation', 'Availability', 'Escalation of commitment', 'Randomness error', 'Risk aversion', 'Hindsight'].map(t => ({ t, c: 'r' })), cols: 2, h: 40, title: 'Eight decision biases' }], body: `
      <ul><li><b>Overconfidence</b>: the weakest most overestimate their ability.</li><li><b>Anchoring</b>: fixate on initial information.</li><li><b>Confirmation</b>: seek information that supports past choices.</li><li><b>Availability</b>: judge by what is easy to recall.</li><li><b>Escalation of commitment</b>: stick with a failing decision, especially if responsible for it.</li><li><b>Randomness error</b>: believe we can predict random events.</li><li><b>Risk aversion</b>: prefer a sure thing.</li><li><b>Hindsight</b>: falsely believe we predicted the outcome.</li></ul>
      <p><b>Reduce biases:</b> focus on goals, seek disconfirming information, don't create meaning from random events, increase your options.</p>` },
    { h: 'Individual differences and constraints', body: `
      <p><b>Individual differences:</b> personality (intuition, self-esteem, narcissism), gender, mental ability, culture.</p>
      <p><b>Organisational constraints:</b> performance evaluation systems, reward systems, formal regulations, time constraints, historical precedents, decisions in crisis.</p>` },
    { h: 'Ethics and creativity', pics: [{ flow: [['Causes', 'Creative potential + environment'], ['Creative behaviour', 'Formulate, gather, generate, evaluate'], ['Creative outcomes', 'Novel and useful ideas']], dir: 'h', color: 't', title: 'Three-stage model of creativity' }], body: `
      <p><b>Three ethical criteria:</b> <b>utilitarianism</b> (outcomes), <b>rights</b> (fundamental liberties; protects whistle-blowers), <b>justice</b> (rules applied fairly and impartially).</p>
      <p><b>Behavioural ethics</b>: how people actually act in dilemmas; good people can do bad things. <b>Lying</b> is common and ruins sound decision making.</p>
      <p><b>Creativity</b>: producing novel and useful ideas.</p>` }
  ],
  links: [
    { to: 'ob3', topic: 'Perception and attribution', text: 'Topic 3 covers the same attribution rules and perceptual effects in more depth.' },
    { to: 'ob7', topic: 'Team decisions', text: 'Topic 7 adds team decision constraints and brainstorming methods.' },
    { to: 'ob2', topic: 'Ethical principles', text: 'Topic 2 lists the same three ethical principles.' },
    { to: 'ch10', topic: 'Decisions under risk', text: 'Software QA Ch 10 makes decisions based on risk, where anchoring and overconfidence are real dangers.' }
  ],
  mindmaps: [{ center: 'Decision making', branches: [
    { label: 'Perception', color: 'p', kids: ['Perceiver, target, situation', 'Attribution 3 factors', 'FAE, self-serving'] },
    { label: 'Shortcuts', color: 'c', kids: ['Selective, halo, horns', 'Contrast, stereotype', 'Interviews, appraisals'] },
    { label: 'Models', color: 'p', kids: ['Rational: 6 steps', 'Bounded rationality', 'Satisfice', 'Intuition'] },
    { label: 'Biases', color: 'r', kids: ['Overconfidence, anchoring', 'Confirmation, availability', 'Escalation, randomness', 'Risk aversion, hindsight'] },
    { label: 'Influences', color: 't', kids: ['Personality, gender', 'Ability, culture', 'Rules, time, precedent'] },
    { label: 'Ethics + creativity', color: 'g', kids: ['Utilitarian, rights, justice', 'Behavioural ethics', '3-stage creativity'] }
  ] }],
  cases: [
    { co: 'Concorde', logo: 'CC', color: 'r', year: '1960s–2003', title: 'Escalation of commitment', story: 'Britain and France kept funding the supersonic airliner long after it was clear it would never pay back, partly because so much had already been spent. Economists call this the “Concorde fallacy”.', lesson: 'Escalation of commitment and sunk costs.' },
    { co: 'NASA Challenger', logo: 'NA', color: 'c', year: '1986', title: 'Launch decision', story: 'Engineers warned that O-rings might fail in cold weather, but the launch went ahead under schedule pressure. The shuttle broke apart shortly after lift-off.', lesson: 'Time constraints, confirmation bias and overconfidence in organisational decisions.' }
  ],
  code: [
    { title: 'Rational model as a weighted decision matrix', lang: 'Python', explain: 'Steps 2–6 of the rational model: criteria, weights, alternatives, evaluate, pick the best.', src: String.raw`criteria = {"cost": 0.4, "speed": 0.35, "risk": 0.25}       # weights add to 1
options = {
    "Vendor A": {"cost": 7, "speed": 9, "risk": 6},
    "Vendor B": {"cost": 9, "speed": 6, "risk": 8},
    "Build in-house": {"cost": 4, "speed": 5, "risk": 5},
}
score = {name: sum(criteria[c] * s[c] for c in criteria) for name, s in options.items()}
for name, s in sorted(score.items(), key=lambda x: -x[1]):
    print(f"{name:15} {s:.2f}")
# Real people satisfice: they stop at the first option that is "good enough".` }
  ],
  beyond: [
    { skill: 'estimation', why: 'Anchoring and overconfidence are the classic estimation biases; planning poker reduces anchoring.' },
    { skill: 'ai', why: 'The lecture suggests AI-assisted assessments to reduce bias, but AI can also carry bias from its data.' },
    { skill: 'ethics', why: 'Utilitarianism, rights and justice are useful lenses for decisions like collecting user data.' }
  ],
  cards: [
    ['Three attribution factors', 'Distinctiveness, consensus, consistency.'],
    ['Halo vs horns effect', 'Halo: positive impression from one trait. Horns: negative impression from one trait.'],
    ['Six steps of the rational model', 'Define problem, identify criteria, weight criteria, develop alternatives, evaluate, select best.'],
    ['Bounded rationality', 'We simplify complex problems and satisfice (accept good-enough solutions).'],
    ['Escalation of commitment', 'Sticking with a decision despite clear evidence it is wrong.'],
    ['Three ethical criteria', 'Utilitarianism, rights, justice.'],
    ['Creativity', 'The ability to produce novel and useful ideas.']
  ],
  quiz: [
    { q: 'An interviewer rates a candidate higher because the previous candidate was weak. This is…', o: ['Halo effect', 'Contrast effect', 'Anchoring', 'Hindsight bias'], a: 1, why: 'Judgement is influenced by people recently seen.' },
    { q: 'Accepting the first solution that is good enough is called…', o: ['Optimising', 'Satisficing', 'Anchoring', 'Escalating'], a: 1, why: 'Part of bounded rationality.' },
    { q: '“I knew the team would lose” after the match ends is…', o: ['Availability bias', 'Hindsight bias', 'Randomness error', 'Risk aversion'], a: 1, why: 'Believing we predicted an outcome after it is known.' }
  ],
  tutorial: { no: 6, source: 'TUTORIAL-(6)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 3, q: 'Define perception and why it matters to OB.', a: `<p>A process by which individuals organise and interpret sensory impressions to give meaning to their environment. It matters because people act on their <b>perception of reality</b>, not reality itself.</p>` },
    { n: 'Q1(b)', m: 5, q: 'Explain attribution theory and its three factors.', a: `<p>When we observe behaviour we try to decide if it was <b>internally</b> (under personal control) or <b>externally</b> caused.</p><ul><li><b>Distinctiveness</b>: does the person behave differently in different situations?</li><li><b>Consensus</b>: do others in the same situation behave the same way?</li><li><b>Consistency</b>: does the person behave this way over time?</li></ul>` },
    { n: 'Q1(c)', m: 2, q: 'Distinguish the fundamental attribution error and self-serving bias with examples.', a: `<ul><li><b>FAE</b>: underestimate external factors, overestimate internal ones for others. <i>"He's late because he's lazy"</i> (ignoring traffic).</li><li><b>Self-serving bias</b>: own success internal, failure external. <i>"I passed because I'm smart; I failed because the exam was unfair."</i></li></ul>` },
    { n: 'Q2', m: 10, q: 'Identify and explain seven shortcuts used when judging others, with organisational applications.', a: `<ol><li><b>Selective perception</b>: what stands out gets noticed.</li><li><b>Halo effect</b>: positive general impression from one characteristic.</li><li><b>Horns effect</b>: negative general impression from one characteristic.</li><li><b>Contrast effects</b>: judged against people recently met.</li><li><b>Stereotyping</b>: judged by perceived group.</li><li><b>Interviews</b>: early impressions form in the first 4–5 minutes and rarely change.</li><li><b>Performance expectations / self-fulfilling prophecy</b>: expectations become reality; <b>performance evaluations</b> are subjective; <b>social media screening</b> (about 4 in 10 firms) adds bias; AI and decision support can help.</li></ol>` },
    { n: 'Q3(a)', m: 3, q: 'Explain the link between perception and decision making; what is a "problem"?', a: `<p>Decisions are reactions to problems, and what counts as a problem depends on perception. A <b>problem</b> is a discrepancy between the current state and a desired state; one person's problem can be another's satisfactory state.</p>` },
    { n: 'Q3(b)', m: 4, q: 'Six steps of the rational model, its assumptions, and why real decisions don\'t follow it.', a: `<p>Steps: define problem, identify criteria, allocate weights, develop alternatives, evaluate, select the best.</p><p>Assumes complete information, all options identified without bias, and choosing highest utility. Real people lack time and information and have biases, so most decisions don't follow it.</p>` },
    { n: 'Q3(c)', m: 3, q: 'Explain bounded rationality and satisficing.', a: `<p>People reduce complex problems to simplified models they can understand (<b>bounded rationality</b>) and choose solutions that are satisfactory and sufficient (<b>satisficing</b>) rather than optimal. This matches how people really decide.</p>` },
    { n: 'Q4(a)', m: 8, q: 'List and define eight decision biases.', a: `<ol><li><b>Overconfidence</b>: weakest people overestimate their ability most.</li><li><b>Anchoring</b>: fixate on initial information.</li><li><b>Confirmation</b>: seek information that reaffirms past choices.</li><li><b>Availability</b>: base judgements on readily available information.</li><li><b>Escalation of commitment</b>: stay with a decision despite evidence it is wrong.</li><li><b>Randomness error</b>: believe we can predict random events.</li><li><b>Risk aversion</b>: prefer a sure thing over a risky outcome.</li><li><b>Hindsight</b>: falsely believe we predicted the outcome.</li></ol>` },
    { n: 'Q4(b)', m: 2, q: 'Explain an intractable problem.', a: `<p>A problem that may change entirely or become irrelevant before we finish organising thoughts, gathering and analysing information. It shows why fully rational decision making is often impossible.</p>` },
    { n: 'Q5(a)', m: 3, q: 'What is intuitive decision making and why is it not inherently bad?', a: `<p>Decision making outside conscious thought, using holistic associations; fast and emotionally charged. Unlike rational analysis it is not step-by-step, but it draws on experience, so it can be accurate and does not always contradict analysis.</p>` },
    { n: 'Q5(b)', m: 3, q: 'Individual differences affecting decisions.', a: `<p>Personality (intuitive style, self-esteem, narcissism), gender, mental ability and cultural differences.</p>` },
    { n: 'Q5(c)', m: 4, q: 'Organisational constraints on decision making.', a: `<p>Performance evaluation systems, reward systems, formal regulations, time constraints, historical precedents, and decision making in crisis.</p>` },
    { n: 'Q6(a)', m: 3, q: 'Contrast utilitarianism, rights and justice.', a: `<ul><li><b>Utilitarianism</b>: judge decisions by outcomes; greatest good for the greatest number.</li><li><b>Rights</b>: respect fundamental liberties and privileges (e.g. protect whistle-blowers).</li><li><b>Justice</b>: impose and enforce rules fairly and impartially for an equitable distribution of benefits and costs.</li></ul>` },
    { n: 'Q6(b)', m: 3, q: 'Explain behavioural ethics, why good people do bad things, and the problem with lying.', a: `<p><b>Behavioural ethics</b> studies how people actually behave in ethical dilemmas. People do not always follow their organisation's or their own standards because of pressure, rationalisation and culture. <b>Lying</b> is common and undermines decisions: managers cannot decide well when facts are misrepresented.</p>` },
    { n: 'Q6(c)', m: 2, q: 'Define creativity and the three-stage model.', a: `<p>Producing novel and useful ideas. Stages: <b>causes</b> (creative potential and environment) → <b>creative behaviour</b> (formulate problem, gather information, generate ideas, evaluate) → <b>creative outcomes</b>.</p>` },
    { n: 'Q6(d)', m: 2, q: 'Two key takeaways for managers.', a: `<ul><li>Recognise perceptual errors and biases in recruitment and appraisal, and use technology to reduce them.</li><li>Be flexible: know when rational analysis is needed and when quick intuition is fine; foster a creative environment.</li></ul>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(6): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob7', subject: 'ob', num: 7, theme: 'team', title: 'Team dynamics', short: 'Teams',
  lecture: 'Topic-7-(Team dynamics)',
  summary: 'What teams are, types and informal groups, advantages and challenges, the team effectiveness model (environment, design, processes), team development stages, norms, cohesion, trust, decision constraints and creative structures like brainstorming and nominal group technique.',
  sections: [
    { h: 'What is a team?', body: `
      <p>Groups of <b>two or more people</b> who <b>exist to fulfil a purpose</b>, are <b>interdependent</b>, are <b>mutually accountable</b> for common goals and <b>perceive themselves as a team</b>.</p>
      <p>Types differ by <b>permanence</b>, <b>skill differentiation</b> and <b>authority differentiation</b>. <b>Informal groups</b> exist mainly for members: drive to bond, social identity, goal accomplishment, emotional support.</p>
      <p><b>Advantages:</b> better decisions and products, information sharing, motivation and engagement. <b>Challenges:</b> <b>process losses</b> (resources spent on maintaining the team) and <b>social loafing</b> (less effort in teams).</p>` },
    { h: 'Team effectiveness model', pics: [{ flow: [['Organisation and team environment', 'Rewards, communication, structure, leaders, space'], ['Team design', 'Task, size, composition'], ['Team processes', 'Development, norms, cohesion, trust'], ['Team effectiveness', 'Tasks done, needs met, team survives']], color: 'p', title: 'Team effectiveness model' }], body: `
      <p><b>Best tasks for teams:</b> complex tasks divisible into roles, well-structured tasks, and high <b>task interdependence</b> (pooled → sequential → reciprocal).</p>
      <p><b>Size:</b> smaller is better (less process loss, faster development, more engagement and responsibility) but big enough for the task.</p>
      <p><b>Composition:</b> willing and able members with the 5 Cs: <b>cooperating, coordinating, communicating, comforting, conflict resolving</b>. <b>Diversity</b> gives more perspectives and knowledge, but takes longer to perform and risks <b>faultlines</b> (subgroups split along differences).</p>` },
    { h: 'Team development', pics: [{ flow: [['Forming', 'Get to know'], ['Storming', 'Conflict, roles'], ['Norming', 'Roles, consensus'], ['Performing', 'Efficient, trusting'], ['Adjourning', 'Disband']], dir: 'h', color: 't', title: 'Five stages (Tuckman)' }], body: `
      <p>Developing a <b>team identity</b> ("us") and shared <b>mental models and coordinating routines</b> make teams effective.</p>
      <p><b>Team building</b>: clarify performance goals, improve problem solving, improve role definitions, improve relations.</p>` },
    { h: 'Norms, cohesion and trust', pics: [{ cards: [{ t: 'Calculus-based trust', s: 'Lowest: deterrence', c: 'x' }, { t: 'Knowledge-based trust', s: 'Predictability', c: 't' }, { t: 'Identification-based trust', s: 'Highest: shared values', c: 'p' }], cols: 3, title: 'Three levels of trust' }], body: `
      <p><b>Norms</b>: informal rules and shared expectations, formed by early experiences, critical events and members' values. Fix dysfunctional norms: state desired norms early, select members with matching values, discuss bad norms, team rewards, or disband.</p>
      <p><b>Cohesion</b> grows with similarity, small size, frequent interaction, somewhat difficult entry, success, external challenges. Cohesive teams usually perform better (stay, share info, satisfied, support, resolve conflict), especially when <b>task interdependence is high</b> and <b>norms match company goals</b>. If norms oppose goals, cohesion lowers performance.</p>` },
    { h: 'Team decisions and creativity', pics: [{ compare: { a: { title: 'Constraints', color: 'r', items: ['Time, production blocking', 'Evaluation apprehension', 'Pressure to conform', 'Inflated team efficacy'] }, b: { title: 'Structures', color: 'g', items: ['Brainstorming', 'Brainwriting', 'Electronic brainstorming', 'Nominal group technique'] } }, title: 'Team decision making' }], body: `
      <p><b>Guidelines:</b> norms that encourage critical thinking, enough diversity, checks on dominant members, optimal size, effective structures.</p>
      <p><b>Brainstorming rules:</b> speak freely, don't criticise, give many ideas, build on others. Limits: production blocking, conformity. Supported in field research and by creative firms.</p>
      <p><b>Nominal group technique:</b> describe problem → write ideas privately → present without debate → private vote/rank.</p>` }
  ],
  links: [
    { to: 'ob8', topic: 'Team communication', text: 'Topic 8 covers communication channels teams rely on.' },
    { to: 'ob10', topic: 'Storming and conflict', text: 'Storming is conflict; Topic 10 shows how to keep it task-focused.' },
    { to: 'ob6', topic: 'Decision biases', text: 'Team decisions suffer the same biases plus conformity (Topic 6).' },
    { to: 'ch4', topic: 'Review teams', text: 'Software QA Ch 4 review teams face evaluation apprehension and conformity too.' }
  ],
  mindmaps: [{ center: 'Teams', branches: [
    { label: 'Definition', color: 'p', kids: ['2+ people, purpose', 'Interdependent, accountable', 'See themselves as team'] },
    { label: 'Pros and cons', color: 'p', kids: ['Better decisions, motivation', 'Process losses', 'Social loafing'] },
    { label: 'Design', color: 't', kids: ['Task interdependence', 'Small size', '5 Cs, diversity'] },
    { label: 'Development', color: 't', kids: ['Form, storm, norm', 'Perform, adjourn', 'Team building'] },
    { label: 'Processes', color: 'c', kids: ['Norms', 'Cohesion', '3 levels of trust'] },
    { label: 'Decisions', color: 'a', kids: ['4 constraints', 'Brainstorming rules', 'Brainwriting, NGT'] }
  ] }],
  cases: [
    { co: 'Menlo Innovations', logo: 'MI', color: 't', year: 'lecture', title: 'Hiring for teamwork', story: 'The software company selects applicants by pairing them to complete tasks together, to see who has the best team skills.', lesson: 'Team composition: select members who are willing and able to work in teams.' },
    { co: 'PSA Peugeot Citroën', logo: 'PSA', color: 'p', year: 'lecture', title: 'Obeya room', story: 'A team room covered in charts and notes on key issues encourages face-to-face interaction to resolve problems quickly.', lesson: 'Physical space is part of the team environment.' },
    { co: 'Google', logo: 'G', color: 'c', year: '2015', title: 'Project Aristotle', story: 'Google’s research found psychological safety was the most important factor in effective teams, more than who was in them.', lesson: 'Team processes (norms, trust) matter more than composition alone.' }
  ],
  code: [
    { title: 'Why smaller teams coordinate faster', lang: 'Python', explain: 'Communication links grow as n(n-1)/2, which is one reason for process losses in big teams.', src: String.raw`def links(n):
    return n * (n - 1) // 2

for size in (3, 5, 8, 12, 20):
    print(f"{size:2} people -> {links(size):3} communication links")
# 5 people = 10 links, 12 people = 66 links` }
  ],
  beyond: [
    { skill: 'agile', why: 'Scrum teams are small, cross-functional and self-organising, applying the team design ideas from this topic.' },
    { skill: 'git', why: 'Pull requests and pair programming are coordinating routines that build shared mental models of the code.' },
    { skill: 'communication', why: 'The 5 Cs of team competencies are mostly communication skills.' }
  ],
  cards: [
    ['Five elements of a team', '2+ people, purpose, interdependent, mutually accountable, perceive themselves as a team.'],
    ['Two team challenges', 'Process losses and social loafing.'],
    ['Five stages of team development', 'Forming, storming, norming, performing, adjourning.'],
    ['5 Cs of team competencies', 'Cooperating, coordinating, communicating, comforting, conflict resolving.'],
    ['When does cohesion boost performance?', 'High task interdependence and team norms that match organisational goals.'],
    ['Four brainstorming rules', 'Speak freely, don’t criticise, many ideas, build on others.'],
    ['Three levels of trust', 'Calculus-based, knowledge-based, identification-based.']
  ],
  quiz: [
    { q: 'Members put in less effort because individual work is hard to see. This is…', o: ['Process loss', 'Social loafing', 'Faultline', 'Groupthink'], a: 1, why: 'Social loafing.' },
    { q: 'Which technique has people write ideas privately, present them without debate, then vote privately?', o: ['Brainstorming', 'Electronic brainstorming', 'Nominal group technique', 'Storming'], a: 2, why: 'NGT.' },
    { q: 'High cohesion lowers performance when…', o: ['Team is small', 'Norms oppose company goals', 'Tasks are interdependent', 'Members are similar'], a: 1, why: 'Cohesion motivates conformity to the team’s norms.' }
  ],
  tutorial: { no: 7, source: 'TUTORIAL-(7)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 5, q: 'What is a team? Five key elements.', a: `<p>(1) Two or more people, (2) exist to fulfil a purpose, (3) interdependent: interact and collaborate, (4) mutually accountable for common goals, (5) perceive themselves as a team.</p>` },
    { n: 'Q1(b)', m: 3, q: 'Three dimensions used to classify teams.', a: `<ul><li><b>Permanence</b>: how long the team usually exists.</li><li><b>Skill differentiation</b>: diversity of skills and knowledge.</li><li><b>Authority differentiation</b>: how much decision authority is spread or centralised.</li></ul>` },
    { n: 'Q1(c)', m: 2, q: 'Informal groups and four reasons they exist.', a: `<p>Groups that exist mainly for their members' benefit. Reasons: innate drive to bond, social identity, goal accomplishment, emotional support.</p>` },
    { n: 'Q2(a)', m: 3, q: 'Three advantages of teams.', a: `<p>Better decisions and products/services; better information sharing; higher employee motivation and engagement.</p>` },
    { n: 'Q2(b)', m: 2, q: 'Two challenges of teams.', a: `<p><b>Process losses</b>: resources spent on developing and maintaining the team. <b>Social loafing</b>: people exert less effort in teams than alone.</p>` },
    { n: 'Q2(c)', m: 5, q: 'Team effectiveness model: three key inputs.', a: `<ul><li><b>Organisational and team environment</b>: rewards, communication systems, structure, leadership, physical space.</li><li><b>Team design</b>: task characteristics, team size, composition.</li><li><b>Team processes</b>: development, norms, cohesion, trust.</li></ul><p>These lead to effectiveness: tasks accomplished, member needs satisfied, team survives.</p>` },
    { n: 'Q3(a)', m: 4, q: 'What makes an effective team member? Willingness, ability and the 5 Cs.', a: `<p>Members must be <b>willing</b> (motivated to work in teams) and <b>able</b> (competent). 5 Cs: cooperating, coordinating, communicating, comforting, conflict resolving.</p>` },
    { n: 'Q3(b)', m: 3, q: 'Advantages and disadvantages of diversity; faultlines.', a: `<p><b>Advantages:</b> different perspectives, broader knowledge, better representation of constituents. <b>Disadvantages:</b> longer to become high-performing; susceptible to <b>faultlines</b>: hypothetical dividing lines that split a team into subgroups, reducing motivation to coordinate.</p>` },
    { n: 'Q3(c)', m: 3, q: 'Five stages of team development with one characteristic each.', a: `<p>Forming: learn about each other. Storming: conflict over roles. Norming: roles and consensus established. Performing: efficient, cooperative, high trust. Adjourning: disbanding, shift to relationships.</p>` },
    { n: 'Q4(a)', m: 3, q: 'Team identity and mental models/routines: why important?', a: `<p><b>Team identity</b>: seeing the team as "us"; it becomes part of social identity. <b>Mental models and routines</b>: shared or complementary understanding and habitual coordination. Together they speed coordination and commitment, raising effectiveness.</p>` },
    { n: 'Q4(b)', m: 3, q: 'Team building and its four types.', a: `<p>Formal activities to improve development and functioning: clarify performance goals, improve problem-solving skills, improve role definitions, improve relations.</p>` },
    { n: 'Q4(c)', m: 4, q: 'Define norms, how they develop, and how to fix dysfunctional ones.', a: `<p>Informal rules and shared expectations regulating members' behaviour. Develop from initial experiences, critical events and members' values. Fix by stating desired norms early, selecting members with preferred values, discussing counterproductive norms, team-based rewards, or disbanding the team.</p>` },
    { n: 'Q5(a)', m: 4, q: 'Define cohesion and what strengthens it.', a: `<p>The degree of attraction to the team and motivation to stay. Stronger with member similarity, smaller size, frequent interaction, somewhat difficult entry, team success, external competition.</p>` },
    { n: 'Q5(b)', m: 3, q: 'Cohesion and performance; two conditions.', a: `<p>Cohesive teams usually perform better (stay, share information, satisfied, support, resolve conflict fast). Strongest when (1) <b>task interdependence is high</b> and (2) <b>team norms match organisational objectives</b>.</p>` },
    { n: 'Q5(c)', m: 1, q: 'Three levels of trust.', a: `<p>Calculus-based, knowledge-based, identification-based.</p>` },
    { n: 'Q5(d)', m: 2, q: 'Four constraints on team decision making.', a: `<p>Time constraints (production blocking), evaluation apprehension, peer pressure to conform, inflated team efficacy (overconfidence).</p>` },
    { n: 'Q6(a)', m: 2, q: 'Guidelines for better team decisions.', a: `<p>Norms that encourage critical thinking, sufficient diversity, checks against dominant participants, optimal size, effective team structures.</p>` },
    { n: 'Q6(b)', m: 4, q: 'Brainstorming: definition, rules, limits, why still used.', a: `<p>Participants generate as many ideas as possible. Rules: speak freely, don't criticise, many ideas, build on others. Limits: production blocking and conformity. Lab research dismissed it, but field research and leading creative firms support it because it builds energy and shares knowledge.</p>` },
    { n: 'Q6(c)', m: 4, q: 'Brainwriting, electronic brainstorming, NGT: how they work and one strength.', a: `<ul><li><b>Brainwriting</b>: write and pass ideas without talking. Less production blocking.</li><li><b>Electronic brainstorming</b>: share ideas anonymously by computer, vote, then discuss. Less blocking, apprehension and conformity.</li><li><b>NGT</b>: describe problem, write privately, present without debate, rank privately. Reduces evaluation apprehension.</li></ul>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(7): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob8', subject: 'ob', num: 8, theme: 'team', title: 'Communicating in teams and organisations', short: 'Communication',
  lecture: 'Topic-8-(Communicating in teams and organisations)',
  summary: 'The communication process, email and social media, nonverbal communication and emotional contagion, choosing channels (social acceptance, media richness), persuasion, barriers, information overload, cross-cultural and gender differences, active listening, communicating in hierarchies and the grapevine.',
  sections: [
    { h: 'Communication process', pics: [{ flow: [['Sender', 'Encode'], ['Message', 'Through a channel + noise'], ['Receiver', 'Decode'], ['Feedback', 'Back to sender']], dir: 'h', color: 'p', title: 'Communication process model' }], body: `
      <p>Transmitting and understanding information, meaning the <b>intended meaning</b>, not just symbols. Important for coordination, organisational learning, decisions, changing behaviour and well-being.</p>
      <p><b>Better encoding/decoding</b> when both share codebooks, the sender is experienced with the message, both can use the channel, and they share mental models of the context.</p>` },
    { h: 'Email, social media, nonverbal', body: `
      <p><b>Email</b>: preferred for coordination; increases volume; changes flow; slightly reduces status differences. <b>Problems:</b> conveys emotions poorly, reduces politeness (flaming), poor for ambiguous or complex situations, adds information overload.</p>
      <p><b>Social media</b> (Infosys InfyBubble, Atos replacing email): user-generated, interactive, conversational, builds identity and communities.</p>
      <p><b>Nonverbal</b>: shapes meaning; less rule-bound; mostly automatic. <b>Emotional contagion</b>: mimicking others' expressions to share emotions; gives feedback, builds understanding, communicates collective sentiment.</p>` },
    { h: 'Choosing a channel', pics: [{ bars: [{ label: 'Face-to-face', v: 10 }, { label: 'Video call', v: 8 }, { label: 'Phone', v: 6 }, { label: 'Chat / email', v: 4 }, { label: 'Report / memo', v: 2 }], color: 'p', title: 'Media richness (rich to lean)', labelW: 130 }], body: `
      <p><b>Social acceptance</b>: firm/team norms, individual preferences, symbolic meaning of the channel.</p>
      <p><b>Media richness</b>: rich channels convey multiple cues, allow timely feedback, customised messages and complex symbols. Use <b>rich media for nonroutine, ambiguous</b> situations and lean media for routine, clear ones. Exceptions online: multi-communicating, varied proficiency, less social distraction in lean channels.</p>
      <p><b>Spoken communication persuades better</b>: nonverbal cues, immediate feedback, high social presence.</p>` },
    { h: 'Barriers and differences', pics: [{ cards: ['Perceptions', 'Filtering', 'Language: jargon', 'Language: ambiguity', 'Information overload'].map(t => ({ t, c: 'r' })), cols: 2, h: 40, title: 'Communication barriers' }], body: `
      <p><b>Information overload</b>: load exceeds capacity → missed information, poor decisions, stress. Solutions: <b>increase capacity</b> (read faster, remove distractions) or <b>reduce load</b> (buffering, omitting, summarising).</p>
      <p><b>Cross-cultural:</b> language, voice intonation, silence and overlaps; some gestures differ. <b>Gender:</b> men lean to <b>report talk</b> (status, advice quickly); women to <b>rapport talk</b> (relationships, indirect requests, sensitive to nonverbal cues).</p>` },
    { h: 'Getting the message across and listening', pics: [{ cycle: [['Sensing', 'Postpone evaluation, no interruptions'], ['Evaluating', 'Empathise, organise information'], ['Responding', 'Show interest, clarify']], center: 'Active listening', color: 't', title: 'Active listening' }], body: `
      <p><b>Get your message across:</b> empathise, repeat the message, use timing well, focus on the problem not the person.</p>
      <p><b>Hierarchies:</b> workspace design (open offices, team clusters), internet communication (wikis, e-zines), direct contact with management (MBWA, town halls).</p>
      <p><b>Grapevine</b>: fast, all directions, cluster chains, some truth; now online too. Benefits: fills gaps, strengthens culture, relieves anxiety. Limits: distortions, and staff feel ignored if the grapevine beats official news.</p>` }
  ],
  links: [
    { to: 'ob7', topic: 'Team communication', text: 'Communicating is one of the 5 Cs of team members (Topic 7).' },
    { to: 'ob4', topic: 'Emotional contagion', text: 'Builds on emotions from Topic 4.' },
    { to: 'ob13', topic: 'Communicate change', text: 'Communication is the first strategy for reducing resistance to change.' }
  ],
  mindmaps: [{ center: 'Communication', branches: [
    { label: 'Process', color: 'p', kids: ['Encode, channel, decode', 'Noise, feedback', 'Shared codebooks'] },
    { label: 'Channels', color: 'p', kids: ['Email problems', 'Social media', 'Nonverbal, contagion'] },
    { label: 'Choosing', color: 't', kids: ['Social acceptance', 'Media richness', 'Spoken persuades more'] },
    { label: 'Barriers', color: 'r', kids: ['Perception, filtering', 'Jargon, ambiguity', 'Information overload'] },
    { label: 'Differences', color: 'c', kids: ['Cross-cultural', 'Report vs rapport talk'] },
    { label: 'Improving', color: 'g', kids: ['Empathise, repeat', 'Active listening', 'MBWA, town halls', 'Grapevine'] }
  ] }],
  cases: [
    { co: 'Infosys', logo: 'IN', color: 'p', year: 'lecture', title: 'InfyBubble', story: 'Infosys adopted an “adult-adult” communication strategy with an in-house social media platform similar to Facebook.', lesson: 'Social media changes organisational communication flow.' },
    { co: 'Atos Origin', logo: 'AO', color: 't', year: 'lecture', title: 'Zero email', story: 'The European IT company planned to replace internal email entirely with other online collaboration tools.', lesson: 'Email’s problems (overload, poor emotion) push firms to other channels.' }
  ],
  code: [],
  beyond: [
    { skill: 'communication', why: 'This whole topic is the theory behind clear bug reports, standups and pull request comments.' },
    { skill: 'docs', why: 'Good documentation fights information overload by summarising and organising.' },
    { skill: 'agile', why: 'Daily standups are short, rich, face-to-face channels for routine coordination.' }
  ],
  cards: [
    ['Communication', 'The process by which information is transmitted and understood between people (intended meaning).'],
    ['Four problems with email', 'Poor at emotions, reduces politeness (flaming), poor for ambiguous/complex issues, information overload.'],
    ['Emotional contagion', 'Automatically sharing another’s emotions by mimicking their nonverbal behaviour.'],
    ['When use rich media?', 'Nonroutine and ambiguous situations.'],
    ['Five communication barriers', 'Perceptions, filtering, language (jargon, ambiguity), information overload.'],
    ['Report vs rapport talk', 'Report: status, function, advice. Rapport: relationships, indirect.']
  ],
  quiz: [
    { q: 'Explaining a complex, sensitive reorganisation is best done by…', o: ['Email', 'Memo', 'Face-to-face meeting', 'Text message'], a: 2, why: 'Rich channel for nonroutine, ambiguous situations.' },
    { q: 'A supervisor leaves out bad news when reporting upward. This barrier is…', o: ['Jargon', 'Filtering', 'Overload', 'Noise'], a: 1, why: 'Filtering deletes or delays negative information.' },
    { q: 'Which is NOT an active listening strategy?', o: ['Postpone evaluation', 'Interrupt to correct', 'Empathise', 'Clarify the message'], a: 1, why: 'Avoid interruptions.' }
  ],
  tutorial: { no: 8, source: 'TUTORIAL-(8)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 3, q: 'Define communication; symbols vs intended meaning.', a: `<p>The process by which information is transmitted and understood between people. Sending words or symbols is not enough; communication succeeds only when the receiver understands the <b>intended meaning</b>.</p>` },
    { n: 'Q1(b)', m: 5, q: 'Five reasons communication is important.', a: `<p>Coordinating work, organisational learning, better decision making, changing others' behaviour, employee well-being.</p>` },
    { n: 'Q1(c)', m: 2, q: 'Four conditions that improve encoding/decoding.', a: `<p>Similar codebooks; sender experienced with the message; both motivated and able to use the channel; shared mental models of the context.</p>` },
    { n: 'Q2(a)', m: 2, q: 'Four ways email changed communication.', a: `<p>Preferred channel for coordinating work; increased communication volume; altered communication flow; somewhat reduced status differences and stereotyping.</p>` },
    { n: 'Q2(b)', m: 4, q: 'Four problems with email.', a: `<p>Poor at communicating emotions; reduces politeness and respect (flaming); inefficient for ambiguous, complex, novel situations; increases information overload.</p>` },
    { n: 'Q2(c)', m: 4, q: 'Define social media, its features and functions.', a: `<p>Internet/mobile channels with user-generated, interactive content (blogs, wikis, tweets, personal sites). More conversational, lets people build a public identity, encourages communities through links and feedback. Functions: presenting identity, enabling conversations, sharing, building relationships and groups.</p>` },
    { n: 'Q3(a)', m: 2, q: 'Role of nonverbal communication vs verbal.', a: `<p>It influences the meaning of verbal symbols. It is less rule-bound and mostly automatic and nonconscious, while verbal communication is more deliberate and rule-bound.</p>` },
    { n: 'Q3(b)', m: 4, q: 'Define emotional contagion and its three purposes.', a: `<p>Automatically sharing another's emotions by mimicking their expressions. Purposes: continuous feedback to the speaker; better understanding of the other's experience; communicating a collective sentiment (drive to bond).</p>` },
    { n: 'Q3(c)', m: 4, q: 'Social acceptance of channels: three factors.', a: `<p>Whether others support using the channel for that purpose, based on: firm/team norms, individual preferences, symbolic meaning of the channel (professional vs casual).</p>` },
    { n: 'Q4(a)', m: 4, q: 'Define media richness; four characteristics of rich channels.', a: `<p>A channel's data-carrying capacity. Rich when it conveys multiple cues, allows timely feedback, allows customised messages, and permits complex symbols.</p>` },
    { n: 'Q4(b)', m: 2, q: 'When to use rich vs lean media.', a: `<p>Rich media for nonroutine and ambiguous situations; lean media for routine, clear ones. Mismatch causes overload (too rich) or oversimplification (too lean).</p>` },
    { n: 'Q4(c)', m: 2, q: 'Three exceptions to media richness for electronic channels.', a: `<p>People can multi-communicate through lean channels; proficiency with channels varies; lean channels have less social distraction.</p>` },
    { n: 'Q4(d)', m: 2, q: 'Why spoken communication is more persuasive.', a: `<p>Accompanied by nonverbal communication; high-quality immediate feedback; high social presence.</p>` },
    { n: 'Q5(a)', m: 5, q: 'Five communication barriers.', a: `<p>Perceptions (receivers don't listen as well as assumed); filtering (delete/delay negative info); language: jargon; language: ambiguity; information overload.</p>` },
    { n: 'Q5(b)', m: 3, q: 'Information overload, consequences, two solutions.', a: `<p>When a job's information load exceeds capacity. Information gets missed or misread → poor decisions and stress. Solutions: increase processing capacity (read faster, remove distractions) or reduce load (buffering, omitting, summarising).</p>` },
    { n: 'Q5(c)', m: 2, q: 'Two verbal and one nonverbal cross-cultural difference.', a: `<p>Verbal: language, voice intonation, silence and conversational overlaps. Nonverbal: some gestures are universal, others differ across cultures (e.g. hand signals).</p>` },
    { n: 'Q6(a)', m: 3, q: 'Gender differences: report vs rapport talk.', a: `<p>Men tend to see conversation as power, status and function: <b>report talk</b>, give advice quickly, dominate. Women focus more on relationships: <b>rapport talk</b>, indirect advice and requests, sensitive to nonverbal cues.</p>` },
    { n: 'Q6(b)', m: 3, q: 'Four strategies to get a message across; active listening.', a: `<p>Empathise, repeat the message, use timing effectively, focus on the problem not the person. <b>Active listening</b>: sensing (postpone evaluation, avoid interruptions, maintain interest), evaluating (empathise, organise information), responding (show interest, clarify).</p>` },
    { n: 'Q6(c)', m: 2, q: 'Three methods for communicating in hierarchies.', a: `<p>Workspace design; internet-based communication (wikis, e-zines); direct communication with management (MBWA, town halls).</p>` },
    { n: 'Q6(d)', m: 2, q: 'The grapevine: benefits, limits, internet changes.', a: `<p>Unstructured, informal network. Benefits: fills missing info, strengthens culture, relieves anxiety, satisfies drive to bond. Limits: distortions, and staff feel management doesn't care when it is slower than the grapevine. Internet: email and social media extend it globally.</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(8): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob9', subject: 'ob', num: 9, theme: 'team', title: 'Power and influence in the workplace', short: 'Power and influence',
  lecture: 'Topic-9-(Power and influence in the workplace)',
  summary: 'The meaning of power and dependence, five sources of power, contingencies (substitutability, centrality, visibility, discretion), power through social networks, eight influence tactics, outcomes of influence, and organisational politics.',
  sections: [
    { h: 'Power and dependence', body: `
      <p><b>Power</b>: capacity to influence others. It is a <b>potential</b> (not actual change); people may be <b>unaware</b> of their power; it is based on <b>perception</b> that the holder controls a valued resource; and it involves <b>unequal dependence</b>. The other person always has some <b>countervailing power</b>.</p>
      <p><b>Lecture example:</b> JP Morgan's "London Whale" traders, with unconstrained power, caused a $7 billion loss.</p>` },
    { h: 'Sources of power', pics: [{ cards: [{ t: 'Legitimate', s: 'Role-based authority', c: 'p' }, { t: 'Reward', s: 'Control valued rewards', c: 'p' }, { t: 'Coercive', s: 'Ability to punish', c: 'r' }, { t: 'Expert', s: 'Valued knowledge, skills', c: 't' }, { t: 'Referent', s: 'Respect, charisma', c: 't' }], cols: 2, title: 'Five sources of power' }], body: `
      <p><b>Legitimate power</b> works within the <b>zone of indifference</b> (behaviours we accept from authority). Also the <b>norm of reciprocity</b> and <b>information control</b>. "Le Jeu de la Mort": only 16 of 80 contestants refused to give the strongest "shocks".</p>
      <p><b>Expert power</b> grows when someone can prevent, forecast or absorb environmental change (coping with uncertainty).</p>` },
    { h: 'Contingencies of power', pics: [{ cards: [{ t: 'Nonsubstitutability', s: 'Few alternatives', c: 'a' }, { t: 'Centrality', s: 'Many affected, quickly', c: 'a' }, { t: 'Visibility', s: 'Known to hold resource', c: 'a' }, { t: 'Discretion', s: 'Freedom to use judgement', c: 'a' }], cols: 2, title: 'Contingencies' }], body: `
      <p>Reduce substitutability through a monopoly, controlling access, or differentiating the resource. Visibility grows with face time and power symbols. Rules limit discretion.</p>` },
    { h: 'Social networks', pics: [{ compare: { a: { title: 'Strong ties', color: 'p', items: ['Close, frequent contact', 'Resources fast, plentiful', 'Less unique'] }, b: { title: 'Weak ties', color: 't', items: ['Acquaintances', 'Unique resources', 'Bridge other networks'] } }, title: 'Network ties' }], body: `
      <p>Networks generate power through <b>social capital</b>: information, visibility and referent power. More ties = more resources, but our capacity is limited.</p>
      <p><b>Centrality</b>: <b>betweenness</b> (sitting between others), <b>degree</b> (number of connections), <b>closeness</b> (strength of relationships).</p>` },
    { h: 'Influence tactics and outcomes', pics: [{ compare: { a: { title: 'Hard tactics', color: 'r', items: ['Silent authority', 'Assertiveness', 'Information control', 'Coalition formation', 'Upward appeal'] }, b: { title: 'Soft tactics', color: 'g', items: ['Persuasion', 'Impression management', 'Exchange'] } }, title: 'Eight influence tactics' }, { flow: [['Resistance', 'Oppose the request'], ['Compliance', 'Do it for rewards'], ['Commitment', 'Identify with it']], dir: 'h', colors: ['r', 'a', 'g'], title: 'Consequences of influence' }], body: `
      <p><b>Influence</b>: any behaviour that tries to change someone's attitudes or behaviour; essential for coordination and leadership; everyone does it.</p>
      <p>Soft tactics are generally more acceptable. Choice depends on the influencer's power base, organisational position and cultural values.</p>
      <p><b>Organisational politics</b>: behaviours seen as self-serving at others' expense. Emerge with <b>scarce resources</b>, <b>ambiguity</b> and when political behaviour is <b>reinforced</b>.</p>` }
  ],
  links: [
    { to: 'ob11', topic: 'Power and leadership', text: 'Leadership (Topic 11) is influence; transformational leaders rely on referent power.' },
    { to: 'ob10', topic: 'Power in conflict', text: 'Power affects which conflict style works (yielding when the other has more power).' },
    { to: 'ob13', topic: 'Coercion and negotiation', text: 'Topic 13 uses negotiation and coercion to overcome resistance, both influence tactics.' }
  ],
  mindmaps: [{ center: 'Power', branches: [
    { label: 'Meaning', color: 'p', kids: ['Capacity to influence', 'Potential, perceived', 'Unequal dependence'] },
    { label: 'Sources', color: 'p', kids: ['Legitimate, reward', 'Coercive', 'Expert, referent'] },
    { label: 'Contingencies', color: 'a', kids: ['Nonsubstitutability', 'Centrality', 'Visibility, discretion'] },
    { label: 'Networks', color: 't', kids: ['Social capital', 'Strong vs weak ties', 'Betweenness, degree, closeness'] },
    { label: 'Influence', color: 'c', kids: ['Hard: assertive, upward', 'Soft: persuade, exchange', 'Resist, comply, commit'] },
    { label: 'Politics', color: 'r', kids: ['Self-serving', 'Scarce resources', 'Ambiguity, reinforced'] }
  ] }],
  cases: [
    { co: 'JP Morgan', logo: 'JPM', color: 'r', year: '2012', title: 'The London Whale', story: 'A small group of traders in the chief investment office built huge positions with little oversight, producing a loss of about US$6–7 billion.', lesson: 'Unconstrained power with high discretion and low visibility to controls.' },
    { co: 'Le Jeu de la Mort', logo: 'TV', color: 'c', year: '2010', title: 'Deference to authority', story: 'A French TV experiment showed most contestants gave the strongest “shocks” to another person (an actor) when told to by the host. Only 16 of 80 refused.', lesson: 'Legitimate power and the zone of indifference are wider than we think.' }
  ],
  code: [
    { title: 'Degree and betweenness centrality', lang: 'Python', explain: 'Who in the network is most central? Uses the networkx library (pip install networkx).', src: String.raw`import networkx as nx

g = nx.Graph()
g.add_edges_from([("A", "B"), ("A", "C"), ("A", "D"), ("C", "E"),
                  ("D", "E"), ("E", "F"), ("A", "E")])

print(nx.degree_centrality(g))        # number of people connected to you
print(nx.betweenness_centrality(g))   # how often you sit between others
# 'A' and 'E' score highest: they control information flow` }
  ],
  beyond: [
    { skill: 'communication', why: 'Persuasion (a soft tactic) is how engineers get technical proposals accepted.' },
    { skill: 'git', why: 'In open source, expert and referent power come from your visible contributions on GitHub.' }
  ],
  cards: [
    ['Define power', 'The capacity of a person, team or organisation to influence others.'],
    ['Five sources of power', 'Legitimate, reward, coercive, expert, referent.'],
    ['Four contingencies of power', 'Nonsubstitutability, centrality, visibility, discretion.'],
    ['Strong vs weak ties', 'Strong: close, quick plentiful resources. Weak: acquaintances, unique resources.'],
    ['Three outcomes of influence', 'Resistance, compliance, commitment.'],
    ['Conditions for organisational politics', 'Scarce resources, ambiguity, political behaviour reinforced.']
  ],
  quiz: [
    { q: 'The only person who knows how the legacy billing system works has…', o: ['Coercive power', 'Expert power with low substitutability', 'Referent power', 'Legitimate power'], a: 1, why: 'Valued knowledge and no alternatives.' },
    { q: 'Getting the boss’s boss to back your request is…', o: ['Exchange', 'Upward appeal', 'Persuasion', 'Silent authority'], a: 1, why: 'Appealing to higher authority.' },
    { q: 'Doing a task only because of the bonus is…', o: ['Commitment', 'Compliance', 'Resistance', 'Identification'], a: 1, why: 'Motivated by external rewards.' }
  ],
  tutorial: { no: 9, source: 'TUTORIAL-(9)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 5, q: 'Define power and its five characteristics.', a: `<p>The capacity to influence others. (1) A potential, not actual change; (2) people may be unaware of their power; (3) based on perception that the holder controls a valuable resource; (4) involves unequal dependence; (5) the target has some countervailing power.</p>` },
    { n: 'Q1(b)', m: 2, q: 'Power and dependence.', a: `<p>Person A has power over B when B depends on resources A controls to reach B's goals. The more B depends on A (and the less A depends on B), the more power A has.</p>` },
    { n: 'Q1(c)', m: 3, q: 'The London Whale case.', a: `<p>A few traders in JP Morgan's London chief investment office used unconstrained power and influence to build huge trades that lost about $7 billion. It shows that power without checks (high discretion, low visibility to controls) can harm the organisation.</p>` },
    { n: 'Q2', m: 10, q: 'Five bases of power: definitions and how they influence.', a: `<ul><li><b>Legitimate</b>: agreement that certain roles can request certain behaviours (zone of indifference, reciprocity, information control).</li><li><b>Reward</b>: controlling rewards others value or removing negative sanctions.</li><li><b>Coercive</b>: ability to apply punishment.</li><li><b>Expert</b>: possessing knowledge or skills others value, especially for coping with uncertainty.</li><li><b>Referent</b>: others identify with and respect you; linked to charisma.</li></ul>` },
    { n: 'Q3', m: 10, q: 'Five contingencies of power.', a: `<ul><li><b>Nonsubstitutability</b>: few alternatives (monopoly, control access, differentiate).</li><li><b>Centrality</b>: many people affected, and quickly.</li><li><b>Visibility</b>: known as the holder of a valued resource (face time, symbols).</li><li><b>Discretion</b>: freedom to use judgement; rules limit it.</li><li><b>Social networks</b>: connections that give information, visibility and referent power.</li></ul>` },
    { n: 'Q4(a)', m: 2, q: 'Social networks and social capital.', a: `<p>People connected through interdependence. They generate <b>social capital</b>: goodwill and resulting resources shared among members (information, visibility, referent power).</p>` },
    { n: 'Q4(b)', m: 4, q: 'Strong vs weak ties.', a: `<p><b>Strong</b>: close-knit, frequent, high sharing; offer resources quickly and plentifully but less unique. <b>Weak</b>: acquaintances; offer unique resources from other networks. Limitation: we have limited capacity to maintain many ties.</p>` },
    { n: 'Q4(c)', m: 4, q: 'Network centrality and three factors.', a: `<p>A person's importance in a network: <b>betweenness</b> (located between others), <b>degree</b> (number of direct connections), <b>closeness</b> (strength of relationships).</p>` },
    { n: 'Q5(a)', m: 3, q: 'Define influence and why it is essential.', a: `<p>Any behaviour that attempts to alter someone's attitudes or behaviour. Essential because it is needed to coordinate with others, it is part of leadership, and everyone does it.</p>` },
    { n: 'Q5(b)', m: 4, q: 'Eight influence tactics.', a: `<p>Silent authority, assertiveness, information control, coalition formation, upward appeal, persuasion, impression management (incl. ingratiation), exchange.</p>` },
    { n: 'Q5(c)', m: 3, q: 'Three consequences of influence.', a: `<p><b>Resistance</b>: oppose the behaviour. <b>Compliance</b>: do it because of external sources like rewards, low commitment. <b>Commitment</b>: identify with and are highly motivated to implement the request.</p>` },
    { n: 'Q6(a)', m: 4, q: 'Choosing a tactic; soft vs hard.', a: `<p>Depends on the influencer's power base, organisational position and cultural values. <b>Hard</b> tactics (silent authority, assertiveness, information control, coalitions, upward appeal) force behaviour; <b>soft</b> tactics (persuasion, impression management, exchange) rely on personal sources and are more acceptable, building commitment rather than resistance.</p>` },
    { n: 'Q6(b)', m: 3, q: 'Organisational politics and three conditions.', a: `<p>Behaviours others see as self-serving tactics for personal gain at others' or the organisation's expense. Emerge with scarce resources, ambiguity, and when political behaviour is reinforced.</p>` },
    { n: 'Q6(c)', m: 3, q: 'Zone of indifference and Le Jeu de la Mort.', a: `<p>The range of behaviours people accept from authority without question. In the TV show only 16 of 80 contestants refused to give the strongest "shocks" when the host told them to, showing how wide this zone can be and how strong legitimate power is.</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(9): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
}
];
export default chapters;
