// Ch 7: FP = CFP × (0.65 + 0.01 × RCAF)
import { useState } from 'react';
import { FP_DEFAULTS, FP_WEIGHTS } from '../../utils/constants.js';

export default function FunctionPointCalculator() {
  const [counts, setCounts] = useState(() => Object.fromEntries(FP_WEIGHTS.map(([k]) => [k, FP_DEFAULTS[k].map(String)])));
  const [rcaf, setRcaf] = useState('42');
  const nums = FP_WEIGHTS.flatMap(([k, , w]) => counts[k].map((x, i) => [parseFloat(x), w[i]]));
  const r = parseFloat(rcaf);
  const bad = nums.some(([x]) => Number.isNaN(x) || x < 0) || Number.isNaN(r) || r < 0 || r > 70;
  const cfp = nums.reduce((s, [x, w]) => s + x * w, 0);
  const factor = 0.65 + 0.01 * r;
  const set = (k, i, val) => setCounts(c => ({ ...c, [k]: c[k].map((x, j) => (j === i ? val : x)) }));

  return (
    <div className="card calc">
      <h3>Function point calculator</h3>
      <p style={{ fontSize: 13 }}>Enter how many simple / average / complex components you have.</p>
      <div className="tablewrap"><table className="t">
        <thead><tr><th>Component</th><th>Simple</th><th>Avg</th><th>Complex</th></tr></thead>
        <tbody>{FP_WEIGHTS.map(([k, label, w]) => (
          <tr key={k}><td>{label}<br /><small style={{ color: 'var(--muted)' }}>weights {w.join('/')}</small></td>
            {w.map((_, i) => <td key={i}><input style={{ width: 56 }} type="number" min="0" aria-label={`${label} ${['simple', 'average', 'complex'][i]}`} value={counts[k][i]} onChange={e => set(k, i, e.target.value)} /></td>)}
          </tr>))}
        </tbody>
      </table></div>
      <label>RCAF (sum of 14 grades, 0-70)<input type="number" min="0" max="70" value={rcaf} onChange={e => setRcaf(e.target.value)} /></label>
      {bad ? <div className="err" role="alert">Counts must be 0 or more, and RCAF between 0 and 70.</div> : (
        <><p>CFP = <b>{cfp}</b> · factor = 0.65 + 0.01 × {r} = <b>{factor.toFixed(2)}</b></p><p>FP = <span className="out">{(cfp * factor).toFixed(2)}</span></p></>
      )}
      <p style={{ fontSize: 13, color: 'var(--muted)' }}>FP = CFP × (0.65 + 0.01 × RCAF) (Ch 7)</p>
    </div>
  );
}
