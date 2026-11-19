// Multiple-choice quiz with explanations. questions = [{ q, o, a, why, chapter }]
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { recordScore } from '../../redux/progressSlice.js';
import { shuffle } from '../../utils/shuffle.js';

export default function Quiz({ questions, scoreKey }) {
  const dispatch = useDispatch();
  const fresh = () => ({ order: shuffle(questions.map((_, i) => i)), i: 0, score: 0, picked: null });
  const [st, setSt] = useState(fresh);

  if (st.i >= questions.length) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Score: {st.score} / {questions.length}</h2>
        <p>{st.score === questions.length ? 'Perfect!' : st.score >= questions.length * 0.6 ? 'Good. Review the ones you missed.' : 'Read the notes again, then retry.'}</p>
        <button className="btn pri" onClick={() => setSt(fresh())}>Try again</button>
      </div>
    );
  }

  const q = questions[st.order[st.i]];
  const pick = n => {
    if (st.picked != null) return;
    setSt(s => ({ ...s, picked: n, score: s.score + (n === q.a ? 1 : 0) }));
  };
  const next = () => {
    const done = st.i + 1 >= questions.length;
    if (done) dispatch(recordScore({ key: scoreKey, score: st.score }));
    setSt(s => ({ ...s, i: s.i + 1, picked: null }));
  };

  return (
    <div className="card">
      <small style={{ color: 'var(--muted)' }}>Question {st.i + 1} of {questions.length} · Ch {q.chapter.num} · score {st.score}</small>
      <h3 style={{ marginTop: 6 }}>{q.q}</h3>
      {q.o.map((o, n) => {
        const cls = st.picked == null ? '' : n === q.a ? 'right' : n === st.picked ? 'wrong' : '';
        return <button key={o} className={'opt ' + cls} disabled={st.picked != null} onClick={() => pick(n)}>{o}</button>;
      })}
      {st.picked != null && (
        <>
          <div className="why"><b>{st.picked === q.a ? 'Correct.' : 'Not quite.'}</b> {q.why} <span className="src">{q.chapter.lecture.split(' - ')[0]}</span></div>
          <div className="btns"><button className="btn pri" onClick={next}>{st.i + 1 >= questions.length ? 'See score' : 'Next'}</button></div>
        </>
      )}
    </div>
  );
}
