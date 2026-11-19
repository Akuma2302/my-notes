/* SQA chapters 6-10. Notes summarised from the CSE6314 lecture slides. */

const chapters = [
{
  id: 'ch6', subject: 'sqa', num: 6, theme: 'reliability', title: 'Programming reliability', short: 'Programming reliability',
  lecture: 'Chapter 6 - Programming Realiability',
  summary: 'How to write reliable code: fault avoidance (strong typing, information hiding, careful use of error-prone constructs), fault tolerance (N-version programming, recovery blocks), exception handling, defensive programming, damage assessment, forward vs backward recovery, and safety and hazard analysis.',
  sections: [
    { h: 'Three ways to achieve reliability', pics: ['achieve'], body: `
      <ol><li><b>Fault avoidance</b>: develop so the software has no faults.</li>
      <li><b>Fault detection</b>: organise the process to find and fix faults before delivery.</li>
      <li><b>Fault tolerance</b>: design so faults in delivered software don’t cause complete system failure.</li></ol>` },
    { h: 'Fault avoidance', pics: ['faultCost'], body: `
      <p>“Fault-free” means conforms to the spec. It does <b>not</b> mean always correct, because the spec can be wrong. Producing fault-free software is very expensive; cost per removed error rises sharply as few errors remain.</p>
      <p><b>Needs</b>: a precise (preferably formal) spec; information hiding and encapsulation; a strictly typed language with run-time checks; reviews at every stage; organisational commitment to quality; and still careful system testing.</p>
      <p><b>Ada</b> was designed for the US Department of Defense for reliability: strong typing, nested packages, multi-tasking, exception handling, abstract data types (Ada 83, Ada 95). <b>C++</b> is more popular: better type checking than C, weaker than Ada.</p>` },
    { h: 'Error-prone constructs and structured programming', body: `
      <p><b>Structured programming</b> (1970s): no <code>goto</code>, only while loops and if statements, top-down design.</p>
      <p>Use with great care:</p>
      <ul><li><b>Pointers</b>: pointing to the wrong memory corrupts data.</li><li><b>Dynamic memory allocation</b>: run-time allocation can overflow memory.</li><li><b>Recursion</b>: mistakes can overflow the stack.</li></ul>` },
    { h: 'Information hiding and data typing', body: `
      <p>Expose information only to parts of the program that need it (encapsulation). This avoids faults because (1) less chance of accidental corruption, (2) “firewalls” stop problems spreading, (3) localised information means fewer mistakes and easier reviews.</p>
      <p>Each component should access only the data it needs, and a type’s representation should be hidden. Types can model real things: <code>TrafficLightColour</code> in C++, <code>POSITIVE is INTEGER range 1..MAXINT</code> in Ada, a Java <code>Signal</code> class or a <code>Queue</code> interface.</p>` },
    { h: 'Fault tolerance', pics: ['ftSteps'], body: `
      <p>Critical systems must keep operating despite failures, even if “proven” fault-free, because the spec or validation could be wrong.</p>
      <p>Many failures are <b>transient</b> and data-dependent; a restart may fix them. Otherwise use <b>dynamic reconfiguration</b>: replace components without stopping.</p>` },
    { h: 'N-version programming and recovery blocks', pics: ['nversion', 'recoveryBlock'], body: `
      <ul><li><b>N-version programming</b>: several teams implement the same spec; all versions run; a comparator picks the majority output. Used in the Airbus A320. Weakness: doesn’t help if the spec is wrong, and teams often misread the spec the same way.</li>
      <li><b>Recovery blocks</b>: versions run in sequence; the first output that passes an <b>acceptance test</b> is used. Different algorithms reduce common errors. Weakness: writing an independent acceptance test is hard.</li></ul>` },
    { h: 'Exception handling and defensive programming', body: `
      <p>An <b>exception</b> is an error or unexpected event (e.g. power failure). Exception handling avoids checking status after every call, which would add many statements and slow the program. In C++, exceptions are classes and can inherit.</p>
      <p><b>Defensive programming</b> assumes undetected faults exist and adds code to detect and recover. Like defensive driving: expect others’ mistakes. No special controller needed.</p>
      <p><b>Failure prevention</b>: type systems catch errors at compile time; range checks and exceptions at run time; <b>assertions</b> catch more (e.g. Sun’s Assertion Definition Language).</p>` },
    { h: 'Damage assessment and recovery', pics: ['recovery'], body: `
      <p><b>Damage assessment</b>: find which parts of the state are corrupted using validity functions, <b>checksums</b> (data transmission), and <b>redundant pointers</b> (data structures).</p>
      <p><b>Forward recovery</b>: repair the corrupted state (error-correcting codes, rebuilding a two-way list from good pointers). Needs domain knowledge, possible only in few cases.</p>
      <p><b>Backward recovery</b>: roll back to a known safe state: <b>transactions</b>, <b>checkpoints</b>, Windows System Restore, the <b>Undo</b> button. Simpler and more common. Problems: performance cost, the fault may recur, can’t undo outputs already sent.</p>
      <p><b>Safe sort</b>: keeps a copy of its input and checks its own result.</p>` },
    { h: 'Safety and hazard analysis', pics: ['hazard'], body: `
      <p><b>Safety-critical software</b>: malfunction may cause injury or death (aircraft, nuclear plant control).</p>
      <p><b>Reliable ≠ safe</b>. Reliable software meets its spec, but the spec may be incomplete about hardware failures or operator inputs, so a reliable system can still cause an accident.</p>
      <ul><li><b>Accident</b>: unplanned event causing death, injury or damage.</li><li><b>Hazard</b>: a condition that could cause an accident (an obstacle sensor fails).</li><li><b>Damage</b>: size of the loss.</li></ul>
      <p><b>Hazard analysis</b>: study the system and its environment to find hazards. Needs lateral thinking, system engineers, domain experts and safety advisers; brainstorming helps because hazards come from unusual combinations, not only failures.</p>` }
  ],
  links: [
    { to: 'ch5', topic: 'Reliability', text: 'Ch 5 defines and measures reliability; Ch 6 shows how to build it into code.' },
    { to: 'ch1', topic: 'Fault vs failure', text: 'Recaps the fault/failure difference first taught in Ch 1.' },
    { to: 'ch2', topic: 'Safety factor', text: 'Safety and survivability are extra quality factors from Ch 2’s alternative models.' },
    { to: 'ch10', topic: 'Hazards and risk', text: 'Hazard analysis is a safety-focused form of the risk analysis in Ch 10.' },
    { to: 'ch4', topic: 'Reviews', text: 'Fault avoidance needs reviews at every stage (Ch 4).' }
  ],
  mindmaps: [{
    center: 'Programming reliability', branches: [
      { label: 'Fault avoidance', color: 'p', kids: ['Formal spec', 'Strong typing (Ada)', 'Information hiding', 'Avoid goto, care with pointers'] },
      { label: 'Fault tolerance', color: 't', kids: ['Detect → assess', 'Recover → repair', 'N-version programming', 'Recovery blocks'] },
      { label: 'Exceptions', color: 'c', kids: ['Handle unexpected events', 'No constant status checks', 'C++: exception classes'] },
      { label: 'Defensive programming', color: 'a', kids: ['Assume faults exist', 'Range checks + assertions', 'Validate inputs'] },
      { label: 'Recovery', color: 'g', kids: ['Forward: repair state', 'Backward: roll back', 'Transactions, checkpoints, undo'] },
      { label: 'Safety', color: 'r', kids: ['Reliable ≠ safe', 'Hazard → accident → damage', 'Hazard analysis + brainstorming'] }
    ]
  }, {
    center: 'Fault tolerance', branches: [
      { label: 'Steps', color: 't', kids: ['1 Failure detection', '2 Damage assessment', '3 Fault recovery', '4 Fault repair'] },
      { label: 'Architectures', color: 't', kids: ['N-version: parallel + vote', 'Recovery block: sequence + test'] },
      { label: 'Damage tools', color: 'a', kids: ['Checksums', 'Redundant pointers', 'Validity functions'] },
      { label: 'Transient faults', color: 'x', kids: ['Restart system', 'Dynamic reconfiguration'] }
    ]
  }],
  cases: [
    { co: 'Airbus A320', logo: 'AB', color: 't', year: '1988→', title: 'Diverse redundant flight computers', story: 'The A320 fly-by-wire system uses multiple flight-control computers of different designs, with software developed by separate teams, which cross-check each other. Your lecture names it as the N-version example.', lesson: 'Design diversity reduces the chance that one bug brings down every computer.' },
    { co: 'Therac-25', logo: 'TH', color: 'r', year: '1985–87', title: 'Radiation machine overdosed patients', story: 'Earlier models had hardware safety interlocks; the Therac-25 relied on software alone. A race condition, triggered when operators typed quickly, allowed massive overdoses. Several patients died.', lesson: 'Reliable ≠ safe. Hazard analysis and defensive checks are essential in safety-critical systems.' },
    { co: 'Boeing 737 MAX', logo: '737', color: 'c', year: '2018–19', title: 'MCAS and a single sensor', story: 'The MCAS system could push the nose down using data from one angle-of-attack sensor. A faulty sensor led to two fatal crashes. Fixes made MCAS compare two sensors and limit its authority.', lesson: 'Hazard analysis must ask “what if this input is wrong?” and avoid single points of failure.' },
    { co: 'Netflix', logo: 'NF', color: 'p', year: '2012→', title: 'Circuit breakers and fallbacks', story: 'Netflix built libraries like Hystrix so that when one microservice fails, calls to it stop quickly and a fallback is shown (e.g. a generic list instead of personal recommendations).', lesson: 'Fault tolerance in modern cloud apps: the system degrades gracefully instead of crashing.' }
  ],
  code: [
    { title: 'N-version programming with majority vote', lang: 'Python', explain: 'Three independently written versions compute the same thing. The voter returns the majority answer, so one faulty version is outvoted.', src:
`from collections import Counter

def version_a(x): return x * x
def version_b(x): return x ** 2
def version_c(x): return x * x + (1 if x == 7 else 0)   # buggy team

def vote(x, versions=(version_a, version_b, version_c)):
    results = [v(x) for v in versions]
    value, count = Counter(results).most_common(1)[0]
    if count < 2:
        raise RuntimeError(f"No majority: {results}")
    return value

print(vote(7))   # 49, the buggy version is outvoted` },
    { title: 'Recovery block with acceptance test', lang: 'Python', explain: 'Try algorithms one by one; keep the first result that passes the acceptance test. If all fail, raise an exception.', src:
`def is_sorted(xs):                       # acceptance test
    return all(a <= b for a, b in zip(xs, xs[1:]))

def recovery_block(data, algorithms):
    for algo in algorithms:
        copy = list(data)                 # keep input safe (safe sort idea)
        try:
            result = algo(copy)
            if is_sorted(result) and len(result) == len(data):
                return result
        except Exception:
            pass                          # try the next algorithm
    raise RuntimeError("all algorithms failed")

print(recovery_block([3, 1, 2], [my_fast_sort, sorted]))` },
    { title: 'Defensive programming', lang: 'Java', explain: 'Assume callers make mistakes: check inputs, use assertions for “impossible” states, fail with a clear message.', src:
`public final class BankAccount {
    private long balanceSen;                       // hidden data

    public void withdraw(long amountSen) {
        if (amountSen <= 0)
            throw new IllegalArgumentException("amount must be positive");
        if (amountSen > balanceSen)
            throw new IllegalStateException("insufficient funds");
        balanceSen -= amountSen;
        assert balanceSen >= 0 : "balance went negative";
    }
    public long getBalanceSen() { return balanceSen; }
}` },
    { title: 'Backward recovery with a database transaction', lang: 'SQL', explain: 'If anything fails between BEGIN and COMMIT, ROLLBACK returns the database to the safe state before the transfer. This is backward-error recovery.', src:
`BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'ALI';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'MEI';
  -- if any statement fails, the application runs:
  -- ROLLBACK;
COMMIT;` },
    { title: 'Retry with backoff for transient faults', lang: 'Python', explain: 'Many failures are transient (network blips). Retrying after a short wait often fixes them without human help.', src:
`import time, random

def call_with_retry(fn, attempts=4, base=0.5):
    for i in range(attempts):
        try:
            return fn()
        except ConnectionError:
            if i == attempts - 1:
                raise
            time.sleep(base * 2 ** i + random.random() / 10)` }
  ],
  beyond: [
    { skill: 'oop', why: 'Information hiding and encapsulation from this chapter are core OOP. Private fields and interfaces are your “firewalls”.' },
    { skill: 'security', why: 'Defensive programming is the base of secure coding: validate every input and never trust user data.' },
    { skill: 'sql', why: 'Database transactions (BEGIN, COMMIT, ROLLBACK) are the most common backward recovery you will write.' },
    { skill: 'api', why: 'Real APIs fail. Timeouts, retries, circuit breakers and fallbacks are fault tolerance for web services.' },
    { skill: 'testing', why: 'Test the error paths too: unit tests that force exceptions prove your recovery code works.' },
    { skill: 'observability', why: 'Failure detection in production means logs, error tracking (Sentry) and alerts.' },
    { skill: 'ethics', why: 'Therac-25 and the 737 MAX show engineers carry responsibility for safety. Ethics codes (ACM/IEEE) say so.' }
  ],
  cards: [
    ['3 ways to achieve reliability', 'Fault avoidance, fault detection, fault tolerance.'],
    ['4 fault tolerance actions', 'Failure detection, damage assessment, fault recovery, fault repair.'],
    ['N-version programming', 'Several teams implement the same spec; versions run together; majority output wins. Weak against spec errors.'],
    ['Recovery blocks', 'Versions run in sequence; first output passing the acceptance test is used. Hard to write the acceptance test.'],
    ['3 error-prone constructs', 'Pointers, dynamic memory allocation, recursion (also goto).'],
    ['Why information hiding avoids faults', 'Less accidental corruption, firewalls stop spreading, localised info means fewer mistakes and easier reviews.'],
    ['Forward vs backward recovery', 'Forward repairs the corrupted state (needs domain knowledge). Backward rolls back to a safe state (transactions, checkpoints, undo).'],
    ['Hazard vs accident vs damage', 'Hazard: condition that could cause an accident. Accident: unplanned event causing harm. Damage: size of the loss.'],
    ['Defensive programming', 'Assume undetected faults exist; add code to detect and recover, without a special fault-tolerance controller.']
  ],
  quiz: [
    { q: 'Windows System Restore is an example of…', o: ['Forward recovery', 'Backward recovery', 'N-version programming', 'Hazard analysis'], a: 1, why: 'It rolls the system back to a saved checkpoint.' },
    { q: 'The main weakness of recovery blocks is…', o: ['They need many teams', 'Writing a good acceptance test', 'They cannot use exceptions', 'They are only for hardware'], a: 1, why: 'The acceptance test must be independent of the computation.' },
    { q: 'Which is TRUE?', o: ['Reliable software is always safe', 'Safe software is always fast', 'Reliable software may still be unsafe', 'Safety only concerns hardware'], a: 2, why: 'The spec may be incomplete about hazards, so a system that meets it can still cause accidents.' },
    { q: 'Using checksums on transmitted data is part of…', o: ['Damage assessment', 'Fault avoidance', 'Contract review', 'Statistical testing'], a: 0, why: 'Checksums detect which data was corrupted.' },
    { q: 'N-version programming does not protect against…', o: ['Bugs in one version', 'Specification errors', 'Hardware variance', 'Rounding in one version'], a: 1, why: 'All versions follow the same spec, so a wrong spec makes all versions wrong.' }
  ]
},
{
  id: 'ch7', subject: 'sqa', num: 7, theme: 'control', title: 'Software quality metrics', short: 'Quality metrics',
  lecture: 'Chapter 7 - Software Quality Metrics',
  summary: '“You cannot control what you cannot measure.” Objectives of metrics, internal vs external attributes, process vs product metrics, DRE, TER and test efficiency, KLOC vs function points, the 3-stage FP method, implementing metrics and their limitations.',
  tool: 'fp',
  sections: [
    { h: 'Why measure?', pics: ['measure3'], body: `
      <p><b>Tom DeMarco</b>: “You cannot control what you cannot measure.” Measurement helps plan, track and control projects and assess quality. Entities measured: <b>process, product, resource</b>.</p>
      <p><b>IEEE definitions</b>: (1) a quantitative measure of how much an item has a quality attribute; (2) a function whose inputs are software data and output is a single number showing that degree.</p>
      <p><b>Objectives</b>: control projects and maintenance contracts (meet functional requirements, timetable and budget) and support preventive and corrective actions.</p>
      <p>Measurement supports <b>understanding</b> (baselines), <b>control</b> (predict, e.g. extra review only for very complex modules) and <b>improvement</b> (e.g. more design reviews when spec quality is poor).</p>` },
    { h: 'Internal vs external attributes', body: `
      <ul><li><b>Internal</b>: measured from the thing itself without running it: size (LOC), complexity (decision points), dependencies between modules.</li>
      <li><b>External</b>: measured only through behaviour in its environment: failures users experience, difficulty navigating, time to retrieve from a database.</li></ul>
      <p>A metric is useful only if it helps you understand the process or product, and only when goals are clearly defined.</p>` },
    { h: 'Process and product metrics', pics: ['metricsTree'], body: `
      <p><b>Process metrics</b>: (A) quality: error density, error severity, error removal effectiveness; (B) timetable: milestones met vs missed; (C) productivity: direct (human resources) and indirect (reuse).</p>
      <p><b>Product metrics</b> (operational phase): help desk services, corrective maintenance services.</p>
      <p>Example table: process → testing (defects found, testing time); product → program (size, complexity); resource → personnel (number of programmers, skills).</p>` },
    { h: 'DRE, TER and test efficiency', body: `
      <ul><li><b>DRE</b> (defect removal effectiveness) = E ÷ (E + D), where E = errors found in this phase and D = defects that escaped to the next. Close to 1 = good. Low DRE in analysis/design means improve inspections and formal technical reviews.</li>
      <li><b>TER</b> (test effectiveness ratio) = items covered by tests ÷ total items (statements, branches, requirements). Shows how much was tested.</li>
      <li><b>Test efficiency</b> = defects found by testing ÷ (defects found by testing + defects found after release). Shows how good the test cases are.</li></ul>` },
    { h: 'KLOC and its drawbacks', pics: ['kloc'], body: `
      <p>Lines of code (LOC/KLOC) is the classic size metric. Drawbacks: language dependent; ignores algorithm complexity; negatively related to design efficiency (good designs are shorter); only comparable within the same language; definitions differ (executable lines? comments? physical lines? blank lines?).</p>` },
    { h: 'Function points (FP)', pics: ['fpStages'], body: `
      <p>Measures size by <b>functionality from the user’s view</b>, using 5 components: external inputs, external outputs, external inquiries (online queries), internal logical files, external interface files.</p>
      <ol><li><b>Stage 1: Crude function points (CFP)</b>. Count each component, rate it simple/average/complex, multiply by weights, add up.</li>
      <li><b>Stage 2: Relative complexity adjustment factor (RCAF)</b>. Grade 14 subjects from 0 to 5. RCAF is between 0 and 70.</li>
      <li><b>Stage 3</b>: <b>FP = CFP × (0.65 + 0.01 × RCAF)</b></li></ol>
      <p>Standard weights (simple/average/complex): inputs 3/4/6, outputs 4/5/7, queries 3/4/6, logical files 7/10/15, interfaces 5/7/10.</p>
      <p><b>Advantages</b>: estimates before the project starts (great for tenders); independent of language, so more reliable. <b>Disadvantages</b>: depends on the counting manual; needs detailed specs; needs an experienced team and effort; subjective; not universal.</p>
      <p><b>KLOC vs FP</b>: KLOC depends on language, needs little experience and work, little judgement, and is only available after coding. FP is the opposite on each, and available before the project.</p>` },
    { h: 'Implementing metrics', pics: ['statsLevels'], body: `
      <p>Requires: defining relevant metrics, regular application, statistical analysis. Then: change the organisation and methods, change metrics and data collection, plan corrective actions.</p>
      <p><b>Defining a new metric (4 stages)</b>: define the attribute to measure; formulate the metric and check adequacy; set comparative target values; decide the application process.</p>
      <p><b>Managerial side</b>: assign responsibility for collecting data; instruct the team; follow up (support, check reports for completeness and accuracy); update definitions based on past performance.</p>
      <p><b>Statistics</b>: descriptive (mean, median, mode, histograms, control charts) and analytical (regression, analysis of variance) to see if changes are significant.</p>
      <p><b>Limitations</b>: budget constraints; human factors (staff resist being evaluated); doubtful data validity from partial or biased reporting.</p>` }
  ],
  links: [
    { to: 'ch3', topic: 'SQM metrics', text: 'Metrics are component #2 of software quality management in Ch 3.' },
    { to: 'ch5', topic: 'Reliability metrics', text: 'POFOD, ROCOF, MTTF and availability (Ch 5) are reliability-specific product metrics.' },
    { to: 'ch4', topic: 'DRE → reviews', text: 'Low DRE tells you to improve formal technical reviews from Ch 4.' },
    { to: 'ch8', topic: 'Measurement tracking', text: 'Ch 8 V&V includes measurement tracking and feedback of these metrics.' },
    { to: 'ch9', topic: 'Statistical control', text: 'Deming (Ch 9) says use statistical methods and control charts, the same tools used to analyse metrics.' },
    { to: 'ch10', topic: 'Size risk', text: 'Ch 10 asks “estimated size in LOC or FP?” as a product-size risk.' }
  ],
  mindmaps: [{
    center: 'Quality metrics', branches: [
      { label: 'Why measure', color: 'c', kids: ['DeMarco: control needs measure', 'Understanding', 'Control', 'Improvement'] },
      { label: 'Attributes', color: 'p', kids: ['Internal: size, complexity', 'External: failures, speed'] },
      { label: 'Process metrics', color: 'c', kids: ['Quality: error density', 'Timetable', 'Productivity', 'DRE, TER, test efficiency'] },
      { label: 'Product metrics', color: 't', kids: ['Help desk', 'Corrective maintenance', 'Size: KLOC, FP'] },
      { label: 'Function points', color: 'a', kids: ['5 components', 'CFP → RCAF → FP', 'FP = CFP × (0.65 + 0.01 RCAF)'] },
      { label: 'Implementing', color: 'g', kids: ['4-stage new metric', 'Descriptive + analytical stats', 'Limits: budget, people, data'] }
    ]
  }, {
    center: 'Function points', branches: [
      { label: '5 components', color: 'a', kids: ['External inputs', 'External outputs', 'Online queries', 'Logical files', 'External interfaces'] },
      { label: 'Stages', color: 'c', kids: ['1 CFP: weighted counts', '2 RCAF: 14 subjects × 0-5', '3 FP formula'] },
      { label: 'Pros', color: 'g', kids: ['Before project starts', 'Language independent'] },
      { label: 'Cons', color: 'r', kids: ['Subjective', 'Needs experts + detailed spec'] }
    ]
  }],
  cases: [
    { co: 'Google DORA', logo: 'DO', color: 'c', year: '2014→', title: 'Four key DevOps metrics', story: 'The DORA research program (now at Google Cloud) found four metrics that predict software delivery performance: deployment frequency, lead time for changes, change failure rate, and time to restore service.', lesson: 'Modern process metrics. Change failure rate and restore time are quality metrics.' },
    { co: 'Microsoft Research', logo: 'MS', color: 'p', year: '2005', title: 'Code churn predicts defects', story: 'Studies on Windows Server found that relative code churn (how much and how often code changes) predicted which binaries would be defect-prone.', lesson: 'Metrics help decide where to focus reviews and testing (the “control” use of measurement).' },
    { co: 'Apple (–2000 lines)', logo: 'AP', color: 'x', year: '1982', title: 'Negative lines of code', story: 'When Apple managers asked engineers to report lines of code written each week, Bill Atkinson rewrote part of QuickDraw to be simpler and faster and reported “-2000”. Managers stopped asking.', lesson: 'KLOC drawback: more lines can mean worse design. Measuring the wrong thing changes behaviour.' },
    { co: 'SonarQube users', logo: 'SQ', color: 't', year: 'industry', title: 'Quality gates in CI', story: 'Many teams run SonarQube or similar tools on every build. A “quality gate” blocks merging if coverage drops, complexity is too high, or new bugs/vulnerabilities appear.', lesson: 'Metrics applied regularly and automatically, with target values (stage 3 of defining a metric).' }
  ],
  code: [
    { title: 'Function point calculator', lang: 'Python', explain: 'Implements the 3 stages from the lecture. Use the interactive FP calculator in the Tools section to experiment.', src:
`WEIGHTS = {   # simple, average, complex
    "inputs":     (3, 4, 6),
    "outputs":    (4, 5, 7),
    "queries":    (3, 4, 6),
    "files":      (7, 10, 15),
    "interfaces": (5, 7, 10),
}

def crude_fp(counts):
    """counts = {"inputs": (simple, average, complex), ...}"""
    return sum(n * w for k, ns in counts.items()
               for n, w in zip(ns, WEIGHTS[k]))

def function_points(counts, grades):
    assert len(grades) == 14 and all(0 <= g <= 5 for g in grades)
    cfp = crude_fp(counts)
    rcaf = sum(grades)                      # 0..70
    return cfp * (0.65 + 0.01 * rcaf)

counts = {"inputs": (1, 1, 0), "outputs": (0, 2, 1), "queries": (1, 0, 0),
          "files": (1, 1, 0), "interfaces": (0, 0, 1)}
print(function_points(counts, [3] * 14))   # CFP=54, RCAF=42 -> 57.78` },
    { title: 'DRE, TER and test efficiency', lang: 'Python', explain: 'Simple formulas from the lecture as functions.', src:
`def dre(found_in_phase, escaped_to_next):
    return found_in_phase / (found_in_phase + escaped_to_next)

def ter(items_covered, total_items):
    return items_covered / total_items

def test_efficiency(found_by_testing, found_after_release):
    return found_by_testing / (found_by_testing + found_after_release)

print(dre(45, 5))               # 0.9  -> design reviews work well
print(ter(170, 200))            # 0.85 -> 85% of branches tested
print(test_efficiency(90, 10))  # 0.9` },
    { title: 'Cyclomatic complexity (decision points)', lang: 'Python', explain: 'An internal attribute you can measure without running code. Complexity = decisions + 1. High numbers mean more tests needed and more review. Tool: pip install radon, then radon cc file.py', src:
`import ast

def cyclomatic(source):
    tree = ast.parse(source)
    decisions = sum(isinstance(n, (ast.If, ast.For, ast.While, ast.And,
                                   ast.Or, ast.ExceptHandler, ast.IfExp))
                    for n in ast.walk(tree))
    return decisions + 1

code = '''
def grade(m):
    if m >= 80: return "A"
    elif m >= 60: return "B"
    elif m >= 40: return "C"
    return "F"
'''
print(cyclomatic(code))   # 4` }
  ],
  beyond: [
    { skill: 'estimation', why: 'Function points are an estimation method. Industry also uses COCOMO, story points and planning poker.' },
    { skill: 'cicd', why: 'Coverage, complexity and defect metrics are collected automatically in CI with tools like SonarQube and Codecov.' },
    { skill: 'dsa', why: 'Big-O is another kind of metric: it measures how cost grows with input size.' },
    { skill: 'devops', why: 'DORA metrics (deployment frequency, change failure rate...) are the process metrics of modern DevOps teams.' },
    { skill: 'git', why: 'Code churn and commit history are metrics you can pull straight from Git.' },
    { skill: 'communication', why: 'Metrics are useless if nobody understands them. Dashboards and clear charts are part of the job.' }
  ],
  cards: [
    ['DeMarco quote', '“You cannot control what you cannot measure.”'],
    ['3 entities measured', 'Process, product, resource.'],
    ['Internal vs external attributes', 'Internal: measured from the item itself (size, complexity). External: measured by behaviour (failures, response time).'],
    ['DRE formula', 'DRE = E ÷ (E + D). E = errors found in the phase, D = defects that escaped to the next phase.'],
    ['FP formula', 'FP = CFP × (0.65 + 0.01 × RCAF), with RCAF from 14 subjects graded 0-5 (0-70).'],
    ['5 FP components', 'User inputs, user outputs, online queries, logical files, external interfaces.'],
    ['Biggest advantage of FP over KLOC', 'FP can be estimated before the project starts; KLOC only after coding.'],
    ['3 limitations of metrics', 'Budget constraints, human factors (resistance), uncertain data validity.'],
    ['4 stages of defining a new metric', 'Define attribute, formulate metric and check adequacy, set target values, decide application process.']
  ],
  quiz: [
    { q: 'CFP = 100, RCAF = 35. FP = ?', o: ['65', '100', '135', '170'], a: 1, why: '0.65 + 0.01 × 35 = 1.00, so FP = 100.' },
    { q: 'Design phase found 40 defects; 10 escaped to coding. DRE?', o: ['0.25', '0.75', '0.8', '4'], a: 2, why: '40 ÷ (40 + 10) = 0.8.' },
    { q: 'Which is an INTERNAL attribute?', o: ['Failures reported by users', 'Database response time', 'Number of decision points', 'Ease of navigation'], a: 2, why: 'Complexity can be measured without running the code.' },
    { q: 'Which is a drawback of KLOC?', o: ['Available before the project', 'Language dependent', 'Needs great experience', 'Very subjective'], a: 1, why: 'The same function takes different numbers of lines in different languages.' },
    { q: 'Mean, median and histograms are…', o: ['Analytical statistics', 'Descriptive statistics', 'Function points', 'Process metrics'], a: 1, why: 'Descriptive stats summarise; analytical stats test significance.' }
  ]
},
{
  id: 'ch8', subject: 'sqa', num: 8, theme: 'control', title: 'Verification and validation', short: 'V&V',
  lecture: 'Chapter 8 - Verification & Validation (V&V)',
  summary: 'Purpose and benefits of V&V, the Verification and Validation Plan (VVP) and its 7 sections, V&V tasks in each phase (requirements, design, implementation, test, installation), the requirements validation matrix, and who should do V&V (independent V&V).',
  sections: [
    { h: 'Purpose and benefits', pics: ['vvDiff'], body: `
      <p><b>Purpose</b>: examine the software in many ways before actual testing begins; help measure reliability and consistency; add an extra quality step.</p>
      <p><b>Benefits</b>: helps decide whether to go to the next phase; shows problems early; gives early quality statistics; measures early whether requirements are met.</p>
      <p><b>Managerial benefits</b>: time to evaluate V&V results; support for staff in problem identification and process improvement; support for proposed changes.</p>
      <p>Memory trick: <b>Verification</b> = “are we building the product right?” <b>Validation</b> = “are we building the right product?”</p>` },
    { h: 'The VVP: a living document', pics: ['vvp'], body: `
      <p>The plan changes as the project progresses, more is learned about the software, and problem areas are found. Minimum contents:</p>
      <ol><li><b>Objective</b>: purpose, standards to follow, goals (functional requirements, performance, acceptance criteria, security).</li>
      <li><b>Schedule</b>: time frame for each phase’s V&V and when feedback goes to sponsor/management. Depends on the life cycle chosen.</li>
      <li><b>Resources / responsibilities</b>: who does which V&V activity.</li>
      <li><b>Tools</b>: automated tools used.</li>
      <li><b>Control procedures</b>: how results are collected, stored, distributed; who sees them; process improvement; data integrity.</li>
      <li><b>Deviation procedures</b>: what to do when activities deviate; escalation; resolving disagreements.</li>
      <li><b>Documents</b>: activity report, status, V&V summary report, quality assessment. IEEE standards for SVVPs list minimum tasks per phase.</li></ol>` },
    { h: 'V&V in each phase', pics: ['vvPhases'], body: `
      <ul><li><b>Requirements</b>: <b>Requirements Validation Matrix (RVM)</b>, a cross-reference proving every requirement is covered by tests; and requirements evaluation.</li>
      <li><b>Design</b>: analyse design interfaces; check completeness and accuracy; trace design to requirements.</li>
      <li><b>Implementation</b>: code interface analysis; code evaluation; trace code to design.</li>
      <li><b>Test</b>: inputs and expected outputs per test; anticipated problems and how to handle them; criteria to evaluate results (checklists, fix and retest).</li>
      <li><b>Installation</b>: final V&V report; how installation tests are selected and run.</li></ul>` },
    { h: 'Who conducts V&V?', body: `
      <p>Project team members may have vested interests and not be objective. Many companies use <b>Independent V&V (IV&V)</b> by outside consultants for an unbiased assessment.</p>` }
  ],
  links: [
    { to: 'ch3', topic: 'V&V definitions', text: 'Ch 3 gave the IEEE definitions of verification, validation and qualification.' },
    { to: 'ch4', topic: 'Reviews', text: 'Most verification work is done through the reviews in Ch 4.' },
    { to: 'ch7', topic: 'Measurement', text: 'V&V provides early quality statistics; Ch 7 explains how to measure and analyse them.' },
    { to: 'ch10', topic: 'Testable specs', text: 'Ch 10’s “writing testable specifications” makes the RVM possible.' }
  ],
  mindmaps: [{
    center: 'V&V', branches: [
      { label: 'Purpose', color: 'c', kids: ['Examine before testing', 'Measure reliability', 'Extra quality step'] },
      { label: 'Benefits', color: 'g', kids: ['Go / no-go per phase', 'Find problems early', 'Early statistics', 'Support changes'] },
      { label: 'VVP (7)', color: 'a', kids: ['Objective, schedule', 'Resources, tools', 'Control, deviation', 'Documents'] },
      { label: 'Phases', color: 'p', kids: ['Requirements: RVM', 'Design: trace to reqs', 'Code: trace to design', 'Test + installation'] },
      { label: 'Who', color: 'r', kids: ['Team may be biased', 'Independent V&V (IV&V)'] },
      { label: 'Difference', color: 't', kids: ['Verification: built right?', 'Validation: right thing?'] }
    ]
  }],
  cases: [
    { co: 'NASA IV&V Program', logo: 'NA', color: 'c', year: '1993→', title: 'A whole facility for independent V&V', story: 'NASA runs an Independent Verification and Validation program in Fairmont, West Virginia. Engineers who are not part of the mission teams analyse safety- and mission-critical software.', lesson: 'IV&V exactly as in the lecture: outsiders give an unbiased assessment.' },
    { co: 'Mars Polar Lander', logo: 'MP', color: 'r', year: '1999', title: 'Engine cut off too early', story: 'The most likely cause: when the landing legs deployed, sensors produced a false “touchdown” signal. The software accepted it and shut down the engine while still high above the surface. The investigation found the requirement was not fully tested.', lesson: 'A requirements validation matrix and design-to-requirement tracing could have caught the gap.' },
    { co: 'Banking regulators', logo: 'BK', color: 'p', year: 'industry', title: 'Traceability for audits', story: 'Banks and medical-device makers must show auditors that every requirement is tested. They keep requirement-to-test traceability in tools like Jira with Xray or Azure DevOps.', lesson: 'The RVM is a real, required document in regulated industries.' }
  ],
  code: [
    { title: 'Requirements validation matrix as code', lang: 'Python', explain: 'Each test declares which requirement it covers. A script checks that no requirement is left without a test. This is the RVM idea automated.', src:
`REQUIREMENTS = {
    "R1": "User can log in with email and password",
    "R2": "Account locks after 5 failed logins",
    "R3": "User can reset password by email",
}

TESTS = {
    "test_login_ok":         ["R1"],
    "test_login_wrong_pw":   ["R1", "R2"],
    "test_lock_after_five":  ["R2"],
}

covered = {r for reqs in TESTS.values() for r in reqs}
missing = set(REQUIREMENTS) - covered

for r, text in REQUIREMENTS.items():
    tests = [t for t, rs in TESTS.items() if r in rs]
    print(f"{r:3} | {'OK ' if tests else 'GAP'} | {text} | {tests}")

if missing:
    raise SystemExit(f"Untested requirements: {sorted(missing)}")` },
    { title: 'Acceptance test in Gherkin (validation)', lang: 'Gherkin', explain: 'Validation checks the right product was built. Gherkin acceptance tests are written with the customer, then automated with Cucumber or behave.', src:
`Feature: Account lock (R2)

  Scenario: Lock after five wrong passwords
    Given a registered user "aina@example.com"
    When she enters a wrong password 5 times
    Then her account is locked
    And she receives an "account locked" email` }
  ],
  beyond: [
    { skill: 'testing', why: 'Acceptance testing (BDD, Gherkin) and end-to-end testing (Playwright, Cypress) are how validation is done today.' },
    { skill: 'requirements', why: 'You can only trace and validate requirements that are written clearly, with acceptance criteria.' },
    { skill: 'uml', why: 'Design V&V checks interfaces and traces design to requirements. UML diagrams make that review possible.' },
    { skill: 'cicd', why: 'A CI pipeline is a V&V schedule that runs automatically on every change.' },
    { skill: 'docs', why: 'The VVP and V&V summary reports are documents. Clear technical writing matters.' }
  ],
  cards: [
    ['Verification vs validation (short)', 'Verification: building the product right. Validation: building the right product.'],
    ['7 sections of a VVP', 'Objective, schedule, resources/responsibilities, tools, control procedures, deviation procedures, documents.'],
    ['Why is the VVP a “living document”?', 'It changes as the project progresses, more is learned, and problem areas are found.'],
    ['RVM', 'Requirements Validation Matrix: cross-reference showing every requirement is covered by tests.'],
    ['Design phase V&V', 'Analyse design interfaces, evaluate completeness and accuracy, trace design to requirements.'],
    ['Why IV&V?', 'Project members may be biased; independent outsiders give an unbiased assessment.'],
    ['4 benefits of V&V', 'Decide whether to go to the next phase, find problems early, early quality statistics, early check of requirements.']
  ],
  quiz: [
    { q: 'A cross-reference ensuring every requirement has a test is the…', o: ['VVP', 'RVM', 'RCAF', 'RMMM'], a: 1, why: 'Requirements Validation Matrix.' },
    { q: 'Tracing code back to the design happens in which V&V phase?', o: ['Requirements', 'Design', 'Implementation', 'Installation'], a: 2, why: 'Implementation V&V: code interfaces, code evaluation, code-to-design traceability.' },
    { q: 'Escalation procedures belong in which VVP section?', o: ['Tools', 'Control procedures', 'Deviation procedures', 'Objective'], a: 2, why: 'Deviation procedures cover deviations, escalation and disagreements.' },
    { q: 'Companies use IV&V mainly to…', o: ['Save money', 'Get an unbiased assessment', 'Write the code faster', 'Avoid documentation'], a: 1, why: 'Team members may have vested interests.' }
  ]
},
{
  id: 'ch9', subject: 'sqa', num: 9, theme: 'quality', title: 'Total quality management', short: 'TQM',
  lecture: 'Chapter 9 - Total Quality Management (TQM)',
  summary: 'TQM as a whole-organisation system, Deming’s philosophy and 14 points, the PDCA wheel, the 7 fundamental principles (voice of the customer, involvement, zero defect, build quality in, QFD, process focus, suppliers, quality is free) and quality improvement tools.',
  sections: [
    { h: 'What is TQM?', body: `
      <p><b>IEEE (1993)</b>: interlocking procedures and practices so all employees in every department are trained and directed to continuously improve quality, service and total costs, meeting or exceeding customer expectations.</p>
      <p>Also: “managing the entire organisation so it excels on all dimensions important to the customer.” Key to post-war Japanese manufacturing success, influenced by <b>Dr W. Edwards Deming</b>.</p>
      <p>TQM: focuses on customer needs; drives continuous improvement; everyone has customers; sees the organisation as a system; focuses on how tasks are done; emphasises teamwork.</p>
      <p><b>Purposes</b>: continuous improvement, competitiveness, meeting customer requirements.</p>` },
    { h: "Deming's philosophy and 14 points", pics: ['deming'], body: `
      <p><b>Philosophy</b>: systems vary; high quality saves money long-term; people work within a system; everyone serves a customer (internal and external); be proactive (plan-driven, not event-driven); control processes, not outputs.</p>
      <p><b>14 points</b>: constancy of purpose; adopt the new philosophy; require statistical evidence from suppliers; fewer suppliers; statistical methods to find problem sources; modern on-the-job training; better supervision; drive out fear; break down department barriers; eliminate quotas; work standards that include quality; train in statistics; retrain people in new skills; repeat all of this every day.</p>` },
    { h: 'PDCA (Deming wheel)', pics: ['pdca'], body: `
      <p><b>Plan</b> a change → <b>Do</b> it on a small scale → <b>Check</b> (or <b>Study</b>, PDS) the results → <b>Act</b>: standardise it or start again. Repeat forever.</p>` },
    { h: 'Fundamental principles of TQM', pics: ['tqmPrinciples'], body: `
      <ol><li><b>Voice of the customer</b>: what do they want, like, need improved? Use informal and formal research, interviews, focus groups, quantitative surveys.</li>
      <li><b>Everyone involved</b>: top management leads; prevent rather than fix; quality council, documented quality policy, train everyone, Process Improvement Teams, time for training, monitor and reward, specialists facilitate.</li>
      <li><b>Strive for zero defect</b>: focus on the process; make quality visible; quality first; <b>stop the line</b>; correct your own errors; 100% check until the process is capable; improve project by project.</li>
      <li><b>Design and build quality in</b>: design right from the start, prevent problems, design for reliability and serviceability, specify measurements. Use <b>Quality Function Deployment (QFD)</b> to turn the voice of the customer into prioritised product characteristics.</li>
      <li><b>Focus on the process</b>: a process is a repeated set of activities that uses resources to turn inputs into outputs of value. If quality varies, the process varies (common vs special causes).</li>
      <li><b>Suppliers are partners</b>: not lowest price; share TQM knowledge; ask suppliers to adopt TQM. Better service, less monitoring, better relationship and price.</li>
      <li><b>Quality is free</b>: preventing defects costs less than fixing failures (but prevention still needs investment).</li></ol>` },
    { h: 'Quality improvement tools', pics: ['fishbone', 'pareto'], body: `
      <ul><li><b>Process chart</b>: map the steps.</li><li><b>Pareto analysis</b>: the few causes behind most problems (80/20).</li><li><b>Ishikawa / fishbone</b>: cause-and-effect diagram.</li><li><b>Histograms</b>.</li><li><b>Run and correlation diagrams</b>.</li><li><b>Control charts</b>, average and range charts, P and C charts.</li></ul>
      <p><b>How a firm implements TQM</b>: set and meet goals; management commits to continuous improvement; identify stages; assign responsibility; set a baseline; pre-plan; treat each project as part of a cycle; every worker inspects their own work.</p>` }
  ],
  links: [
    { to: 'ch1', topic: 'Quality definition', text: 'Extends Ch 1’s definition of quality from product to whole organisation.' },
    { to: 'ch10', topic: 'Postmortems + PDCA', text: 'Ch 10 says project postmortems are “almost mandatory” under Deming’s continuous improvement.' },
    { to: 'ch7', topic: 'Statistical methods', text: 'Deming’s statistical methods and control charts are the analysis tools for Ch 7 metrics.' },
    { to: 'ch3', topic: 'Quality cost', text: '“Quality is free” connects to software quality costs in Ch 3’s SQM.' },
    { to: 'ch2', topic: 'Product vs process', text: 'Ch 2: to improve the product, improve the process; TQM is that idea for the whole company.' }
  ],
  mindmaps: [{
    center: 'TQM', branches: [
      { label: 'Definition', color: 'p', kids: ['Whole organisation', 'Continuous improvement', 'Meet / exceed customer needs'] },
      { label: 'Deming', color: 'p', kids: ['14 points', 'Control process, not output', 'Drive out fear'] },
      { label: 'PDCA', color: 't', kids: ['Plan', 'Do', 'Check / Study', 'Act'] },
      { label: '7 principles', color: 'a', kids: ['Voice of customer', 'Everyone + zero defect', 'Build in (QFD) + process', 'Suppliers + quality is free'] },
      { label: 'Tools', color: 'c', kids: ['Pareto', 'Fishbone', 'Histograms', 'Control charts'] },
      { label: 'Implement', color: 'g', kids: ['Quality council', 'Train everyone', 'Process improvement teams', 'Reward improvement'] }
    ]
  }],
  cases: [
    { co: 'Toyota Production System', logo: 'TY', color: 'r', year: '1950s→', title: 'Stop the line (andon)', story: 'Any Toyota worker can pull a cord to stop the production line when they see a defect. The team fixes the cause before restarting. Kaizen (continuous improvement) is part of everyday work.', lesson: 'TQM rule “stop the line” and “correct your own errors”. In software: a failing CI build stops merging.' },
    { co: 'Deming in Japan', logo: 'WD', color: 'p', year: '1950', title: 'Statistics for quality', story: 'Deming lectured Japanese engineers and executives on statistical quality control. Japan’s top quality award is named the Deming Prize.', lesson: 'Where TQM ideas came from: statistics plus management commitment.' },
    { co: 'Motorola Six Sigma', logo: '6σ', color: 't', year: '1986', title: 'Near zero defects', story: 'Motorola introduced Six Sigma, aiming for about 3.4 defects per million opportunities, using statistics and DMAIC improvement projects. GE later made it famous.', lesson: '“Strive for zero defect” turned into a measurable target.' },
    { co: 'Amazon', logo: 'AZ', color: 'a', year: 'ongoing', title: 'Working backwards from the customer', story: 'Amazon teams often start a new product by writing the press release and FAQ for customers first, then build to match it.', lesson: 'Voice of the customer drives the design, like QFD.' }
  ],
  code: [
    { title: 'Pareto analysis of bug reports', lang: 'Python', explain: 'Find the few modules that cause most bugs, so the team fixes those first.', src:
`from collections import Counter

bugs = ["ui", "ui", "input", "db", "ui", "input", "network",
        "ui", "db", "ui", "input", "docs", "ui", "input"]

counts = Counter(bugs).most_common()
total, running = len(bugs), 0
for module, n in counts:
    running += n
    print(f"{module:8} {n:3}  cumulative {running / total:5.0%}")
# ui + input already cause ~71% of all bugs -> fix them first` },
    { title: 'Simple control chart check', lang: 'Python', explain: 'Deming: control the process. Flag weeks where defects are outside mean ± 3 standard deviations (a special cause to investigate).', src:
`from statistics import mean, stdev

weekly_defects = [12, 9, 11, 10, 13, 8, 11, 27, 10, 12]
m, s = mean(weekly_defects), stdev(weekly_defects)
upper, lower = m + 3 * s, max(0, m - 3 * s)

for week, d in enumerate(weekly_defects, 1):
    flag = "  <-- investigate" if not lower <= d <= upper else ""
    print(f"week {week:2}: {d}{flag}")` }
  ],
  beyond: [
    { skill: 'agile', why: 'Agile retrospectives are PDCA every sprint: plan, do, check what went well, act on improvements.' },
    { skill: 'devops', why: 'DevOps borrows from Toyota: small batches, stop the line when the build is red, continuous improvement.' },
    { skill: 'communication', why: '“Drive out fear” = blameless postmortems where people can report problems safely.' },
    { skill: 'requirements', why: 'The voice of the customer and QFD are user research. Interviews, surveys and personas are the modern tools.' },
    { skill: 'ethics', why: 'TQM sees everyone serving a customer. Professional responsibility to users and society is part of that.' }
  ],
  cards: [
    ['PDCA stands for', 'Plan, Do, Check (Study), Act. The Deming wheel.'],
    ['7 TQM principles', 'Voice of the customer, everyone involved, strive for zero defect, design and build quality in, focus on process, suppliers are partners, quality is free.'],
    ['3 TQM purposes', 'Continuous improvement of quality, competitiveness, meeting customer requirements.'],
    ['QFD', 'Quality Function Deployment: turn the voice of the customer into prioritised product characteristics.'],
    ['Name 4 quality improvement tools', 'Pareto analysis, fishbone (Ishikawa), histograms, control charts (also process charts, run diagrams).'],
    ['Deming: control what?', 'Control the process, not the outputs.'],
    ['Zero defect rules (any 4)', 'Focus on process, make quality visible, quality first, stop the line, correct your own errors, 100% check until capable, improve project by project.']
  ],
  quiz: [
    { q: 'A diagram showing causes grouped as people, process, tools, requirements is a…', o: ['Pareto chart', 'Fishbone diagram', 'Control chart', 'Histogram'], a: 1, why: 'The Ishikawa (fishbone) cause-and-effect diagram.' },
    { q: 'Which is one of Deming’s 14 points?', o: ['Increase production quotas', 'Drive out fear', 'Choose the cheapest supplier', 'Inspect every product at the end'], a: 1, why: 'Point 8: drive out fear so people report problems.' },
    { q: 'In PDCA, standardising a change that worked happens in…', o: ['Plan', 'Do', 'Check', 'Act'], a: 3, why: 'Act: adopt the change or begin the cycle again.' },
    { q: '“Suppliers are partners” means…', o: ['Always pick the lowest price', 'Share TQM knowledge and build long relationships', 'Avoid all suppliers', 'Suppliers do the testing'], a: 1, why: 'Lowest price is not the aim; suppliers adopt TQM too.' }
  ]
},
{
  id: 'ch10', subject: 'sqa', num: 10, theme: 'control', title: 'Risk management', short: 'Risk management',
  lecture: 'Chapter 10 - Risk Management',
  summary: 'Eight areas of risk, the 9 factors for deciding where to focus testing, 10 ways to minimise risk, 10 ways to increase testability, the testing-as-filters idea, reactive vs proactive risk management, the risk paradigm, risk tables, RMMM and risk categories.',
  tool: 'risk',
  sections: [
    { h: 'What is risk?', pics: ['riskAreas'], body: `
      <p>A <b>risk</b> is a potential problem: it might or might not happen. Risk analysis and management help the team understand and manage uncertainty.</p>
      <h3>8 areas of risk</h3>
      <ol><li><b>Missing deadlines</b>: missing the fixed marketing window.</li>
      <li><b>Poorly defined users</b>: millions of users are hard to characterise; unhappy users go to competitors.</li>
      <li><b>Creeping featurism</b>: constant new features make thousands of tests invalid and docs outdated.</li>
      <li><b>New technology</b>: it takes longer than expected.</li>
      <li><b>Non-testability</b>: easiest to solve, hardest to implement. Caused by complexity, nested loops and IFs, dependencies, programmer assumptions, inconsistent patterns, poor modularity, environment dependencies.</li>
      <li><b>Low reusability</b>: similar code copied in many places must all be changed and retested.</li>
      <li><b>Personnel shortages</b>: planning by current income per employee, not future needs.</li>
      <li><b>Poor training</b>: staff fall behind new technology.</li></ol>` },
    { h: 'Deciding where to focus (9 factors)', body: `
      <ol><li><b>Customer impact</b>: the most serious; test what hurts customers most.</li><li><b>New technology</b>: train early, build new-tech parts first.</li><li><b>Error history</b>: errors cluster in certain modules.</li><li><b>New or existing feature</b>: focus on interfaces between old and new.</li><li><b>Complexity</b>: system, module and interface complexity.</li><li><b>Programmer confidence level</b>.</li><li><b>Programmer experience with the environment</b>.</li><li><b>Programmer error history</b>: shared standards reduce errors.</li><li><b>Time available to test</b>: when time is short, test efficiently.</li></ol>` },
    { h: 'Minimising the impact of risk (10 ways)', body: `
      <ol><li><b>Create a schedule</b>: work backwards from the marketing window. Tools: Jira (stable spec), Git (configuration management), Trello (parallel life cycle), Microsoft Project (plan), TeamGantt/Visio (people).</li>
      <li><b>Define users</b>: user groups, site visits, questionnaires.</li>
      <li><b>Control creeping featurism</b>: a <b>Configuration Control Board</b> evaluates changes; still encourage proposals.</li>
      <li><b>New technology</b>: train early, build those parts first.</li>
      <li><b>Error tracking</b>: log errors that escaped an earlier phase and fix the “filter”.</li>
      <li><b>Root-cause analysis</b>: how did this error reach the field?</li>
      <li><b>Automated tools</b>: automate testing from unit to system.</li>
      <li><b>Change the corporate culture</b>: standards and reviews face resistance.</li>
      <li><b>Project postmortems</b>: almost mandatory for Deming-style improvement.</li>
      <li><b>Refine the process</b>: use filters, root causes and postmortems to improve.</li></ol>` },
    { h: 'Increasing testability (10 ways)', pics: ['filters', 'costOfError'], body: `
      <ol><li><b>Testable specifications</b>: define behaviour, not only function (event lists vs assertions, review and maintain specs).</li>
      <li><b>Testable architectures</b>: know which modules call which, data passed, interrupts; keep components independent.</li>
      <li><b>System quality standards</b>: Myers’ standards: independence, minimal data access, no inter-module dependencies.</li>
      <li><b>Review architectures</b> using those measures.</li>
      <li><b>Testable code</b>: mini life cycle: solve the problem → pseudocode → target language.</li>
      <li><b>Quality standards</b>: inspection rules and checklists.</li>
      <li><b>Deal with “old wives’ tales”</b>: outdated beliefs about efficiency.</li>
      <li><b>Recognise inter- and intra-module dependencies</b> by walking data through the system.</li>
      <li><b>Hold code inspections</b>: they pay for themselves many times over.</li>
      <li><b>Refine the filters</b>: a spec error caught in review costs $10-15; found by a user it can cost millions.</li></ol>
      <p><b>First-rate testing organisation</b>: design out errors rather than test them out, and test system behaviour.</p>` },
    { h: 'Reactive vs proactive', body: `
      <ul><li><b>Reactive</b>: respond when risks happen: mitigation (extra resources for fire-fighting), fix on failure, crisis management.</li>
      <li><b>Proactive</b>: formal risk analysis; fix root causes using TQM and statistical SQA, look beyond the software, build skill to manage change.</li></ul>
      <p>Four questions: What can go wrong? How likely? How much damage? What can we do?</p>` },
    { h: 'Risk paradigm, risk table and RMMM', pics: ['riskParadigm', 'riskMatrix', 'rmmm'], body: `
      <p><b>Paradigm</b>: <b>Identify</b> (find risks early) → <b>Analyze</b> (impact, probability, timeframe; classify and prioritise) → <b>Plan</b> (decisions and actions) → <b>Track</b> (monitor indicators) → <b>Control</b> (correct deviations).</p>
      <p><b>Risk table</b>: columns Risk, Probability, Impact (1 low to 5 catastrophic), RMMM. Sort by probability and impact.</p>
      <p><b>RMMM</b>: <b>Mitigation</b>: how to avoid it? <b>Monitoring</b>: what to track? <b>Management</b>: contingency plan if it happens.</p>
      <p><b>Risk categories</b>: product size (LOC/FP, files, users, database size), business impact (revenue, deadline, government rules, cost of late or defective product), customer (past experience, clear requirements, time for reviews), process maturity (common process, FTRs, CASE tools), technology (new hardware, algorithms, AI methods, performance limits), staff (skills, availability, turnover, training).</p>
      <p><b>Recording a risk</b> (lecture example): embedded software depends on a hardware part that may arrive late; probability 60%, priority 4; monitor with milestone reviews; contingency: simulate the hardware in software; 6 extra person-months.</p>` }
  ],
  links: [
    { to: 'ch3', topic: 'Spiral model', text: 'Ch 3’s spiral model puts risk analysis in every loop.' },
    { to: 'ch2', topic: 'Testability', text: 'Testability is a McCall revision factor (Ch 2).' },
    { to: 'ch9', topic: 'Proactive = TQM', text: 'Proactive risk management uses TQM and Deming’s postmortems (Ch 9).' },
    { to: 'ch4', topic: 'Inspections', text: 'Code inspections and design reviews from Ch 4 are the early filters.' },
    { to: 'ch6', topic: 'Hazards', text: 'Hazard analysis (Ch 6) is risk management for safety.' },
    { to: 'ch7', topic: 'Size metrics', text: 'Product-size risk uses LOC and FP from Ch 7.' }
  ],
  mindmaps: [{
    center: 'Risk management', branches: [
      { label: '8 risk areas', color: 'c', kids: ['Deadlines, users', 'Creeping features, new tech', 'Non-testability, low reuse', 'Staff shortage, training'] },
      { label: 'Focus factors', color: 'a', kids: ['Customer impact', 'Error history', 'Complexity', 'Programmer experience', 'Time to test'] },
      { label: 'Minimise impact', color: 'g', kids: ['Schedule + CCB', 'Error tracking + root cause', 'Automation', 'Postmortems'] },
      { label: 'Testability', color: 't', kids: ['Testable specs + architecture', 'Independent modules', 'Code inspections', 'Refine filters'] },
      { label: 'Approach', color: 'p', kids: ['Reactive: fire-fighting', 'Proactive: formal analysis'] },
      { label: 'Tools', color: 'r', kids: ['Paradigm: I-A-P-T-C', 'Risk table P × I', 'RMMM'] }
    ]
  }, {
    center: 'Risk categories', branches: [
      { label: 'Product size', color: 'c', kids: ['LOC / FP', 'Users, database size'] },
      { label: 'Business', color: 'c', kids: ['Revenue, deadline', 'Regulations', 'Cost of defects'] },
      { label: 'Customer', color: 'a', kids: ['Clear requirements?', 'Joins reviews?'] },
      { label: 'Process maturity', color: 'p', kids: ['Common process', 'FTRs, CASE tools'] },
      { label: 'Technology', color: 'r', kids: ['New hardware / AI', 'Performance limits'] },
      { label: 'Staff', color: 't', kids: ['Skills, turnover', 'Training'] }
    ]
  }],
  cases: [
    { co: 'Knight Capital', logo: 'KC', color: 'r', year: '2012', title: 'US$440 million lost in 45 minutes', story: 'During a deployment, new trading code was installed on 7 of 8 servers. A reused configuration flag woke up old, unused code on the 8th server, which sent millions of unintended orders. The firm nearly went bankrupt.', lesson: 'Configuration management, automated deployment and removing dead code are risk controls. Low reusability (repurposed flag) became a disaster.' },
    { co: 'Denver Airport', logo: 'DEN', color: 'c', year: '1995', title: 'Automated baggage system', story: 'A highly ambitious automated baggage system delayed the airport’s opening by about 16 months and went far over budget. It was finally abandoned years later.', lesson: 'Risk of new technology and an unrealistic schedule. Build the new-tech parts first and prototype.' },
    { co: 'Cyberpunk 2077', logo: 'CP', color: 'a', year: '2020', title: 'Released to hit the window', story: 'After several delays, the game launched with many bugs, especially on older consoles. Sony temporarily removed it from the PlayStation Store and refunds were offered. Fixes took years.', lesson: 'Risk of missing deadlines vs releasing low quality. Customer impact is the most serious risk factor.' },
    { co: 'Netflix Chaos Monkey', logo: 'NF', color: 't', year: '2011→', title: 'Testing failure on purpose', story: 'Netflix randomly shuts down production servers during work hours so engineers must build services that survive failures. It grew into “chaos engineering”.', lesson: 'Proactive risk management and increasing testability of the whole system.' }
  ],
  code: [
    { title: 'Risk table sorted by exposure', lang: 'Python', explain: 'Exposure = probability × impact. Sort so the team works on the biggest risks first. Try the interactive risk table in the Tools section.', src:
`risks = [
    {"risk": "Hardware part arrives late", "p": 0.6, "impact": 4,
     "rmmm": "Simulate hardware in software"},
    {"risk": "Key developer leaves",       "p": 0.3, "impact": 5,
     "rmmm": "Pair programming, document code"},
    {"risk": "Customer keeps adding features", "p": 0.8, "impact": 3,
     "rmmm": "Change control board"},
]

for r in risks:
    r["exposure"] = r["p"] * r["impact"]

for r in sorted(risks, key=lambda r: r["exposure"], reverse=True):
    print(f'{r["exposure"]:4.1f}  {r["risk"]:32} -> {r["rmmm"]}')` },
    { title: 'Feature flag: reduce release risk', lang: 'Python', explain: 'Release new code switched off, then turn it on for 5% of users. If errors rise, switch it off without redeploying. (Knight Capital’s lesson: remove old flags and dead code.)', src:
`import hashlib

FLAGS = {"new_checkout": 5}          # percent of users

def enabled(flag, user_id):
    pct = FLAGS.get(flag, 0)
    bucket = int(hashlib.md5(f"{flag}:{user_id}".encode()).hexdigest(), 16) % 100
    return bucket < pct

def checkout(user):
    if enabled("new_checkout", user.id):
        return new_checkout(user)
    return old_checkout(user)` },
    { title: 'Testable code: inject dependencies', lang: 'Python', explain: 'Non-testability comes from hidden dependencies. Passing the clock in makes the function easy to test (Ch 10 “creating testable code”).', src:
`from datetime import datetime

# Hard to test: depends on the real clock
def greeting_bad():
    return "Good morning" if datetime.now().hour < 12 else "Good afternoon"

# Testable: dependency passed in
def greeting(now):
    return "Good morning" if now.hour < 12 else "Good afternoon"

def test_greeting():
    assert greeting(datetime(2026, 1, 1, 9)) == "Good morning"
    assert greeting(datetime(2026, 1, 1, 15)) == "Good afternoon"` }
  ],
  beyond: [
    { skill: 'git', why: 'Your lecture names Git for configuration management. Branches, tags and releases control what goes into production.' },
    { skill: 'estimation', why: 'Missing deadlines is risk #1. Realistic estimates and buffers are risk control.' },
    { skill: 'agile', why: 'Short sprints, backlog grooming and a product owner are modern ways to control creeping featurism.' },
    { skill: 'devops', why: 'Feature flags, canary releases and automatic rollback reduce release risk.' },
    { skill: 'security', why: 'Threat modelling (STRIDE) is risk analysis for security.' },
    { skill: 'ai', why: 'The lecture lists AI-based approaches as a technology risk. Know their limits and review AI output.' },
    { skill: 'cicd', why: '“Minimise risk through automated tools”: automated test pipelines are your filters.' },
    { skill: 'observability', why: 'Monitoring in RMMM: dashboards and alerts tell you when a risk is becoming real.' }
  ],
  cards: [
    ['8 areas of risk', 'Missing deadlines, poorly defined users, creeping featurism, new technology, non-testability, low reusability, personnel shortages, poor training.'],
    ['Most serious risk factor', 'Customer impact.'],
    ['RMMM', 'Risk Mitigation (avoid), Monitoring (track indicators), Management (contingency plan).'],
    ['Risk paradigm steps', 'Identify, analyze, plan, track, control.'],
    ['Reactive vs proactive', 'Reactive: respond when risks hit (fire-fighting). Proactive: formal analysis, fix root causes.'],
    ['Cost of an error found early vs late', 'About $10-15 at design review; possibly millions if a user finds it after release.'],
    ['How to control creeping featurism', 'A Configuration Control Board evaluates changes (while still encouraging proposals).'],
    ['Risk table columns', 'Risk, probability, impact (1-5), RMMM. Sort by probability and impact.'],
    ['Root-cause analysis', 'Find how an error got into the field and fix the filter so it does not happen again.']
  ],
  quiz: [
    { q: 'Marketing keeps adding features, making tests invalid. This risk is…', o: ['New technology', 'Creeping featurism', 'Poor training', 'Low reusability'], a: 1, why: 'Creeping featurism.' },
    { q: 'Which tool from the lecture handles configuration management?', o: ['Trello', 'Git', 'Visio', 'Microsoft Project'], a: 1, why: 'Git for configuration management; Jira for stable specs.' },
    { q: '“What contingency plan do we have?” is part of…', o: ['Mitigation', 'Monitoring', 'Management', 'Identification'], a: 2, why: 'Management = contingency plan if the risk becomes real.' },
    { q: 'Probability 0.5, impact 4. Exposure?', o: ['4.5', '2', '0.125', '8'], a: 1, why: '0.5 × 4 = 2.' },
    { q: 'Proactive risk management means…', o: ['Fix on failure', 'Crisis management', 'Formal analysis and fixing root causes', 'Adding staff when late'], a: 2, why: 'The other options are reactive.' }
  ]
}
];
export default chapters;
