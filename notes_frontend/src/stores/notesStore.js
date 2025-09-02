import { create } from 'zustand';
import { createNote, deleteNote, fetchNotes, updateNote } from '../api/client';

// PUBLIC_INTERFACE
export const useNotesStore = create((set, get) => ({
  notes: [],
  loading: false,
  error: null,
  query: '',

  // PUBLIC_INTERFACE
  setQuery(q) {
    set({ query: q });
    get().load();
  },

  // PUBLIC_INTERFACE
  async load() {
    set({ loading: true, error: null });
    try {
      const data = await fetchNotes(get().query);
      set({ notes: data });
    } catch (e) {
      set({ error: e.message || 'Failed to load notes' });
    } finally {
      set({ loading: false });
    }
  },

  // PUBLIC_INTERFACE
  async add(note) {
    const created = await createNote(note);
    set({ notes: [created, ...get().notes] });
    return created;
  },

  // PUBLIC_INTERFACE
  async edit(id, updates) {
    const updated = await updateNote(id, updates);
    set({ notes: get().notes.map(n => n.id === id ? updated : n) });
    return updated;
  },

  // PUBLIC_INTERFACE
  async remove(id) {
    await deleteNote(id);
    set({ notes: get().notes.filter(n => n.id !== id) });
  },
}));
