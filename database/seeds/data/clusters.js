// Big themes that run across several lectures of one subject (chs = chapter numbers in that subject).
export const clusters = [
  { subject: 'sqa', t: 'Quality: what it means', c: 'p', chs: [1, 2, 9], why: 'Ch 1 defines quality (IEEE, ISO), Ch 2 breaks it into McCall’s factors, Ch 9 makes it a company-wide system (TQM).' },
  { subject: 'sqa', t: 'Fault vs failure, reliability', c: 't', chs: [1, 5, 6], why: 'Ch 1 introduces error → fault → failure, Ch 5 measures reliability, Ch 6 builds it into code.' },
  { subject: 'sqa', t: 'Measuring quality', c: 'c', chs: [3, 5, 7, 8], why: 'Metrics are part of SQM (Ch 3); Ch 5 has reliability metrics; Ch 7 has DRE and FP; Ch 8 tracks measurements in V&V.' },
  { subject: 'sqa', t: 'Checking without running code', c: 'c', chs: [3, 4, 8], why: 'Reviews are defined in Ch 3, compared in Ch 4, and used as verification in Ch 8.' },
  { subject: 'sqa', t: 'Risk and safety', c: 'r', chs: [3, 6, 10], why: 'The spiral model has risk analysis (Ch 3), hazard analysis is safety risk (Ch 6), and Ch 10 covers full risk management.' },
  { subject: 'sqa', t: 'Testability', c: 'g', chs: [2, 3, 10], why: 'Testability is a McCall factor (Ch 2), testing techniques are in Ch 3, and Ch 10 shows how to increase testability.' },
  { subject: 'sqa', t: 'Continuous improvement', c: 'a', chs: [7, 9, 10], why: 'Metrics give data (Ch 7), PDCA uses it (Ch 9), postmortems and root-cause analysis close the loop (Ch 10).' },
  { subject: 'ob', t: 'The MARS model everywhere', c: 'p', chs: [2, 5, 13], why: 'MARS is introduced in Topic 2, its M (motivation) is Topic 5, and Topic 13 uses MARS to spread change.' },
  { subject: 'ob', t: 'Perception and judgement', c: 't', chs: [3, 6], why: 'Attribution, stereotyping and perceptual effects appear in Topic 3 and again in Topic 6 with decision biases.' },
  { subject: 'ob', t: 'Emotions behind behaviour', c: 'c', chs: [4, 5, 8, 10], why: 'Emotions shape attitudes (4), drives work through emotions (5), emotions spread through communication (8) and EI limits relationship conflict (10).' },
  { subject: 'ob', t: 'Working in teams', c: 'a', chs: [7, 8, 10], why: 'Team dynamics (7) depend on communication (8) and on handling conflict (10).' },
  { subject: 'ob', t: 'Influence and leadership', c: 'p', chs: [9, 11, 13], why: 'Power bases (9) are how leaders influence (11) and how change agents overcome resistance (13).' },
  { subject: 'ob', t: 'Values, ethics and culture', c: 'g', chs: [1, 2, 12], why: 'Values and CSR (1), personal values and ethics (2), and shared values as culture (12).' },
  { subject: 'plt', t: 'Front end: text to tree', c: 'p', chs: [1, 3, 4, 5, 6, 7], why: 'Scanning (3, 4) produces tokens; parsing (5, 6, 7) checks the grammar and builds the tree.' },
  { subject: 'plt', t: 'Grammars and specifications', c: 't', chs: [2, 5, 6], why: 'Grammars are defined in 2, used for derivations in 5 and rewritten for LL parsing in 6.' },
  { subject: 'plt', t: 'Automata', c: 'c', chs: [4, 7], why: 'DFAs recognise tokens (4); LR parsers run a DFA of items (7).' },
  { subject: 'plt', t: 'Meaning and translation', c: 'a', chs: [8, 9, 10], why: 'Attributes (8) carry types (9) and drive generation of intermediate code (10).' },
  { subject: 'plt', t: 'Back end', c: 'r', chs: [10, 11, 12], why: 'Three-address code (10) is optimised with DAGs (11) and turned into machine code (12).' }
];
