import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../stores/authStore';

// PUBLIC_INTERFACE
export default function Sidebar() {
  const { pathname } = useLocation();
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge">PN</div>
        <div>
          <div style={{ fontWeight: 700 }}>Notes Organizer</div>
          <div className="text-muted" style={{ fontSize: 12 }}>Personal</div>
        </div>
      </div>

      <nav className="nav" aria-label="Main Navigation">
        <Link to="/" className="ghost-btn" aria-current={pathname === '/' ? 'page' : undefined}>
          🗒️ Notes
        </Link>
      </nav>

      <div className="divider"></div>

      <div className="nav">
        <ThemeToggle />
        <button className="ghost-btn" onClick={logout}>⎋ Logout</button>
      </div>

      <p className="text-muted" style={{ marginTop: 16, fontSize: 12 }}>
        Primary: #4F8EF7 • Secondary: #263238 • Accent: #FFAB00
      </p>
    </aside>
  );
}
