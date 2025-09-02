import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import AppLayout from './ui/AppLayout';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import { useAuthStore } from './stores/authStore';

// Guarded route component
function PrivateRoute({ children }) {
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  return isAuthed ? children : <Navigate to="/login" replace />;
}

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<NotesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
