// Big rounded chapter card (black or light), with category, progress ring and a pill button.
import Art from './Art.jsx';
import Icon from './Icon.jsx';
import ProgressRing from './ProgressRing.jsx';
import { navigate } from '../hooks/useHashRoute.js';
import { themeIllustration } from '../utils/illustrations.js';
import { useChapterTheme } from '../hooks/useSubject.js';

export default function CourseCard({ chapter: c, done, total, dark = true }) {
  const started = done > 0;
  const th = useChapterTheme()(c);
  return (
    <button className={'course' + (dark ? '' : ' light')} onClick={() => navigate(`/c/${c.id}`)} aria-label={`Chapter ${c.num}: ${c.title}`}>
      <Art svg={themeIllustration(c.theme)} />
      <div className="chiprow">
        <span className="catpill"><span className="catdot"><Icon name={th.icon} /></span>Ch {c.num} · {th.name}</span>
      </div>
      <span className="ringpos"><ProgressRing value={done} max={total} size={42} label={`${done}/${total}`} invert={dark} /></span>
      <h3>{c.title}</h3>
      <div className="meta">
        <span className="join">{done >= total ? 'REVISE' : started ? 'CONTINUE' : 'START'} <Icon name="chev" /></span>
        <span>{c.sections.length} topics · {c.cases.length} cases · {c.code.length} code</span>
      </div>
    </button>
  );
}
