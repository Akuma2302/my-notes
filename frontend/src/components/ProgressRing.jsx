// Circular progress like "5/8" or "56%".
export default function ProgressRing({ value, max = 1, size = 44, stroke = 4, label, big = false, invert = false }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const fg = invert ? 'var(--on-ink)' : 'var(--ink)';
  const bg = invert ? 'rgba(127,127,127,.4)' : 'var(--surface2)';
  return (
    <span className={'ring' + (big ? ' big' : '')} role="img" aria-label={label ?? `${Math.round(pct * 100)}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={fg} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <span>{label ?? `${Math.round(pct * 100)}%`}</span>
    </span>
  );
}
