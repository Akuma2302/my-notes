import { MAP_COLORS } from './constants.js';
// Turn an SE topic into a coloured mind map.
export const skillMap = s => ({ center: s.title.split(' ')[0], branches: s.map.branches.map((b, i) => ({ ...b, color: MAP_COLORS[i % MAP_COLORS.length] })) });

// "Aina Sofea" -> "AS", "" -> "ME"
export const initials = name => (name || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || 'ME';
