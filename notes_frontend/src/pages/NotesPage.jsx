import React, { useEffect, useMemo, useState } from 'react';
import { useNotesStore } from '../stores/notesStore';
import NoteCard from '../ui/NoteCard';
import Modal from '../ui/Modal';
import EmptyState from '../ui/EmptyState';

// PUBLIC_INTERFACE
export default function NotesPage() {
  const { notes, load, loading, setQuery, query, add, edit, remove } = useNotesStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, [load]);

  const header = useMemo(() => (
    <div className="header-row">
      <div className="search-input" role="search">
        <span>🔎</span>
        <input placeholder="Search notes, content, or tags…" value={query} onChange={(e)=>setQuery(e.target.value)} />
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="primary-btn" onClick={() => { setEditing(null); setOpen(true); }}>
          ➕ New Note
        </button>
      </div>
    </div>
  ), [query, setQuery]);

  async function handleSave(form) {
    if (editing) {
      await edit(editing.id, form);
    } else {
      await add(form);
    }
    setOpen(false);
  }

  async function handleDelete(note) {
    const ok = confirm(`Delete "${note.title}"?`);
    if (ok) await remove(note.id);
  }

  return (
    <>
      {header}
      <section style={{marginTop:12}}>
        {loading ? (
          <div className="text-muted">Loading notes…</div>
        ) : notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            subtitle="Create your first note to get started."
            action={<button className="primary-btn" onClick={()=>{ setEditing(null); setOpen(true); }}>Create note</button>}
          />
        ) : (
          <div className="note-grid">
            {notes.map((n) => (
              <NoteCard key={n.id} note={n} onEdit={(note)=>{ setEditing(note); setOpen(true); }} onDelete={handleDelete}/>
            ))}
          </div>
        )}
      </section>

      <NoteEditorModal
        open={open}
        onClose={()=>setOpen(false)}
        initial={editing}
        onSave={handleSave}
      />
    </>
  );
}

function NoteEditorModal({ open, onClose, initial, onSave }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [tags, setTags] = useState((initial?.tags || []).join(', '));

  useEffect(() => {
    setTitle(initial?.title || '');
    setContent(initial?.content || '');
    setTags((initial?.tags || []).join(', '));
  }, [initial, open]);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: title.trim() || 'Untitled',
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSave(payload);
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Edit Note' : 'New Note'}
      footer={
        <>
          <button className="ghost-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleSubmit}>{initial ? 'Save Changes' : 'Create Note'}</button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <label className="text-muted" style={{fontSize:12}}>Title</label>
        <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Note title" required/>
        <div style={{height:10}}></div>
        <label className="text-muted" style={{fontSize:12}}>Content</label>
        <textarea className="input" rows={8} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write your note..."/>
        <div style={{height:10}}></div>
        <label className="text-muted" style={{fontSize:12}}>Tags (comma separated)</label>
        <input className="input" value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="work, ideas, personal"/>
      </form>
      <p className="text-muted" style={{fontSize:12, marginTop:8}}>
        Tip: Use tags to quickly filter related notes.
      </p>
    </Modal>
  );
}
