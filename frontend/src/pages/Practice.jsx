import { useSelector } from 'react-redux';
import TopBar from '../components/TopBar.jsx';
import Tile from '../components/Tile.jsx';
import Link from '../components/Link.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useSubject } from '../hooks/useSubject.js';
import { selectBest } from '../redux/progressSlice.js';

export default function Practice() {
  const { subject, chapters, theme } = useSubject();
  const best = useSelector(selectBest);
  return (
    <>
      <TopBar title="Practice" sub={`Flashcards, quiz, calculators · ${subject.short}`} back={false} />
      <SubjectTabs activeOnly />
      <div className="grid2">
        <Tile dark icon="cards" title="All flashcards" sub="Shuffle every chapter" to="/cards" />
        <Tile icon="quiz" title="Full quiz" sub="Mixed questions" to="/quiz" />
        <Tile icon="tools" title="Calculators" sub="Reliability, FP, risk" to="/tools" />
        <Tile icon="image" title="Pictures" sub="All diagrams" to="/gallery" />
        <Tile dark icon="building" title="Company cases" sub="Real stories" to="/cases" />
        <Tile icon="map" title="Mind maps" sub="Every map" to="/bigmap" />
      </div>
      <div className="lbl">Best quiz scores</div>
      {chapters.map(c => (
        <Link key={c.id} to={`/c/${c.id}/quiz`} className="row">
          <span className={'num ' + theme(c.theme).cls}>{c.num}</span>
          <span className="grow"><b>{c.short}</b><small>{best['q-' + c.id] != null ? `Best: ${best['q-' + c.id]} / ${c.quiz.length}` : 'Not tried yet'}</small></span>
          <ProgressRing value={best['q-' + c.id] || 0} max={c.quiz.length} size={40} label={best['q-' + c.id] != null ? `${best['q-' + c.id]}/${c.quiz.length}` : '–'} />
        </Link>
      ))}
    </>
  );
}
