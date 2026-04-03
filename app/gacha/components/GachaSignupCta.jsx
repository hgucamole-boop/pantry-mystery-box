'use client';
import { trackEvent } from '@/lib/gtm';

export function GachaSignupCta({ onSignupOpen }) {
  function handleClick() {
    trackEvent("gacha-interested-button-click", {})
    onSignupOpen();
  }
  return (
    <section className="gacha-signup-cta">
      <h3>Interested? Sign up here!</h3>
      <p>Pick a plan, lock in your monthly box, and we will handle the tasty surprises.</p>
      <button type="button" className="gacha-signup-btn" onClick={handleClick}>Sign Up</button>
    </section>
  );
}


