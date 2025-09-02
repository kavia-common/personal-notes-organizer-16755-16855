import React from 'react';
import { formatDistanceToNow } from 'date-fns';

// PUBLIC_INTERFACE
export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card">
      <div className="note-title">{note.title}</div>
      <div className="text-muted" style={{whiteSpace:'pre-line'}}>{note.content?.slice(0, 220)}</div>
      {note.tags?.length ? (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:6 }}>
          {note.tags.map((t) => (
            <span key={t} style={{
              fontSize:12, padding:'4px 8px', borderRadius:999,
              background:'var(--input)', border:'1px solid var(--border)'
            }}>{t}</span>
          ))}
        </div>
      ) : null}
      <div className="note-meta">
        <span>Updated {formatDistanceToNow(new Date(note.updatedAt))} ago</span>
      </div>
      <div className="note-actions">
        <button className="ghost-btn" onClick={() => onEdit(note)}>✏️ Edit</button>
        <button className="ghost-btn" onClick={() => onDelete(note)}>🗑️ Delete</button>
      </div>
    </article>
  );
}
