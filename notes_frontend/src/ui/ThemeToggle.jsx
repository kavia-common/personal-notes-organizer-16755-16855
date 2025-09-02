import React from 'react';
import { useThemeStore } from '../stores/themeStore';

// PUBLIC_INTERFACE
export default function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  return (
    <button className="ghost-btn" aria-label="Toggle theme" onClick={toggle} title="Toggle dark/light">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
