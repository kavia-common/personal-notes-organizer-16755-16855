import React from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  function onBackdrop(e) {
    if (e.target === e.currentTarget) onClose?.();
  }
  return (
    <div className="modal-backdrop" onMouseDown={onBackdrop} role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal">
        <header>
          <strong>{title}</strong>
          <button className="ghost-btn" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <main>{children}</main>
        <footer>{footer}</footer>
      </div>
    </div>
  );
}
