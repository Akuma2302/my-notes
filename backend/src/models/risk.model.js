export const RISK_LIMITS = { nameMax: 120, planMax: 200 };

// exposure = probability x impact (Ch 10 risk table)
export const toRisk = row => ({
  id: row.id, name: row.name, probability: row.probability, impact: row.impact, plan: row.plan,
  exposure: Math.round((row.probability / 100) * row.impact * 100) / 100,
  createdAt: row.created_at
});
