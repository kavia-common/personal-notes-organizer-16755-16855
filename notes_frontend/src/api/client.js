/**
 * API client with stubs for future integration with notes_database backend.
 * All methods return Promises to mimic async calls.
 * Replace implementations with real fetch calls later.
 */

// Simulated storage for demo purposes (in-memory)
let _notes = [
  {
    id: '1',
    title: 'Welcome to Personal Notes Organizer',
    content: 'Create, edit, search and manage your notes easily.',
    tags: ['welcome', 'info'],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

function simulateDelay(result, delay = 200) {
  const g = (typeof globalThis !== 'undefined') ? globalThis : {};
  const st = typeof g.setTimeout === 'function' ? g.setTimeout : (fn) => fn();
  return new Promise((resolve) => st(() => resolve(result), delay));
}

function safeLocalStorage() {
  // Avoid referencing window directly for linter/no-undef in non-browser envs
  const g = (typeof globalThis !== 'undefined') ? globalThis : {};
  const ls = g.localStorage;
  if (ls && typeof ls.getItem === 'function') return ls;
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

function uuid() {
  const g = (typeof globalThis !== 'undefined') ? globalThis : {};
  if (g.crypto && typeof g.crypto.randomUUID === 'function') {
    return g.crypto.randomUUID();
  }
  // fallback
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// PUBLIC_INTERFACE
export async function login({ email, password }) {
  /** Simulate authentication. Replace with POST /auth/login */
  if (email && password) {
    const user = { id: 'u1', email };
    safeLocalStorage().setItem('auth_user', JSON.stringify(user));
    return simulateDelay({ user, token: 'demo-token' });
  }
  throw new Error('Invalid credentials');
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Clear auth session */
  safeLocalStorage().removeItem('auth_user');
  return simulateDelay(true);
}

// PUBLIC_INTERFACE
export async function getSession() {
  /** Return current session if any */
  const raw = safeLocalStorage().getItem('auth_user');
  return simulateDelay(raw ? JSON.parse(raw) : null);
}

// PUBLIC_INTERFACE
export async function fetchNotes(query = '') {
  /**
   * Replace with GET /notes?search=...
   */
  if (!query) return simulateDelay([..._notes].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)));
  const q = query.toLowerCase();
  const filtered = _notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q) ||
    (n.tags || []).some(t => t.toLowerCase().includes(q))
  );
  return simulateDelay(filtered.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)));
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Replace with POST /notes */
  const now = new Date().toISOString();
  const note = {
    id: uuid(),
    title: payload.title?.trim() || 'Untitled',
    content: payload.content || '',
    tags: payload.tags || [],
    createdAt: now,
    updatedAt: now,
  };
  _notes.unshift(note);
  return simulateDelay(note);
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Replace with PUT /notes/:id */
  const idx = _notes.findIndex(n => n.id === id);
  if (idx === -1) throw new Error('Note not found');
  _notes[idx] = { ..._notes[idx], ...payload, updatedAt: new Date().toISOString() };
  return simulateDelay(_notes[idx]);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Replace with DELETE /notes/:id */
  _notes = _notes.filter(n => n.id !== id);
  return simulateDelay(true);
}
