/* SQA chapters 1-5. Notes summarised from the CSE6314 lecture slides. */

const chapters = [
{
  id: 'ch1', subject: 'sqa', num: 1, theme: 'quality', title: 'Introduction to software quality', short: 'Intro to quality',
  lecture: 'Chapter 1 - Introduction to Software Quality',
  summary: 'Why software quality is harder than hardware quality, what “quality” means (IEEE and ISO), the difference between error, fault and failure, the 9 causes of software errors, and QA vs QC.',
  sections: [
    { h: 'Why software needs its own QA', pics: ['swVsHw'], body: `
      <p>Software is different from factory products in three ways:</p>
      <ul><li><b>Complexity</b>: a hardware product has a few thousand operating modes; a software package can have millions.</li>
      <li><b>Visibility</b>: you can see a scratched car door. You cannot see a bug in code.</li>
      <li><b>Production process</b>: hardware gets checked in development, production planning <i>and</i> manufacturing. Software can only be checked in development, because copying the software is the whole “manufacturing” step.</li></ul>` },
    { h: 'The SQA environment (7 characteristics)', pics: ['sqaEnv'], body: `
      <ol><li><b>Contractual conditions</b>: functions, budget and timetable are fixed in the contract.</li>
      <li><b>Customer-supplier relationship</b>: the customer watches, comments and approves changes.</li>
      <li><b>Required teamwork</b>: deadlines and many specialisations need a team.</li>
      <li><b>Cooperation with other teams</b>: hardware teams, subcontractors, the customer's own IT team.</li>
      <li><b>Interfaces with other systems</b>: input, output and control-board interfaces.</li>
      <li><b>Continue despite team member changes</b>: people leave; new staff must be trained.</li>
      <li><b>Long maintenance period</b>: customers use the system for years and expect support.</li></ol>` },
    { h: 'What is software quality?', pics: ['isoComponents'], body: `
      <p>Two views: <b>conformance to specification</b> (measurable things meet the spec) and <b>meeting customer needs</b> (explicit and implicit expectations).</p>
      <p><b>IEEE:</b> (1) the degree to which a system meets specified requirements; (2) the degree to which it meets customer or user needs or expectations.</p>
      <p><b>ISO:</b> software = programs + procedures + documentation + data. SQA must cover all four, not only code.</p>` },
    { h: 'Error → fault → failure', pics: ['errorChain'], body: `
      <ul><li><b>Error</b>: a grammatical or logical mistake made by a person.</li>
      <li><b>Fault</b>: a hidden programming error sitting in the code.</li>
      <li><b>Failure</b>: the fault is <i>activated</i> when a user runs that part. Only some faults ever become failures.</li></ul>` },
    { h: 'Nine causes of software errors', pics: ['errorCauses'], body: `
      <ol><li><b>Faulty requirements definition</b>: wrong, missing, incomplete or unnecessary requirements.</li>
      <li><b>Client-developer communication failures</b>: misunderstood instructions, written or oral changes.</li>
      <li><b>Deliberate deviations</b>: reusing old modules without analysis, dropping functions under time pressure, unapproved “improvements”.</li>
      <li><b>Logical design errors</b>: wrong algorithms, sequencing errors, bad boundary conditions, missing states, no handling of illegal operations.</li>
      <li><b>Coding errors</b>: misreading design docs, language mistakes, tool misuse.</li>
      <li><b>Non-compliance with documentation and coding standards</b>.</li>
      <li><b>Shortcomings of the testing process</b>: incomplete test plans, errors not reported or not fully fixed.</li>
      <li><b>Procedure errors</b>: wrong instructions for users in multi-step processes.</li>
      <li><b>Documentation errors</b>: errors in design documents and built-in help.</li></ol>` },
    { h: 'SQA definition and objectives', body: `
      <p><b>IEEE:</b> SQA is (1) a planned and systematic pattern of all actions needed to give adequate confidence that a product conforms to technical requirements; (2) activities that evaluate the <i>process</i> by which products are made.</p>
      <p><b>Objectives in development and maintenance</b>: confidence that the software meets (1) functional technical requirements, (2) schedule and budget requirements, and (3) start and manage activities that improve efficiency of development and SQA.</p>` },
    { h: 'Quality assurance vs quality control', pics: ['qaVsQc'], body: `
      <ul><li><b>QC</b>: evaluates a finished product and <i>withholds</i> any product that does not qualify. Think: checking at the end.</li>
      <li><b>QA</b>: activities through the <i>whole</i> process that prevent causes of errors and catch them early, lowering the cost of guaranteeing quality.</li></ul>
      <p>QC is a part of QA. QA is broader and is about prevention.</p>` }
  ],
  links: [
    { to: 'ch5', topic: 'Fault vs failure', text: 'Ch 5 re-uses the fault/failure idea to define reliability: faults only cause failures when used.' },
    { to: 'ch6', topic: 'Fault vs failure', text: 'Ch 6 recaps fault/failure, then shows how to avoid and tolerate faults.' },
    { to: 'ch2', topic: 'Definition of quality', text: 'Ch 2 extends quality with Pressman’s definition and McCall’s factors.' },
    { to: 'ch9', topic: 'Quality culture', text: 'Ch 9 (TQM) turns “quality” into a whole-company management system.' },
    { to: 'ch4', topic: 'Requirements errors', text: 'Causes 1-2 (requirements and communication) are what contract and design reviews in Ch 4 try to catch.' },
    { to: 'ch10', topic: 'Error tracking', text: 'Ch 10 uses error tracking and root-cause analysis to stop these 9 causes from repeating.' }
  ],
  mindmaps: [{
    center: 'Software quality', branches: [
      { label: 'Uniqueness', color: 'p', kids: ['Complexity: millions of modes', 'Invisible defects', 'Only dev phase finds bugs'] },
      { label: 'SQA environment', color: 'p', kids: ['Contract + customer', 'Teamwork + other teams', 'Interfaces', 'Staff changes', 'Long maintenance'] },
      { label: 'Definitions', color: 't', kids: ['IEEE: meets requirements', 'IEEE: meets user needs', 'ISO: 4 parts of software'] },
      { label: 'Error chain', color: 'r', kids: ['Error (person)', 'Fault (in code)', 'Failure (user sees)'] },
      { label: '9 error causes', color: 'a', kids: ['Requirements + communication', 'Deviations + design + coding', 'Standards + testing', 'Procedures + docs'] },
      { label: 'QA vs QC', color: 'g', kids: ['QC: inspect product at end', 'QA: prevent across process', 'QC is part of QA'] }
    ]
  }],
  cases: [
    { co: 'Ariane 5', logo: 'A5', color: 'r', year: '1996', title: 'Rocket destroyed 37 seconds after launch', story: 'Code reused from Ariane 4 converted a 64-bit floating-point velocity value into a 16-bit integer. Ariane 5 flew faster, the value overflowed, and both guidance computers shut down. The rocket broke up; the loss was around US$370 million.', lesson: 'Cause #3 “deliberate deviation”: reusing a module without analysing the new environment. Also cause #4: missing boundary condition.' },
    { co: 'NASA Mars Climate Orbiter', logo: 'NA', color: 'c', year: '1999', title: 'Lost because of units', story: 'One team’s software produced thrust data in pound-force seconds; NASA’s navigation software expected newton-seconds. Nobody caught the mismatch, and the orbiter entered Mars’ atmosphere too low and was lost.', lesson: 'Cause #2 “communication failure” and an interface problem between teams (SQA environment items 4 and 5).' },
    { co: 'CrowdStrike', logo: 'CS', color: 'a', year: '2024', title: 'One update crashed ~8.5 million Windows PCs', story: 'A faulty content update for the Falcon security sensor caused Windows machines worldwide to crash and get stuck rebooting. Airlines, banks and hospitals were hit. The company later added staged rollouts and more validation.', lesson: 'Cause #7 “shortcomings of the testing process” and why QA (prevent, stage releases) beats QC alone.' },
    { co: 'UK Post Office Horizon', logo: 'PO', color: 'p', year: '1999–2015', title: 'Bugs treated as theft', story: 'Accounting software (Horizon, by Fujitsu) showed false shortfalls at branches. Hundreds of sub-postmasters were prosecuted before courts accepted the system had bugs.', lesson: 'Software quality is not only technical: documentation, procedures and honesty about known faults matter (ISO 4 components).' }
  ],
  code: [
    { title: 'Error vs fault vs failure', lang: 'Python', explain: 'The programmer made an error (used > instead of >=). The fault sits in the code quietly. It only becomes a failure when someone is exactly 18.', src:
`def can_vote(age):
    # ERROR made by programmer: should be >= 18
    return age > 18          # <- FAULT hidden here

print(can_vote(30))   # True  -> fault not activated, no failure
print(can_vote(10))   # False -> still fine
print(can_vote(18))   # False -> FAILURE! an 18-year-old is rejected` },
    { title: 'Cause #4: missing boundary condition (Ariane-style)', lang: 'Java', explain: 'Casting a large value into a small type silently overflows. Defensive code checks the range first.', src:
`long velocity = 40_000L;
short bad = (short) velocity;      // overflow -> -25536 (wrong!)

if (velocity > Short.MAX_VALUE || velocity < Short.MIN_VALUE) {
    throw new ArithmeticException("velocity out of range: " + velocity);
}
short good = (short) velocity;` }
  ],
  beyond: [
    { skill: 'requirements', why: 'Causes #1 and #2 (faulty requirements and miscommunication) are the biggest sources of errors. User stories with acceptance criteria are how companies prevent them today.' },
    { skill: 'communication', why: 'The Mars Climate Orbiter was lost because two teams did not communicate units. Clear bug reports and written agreements are a quality tool.' },
    { skill: 'git', why: 'Cause #6 (not following coding standards) is fixed in industry with linters and formatters that run on every commit, and pull requests that block bad code.' },
    { skill: 'docs', why: 'ISO says documentation is part of the software. Cause #9 is documentation errors. Good READMEs and API docs are quality work.' },
    { skill: 'ethics', why: 'The Post Office Horizon case shows that hiding known bugs can ruin lives. Professional ethics and laws like Malaysia’s PDPA are part of quality.' },
    { skill: 'testing', why: 'Cause #7 is weak testing. Automated unit tests turn “hidden faults” into failures you see before customers do.' }
  ],
  cards: [
    ['3 ways software differs from hardware products', 'Complexity (millions of modes), visibility (defects invisible), and defects can only be found in the development phase.'],
    ['Error vs fault vs failure', 'Error = human mistake. Fault = hidden bug in code. Failure = fault activated at run time and seen by a user.'],
    ['ISO: 4 components of software', 'Computer programs, procedures, documentation, and data needed to operate the system.'],
    ['IEEE definition of software quality', '(1) Degree a system meets specified requirements; (2) degree it meets customer/user needs or expectations.'],
    ['QA vs QC', 'QC inspects finished products and withholds bad ones. QA prevents errors throughout the whole process. QC is part of QA.'],
    ['Name the 9 causes of software errors', 'Faulty requirements, communication failures, deliberate deviations, logical design errors, coding errors, non-compliance with standards, testing shortcomings, procedure errors, documentation errors.'],
    ['7 characteristics of the SQA environment', 'Contract conditions, customer-supplier relationship, teamwork, cooperation with other teams, interfaces with other systems, continuing despite staff changes, long maintenance.']
  ],
  quiz: [
    { q: 'A bug exists in a rarely used report screen. No user has opened it yet. This is a…', o: ['Failure', 'Fault', 'Error in requirements', 'Quality control'], a: 1, why: 'It is a hidden fault. It becomes a failure only when someone runs that screen.' },
    { q: 'A developer reuses an old module without checking it fits the new system. Which error cause is this?', o: ['Coding error', 'Procedure error', 'Deliberate deviation from requirements', 'Documentation error'], a: 2, why: 'Reusing modules without enough analysis is listed under deliberate deviations (Ariane 5 is the classic example).' },
    { q: 'Which is NOT one of ISO’s four components of software?', o: ['Procedures', 'Documentation', 'Hardware', 'Data'], a: 2, why: 'ISO lists programs, procedures, documentation and data.' },
    { q: 'Quality control mainly…', o: ['Prevents errors during design', 'Withholds finished products that do not qualify', 'Writes requirements', 'Trains staff'], a: 1, why: 'QC evaluates finished products. Prevention across the process is QA.' }
  ]
},
{
  id: 'ch2', subject: 'sqa', num: 2, theme: 'quality', title: 'Quality factors', short: 'Quality factors',
  lecture: 'Chapter 2 - Quality Factors',
  summary: 'Requirements must cover more than functions. McCall’s 11 factors in 3 groups (operation, revision, transition), plus the extra factors from Evans & Marciniak and Deutsch & Willis.',
  sections: [
    { h: 'Why requirement documents must be complete', body: `
      <p>A requirements document should cover every attribute of the software: usability, reusability, maintainability and so on. These are grouped into <b>quality factors</b>. Developers must define requirements for each factor.</p>
      <p><b>Pressman’s definition</b>: conformance to (1) explicit functional and performance requirements, (2) documented development standards, and (3) implicit characteristics expected of all professional software.</p>
      <ul><li>Requirements are the foundation; no conformance = no quality.</li><li>Ignoring standards almost surely gives poor quality.</li><li>Meeting explicit requirements but failing implicit ones (like maintainability) still makes quality suspect.</li></ul>` },
    { h: 'Internal vs external, product vs process', body: `
      <ul><li><b>External qualities</b> are visible to users (reliability, usability).</li><li><b>Internal qualities</b> concern developers (verifiability, structure). Internal qualities help achieve external ones: verifiability → reliability.</li>
      <li><b>Product vs process</b>: the process produces the product. To improve product quality, improve the process.</li></ul>` },
    { h: "McCall's model (1977)", pics: ['mccallTriangle', 'mccall'], body: `
      <p>11 factors in 3 categories:</p>
      <h3>1. Product operation (using it)</h3>
      <ul><li><b>Correctness</b>: required outputs are right (e.g. customer balance).</li>
      <li><b>Reliability</b>: maximum allowed failure rate (e.g. ICU heart monitor fails less than once in 20 years).</li>
      <li><b>Efficiency</b>: hardware resources needed. Bid B (10 GB/branch, 2 lines) beats Bid A (20 GB, 3 lines).</li>
      <li><b>Integrity</b>: security; who can view vs change (e.g. city GIS: citizens can view and copy maps, not edit).</li>
      <li><b>Usability</b>: staff effort to learn and operate (e.g. 60 service calls a day, training under 16 hours).</li></ul>
      <h3>2. Product revision (changing it)</h3>
      <ul><li><b>Maintainability</b>: effort to find and fix failures; module size ≤ 30 statements, follow coding standards.</li>
      <li><b>Flexibility</b>: effort for adaptive and perfective maintenance (teacher software for all subjects and levels).</li>
      <li><b>Testability</b>: built-in diagnostics and standard test data run every morning before production.</li></ul>
      <h3>3. Product transition (moving it)</h3>
      <ul><li><b>Portability</b>: move to other hardware/OS (Windows → Linux at low cost).</li>
      <li><b>Reusability</b>: modules reused in later projects (hotel pool → spa membership, billing modules).</li>
      <li><b>Interoperability</b>: interfaces with other systems (lab equipment output in a standard format).</li></ul>` },
    { h: 'Alternative models', body: `
      <p><b>Evans & Marciniak (1987)</b> and <b>Deutsch & Willis (1988)</b> keep most of McCall’s factors and add up to five more:</p>
      <ul><li><b>Verifiability</b>: design and code can be verified efficiently.</li><li><b>Expandability</b>: future growth in users or features.</li><li><b>Safety</b>: avoid dangerous conditions.</li><li><b>Manageability</b>: administrative tools for change.</li><li><b>Survivability</b>: keep working (continuity) when parts fail.</li></ul>
      <p>Total across models: 16 factors.</p>` }
  ],
  links: [
    { to: 'ch5', topic: 'Reliability factor', text: 'McCall’s “reliability” factor is measured with POFOD, ROCOF, MTTF and availability in Ch 5.' },
    { to: 'ch10', topic: 'Testability', text: 'Ch 10 treats non-testability as a project risk and shows how to increase testability.' },
    { to: 'ch6', topic: 'Safety and survivability', text: 'The extra “safety” factor is developed into hazard analysis in Ch 6.' },
    { to: 'ch7', topic: 'Measuring factors', text: 'Ch 7 metrics turn factors like maintainability into numbers.' },
    { to: 'ch1', topic: 'Definition of quality', text: 'Builds on IEEE/ISO definitions from Ch 1 with Pressman’s explicit + implicit requirements.' }
  ],
  mindmaps: [{
    center: 'Quality factors', branches: [
      { label: 'Product operation', color: 'p', kids: ['Correctness', 'Reliability', 'Efficiency', 'Integrity (security)', 'Usability'] },
      { label: 'Product revision', color: 't', kids: ['Maintainability', 'Flexibility', 'Testability'] },
      { label: 'Product transition', color: 'c', kids: ['Portability', 'Reusability', 'Interoperability'] },
      { label: 'Extra factors', color: 'a', kids: ['Verifiability', 'Expandability', 'Safety', 'Manageability', 'Survivability'] },
      { label: 'Pressman', color: 'x', kids: ['Explicit requirements', 'Development standards', 'Implicit characteristics'] },
      { label: 'Kinds of quality', color: 'g', kids: ['External: users see', 'Internal: developers see', 'Process drives product'] }
    ]
  }, {
    center: 'Remember McCall', branches: [
      { label: 'Operation = CREIU', color: 'p', kids: ['C orrectness', 'R eliability', 'E fficiency', 'I ntegrity', 'U sability'] },
      { label: 'Revision = MFT', color: 't', kids: ['M aintainability', 'F lexibility', 'T estability'] },
      { label: 'Transition = PRI', color: 'c', kids: ['P ortability', 'R eusability', 'I nteroperability'] }
    ]
  }],
  cases: [
    { co: 'Healthcare.gov', logo: 'HC', color: 'r', year: '2013', title: 'US health site collapsed on launch day', story: 'Built to sign up millions for insurance, the site crashed under load. Only a handful of people completed signup on day one. A rescue team fixed performance, monitoring and integration over the following months.', lesson: 'Efficiency, reliability and usability were not specified or tested well enough. Functions alone are not quality.' },
    { co: 'Equifax', logo: 'EQ', color: 'c', year: '2017', title: 'Data of ~147 million people stolen', story: 'Attackers used a known vulnerability in Apache Struts that had a patch available for months. Names, birth dates and ID numbers were taken.', lesson: 'Integrity (security) is a quality factor, and maintainability (patching quickly) protects it.' },
    { co: 'Java / JVM', logo: 'JV', color: 'p', year: '1995→', title: '“Write once, run anywhere”', story: 'Java compiles to bytecode that runs on any JVM, so the same app runs on Windows, Linux and macOS. Android apps also started from Java.', lesson: 'Portability built into the language. Docker containers do the same for whole systems today.' },
    { co: 'HL7 FHIR (hospitals)', logo: 'HL', color: 't', year: '2014→', title: 'Medical systems speaking one format', story: 'Like the lecture’s lab-equipment example, hospitals use the HL7 FHIR standard so lab machines, clinics and apps exchange patient data in one agreed structure.', lesson: 'Interoperability is achieved by agreeing on standard data structures and APIs.' }
  ],
  code: [
    { title: 'Maintainability: before and after', lang: 'Python', explain: 'Same behaviour. The second version has small named functions (McCall: “module size ≤ 30 statements”), so it is easier to fix and test.', src:
`# Hard to maintain: one big function, magic numbers
def p(o):
    t = 0
    for i in o: t += i[1] * i[2]
    if t > 500: t = t * 0.9
    return t * 1.06

# Easier to maintain
DISCOUNT_LIMIT = 500
DISCOUNT_RATE = 0.10
SST_RATE = 0.06

def subtotal(items):
    return sum(qty * price for _, qty, price in items)

def apply_discount(amount):
    return amount * (1 - DISCOUNT_RATE) if amount > DISCOUNT_LIMIT else amount

def order_total(items):
    return apply_discount(subtotal(items)) * (1 + SST_RATE)` },
    { title: 'Integrity: view vs edit (city GIS example)', lang: 'Python', explain: 'Citizens may view maps but not change them; plans in progress are hidden. That is an integrity requirement written as code.', src:
`PERMISSIONS = {
    "citizen":  {"view", "copy"},
    "engineer": {"view", "copy", "edit"},
}

def can(role, action, map_obj):
    if map_obj.in_progress and role != "engineer":
        return False          # hidden plans
    return action in PERMISSIONS.get(role, set())` },
    { title: 'Testability: morning self-test', lang: 'Python', explain: 'The lecture’s factory example: run standard test data with known answers every morning before production starts.', src:
`STANDARD_CASES = [
    ({"temp": 80, "pressure": 2.0}, "OK"),
    ({"temp": 130, "pressure": 2.0}, "WARNING"),
    ({"temp": 80, "pressure": 5.5}, "ALARM"),
]

def morning_self_test(controller):
    failed = [(inp, exp) for inp, exp in STANDARD_CASES
              if controller.status(inp) != exp]
    if failed:
        raise SystemExit(f"Self-test failed: {failed}")
    print("All systems OK - production may start")` }
  ],
  beyond: [
    { skill: 'oop', why: 'Maintainability, flexibility and reusability come from good design: SOLID principles, small classes, design patterns.' },
    { skill: 'security', why: 'Integrity = security. OWASP Top 10, password hashing and access control are how you meet integrity requirements.' },
    { skill: 'dsa', why: 'Efficiency is about resources. Big-O tells you whether your code will still be fast with 1 million users.' },
    { skill: 'devops', why: 'Portability today means Docker containers that run the same on your laptop, a server or the cloud.' },
    { skill: 'api', why: 'Interoperability = APIs. REST and JSON are the “standard data structures” that let systems talk.' },
    { skill: 'testing', why: 'Testability is a design property. Code that uses dependency injection is easy to unit test.' },
    { skill: 'frameworks', why: 'Usability depends on good UI. Frontend frameworks plus accessibility rules help you meet usability requirements.' }
  ],
  cards: [
    ['McCall’s 3 categories', 'Product operation, product revision, product transition.'],
    ['Product operation factors (5)', 'Correctness, reliability, efficiency, integrity, usability.'],
    ['Product revision factors (3)', 'Maintainability, flexibility, testability.'],
    ['Product transition factors (3)', 'Portability, reusability, interoperability.'],
    ['Extra factors from alternative models', 'Verifiability, expandability, safety, manageability, survivability.'],
    ['Pressman’s 3 parts of quality', 'Explicit requirements, documented development standards, implicit characteristics.'],
    ['Integrity means…', 'Security: prevent unauthorised access, separate who can view from who can change data.'],
    ['Efficiency example (bids)', 'Bid B uses less storage and fewer lines than Bid A for the same function, so it is more efficient.']
  ],
  quiz: [
    { q: 'Requirement: “Training a new employee takes at most 16 hours.” Which factor?', o: ['Efficiency', 'Usability', 'Flexibility', 'Correctness'], a: 1, why: 'Usability covers staff effort to learn and operate the system.' },
    { q: 'Moving software from Windows to Linux at low cost is…', o: ['Interoperability', 'Reusability', 'Portability', 'Flexibility'], a: 2, why: 'Portability = adapting to other hardware or operating systems.' },
    { q: 'Testability belongs to which McCall category?', o: ['Product operation', 'Product revision', 'Product transition', 'None'], a: 1, why: 'Revision = maintainability, flexibility, testability.' },
    { q: 'Which factor was ADDED by alternative models?', o: ['Reliability', 'Safety', 'Integrity', 'Usability'], a: 1, why: 'Safety, verifiability, expandability, manageability and survivability are the additions.' }
  ]
},
{
  id: 'ch3', subject: 'sqa', num: 3, theme: 'control', title: 'Software quality assurance and testing', short: 'SQA, SDLC and testing',
  lecture: 'Chapter 3 - Software Quality Assurance (SQA)',
  summary: 'Components of quality management, SDLC models (waterfall, V, prototyping, spiral, OO, agile), how to plan QA activities, verification/validation/qualification, and testing strategies: big bang vs incremental, stubs and drivers, black box vs white box, path vs line coverage.',
  sections: [
    { h: 'Software quality management (SQM)', pics: ['sqm'], body: `
      <ol><li><b>Project progress control</b>: resources, schedule, Reliability-Maintainability-Availability (RMA), budget.</li>
      <li><b>Software quality metrics</b>: quality of development, productivity, fault density, schedule deviations.</li>
      <li><b>Software quality costs</b>.</li></ol>` },
    { h: 'SDLC models', pics: ['waterfall', 'vmodel', 'prototyping', 'spiral'], body: `
      <ul><li><b>Waterfall</b>: linear; requirements → maintenance, one phase after another.</li>
      <li><b>V-model</b>: each development phase on the left has a matching test phase on the right.</li>
      <li><b>Prototyping</b>: users comment on prototype versions, developers improve, repeat. <i>Pros</i>: shorter, cheaper, better fit, lower risk, faster user understanding. <i>Cons</i>: less flexible to later changes, less preparation for unexpected failures.</li>
      <li><b>Spiral</b>: for large complex systems; adds risk analysis and customer participation. Each loop: planning, risk analysis and resolution, engineering, customer evaluation.</li>
      <li><b>Advanced spiral (Win-Win)</b>: extra negotiation so both customer and developer “win”. Loop: customer spec, developer planning, risk analysis, design, construction, customer evaluation.</li>
      <li><b>Object-oriented</b>: heavy reuse from a component library; new components go back into the library. Economy, quality, shorter time.</li>
      <li><b>Agile</b>: iterative and incremental, self-organising cross-functional teams, 12 principles, time-boxed. Methods: XP, Adaptive SD, DSDM, Scrum, Crystal, FDD.</li></ul>` },
    { h: 'Planning QA activities', pics: ['qaPlanFactors'], body: `
      <p>How much QA depends on <b>project factors</b> (size, complexity, reuse, failure severity) and <b>team factors</b> (qualification, experience in the area, support, % new staff).</p>
      <p><b>Example</b>: a team doing its 11th consumer-club project, 90% from a reusable library, medium size. It plans only three light QA activities: requirements design review, design inspection, and system test. A new team on a new domain would need much more.</p>` },
    { h: 'Verification, validation, qualification', body: `
      <ul><li><b>Verification</b>: do this phase’s products satisfy the conditions set at the start of the phase? (consistency with previous phase)</li>
      <li><b>Validation</b>: does the system satisfy the specified requirements? (customer’s interests)</li>
      <li><b>Qualification</b>: is it suitable for operational use? (maintenance, professional standards, coding procedures)</li></ul>` },
    { h: 'Testing: definitions and objectives', body: `
      <p><b>Myers</b>: testing is executing a program with the intention of finding errors.</p>
      <p><b>Direct objectives</b>: reveal as many errors as possible; bring software to an acceptable quality level; test efficiently within budget and schedule. <b>Indirect</b>: keep records of errors for future prevention.</p>` },
    { h: 'Big bang vs incremental testing', pics: ['bigbang', 'topDownBottomUp'], body: `
      <ul><li><b>Big bang</b>: test the whole package at once. Errors hard to find and fix.</li>
      <li><b>Incremental</b>: unit test each module, then integration test, then system test. Errors easier to locate; more planned.</li>
      <li><b>Bottom-up</b>: test lowest modules first, needs <b>drivers</b> (fake caller). Easier to perform, but the whole program runs late.</li>
      <li><b>Top-down</b>: test the main module first, needs <b>stubs</b> (dummy lower modules). Harder, but you see the whole program early.</li></ul>` },
    { h: 'Black box vs white box', pics: ['boxes', 'pathCoverage'], body: `
      <ul><li><b>Black box</b> (functional): ignores internals, checks outputs for inputs. Fewer resources, covers most test classes, but no line-coverage control and can’t judge code quality.</li>
      <li><b>White box</b> (structural): examines internal paths. Checks paths and algorithms, gives line coverage and code quality, but needs vast resources and can’t test availability, reliability or stress.</li>
      <li><b>Path coverage</b>: % of possible paths executed. <b>Line coverage</b>: % of lines executed. Two IFs in a row = 4 paths, but only 2 tests are needed to touch every line.</li></ul>` }
  ],
  links: [
    { to: 'ch8', topic: 'V&V', text: 'Verification and validation are introduced here and fully planned (VVP) in Ch 8.' },
    { to: 'ch4', topic: 'Reviews', text: 'Reviews are defined here; Ch 4 compares design reviews, inspections, walkthroughs and expert opinions.' },
    { to: 'ch7', topic: 'Quality metrics', text: 'SQM component #2 (metrics) is the whole of Ch 7.' },
    { to: 'ch10', topic: 'Risk analysis', text: 'The spiral model’s risk analysis step is expanded in Ch 10 (risk table, RMMM).' },
    { to: 'ch5', topic: 'Testing for reliability', text: 'Ch 5 adds statistical testing: testing to measure reliability, not to find faults.' },
    { to: 'ch9', topic: 'Quality cost', text: 'Quality costs (SQM #3) link to TQM’s “quality is free” in Ch 9.' }
  ],
  mindmaps: [{
    center: 'SQA', branches: [
      { label: 'SQM parts', color: 'p', kids: ['Progress control (RMA)', 'Quality metrics', 'Quality costs'] },
      { label: 'SDLC models', color: 't', kids: ['Waterfall, V-model', 'Prototyping', 'Spiral + Win-Win', 'Object-oriented', 'Agile (Scrum, XP)'] },
      { label: 'Plan QA by', color: 'a', kids: ['Project: size, complexity', 'Project: reuse, severity', 'Team: skills, experience', 'Team: % new staff'] },
      { label: 'V, V and Q', color: 'g', kids: ['Verification: phase vs phase', 'Validation: vs requirements', 'Qualification: fit for use'] },
      { label: 'Test strategies', color: 'c', kids: ['Big bang', 'Incremental: unit → system', 'Top-down + stubs', 'Bottom-up + drivers'] },
      { label: 'Test techniques', color: 'r', kids: ['Black box: in/out', 'White box: paths', 'Line coverage', 'Path coverage'] }
    ]
  }, {
    center: 'SDLC models', branches: [
      { label: 'Plan-driven', color: 'p', kids: ['Waterfall: linear', 'V-model: test per phase'] },
      { label: 'Iterative', color: 't', kids: ['Prototyping: user feedback', 'Spiral: risk each loop', 'Win-Win: negotiate'] },
      { label: 'Reuse', color: 'c', kids: ['OO model: component library'] },
      { label: 'Agile', color: 'g', kids: ['Scrum', 'Extreme Programming', 'Crystal, DSDM, FDD', '12 principles'] }
    ]
  }],
  cases: [
    { co: 'FBI Virtual Case File', logo: 'FB', color: 'r', year: '2000–2005', title: 'US$170M project abandoned', story: 'A big up-front, waterfall-style project kept changing requirements while code was being written. After years and huge cost, the system was scrapped. Its replacement (Sentinel) later used agile methods and was delivered.', lesson: 'Waterfall breaks down when requirements change. Iterative models reduce this risk.' },
    { co: 'Spotify', logo: 'SP', color: 'g', year: '2012→', title: 'Agile squads', story: 'Spotify organised small, autonomous “squads” that own a feature end-to-end, release often and test continuously. Many companies copied the idea (with mixed results).', lesson: 'Agile = small increments, fast feedback, self-organising cross-functional teams.' },
    { co: 'Instagram', logo: 'IG', color: 'p', year: '2010', title: 'From prototype to product', story: 'The founders first built Burbn, a check-in app. Watching users, they saw people mainly shared photos, so they cut everything else and launched Instagram.', lesson: 'Prototyping lets users show you the real requirements early.' },
    { co: 'NASA flight software', logo: 'NA', color: 'c', year: 'ongoing', title: 'V-model style development', story: 'Safety-critical aerospace projects pair every requirement and design level with a matching test level and keep strict traceability between them.', lesson: 'The V-model fits when failure is catastrophic and requirements are stable.' }
  ],
  code: [
    { title: 'Unit test with pytest (black box)', lang: 'Python', explain: 'Black box: we only check inputs and outputs. Boundaries (0, 39, 40, 100) are where bugs hide.', src:
`# grade.py
def grade(mark):
    if not 0 <= mark <= 100:
        raise ValueError("mark must be 0-100")
    return "PASS" if mark >= 40 else "FAIL"

# test_grade.py   (run: pytest)
import pytest
from grade import grade

@pytest.mark.parametrize("mark,expected", [
    (0, "FAIL"), (39, "FAIL"), (40, "PASS"), (100, "PASS"),
])
def test_boundaries(mark, expected):
    assert grade(mark) == expected

def test_invalid():
    with pytest.raises(ValueError):
        grade(101)` },
    { title: 'Stub and driver', lang: 'Python', explain: 'Top-down: the real payment service is not ready, so a STUB returns fake answers. Bottom-up: the main app is not ready, so a DRIVER calls the finished module with test data.', src:
`# STUB: replaces an unfinished LOWER module
class PaymentServiceStub:
    def charge(self, amount):
        return {"status": "approved", "amount": amount}

class Checkout:                     # module under test (upper)
    def __init__(self, payments):
        self.payments = payments
    def pay(self, amount):
        return self.payments.charge(amount)["status"] == "approved"

assert Checkout(PaymentServiceStub()).pay(50)

# DRIVER: replaces an unfinished UPPER module
def tax(amount):                    # finished lower module
    return round(amount * 0.06, 2)

def driver():
    for amount, expected in [(100, 6.0), (0, 0.0), (19.99, 1.2)]:
        assert tax(amount) == expected, amount
    print("tax module OK")
driver()` },
    { title: 'Line coverage vs path coverage', lang: 'Python', explain: 'Two tests touch every line (100% line coverage) but only cover 2 of the 4 paths. The bug (member + big order = double discount) is on a path we never ran. Measure with: pytest --cov --cov-branch', src:
`def price(total, member):
    discount = 0
    if total > 100:        # IF #1
        discount += 10
    if member:             # IF #2
        discount += 5
    return total - discount

# Test A: price(200, True)   -> path 1-2-3-5-6-8
# Test B: price(50, False)   -> path 1-2-4-5-7-8
# 100% LINES covered, but paths (200, False) and (50, True) never run` }
  ],
  beyond: [
    { skill: 'agile', why: 'Your lecture lists Scrum and XP. In industry you will live in sprints, standups, Jira boards and retrospectives.' },
    { skill: 'testing', why: 'Unit, integration and system tests from this chapter map directly to pytest, JUnit, Jest and Playwright in real projects.' },
    { skill: 'cicd', why: 'Incremental testing is automated today: every push runs the tests in GitHub Actions and reports coverage.' },
    { skill: 'oop', why: 'The OO model relies on reusable components. Interfaces and dependency injection make stubs easy.' },
    { skill: 'git', why: 'Agile teams integrate small changes daily using branches and pull requests.' },
    { skill: 'requirements', why: 'Prototyping and spiral models are about discovering requirements. User stories and acceptance criteria are the modern tools.' }
  ],
  cards: [
    ['3 components of SQM', 'Project progress control, software quality metrics, software quality costs.'],
    ['4 steps of each spiral loop', 'Planning, risk analysis and resolution, engineering, customer evaluation.'],
    ['Stub vs driver', 'Stub = dummy LOWER module (top-down). Driver = fake UPPER module that feeds test data (bottom-up).'],
    ['Verification vs validation vs qualification', 'Verification: phase output vs phase start conditions. Validation: meets requirements. Qualification: suitable for operational use.'],
    ['Black box pros and cons', 'Pros: fewer resources, most test classes. Cons: no line coverage, cannot check code quality, less error detection.'],
    ['White box pros and cons', 'Pros: checks paths and algorithms, line coverage, coding quality. Cons: vast resources, cannot test availability/reliability/stress.'],
    ['Path vs line coverage', 'Path = % of possible paths executed. Line = % of lines of code executed.'],
    ['Prototype advantages', 'Shorter process, savings, better fit to requirements, less risk, faster user understanding.']
  ],
  quiz: [
    { q: 'Top-down incremental testing needs…', o: ['Drivers', 'Stubs', 'No helpers', 'Only system test'], a: 1, why: 'Top-down tests upper modules first, so missing lower modules are replaced by stubs.' },
    { q: 'Which model adds risk analysis in every iteration?', o: ['Waterfall', 'Spiral', 'Prototyping', 'V-model'], a: 1, why: 'Spiral: planning, risk analysis, engineering, customer evaluation.' },
    { q: 'A module with two independent IF statements has how many full paths?', o: ['2', '3', '4', '8'], a: 2, why: '2 × 2 = 4 paths, though 2 tests can reach 100% line coverage.' },
    { q: '“Testing that ignores the internal mechanism and focuses on outputs” is…', o: ['White box', 'Black box', 'Path coverage', 'Inspection'], a: 1, why: 'IEEE definition of black box (functional) testing.' },
    { q: 'Which is an INDIRECT objective of testing?', o: ['Reveal errors', 'Reach acceptable quality', 'Keep error records for prevention', 'Stay within budget'], a: 2, why: 'Supplying records of errors for future prevention is the indirect objective.' }
  ]
},
{
  id: 'ch4', subject: 'sqa', num: 4, theme: 'control', title: 'SQA reviews', short: 'Reviews',
  lecture: 'Chapter 4 - SQA Reviews',
  summary: 'Static ways to find defects without running code: formal design reviews (DRs), peer reviews (inspections and walkthroughs), expert opinions, and contract reviews before a project is signed.',
  sections: [
    { h: 'What is a review?', pics: ['reviewTypes'], body: `
      <p><b>IEEE (1990)</b>: a process or meeting where a work product is presented to project personnel, managers, users, customers or other parties for comment or approval.</p>
      <p><b>Direct objectives</b>: detect analysis and design errors, identify new risks, identify deviations, approve the product. <b>Indirect</b>: share knowledge (tools, techniques), improve methods using data on design errors.</p>
      <p>Reviews are <b>static</b>: they find defects without running the software.</p>` },
    { h: '1. Formal design review (DR / FTR)', body: `
      <p>The <b>only</b> review that can <b>approve</b> a design. Without approval the team cannot move to the next phase.</p>
      <p><b>Review leader</b> should have: development experience; seniority equal to or higher than the project leader; a good relationship with the project leader; a position <i>outside</i> the project team.</p>
      <p><b>Review team</b>: senior project members plus senior professionals from other departments, customer/user representatives, sometimes consultants. Non-project staff should be the majority.</p>` },
    { h: '2. Peer reviews: inspection and walkthrough', body: `
      <ul><li><b>Inspection</b>: disciplined, formal. Uses checklists, defined roles (moderator, reader, recorder), and follow-up. Improves code and test cases; contributes more to SQA.</li>
      <li><b>Walkthrough</b>: informal meeting led by the author. Findings are only comments on the document.</li></ul>
      <p><b>DR vs peer review</b> differ in <b>participants</b> (DR: superiors and customer reps; peer: the project leader’s equals) and <b>authority</b> (DR can approve; peer reviews only find errors and deviations).</p>` },
    { h: '3. Expert opinions', body: `
      <p>Outside experts either write a judgement on a document or code, or join an internal review team.</p>
      <p>Most useful when: in-house skills are insufficient; reviewers are unavailable; there aren’t enough suitable candidates; or professional disagreement blocks a decision.</p>` },
    { h: 'Contract review', pics: ['contractReview'], body: `
      <p><b>Stage 1: Proposal draft review</b>. Check that: requirements are clarified, alternatives examined, formal relationship with customer defined, risks identified, resources and schedule estimated, company capacity and commitment checked, partners and subcontractors defined, proprietary rights protected.</p>
      <p><b>Stage 2: Contract draft review</b>. No unclear issues remain; all agreements after the proposal are documented correctly; no changes, additions or omissions.</p>
      <p><b>Extent depends on</b>: project size and complexity, staff experience in the area, number of other organisations involved.</p>
      <p><b>Difficulties</b>: time pressure; experts are busy. <b>Fix</b>: make it part of the proposal schedule, use a team, appoint a leader.</p>
      <p><b>Internal projects</b> need contract review too: loose internal relationships increase failure risk.</p>` }
  ],
  links: [
    { to: 'ch8', topic: 'Static V&V', text: 'Reviews are the main verification activity in each V&V phase in Ch 8.' },
    { to: 'ch10', topic: 'Code inspections', text: 'Ch 10: “code inspections pay for themselves many times over” and reviews of software architectures reduce risk.' },
    { to: 'ch7', topic: 'DRE and FTR', text: 'Ch 7’s Defect Removal Effectiveness: low DRE in design means you must improve formal technical reviews.' },
    { to: 'ch1', topic: 'Requirements errors', text: 'Contract and design reviews target error causes #1 and #2 from Ch 1.' },
    { to: 'ch3', topic: 'QA plan', text: 'Ch 3’s QA plan example used a design review and an inspection.' }
  ],
  mindmaps: [{
    center: 'SQA reviews', branches: [
      { label: 'Objectives', color: 'p', kids: ['Detect design errors', 'Find new risks + deviations', 'Approve product', 'Indirect: share knowledge'] },
      { label: 'Formal design review', color: 'p', kids: ['Only one that approves', 'Leader outside the team', 'Majority non-project staff'] },
      { label: 'Peer reviews', color: 't', kids: ['Inspection: formal, checklist', 'Walkthrough: informal', 'No approval authority'] },
      { label: 'Expert opinions', color: 'c', kids: ['Outside judgement', 'Join review team', 'When skills are missing'] },
      { label: 'Contract review', color: 'a', kids: ['Proposal draft review', 'Contract draft review', 'Also for internal projects'] },
      { label: 'Key idea', color: 'g', kids: ['Static: code not executed', 'Early = cheap fixes'] }
    ]
  }],
  cases: [
    { co: 'Google', logo: 'G', color: 'p', year: 'ongoing', title: 'Every change is reviewed', story: 'At Google, code changes are reviewed by another engineer before they can be submitted. Reviewers check correctness, design and readability. Their published research found review’s biggest value is knowledge sharing and readable code.', lesson: 'Peer review at scale, and the “indirect objective” (knowledge exchange) is real.' },
    { co: 'IBM (Fagan inspection)', logo: 'IBM', color: 't', year: '1976', title: 'Where formal inspection came from', story: 'Michael Fagan at IBM defined the formal inspection process with roles, checklists and follow-up. It became the model for the “inspection” method in your lecture.', lesson: 'Inspections are formal and measured; walkthroughs are not.' },
    { co: 'OpenSSL (Heartbleed)', logo: 'OS', color: 'r', year: '2014', title: 'A bug reviews missed', story: 'A missing bounds check in OpenSSL let attackers read server memory, exposing passwords and keys on a large share of web servers. The project had very few maintainers to review code.', lesson: 'Reviews need enough qualified reviewers. Security-critical code may need expert opinions.' },
    { co: 'Government IT tenders', logo: 'GV', color: 'a', year: 'common', title: 'Contract review before bidding', story: 'Companies bidding for public IT projects form a bid team that checks requirements, costs, risks and legal terms before submitting. Under-priced bids without this review often lead to losses or failed projects.', lesson: 'Contract review protects the company before any code is written.' }
  ],
  code: [
    { title: 'Pull request review checklist', lang: 'Markdown', explain: 'Put this in .github/pull_request_template.md. GitHub shows it on every pull request: a lightweight inspection checklist.', src:
`## What does this change do?

## Reviewer checklist
- [ ] Code meets the requirement / user story
- [ ] Inputs are validated (no SQL injection, no crashes on bad input)
- [ ] Errors are handled, not ignored
- [ ] Tests added or updated, and they pass
- [ ] No secrets or passwords in the code
- [ ] Names are clear; functions are short
- [ ] Docs / README updated if behaviour changed` },
    { title: 'Spot the defects (practice inspection)', lang: 'Python', explain: 'Try reviewing this like an inspector before reading the answers: 1) division by zero on an empty list, 2) SQL injection, 3) password stored in plain text, 4) bare except hides errors.', src:
`def average(marks):
    return sum(marks) / len(marks)            # defect 1

def find_user(db, name):
    return db.execute("SELECT * FROM users WHERE name = '" + name + "'")  # defect 2

def register(db, name, password):
    db.execute("INSERT INTO users VALUES (?, ?)", (name, password))      # defect 3
    try:
        send_welcome_email(name)
    except:                                    # defect 4
        pass` }
  ],
  beyond: [
    { skill: 'git', why: 'Pull requests on GitHub are how peer review happens today. Learn branching, reviewing and resolving comments.' },
    { skill: 'communication', why: 'A good review comment explains the problem and suggests a fix without attacking the author.' },
    { skill: 'ai', why: 'AI coding tools write a lot of code now. Reviewing AI output carefully is the new inspection skill.' },
    { skill: 'security', why: 'Security-focused code review (secure code review) catches issues like Heartbleed and SQL injection.' },
    { skill: 'estimation', why: 'Contract review checks resources and schedule estimates. Story points and COCOMO are the tools for this.' },
    { skill: 'requirements', why: 'A proposal draft review must confirm requirements are clarified and documented.' }
  ],
  cards: [
    ['3 major review methods', 'Formal design review, peer reviews (inspection and walkthrough), expert opinions.'],
    ['Which review can approve a design?', 'Only the formal design review (DR / FTR).'],
    ['4 qualities of a DR leader', 'Development experience, seniority ≥ project leader, good relationship with project leader, position outside the project team.'],
    ['Inspection vs walkthrough', 'Inspection: formal, checklists, roles, more SQA value. Walkthrough: informal, findings are comments only.'],
    ['DR vs peer review differ by…', 'Participants (superiors vs equals) and authority (DR approves; peer review only detects).'],
    ['2 stages of contract review', 'Proposal draft review, then contract draft review.'],
    ['When are expert opinions most useful?', 'Insufficient in-house skills, unavailable reviewers, too few candidates, or professional disagreement.']
  ],
  quiz: [
    { q: 'A meeting led by the author, informal, producing only comments, is a…', o: ['Formal design review', 'Inspection', 'Walkthrough', 'Contract review'], a: 2, why: 'Walkthroughs are informal and author-led.' },
    { q: 'Ideally, the majority of a design review team should be…', o: ['The project’s own developers', 'Non-project staff', 'Only the customer', 'Junior testers'], a: 1, why: 'Outsiders give independent judgement.' },
    { q: '“No unclarified issues remain” is an objective of…', o: ['Proposal draft review', 'Contract draft review', 'Walkthrough', 'Expert opinion'], a: 1, why: 'The contract draft review confirms the contract is complete and correct.' },
    { q: 'Reviews are called static because…', o: ['They are slow', 'The software is not executed', 'They use static typing', 'They happen once'], a: 1, why: 'They find defects without running the code.' }
  ]
},
{
  id: 'ch5', subject: 'sqa', num: 5, theme: 'reliability', title: 'Software reliability specification', short: 'Reliability spec',
  lecture: 'Chapter 5 - Software Specification',
  summary: 'What reliability means, why it depends on how the software is used, the four reliability metrics (POFOD, ROCOF, MTTF, availability), how to specify reliability, statistical testing and reliability growth models.',
  tool: 'reliability',
  sections: [
    { h: 'What is reliability?', body: `
      <p><b>Reliability</b> = the probability of failure-free operation for a specified time, in a specified environment, for a given purpose.</p>
      <ul><li>It <b>cannot be defined objectively</b>: numbers quoted out of context mean nothing.</li>
      <li>It needs an <b>operational profile</b>: the expected pattern of usage.</li>
      <li>It must consider <b>fault consequences</b>: serious faults make a system feel less reliable.</li></ul>
      <p>Failure = unexpected run-time behaviour a user sees. Fault = static code characteristic that causes failures. Faults only cause failures when that code is used.</p>` },
    { h: 'Improving reliability', body: `
      <ul><li>Remove faults in the <b>most frequently used</b> parts first.</li>
      <li>Removing x% of faults does not give x% more reliability. In one study, removing 60% of defects gave only 3% improvement.</li>
      <li>Remove faults with <b>serious consequences</b> first.</li></ul>
      <p><b>Formal methods</b> can prove code matches the spec and force detailed analysis, but the spec may be wrong, users may not understand it, proofs contain errors, and assumptions may be false.</p>` },
    { h: 'Reliability vs efficiency', pics: ['reliabilityVsEff'], body: `
      <p>More reliability usually means more run-time checks and redundant code, so lower efficiency. <b>Reliability usually wins</b>: computers are cheap and fast, unreliable software isn’t used, it’s hard to fix later, failure costs exceed system costs, and data loss is very expensive.</p>` },
    { h: 'Four reliability metrics', pics: ['reliabilityMetrics'], body: `
      <p>Hardware metrics assume components wear out. Software failures are always <b>design</b> failures, and the system often keeps running.</p>
      <ol><li><b>POFOD</b> (probability of failure on demand): failed requests ÷ total requests. 0.001 = 1 in 1000. For safety-critical, on-demand systems (e.g. emergency shutdown).</li>
      <li><b>ROCOF</b> (rate of failure occurrence): failures per time unit. 0.02 = 2 failures per 100 time units. For operating systems, transaction processing.</li>
      <li><b>MTTF</b> (mean time to failure): average time between failures. 500 = 500 time units. For long transactions (CAD).</li>
      <li><b>Availability</b>: share of time the system is usable, including repair/restart time. 0.998 = 998 of 1000 units. For continuous systems (telephone switches).</li></ol>
      <p><b>Time units</b>: raw execution time (non-stop systems), calendar time (regular daily use), or number of transactions (on-demand systems).</p>` },
    { h: 'Specifying reliability', body: `
      <p>Reliability measures ignore <b>consequences</b>, so classify failures (e.g. transient, permanent, recoverable, unrecoverable, corrupting, non-corrupting).</p>
      <ol><li>For each sub-system, analyse consequences of possible failures.</li><li>Partition failures into classes.</li><li>Set a reliability target per class with a suitable metric.</li></ol>
      <p>“No more than N faults per 1000 lines” is <b>not</b> a reliability spec: reliability is dynamic.</p>
      <p><b>Bank ATM example</b>: 1000 machines × 300 uses/day, 2-year life → ~200,000 transactions per machine and ~300,000 database transactions per day.</p>
      <p><b>Validation problem</b>: very high targets can’t be tested. “No database corruption” = POFOD below 1 in 200 million; simulating one day of transactions could take 3.5 days.</p>
      <p><b>Reliability economics</b>: sometimes it is cheaper to accept failures and pay for them, but reputation matters.</p>` },
    { h: 'Statistical testing', pics: ['statTesting'], body: `
      <p>Testing for <b>reliability</b>, not for finding faults. Test data follows the predicted usage profile.</p>
      <p><b>Challenges</b>: uncertain operational profile (worse for new systems), high cost of building the profile, statistical uncertainty for high targets, usage changes over time. Generate profiles automatically where possible; unlikely inputs are hard to predict.</p>` },
    { h: 'Reliability growth models', pics: ['growthCurve'], body: `
      <p>A mathematical model of how reliability changes as faults are found and removed, used to predict when a target will be reached.</p>
      <ul><li>Reliability doesn’t always go up: a fix can add a new fault.</li><li>Growth slows over time as common faults are removed.</li><li>No universal model: fit data to several models and use the best fit.</li></ul>` }
  ],
  links: [
    { to: 'ch6', topic: 'Reliability definition', text: 'Ch 6 starts with the same definition, then shows programming techniques to reach the target.' },
    { to: 'ch1', topic: 'Fault vs failure', text: 'Uses the Ch 1 fault/failure distinction.' },
    { to: 'ch2', topic: 'Reliability factor', text: 'Makes McCall’s “reliability” factor measurable.' },
    { to: 'ch7', topic: 'Metrics', text: 'POFOD, ROCOF, MTTF and availability are product metrics; Ch 7 covers process metrics and FP.' },
    { to: 'ch3', topic: 'Testing', text: 'Statistical testing differs from the defect testing in Ch 3.' },
    { to: 'ch9', topic: 'Cost of quality', text: 'Reliability economics links to TQM’s cost of quality in Ch 9.' }
  ],
  mindmaps: [{
    center: 'Reliability spec', branches: [
      { label: 'Definition', color: 't', kids: ['Failure-free probability', 'Specified time + environment', 'Needs operational profile', 'Consider consequences'] },
      { label: 'Metrics', color: 't', kids: ['POFOD: per request', 'ROCOF: per time', 'MTTF: time between', 'Availability: uptime'] },
      { label: 'Improvement', color: 'g', kids: ['Fix most-used parts', '60% faults → 3% gain', 'Serious faults first'] },
      { label: 'Trade-offs', color: 'a', kids: ['Reliability > efficiency', 'Formal methods limits', 'Accept + pay for failures?'] },
      { label: 'Specification', color: 'p', kids: ['Analyse consequences', 'Classify failures', 'Metric per class', 'Hard to validate high targets'] },
      { label: 'Statistical testing', color: 'c', kids: ['Operational profile', 'Time between failures', 'Growth models', 'Fit best model'] }
    ]
  }, {
    center: 'Pick the metric', branches: [
      { label: 'On-demand / safety', color: 't', kids: ['POFOD', 'Emergency shutdown, ATM'] },
      { label: 'Busy, continuous load', color: 't', kids: ['ROCOF', 'OS, transaction systems'] },
      { label: 'Long sessions', color: 't', kids: ['MTTF', 'CAD, design tools'] },
      { label: 'Must always be up', color: 't', kids: ['Availability', 'Telecom, cloud, banking app'] }
    ]
  }],
  cases: [
    { co: 'Amazon Web Services', logo: 'AWS', color: 'a', year: '2017', title: 'A typo took S3 down for hours', story: 'An engineer debugging billing ran a command with a wrong input and removed far more S3 servers than intended in the US-East-1 region. Many websites that depended on S3 broke for about four hours. AWS then made the tool remove capacity more slowly and added safety checks.', lesson: 'Availability includes restart and repair time. Recovery speed matters as much as avoiding failures.' },
    { co: 'Google SRE', logo: 'G', color: 'g', year: 'ongoing', title: 'SLOs and error budgets', story: 'Google’s Site Reliability Engineering sets a target like 99.9% availability (an SLO). The remaining 0.1% is an “error budget”: if a team uses it up, it stops releasing features and works on reliability.', lesson: 'Reliability specified quantitatively, exactly like this chapter recommends.' },
    { co: 'Telecom “five nines”', logo: '5N', color: 't', year: 'industry', title: '99.999% availability', story: 'Telephone switching systems (the lecture’s availability example) traditionally aimed for 99.999% uptime: about 5 minutes of downtime per year.', lesson: 'Availability is the right metric for continuously running systems.' },
    { co: 'Bank ATMs', logo: 'ATM', color: 'p', year: 'lecture', title: 'Specifying per failure class', story: 'An ATM network may accept a few transient failures (card rejected, try again), but database corruption must be almost impossible. Each class gets its own POFOD target.', lesson: 'Different failure classes need different reliability metrics.' }
  ],
  code: [
    { title: 'Compute the four reliability metrics', lang: 'Python', explain: 'From a simple log of requests and failures. Try the interactive calculator in the Tools section of this chapter.', src:
`requests       = 50_000      # service requests made
failed         = 25          # requests that failed
hours_running  = 1_000       # operating time
failures       = 4           # failures in that time
repair_hours   = 2           # total time down for repair/restart

pofod = failed / requests                    # 0.0005 -> 1 in 2000
rocof = failures / hours_running             # 0.004 per hour
mttf  = hours_running / failures             # 250 hours
availability = (hours_running - repair_hours) / hours_running  # 0.998

print(f"POFOD={pofod}, ROCOF={rocof}, MTTF={mttf}h, A={availability:.3%}")` },
    { title: 'Statistical testing with an operational profile', lang: 'Python', explain: 'Pick test inputs with the same proportions real users have (70% balance checks, 25% withdrawals...). Measure failures, then estimate POFOD.', src:
`import random

PROFILE = {"balance": 0.70, "withdraw": 0.25, "transfer": 0.05}

def pick_operation():
    return random.choices(list(PROFILE), weights=PROFILE.values())[0]

def run_statistical_test(atm, n=100_000):
    failures = 0
    for _ in range(n):
        op = pick_operation()
        try:
            atm.perform(op, amount=random.randint(10, 500))
        except Exception:
            failures += 1
    return failures / n          # estimated POFOD` }
  ],
  beyond: [
    { skill: 'observability', why: 'Companies measure reliability live with monitoring, dashboards and alerts (Grafana, Datadog, Sentry). That is how they know their real MTTF and availability.' },
    { skill: 'devops', why: 'Cloud SLAs promise availability (e.g. 99.95%). Load balancers, auto-restart and multi-region deployment raise it.' },
    { skill: 'testing', why: 'Load and performance testing (k6, JMeter, Locust) are modern statistical testing using realistic user profiles.' },
    { skill: 'dsa', why: 'Probability and statistics help you understand profiles, POFOD and growth curves.' },
    { skill: 'sql', why: 'Database corruption is the worst failure class in the ATM example. Transactions and backups prevent it.' }
  ],
  cards: [
    ['Definition of reliability', 'Probability of failure-free operation for a specified time, in a specified environment, for a given purpose.'],
    ['POFOD', 'Probability of failure on demand = failed requests ÷ total requests. 0.001 = 1 in 1000.'],
    ['ROCOF', 'Rate of failure occurrence: failures per time unit. 0.02 = 2 per 100 units.'],
    ['MTTF', 'Mean time to failure: average time between observed failures.'],
    ['Availability', 'Probability the system is available for use, including repair/restart time. 0.998 = 998 of 1000 units.'],
    ['Operational profile', 'The expected pattern of software usage; needed to define and test reliability.'],
    ['Statistical testing steps', '1) Find operational profile, 2) generate matching test data, 3) run and time failures, 4) compute reliability.'],
    ['Why removing 60% of faults may give 3% gain', 'Most removed faults were in rarely used code. Reliability depends on usage.'],
    ['3 time units for reliability', 'Raw execution time, calendar time, number of transactions.']
  ],
  quiz: [
    { q: 'An emergency shutdown system is used rarely but must work when called. Best metric?', o: ['MTTF', 'ROCOF', 'POFOD', 'KLOC'], a: 2, why: 'POFOD is for on-demand, safety-critical systems.' },
    { q: 'Availability of 0.998 means…', o: ['2 failures per 1000 requests', 'Available 998 of 1000 time units', 'MTTF of 998', '0.2% faults'], a: 1, why: 'Availability measures time the system is usable.' },
    { q: 'Statistical testing is mainly for…', o: ['Finding as many faults as possible', 'Measuring reliability', 'Reviewing design', 'Counting lines of code'], a: 1, why: 'It tests for reliability using the operational profile.' },
    { q: 'Why is “no more than 2 faults per KLOC” not a good reliability spec?', o: ['It is too strict', 'Reliability is dynamic and depends on usage', 'KLOC is illegal', 'It uses the wrong unit'], a: 1, why: 'Specs tied to source code ignore how the software is used.' },
    { q: 'Which statement about reliability growth is true?', o: ['It always increases with each fix', 'Its rate tends to slow over time', 'One model fits all systems', 'It ignores testing'], a: 1, why: 'Common faults are fixed first, so growth slows; fixes can also add new faults.' }
  ]
}
];
export default chapters;
