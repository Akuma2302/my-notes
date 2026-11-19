/* Organisational Behaviour topics 10-13. Notes summarised from the lecture slides; tutorial answers written from them. */
const chapters = [
{
  id: 'ob10', subject: 'ob', num: 10, theme: 'team', title: 'Conflict and negotiation', short: 'Conflict',
  lecture: 'Topic-10-(Conflict and negotiation in the workplace)',
  summary: 'Good and bad outcomes of conflict, task vs relationship conflict, the conflict process, structural sources, five handling styles and when to use each, six structural approaches, third-party intervention, and negotiation (claiming and creating value, BATNA).',
  sections: [
    { h: 'Is conflict good or bad?', pics: [{ compare: { a: { title: 'Negative outcomes', color: 'r', items: ['Wastes time, energy', 'Less info sharing', 'More politics', 'Dissatisfaction, stress', 'Weaker team cohesion'] }, b: { title: 'Positive outcomes', color: 'g', items: ['Fuller debate', 'Assumptions questioned', 'More creative ideas', 'Responsive to environment', 'Cohesion vs other teams'] } }, title: 'Outcomes of conflict' }], body: `
      <p><b>Task (constructive) conflict</b>: focus on the issue, respect other views, try to understand their logic. <b>Relationship conflict</b>: focus on people, undermine each other's worth, strong negative emotions.</p>
      <p>Goal: encourage task conflict and minimise relationship conflict. Problem: task conflict often turns into relationship conflict. Prevent it with <b>emotional intelligence</b>, a <b>cohesive team</b> and <b>supportive norms</b>.</p>` },
    { h: 'Conflict process and sources', pics: [{ flow: [['Structural sources'], ['Conflict perceptions and emotions'], ['Manifest conflict', 'Behaviour'], ['Conflict outcomes']], color: 'c', title: 'Conflict process (with escalation cycle)' }, { cards: ['Incompatible goals', 'Differentiation', 'Interdependence', 'Scarce resources', 'Ambiguous rules', 'Communication problems'].map(t => ({ t, c: 'c' })), cols: 2, h: 42, title: 'Structural sources' }], body: `
      <ul><li><b>Incompatible goals</b>: one party's goals interfere with the other's.</li><li><b>Differentiation</b>: different values and beliefs (cross-cultural, generational, merger conflict).</li><li><b>Interdependence</b>: more chance to interfere with each other.</li><li><b>Scarce resources</b>: competition for them.</li><li><b>Ambiguous rules</b>: uncertainty, threat, politics.</li><li><b>Communication problems</b>: stereotypes, less motivation to talk, arrogant language.</li></ul>` },
    { h: 'Five conflict handling styles', pics: [{ cards: [{ t: 'Problem solving', s: 'High assertive + high cooperative', c: 'g' }, { t: 'Forcing', s: 'High assertive, low cooperative', c: 'r' }, { t: 'Compromising', s: 'Middle', c: 'a' }, { t: 'Avoiding', s: 'Low assertive, low cooperative', c: 'x' }, { t: 'Yielding', s: 'Low assertive, high cooperative', c: 't' }], cols: 2, title: 'Assertiveness × cooperativeness' }], body: `
      <ul><li><b>Problem solving</b>: best when interests aren't perfectly opposed, there is trust, issues are complex. Risk: the other side may exploit your information.</li><li><b>Forcing</b>: deep conviction, quick resolution, other side would exploit cooperation. Risk: relationship damage.</li><li><b>Avoiding</b>: emotionally charged conflict, resolution costs more than benefits. Risk: unresolved, frustration.</li><li><b>Yielding</b>: other side has much more power, issue matters little to you, your position is weak. Risk: raises their expectations.</li><li><b>Compromising</b>: equal power, quick solution, low trust. Risk: suboptimal when mutual gains are possible.</li></ul>
      <p>Xerox's CEO warned her company used too much avoiding: "civil and kind, but frank".</p>` },
    { h: 'Structural approaches and third parties', pics: [{ cards: [{ t: 'Arbitration', s: 'High outcome control', c: 'r' }, { t: 'Inquisition', s: 'High process + outcome', c: 'c' }, { t: 'Mediation', s: 'High process, low outcome', c: 'g' }], cols: 3, title: 'Third-party intervention' }], body: `
      <ol><li><b>Superordinate goals</b>: emphasise common objectives.</li><li><b>Reduce differentiation</b>: e.g. rotate employees between jobs.</li><li><b>Improve communication and understanding</b>: dialogue, contact hypothesis, Johari window (after reducing differentiation).</li><li><b>Reduce interdependence</b>: buffers, integrators, combine jobs.</li><li><b>Increase resources</b>.</li><li><b>Clarify rules and procedures</b>, roles and responsibilities.</li></ol>
      <p>Managers prefer the <b>inquisitional</b> approach, but <b>mediation</b> usually gives the highest satisfaction. Use <b>arbitration</b> if mediation fails.</p>` },
    { h: 'Negotiation', pics: [{ flow: [['Your initial position'], ['Your target'], ['Your resistance point'], ['Area of potential agreement', 'Between both resistance points'], ['Opponent positions']], dir: 'h', color: 'p', title: 'Bargaining zone' }], body: `
      <p><b>Claiming value</b> (best outcome for you): prepare and set goals, know your <b>BATNA</b> (best alternative to a negotiated agreement), manage time, manage first offers and concessions.</p>
      <p><b>Creating value</b> (best outcome for both): gather information, discover priorities through offers and concessions, build the relationship (trust).</p>
      <p><b>Situational influences:</b> location (own turf is easier), physical setting (seating), audience (more competitive, fewer concessions when watched).</p>` }
  ],
  links: [
    { to: 'ob7', topic: 'Storming stage', text: 'Conflict is normal in the storming stage of team development (Topic 7).' },
    { to: 'ob3', topic: 'Johari window', text: 'Improving understanding uses the Johari window and contact hypothesis from Topic 3.' },
    { to: 'ob4', topic: 'Emotional intelligence', text: 'EI (Topic 4) keeps task conflict from becoming relationship conflict.' },
    { to: 'ob9', topic: 'Power', text: 'Relative power decides whether yielding or forcing makes sense.' }
  ],
  mindmaps: [{ center: 'Conflict', branches: [
    { label: 'Good or bad', color: 'p', kids: ['5 negative outcomes', '5 positive outcomes'] },
    { label: 'Types', color: 'p', kids: ['Task: issue focus', 'Relationship: people focus', 'EI, cohesion, norms'] },
    { label: 'Sources', color: 'c', kids: ['Goals, differentiation', 'Interdependence, resources', 'Rules, communication'] },
    { label: 'Styles', color: 'a', kids: ['Problem solving', 'Forcing, avoiding', 'Yielding, compromising'] },
    { label: 'Structural fixes', color: 'g', kids: ['Superordinate goals', 'Reduce differentiation', 'Resources, rules'] },
    { label: 'Negotiation', color: 't', kids: ['Bargaining zone', 'Claim value, BATNA', 'Create value', 'Location, audience'] }
  ] }],
  cases: [
    { co: 'L’Oréal Canada', logo: 'LO', color: 'p', year: 'lecture', title: 'Valorizing intergenerational differences', story: 'Training helped employees from different generations understand each other, reducing dysfunctional conflict.', lesson: 'Reducing differentiation and improving understanding.' },
    { co: 'Xerox', logo: 'XR', color: 'c', year: 'lecture', title: '“Too nice”', story: 'CEO Ursula Burns said the company used too much avoidance: “We are really, really, really nice… but we have to be frank.”', lesson: 'Avoiding leaves task conflict unresolved; constructive conflict is needed.' }
  ],
  code: [
    { title: 'Bargaining zone check', lang: 'Python', explain: 'An agreement is possible only if the buyer’s resistance (maximum) is above the seller’s resistance (minimum).', src: String.raw`def zone_of_agreement(seller_min, buyer_max):
    if buyer_max < seller_min:
        return None                     # no deal: walk away to your BATNA
    return (seller_min, buyer_max)

print(zone_of_agreement(seller_min=3200, buyer_max=3600))  # (3200, 3600)
print(zone_of_agreement(seller_min=4000, buyer_max=3600))  # None` }
  ],
  beyond: [
    { skill: 'communication', why: 'Code review disagreements are task conflict; keep them about the code, not the person.' },
    { skill: 'agile', why: 'Retrospectives are a structured, safe place for task conflict.' },
    { skill: 'estimation', why: 'Negotiating scope and deadlines with clients uses BATNA and value creation.' }
  ],
  cards: [
    ['Task vs relationship conflict', 'Task: focus on the issue. Relationship: focus on the person.'],
    ['Three conditions that limit relationship conflict', 'Emotional intelligence, cohesive team, supportive norms.'],
    ['Five conflict handling styles', 'Problem solving, forcing, avoiding, yielding, compromising.'],
    ['Six structural approaches', 'Superordinate goals, reduce differentiation, improve communication, reduce interdependence, increase resources, clarify rules.'],
    ['BATNA', 'Best alternative to a negotiated agreement.'],
    ['Third-party strategy with highest satisfaction', 'Mediation.']
  ],
  quiz: [
    { q: 'Both sides have equal power and need a quick solution with low trust. Best style?', o: ['Problem solving', 'Compromising', 'Avoiding', 'Yielding'], a: 1, why: 'Compromising fits equal power, speed and low trust.' },
    { q: '“Let’s focus on keeping the customer happy” to unite two departments is…', o: ['Reducing interdependence', 'Superordinate goal', 'Arbitration', 'Forcing'], a: 1, why: 'Emphasising a common objective.' },
    { q: 'Negotiators make fewer concessions when…', o: ['On their own turf', 'An audience is watching', 'They know their BATNA', 'They create value'], a: 1, why: 'Audiences make negotiators more competitive.' }
  ],
  tutorial: { no: 10, source: 'TUTORIAL-(10)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 5, q: 'Five negative outcomes of conflict.', a: `<p>Wastes time, energy and resources; less information sharing and productivity; more organisational politics; more dissatisfaction, turnover and stress; weaker team cohesion (conflict within the team).</p>` },
    { n: 'Q1(b)', m: 5, q: 'Five positive outcomes of conflict.', a: `<p>Fuller debate of choices; assumptions questioned; more creative ideas; better responsiveness to the environment; higher team cohesion when conflict is with other teams.</p>` },
    { n: 'Q2(a)', m: 4, q: 'Task vs relationship conflict.', a: `<p><b>Task</b>: parties focus on the issue, respect people with other views, try to understand each position's logic. <b>Relationship</b>: parties focus on personal characteristics, try to undermine each other's worth or competence, with strong negative emotions.</p>` },
    { n: 'Q2(b)', m: 3, q: 'Why encourage task conflict but minimise relationship conflict? Common problem?', a: `<p>Task conflict improves decisions and creativity; relationship conflict damages trust and cooperation. The problem: task conflict often turns into relationship conflict because people take criticism of ideas personally.</p>` },
    { n: 'Q2(c)', m: 3, q: 'Three conditions that minimise relationship conflict.', a: `<p>Emotional intelligence, a cohesive team, supportive team norms.</p>` },
    { n: 'Q3(a)', m: 2, q: 'Outline the conflict process.', a: `<p>Structural sources → conflict perceptions and emotions → manifest conflict (behaviour) → outcomes, with an escalation cycle between perceptions and manifest conflict.</p>` },
    { n: 'Q3(b)', m: 8, q: 'Four structural sources of conflict.', a: `<ul><li><b>Incompatible goals</b>: one party's goals seem to block the other's.</li><li><b>Differentiation</b>: different values and beliefs (generations, cultures, mergers).</li><li><b>Interdependence</b>: more chances to interfere with each other.</li><li><b>Scarce resources</b>: motivates competition for them.</li></ul><p>(Also ambiguous rules and communication problems.)</p>` },
    { n: 'Q4(a)', m: 5, q: 'Five conflict handling styles.', a: `<p>Problem solving (win-win), forcing (win-lose), avoiding, yielding (give in), compromising (split the difference). Based on assertiveness and cooperativeness.</p>` },
    { n: 'Q4(b)', m: 5, q: 'When each style fits and one problem each.', a: `<ul><li><b>Problem solving</b>: interests not perfectly opposed, trust, complex issues. Problem: other side may exploit shared info.</li><li><b>Forcing</b>: strong conviction, quick decision, other would exploit you. Problem: relationship conflict.</li><li><b>Avoiding</b>: emotionally charged, cost > benefit. Problem: not resolved, frustration.</li><li><b>Yielding</b>: other has much more power, issue less important to you, your logic is weak. Problem: raises other's expectations.</li><li><b>Compromising</b>: equal power, quick solution, low trust. Problem: suboptimal when mutual gains are possible.</li></ul>` },
    { n: 'Q5(a)', m: 6, q: 'Six structural strategies to reduce conflict.', a: `<p>Emphasise superordinate goals; reduce differentiation; improve communication and understanding; reduce interdependence (buffers, integrators, combine jobs); increase resources; clarify rules and procedures.</p>` },
    { n: 'Q5(b)', m: 4, q: 'Three third-party strategies; which managers prefer and which satisfies most.', a: `<p><b>Arbitration</b> (high outcome control), <b>inquisition</b> (high process and outcome control), <b>mediation</b> (high process, low outcome control). Managers prefer inquisition; mediation usually gives highest satisfaction; use arbitration when mediation fails.</p>` },
    { n: 'Q6(a)', m: 2, q: 'Claiming vs creating value.', a: `<p><b>Claiming</b>: aim for the best outcome for yourself and your side. <b>Creating</b>: use problem solving so both parties reach the best outcome.</p>` },
    { n: 'Q6(b)', m: 4, q: 'Four strategies for claiming value.', a: `<p>Prepare and set goals; know your BATNA; manage time; manage first offers and concessions.</p>` },
    { n: 'Q6(c)', m: 3, q: 'Three strategies for creating value.', a: `<p>Gather information; discover priorities through offers and concessions; build the relationship (trustworthiness).</p>` },
    { n: 'Q6(d)', m: 1, q: 'Three situational factors in negotiation.', a: `<p>Location, physical setting, audience.</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(10): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob11', subject: 'ob', num: 11, theme: 'org', title: 'Leadership in organisational settings', short: 'Leadership',
  lecture: 'Topic-11-(Leadership in organisational settings)',
  summary: 'Leadership and shared leadership, transformational leadership (vision, model, experiment, commitment), managerial leadership (task vs people, path-goal, situational, Fiedler), implicit leadership, eight leader competencies and authentic leadership.',
  sections: [
    { h: 'What is leadership?', body: `
      <p>The ability to <b>influence, motivate and enable</b> others to contribute toward the effectiveness of the organisation.</p>
      <p><b>Shared leadership</b>: leadership is a <b>role</b>, not a position; employees lead each other (e.g. champion ideas). Flourishes when formal leaders delegate, the culture is collaborative, and employees have influence skills.</p>
      <p><b>Lecture example:</b> Telstra CEO David Thodey re-engaged staff with a customer-centric vision and modelled it himself.</p>` },
    { h: 'Transformational leadership', pics: [{ cycle: [['Develop and communicate a vision'], ['Model the vision', 'Walk the talk'], ['Encourage experimentation'], ['Build commitment to the vision']], center: 'Transform', color: 'p', title: 'Transformational leadership' }], body: `
      <p><b>Vision</b>: an idealised future state with a higher purpose. Effective visions are linked to personal values, fulfil multiple stakeholder needs, are challenging, abstract (so stable over time) and a unifying ideal.</p>
      <p>Communicate it with <b>framing</b>, sincerity and passion, symbols and metaphors. <b>Model</b> it through your own behaviour (builds trust). <b>Encourage experimentation</b> and questioning. <b>Build commitment</b> through communication, modelling, experimentation, rewards and celebrations.</p>
      <p><b>Outcomes:</b> higher satisfaction, performance, citizenship, creativity. <b>Limitations:</b> circular logic, mixed models (behaviours and competencies), assumes a universal theory.</p>` },
    { h: 'Managerial leadership', pics: [{ compare: { a: { title: 'Task-oriented', color: 'p', items: ['Assign work, clarify', 'Set goals, deadlines', 'Feedback, procedures'] }, b: { title: 'People-oriented', color: 't', items: ['Concern for needs', 'Pleasant workplace', 'Recognise, listen'] } }, title: 'Two leadership styles' }], body: `
      <p>Daily activities that support and guide individual performance and well-being toward <b>current</b> objectives. Assumes a <b>stable</b> environment and is <b>micro-focused</b>, while transformational leadership is about change and the big picture. The two are <b>interdependent</b>.</p>` },
    { h: 'Path-goal and other contingency theories', pics: [{ cards: [{ t: 'Directive', s: 'Structure, task focus', c: 'p' }, { t: 'Supportive', s: 'People focus', c: 't' }, { t: 'Participative', s: 'Involve employees', c: 'c' }, { t: 'Achievement-oriented', s: 'Stretch goals', c: 'a' }], cols: 2, title: 'Path-goal styles' }], body: `
      <p>Choose the style that best raises employee expectations about performance and outcomes.</p>
      <ul><li><b>Low skill/experience</b>: directive and supportive.</li><li><b>Internal locus</b>: participative and achievement; external: directive and supportive.</li><li><b>Nonroutine task</b>: directive and/or participative.</li><li><b>Team</b>: low cohesion → supportive; dysfunctional norms → directive.</li></ul>
      <p><b>Situational leadership model</b>: telling, selling, participating, delegating by follower ability and motivation; popular but weak research. <b>Fiedler</b>: style is stable (personality), best style depends on situational control; points out leaders have a preferred style.</p>` },
    { h: 'Implicit leadership and competencies', pics: [{ cards: ['Personality', 'Self-concept', 'Drive', 'Integrity', 'Leadership motivation', 'Knowledge of the business', 'Cognitive and practical intelligence', 'Emotional intelligence'].map(t => ({ t, c: 'p' })), cols: 2, h: 40, title: 'Eight leadership competencies' }], body: `
      <p><b>Implicit leadership</b>: followers' perceptions. <b>Prototypes</b>: preconceived beliefs about effective leaders; leaders who fit get better ratings. <b>Romance of leadership</b>: we over-credit leaders for success, to simplify explanations and feel in control.</p>
      <p><b>Authentic leadership</b>: self-reflection, feedback from trusted sources, know your life story, develop your own style, apply your values, keep a positive self-evaluation.</p>
      <p><b>Competency perspective limits:</b> universal approach, views leadership within the person (but it is relational), competencies show potential not performance.</p>` }
  ],
  links: [
    { to: 'ob9', topic: 'Influence', text: 'Leadership is influence, using the power bases from Topic 9.' },
    { to: 'ob13', topic: 'Change agents', text: 'Topic 13: change agents use transformational leadership and a strategic vision.' },
    { to: 'ob12', topic: 'Leaders shape culture', text: 'Founders and leaders change and strengthen culture (Topic 12).' },
    { to: 'ob2', topic: 'Personality', text: 'Extraversion and conscientiousness from Topic 2 are leadership competencies.' }
  ],
  mindmaps: [{ center: 'Leadership', branches: [
    { label: 'Definition', color: 'p', kids: ['Influence, motivate, enable', 'Shared leadership'] },
    { label: 'Transformational', color: 'p', kids: ['Vision', 'Model it', 'Experiment', 'Build commitment'] },
    { label: 'Managerial', color: 't', kids: ['Task vs people', 'Stable, micro focus', 'Interdependent'] },
    { label: 'Contingency', color: 'c', kids: ['Path-goal: 4 styles', 'Situational model', 'Fiedler'] },
    { label: 'Implicit', color: 'a', kids: ['Prototypes', 'Romance of leadership'] },
    { label: 'Competencies', color: 'g', kids: ['8 competencies', 'Authentic leadership', '3 limitations'] }
  ] }],
  cases: [
    { co: 'Telstra', logo: 'TL', color: 'p', year: 'lecture', title: 'David Thodey', story: 'The Australian telecom CEO re-engaged staff through a customer-centric vision and symbolised it through his own behaviour.', lesson: 'Transformational leadership: communicate and model the vision.' },
    { co: 'Microsoft', logo: 'MS', color: 't', year: '2014→', title: 'Satya Nadella', story: 'After becoming CEO, Nadella pushed a “growth mindset” and collaboration over internal competition, and Microsoft’s culture and market value were transformed.', lesson: 'Vision plus modelling changes how thousands of people work.' }
  ],
  code: [],
  beyond: [
    { skill: 'agile', why: 'Scrum Masters practise shared and servant leadership: they lead without formal authority.' },
    { skill: 'communication', why: 'Communicating a vision with metaphors and stories is a skill tech leads need too.' }
  ],
  cards: [
    ['Define leadership', 'Ability to influence, motivate and enable others to contribute to organisational effectiveness.'],
    ['Four elements of transformational leadership', 'Develop/communicate vision, model the vision, encourage experimentation, build commitment.'],
    ['Five features of an effective vision', 'Linked to values, meets stakeholder needs, challenging, abstract, unifying.'],
    ['Four path-goal styles', 'Directive, supportive, participative, achievement-oriented.'],
    ['Romance of leadership', 'Overstating a leader’s effect on success, to simplify explanations and feel in control.'],
    ['Situational leadership styles', 'Telling, selling, participating, delegating.']
  ],
  quiz: [
    { q: 'New, inexperienced staff on a nonroutine task need mainly…', o: ['Achievement-oriented', 'Directive', 'Delegating', 'Participative only'], a: 1, why: 'Low skill and nonroutine tasks call for directive leadership.' },
    { q: '“Walking the talk” is…', o: ['Framing the vision', 'Modelling the vision', 'Building commitment', 'Experimenting'], a: 1, why: 'Enacting the vision through own behaviour.' },
    { q: 'Fiedler’s unique point is that…', o: ['Leaders easily change style', 'Leaders have a stable preferred style', 'Followers choose leaders', 'Vision is enough'], a: 1, why: 'Style is based on personality.' }
  ],
  tutorial: { no: 11, source: 'TUTORIAL-(11)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 3, q: 'Define leadership and its three key elements.', a: `<p>The ability to <b>influence</b>, <b>motivate</b> and <b>enable</b> others to contribute toward the effectiveness of the organisations of which they are members.</p>` },
    { n: 'Q1(b)', m: 4, q: 'Shared leadership and three conditions.', a: `<p>Leadership is a role anyone can play, not a position held by one person; employees lead each other. Flourishes when formal leaders delegate power, the culture is collaborative, and employees develop influence skills.</p>` },
    { n: 'Q1(c)', m: 3, q: 'Example of an effective leader from the reading.', a: `<p>David Thodey, CEO of Telstra, transformed the company by re-engaging staff with a customer-centric vision and personally symbolising it through his behaviour.</p>` },
    { n: 'Q2(a)', m: 5, q: 'Define vision and five features of an effective vision.', a: `<p>An idealised future state with a higher purpose. Features: linked to personal values; fulfils multiple stakeholder needs; challenging objective; abstract future state (stable over time); a unifying ideal.</p>` },
    { n: 'Q2(b)', m: 4, q: 'Four activities to embed a vision.', a: `<p>Develop and communicate the vision; model the vision; encourage experimentation; build commitment to the vision.</p>` },
    { n: 'Q2(c)', m: 1, q: 'Developing vs modelling a vision.', a: `<p>Developing creates and communicates the picture of the future; modelling means enacting it through the leader's own behaviour ("walking the talk").</p>` },
    { n: 'Q3(a)', m: 2, q: 'Positive outcomes of transformational leadership.', a: `<p>Higher satisfaction, performance, organisational citizenship and creativity.</p>` },
    { n: 'Q3(b)', m: 3, q: 'Three limitations of transformational leadership theory.', a: `<p>Circular logic (defined by its outcomes); mixed models of behaviours and competencies; assumed to be universal for all situations.</p>` },
    { n: 'Q3(c)', m: 5, q: 'Define managerial leadership; differences and interdependence.', a: `<p>Daily activities that support and guide performance and well-being toward current objectives. It assumes a stable environment and is micro-focused, while transformational leadership handles change and the big picture. They are interdependent: a vision needs daily managerial leadership to be achieved, and managing needs direction from a vision.</p>` },
    { n: 'Q4(a)', m: 4, q: 'Task vs people-oriented behaviours, two examples each.', a: `<p><b>Task</b>: assign work and clarify responsibilities; set goals and deadlines. <b>People</b>: show concern for employee needs; recognise contributions and listen.</p>` },
    { n: 'Q4(b)', m: 3, q: 'Core principle of path-goal theory and its four styles.', a: `<p>Effective leaders choose the style that best influences employee expectations about achieving performance and satisfaction with outcomes. Styles: directive, supportive, participative, achievement-oriented.</p>` },
    { n: 'Q4(c)', m: 3, q: 'Four path-goal contingencies.', a: `<p>Employee skill and experience; locus of control; task structure; team dynamics.</p>` },
    { n: 'Q5(a)', m: 3, q: 'Situational leadership model and limitation.', a: `<p>Styles: telling, selling, participating, delegating; best style depends on follower ability and motivation. Popular but lacks research support.</p>` },
    { n: 'Q5(b)', m: 2, q: 'Fiedler\'s contingency model and its contribution.', a: `<p>Leadership style is stable (based on personality) and the best style depends on situational control. It uniquely points out that leaders have a preferred style that is not very flexible.</p>` },
    { n: 'Q5(c)', m: 5, q: 'Implicit leadership: prototypes and romance of leadership.', a: `<p>Leadership as perceived by followers. <b>Prototypes</b>: preconceived beliefs about features and behaviours of effective leaders; leaders who fit are rated better. <b>Romance of leadership</b>: we amplify a leader's effect on success, to simplify explanations and satisfy our need for situational control.</p>` },
    { n: 'Q6(a)', m: 8, q: 'Eight leadership competencies.', a: `<ol><li><b>Personality</b>: extraversion, conscientiousness.</li><li><b>Self-concept</b>: complex, consistent, clear, positive.</li><li><b>Drive</b>: inner motivation, inquisitive, action-oriented.</li><li><b>Integrity</b>: truthful, consistent words and actions.</li><li><b>Leadership motivation</b>: need for socialised power.</li><li><b>Knowledge of the business</b>.</li><li><b>Cognitive and practical intelligence</b>.</li><li><b>Emotional intelligence</b>.</li></ol>` },
    { n: 'Q6(b)', m: 2, q: 'Advice for developing yourself as a leader.', a: `<p>Authentic leadership: engage in self-reflection and get feedback from trusted sources (know your life story); develop your own style; apply your values and maintain a positive core self-evaluation.</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(11): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob12', subject: 'ob', num: 12, theme: 'org', title: 'Organisational culture', short: 'Culture',
  lecture: 'Topic-12-(Organisational culture)',
  summary: 'What culture is, its content and profile dimensions, subcultures and countercultures, artifacts (stories, rituals, language, buildings), culture strength and effectiveness, merging cultures (bicultural audit), and five ways to change or strengthen culture incl. ASA theory and socialisation.',
  sections: [
    { h: 'What is organisational culture?', pics: [{ flow: [['Artifacts', 'Visible: stories, rituals, buildings'], ['Shared values', 'Stated and real'], ['Shared assumptions', 'Unconscious, taken for granted']], color: 'p', title: 'Elements of culture (iceberg)' }], body: `
      <p>The <b>values and assumptions shared</b> within an organisation. It defines what is important and the "right way" to do things. Like the company's <b>DNA</b>: invisible but a powerful template for behaviour.</p>
      <p><b>Content</b>: the relative ordering of values; a few dominant ones (e.g. Facebook: creative, proactive, risk-oriented). Measuring culture oversimplifies values, ignores assumptions and assumes integration, while real culture is <b>fuzzy</b> (subcultures; values live in individuals).</p>` },
    { h: 'Culture profile and subcultures', pics: [{ cards: ['Innovation', 'Stability', 'Respect for people', 'Outcome orientation', 'Attention to detail', 'Team orientation', 'Aggressiveness'].map(t => ({ t, c: 't' })), cols: 2, h: 40, title: 'Organisational Culture Profile (O’Reilly 1991)' }], body: `
      <p><b>Dominant culture</b>: most widely shared values. <b>Subcultures</b> can enhance or oppose it (<b>countercultures</b>). Countercultures provide surveillance, critique and ethics, and are a source of emerging values.</p>` },
    { h: 'Artifacts', pics: [{ cards: [{ t: 'Stories and legends', s: 'Real people, true, prescriptive', c: 'a' }, { t: 'Rituals and ceremonies', s: 'Routines; award events', c: 'a' }, { t: 'Language', s: 'How people talk', c: 'a' }, { t: 'Physical structures', s: 'Buildings, offices, decor', c: 'a' }], cols: 2, title: 'Four types of artifacts' }], body: `
      <p>Observable symbols and signs that <b>maintain and transmit</b> culture. You need many artifacts to decipher a culture accurately.</p>
      <p><b>Goldman Sachs</b>: terms like "elephant trades" and "muppet" clients suggested profit and individual performance were valued above customer service.</p>` },
    { h: 'Strength and effectiveness', body: `
      <p><b>Strength</b>: how widely and deeply employees hold the dominant values; institutionalised through artifacts; often long-lasting back to founders.</p>
      <p><b>Functions:</b> <b>control system</b>, <b>social glue</b>, <b>sense-making</b>.</p>
      <p>Culture helps performance when it <b>fits the environment</b>, is of <b>moderate strength</b> (too strong breeds tunnel vision) and is an <b>adaptive culture</b> (open to change).</p>` },
    { h: 'Merging cultures', pics: [{ cards: [{ t: 'Assimilation', s: 'Acquired firm embraces buyer’s culture', c: 'p' }, { t: 'Deculturation', s: 'Buyer imposes culture on unwilling firm', c: 'r' }, { t: 'Integration', s: 'New composite culture', c: 'g' }, { t: 'Separation', s: 'Both keep their own', c: 't' }], cols: 2, title: 'Four merger strategies' }], body: `
      <p><b>Bicultural audit</b> (due diligence): (1) identify cultural artifacts, (2) analyse data for conflict or compatibility, (3) plan strategies to bridge the cultures.</p>` },
    { h: 'Changing and strengthening culture', pics: [{ flow: [['Outsider', 'Gather info, psychological contract'], ['Newcomer', 'Test expectations'], ['Insider', 'Change roles, resolve conflicts']], dir: 'h', color: 'p', title: 'Stages of socialisation' }], body: `
      <ol><li><b>Actions of founders and leaders</b>.</li><li><b>Aligning artifacts</b>.</li><li><b>Culturally consistent rewards</b>.</li><li><b>Workforce stability and communication</b>.</li><li><b>Attraction, selection and socialisation</b>.</li></ol>
      <p><b>ASA theory</b>: <b>attraction</b> (applicants self-select), <b>selection</b> (hire for value fit), <b>attrition</b> (misfits leave) → more homogeneous, stronger culture.</p>
      <p><b>Socialisation</b>: learning values, behaviours and social knowledge; a <b>learning</b> process and an <b>adjustment</b> process.</p>` }
  ],
  links: [
    { to: 'ob13', topic: 'Changing culture', text: 'Topic 13 gives the change process for transforming culture.' },
    { to: 'ob11', topic: 'Leaders and culture', text: 'Transformational leaders reshape culture (Topic 11).' },
    { to: 'ch9', topic: 'Quality culture', text: 'Software QA Ch 9 (TQM) needs a quality culture: drive out fear, everyone involved.' },
    { to: 'ch10', topic: 'Changing corporate culture', text: 'Software QA Ch 10 lists changing the corporate culture as a way to reduce software risk.' }
  ],
  mindmaps: [{ center: 'Culture', branches: [
    { label: 'Definition', color: 'p', kids: ['Shared values + assumptions', 'Company DNA', 'Content, fuzzy'] },
    { label: 'Profile', color: 't', kids: ['7 dimensions', 'Dominant vs subculture', 'Countercultures'] },
    { label: 'Artifacts', color: 'a', kids: ['Stories', 'Rituals, ceremonies', 'Language', 'Buildings'] },
    { label: 'Strength', color: 'c', kids: ['Control, glue, sense', 'Fit, moderate, adaptive'] },
    { label: 'Mergers', color: 'r', kids: ['Bicultural audit 3 steps', 'Assimilate, deculture', 'Integrate, separate'] },
    { label: 'Change it', color: 'g', kids: ['Leaders, artifacts', 'Rewards, stability', 'ASA, socialisation'] }
  ] }],
  cases: [
    { co: 'Zappos', logo: 'ZP', color: 'p', year: 'lecture', title: 'Culture by design', story: 'The online shoe retailer uses recruitment, selection and socialisation practices to keep a strong culture; it famously offered new hires money to quit after training if they didn’t fit.', lesson: 'ASA theory and socialisation in action.' },
    { co: 'Goldman Sachs', logo: 'GS', color: 'r', year: 'lecture', title: 'Language as an artifact', story: 'Employees’ terms like “elephant trades” and “muppet” clients pointed to values of profit and individual performance over customer service.', lesson: 'Language reveals real (enacted) values.' },
    { co: 'Daimler–Chrysler', logo: 'DC', color: 'c', year: '1998–2007', title: 'Merger of equals that wasn’t', story: 'The German and American companies merged but their cultures clashed; the merger was unwound about nine years later.', lesson: 'Why a bicultural audit and a clear merger strategy matter.' }
  ],
  code: [],
  beyond: [
    { skill: 'devops', why: 'DevOps is as much culture (shared ownership, blameless postmortems) as tools.' },
    { skill: 'docs', why: 'Engineering handbooks and onboarding docs are artifacts that socialise new developers.' },
    { skill: 'agile', why: 'Agile rituals (standups, demos, retros) are cultural artifacts.' }
  ],
  cards: [
    ['Organisational culture', 'Values and assumptions shared within an organisation.'],
    ['Four artifact types', 'Stories/legends, rituals/ceremonies, language, physical structures.'],
    ['Three functions of strong culture', 'Control system, social glue, sense-making.'],
    ['Three conditions for culture to help performance', 'Fits environment, moderate strength, adaptive.'],
    ['Four merger strategies', 'Assimilation, deculturation, integration, separation.'],
    ['ASA theory', 'Attraction, selection, attrition make cultures more homogeneous.']
  ],
  quiz: [
    { q: 'An acquiring firm forces its culture on an unwilling acquired firm. This is…', o: ['Assimilation', 'Deculturation', 'Integration', 'Separation'], a: 1, why: 'Deculturation is imposed.' },
    { q: 'A yearly award night for top performers is a…', o: ['Story', 'Ceremony', 'Ritual', 'Physical structure'], a: 1, why: 'Ceremonies are planned activities for an audience.' },
    { q: 'Why is a very strong culture not always best?', o: ['It is too cheap', 'It can cause tunnel vision and resist change', 'It has no artifacts', 'It lowers glue'], a: 1, why: 'Moderate strength and adaptive cultures perform best.' }
  ],
  tutorial: { no: 12, source: 'TUTORIAL-(12)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 4, q: 'Define organisational culture and why it is the "company\'s DNA".', a: `<p>The values and assumptions shared within an organisation. It defines what is important and the right way of doing things. Like DNA it is invisible, yet a powerful template that shapes employee behaviour.</p>` },
    { n: 'Q1(b)', m: 4, q: 'Content of culture and problems with measuring it.', a: `<p>Content = the relative ordering of values, usually a few dominant ones. Measurement problems: oversimplifies the diversity of values, ignores shared assumptions, and adopts an "integration" view (assumes everyone shares the same culture).</p>` },
    { n: 'Q1(c)', m: 2, q: 'What does "culture is fuzzy" mean?', a: `<p>Culture is not one neat set of values: there are diverse subcultures (fragmentation), and values exist within individuals, not work units.</p>` },
    { n: 'Q2(a)', m: 7, q: 'Seven dimensions of the Organizational Culture Profile.', a: `<ul><li><b>Innovation</b>: experimenting, risk-taking, few rules.</li><li><b>Stability</b>: predictable, secure, rule-oriented.</li><li><b>Respect for people</b>: fairness, tolerance.</li><li><b>Outcome orientation</b>: action and results, high expectations.</li><li><b>Attention to detail</b>: precise, analytic.</li><li><b>Team orientation</b>: collaboration, people-oriented.</li><li><b>Aggressiveness</b>: competitive, low emphasis on social responsibility.</li></ul>` },
    { n: 'Q2(b)', m: 3, q: 'Dominant culture vs subcultures; two functions of countercultures.', a: `<p>Dominant culture = most widely shared values. Subcultures exist throughout the firm and can support or oppose it. Countercultures (1) provide surveillance, critique and ethics, (2) are a source of emerging values.</p>` },
    { n: 'Q3(a)', m: 3, q: 'Define artifacts and their role.', a: `<p>Observable symbols and signs of culture (structures, ceremonies, language, stories). They maintain and transmit culture; many are needed to decipher it accurately.</p>` },
    { n: 'Q3(b)', m: 7, q: 'Four types of artifacts with examples.', a: `<ul><li><b>Stories and legends</b>: describe real people, assumed true, known widely, prescriptive. <i>Founder sleeping in the office to ship the first product.</i></li><li><b>Rituals and ceremonies</b>: programmed routines (how visitors are greeted) and planned events (award nights).</li><li><b>Language</b>: how people address each other and describe stakeholders (<i>Goldman's "muppets"</i>).</li><li><b>Physical structures and symbols</b>: building design, office size, decor (open offices signal equality).</li></ul>` },
    { n: 'Q4(a)', m: 3, q: 'Define culture strength.', a: `<p>How widely and deeply employees hold the dominant values and assumptions: most understand and embrace them, they are institutionalised through artifacts, and long-lasting, often from the founders.</p>` },
    { n: 'Q4(b)', m: 3, q: 'Three functions of strong cultures.', a: `<p>Control system (guides behaviour), social glue (bonds people), sense-making (helps people understand what goes on and why).</p>` },
    { n: 'Q4(c)', m: 4, q: 'Culture and effectiveness: conditions.', a: `<p>Strong culture helps performance and well-being through control, glue and sense-making, but only when it <b>fits the environment</b>, is of <b>moderate strength</b> (not so strong it blocks new ideas), and is <b>adaptive</b> (embraces change).</p>` },
    { n: 'Q5(a)', m: 3, q: 'What is a bicultural audit and why it matters.', a: `<p>Part of due diligence in a merger: diagnosing both companies' cultures to find likely clashes and minimise cultural collision.</p>` },
    { n: 'Q5(b)', m: 3, q: 'Three steps of a bicultural audit.', a: `<p>(1) Identify cultural artifacts, (2) analyse the data for cultural conflict or compatibility, (3) identify strategies and action plans to bridge the cultures.</p>` },
    { n: 'Q5(c)', m: 4, q: 'Four strategies for merging cultures.', a: `<p><b>Assimilation</b>: acquired firm embraces the acquirer's culture. <b>Deculturation</b>: acquirer imposes its culture on an unwilling firm. <b>Integration</b>: combined into a new composite culture. <b>Separation</b>: both stay separate with their own cultures.</p>` },
    { n: 'Q6(a)', m: 5, q: 'Five strategies to change or strengthen culture.', a: `<p>Actions of founders and leaders; aligning artifacts; culturally consistent rewards; workforce stability and communication; attracting, selecting and socialising employees.</p>` },
    { n: 'Q6(b)', m: 3, q: 'Explain ASA theory.', a: `<p>Organisations become more homogeneous through <b>attraction</b> (applicants choose firms with compatible values), <b>selection</b> (firms hire people whose values fit) and <b>attrition</b> (people whose values clash leave). The result is a stronger culture.</p>` },
    { n: 'Q6(c)', m: 2, q: 'Define socialisation and its two processes.', a: `<p>How individuals learn the values, expected behaviours and social knowledge for their role. Processes: <b>learning</b> (make sense of the organisation) and <b>adjustment</b> (adapt to roles and norms).</p>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(12): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
},
{
  id: 'ob13', subject: 'ob', num: 13, theme: 'org', title: 'Organisational change', short: 'Change',
  lecture: 'Topic-13-(Organisational change)',
  summary: 'Lewin’s force field analysis, six reasons people resist change, creating urgency, six strategies to reduce resistance, change agents and strategic vision, diffusing change with the MARS model, and cross-cultural and ethical concerns.',
  sections: [
    { h: 'Force field analysis', pics: [{ compare: { a: { title: 'Driving forces', color: 'g', items: ['External pressures', 'Leader’s vision', 'Push toward change'] }, b: { title: 'Restraining forces', color: 'r', items: ['Resistance to change', 'Complaints, absence', 'Passive noncompliance'] } }, title: 'Lewin’s force field' }, { flow: [['Unfreeze', 'Drive up, restraint down'], ['Change', 'Move to desired state'], ['Refreeze', 'Lock in new behaviour']], dir: 'h', colors: ['a', 'p', 'g'], title: 'Before, during, after change' }], body: `
      <p>Change happens when <b>driving forces</b> become stronger than <b>restraining forces</b>. View resistance as a <b>resource</b>: a symptom of deeper problems, a form of task conflict that can improve decisions, and a form of voice (procedural justice).</p>` },
    { h: 'Why people resist change', pics: [{ cards: ['Negative valence of change', 'Fear of the unknown', 'Not-invented-here syndrome', 'Breaking routines', 'Incongruent team dynamics', 'Incongruent organisational systems'].map(t => ({ t, c: 'r' })), cols: 2, h: 42, title: 'Six reasons' }], body: `
      <ul><li><b>Negative valence</b>: cost-benefit looks bad.</li><li><b>Fear of the unknown</b>: assume the worst, lack of control.</li><li><b>Not-invented-here</b>: oppose to prove own ideas were better.</li><li><b>Breaking routines</b>: leaving the comfort zone takes effort.</li><li><b>Team norms</b> contrary to the change.</li><li><b>Systems</b> (rewards, info systems, authority, careers, selection) reinforce the status quo.</li></ul>` },
    { h: 'Creating urgency', body: `
      <p>Inform employees about the <b>driving forces</b>. Hardest when the organisation is <b>doing well</b>. <b>Customer-driven change</b> adds a human element and shows the consequences of doing nothing. Without external drivers, use persuasive influence and a <b>positive vision</b>, not threats.</p>
      <p><b>LG Group</b>: chairman Koo Bon-moo created urgency to turn Korea's second-largest conglomerate from a follower of Samsung into a proactive leader.</p>` },
    { h: 'Reducing restraining forces', pics: [{ cards: [{ t: '1. Communication', s: 'First priority; costly', c: 'g' }, { t: '2. Learning', s: 'New skills; costly', c: 'g' }, { t: '3. Involvement', s: 'Save face; slow', c: 't' }, { t: '4. Stress management', s: 'Not for everyone', c: 't' }, { t: '5. Negotiation', s: 'Compliance only', c: 'a' }, { t: '6. Coercion', s: 'Last resort; distrust', c: 'r' }], cols: 2, title: 'Six strategies' }], body: `
      <p><b>Communication</b> generates urgency and reduces uncertainty. <b>Learning</b> (incl. coaching) breaks old routines. <b>Involvement</b> (task forces, future search) reduces fear. <b>Stress management</b> when stress remains. <b>Negotiation</b> when people clearly lose something. <b>Coercion</b> only when all else fails: reduces trust, creates subtle resistance and politics.</p>` },
    { h: 'Change agents and diffusion', pics: [{ cards: [{ t: 'M: Motivation', s: 'Reward pilot teams', c: 'p' }, { t: 'A: Ability', s: 'Train others', c: 'p' }, { t: 'R: Role perceptions', s: 'Translate to new settings', c: 'p' }, { t: 'S: Situation', s: 'Provide resources', c: 'p' }], cols: 2, title: 'MARS for diffusing change' }], body: `
      <p><b>Change agent</b>: has the knowledge and power to guide the change; uses transformational leadership. A <b>strategic vision</b> gives direction, identifies critical success factors, links employee values to change, reduces fear of the unknown and clarifies roles.</p>
      <p><b>Alan Mulally</b>'s "One Ford" vision and transformational leadership turned Ford around.</p>
      <p><b>Diffusion</b>: start with <b>pilot projects</b>, then spread using MARS.</p>
      <p><b>Concerns:</b> cross-cultural (linear change and open conflict don't fit every culture); ethical (privacy, management power, individuals' self-esteem). "Organisations are about people" (Andrew Carnegie).</p>` }
  ],
  links: [
    { to: 'ob2', topic: 'MARS model', text: 'Diffusion of change uses the MARS model from Topic 2.' },
    { to: 'ob11', topic: 'Transformational leadership', text: 'Change agents are transformational leaders (Topic 11).' },
    { to: 'ob12', topic: 'Culture change', text: 'Changing culture (Topic 12) is the hardest kind of organisational change.' },
    { to: 'ob4', topic: 'Stress', text: 'Stress management (Topic 4) helps reduce resistance.' },
    { to: 'ch9', topic: 'Continuous improvement', text: 'Software QA Ch 9 (TQM, PDCA) is continuous, small-step change; this topic is the people side of it.' }
  ],
  mindmaps: [{ center: 'Change', branches: [
    { label: 'Force field', color: 'p', kids: ['Driving forces', 'Restraining forces', 'Unfreeze, change, refreeze'] },
    { label: 'Resistance', color: 'r', kids: ['Valence, unknown', 'Not invented here', 'Routines, teams, systems'] },
    { label: 'Urgency', color: 'a', kids: ['Show driving forces', 'Hard when doing well', 'Customer-driven, vision'] },
    { label: 'Reduce resistance', color: 'g', kids: ['Communicate, learn', 'Involve, stress mgmt', 'Negotiate, coerce'] },
    { label: 'Change agents', color: 't', kids: ['Knowledge + power', 'Strategic vision ×5', 'Alan Mulally'] },
    { label: 'Diffusion + ethics', color: 'c', kids: ['Pilot projects', 'MARS', 'Culture, privacy, power'] }
  ] }],
  cases: [
    { co: 'LG Group', logo: 'LG', color: 'p', year: 'lecture', title: 'From follower to leader', story: 'Chairman Koo Bon-moo created urgency for change at Korea’s second-largest conglomerate so it would lead the market instead of following Samsung.', lesson: 'Creating urgency is hardest when the company is already successful.' },
    { co: 'Ford', logo: 'FD', color: 't', year: '2006–2014', title: 'One Ford', story: 'CEO Alan Mulally’s “One Ford” vision unified a divided company; Ford avoided a government bailout during the 2008–09 crisis.', lesson: 'Change agent with a strategic vision and transformational leadership.' },
    { co: 'Nokia', logo: 'NK', color: 'r', year: '2007–2013', title: 'Too slow to change', story: 'Nokia led mobile phones but struggled to respond to the iPhone and Android; its phone business was sold to Microsoft in 2013.', lesson: 'Restraining forces and lack of urgency in a successful company.' }
  ],
  code: [
    { title: 'Force field score', lang: 'Python', explain: 'Rate each force 1-5. Change is likely when total driving > total restraining; work on the biggest restraint first.', src: String.raw`driving = {"new competitor technology": 5, "customer complaints": 4, "CEO vision": 3}
restraining = {"fear of job loss": 5, "old reward system": 4, "skills gap": 3}

d, r = sum(driving.values()), sum(restraining.values())
print(f"driving {d} vs restraining {r}")
biggest = max(restraining, key=restraining.get)
print("Tackle first:", biggest)   # e.g. communication + involvement` }
  ],
  beyond: [
    { skill: 'devops', why: 'Moving a company to DevOps or cloud is organisational change: pilot teams first, then spread.' },
    { skill: 'communication', why: 'Communication is the first and highest-priority strategy for reducing resistance.' },
    { skill: 'agile', why: 'Agile transformations fail most often because of the resistance reasons in this topic.' }
  ],
  cards: [
    ['Force field analysis', 'Change happens when driving forces outweigh restraining forces (Lewin).'],
    ['Six reasons for resistance', 'Negative valence, fear of unknown, not-invented-here, breaking routines, team dynamics, organisational systems.'],
    ['Six strategies to reduce resistance', 'Communication, learning, involvement, stress management, negotiation, coercion.'],
    ['When is creating urgency hardest?', 'When the organisation is doing well.'],
    ['Change agent', 'Someone with the knowledge and power to guide and facilitate change.'],
    ['Diffusion of change', 'Start with pilot projects, then spread using the MARS model.']
  ],
  quiz: [
    { q: 'Engineers reject a tool because another team suggested it. This is…', o: ['Fear of the unknown', 'Not-invented-here syndrome', 'Negative valence', 'Coercion'], a: 1, why: 'Opposing change to show their own ideas were better.' },
    { q: 'The first strategy to reduce resistance is…', o: ['Coercion', 'Negotiation', 'Communication', 'Stress management'], a: 2, why: 'Communication is the highest priority.' },
    { q: 'Negotiation to gain support usually produces…', o: ['Commitment', 'Compliance', 'Resistance', 'Urgency'], a: 1, why: 'It gains compliance, not commitment.' }
  ],
  tutorial: { no: 13, source: 'TUTORIAL-(13)-(TTXL-GX).docx', items: [
    { n: 'Q1(a)', m: 4, q: 'Explain Lewin\'s force field analysis.', a: `<p><b>Driving forces</b> push toward change (external forces, the leader's vision). <b>Restraining forces</b> resist it (employee resistance). Change occurs when driving forces exceed restraining forces: unfreeze (increase driving, reduce restraining), move, then refreeze the new state.</p>` },
    { n: 'Q1(b)', m: 6, q: 'Six reasons employees resist change.', a: `<ol><li>Negative valence: costs seem higher than benefits.</li><li>Fear of the unknown: assume the worst, lack of control.</li><li>Not-invented-here syndrome: prove own ideas were better; change threatens self-esteem.</li><li>Breaking routines: leaving comfort zones takes time and effort.</li><li>Incongruent team dynamics: norms oppose the change.</li><li>Incongruent organisational systems: rewards, info systems, authority, career paths and selection keep the status quo.</li></ol>` },
    { n: 'Q2(a)', m: 4, q: 'Why create urgency; when is it hardest; what approach?', a: `<p>Urgency strengthens driving forces so people see the need to change. Hardest when the organisation is doing well. Inform employees about driving forces, use customer-driven change (shows real problems), and if there are no external drivers, use persuasive influence and a positive vision rather than threats.</p>` },
    { n: 'Q2(b)', m: 6, q: 'Six strategies to overcome resistance with benefits and problems.', a: `<ul><li><b>Communication</b>: urgency, less uncertainty. Problem: time-consuming, costly.</li><li><b>Learning</b>: new skills, breaks routines. Problem: time and cost.</li><li><b>Involvement</b>: saves face, less fear. Problem: slow, potential conflict.</li><li><b>Stress management</b>: more motivation, less fear. Problem: costly, doesn't help everyone.</li><li><b>Negotiation</b>: reduces direct costs for losers. Problem: expensive; compliance not commitment.</li><li><b>Coercion</b>: radical unlearning when all else fails. Problem: less trust, subtle resistance, politics.</li></ul>` },
    { n: 'Q3(a)', m: 2, q: 'Define a change agent.', a: `<p>Anyone who possesses the knowledge and power to guide and facilitate the change effort.</p>` },
    { n: 'Q3(b)', m: 5, q: 'Transformational leadership in change; five ways vision helps.', a: `<p>Change agents act as transformational leaders. A strategic vision: (1) provides a sense of direction, (2) identifies critical success factors to evaluate change, (3) links employee values to the change, (4) minimises fear of the unknown, (5) clarifies role perceptions.</p>` },
    { n: 'Q3(c)', m: 1, q: 'Alan Mulally at Ford.', a: `<p>His "One Ford" vision and transformational leadership unified the company and drove its turnaround.</p>` },
    { n: 'Q3(d)', m: 2, q: 'Why "organisations are about people"?', a: `<p>Carnegie said if you take his factories but leave his people, they will build a new and better factory. Change succeeds or fails through people's motivation, ability and commitment, not buildings or machines.</p>` },
    { n: 'Q4(a)', m: 2, q: 'Diffusion of change and how to begin.', a: `<p>Spreading change from one part of the organisation to the rest. Begin with pilot projects.</p>` },
    { n: 'Q4(b)', m: 4, q: 'MARS for diffusing change.', a: `<p><b>Motivation</b>: reward pilot employees so others want to adopt. <b>Ability</b>: train employees to adopt the pilot practices. <b>Role perceptions</b>: help translate the pilot to new situations. <b>Situational factors</b>: provide resources to implement elsewhere.</p>` },
    { n: 'Q4(c)', m: 4, q: 'Cross-cultural and ethical concerns.', a: `<p><b>Cross-cultural</b>: change models assume linear progress and open conflict, which don't fit cultures that value harmony or cyclical time. <b>Ethical</b>: privacy rights of individuals, management power over employees, and threats to individuals' self-esteem.</p>` },
    { n: 'Q5(a)', m: 3, q: 'LG Group: the change and approach.', a: `<p>Koo Bon-moo wanted LG to become a proactive market leader rather than a follower of Samsung. He created urgency for change across the conglomerate.</p>` },
    { n: 'Q5(b)', m: 3, q: 'Why urgency is hard for successful companies.', a: `<p>When results are good, employees see no reason to change: driving forces seem weak and routines feel safe. Leaders must make future threats or opportunities visible (customers, competitors) and use a positive vision.</p>` },
    { n: 'Q5(c)', m: 4, q: 'Apply resistance strategies at LG.', a: `<p>Communicate the vision of leadership and the risk of following; train staff in innovation skills; involve teams in pilot innovation projects; manage stress during the shift; negotiate with units that lose resources; use coercion only as a last resort. Align rewards and systems with proactive behaviour.</p>` },
    { n: 'Q6', m: 10, q: 'Case: change plan for a traditional manufacturer facing disruption.', a: `<ol><li><b>(a) Force field</b>: list driving forces (new technology, competitors, customer demands) and restraining forces (fear of job loss, old routines, reward systems, skills gaps); rate them.</li><li><b>(b) Urgency</b>: share customer data and competitor moves, show consequences of inaction, present a positive vision of an innovative, agile company.</li><li><b>(c) Resistance</b>: expect fear of the unknown, broken routines and incongruent systems; respond with communication, training, involvement in pilot teams, stress support, and redesigned rewards.</li><li><b>(d) Change agents</b>: a CEO acting as transformational leader plus internal champions; strategic vision gives direction and clarifies roles.</li><li><b>(e) Diffusion</b>: start with pilot projects and spread with MARS: reward pilots, train others, translate practices, provide resources.</li></ol>` },
    { n: 'Mind map', kind: 'assignment', q: 'TOPIC-(13): complete and comprehensive mind map.', a: `<p>See the <b>Mind map</b> tab.</p>` }
  ] }
}
];
export default chapters;
