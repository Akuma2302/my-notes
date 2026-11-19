// Loads and changes the student's risk table (Ch 10).
import { useCallback, useEffect, useState } from 'react';
import { riskService } from '../services/contentService.js';

export function useRisks() {
  const [risks, setRisks] = useState([]);
  const [error, setError] = useState('');

  const reload = useCallback(() => riskService.list().then(setRisks).catch(e => setError(e.message)), []);
  useEffect(() => { reload(); }, [reload]);

  const add = async risk => {
    setError('');
    try { await riskService.create(risk); await reload(); return true; } catch (e) { setError(e.details?.[0]?.message || e.message); return false; }
  };
  const remove = async id => { await riskService.remove(id); await reload(); };

  return { risks, error, setError, add, remove };
}
