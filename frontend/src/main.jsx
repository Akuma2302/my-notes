import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ContentProvider } from './context/ContentContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

// Offline support for the hosted web app (not needed in the single-file phone build).
if ('serviceWorker' in navigator && import.meta.env.PROD && import.meta.env.VITE_STATIC !== 'true' && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
