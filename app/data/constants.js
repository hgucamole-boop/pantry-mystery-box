export const plans = [
  {
    id: 'starter',
    name: 'Starter Crew',
    price: '$99.99',
    pax: '5–10 pax',
    perHead: 'As low as $10/head',
    description: 'Perfect for small teams, friend groups, or cozy office pods. A monthly drop of global snacks to keep the good vibes flowing.',
    emoji: '🧑‍🤝‍🧑',
    tag: null,
    popular: false,
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
    popular: false,
  }
];

export const features = [
  { icon: '📦', title: 'Mystery Boxes', desc: 'Curated surprises delivered to your door' },
  { icon: '🌍', title: 'Global Snacks', desc: 'Treats from around the world' },
  { icon: '💰', title: 'Unbeatable Value', desc: 'Save 40-60% on retail prices' },
  { icon: '♻️', title: 'Fight Food Waste', desc: 'Near-expiry doesn\'t mean bad quality' },
  { icon: '🎁', title: 'Always Different', desc: 'New discoveries every delivery' },
  { icon: '🚚', title: 'Zero Effort', desc: 'No hunting, just unboxing joy' }
];
