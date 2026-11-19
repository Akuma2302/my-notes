// Ch 10: your own risk table, sorted by exposure (probability × impact).
import { useState } from 'react';
import { useRisks } from '../../hooks/useRisks.js';
import { IS_OFFLINE_BUILD } from '../../services/contentService.js';

export default function RiskTable() {
  const { risks, error, setError, add, remove } = useRisks();
  const [f, setF] = useState({ name: '', probability: '50', impact: '3', plan: '' });

  const submit = async e => {
    e.preventDefault();
    const p = Number(f.probability), i = Number(f.impact);
    if (!f.name.trim()) return setError('Enter a risk name first.');
    if (!Number.isInteger(p) || p < 1 || p > 100 || !Number.isInteger(i) || i < 1 || i > 5) return setError('Probability 1-100 and impact 1-5 (whole numbers).');
    if (await add({ name: f.name.trim(), probability: p, impact: i, plan: f.plan.trim() })) setF({ ...f, name: '', plan: '' });
  };
  const field = k => ({ value: f[k], onChange: e => { setError(''); setF({ ...f, [k]: e.target.value }); } });

  return (
    <form className="card calc" onSubmit={submit}>
      <h3>Risk table</h3>
      <p style={{ fontSize: 13 }}>Add risks for your own project (e.g. final year project). Saved {IS_OFFLINE_BUILD ? 'on this phone' : 'in the database'}.</p>
      <label>Risk<input style={{ width: '60%' }} placeholder="Supervisor changes scope" {...field('name')} /></label>
      <label>Probability %<input type="number" min="1" max="100" {...field('probability')} /></label>
      <label>Impact 1-5<input type="number" min="1" max="5" {...field('impact')} /></label>
      <label>RMMM plan<input style={{ width: '60%' }} placeholder="Agree scope in writing" {...field('plan')} /></label>
      {error && <div className="err" role="alert">{error}</div>}
      <button className="btn pri" style={{ width: '100%' }} type="submit">Add risk</button>
      <div style={{ marginTop: 10 }}>
        {risks.length === 0 ? <p className="empty">No risks yet.</p> : (
          <div className="tablewrap"><table className="t">
            <thead><tr><th>Risk</th><th>P</th><th>I</th><th>Exp.</th><th /></tr></thead>
            <tbody>{risks.map(r => (
              <tr key={r.id}>
                <td>{r.name}<br /><small style={{ color: 'var(--muted)' }}>{r.plan}</small></td>
                <td>{r.probability}%</td><td>{r.impact}</td>
                <td><b style={{ color: r.exposure >= 3 ? 'var(--r600)' : r.exposure >= 1.5 ? 'var(--a600)' : 'var(--g600)' }}>{r.exposure.toFixed(1)}</b></td>
                <td><button type="button" onClick={() => remove(r.id)} aria-label={`Delete ${r.name}`}>✕</button></td>
              </tr>))}
            </tbody>
          </table></div>
        )}
      </div>
    </form>
  );
}
