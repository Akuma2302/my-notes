import { ICONS } from '../assets/icons.js';

export default function Icon({ name, width = 1.8, className = 'ic' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] || ICONS.star} />
    </svg>
  );
}
