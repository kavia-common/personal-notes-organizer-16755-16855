import { create } from 'zustand';
import { getSession, login as apiLogin, logout as apiLogout } from '../api/client';

// PUBLIC_INTERFACE
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // PUBLIC_INTERFACE
  async bootstrap() {
    set({ loading: true, error: null });
    try {
      const user = await getSession();
      set({ user, isAuthenticated: !!user });
    } catch {
      // ignore bootstrap errors in demo
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const { user } = await apiLogin({ email, password });
      set({ user, isAuthenticated: true });
      return true;
    } catch (e) {
      set({ error: e.message || 'Login failed' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async logout() {
    await apiLogout();
    set({ user: null, isAuthenticated: false });
  },
}));
