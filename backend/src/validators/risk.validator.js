import { RISK_LIMITS } from '../models/risk.model.js';

export function createRiskBody(body) {
  const errors = [];
  const name = String(body.name ?? '').trim();
  const plan = String(body.plan ?? '').trim();
  const probability = Number(body.probability);
  const impact = Number(body.impact);
  if (!name) errors.push({ field: 'name', message: 'Enter a risk name' });
  if (name.length > RISK_LIMITS.nameMax) errors.push({ field: 'name', message: `Name must be at most ${RISK_LIMITS.nameMax} characters` });
  if (plan.length > RISK_LIMITS.planMax) errors.push({ field: 'plan', message: `Plan must be at most ${RISK_LIMITS.planMax} characters` });
  if (!Number.isInteger(probability) || probability < 1 || probability > 100) errors.push({ field: 'probability', message: 'Probability must be a whole number from 1 to 100' });
  if (!Number.isInteger(impact) || impact < 1 || impact > 5) errors.push({ field: 'impact', message: 'Impact must be a whole number from 1 to 5' });
  return { value: { name, plan, probability, impact }, errors };
}

export function riskIdParam({ id }) {
  const n = Number(id);
  return { value: { id: n }, errors: Number.isInteger(n) && n > 0 ? [] : [{ field: 'id', message: 'Risk id must be a positive whole number' }] };
}
