import { useMemo } from 'react';
import TopBar from '../components/TopBar.jsx';
import Flashcards from '../features/flashcards/Flashcards.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useSubject } from '../hooks/useSubject.js';

export default function Cards() {
  const { subject, chapters } = useSubject();
  const cards = useMemo(() => chapters.flatMap(c => c.cards.map(([q, a]) => ({ q, a, chapter: c }))), [chapters]);
  return <><TopBar title="Flashcards" sub={`${cards.length} cards · ${subject.short}`} /><SubjectTabs activeOnly />{cards.length ? <Flashcards key={subject.id} cards={cards} /> : <p className="empty">No cards for this subject yet.</p>}</>;
}
