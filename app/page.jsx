'use client';
import { useState, useEffect } from 'react';

// Google Analytics Helper
const GA_MEASUREMENT_ID = 'G-M26YWFT73Q'; 

export function initGA() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
}

export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

export default function SnackBoxLanding() {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('team');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      initGA();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track signup event
    trackEvent('subscription_signup', {
      plan: selectedPlan,
      email: email
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Thanks for subscribing to the ${selectedPlan} plan! We'll send confirmation to ${email}`);
    setEmail('');
    setIsSubmitting(false);
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter Crew',
      price: '$99.99',
      pax: '5–10 pax',
      perHead: 'As low as $10/head',
      description: 'Perfect for small teams, friend groups, or cozy office pods. A monthly drop of global snacks to keep the good vibes flowing.',
      emoji: '🧑‍🤝‍🧑',
      tag: null,
    },
    {
      id: 'team',
      name: 'Full Squad',
      price: '$179.99',
      pax: '10–20 pax',
      perHead: 'As low as $9/head',
      description: 'Built for growing teams and busy offices. A generous monthly haul of imported treats that disappears from the pantry in minutes.',
      emoji: '🏢',
      tag: 'BEST VALUE',
      popular: true,
    },
    {
      id: 'office',
      name: 'Office Legend',
      price: '$349.99',
      pax: '30+ pax',
      perHead: 'Bulk savings unlocked',
      description: 'Go big or go home. A massive monthly mystery box that turns your office pantry into the most talked-about spot in the building.',
      emoji: '🏆',
      tag: null,
    }
  ];

  const features = [
    { icon: '📦', title: 'Mystery Boxes', desc: 'Curated surprises delivered to your door' },
    { icon: '🌍', title: 'Global Snacks', desc: 'Treats from around the world' },
    { icon: '💰', title: 'Unbeatable Value', desc: 'Save 40-60% on retail prices' },
    { icon: '♻️', title: 'Fight Food Waste', desc: 'Near-expiry doesn\'t mean bad quality' },
    { icon: '🎁', title: 'Always Different', desc: 'New discoveries every delivery' },
    { icon: '🚚', title: 'Zero Effort', desc: 'No hunting, just unboxing joy' }
  ];

  return (
    <div className="landing-container">
      

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-items">
          <span className="float-item">🍫</span>
          <span className="float-item">🥤</span>
          <span className="float-item">🍪</span>
          <span className="float-item">🍬</span>
          <span className="float-item">🧃</span>
        </div>

        <div className="logo">Mari Makan</div>
        <h1 className="hero-title">
          DISCOVER.<br/>
          SAVE.<br/>
          SNACK.
        </h1>
        <p className="hero-subtitle">
          Monthly fun boxes of <span className="highlight">rare imported snacks</span> and drinks 
          at 40-60% off. Zero hunting. Pure discovery. Delivered to your office doorstep.
        </p>
        <a href="#pricing" className="cta-button" onClick={() => trackEvent('cta_click', { location: 'hero' })}>
          START EXPLORING
        </a>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why You'll Love It</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <p className="pricing-eyebrow">Monthly Group Delivery</p>
        <h2 className="section-title">Feed Your Whole Crew</h2>
        <p className="pricing-subtext">
          One box. Every month. Enough mystery snacks to make your office pantry the most exciting place in the building.
        </p>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">BEST VALUE</div>}
              <span className="plan-emoji">{plan.emoji}</span>
              <div className="plan-name">{plan.name}</div>
              <span className="plan-pax">{plan.pax}</span>
              <div className="plan-price-row">
                <div className="plan-price">{plan.price}</div>
                <span className="plan-period">/ month</span>
              </div>
              <div className="plan-per-head">✦ {plan.perHead}</div>
              <hr className="plan-divider" />
              <p className="plan-desc">{plan.description}</p>
              <button
                className={`select-plan-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  trackEvent('plan_selected', { plan: plan.id });
                }}
              >
                {selectedPlan === plan.id ? '✓ SELECTED' : 'SELECT PLAN'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Signup Section */}
      <section className="signup-section">
        <h2 className="section-title">Get Started Today</h2>
        <p className="hero-subtitle">
          Join the snack adventure. Your first mystery box ships within 48 hours.
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="email-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2026 Snack Mystery Box. Fighting food waste, one surprise at a time. 🌍♻️
        </p>
      </footer>
    </div>
  );
}