'use client';

export function GachaSignupCta({ onSignupOpen }) {
  return (
    <section className="gacha-signup-cta">
      <h3>Interested? Sign up here!</h3>
      <p>Pick a plan, lock in your monthly box, and we will handle the tasty surprises.</p>
      <button type="button" className="gacha-signup-btn" onClick={onSignupOpen}>Sign Up</button>
    </section>
  );
}


