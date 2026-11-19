// Tutorial sheet for a chapter: every question with its marks and a model answer.
import { useState } from 'react';

const KIND_LABEL = { question: 'Discussion', practical: 'Practical', assignment: 'Assignment' };

export default function TutorialTab({ chapter: c }) {
  const t = c.tutorial;
  const [open, setOpen] = useState(() => new Set());
  const allOpen = open.size === t.items.length;
  const toggle = i => setOpen(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const total = t.items.reduce((s, x) => s + (x.m || 0), 0);
  let lastKind = null;

  return (
    <>
      <div className="card tut-head">
        <b>{t.title || `Tutorial ${t.no}`}</b>
        <small>{t.items.length} questions{total ? ` · ${total} marks` : ''}{t.source ? ` · from ${t.source}` : ''}</small>
        {t.intro && <div className="tut-intro" dangerouslySetInnerHTML={{ __html: t.intro }} />}
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>Try each question first, then open the model answer. Answers are written from the Ch {c.num} notes.</p>
        <button className="btn" onClick={() => setOpen(allOpen ? new Set() : new Set(t.items.map((_, i) => i)))}>{allOpen ? 'Hide all answers' : 'Show all answers'}</button>
      </div>
      {t.items.map((x, i) => {
        const kind = x.kind || 'question';
        const heading = kind !== lastKind && t.items.some(y => (y.kind || 'question') !== 'question') ? KIND_LABEL[kind] : null;
        lastKind = kind;
        return (
          <div key={i}>
            {heading && <div className="lbl">{heading}</div>}
            <div className="tut-q">
              <div className="tut-top">
                <span className="tut-n">{x.n}</span>
                {x.m != null && <span className="tut-m">{x.m} mark{x.m === 1 ? '' : 's'}</span>}
              </div>
              <p className="tut-text">{x.q}</p>
              <button className="tut-toggle" aria-expanded={open.has(i)} onClick={() => toggle(i)}>{open.has(i) ? 'Hide model answer' : 'Show model answer'}</button>
              {open.has(i) && <div className="tut-a fade" dangerouslySetInnerHTML={{ __html: x.a }} />}
            </div>
          </div>
        );
      })}
    </>
  );
}
