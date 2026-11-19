/* Important software engineering topics beyond the SQA lectures.
   Each one is linked back to the SQA chapters that need it (see "beyond" in the chapter data). */
export const skills = [
  { id: 'git', group: 'Core', title: 'Git and GitHub', icon: 'branch', level: 'Start now',
    what: 'Version control: track every change, work in branches, merge through pull requests.',
    learn: ['commit, branch, merge, rebase', 'Pull requests and code review', 'Resolving merge conflicts', '.gitignore, tags, releases', 'GitHub profile as your portfolio'],
    tools: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
    real: { co: 'Linux kernel', text: 'Linus Torvalds created Git in 2005 to manage Linux, one of the biggest collaborative projects in the world. Today almost every software company uses Git.' },
    code: { lang: 'Shell', src:
`git checkout -b feature/login        # new branch
git add . && git commit -m "Add login form validation"
git push -u origin feature/login     # then open a Pull Request
# after review:
git checkout main && git pull` },
    map: { center: 'Git', branches: [{ label: 'Basics', kids: ['commit', 'branch', 'merge'] }, { label: 'Teamwork', kids: ['pull request', 'review', 'conflicts'] }, { label: 'Releases', kids: ['tags', 'versions'] }, { label: 'Career', kids: ['GitHub portfolio'] }] } },

  { id: 'testing', group: 'Core', title: 'Software testing in practice', icon: 'check', level: 'Start now',
    what: 'Writing automated unit, integration and end-to-end tests that run on every change.',
    learn: ['Unit tests: pytest, JUnit, Jest', 'Mocks and stubs', 'Integration and API tests', 'End-to-end: Playwright, Cypress', 'TDD: red, green, refactor', 'Coverage (line and branch)'],
    tools: ['pytest', 'JUnit', 'Jest', 'Playwright', 'Postman'],
    real: { co: 'Google', text: 'Google runs millions of automated tests every day and publishes its “test pyramid” advice: many small unit tests, fewer integration tests, very few end-to-end tests.' },
    code: { lang: 'JavaScript', src:
`// sum.test.js  (run: npx jest)
const sum = (a, b) => a + b;

test('adds two numbers', () => {
  expect(sum(2, 3)).toBe(5);
});
test('handles negatives', () => {
  expect(sum(-2, -3)).toBe(-5);
});` },
    map: { center: 'Testing', branches: [{ label: 'Levels', kids: ['unit', 'integration', 'end-to-end'] }, { label: 'Techniques', kids: ['black box', 'white box', 'TDD'] }, { label: 'Helpers', kids: ['mocks', 'stubs', 'fixtures'] }, { label: 'Measure', kids: ['coverage', 'flaky tests'] }] } },

  { id: 'dsa', group: 'Core', title: 'Data structures and algorithms', icon: 'tree', level: 'Before internship',
    what: 'Arrays, hash maps, trees, graphs, sorting and searching, and Big-O analysis.',
    learn: ['Big-O time and space', 'Arrays, linked lists, stacks, queues', 'Hash maps and sets', 'Trees, heaps, graphs', 'Sorting, binary search, BFS/DFS', 'Practice on LeetCode / HackerRank'],
    tools: ['LeetCode', 'HackerRank', 'NeetCode roadmap'],
    real: { co: 'Grab, Shopee, Google', text: 'Most technical interviews in Malaysia and abroad include DSA coding questions. Grab’s ride matching and Google Maps routing are graph algorithms at huge scale.' },
    code: { lang: 'Python', src:
`# O(n^2): check duplicates the slow way
def has_dup_slow(xs):
    return any(xs[i] == xs[j] for i in range(len(xs)) for j in range(i + 1, len(xs)))

# O(n): use a set (hash table)
def has_dup(xs):
    seen = set()
    for x in xs:
        if x in seen: return True
        seen.add(x)
    return False` },
    map: { center: 'DSA', branches: [{ label: 'Structures', kids: ['array', 'hash map', 'tree', 'graph'] }, { label: 'Algorithms', kids: ['sort', 'search', 'BFS/DFS'] }, { label: 'Analysis', kids: ['Big-O time', 'Big-O space'] }, { label: 'Use', kids: ['interviews', 'efficiency factor'] }] } },

  { id: 'sql', group: 'Core', title: 'Databases and SQL', icon: 'db', level: 'Start now',
    what: 'Designing tables, querying with SQL, keeping data correct with constraints and transactions.',
    learn: ['SELECT, JOIN, GROUP BY', 'Normalisation (1NF-3NF)', 'Primary/foreign keys, constraints', 'Indexes and performance', 'Transactions and ACID', 'NoSQL basics (MongoDB, Redis)'],
    tools: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB'],
    real: { co: 'Banks', text: 'Every bank transfer is a database transaction: both accounts change or neither does (ACID). That is backward recovery from Chapter 6.' },
    code: { lang: 'SQL', src:
`SELECT s.name, AVG(r.mark) AS avg_mark
FROM students s
JOIN results r ON r.student_id = s.id
WHERE r.subject = 'SQA'
GROUP BY s.name
HAVING AVG(r.mark) >= 70
ORDER BY avg_mark DESC;` },
    map: { center: 'SQL', branches: [{ label: 'Query', kids: ['SELECT', 'JOIN', 'GROUP BY'] }, { label: 'Design', kids: ['normalise', 'keys'] }, { label: 'Safety', kids: ['transactions', 'constraints'] }, { label: 'Speed', kids: ['indexes'] }] } },

  { id: 'oop', group: 'Core', title: 'OOP, SOLID and clean code', icon: 'cube', level: 'Before internship',
    what: 'Designing classes that are easy to change, reuse and test.',
    learn: ['Encapsulation, inheritance, polymorphism', 'SOLID principles', 'Design patterns: Strategy, Factory, Observer', 'Clean code: names, small functions', 'Refactoring safely'],
    tools: ['Java', 'C#', 'Python', 'TypeScript'],
    real: { co: 'Android / Spring', text: 'Big frameworks like Spring (Java) are built on dependency injection and interfaces so that parts can be swapped and tested, the “O” and “D” in SOLID.' },
    code: { lang: 'Java', src:
`// Open/closed + dependency inversion
interface PaymentMethod { boolean pay(double amount); }

class Card implements PaymentMethod { public boolean pay(double a) { return true; } }
class EWallet implements PaymentMethod { public boolean pay(double a) { return true; } }

class Checkout {
    private final PaymentMethod method;          // depends on interface
    Checkout(PaymentMethod m) { this.method = m; }
    boolean complete(double total) { return method.pay(total); }
}` },
    map: { center: 'OOP + SOLID', branches: [{ label: 'Pillars', kids: ['encapsulation', 'inheritance', 'polymorphism'] }, { label: 'SOLID', kids: ['single responsibility', 'open/closed', 'dependency inversion'] }, { label: 'Patterns', kids: ['strategy', 'factory', 'observer'] }, { label: 'Clean code', kids: ['names', 'small functions'] }] } },

  { id: 'agile', group: 'Teamwork', title: 'Agile and Scrum', icon: 'loop', level: 'Second year',
    what: 'Working in short sprints with a backlog, daily standups, reviews and retrospectives.',
    learn: ['Scrum roles: PO, Scrum Master, team', 'Backlog, user stories, sprints', 'Standup, review, retrospective', 'Kanban boards and WIP limits', 'Definition of done'],
    tools: ['Jira', 'Trello', 'Azure Boards', 'Linear'],
    real: { co: 'Spotify, banks, startups', text: 'Most software teams, including Malaysian banks and startups, run two-week sprints tracked in Jira.' },
    map: { center: 'Agile', branches: [{ label: 'Roles', kids: ['product owner', 'scrum master', 'team'] }, { label: 'Events', kids: ['planning', 'standup', 'retro'] }, { label: 'Artifacts', kids: ['backlog', 'increment'] }, { label: 'Values', kids: ['feedback', 'small batches'] }] } },

  { id: 'requirements', group: 'Teamwork', title: 'Requirements and user stories', icon: 'doc', level: 'Second year',
    what: 'Turning what customers say into clear, testable requirements.',
    learn: ['User stories: As a…, I want…, so that…', 'Acceptance criteria (Given/When/Then)', 'Functional vs non-functional', 'Interviews, personas, prototypes', 'Prioritising (MoSCoW)'],
    tools: ['Jira', 'Figma', 'Miro', 'Confluence'],
    real: { co: 'Mars Climate Orbiter', text: 'A missing agreement about units in an interface requirement cost NASA a spacecraft. Clear requirements are the cheapest quality fix.' },
    code: { lang: 'Text', src:
`As a student,
I want to bookmark a chapter,
so that I can revise it quickly before the exam.

Acceptance criteria:
  Given I am on a chapter page
  When I tap the bookmark icon
  Then the chapter appears in my Saved list` },
    map: { center: 'Requirements', branches: [{ label: 'Write', kids: ['user stories', 'acceptance criteria'] }, { label: 'Types', kids: ['functional', 'non-functional'] }, { label: 'Discover', kids: ['interviews', 'prototypes'] }, { label: 'Prioritise', kids: ['MoSCoW'] }] } },

  { id: 'uml', group: 'Teamwork', title: 'UML and system design', icon: 'diagram', level: 'Second year',
    what: 'Drawing how a system is structured and behaves, and designing systems that scale.',
    learn: ['Use case, class, sequence diagrams', 'Architecture: layers, MVC, microservices', 'Caching, load balancing, queues', 'Scalability and trade-offs'],
    tools: ['draw.io', 'PlantUML', 'Mermaid', 'Lucidchart'],
    real: { co: 'System design interviews', text: 'Senior interviews often ask “design WhatsApp” or “design a URL shortener”. You draw components and data flows like a UML deployment view.' },
    code: { lang: 'Mermaid', src:
`sequenceDiagram
  Student->>App: open chapter
  App->>Storage: load progress
  Storage-->>App: 3 of 10 read
  App-->>Student: show notes` },
    map: { center: 'Design', branches: [{ label: 'UML', kids: ['use case', 'class', 'sequence'] }, { label: 'Architecture', kids: ['layers', 'MVC', 'microservices'] }, { label: 'Scale', kids: ['cache', 'load balancer', 'queue'] }] } },

  { id: 'docs', group: 'Teamwork', title: 'Documentation', icon: 'book', level: 'Always',
    what: 'READMEs, API docs, design notes and comments that help others use and maintain the code.',
    learn: ['Good README: what, install, run, test', 'API docs (OpenAPI/Swagger)', 'Architecture decision records', 'Comments explain WHY, not what'],
    tools: ['Markdown', 'Swagger', 'Docusaurus', 'Confluence'],
    real: { co: 'Stripe', text: 'Stripe is famous for excellent API documentation, which is a big reason developers choose it. Documentation is a product feature.' },
    map: { center: 'Docs', branches: [{ label: 'Project', kids: ['README', 'setup steps'] }, { label: 'API', kids: ['OpenAPI', 'examples'] }, { label: 'Design', kids: ['decision records'] }, { label: 'Code', kids: ['comments: why'] }] } },

  { id: 'cicd', group: 'Modern', title: 'CI/CD pipelines', icon: 'pipe', level: 'Third year',
    what: 'Automatically build, test and deploy on every push, so bugs are caught in minutes.',
    learn: ['GitHub Actions workflows', 'Run tests and linters on every PR', 'Quality gates (coverage, SonarQube)', 'Automatic deploy to staging and production'],
    tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'SonarQube'],
    real: { co: 'Etsy, Amazon', text: 'Companies with mature CI/CD deploy many times a day. Each change is small, tested automatically, and easy to roll back.' },
    code: { lang: 'YAML', src:
`# .github/workflows/test.yml
name: tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -r requirements.txt pytest pytest-cov
      - run: pytest --cov --cov-branch` },
    map: { center: 'CI/CD', branches: [{ label: 'CI', kids: ['build', 'test', 'lint'] }, { label: 'CD', kids: ['staging', 'production'] }, { label: 'Gates', kids: ['coverage', 'SonarQube'] }, { label: 'Safety', kids: ['rollback'] }] } },

  { id: 'devops', group: 'Modern', title: 'DevOps, Docker and cloud', icon: 'cloud', level: 'Third year',
    what: 'Packaging apps in containers and running them reliably in the cloud.',
    learn: ['Linux command line', 'Docker images and containers', 'Cloud basics: AWS / Azure / GCP', 'Infrastructure as code', 'Feature flags, canary releases', 'DORA metrics'],
    tools: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    real: { co: 'Netflix', text: 'Netflix runs on AWS with thousands of microservices, automated deployment and chaos testing to keep streaming available.' },
    code: { lang: 'Dockerfile', src:
`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]` },
    map: { center: 'DevOps', branches: [{ label: 'Containers', kids: ['Docker', 'Kubernetes'] }, { label: 'Cloud', kids: ['AWS', 'Azure', 'GCP'] }, { label: 'Release', kids: ['feature flags', 'canary'] }, { label: 'Measure', kids: ['DORA metrics'] }] } },

  { id: 'api', group: 'Modern', title: 'APIs (REST and JSON)', icon: 'plug', level: 'Second year',
    what: 'How apps talk to servers and to each other.',
    learn: ['HTTP methods and status codes', 'REST design, JSON', 'Authentication (tokens, OAuth)', 'Timeouts, retries, rate limits', 'GraphQL basics'],
    tools: ['Postman', 'FastAPI', 'Express', 'Spring Boot'],
    real: { co: 'DuitNow / payment gateways', text: 'Payment gateways and e-wallets expose APIs so shops can accept payments. Interoperability (Chapter 2) is mostly API design.' },
    code: { lang: 'Python', src:
`# FastAPI: pip install fastapi uvicorn ; uvicorn main:app --reload
from fastapi import FastAPI, HTTPException
app = FastAPI()
CHAPTERS = {1: "Intro to quality", 2: "Quality factors"}

@app.get("/chapters/{num}")
def get_chapter(num: int):
    if num not in CHAPTERS:
        raise HTTPException(status_code=404, detail="Not found")
    return {"num": num, "title": CHAPTERS[num]}` },
    map: { center: 'APIs', branches: [{ label: 'HTTP', kids: ['GET POST PUT DELETE', 'status codes'] }, { label: 'Design', kids: ['REST', 'JSON'] }, { label: 'Security', kids: ['tokens', 'OAuth'] }, { label: 'Resilience', kids: ['timeouts', 'retries'] }] } },

  { id: 'security', group: 'Modern', title: 'Security basics', icon: 'lock', level: 'Third year',
    what: 'Protecting users and data: the integrity quality factor in practice.',
    learn: ['OWASP Top 10', 'SQL injection and XSS', 'Password hashing (bcrypt, Argon2)', 'Least privilege and access control', 'Secrets management', 'Threat modelling (STRIDE)'],
    tools: ['OWASP ZAP', 'Snyk', 'Dependabot', 'Burp Suite'],
    real: { co: 'Equifax', text: 'An unpatched web framework vulnerability led to data of about 147 million people being stolen in 2017.' },
    code: { lang: 'Python', src:
`# BAD: SQL injection
db.execute("SELECT * FROM users WHERE email = '" + email + "'")

# GOOD: parameterised query
db.execute("SELECT * FROM users WHERE email = ?", (email,))

# Store password hashes, never plain text
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())` },
    map: { center: 'Security', branches: [{ label: 'Attacks', kids: ['SQL injection', 'XSS', 'CSRF'] }, { label: 'Protect', kids: ['hashing', 'least privilege'] }, { label: 'Process', kids: ['threat modelling', 'patching'] }, { label: 'Guide', kids: ['OWASP Top 10'] }] } },

  { id: 'observability', group: 'Modern', title: 'Monitoring and reliability (SRE)', icon: 'pulse', level: 'Third year',
    what: 'Knowing what your system is doing in production: logs, metrics, alerts, error tracking.',
    learn: ['Structured logging', 'Metrics and dashboards', 'Alerts and on-call', 'SLOs and error budgets', 'Blameless postmortems'],
    tools: ['Grafana', 'Prometheus', 'Sentry', 'Datadog'],
    real: { co: 'Google SRE', text: 'Google’s SRE book made SLOs and error budgets standard practice: reliability targets that decide when to slow down feature work.' },
    code: { lang: 'Python', src:
`import logging, time
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("checkout")

start = time.time()
try:
    process_order(order)
    log.info("order ok id=%s ms=%d", order.id, (time.time() - start) * 1000)
except Exception:
    log.exception("order failed id=%s", order.id)   # sent to Sentry/alerts
    raise` },
    map: { center: 'Observability', branches: [{ label: 'Signals', kids: ['logs', 'metrics', 'traces'] }, { label: 'Targets', kids: ['SLO', 'error budget'] }, { label: 'Response', kids: ['alerts', 'on-call'] }, { label: 'Learn', kids: ['postmortems'] }] } },

  { id: 'ai', group: 'Emerging', title: 'AI-assisted development', icon: 'spark', level: 'Now',
    what: 'Using AI coding assistants productively, and reviewing their output like any other code.',
    learn: ['Write clear prompts with context', 'Always review and test AI code', 'Watch for invented APIs and security holes', 'Do not paste secrets or private data', 'Basics of how LLMs work'],
    tools: ['Claude Code', 'GitHub Copilot', 'Cursor'],
    real: { co: 'Industry', text: 'Many companies now use AI coding tools daily. Teams that keep code review and tests in place get the speed benefit without the quality loss.' },
    map: { center: 'AI + code', branches: [{ label: 'Use', kids: ['prompts', 'context'] }, { label: 'Check', kids: ['review', 'tests'] }, { label: 'Risks', kids: ['wrong APIs', 'security', 'privacy'] }] } },

  { id: 'frameworks', group: 'Emerging', title: 'Web and mobile frameworks', icon: 'phone', level: 'Projects',
    what: 'Building real apps your users can use: web frontends, mobile apps, backends.',
    learn: ['HTML, CSS, JavaScript/TypeScript', 'React or Vue; Next.js', 'Flutter or React Native for mobile', 'Accessibility basics', 'Responsive design'],
    tools: ['React', 'Next.js', 'Flutter', 'React Native'],
    real: { co: 'Google Pay, Alibaba', text: 'Flutter is used for apps like Google Pay and parts of Alibaba’s Xianyu app, sharing one codebase across Android and iOS (portability).' },
    map: { center: 'Frameworks', branches: [{ label: 'Web', kids: ['React', 'Next.js'] }, { label: 'Mobile', kids: ['Flutter', 'React Native'] }, { label: 'Quality', kids: ['accessibility', 'responsive'] }] } },

  { id: 'ethics', group: 'Professional', title: 'Ethics and law (PDPA)', icon: 'scale', level: 'Always',
    what: 'Your responsibility to users and society, and laws about personal data.',
    learn: ['ACM/IEEE Software Engineering Code of Ethics', 'Malaysia PDPA 2010: consent, purpose, security', 'Privacy by design', 'Accessibility and fairness', 'Reporting safety problems'],
    tools: ['PDPA guidelines', 'GDPR (EU) for comparison'],
    real: { co: 'Therac-25, 737 MAX', text: 'Software decisions caused deaths. Engineers are expected to raise safety concerns even when it is uncomfortable.' },
    map: { center: 'Ethics', branches: [{ label: 'Codes', kids: ['ACM/IEEE code'] }, { label: 'Law', kids: ['PDPA 2010', 'consent'] }, { label: 'Design', kids: ['privacy by design', 'accessibility'] }, { label: 'Courage', kids: ['report safety issues'] }] } },

  { id: 'estimation', group: 'Professional', title: 'Estimation and project management', icon: 'calendar', level: 'Final year project',
    what: 'Predicting effort and time, and tracking a project so it finishes.',
    learn: ['Story points and planning poker', 'Function points and COCOMO', 'Gantt charts, milestones, critical path', 'Buffers and risk', 'Velocity and burndown charts'],
    tools: ['Jira', 'MS Project', 'TeamGantt', 'GitHub Projects'],
    real: { co: 'Software tenders', text: 'Companies use size estimates (FP, COCOMO) to price fixed-cost projects. Bad estimates are a top cause of late projects.' },
    code: { lang: 'Python', src:
`# Basic COCOMO (organic project)
def cocomo(kloc):
    effort = 2.4 * kloc ** 1.05          # person-months
    time = 2.5 * effort ** 0.38          # months
    return round(effort, 1), round(time, 1), round(effort / time, 1)

print(cocomo(10))   # (26.9 PM, 8.7 months, ~3 people)` },
    map: { center: 'Estimation', branches: [{ label: 'Size', kids: ['FP', 'story points'] }, { label: 'Models', kids: ['COCOMO'] }, { label: 'Track', kids: ['Gantt', 'burndown'] }, { label: 'Risk', kids: ['buffers'] }] } },

  { id: 'communication', group: 'Professional', title: 'Communication', icon: 'chat', level: 'Always',
    what: 'Explaining problems, writing bug reports and commit messages, presenting work.',
    learn: ['Bug report: steps, expected, actual', 'Good commit messages', 'Kind, specific code review comments', 'Presenting to non-technical people', 'Blameless postmortems'],
    tools: ['Slack', 'Teams', 'Confluence'],
    real: { co: 'Every team', text: 'Many project failures in your lectures (Mars Climate Orbiter, unclear requirements) are communication failures, not coding failures.' },
    code: { lang: 'Text', src:
`Title: Quiz score resets after rotating phone

Steps:    1. Open Ch 3 quiz  2. Answer 2 questions  3. Rotate phone
Expected: Score stays 2/5
Actual:   Score shows 0/5
Device:   Android 15, Chrome 131
Severity: Medium (data loss, workaround: don't rotate)` },
    map: { center: 'Communication', branches: [{ label: 'Writing', kids: ['bug reports', 'commits'] }, { label: 'Reviews', kids: ['kind + specific'] }, { label: 'Speaking', kids: ['standups', 'demos'] }, { label: 'Culture', kids: ['blameless'] }] } }
];

export const skillGroups = [
  { id: 'Core', label: 'Core: use every day' },
  { id: 'Teamwork', label: 'How teams work' },
  { id: 'Modern', label: 'Modern engineering' },
  { id: 'Emerging', label: 'Emerging' },
  { id: 'Professional', label: 'Professional skills' }
];
