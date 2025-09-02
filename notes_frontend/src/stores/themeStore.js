import { create } from 'zustand';

const THEME_KEY = 'notes_theme';

function safeGetItem(key, fallback) {
  const g = (typeof globalThis !== 'undefined') ? globalThis : {};
  const ls = g.localStorage;
  if (ls && typeof ls.getItem === 'function') {
    const v = ls.getItem(key);
    return v == null ? fallback : v;
  }
  return fallback;
}

function safeSetItem(key, value) {
  const g = (typeof globalThis !== 'undefined') ? globalThis : {};
  const ls = g.localStorage;
  if (ls && typeof ls.setItem === 'function') {
    ls.setItem(key, value);
  }
}

// PUBLIC_INTERFACE
export const useThemeStore = create((set, get) => ({
  theme: safeGetItem(THEME_KEY, 'light'),
  // PUBLIC_INTERFACE
  setTheme(t) {
    safeSetItem(THEME_KEY, t);
    set({ theme: t });
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t);
    }
  },
  // PUBLIC_INTERFACE
  toggle() {
    const t = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(t);
  },
}));

// Initialize attribute on load (browser)
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', safeGetItem(THEME_KEY, 'light'));
}
