// Ch 5: POFOD, ROCOF, MTTF, availability.
import { useState } from 'react';

const FIELDS = [['req', 'Service requests', 50000], ['fail', 'Failed requests', 25], ['hrs', 'Operating hours', 1000], ['nf', 'Failures in that time', 4], ['rep', 'Repair / restart hours', 2]];

export default function ReliabilityCalculator() {
  const [v, setV] = useState(Object.fromEntries(FIELDS.map(([k, , d]) => [k, String(d)])));
  const n = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, parseFloat(x)]));
  let error = '';
  if (Object.values(n).some(Number.isNaN) || n.req <= 0 || n.hrs <= 0 || Object.values(n).some(x => x < 0)) error = 'Enter positive numbers.';
  else if (n.fail > n.req) error = 'Failed requests cannot exceed total requests.';
  else if (n.rep > n.hrs) error = 'Repair time cannot exceed operating time.';
  const pofod = n.fail / n.req, rocof = n.nf / n.hrs, mttf = n.nf ? n.hrs / n.nf : Infinity, av = (n.hrs - n.rep) / n.hrs;

  return (
    <div className="card calc">
      <h3>Reliability metrics calculator</h3>
      {FIELDS.map(([k, label]) => (
        <label key={k}>{label}<input type="number" min="0" value={v[k]} onChange={e => setV({ ...v, [k]: e.target.value })} /></label>
      ))}
      {error ? <div className="err" role="alert">{error}</div> : (
        <table className="t"><tbody>
          <tr><td>POFOD</td><td className="out">{pofod.toFixed(5)}</td><td>1 in {pofod ? Math.round(1 / pofod).toLocaleString() : '∞'}</td></tr>
          <tr><td>ROCOF</td><td className="out">{rocof.toFixed(4)}</td><td>per hour</td></tr>
          <tr><td>MTTF</td><td className="out">{Number.isFinite(mttf) ? mttf.toFixed(1) : '∞'}</td><td>hours</td></tr>
          <tr><td>Availability</td><td className="out">{(av * 100).toFixed(3)}%</td><td>{av >= 0.99999 ? 'five nines' : av >= 0.999 ? 'three nines' : ''}</td></tr>
        </tbody></table>
      )}
      <p style={{ fontSize: 13, color: 'var(--muted)' }}>Formulas from Ch 5: POFOD = failed ÷ requests, ROCOF = failures ÷ time, MTTF = time ÷ failures, availability = up time ÷ total time.</p>
    </div>
  );
}
