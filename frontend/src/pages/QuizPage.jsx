import { useMemo } from 'react';
import TopBar from '../components/TopBar.jsx';
import Quiz from '../features/quiz/Quiz.jsx';
import SubjectTabs from '../components/SubjectTabs.jsx';
import { useSubject } from '../hooks/useSubject.js';

export default function QuizPage() {
  const { subject, chapters } = useSubject();
  const questions = useMemo(() => chapters.flatMap(c => c.quiz.map(q => ({ ...q, chapter: c }))), [chapters]);
  return <><TopBar title="Quiz" sub={`${questions.length} questions · ${subject.short}`} /><SubjectTabs activeOnly />{questions.length ? <Quiz key={subject.id} questions={questions} scoreKey={'all-' + subject.id} /> : <p className="empty">No questions for this subject yet.</p>}</>;
}
