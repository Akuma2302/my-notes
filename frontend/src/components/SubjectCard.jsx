// Big card for one subject on the Subjects page.
import Art from './Art.jsx';
import Icon from './Icon.jsx';
import ProgressRing from './ProgressRing.jsx';
import { navigate } from '../hooks/useHashRoute.js';
import { booksIllustration, studyIllustration } from '../utils/illustrations.js';

export default function SubjectCard({ subject: s, done, total, dark }) {
  const soon = s.status !== 'active';
  return (
    <button className={'course' + (dark ? '' : ' light')} onClick={() => navigate(`/s/${s.id}`)} aria-label={s.title}>
      <Art svg={soon ? booksIllustration() : studyIllustration()} />
      <div className="chiprow"><span className="catpill"><span className="catdot"><Icon name={soon ? 'calendar' : 'book'} /></span>{soon ? 'Coming soon' : `${s.code || 'Subject'} · ${s.chapterCount} chapters`}</span></div>
      {!soon && <span className="ringpos"><ProgressRing value={done} max={total || 1} size={42} label={`${Math.round((done / (total || 1)) * 100)}%`} invert={dark} /></span>}
      <h3>{s.title}</h3>
      <div className="meta"><span className="join">{soon ? 'SEE PLAN' : done ? 'CONTINUE' : 'START'} <Icon name="chev" /></span><span>{s.description}</span></div>
    </button>
  );
}
