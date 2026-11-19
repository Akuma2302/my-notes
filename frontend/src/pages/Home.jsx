// Home: hello header, big title, subject tabs, then the chosen subject's chapters.
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../components/Icon.jsx';
import Link from '../components/Link.jsx';
import Tile from '../components/Tile.jsx';
import Art from '../components/Art.jsx';
import CourseCard from '../components/CourseCard.jsx';
import ComingSoon from '../components/ComingSoon.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import SkillList from './SkillList.jsx';
import { useContent } from '../hooks/useContent.js';
import { useSubject } from '../hooks/useSubject.js';
import { useTheme } from '../hooks/useTheme.js';
import { chapterProgress, selectProgress, setFilter } from '../redux/progressSlice.js';
import { tabCount } from '../utils/constants.js';
import { initials } from '../utils/maps.js';
import { studyIllustration } from '../utils/illustrations.js';

const tabsOf = c => tabCount(c);

export default function Home() {
  const { chapters: all, skills } = useContent();
  const { name, visited, filter, subject: picked } = useSelector(selectProgress);
  const { subject, chapters, theme } = useSubject(undefined, { allowSoon: true });
  const dispatch = useDispatch();
  const { toggle } = useTheme();
  const done = c => chapterProgress(visited, c, tabsOf(c));
  const pct = list => (list.length ? Math.round((list.reduce((s, c) => s + done(c), 0) / list.reduce((s, c) => s + tabsOf(c), 0)) * 100) : 0);
  const showSkills = picked === 'se';
  const soon = subject.status !== 'active';
  const themes = Object.keys(subject.themes || {});
  const shown = filter === 'all' ? chapters : chapters.filter(c => c.theme === filter);
  const next = chapters.find(c => done(c) > 0 && done(c) < tabsOf(c)) || chapters.find(c => done(c) === 0) || chapters[0];
  const sum = key => chapters.reduce((s, c) => s + c[key].length, 0);

  return (
    <>
      <div className="hello">
        <Link to="/me" className="avatar" aria-label="Your profile">{initials(name)}</Link>
        <div className="grow"><b>Hello, {name || 'student'}</b><small>Overall progress {pct(all)}%</small></div>
        <Link to="/search" className="icon-btn" aria-label="Search"><Icon name="search" /></Link>
        <button className="icon-btn" onClick={toggle} aria-label="Change light or dark mode"><Icon name="sun" /></button>
      </div>

      <div className="headline">Become the<br /><span className="strike">Software</span><br />Engineering Master</div>

      <SubjectTabs withSkills />

      {showSkills ? <SkillList /> : soon ? <ComingSoon subject={subject} /> : (
        <>
          <Link to={`/s/${subject.id}`} className="subject-hero" aria-label={`Open ${subject.title}`}>
            <Art svg={studyIllustration()} />
            <small>{subject.code ? `${subject.code} · ` : ""}{chapters.length} chapters</small>
            <h2>{subject.title}</h2>
            <div className="bar"><i style={{ width: pct(chapters) + '%' }} /></div>
            <small>{pct(chapters)}% done</small>
          </Link>

          {themes.length > 1 && (
            <div className="tabs theme-tabs" role="tablist" aria-label="Filter by theme">
              <span className="tab square" aria-hidden="true"><Icon name="cards" /></span>
              {[['all', 'All chapters'], ...themes.map(t => [t, theme(t).name])].map(([k, l]) => (
                <button key={k} role="tab" aria-selected={filter === k} className={'tab' + (filter === k ? ' on' : '')} onClick={() => dispatch(setFilter(k))}>
                  <Icon name={k === 'all' ? 'book' : theme(k).icon} />{l}
                </button>
              ))}
            </div>
          )}

          {filter === 'all' && next && <>
            <div className="lbl">Continue</div>
            <CourseCard chapter={next} done={done(next)} total={tabsOf(next)} dark />
            <div className="lbl">Quick study</div>
            <div className="hscroll">
              <Tile dark icon="map" title="Mind maps" sub="Every chapter" to="/bigmap" />
              <Tile icon="graph" title="Connections" sub="Linked lectures" to="/connect" />
              <Tile icon="cards" title="Flashcards" sub={sum('cards') + ' cards'} to="/cards" />
              <Tile dark icon="quiz" title="Quiz" sub={sum('quiz') + ' questions'} to="/quiz" />
              <Tile icon="building" title="Cases" sub={sum('cases') + ' stories'} to="/cases" />
              <Tile icon="image" title="Pictures" sub="All diagrams" to="/gallery" />
              <Tile dark icon="tools" title="Calculators" sub="Ch 5, 7, 10" to="/tools" />
              <Tile icon="star" title="SE essentials" sub={skills.length + ' topics'} to="/se" />
            </div>
          </>}
          <div className="lbl">{filter === 'all' ? 'All chapters' : `${shown.length} chapters`}</div>
          {shown.map((c, i) => <CourseCard key={c.id} chapter={c} done={done(c)} total={tabsOf(c)} dark={i % 2 === 1} />)}
        </>
      )}
    </>
  );
}
