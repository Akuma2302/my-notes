/* Organisational Behaviour topics 1-4. Notes summarised from the lecture slides; tutorial answers written from them. */
const chapters = [
{
  id: 'ob1', subject: 'ob', num: 1, theme: 'individual', title: 'Introduction to organisational behaviour', short: 'Intro to OB',
  lecture: 'Topic-1-(Introduction to the field of organisational behaviour )',
  summary: 'What OB is, why it matters, and how to judge whether an organisation is effective using four perspectives: open systems, organisational learning, high-performance work practices and stakeholders (with values, ethics and CSR).',
  sections: [
    { h: 'What is organisational behaviour?', pics: [{ cards: [{ t: 'Organisational behaviour', s: 'What people think, feel, do at work', c: 'p' }, { t: 'Organisations', s: 'People working together for a purpose', c: 't' }], cols: 2, h: 64, title: 'Two key definitions' }], body: `
      <p><b>Organisational behaviour (OB)</b> is the study of what people <b>think, feel and do</b> in and around organisations.</p>
      <p><b>Organisations</b> are groups of people who work <b>interdependently</b> toward some purpose. They are <b>collective entities</b> with a <b>collective sense of purpose</b>.</p>
      <p><b>Lecture example:</b> Quicken Loans became one of America's most successful companies through high involvement, creativity, a strong culture and other effective OB practices.</p>` },
    { h: 'Why study OB?', body: `
      <ul><li><b>Understand and predict</b> what happens around us.</li>
      <li><b>Test and improve personal theories</b> about how people behave.</li>
      <li><b>Influence behaviour</b> and get things done through others.</li>
      <li><b>Improves an organisation's financial health</b>.</li>
      <li><b>OB is for everyone</b>, not only managers. Everyone works with and influences other people.</li></ul>` },
    { h: 'Organisational effectiveness', pics: [{ cards: [{ t: 'Open systems', s: 'Fit with the environment', c: 'p' }, { t: 'Organisational learning', s: 'Acquire, share, use, store knowledge', c: 't' }, { t: 'High-performance work practices', s: 'Get the most from people', c: 'c' }, { t: 'Stakeholders', s: 'Satisfy those affected', c: 'a' }], cols: 2, title: 'Four perspectives of effectiveness' }], body: `
      <p>Effectiveness is the <b>ultimate dependent variable</b> in OB. The old approach measured it as <b>achieving stated goals</b>, but that fails because a company could <b>set easy goals</b>, or could <b>achieve the wrong goals</b>.</p>
      <p>Use <b>all four perspectives together</b> when assessing a company.</p>` },
    { h: 'Open systems perspective', pics: [{ flow: [['Inputs', 'Raw materials, people, info, money'], ['Transformation', 'Subsystems work together'], ['Outputs', 'Products, dividends, waste'], ['Feedback', 'From the environment']], dir: 'h', colors: ['x', 'p', 't', 'a'], title: 'Open systems' }], body: `
      <p>An organisation takes <b>inputs</b> from the external environment (raw materials, human resources, information, finances, equipment), <b>transforms</b> them through interacting subsystems (production, marketing, engineering, accounting, managerial, technological…), and sends <b>outputs</b> back (products, services, dividends, community support, waste and pollution). <b>Feedback</b> from the environment tells it how well it fits.</p>` },
    { h: 'Organisational learning perspective', pics: [{ cycle: [['Acquire', 'Learn, scan, graft, experiment'], ['Share', 'Communicate, train, observe'], ['Use', 'Awareness, sense-making, autonomy'], ['Store', 'Memory, documents, databases']], center: 'Knowledge', color: 't', title: 'Organisational learning processes' }], body: `
      <p>An organisation's capacity to <b>acquire, share, use and store</b> valuable knowledge. Consider both:</p>
      <ul><li><b>Stock</b> of knowledge = <b>intellectual capital</b>.</li><li><b>Flow</b> of knowledge = the learning processes above.</li></ul>
      <p><b>Intellectual capital</b> has three parts: <b>human capital</b> (knowledge people possess and generate), <b>structural capital</b> (knowledge captured in systems and structures) and <b>relationship capital</b> (value from satisfied customers, reliable suppliers, etc.).</p>` },
    { h: 'High-performance work practices (HPWPs)', body: `
      <p>Workplace practices that <b>leverage the potential of human capital</b>. Four common HPWPs:</p>
      <ol><li>Employee involvement</li><li>Job autonomy</li><li>Developing competencies (training, selection)</li><li>Performance-based rewards</li></ol>
      <p>They must be <b>bundled</b>: they work best together and support each other.</p>` },
    { h: 'Stakeholder perspective, values, ethics and CSR', pics: [{ cards: [{ t: 'Economy', s: 'Profit, jobs', c: 'p' }, { t: 'Society', s: 'People, community', c: 't' }, { t: 'Environment', s: 'Planet', c: 'c' }], cols: 3, title: 'Triple bottom line' }], body: `
      <p><b>Stakeholders</b> are entities who affect or are affected by the firm's objectives and actions. This view <b>personalises the open systems perspective</b> (real people and groups, not just "the environment").</p>
      <p><b>Challenges:</b> stakeholders have <b>conflicting interests</b>, and firms have <b>limited resources</b> to satisfy everyone.</p>
      <p><b>Values</b>: stable, evaluative beliefs that guide preferences for outcomes or actions. <b>Ethics</b>: moral principles that decide whether actions are right or wrong and outcomes good or bad. Values and ethics help the firm <b>prioritise</b> stakeholder interests.</p>
      <p><b>Corporate social responsibility (CSR)</b>: benefiting society and the environment beyond financial interests or legal obligations, the firm's "contract with society". Measured by the <b>triple bottom line</b>: economy, society, environment. <b>Example:</b> MTN Group's "21 Days of Y'ello Care", where employees paint schools and help the community.</p>` }
  ],
  links: [
    { to: 'ob2', topic: 'Values and ethics', text: 'Topic 2 explains values (Schwartz model) and three ethical principles in detail.' },
    { to: 'ob12', topic: 'Strong culture', text: 'Quicken Loans succeeds partly through a strong culture, covered in Topic 12.' },
    { to: 'ob7', topic: 'Employee involvement', text: 'Involvement, an HPWP, is often done through teams (Topic 7).' },
    { to: 'ch9', topic: 'Stakeholders and quality', text: 'TQM in Software QA Ch 9 also starts from the customer and treats suppliers as partners.' }
  ],
  mindmaps: [{ center: 'Intro to OB', branches: [
    { label: 'Definitions', color: 'p', kids: ['OB: think, feel, do', 'Organisations: interdependent', 'Collective purpose'] },
    { label: 'Why study OB', color: 'p', kids: ['Understand + predict', 'Test personal theories', 'Influence behaviour', 'OB is for everyone'] },
    { label: 'Open systems', color: 't', kids: ['Inputs → transform → outputs', 'Subsystems', 'Feedback from environment'] },
    { label: 'Org learning', color: 't', kids: ['Stock: intellectual capital', 'Flow: acquire, share, use, store', 'Human, structural, relationship'] },
    { label: 'HPWPs', color: 'c', kids: ['Involvement, autonomy', 'Competencies, rewards', 'Bundle them'] },
    { label: 'Stakeholders', color: 'a', kids: ['Conflicting interests', 'Values + ethics prioritise', 'CSR, triple bottom line'] }
  ] }],
  cases: [
    { co: 'Quicken Loans', logo: 'QL', color: 'p', year: 'lecture', title: 'Success through people practices', story: 'The lecture opens with Quicken Loans, which grew into one of America’s most successful lenders through high employee involvement, a focus on creativity and a strong culture.', lesson: 'OB practices (HPWPs, culture) affect financial results, not just morale.' },
    { co: 'MTN Group', logo: 'MTN', color: 'a', year: 'lecture', title: '21 Days of Y’ello Care', story: 'Africa’s largest mobile phone company runs a yearly programme where employees volunteer in communities, for example painting schools.', lesson: 'Stakeholder perspective and CSR: the community is a stakeholder.' },
    { co: 'Google', logo: 'G', color: 't', year: '2012–2015', title: 'Project Aristotle', story: 'Google studied what made its teams effective and found that psychological safety (feeling safe to speak up) mattered more than who was on the team.', lesson: 'OB research applied inside a company to improve effectiveness; OB is for everyone.' }
  ],
  code: [],
  beyond: [
    { skill: 'communication', why: 'Most of OB is about working with people. Clear communication is the everyday skill behind “influence behaviour and get things done”.' },
    { skill: 'ethics', why: 'Values, ethics and CSR in this topic are the same ideas as professional software ethics and PDPA.' },
    { skill: 'agile', why: 'Agile teams use HPWPs every day: involvement, autonomy, learning and shared rewards.' }
  ],
  cards: [
    ['Define organisational behaviour', 'The study of what people think, feel and do in and around organisations.'],
    ['Define organisations', 'Groups of people who work interdependently toward some purpose (collective entities with a collective sense of purpose).'],
    ['Two problems with goal attainment as effectiveness', 'Firms can set easy goals; firms can achieve the wrong goals.'],
    ['Four perspectives of effectiveness', 'Open systems, organisational learning, high-performance work practices, stakeholder.'],
    ['Three parts of intellectual capital', 'Human capital, structural capital, relationship capital.'],
    ['Four HPWPs', 'Employee involvement, job autonomy, competency development, performance-based rewards. Bundle them.'],
    ['Triple bottom line', 'Economic, social and environmental performance.']
  ],
  quiz: [
    { q: 'Knowledge captured in a company’s databases and procedures is…', o: ['Human capital', 'Structural capital', 'Relationship capital', 'Stakeholder capital'], a: 1, why: 'Structural capital is knowledge captured in systems and structures.' },
    { q: 'Which perspective “personalises” the open systems perspective?', o: ['Organisational learning', 'HPWP', 'Stakeholder', 'Goal attainment'], a: 2, why: 'It names the actual people and groups affected by the firm.' },
    { q: 'Why should HPWPs be bundled?', o: ['They are cheaper together', 'They work best together and reinforce each other', 'Law requires it', 'Only one can be used'], a: 1, why: 'Involvement without autonomy or training, for example, has little effect.' }
  ],
  tutorial: { no: 1, source: 'TUTORIAL-(1)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 4, q: 'Define the term "Organizational Behavior" (OB) and explain what is meant by "Organizations."', a: `<ul><li><b>OB</b>: the study of what people <b>think, feel and do</b> in and around organisations.</li><li><b>Organisations</b>: groups of people who work <b>interdependently</b> toward some purpose.</li><li>They are <b>collective entities</b> (people interacting, not buildings) with a <b>collective sense of purpose</b> (e.g. a hospital's purpose is caring for patients).</li></ul>` },
    { n: 'Q1(b)', m: 6, q: 'Studying OB is valuable. Identify and briefly explain four of these reasons, concluding with the statement that "OB is for everyone."', a: `<ol><li><b>Understand and predict</b>: satisfies our need to make sense of what happens at work.</li><li><b>Test and improve personal theories</b>: replaces guesswork about people with evidence.</li><li><b>Influence behaviour</b>: helps us get things done by working with others.</li><li><b>Improves financial health</b>: firms using OB practices perform better.</li></ol><p>Finally, <b>OB is for everyone</b>: everyone, not only managers, works with others and influences them, so everyone benefits.</p>` },
    { n: 'Q2(a)', m: 4, q: 'Explain the two main problems with using goal attainment as the sole measure of an organization\'s effectiveness.', a: `<ul><li><b>Easy goals</b>: a company can look "effective" by setting goals that are too easy to miss.</li><li><b>Wrong goals</b>: a company can achieve its stated goals yet still fail, because those goals do not fit what the environment or stakeholders need.</li></ul>` },
    { n: 'Q2(b)', m: 6, q: 'List and briefly describe the four perspectives that must be considered together to assess a company\'s effectiveness.', a: `<ol><li><b>Open systems</b>: the firm imports inputs, transforms them and exports outputs; effective firms keep a good fit with their environment.</li><li><b>Organisational learning</b>: capacity to acquire, share, use and store valuable knowledge.</li><li><b>High-performance work practices</b>: practices that leverage human capital (involvement, autonomy, competencies, rewards).</li><li><b>Stakeholder</b>: satisfying the people and groups who affect or are affected by the firm, guided by values, ethics and CSR.</li></ol>` },
    { n: 'Q3(a)', m: 4, q: 'Explain the Organizational Learning Perspective on effectiveness. Differentiate between the "stock" and the "flow" of knowledge.', a: `<p>Effectiveness depends on the firm's capacity to <b>acquire, share, use and store</b> valuable knowledge.</p><ul><li><b>Stock</b>: the knowledge the firm holds at a point in time = intellectual capital.</li><li><b>Flow</b>: the learning processes that move knowledge in and around the firm: acquisition (learning, scanning, grafting, experimenting), sharing (communicating, training, observing), use (awareness, sense-making, autonomy) and storage (memory, documents, databases).</li></ul>` },
    { n: 'Q3(b)', m: 6, q: 'Define the concept of Intellectual Capital and describe its three main components, providing a brief example for each.', a: `<p><b>Intellectual capital</b> is the stock of knowledge held by an organisation.</p><ul><li><b>Human capital</b>: knowledge people possess and generate. <i>Example:</i> a senior engineer's expertise.</li><li><b>Structural capital</b>: knowledge captured in systems and structures. <i>Example:</i> documented procedures, a product database.</li><li><b>Relationship capital</b>: value from relationships with customers, suppliers and others. <i>Example:</i> loyal customers, trusted suppliers.</li></ul>` },
    { n: 'Q4(a)', m: 2, q: 'What are High-Performance Work Practices (HPWPs) and what is their main purpose?', a: `<p>Workplace practices whose purpose is to <b>leverage the potential of human capital</b>, so employees contribute more of their knowledge and skill.</p>` },
    { n: 'Q4(b)', m: 4, q: 'List the four specific HPWPs.', a: `<ol><li>Employee involvement</li><li>Job autonomy</li><li>Developing employee competencies (training and selection)</li><li>Performance-based rewards</li></ol>` },
    { n: 'Q4(c)', m: 4, q: 'Explain the need to "bundle" HPWPs and why this is important.', a: `<p>HPWPs <b>work best together</b>. Each one depends on the others: involvement needs autonomy to act, autonomy needs competent people, and rewards motivate people to use their skills. Used alone, one practice has a much weaker effect, so firms should implement them as a <b>bundle</b>.</p>` },
    { n: 'Q5(a)', m: 5, q: 'Define the "Stakeholder Perspective" and explain how it "personalizes" the Open Systems perspective. Use MTN Group\'s "21 Days of Y\'ello Care" to illustrate one type of stakeholder.', a: `<ul><li><b>Stakeholders</b> are entities who affect or are affected by the firm's objectives and actions.</li><li>The open systems view talks about the "environment" in general. The stakeholder view <b>personalises</b> it by naming the actual people and groups (customers, employees, shareholders, community, government) and their needs.</li><li><b>MTN example:</b> employees paint schools and support communities, so the <b>community</b> is a stakeholder the company serves.</li></ul>` },
    { n: 'Q5(b)', m: 5, q: 'Identify and explain the two main challenges organizations face when applying the stakeholder perspective.', a: `<ol><li><b>Conflicting interests</b>: stakeholders want different things (e.g. shareholders want higher profit, employees want higher pay).</li><li><b>Limited resources</b>: the firm cannot satisfy every stakeholder fully, so it must prioritise.</li></ol>` },
    { n: 'Q6(a)', m: 5, q: 'How do values and ethics help an organization manage its stakeholder relationships? Define both "values" and "ethics."', a: `<ul><li><b>Values</b>: stable, evaluative beliefs that guide our preferences for outcomes or courses of action.</li><li><b>Ethics</b>: moral principles that determine whether actions are right or wrong and outcomes good or bad.</li><li>Because the firm cannot satisfy everyone, its <b>values and ethics decide which stakeholder interests come first</b> and how to treat each one fairly.</li></ul>` },
    { n: 'Q6(b)', m: 5, q: 'Explain how the stakeholder perspective connects to CSR. Describe the "triple bottom line."', a: `<p>The stakeholder perspective includes <b>corporate social responsibility</b>: benefiting society and the environment beyond the firm's immediate financial interests or legal obligations, its contract with society.</p><p>The <b>triple bottom line</b> measures performance on three dimensions: <b>economic</b> (profit), <b>social</b> (people and communities) and <b>environmental</b> (the planet).</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(1): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab for a ready mind map. Branches to include: definitions, why study OB, the four effectiveness perspectives (open systems, learning with intellectual capital, HPWPs, stakeholders) and values/ethics/CSR.</p>` }
  ] }
},
{
  id: 'ob2', subject: 'ob', num: 2, theme: 'individual', title: 'Individual behaviour, personality and values', short: 'Personality and values',
  lecture: 'Topic-2-(Individual behaviour, personality, and values)',
  summary: 'The MARS model of individual behaviour, five types of behaviour at work, personality (Big Five and MBTI), values (Schwartz), values congruence, three ethical principles and what influences ethical conduct.',
  sections: [
    { h: 'MARS model of individual behaviour', pics: [{ cards: [{ t: 'M: Motivation', s: 'Direction, intensity, persistence', c: 'p' }, { t: 'A: Ability', s: 'Aptitudes + learned skills', c: 't' }, { t: 'R: Role perceptions', s: 'Know what is expected', c: 'c' }, { t: 'S: Situational factors', s: 'Constraints and cues', c: 'a' }], cols: 2, title: 'MARS model' }], body: `
      <p>Behaviour and results are driven by four factors, all needed together:</p>
      <ul><li><b>Motivation</b>: internal forces that affect voluntary behaviour: <b>direction</b>, <b>intensity</b>, <b>persistence</b>.</li>
      <li><b>Ability</b>: aptitudes and learned capabilities. Improve fit by <b>selecting</b>, <b>developing</b> or <b>redesigning</b> the job.</li>
      <li><b>Role perceptions</b>: understanding job duties. Clear when we know our tasks and consequences, the priorities, and the preferred behaviours/procedures. Benefits: more accurate work, better coordination, higher motivation.</li>
      <li><b>Situational factors</b>: conditions beyond the person's short-term control: <b>constraints</b> (time, budget, facilities) and <b>cues</b> (e.g. hazard signs).</li></ul>
      <p>The model is fed by personality, values, self-concept, perceptions, emotions, attitudes and stress.</p>` },
    { h: 'Five types of individual behaviour', pics: [{ cards: [{ t: 'Task performance', c: 'p' }, { t: 'Organisational citizenship', c: 't' }, { t: 'Counterproductive work behaviour', c: 'r' }, { t: 'Joining and staying', c: 'c' }, { t: 'Maintaining attendance', c: 'a' }], cols: 2, h: 50, title: 'Types of behaviour' }], body: `
      <ul><li><b>Task performance</b>: goal-directed behaviour supporting organisational objectives; includes proficiency, adaptability and proactivity.</li>
      <li><b>Organisational citizenship</b>: cooperation and helpfulness that support the social and psychological context; directed at people and the organisation.</li>
      <li><b>Counterproductive work behaviours</b>: voluntary behaviours that may harm the organisation.</li>
      <li><b>Joining and staying</b> with the organisation.</li>
      <li><b>Maintaining attendance</b>: absences from situations or motivation; <b>presenteeism</b> = coming to work when capacity is badly reduced (e.g. ill).</li></ul>` },
    { h: 'Personality', body: `
      <p>A relatively enduring pattern of thoughts, emotions and behaviours, plus the psychological processes behind them. Includes <b>external traits</b> (what we see) and <b>internal states</b>. <b>Traits</b> are clusters of internally caused tendencies, seen across situations, though a situation may suppress them.</p>
      <p><b>Nature vs nurture</b>: heredity explains about <b>50%</b> of behavioural tendencies and <b>30%</b> of temperament (Minnesota twin studies). Nurture (socialisation, learning) matters too. Personality stabilises in <b>young adulthood</b>; our executive function steers behaviour guided by self-concept.</p>` },
    { h: 'Big Five (CANOE) and MBTI', pics: [{ cards: [{ t: 'Conscientiousness', s: 'Organised, dependable', c: 'p' }, { t: 'Agreeableness', s: 'Trusting, helpful', c: 'p' }, { t: 'Neuroticism', s: 'Anxious, self-conscious', c: 'r' }, { t: 'Openness', s: 'Creative, nonconforming', c: 'p' }, { t: 'Extraversion', s: 'Outgoing, energetic', c: 'p' }], cols: 2, title: 'CANOE' }, { cards: [{ t: 'E / I', s: 'Extraversion vs introversion', c: 't' }, { t: 'S / N', s: 'Sensing vs intuition', c: 't' }, { t: 'T / F', s: 'Thinking vs feeling', c: 't' }, { t: 'J / P', s: 'Judging vs perceiving', c: 't' }], cols: 2, title: 'MBTI dichotomies' }], body: `
      <ul><li><b>Conscientiousness and emotional stability</b>: strongest personality predictors of performance.</li><li><b>Extraversion</b>: better in sales and management (social interaction, persuasion).</li><li><b>Agreeableness</b>: jobs needing cooperation and helpfulness.</li><li><b>Openness</b>: creativity and adapting to change.</li></ul>
      <p><b>MBTI</b> (based on Carl Jung): the most used personality test in business; good for self- and other-awareness, <b>poor predictor</b> of performance, leadership or team development. Sensing = factual, quantitative; Intuition = insight, subjective. Thinking = logic; Feeling = emotions and effect on others. Judging = order, structure; Perceiving = flexible, keeps options open.</p>` },
    { h: 'Values, Schwartz model and congruence', pics: [{ cards: [{ t: 'Openness to change', s: 'Pursue new ways', c: 'p' }, { t: 'Conservation', s: 'Preserve status quo', c: 't' }, { t: 'Self-enhancement', s: 'Self-interest', c: 'c' }, { t: 'Self-transcendence', s: 'Welfare of others, nature', c: 'a' }], cols: 2, title: 'Schwartz values' }], body: `
      <p><b>Values</b>: stable, evaluative beliefs that guide preferences; what we "ought" to do. A <b>value system</b> is our hierarchy of values. Compared with personality, values are <b>evaluative</b> (not descriptive), can <b>conflict</b> with each other, and are shaped more by <b>nurture</b>.</p>
      <p>Values-behaviour disconnect happens because of the <b>situation</b> and low <b>awareness (salience)</b>. Fix: values-consistent environment and rewards, reminders, sensitivity training.</p>
      <p><b>Values congruence</b>: person-organisation, espoused-enacted (what the firm says vs does), organisation-community.</p>` },
    { h: 'Ethics', pics: [{ cards: [{ t: 'Utilitarianism', s: 'Greatest good for greatest number', c: 'p' }, { t: 'Individual rights', s: 'Fundamental entitlements', c: 't' }, { t: 'Distributive justice', s: 'Similar people, similar benefits', c: 'c' }], cols: 3, title: 'Three ethical principles' }], body: `
      <p><b>Influences on ethical conduct:</b> <b>moral intensity</b> (how much the issue demands ethics), <b>moral sensitivity</b> (ability to notice an ethical issue; grows with empathy, expertise, experience and <b>mindfulness</b>), and <b>situational influences</b> (competitive pressure).</p>
      <p><b>Supporting ethical behaviour:</b> code of ethics, systems to report and investigate wrongdoing (hotlines, ombudspersons), ethical leadership and shared values.</p>` }
  ],
  links: [
    { to: 'ob5', topic: 'Motivation', text: 'The M in MARS is developed fully in Topic 5.' },
    { to: 'ob3', topic: 'Self-concept and perception', text: 'Self-concept and perceptions feed the MARS model; Topic 3 explains them.' },
    { to: 'ob13', topic: 'MARS for change', text: 'Topic 13 uses MARS to spread change from pilot projects.' },
    { to: 'ob6', topic: 'Ethical criteria', text: 'Topic 6 contrasts utilitarianism, rights and justice again for decision making.' }
  ],
  mindmaps: [{ center: 'Individual behaviour', branches: [
    { label: 'MARS', color: 'p', kids: ['Motivation', 'Ability', 'Role perceptions', 'Situational factors'] },
    { label: 'Behaviour types', color: 'p', kids: ['Task performance', 'Citizenship', 'Counterproductive', 'Join/stay, attendance'] },
    { label: 'Personality', color: 't', kids: ['Traits + internal states', 'Nature ~50%, nurture', 'Stable in young adulthood'] },
    { label: 'Big Five + MBTI', color: 't', kids: ['CANOE', 'C + emotional stability best', 'MBTI: awareness, poor predictor'] },
    { label: 'Values', color: 'c', kids: ['Schwartz 4 groups', 'Value system', 'Values congruence ×3'] },
    { label: 'Ethics', color: 'a', kids: ['Utilitarian, rights, justice', 'Moral intensity + sensitivity', 'Codes, hotlines, leaders'] }
  ] }],
  cases: [
    { co: 'Iceland Foods', logo: 'IF', color: 'p', year: 'lecture', title: 'MARS in practice', story: 'The lecture opens with Iceland Foods Group, a UK food retailer that became one of the hottest in the country by focusing on employee motivation, skill development and role perceptions.', lesson: 'Working on M, A and R of the MARS model improved results.' },
    { co: 'Volkswagen', logo: 'VW', color: 'r', year: '2015', title: 'Emissions scandal', story: 'Software in diesel cars detected test conditions and cut emissions only during tests. The company paid tens of billions in fines and settlements.', lesson: 'Espoused vs enacted values gap, and how situational pressure can override ethics.' }
  ],
  code: [],
  beyond: [
    { skill: 'communication', why: 'Knowing personality differences (e.g. introverts vs extraverts) helps you communicate in project teams.' },
    { skill: 'ethics', why: 'The three ethical principles give you a way to argue software decisions that affect users.' },
    { skill: 'requirements', why: 'Role clarity (the R in MARS) is like clear requirements: people perform better when they know exactly what is expected.' }
  ],
  cards: [
    ['MARS model', 'Motivation, Ability, Role perceptions, Situational factors.'],
    ['Three parts of motivation', 'Direction, intensity, persistence.'],
    ['Big Five (CANOE)', 'Conscientiousness, Agreeableness, Neuroticism, Openness, Extraversion.'],
    ['Best Big Five predictors of performance', 'Conscientiousness and emotional stability (low neuroticism).'],
    ['Four Schwartz value groups', 'Openness to change, conservation, self-enhancement, self-transcendence.'],
    ['Three ethical principles', 'Utilitarianism, individual rights, distributive justice.'],
    ['Presenteeism', 'Coming to work when capacity is significantly reduced by illness or other factors.']
  ],
  quiz: [
    { q: 'A worker knows the job and is motivated but has no equipment. Which MARS factor is missing?', o: ['Motivation', 'Ability', 'Role perceptions', 'Situational factors'], a: 3, why: 'Lack of equipment is a situational constraint.' },
    { q: 'MBTI is best used for…', o: ['Predicting performance', 'Selecting leaders', 'Self and other awareness', 'Measuring values'], a: 2, why: 'It is a poor predictor of performance and leadership.' },
    { q: 'Compared with personality, values are…', o: ['Descriptive', 'Evaluative', 'Mostly inherited', 'Never in conflict'], a: 1, why: 'Values say what we ought to do; they are shaped more by nurture.' }
  ],
  tutorial: { no: 2, source: 'TUTORIAL-(2)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 4, q: 'According to the MARS model, identify and briefly explain the four key forces that affect a person\'s voluntary behaviour.', a: `<ul><li><b>Motivation</b>: internal forces affecting direction, intensity and persistence of effort.</li><li><b>Ability</b>: aptitudes and learned capabilities to do the task.</li><li><b>Role perceptions</b>: understanding what is expected of us.</li><li><b>Situational factors</b>: conditions outside our short-term control that constrain or help (time, budget, cues).</li></ul>` },
    { n: 'Q1(b)', m: 6, q: 'Explain role perceptions, the three things employees need to understand for clear role perceptions, and the benefits of such clarity.', a: `<p>Role perceptions = how well we understand the job duties expected of us.</p><p>Clear when we understand: (1) our <b>tasks and accountable consequences</b>, (2) <b>task/performance priorities</b>, (3) the <b>preferred behaviours or procedures</b>.</p><p><b>Benefits:</b> more accurate and efficient performance, better coordination with others, higher motivation.</p>` },
    { n: 'Q2', q: 'List and describe five distinct types of individual behaviour.', a: `<ol><li><b>Task performance</b>: goal-directed behaviour under the person's control that supports objectives (proficiency, adaptability, proactivity).</li><li><b>Organisational citizenship</b>: cooperation and helpfulness toward people and the organisation.</li><li><b>Counterproductive work behaviours</b>: voluntary behaviours that can harm the organisation.</li><li><b>Joining and staying</b>: forming and keeping the employment relationship.</li><li><b>Maintaining attendance</b>: avoiding absenteeism; includes presenteeism.</li></ol>` },
    { n: 'Q3(a)', m: 5, q: 'Define personality; explain external traits vs internal states and what personality traits are.', a: `<p>Personality is a relatively enduring pattern of thoughts, emotions and behaviours that characterise a person, along with the psychological processes behind them.</p><ul><li><b>External traits</b>: observable behaviour patterns.</li><li><b>Internal states</b>: thoughts, values and genetic characteristics we infer.</li><li><b>Traits</b>: clusters of internally caused behaviour tendencies, seen across situations, though a strong situation can suppress them.</li></ul>` },
    { n: 'Q3(b)', m: 5, q: 'Explain nature vs nurture for personality, what twin studies suggest, and when personality stabilises.', a: `<ul><li><b>Nature</b>: heredity explains about 50% of behavioural tendencies and 30% of temperament. Minnesota twin studies found twins raised apart had similar personalities.</li><li><b>Nurture</b>: socialisation, life experience and learning also shape personality.</li><li>Personality <b>stabilises in young adulthood</b>; our executive function steers behaviour using our self-concept.</li></ul>` },
    { n: 'Q4(a)', m: 5, q: 'List the five dimensions of the Five-Factor Model (CANOE).', a: `<p>Conscientiousness, Agreeableness, Neuroticism, Openness to experience, Extraversion.</p>` },
    { n: 'Q4(b)', m: 5, q: 'Explain how each dimension relates to behaviour and performance at work.', a: `<ul><li><b>Conscientiousness</b> and <b>emotional stability</b> (low neuroticism): strongest predictors of performance in most jobs.</li><li><b>Extraversion</b>: higher performance in sales and management (social interaction, persuasion).</li><li><b>Agreeableness</b>: effective in jobs needing cooperation and helpfulness.</li><li><b>Openness</b>: more creativity and adaptability to change.</li></ul>` },
    { n: 'Q5(a)', m: 4, q: 'Explain the origin and purpose of MBTI, and its main benefits and limitations in business.', a: `<p>Based on Swiss psychiatrist <b>Carl Jung's</b> theory of preferences for perceiving the environment and processing information. Measures Jungian types; the most widely used personality test in business.</p><p><b>Benefit:</b> good for self-awareness and understanding others. <b>Limitation:</b> poor predictor of job performance, leadership and team development.</p>` },
    { n: 'Q5(b)', m: 6, q: 'Describe the four MBTI dichotomies and the two preferences in each.', a: `<ul><li><b>E/I</b>: Extraversion (talkative, externally focused) vs Introversion (quiet, internally focused).</li><li><b>S/N</b>: Sensing (factual, concrete, practical) vs Intuition (insight, imaginative, future-focused).</li><li><b>T/F</b>: Thinking (logical, objective) vs Feeling (empathetic, considers effect on others).</li><li><b>J/P</b>: Judging (order, schedules, closure) vs Perceiving (flexible, spontaneous, keeps options open).</li></ul>` },
    { n: 'Q6(a)', m: 4, q: 'Define values, explain how they differ from personality, and what a value system is.', a: `<p>Values are stable, evaluative beliefs that guide our preferences: what we ought to do.</p><p>Unlike personality, values are <b>evaluative</b> (not descriptive), can <b>conflict</b> with each other, and are shaped more by <b>nurture</b> than nature.</p><p>A <b>value system</b> is a person's hierarchy (ranking) of values.</p>` },
    { n: 'Q6(b)', m: 3, q: 'Name and explain the three types of values congruence.', a: `<ul><li><b>Person-organisation</b>: employee's values match the company's.</li><li><b>Espoused-enacted</b>: what the company says it values matches what it does.</li><li><b>Organisation-community</b>: the company's values match the society it operates in.</li></ul>` },
    { n: 'Q6(c)', m: 3, q: 'List and explain the three ethical principles.', a: `<ul><li><b>Utilitarianism</b>: greatest good for the greatest number of people.</li><li><b>Individual rights</b>: respect fundamental entitlements in society.</li><li><b>Distributive justice</b>: people who are similar should receive similar benefits.</li></ul>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(2): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab. Include MARS, five behaviour types, personality (nature/nurture, CANOE, MBTI), values (Schwartz, congruence) and ethics.</p>` }
  ] }
},
{
  id: 'ob3', subject: 'ob', num: 3, theme: 'individual', title: 'Perceiving ourselves and others', short: 'Perception',
  lecture: 'Topic-3-(Perceiving ourselves and others in organisations)',
  summary: 'Self-concept (3 Cs and four selves), the perception process, selective attention, mental models, stereotyping, attribution and its errors, self-fulfilling prophecy, other perceptual effects and how to improve perceptions (Johari window).',
  sections: [
    { h: 'Self-concept: 3 Cs and four selves', pics: [{ compare: { a: { title: 'Three Cs', color: 'p', items: ['Complexity: many self-views', 'Consistency: compatible selves', 'Clarity: clear, stable'] }, b: { title: 'Four selves processes', color: 't', items: ['Self-enhancement', 'Self-verification', 'Self-evaluation', 'Social self'] } }, title: 'Self-concept model' }], body: `
      <p><b>Self-concept</b>: an individual's self-beliefs and self-evaluations: "Who am I?" and "How do I feel about myself?". We compare the job with our perceived and ideal selves.</p>
      <ul><li><b>Complexity</b>: several identities with little overlap.</li><li><b>Consistency</b>: multiple selves are compatible with personality and values.</li><li><b>Clarity</b>: clear, confidently described, stable over time.</li></ul>
      <p>Well-being is better with multiple, clear, consistent selves.</p>` },
    { h: 'Enhancement, verification, evaluation, social self', body: `
      <ul><li><b>Self-enhancement</b>: drive to promote and protect a positive self-view. Outcomes: better adjustment and health, "can-do" attitude, but inflated sense of control and chances of success.</li>
      <li><b>Self-verification</b>: motivation to confirm our existing self-concept. We remember consistent information, resist feedback that differs, and prefer people who affirm us.</li>
      <li><b>Self-evaluation</b>: <b>self-esteem</b>, <b>self-efficacy</b> (belief we can do a task; general self-efficacy across situations) and <b>locus of control</b> (internal = higher self-evaluation).</li>
      <li><b>Social self / social identity</b>: defining ourselves by groups we belong to. Strongest when the group is easy to identify, our membership is unusual, and the group has high status.</li></ul>` },
    { h: 'Perception, attention, mental models', pics: [{ flow: [['Environmental stimuli'], ['Selective attention', 'Notice some, ignore others'], ['Organisation + interpretation', 'Categorise, emotional markers'], ['Attitudes and behaviour']], color: 't', title: 'Perceptual process' }], body: `
      <p><b>Perception</b>: receiving information and making sense of the world: what gets noticed, how it is categorised, and how it is interpreted.</p>
      <ul><li><b>Selective attention</b>: affected by the object (size, motion) and the perceiver (assumptions, expectations, needs). <b>Emotional markers</b> tag information. <b>Confirmation bias</b> screens out information that contradicts our beliefs.</li>
      <li><b>Categorical thinking</b>: grouping by similarity, proximity, <b>closure</b> (fill in missing pieces) and perceiving trends.</li>
      <li><b>Mental models</b>: internal pictures of the world that fill gaps and help predict, but can <b>block new perspectives</b>.</li></ul>` },
    { h: 'Stereotyping', pics: [{ flow: [['Categorisation', 'Put people into groups'], ['Homogenisation', 'Same traits within a group'], ['Differentiation', 'Less favourable traits to others']], dir: 'h', color: 'c', title: 'How stereotypes are reinforced' }], body: `
      <p>Assigning traits to people based on their social category. We stereotype because of categorical thinking, the drive to understand and predict others, and because it supports self-enhancement and social identity.</p>
      <p><b>Problems:</b> overgeneralises; basis of systemic and intentional discrimination. Stereotype <b>activation</b> is hard to prevent, but we can minimise its <b>application</b>.</p>` },
    { h: 'Attribution', pics: [{ cards: [{ t: 'Consistency', s: 'Same behaviour over time?', c: 'p' }, { t: 'Distinctiveness', s: 'Only in this situation?', c: 'p' }, { t: 'Consensus', s: 'Do others act the same?', c: 'p' }, { t: 'Internal attribution', s: 'High consistency, low distinct., low consensus', c: 'a' }, { t: 'External attribution', s: 'Low consistency, high distinct., high consensus', c: 't' }], cols: 2, title: 'Attribution rules' }], body: `
      <p><b>Internal attribution</b>: behaviour caused by the person's motivation or ability. <b>External</b>: caused by factors beyond their control.</p>
      <p><b>Errors:</b> <b>self-serving bias</b> (own successes are internal, failures external) and <b>fundamental attribution error</b> (overemphasise internal causes for others' behaviour; less common than once thought).</p>` },
    { h: 'Self-fulfilling prophecy and other effects', pics: [{ cycle: [['Supervisor forms expectations'], ['Behaves toward employee accordingly'], ['Effects on employee', 'Self-efficacy, motivation'], ['Employee behaves to match']], color: 'p', center: 'Pygmalion', title: 'Self-fulfilling prophecy cycle' }], body: `
      <p>Strongest at the <b>start of a relationship</b>, when <b>several people share the expectation</b>, and when the employee has <b>low past achievement</b>.</p>
      <ul><li><b>Halo effect</b>: one trait colours perception of all others.</li><li><b>False-consensus effect</b>: overestimate how many share our beliefs.</li><li><b>Primacy effect</b>: first impressions stick.</li><li><b>Recency effect</b>: most recent information dominates.</li></ul>
      <p><b>Improving perceptions:</b> (1) awareness of biases, (2) self-awareness using the <b>Johari window</b> (open, blind, hidden, unknown areas), (3) <b>meaningful interaction</b> (contact hypothesis: close, frequent contact toward a shared goal, meaningful task, equal status).</p>` }
  ],
  links: [
    { to: 'ob6', topic: 'Attribution and perception', text: 'Topic 6 repeats attribution (consistency, distinctiveness, consensus) and adds decision biases.' },
    { to: 'ob2', topic: 'Self-concept in MARS', text: 'Self-concept and perception feed the MARS model in Topic 2.' },
    { to: 'ob10', topic: 'Johari window', text: 'Topic 10 uses the Johari window and contact hypothesis to reduce conflict.' }
  ],
  mindmaps: [{ center: 'Perception', branches: [
    { label: 'Self-concept', color: 'p', kids: ['3 Cs', 'Enhancement, verification', 'Esteem, efficacy, locus', 'Social identity'] },
    { label: 'Perception process', color: 't', kids: ['Selective attention', 'Confirmation bias', 'Categorical thinking', 'Mental models'] },
    { label: 'Stereotyping', color: 'c', kids: ['Categorise', 'Homogenise', 'Differentiate', 'Limit application'] },
    { label: 'Attribution', color: 'a', kids: ['Internal vs external', 'Consistency, distinct., consensus', 'Self-serving bias', 'Fundamental error'] },
    { label: 'Effects', color: 'r', kids: ['Self-fulfilling prophecy', 'Halo, false consensus', 'Primacy, recency'] },
    { label: 'Improve', color: 'g', kids: ['Know your biases', 'Johari window', 'Meaningful contact'] }
  ] }],
  cases: [
    { co: 'Camp FFit (Ottawa)', logo: 'FF', color: 'p', year: 'lecture', title: 'Changing self-concept of future firefighters', story: 'The lecture features a camp where teenage girls build a self-concept as firefighters, raise self-esteem and break the job’s macho stereotype.', lesson: 'Self-concept, self-efficacy and stereotypes can be changed through experience.' },
    { co: 'Orchestra auditions', logo: 'OA', color: 't', year: '1970s–', title: 'Blind auditions', story: 'Major orchestras started auditioning musicians behind a screen. Research found this increased the chance that women advanced.', lesson: 'Removing information that triggers stereotypes reduces stereotype application.' }
  ],
  code: [],
  beyond: [
    { skill: 'communication', why: 'Attribution errors cause blame in code reviews. Assume situational causes first ("unclear spec") before personal ones.' },
    { skill: 'ethics', why: 'Stereotyping and bias also appear in software (biased hiring algorithms). Awareness is the first fix.' }
  ],
  cards: [
    ['Three Cs of self-concept', 'Complexity, consistency, clarity.'],
    ['Three parts of self-evaluation', 'Self-esteem, self-efficacy, locus of control.'],
    ['Confirmation bias', 'Screening out information that contradicts our beliefs and values.'],
    ['Three processes that reinforce stereotypes', 'Categorisation, homogenisation, differentiation.'],
    ['Attribution rules', 'Consistency, distinctiveness, consensus.'],
    ['Fundamental attribution error', 'Overemphasising internal causes of others’ behaviour while recognising external causes of our own.'],
    ['When is the self-fulfilling prophecy strongest?', 'Start of the relationship, several people share the expectation, employee has low past achievement.']
  ],
  quiz: [
    { q: 'A student blames the exam for a bad grade but credits their brain for a good one. This is…', o: ['Halo effect', 'Self-serving bias', 'Primacy effect', 'False consensus'], a: 1, why: 'Successes internal, failures external.' },
    { q: 'Behaviour that is highly consistent, low in distinctiveness and low in consensus leads to…', o: ['External attribution', 'Internal attribution', 'No attribution', 'Stereotyping'], a: 1, why: 'The person always does it, everywhere, and others do not.' },
    { q: 'The Johari window helps mainly by…', o: ['Increasing self-awareness', 'Measuring motivation', 'Ranking values', 'Testing ability'], a: 0, why: 'It enlarges the open area through disclosure and feedback.' }
  ],
  tutorial: { no: 3, source: 'TUTORIAL-(3)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 3, q: 'Define self-concept and the fundamental questions it encompasses.', a: `<p>Self-concept = an individual's self-beliefs and self-evaluations. It asks <b>"Who am I?"</b> and <b>"How do I feel about myself?"</b>, and compares our perceived job with our <b>perceived self</b> and <b>ideal self</b>.</p>` },
    { n: 'Q1(b)', m: 7, q: 'Describe the "Three Cs" and how each contributes to well-being.', a: `<ul><li><b>Complexity</b>: number of distinct self-views (identities). More, less overlapping identities protect well-being when one is threatened.</li><li><b>Consistency</b>: the multiple selves are compatible with each other and with personality and values; less inner conflict.</li><li><b>Clarity</b>: the self-concept is clear, confidently described and stable; gives direction and confidence.</li></ul><p>Best well-being: multiple selves, well established, and compatible with traits.</p>` },
    { n: 'Q2(a)', m: 5, q: 'Explain self-enhancement and self-verification and their outcomes.', a: `<ul><li><b>Self-enhancement</b>: drive to promote and protect a positive self-view (competent, attractive, ethical, valued). Outcomes: better adjustment and mental/physical health, a "can-do" attitude, but inflated perceived control and chances of success.</li><li><b>Self-verification</b>: motivation to verify and keep our existing self-concept. Outcomes: we remember consistent information, are less likely to accept differing feedback, and seek people who affirm our self-view.</li></ul>` },
    { n: 'Q2(b)', m: 5, q: 'Identify and explain the three components of self-evaluation.', a: `<ul><li><b>Self-esteem</b>: how much we like and respect ourselves; high self-esteem = less influenced by others, more persistent, more logical.</li><li><b>Self-efficacy</b>: belief we can perform a task (supported by MARS elements); general self-efficacy = "can-do" across situations.</li><li><b>Locus of control</b>: belief about personal control over life events; internal locus gives higher self-evaluation.</li></ul>` },
    { n: 'Q3(a)', m: 4, q: 'What is the social self and social identity theory? When do people identify most strongly with a group?', a: `<p>Social identity = defining ourselves by the groups we belong to or feel attached to (e.g. employer, nationality, university). We identify most strongly when the group is <b>easily identified</b>, our membership is <b>the exception</b> (distinctive), and the group has <b>high status</b>.</p>` },
    { n: 'Q3(b)', m: 6, q: 'Define perception and describe the perceptual process model.', a: `<p>Perception = receiving information about the world and making sense of it.</p><ol><li><b>Environmental stimuli</b> reach the senses.</li><li><b>Selective attention</b> decides what is noticed.</li><li><b>Perceptual organisation and interpretation</b>: categorise and interpret using existing knowledge; emotional markers evaluate it.</li><li>Leads to <b>attitudes and behaviour</b>.</li></ol>` },
    { n: 'Q4(a)', m: 4, q: 'Explain selective attention, what affects it, and the role of emotional markers and confirmation bias.', a: `<p>Selecting some sensory information and ignoring the rest. Affected by <b>object features</b> (size, motion, contrast) and <b>perceiver characteristics</b> (assumptions, expectations, needs). <b>Emotional markers</b> are attached automatically to selected information. <b>Confirmation bias</b> screens out information that contradicts our beliefs.</p>` },
    { n: 'Q4(b)', m: 3, q: 'What are mental models, how do they help, and what is their main problem?', a: `<p>Internal representations of the external world. They help us make sense of situations, fill in missing pieces and predict events. <b>Problem:</b> they can block recognition of new opportunities and perspectives.</p>` },
    { n: 'Q4(c)', m: 3, q: 'Define stereotyping and the three processes that reinforce it.', a: `<p>Assigning traits to people based on their social category. Reinforced by <b>categorisation</b> (sorting into groups), <b>homogenisation</b> (same traits within a group, different from other groups) and <b>differentiation</b> (less favourable traits to other groups).</p>` },
    { n: 'Q5(a)', m: 7, q: 'Explain internal and external attribution and how consistency, distinctiveness and consensus combine.', a: `<ul><li><b>Internal</b>: behaviour due to the person's own motivation or ability. <b>External</b>: due to the situation or fate.</li><li><b>Consistency</b>: does the person act this way over time? <b>Distinctiveness</b>: only in this situation? <b>Consensus</b>: do others act the same?</li><li>High consistency + low distinctiveness + low consensus → <b>internal</b>.</li><li>Low consistency + high distinctiveness + high consensus → <b>external</b>.</li></ul>` },
    { n: 'Q5(b)', m: 3, q: 'Define the two main attribution errors.', a: `<ul><li><b>Self-serving bias</b>: attribute own successes to internal factors and failures to external ones.</li><li><b>Fundamental attribution error</b>: overemphasise internal causes of others' behaviour while seeing external causes of our own.</li></ul>` },
    { n: 'Q6(a)', m: 4, q: 'Define with examples: halo, false-consensus, primacy and recency effects.', a: `<ul><li><b>Halo</b>: one trait shapes overall view. <i>A well-dressed candidate is assumed competent.</i></li><li><b>False-consensus</b>: overestimate how many share our views. <i>"Everyone hates the new system."</i></li><li><b>Primacy</b>: first impressions are hard to change. <i>A late first day labels a new hire unreliable.</i></li><li><b>Recency</b>: most recent information dominates. <i>A review based only on last month.</i></li></ul>` },
    { n: 'Q6(b)', m: 3, q: 'Explain the self-fulfilling prophecy and the three conditions where it is strongest.', a: `<p>Our expectations of a person change how we treat them, which changes their behaviour to match the expectation. Strongest: at the <b>beginning of the relationship</b>, when <b>several people hold similar expectations</b>, and when the employee has <b>low past achievement</b>.</p>` },
    { n: 'Q6(c)', m: 3, q: 'List three strategies for improving perceptions.', a: `<ol><li><b>Awareness of perceptual biases</b>.</li><li><b>Improving self-awareness</b> with the Johari window (disclosure and feedback shrink blind and hidden areas).</li><li><b>Meaningful interaction</b> (contact hypothesis): close, frequent interaction toward a shared goal, a meaningful task and equal status.</li></ol>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(3): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab: self-concept, perception process, stereotyping, attribution, perceptual effects and ways to improve.</p>` }
  ] }
},
{
  id: 'ob4', subject: 'ob', num: 4, theme: 'individual', title: 'Workplace emotions, attitudes and stress', short: 'Emotions and stress',
  lecture: 'Topic-4-(Workplace emotions, attitudes, and stress)',
  summary: 'Emotions and how they shape attitudes, cognitive dissonance, emotional labour, emotional intelligence, job satisfaction (EVLN, service profit chain), organisational commitment, and stress with five ways to manage it.',
  sections: [
    { h: 'Emotions and attitudes', pics: [{ flow: [['Beliefs', 'From experience and learning'], ['Feelings', 'Positive or negative'], ['Behavioural intentions'], ['Behaviour', 'Also depends on ability, situation']], color: 'p', title: 'Traditional attitude model' }], body: `
      <p><b>Emotions</b>: psychological, behavioural and physiological episodes that create a state of readiness, mostly without awareness. All emotions have <b>evaluation</b> (good/bad, the core affect) and <b>activation</b> (energy).</p>
      <p><b>Attitudes</b> are judgements about an object, more stable than emotions. Same beliefs can create different feelings; same feelings can create different intentions.</p>
      <p><b>Role of emotions:</b> emotional markers attach to information and are re-experienced when recalled. Cumulative emotional episodes shape feelings and beliefs. We "listen in" on emotions; cognitive and emotional thinking can conflict; emotions also act on behaviour directly (facial expression).</p>` },
    { h: 'Cognitive dissonance and emotional labour', body: `
      <p><b>Cognitive dissonance</b>: discomfort when beliefs, feelings and behaviour are inconsistent. Behaviour is hard to undo, so we usually <b>change our beliefs or feelings</b> instead.</p>
      <p><b>Emotional labour</b>: effort, planning and control to show organisationally desired emotions. Higher with frequent and long, varied, and intense emotion displays. Norms vary: emotion display is discouraged in Ethiopia and Japan, allowed in Kuwait and Spain.</p>
      <p><b>Emotional dissonance</b>: conflict between true and required emotions. Solutions: treat emotional labour as a <b>professional skill</b>; use <b>deep acting</b> (actually feel the emotion), not surface acting.</p>` },
    { h: 'Emotional intelligence', pics: [{ cards: [{ t: '1. Know own emotions', s: 'Lowest level', c: 't' }, { t: '2. Manage own emotions', c: 't' }, { t: '3. Know others’ emotions', c: 'p' }, { t: '4. Manage others’ emotions', s: 'Highest level', c: 'p' }], cols: 2, title: 'EI hierarchy' }], body: `
      <p>Four abilities on two dimensions: <b>self vs other</b> and <b>recognition vs regulation</b>. EI is a learnable skill set (coaching helps) and grows with age.</p>` },
    { h: 'Job satisfaction', pics: [{ cards: [{ t: 'Exit', s: 'Active, destructive: quit, transfer', c: 'r' }, { t: 'Voice', s: 'Active, constructive: problem solve', c: 'g' }, { t: 'Loyalty', s: 'Passive, constructive: wait', c: 't' }, { t: 'Neglect', s: 'Passive, destructive: less effort', c: 'c' }], cols: 2, title: 'EVLN responses' }], body: `
      <p>A person's evaluation of their job and work context: perceived job characteristics, work environment and emotional experiences.</p>
      <p><b>Satisfaction and performance:</b> happy workers are somewhat more productive, but the link is weaker because a general attitude predicts specific behaviour poorly, employees may have little control over output, and performance may not be rewarded.</p>
      <p><b>Service profit chain</b> (DaVita): satisfied employees → positive mood toward customers and lower turnover (consistent service) → customer satisfaction → profit.</p>` },
    { h: 'Organisational commitment', body: `
      <ul><li><b>Affective commitment</b>: emotional attachment and identification. Lower turnover, higher motivation and citizenship.</li>
      <li><b>Continuance commitment</b>: calculative; staying because there is no alternative or quitting is too costly. Lower performance, citizenship and cooperation.</li></ul>
      <p><b>Build affective commitment</b>: justice and support (humanitarian values, well-being), shared values, trust (job security), organisational comprehension (know the firm's past, present, future), and employee involvement.</p>` },
    { h: 'Stress', pics: [{ flow: [['Alarm reaction', 'Energy drops, then rises'], ['Resistance', 'Body fights the stressor'], ['Exhaustion', 'Resources depleted']], dir: 'h', colors: ['a', 'c', 'r'], title: 'General adaptation syndrome' }, { cards: [{ t: 'Remove the stressor', c: 'g' }, { t: 'Withdraw from it', s: 'Vacations, breaks', c: 'g' }, { t: 'Change perceptions', s: 'Self-concept, humour', c: 't' }, { t: 'Control consequences', s: 'Fitness, wellness', c: 't' }, { t: 'Receive social support', c: 'p' }], cols: 2, title: 'Five ways to manage stress' }], body: `
      <p>An adaptive response to situations seen as challenging or threatening. <b>Eustress</b> = good stress, <b>distress</b> = harmful.</p>
      <p><b>Stressors</b>: harassment and incivility, work overload, low task control. People cope better with good physical health, coping strategies, low neuroticism and high extraversion, positive self-concept, and low workaholism.</p>` }
  ],
  links: [
    { to: 'ob5', topic: 'Drives and emotions', text: 'Four-drive theory in Topic 5 explains how drives tag information with emotions.' },
    { to: 'ob8', topic: 'Emotional contagion', text: 'Topic 8 shows how emotions spread through nonverbal communication.' },
    { to: 'ob10', topic: 'Emotional intelligence in conflict', text: 'EI is one of three conditions that stop task conflict turning into relationship conflict.' },
    { to: 'ob13', topic: 'Stress during change', text: 'Stress management is a strategy for reducing resistance to change.' }
  ],
  mindmaps: [{ center: 'Emotions and stress', branches: [
    { label: 'Emotions', color: 'p', kids: ['Evaluation + activation', 'Emotional markers', 'Attitudes model'] },
    { label: 'Dissonance + labour', color: 'p', kids: ['Change beliefs, not behaviour', 'Emotional labour', 'Deep vs surface acting'] },
    { label: 'Emotional intelligence', color: 't', kids: ['Know own', 'Manage own', 'Know others', 'Manage others'] },
    { label: 'Job satisfaction', color: 'c', kids: ['EVLN', 'Weak link to performance', 'Service profit chain'] },
    { label: 'Commitment', color: 'a', kids: ['Affective: emotional', 'Continuance: calculative', '5 ways to build'] },
    { label: 'Stress', color: 'r', kids: ['Eustress vs distress', 'GAS: alarm, resist, exhaust', '5 management strategies'] }
  ] }],
  cases: [
    { co: 'JetBlue', logo: 'JB', color: 'r', year: '2010', title: 'Flight attendant quits on the slide', story: 'The lecture opens with JetBlue flight attendant Steven Slater, who reached breaking point after a conflict with a passenger and left the plane via the emergency slide.', lesson: 'Emotional labour and stress build up; organisations must help staff manage them.' },
    { co: 'DaVita', logo: 'DV', color: 'g', year: 'lecture', title: 'Employee-first culture', story: 'The kidney care provider believes the attitude staff bring to the clinic affects patients’ quality of care and life.', lesson: 'Service profit chain: satisfied employees create satisfied customers.' },
    { co: 'Admiral Group', logo: 'AG', color: 'p', year: 'lecture', title: 'Fun at work', story: 'The UK insurer puts fun into the workplace and has been named the best company to work for in the UK.', lesson: 'Positive emotional episodes build positive attitudes.' }
  ],
  code: [],
  beyond: [
    { skill: 'communication', why: 'Emotional intelligence is what makes code review comments land well instead of hurting.' },
    { skill: 'observability', why: 'On-call work and production incidents are classic stressors; good alerts and runbooks reduce overload and low task control.' }
  ],
  cards: [
    ['Two features of every emotion', 'Evaluation (good or bad) and activation (energy).'],
    ['Cognitive dissonance', 'Discomfort when beliefs, feelings and behaviour don’t match; usually fixed by changing beliefs/feelings.'],
    ['Deep vs surface acting', 'Deep: actually feel the required emotion. Surface: fake it. Deep acting reduces emotional dissonance.'],
    ['EVLN', 'Exit, Voice, Loyalty, Neglect.'],
    ['Affective vs continuance commitment', 'Affective: emotional attachment. Continuance: staying because leaving costs too much.'],
    ['General adaptation syndrome', 'Alarm reaction, resistance, exhaustion.'],
    ['Five ways to manage stress', 'Remove, withdraw, change perceptions, control consequences, social support.']
  ],
  quiz: [
    { q: 'An unhappy employee suggests improvements to the manager. This EVLN response is…', o: ['Exit', 'Voice', 'Loyalty', 'Neglect'], a: 1, why: 'Voice is active and constructive.' },
    { q: 'The highest level of emotional intelligence is…', o: ['Knowing own emotions', 'Managing own emotions', 'Knowing others’ emotions', 'Managing others’ emotions'], a: 3, why: 'Managing others’ emotions builds on the lower three.' },
    { q: 'Staying in a job only because of the pension is…', o: ['Affective commitment', 'Continuance commitment', 'Engagement', 'Loyalty'], a: 1, why: 'Calculative attachment: too costly to quit.' }
  ],
  tutorial: { no: 4, source: 'TUTORIAL-(4)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 4, q: 'Define emotions and the two features of all emotional episodes.', a: `<p>Psychological, behavioural and physiological episodes toward an object, person or event that create a <b>state of readiness</b>; mostly without awareness. Features: <b>evaluation</b> (core affect: something is good or bad) and <b>activation</b> (generate energy/effort).</p>` },
    { n: 'Q1(b)', m: 6, q: 'Describe the traditional attitude model and why same beliefs/feelings can lead to different outcomes.', a: `<ol><li><b>Beliefs</b>: perceived facts from experience and learning.</li><li><b>Feelings</b>: the combined valence of those beliefs. Same beliefs can give different feelings because people weigh each belief differently.</li><li><b>Behavioural intentions</b>: motivation to act. Same feelings can give different intentions because of past experience, personality and values.</li><li><b>Behaviour</b>: depends on intentions plus ability and situation.</li></ol>` },
    { n: 'Q2(a)', m: 5, q: 'Explain the role of emotions in attitudes: emotional markers, recall, and cognitive vs emotional conflict.', a: `<ul><li>Incoming information is tagged with <b>emotional markers</b>.</li><li><b>Recalling</b> the information re-activates those markers, so we feel the emotion again.</li><li>Cumulative emotional episodes shape our feelings and beliefs about the object; we "listen in" on our emotions.</li><li>Cognitive (logical) and emotional processes can <b>conflict</b>: we may "know" something is fine but feel it is not.</li><li>Emotions can also affect behaviour directly (facial expressions).</li></ul>` },
    { n: 'Q2(b)', m: 5, q: 'Define cognitive dissonance, how it is resolved, and why that method is preferred.', a: `<p>An emotional experience caused by perceiving that beliefs, feelings and behaviour are inconsistent. People usually reduce it by <b>changing beliefs or feelings</b> about the object, because past behaviour is visible and hard to undo or change.</p>` },
    { n: 'Q3(a)', m: 4, q: 'Define emotional labour, what increases it, and cultural influences.', a: `<p>The effort, planning and control needed to express organisationally desired emotions. Higher when displays are <b>frequent and long</b>, need a <b>variety</b> of emotions, and are <b>intense</b>. Cultures differ: emotional display is discouraged in Ethiopia and Japan, expected in Kuwait and Spain.</p>` },
    { n: 'Q3(b)', m: 3, q: 'Explain emotional dissonance and two solutions.', a: `<p>Conflict between the emotions we truly feel and those we must display. Solutions: see emotional labour as a <b>professional skill</b>; use <b>deep acting</b> (change true emotions to match) instead of surface acting.</p>` },
    { n: 'Q3(c)', m: 3, q: 'Define emotional intelligence and its four components in hierarchy.', a: `<p>A set of abilities to perceive and express, assimilate, understand and regulate emotion in oneself and others. From lowest to highest: (1) <b>know own emotions</b>, (2) <b>manage own emotions</b>, (3) <b>know others' emotions</b>, (4) <b>manage others' emotions</b>.</p>` },
    { n: 'Q4(a)', m: 2, q: 'Define job satisfaction and what it encompasses.', a: `<p>A person's evaluation of their job and work context: an appraisal of <b>perceived job characteristics and work environment</b> and <b>emotional experiences at work</b>.</p>` },
    { n: 'Q4(b)', m: 4, q: 'Describe the EVLN model, active/passive and constructive/destructive.', a: `<ul><li><b>Exit</b>: leaving, quitting, transferring. Active, destructive.</li><li><b>Voice</b>: changing the situation, problem solving, complaining. Active, constructive.</li><li><b>Loyalty</b>: patiently waiting for improvement. Passive, constructive.</li><li><b>Neglect</b>: reducing effort and quality, more absence. Passive, destructive.</li></ul>` },
    { n: 'Q4(c)', m: 4, q: 'Explain the satisfaction-performance relationship and why "happy worker = productive worker" is weak.', a: `<p>Happy workers are somewhat more productive, but the link is weak because: (1) job satisfaction is a <b>general attitude</b> while performance is <b>specific behaviour</b>; (2) employees often have <b>little control</b> over their output; (3) performance is often <b>not rewarded</b>, so it does not raise satisfaction either.</p>` },
    { n: 'Q5(a)', m: 4, q: 'Distinguish affective and continuance commitment and their impact.', a: `<ul><li><b>Affective</b>: emotional attachment to, identification with, involvement in the firm → lower turnover, higher motivation and citizenship.</li><li><b>Continuance</b>: calculative attachment; stay because of no alternative or high cost of leaving → lower turnover but also lower performance, citizenship and cooperation.</li></ul>` },
    { n: 'Q5(b)', m: 5, q: 'Five factors that build affective commitment.', a: `<ol><li><b>Justice and support</b>: humanitarian values, support well-being.</li><li><b>Shared values</b>: values congruence.</li><li><b>Trust</b>: employees trust leaders; job security supports it.</li><li><b>Organisational comprehension</b>: know the firm's past, present and future; open, rapid communication.</li><li><b>Employee involvement</b>: feel part of the company; involvement shows trust.</li></ol>` },
    { n: 'Q5(c)', m: 1, q: 'Briefly explain the service profit chain (DaVita).', a: `<p>Satisfied employees create a positive mood with customers and stay longer (consistent, familiar service), which raises customer satisfaction and profits. DaVita's employee-first culture improves patient care.</p>` },
    { n: 'Q6(a)', m: 4, q: 'Define stress, eustress vs distress, and the three GAS stages.', a: `<p>An adaptive response to situations perceived as challenging or threatening to well-being. <b>Eustress</b>: positive, energising; <b>distress</b>: harmful. GAS: <b>alarm reaction</b> (energy drops, then mobilises), <b>resistance</b> (fight the stressor), <b>exhaustion</b> (resources used up, illness risk).</p>` },
    { n: 'Q6(b)', m: 2, q: 'Four common workplace stressors.', a: `<p>Harassment, incivility, work overload, low task control.</p>` },
    { n: 'Q6(c)', m: 4, q: 'Five strategies for managing stress and the individual differences that help.', a: `<p><b>Strategies:</b> remove the stressor (work-life balance), withdraw from it (vacations, breaks), change stress perceptions (positive self-concept, humour), control consequences (fitness, wellness), receive social support.</p><p><b>Individual differences:</b> good physical health, effective coping strategies, low neuroticism and high extraversion, positive self-concept, low workaholism.</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(4): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab: emotions, dissonance and labour, EI, satisfaction, commitment, stress.</p>` }
  ] }
}
];
export default chapters;
