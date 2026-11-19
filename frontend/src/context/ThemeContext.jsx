// Light / dark theme, remembered on this device.
import { createContext, useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/storage.js';

export const ThemeContext = createContext({ theme: null, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => storage.get('theme', null));

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(cur => {
      const dark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      const next = dark ? 'light' : 'dark';
      storage.set('theme', next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
