// One chapter with its tabs: note, mind map, links, real life, code, beyond, cards, quiz, calculator.
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Art from '../components/Art.jsx';
import Link from '../components/Link.jsx';
import Tabs from '../components/Tabs.jsx';
import Icon from '../components/Icon.jsx';
import MindMap from '../components/MindMap.jsx';
import CaseCard from '../components/CaseCard.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import SkillCard from '../components/SkillCard.jsx';
import NoteTab from '../features/chapter/NoteTab.jsx';
import LinksTab from '../features/chapter/LinksTab.jsx';
import Flashcards from '../features/flashcards/Flashcards.jsx';
import Quiz from '../features/quiz/Quiz.jsx';
import ChapterTool from '../features/calculators/ChapterTool.jsx';
import NotFound from './NotFound.jsx';
import { useContent } from '../hooks/useContent.js';
import { goBack, replaceRoute } from '../hooks/useHashRoute.js';
import { markRead, selectSaved, toggleSaved, visitTab } from '../redux/progressSlice.js';
import { themeIllustration } from '../utils/illustrations.js';
import { CHAPTER_TABS } from '../utils/constants.js';

export default function Chapter({ id, tab = 'note' }) {
  const { chapterById, skillById, subjectById } = useContent();
  const c = chapterById[id];
  const dispatch = useDispatch();
  const saved = useSelector(selectSaved);
  useEffect(() => { if (c) { dispatch(markRead(c.id)); dispatch(visitTab({ id: c.id, tab })); } }, [c, tab, dispatch]);
  const cards = useMemo(() => (c ? c.cards.map(([q, a]) => ({ q, a, chapter: c })) : []), [c]);
  const quiz = useMemo(() => (c ? c.quiz.map(q => ({ ...q, chapter: c })) : []), [c]);
  if (!c) return <NotFound />;

  const tabs = c.tool ? [...CHAPTER_TABS, ['tools', 'Calculator']] : CHAPTER_TABS;
  const key = 'c:' + c.id;
  const pics = c.sections.reduce((n, x) => n + (x.pics || []).length, 0);
  return (
    <>
      <header className="ch-hero">
        <div className="bar-top">
          <button className="icon-btn" onClick={goBack} aria-label="Back"><Icon name="back" /></button>
          <button className={'icon-btn' + (saved.includes(key) ? ' bm' : '')} onClick={() => dispatch(toggleSaved(key))} aria-label="Save chapter" aria-pressed={saved.includes(key)}><Icon name="bookmark" /></button>
        </div>
        <Art svg={themeIllustration(c.theme)} />
        <h1>{c.title}</h1>
        <div className="from">{subjectById[c.subject]?.short} · Ch {c.num} · from {c.lecture}.pdf</div>
        <p className="desc">{c.summary}</p>
        <div className="lbl">Linked lectures <button onClick={() => replaceRoute(`/c/${c.id}/links`)}>See all</button></div>
        <div className="avatars">
          {c.links.map(l => { const o = chapterById[l.to]; return (
            <Link key={l.to + l.topic} to={`/c/${o.id}`} aria-label={`Chapter ${o.num}: ${l.topic}`}><span className="face">{o.num}</span>{l.topic.split(' ').slice(0, 2).join(' ')}</Link>
          ); })}
        </div>
        <div className="stats">
          {[['Topics', c.sections.length, 'note'], ['Pictures', pics, 'note'], ['Mind maps', c.mindmaps.length, 'map'], ['Cases', c.cases.length, 'cases'], ['Code', c.code.length, 'code'], ['Quiz', c.quiz.length, 'quiz']].map(([label, n, t]) => (
            <button key={label} className="stat" onClick={() => replaceRoute(`/c/${c.id}/${t}`)}><small>{label}</small><b>{n}</b></button>
          ))}
        </div>
      </header>
      <Tabs sticky items={tabs} active={tab} onPick={k => replaceRoute(`/c/${c.id}/${k}`)} />
      <div className="fade" key={tab}>
        {tab === 'note' && <NoteTab chapter={c} />}
        {tab === 'map' && <>
          {c.mindmaps.map((m, i) => <MindMap key={i} map={m} caption={`Mind map ${i + 1}: ${m.center}`} />)}
          <div className="tip"><b>Tip:</b> cover the leaves with your hand and try to recall them from the branch names.</div>
        </>}
        {tab === 'links' && <LinksTab chapter={c} />}
        {tab === 'cases' && c.cases.map(k => <CaseCard key={k.co} item={k} />)}
        {tab === 'code' && c.code.map(k => <div key={k.title}><h2>{k.title}</h2><p>{k.explain}</p><CodeBlock src={k.src} lang={k.lang} /></div>)}
        {tab === 'beyond' && <>
          <div className="card">Industry topics you should learn alongside this chapter, and why each one connects to it. Tap a topic to see what to learn, a company example and code.</div>
          {c.beyond.map(b => <SkillCard key={b.skill} skill={skillById[b.skill]} why={b.why} chapter={c} />)}
        </>}
        {tab === 'cards' && <Flashcards cards={cards} />}
        {tab === 'quiz' && <Quiz questions={quiz} scoreKey={'q-' + c.id} />}
        {tab === 'tools' && <ChapterTool tool={c.tool} />}
      </div>
    </>
  );
}
