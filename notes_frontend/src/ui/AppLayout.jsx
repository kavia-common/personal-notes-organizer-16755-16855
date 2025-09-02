import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuthStore } from '../stores/authStore';

// PUBLIC_INTERFACE
export default function AppLayout() {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  useEffect(() => { bootstrap(); }, [bootstrap]);

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
