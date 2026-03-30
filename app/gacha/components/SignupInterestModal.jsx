'use client';

import { useEffect } from 'react';

export function SignupInterestModal({ isOpen, email, onEmailChange, onClose, onSubmit }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="gacha-modal-backdrop gacha-modal-backdrop-enter" onClick={onClose}>
      <div
        className="gacha-modal gacha-modal-enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gacha-signup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="gacha-modal-close"
          onClick={onClose}
          aria-label="Close sign up form"
        >
          ×
        </button>
        <h4 id="gacha-signup-title">Register Your Interest</h4>
        <p>Drop your email and we will keep you posted on upcoming snack box releases.</p>
        <form className="gacha-modal-form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
          />
          <button type="submit">Notify Me</button>
        </form>
      </div>
    </div>
  );
}


