// Placeholder for a subject whose notes are not added yet.
import Art from './Art.jsx';
import { booksIllustration } from '../utils/illustrations.js';

export default function ComingSoon({ subject }) {
  return (
    <div className="course light soon-card">
      <Art svg={booksIllustration()} className="soon-art" />
      <span className="catpill"><span className="catdot">…</span>Coming soon</span>
      <h3>{subject.title}</h3>
      <p style={{ fontSize: 14, opacity: 0.8 }}>Notes for this subject are not added yet. When you have the lecture notes, they get the same
        notes, pictures, mind maps, company cases, code, flashcards and quiz as Software QA.</p>
      <ol style={{ fontSize: 13.5, opacity: 0.8 }}>
        <li>Put the lecture PDFs or zip in your course folder.</li>
        <li>Ask Claude to build notes for <b>{subject.short}</b>.</li>
        <li>They appear here as chapters.</li>
      </ol>
    </div>
  );
}
