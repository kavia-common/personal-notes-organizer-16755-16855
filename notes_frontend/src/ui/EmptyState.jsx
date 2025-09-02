import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title, subtitle, action }) {
  return (
    <div style={{
      border:'1px dashed var(--border)', borderRadius:'12px', padding:'24px', background:'var(--panel)', textAlign:'center'
    }}>
      <div style={{fontWeight:600, marginBottom:6}}>{title}</div>
      <div className="text-muted" style={{marginBottom:12}}>{subtitle}</div>
      {action}
    </div>
  );
}
