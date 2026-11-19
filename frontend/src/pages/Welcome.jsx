// First screen on a new device: illustration, big black card, your name, Get started.
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Art from '../components/Art.jsx';
import Icon from '../components/Icon.jsx';
import { finishWelcome } from '../redux/progressSlice.js';
import { studyIllustration } from '../utils/illustrations.js';

export default function Welcome() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const start = e => { e.preventDefault(); dispatch(finishWelcome(name)); window.location.hash = '/'; };
  return (
    <form className="welcome fade" onSubmit={start}>
      <div className="topline">
        <span className="avatar" aria-hidden="true"><Icon name="book" /></span>
        <span className="brand">SQA study notes</span>
      </div>
      <Art svg={studyIllustration()} />
      <div className="big">
        <h1>Your brain</h1>
        <p>called. It wants better notes.</p>
        <small>10 lectures · 36 mind maps · 39 real stories</small>
        <svg className="corner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 8v11H8" /></svg>
      </div>
      <label htmlFor="who">What should we call you?</label>
      <input id="who" placeholder="Your first name (optional)" value={name} maxLength={30} onChange={e => setName(e.target.value)} autoComplete="given-name" />
      <button type="submit" className="start">
        <span className="go"><Icon name="book" /></span>
        <span>Get started</span>
        <span className="chev" aria-hidden="true">›››</span>
      </button>
    </form>
  );
}
