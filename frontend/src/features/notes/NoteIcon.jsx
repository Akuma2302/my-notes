import { ICONS } from './icons.js';

export default function NoteIcon({ name }) {
  return <svg className="nico" viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[name]} /></svg>;
}
