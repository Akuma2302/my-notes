// localStorage that never crashes (private mode, blocked storage).
const PREFIX = 'sqa.';
export const storage = {
  get(key, fallback) {
    try { const v = localStorage.getItem(PREFIX + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }
};

// Same, but for this app launch only (cleared when the tab or installed app is closed).
export const session = {
  get(key, fallback) {
    try { const v = sessionStorage.getItem(PREFIX + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { sessionStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }
};
