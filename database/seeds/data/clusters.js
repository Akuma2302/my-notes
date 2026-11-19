// Big themes that run across several lectures of one subject (chs = chapter numbers in that subject).
export const clusters = [
  { subject: 'sqa', t: 'Quality: what it means', c: 'p', chs: [1, 2, 9], why: 'Ch 1 defines quality (IEEE, ISO), Ch 2 breaks it into McCall’s factors, Ch 9 makes it a company-wide system (TQM).' },
  { subject: 'sqa', t: 'Fault vs failure, reliability', c: 't', chs: [1, 5, 6], why: 'Ch 1 introduces error → fault → failure, Ch 5 measures reliability, Ch 6 builds it into code.' },
  { subject: 'sqa', t: 'Measuring quality', c: 'c', chs: [3, 5, 7, 8], why: 'Metrics are part of SQM (Ch 3); Ch 5 has reliability metrics; Ch 7 has DRE and FP; Ch 8 tracks measurements in V&V.' },
  { subject: 'sqa', t: 'Checking without running code', c: 'c', chs: [3, 4, 8], why: 'Reviews are defined in Ch 3, compared in Ch 4, and used as verification in Ch 8.' },
  { subject: 'sqa', t: 'Risk and safety', c: 'r', chs: [3, 6, 10], why: 'The spiral model has risk analysis (Ch 3), hazard analysis is safety risk (Ch 6), and Ch 10 covers full risk management.' },
  { subject: 'sqa', t: 'Testability', c: 'g', chs: [2, 3, 10], why: 'Testability is a McCall factor (Ch 2), testing techniques are in Ch 3, and Ch 10 shows how to increase testability.' },
  { subject: 'sqa', t: 'Continuous improvement', c: 'a', chs: [7, 9, 10], why: 'Metrics give data (Ch 7), PDCA uses it (Ch 9), postmortems and root-cause analysis close the loop (Ch 10).' }
];
