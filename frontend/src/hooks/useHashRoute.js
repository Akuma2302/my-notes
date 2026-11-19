// Hash-based routing (#/c/ch3/map). Works from a file, GitHub Pages, or a server.
import { useEffect, useState } from 'react';

const read = () => {
  const raw = window.location.hash.slice(1) || '/';
  const [path, qs = ''] = raw.split('?');
  return { path, parts: path.split('/').filter(Boolean), params: new URLSearchParams(qs) };
};

export function useHashRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const navigate = to => { window.location.hash = to; };
export const replaceRoute = to => { history.replaceState(null, '', '#' + to); window.dispatchEvent(new HashChangeEvent('hashchange')); };
export const goBack = () => (history.length > 1 ? history.back() : navigate('/'));
