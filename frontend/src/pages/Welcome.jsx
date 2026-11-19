// Welcome screen, shown each time the app is opened (once per launch, not on every page change).
// New users enter a name; returning users are greeted by name and can change it.
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Art from '../components/Art.jsx';
import Icon from '../components/Icon.jsx';
import { finishWelcome, selectProgress } from '../redux/progressSlice.js';
import { studyIllustration } from '../utils/illustrations.js';
import { useContent } from '../hooks/useContent.js';
import logo from '../assets/logo.svg';

export default function Welcome({ onDone }) {
  const dispatch = useDispatch();
  const { onboarded, name: saved } = useSelector(selectProgress);
  const returning = onboarded && saved;
  const [name, setName] = useState(saved || '');
  const [editing, setEditing] = useState(!returning);
  const { subjects, chapters } = useContent();
  const active = subjects.filter(x => x.status === 'active').length;
  const maps = chapters.reduce((n, c) => n + c.mindmaps.length, 0);
  const tutorials = chapters.reduce((n, c) => n + (c.tutorial ? 1 : 0), 0);

  const start = e => {
    e.preventDefault();
    dispatch(finishWelcome(name));
    onDone();                 // stay on the page the app was opened at (e.g. a shared chapter link)
  };

  return (
    <form className="welcome fade" onSubmit={start}>
      <div className="topline">
        <img className="logo-mark" src={logo} alt="" />
        <span className="brand">SE Master</span>
      </div>
      <Art svg={studyIllustration()} />
      <div className="big">
        <h1>Your brain</h1>
        <p>called. It wants better notes.</p>
        <small>{active} subjects · {chapters.length} chapters · {maps} mind maps · {tutorials} tutorials</small>
        <svg className="corner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 8v11H8" /></svg>
      </div>
      <div className="who">
        {editing ? (
          <>
            <label htmlFor="who">{returning ? 'Change your name' : 'What should we call you?'}</label>
            <input id="who" placeholder="Your first name (optional)" value={name} maxLength={30}
              onChange={e => setName(e.target.value)} autoComplete="given-name" autoFocus={!!returning} />
          </>
        ) : (
          <p className="hi">Welcome back, {saved}! <button type="button" className="zbtn" onClick={() => setEditing(true)}>Not you?</button></p>
        )}
      </div>
      <button type="submit" className="start">
        <span className="go"><Icon name="book" /></span>
        <span>{returning ? 'Continue' : 'Get started'}</span>
        <span className="chev" aria-hidden="true">›››</span>
      </button>
    </form>
  );
}
