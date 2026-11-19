/* Database and Cloud Security, lecture 1. Notes summarised from Lecture-1-Threat-Analysis-and-Compliance.pptx. */
const chapters = [
{
  id: 'dcs1', subject: 'dcs', num: 1, theme: 'threats', title: 'Threat analysis and compliance', short: 'Threats and compliance',
  lecture: 'Lecture-1-Threat-Analysis-and-Compliance',
  summary: 'Threats to databases, the six steps of threat modelling (assets, architecture, security profile, identify, document, rate), STRIDE and DREAD, countermeasures for SQL Server, and compliance with SOX, GDPR and Malaysia’s PDPA. The course secures SQL Server in lectures and attacks it in tutorials.',
  sections: [
    { h: 'Threats to databases', pics: [{ cards: [{ t: 'SQL injection', s: 'Input becomes SQL code', c: 'r' }, { t: 'Brute force on sa', s: 'Port 1433, account often enabled', c: 'r' }, { t: 'Insider attacks', s: 'Staff with access', c: 'c' }, { t: 'External attacks', s: 'From the internet', c: 'c' }], cols: 2, title: 'Threats to every RDBMS' }], body: `
      <p>Hackers are often described as <b>white hat</b> (authorised, defensive), <b>grey hat</b> (no permission, but no malicious intent) and <b>black hat</b> (malicious). Attacks hurt <b>customers</b> (stolen data), the <b>business</b> (fines, reputation, lost customers) and the <b>people responsible</b> for the data.</p>
      <p><b>Threat modelling</b> decides which threats to deal with first and which countermeasures to use.</p>` },
    { h: 'What is threat modelling?', pics: [{ flow: [['1. Identify assets', 'Sensitive data'], ['2. Architecture overview', 'Infrastructure + technology stack'], ['3. Security profile', 'Data flows, trust boundaries, entry points'], ['4. Identify threats', 'STRIDE, penetration tests'], ['5. Document threats', 'STRIDE table'], ['6. Rate and prioritise', 'DREAD']], colors: ['p', 'p', 't', 'c', 'c', 'r'], title: 'Six steps of threat modelling' }], body: `
      <p>Understanding the threats to a data-tier application, then classifying and rating them to find the most critical. Do it in the <b>design phase</b>, at the latest in <b>testing</b>, and compare the results with enterprise standards. <b>Countermeasures are not part of threat modelling</b>; they come after.</p>
      <p><b>Case study:</b> CarterSecureSafe, a web shop of the fictional CarterSecurityTools.com selling security software, with a SQL Server back end.</p>` },
    { h: 'Step 1: identify assets', pics: [{ cards: [{ t: 'High-risk', s: 'Identity theft or harm + legal penalties', c: 'r' }, { t: 'Restricted', s: 'Legal penalties for disclosure', c: 'c' }, { t: 'Confidential', s: 'Company chooses to protect', c: 'a' }], cols: 3, title: 'Three categories of sensitive data' }], body: `
      <p>For a DBA the main assets are <b>sensitive data</b>: customer data, corporate secrets, financial data. Losing it means fines, reputation damage, low staff morale and customers leaving.</p>
      <p><b>MMU example:</b> in an academic system, student ID, courses, schedule, test scores, grades/GPA, advising and disciplinary records, and student email are all sensitive.</p>` },
    { h: 'Steps 2–3: architecture and security profile', pics: [{ flow: [['Internet customers'], ['Perimeter firewall'], ['Web server (DMZ)'], ['Internal firewall'], ['Application server'], ['SQL Server'], ['DBAs connect directly']], color: 't', title: 'CarterSecureSafe data flow and trust boundaries' }], body: `
      <p><b>Architecture overview</b>: draw the logical architecture, find vulnerable end-to-end paths and technology-specific weaknesses. Two parts: <b>infrastructure components</b> (internal users via Active Directory, external users via the web server in the <b>DMZ</b>, domain controller, firewalls) and the <b>technology stack</b>.</p>
      <p><b>Security profile</b>: map data flows to find <b>trust boundaries</b> (the firewalls) and <b>entry points</b>: customers (web server), internal users (application server), and DBAs (direct to SQL Server).</p>
      <p><b>Authentication</b> checks who you are; <b>authorisation</b> decides what you may do.</p>` },
    { h: 'Step 4–5: STRIDE', pics: [{ cards: [{ t: 'S: Spoofing identity', s: 'Use someone else’s login', c: 'r' }, { t: 'T: Tampering', s: 'Maliciously change data', c: 'r' }, { t: 'R: Repudiation', s: 'Deny or hide actions', c: 'c' }, { t: 'I: Information disclosure', s: 'See more than allowed', c: 'c' }, { t: 'D: Denial of service', s: 'Flood until it fails', c: 'a' }, { t: 'E: Elevation of privilege', s: 'Gain extra permissions', c: 'a' }], cols: 2, title: 'STRIDE' }], body: `
      <p>Threats are found through penetration tests (tools like <b>Qualys, Metasploit, Kali</b>), then organised and documented with STRIDE.</p>` },
    { h: 'Step 6: rating with DREAD', pics: [{ cards: [{ t: 'Damage potential', s: '1 minimal … 10 catastrophic', c: 'r' }, { t: 'Reproducibility', s: '10 = very easy (bots)', c: 'c' }, { t: 'Exploitability', s: '10 = easy to exploit', c: 'c' }, { t: 'Affected users', s: '% users ÷ 10, rounded', c: 'a' }, { t: 'Discoverability', s: '10 = easy to find (SQLi)', c: 'a' }], cols: 2, title: 'DREAD (each 1–10)' }], body: `
      <p>Rate each threat by likelihood and damage. Methods: High/Medium/Low; Critical/Important/Moderate/Low; quantitative (damage × probability); or <b>DREAD</b>: add the five ratings, divide by 5 and round.</p>` },
    { h: 'Countermeasures', body: `
      <ul><li><b>SQL injection</b>: input validation (and parameterised queries).</li><li><b>DoS</b>: keep the database out of the DMZ and off the internet; use <b>Resource Governor</b>.</li><li><b>Stolen sa credentials</b>: disable or rename <code>sa</code>; enable <b>SQL Server Audit</b>.</li><li><b>Malicious DBA</b>: a response strategy plus SQL Server Audit.</li><li><b>Remote code execution bug</b> rated low: log in the risk register and patch.</li></ul>` },
    { h: 'Compliance: SOX, GDPR, PDPA', pics: [{ cards: [{ t: 'SOX (US, 2002)', s: 'After Enron; financial accuracy', c: 'p' }, { t: 'GDPR (EU, 2018)', s: 'Up to €20M or 4% turnover', c: 't' }, { t: 'PDPA (Malaysia, 2010)', s: 'RM100k–500k and/or 1–3 years', c: 'c' }], cols: 3, title: 'Laws that shape database security' }], body: `
      <p><b>SOX</b> applies to US public companies. For DBAs: <b>auditing</b> (access to critical data, permissions, schema changes, failed logins), <b>separation of duties</b> (DBAs vs developers), and documented, enforced <b>controls</b>.</p>
      <p><b>GDPR</b> protects EU residents' data privacy and control. Data protection <b>by design and by default</b>: authentication, secure processing and encryption, audit records, risk assessment and proof of compliance.</p>
      <p><b>PDPA 2010</b> regulates processing of personal data in commercial transactions in Malaysia (gazetted June 2010).</p>
      <p><b>Lab preparation:</b> install SQL Server Developer edition, SSMS and the WideWorldImporters sample database.</p>` }
  ],
  links: [
    { to: 'ch10', topic: 'Risk rating', text: 'Software QA Ch 10 rates risks with probability × impact and RMMM; DREAD and STRIDE are the security versions.' },
    { to: 'ch2', topic: 'Integrity factor', text: 'Software QA Ch 2: integrity (security) is a McCall quality factor.' },
    { to: 'plt3', topic: 'Why SQL injection works', text: 'Prog Lang Translation Ch 3: the database’s scanner reads injected text as SQL tokens.' },
    { to: 'ch6', topic: 'Defensive programming', text: 'Software QA Ch 6: never trust input; validate it.' }
  ],
  mindmaps: [{ center: 'Threat modelling', branches: [
    { label: 'Threats', color: 'r', kids: ['SQL injection', 'Brute force sa (1433)', 'Insider + external'] },
    { label: '6 steps', color: 'p', kids: ['Assets, architecture', 'Security profile', 'Identify, document, rate'] },
    { label: 'Sensitive data', color: 'c', kids: ['High-risk', 'Restricted', 'Confidential'] },
    { label: 'STRIDE', color: 'c', kids: ['Spoofing, tampering', 'Repudiation, disclosure', 'DoS, elevation'] },
    { label: 'DREAD', color: 'a', kids: ['Damage, reproducibility', 'Exploitability, users', 'Discoverability; avg of 5'] },
    { label: 'Compliance', color: 't', kids: ['SOX: audit, separation', 'GDPR: by design', 'PDPA Malaysia'] }
  ] }],
  cases: [
    { co: 'Heartland Payment Systems', logo: 'HP', color: 'r', year: '2008', title: 'SQL injection at scale', story: 'Attackers used SQL injection to get into the payment processor’s network and install malware that captured card data for about 130 million cards.', lesson: 'SQL injection is easy to discover and exploit, so it rates high in DREAD.' },
    { co: 'TalkTalk', logo: 'TT', color: 'c', year: '2015', title: 'Old pages, simple attack', story: 'The UK telecom lost personal data of about 157,000 customers through SQL injection on legacy web pages. The regulator fined it £400,000.', lesson: 'Know your assets and entry points, including old ones.' },
    { co: 'Capital One', logo: 'CO', color: 'a', year: '2019', title: 'Cloud misconfiguration', story: 'A misconfigured web application firewall in the cloud let an attacker obtain credentials and read data on about 100 million people.', lesson: 'Cloud security is shared responsibility; trust boundaries and least privilege still apply.' },
    { co: 'British Airways', logo: 'BA', color: 'p', year: '2018–2020', title: 'GDPR fine', story: 'Attackers skimmed customer card details from BA’s website. The UK regulator fined BA £20 million under GDPR.', lesson: 'Compliance failures have real financial cost.' }
  ],
  code: [
    { title: 'SQL injection: vulnerable vs safe', lang: 'Python', explain: 'String concatenation lets input change the query. Parameters keep input as data only.', src: String.raw`import sqlite3
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT, password TEXT)")
db.execute("INSERT INTO users VALUES ('admin', 'S3cret!')")

user_input = "x' OR '1'='1"

# VULNERABLE: input becomes part of the SQL text
q = "SELECT * FROM users WHERE name = '" + user_input + "'"
print(db.execute(q).fetchall())          # returns every user!

# SAFE: parameterised query, input is only data
print(db.execute("SELECT * FROM users WHERE name = ?", (user_input,)).fetchall())   # []` },
    { title: 'Harden the sa account and audit failed logins (T-SQL)', lang: 'SQL', explain: 'Countermeasures from the lecture for stolen sa credentials. Run in SSMS on your lab server.', src: String.raw`-- Disable and rename the well-known sa login
ALTER LOGIN sa DISABLE;
ALTER LOGIN sa WITH NAME = [lab_admin_disabled];

-- SQL Server Audit: record failed logins to a file
CREATE SERVER AUDIT LoginAudit TO FILE (FILEPATH = 'C:\SQLAudit\');
ALTER SERVER AUDIT LoginAudit WITH (STATE = ON);

CREATE SERVER AUDIT SPECIFICATION FailedLogins
FOR SERVER AUDIT LoginAudit
ADD (FAILED_LOGIN_GROUP)
WITH (STATE = ON);` },
    { title: 'DREAD calculator', lang: 'Python', explain: 'Average of the five ratings, rounded; sort threats so the highest is handled first.', src: String.raw`threats = {
    "SQL injection on product search":  dict(D=8, R=10, E=8, A=10, Di=10),
    "Brute force on sa (port 1433)":    dict(D=10, R=8, E=6, A=10, Di=7),
    "DoS on web server":                dict(D=6, R=7, E=7, A=10, Di=8),
    "Malicious DBA":                    dict(D=10, R=3, E=4, A=10, Di=2),
}

def dread(r):
    return round(sum(r.values()) / 5)

for name, r in sorted(threats.items(), key=lambda kv: -dread(kv[1])):
    print(f"{dread(r):2}  {name}")` }
  ],
  beyond: [
    { skill: 'security', why: 'This whole course is the database side of security: OWASP, injection and least privilege.' },
    { skill: 'sql', why: 'You can only secure SQL you understand: parameterised queries, permissions and auditing.' },
    { skill: 'devops', why: 'Cloud databases need network rules, secrets management and patching in the deployment pipeline.' },
    { skill: 'ethics', why: 'PDPA, GDPR and SOX turn data ethics into law.' },
    { skill: 'observability', why: 'SQL Server Audit and log monitoring are how you detect repudiation and insider attacks.' }
  ],
  cards: [
    ['Six steps of threat modelling', 'Identify assets, architecture overview, security profile, identify threats, document threats, rate threats.'],
    ['STRIDE', 'Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.'],
    ['DREAD', 'Damage, Reproducibility, Exploitability, Affected users, Discoverability. Average of five 1–10 scores.'],
    ['Three categories of sensitive data', 'High-risk, restricted, confidential.'],
    ['Authentication vs authorisation', 'Authentication: who you are. Authorisation: what you may do.'],
    ['SOX key points for DBAs', 'Auditing, separation of duties, documented controls.'],
    ['PDPA penalties', 'RM100,000–RM500,000 and/or 1–3 years in prison.']
  ],
  quiz: [
    { q: 'A user deletes records and then denies doing it. Which STRIDE threat?', o: ['Spoofing', 'Tampering', 'Repudiation', 'Elevation'], a: 2, why: 'Hiding or denying activity.' },
    { q: 'DREAD scores 8, 10, 8, 10, 10 give an overall rating of…', o: ['8', '9', '10', '46'], a: 1, why: '46 ÷ 5 = 9.2 → 9.' },
    { q: 'Countermeasure for DoS in the lecture:', o: ['Rename sa', 'Keep DB out of the DMZ and use Resource Governor', 'Input validation', 'Patch later'], a: 1, why: 'Keep the database away from the internet.' },
    { q: 'When should threat modelling be done?', o: ['After release', 'Design phase, at the latest testing', 'Only after an attack', 'During coding only'], a: 1, why: 'Early, so design can change.' }
  ]
}
];
export default chapters;
