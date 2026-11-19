// Tap to flip, next/previous, shuffle. cards = [{ q, a, chapter }]
import { useMemo, useState } from 'react';
import { shuffle } from '../../utils/shuffle.js';

export default function Flashcards({ cards }) {
  const [order, setOrder] = useState(() => shuffle(cards.map((_, i) => i)));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = useMemo(() => cards[order[i]], [cards, order, i]);
  if (!card) return <p className="empty">No cards.</p>;
  const move = step => { setFlipped(false); setI(n => (n + step + cards.length) % cards.length); };
  return (
    <>
      <div className={'fc' + (flipped ? ' flip' : '')} onClick={() => setFlipped(f => !f)} role="button" tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFlipped(f => !f)} aria-label="Flashcard, press to flip">
        <div className="fc-in">
          <div className="fc-face"><small>Card {i + 1} of {cards.length} · Ch {card.chapter.num} · tap to flip</small><div className="q">{card.q}</div></div>
          <div className="fc-back fc-face"><small>Answer · from {card.chapter.lecture}</small><div style={{ fontSize: 16 }}>{card.a}</div></div>
        </div>
      </div>
      <div className="btns"><button className="btn" onClick={() => move(-1)}>← Previous</button><button className="btn pri" onClick={() => move(1)}>Next →</button></div>
      <div className="btns"><button className="btn" onClick={() => { setOrder(shuffle(order)); setI(0); setFlipped(false); }}>Shuffle</button></div>
    </>
  );
}
