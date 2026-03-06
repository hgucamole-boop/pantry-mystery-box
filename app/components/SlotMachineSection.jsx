'use client';
import { useState, useEffect, useRef } from 'react';
import { snackTypes } from '../data/snacks';

export function SlotMachineSection() {
  const [finalSnacks, setFinalSnacks] = useState([
    '🍫',
    '🥤',
    '🍪'
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const reelRefs = [useRef(null), useRef(null), useRef(null)];
  const [reelSequences, setReelSequences] = useState([
    // Initialize with fixed emoji sequences to avoid hydration mismatch
    ['🍫', '🥤', '🍪', '🍬', '🧃', '🍿', '🍬', '🥨', '🍪', '🍫', '🥤', '🍬', '🍪', '🍫', '🧃', '🍿', '🍬', '🥨', '🍪', '🍫', '🍫'],
    ['🥤', '🍪', '🍬', '🧃', '🍿', '🍬', '🥨', '🍪', '🍫', '🥤', '🍬', '🍪', '🍫', '🧃', '🍿', '🍬', '🥨', '🍪', '🍫', '🍫', '🥤'],
    ['🍪', '🍬', '🧃', '🍿', '🍬', '🥨', '🍪', '🍫', '🥤', '🍬', '🍪', '🍫', '🧃', '🍿', '🍬', '🥨', '🍪', '🍫', '🍫', '🥤', '🍪']
  ]);

  const generateReelSequence = (finalSnack) => {
    // Create a sequence of 20 random snacks + the final snack
    const sequence = [];
    for (let i = 0; i < 20; i++) {
      sequence.push(snackTypes[Math.floor(Math.random() * snackTypes.length)]);
    }
    sequence.push(finalSnack);
    return sequence;
  };

  const spinReels = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setHasSpun(false);

    // Generate final snacks for this spin
    const newFinalSnacks = [
      snackTypes[Math.floor(Math.random() * snackTypes.length)],
      snackTypes[Math.floor(Math.random() * snackTypes.length)],
      snackTypes[Math.floor(Math.random() * snackTypes.length)]
    ];

    // Create new sequences for each reel
    const newSequences = newFinalSnacks.map(snack => generateReelSequence(snack));
    setReelSequences(newSequences);

    // Start spinning each reel with different delays
    const delays = [0, 200, 400];

    delays.forEach((delay, reelIndex) => {
      setTimeout(() => {
        const reel = reelRefs[reelIndex].current;
        if (reel) {
          // Reset position first
          reel.style.transform = 'translateY(0)';
          reel.style.transition = 'none';

          // Force reflow
          reel.offsetHeight;

          // Start the spin animation
          setTimeout(() => {
            reel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            reel.style.transform = `translateY(-${20 * 60}px)`; // 20 items * 60px each
          }, 50);
        }
      }, delay);
    });

    // Stop spinning and reveal results
    setTimeout(() => {
      setIsSpinning(false);
      setFinalSnacks(newFinalSnacks);
      setHasSpun(true);
    }, 4000);
  };

  useEffect(() => {
    // Remove auto-spin to prevent hydration mismatch
    // Users can click "SPIN AGAIN" to start the first spin
  }, []);

  return (
    <section className="slot-machine">
      <div className="slot-container">
        <h2 className="slot-title">🎰 This Month's Mystery Delivery 🎰</h2>
        <p className="slot-subtitle">
          Click below to discover what's inside your mystery box!
        </p>

        <div className="slot-machine-body">
          <div className="slot-lights">
            <div className="light light-1"></div>
            <div className="light light-2"></div>
            <div className="light light-3"></div>
            <div className="light light-4"></div>
            <div className="light light-5"></div>
          </div>

          <div className="reels-container">
            {[0, 1, 2].map((reelIndex) => (
              <div key={reelIndex} className="reel">
                <div className="reel-window">
                  <div
                    ref={reelRefs[reelIndex]}
                    className="reel-strip"
                  >
                    {reelSequences[reelIndex].map((snack, itemIndex) => (
                      <div key={`${reelIndex}-${itemIndex}`} className="snack-item">
                        {snack}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="reel-overlay-top"></div>
                <div className="reel-overlay-bottom"></div>
              </div>
            ))}
          </div>

          <div className="slot-controls">
            <button
              className={`spin-button ${isSpinning ? 'spinning' : ''}`}
              onClick={spinReels}
              disabled={isSpinning}
            >
              {isSpinning ? '🎰 SPINNING...' : hasSpun ? '🎰 SPIN AGAIN' : '🎰 REVEAL MYSTERY BOX'}
            </button>
          </div>
        </div>

        {hasSpun && (
          <div className="delivery-reveal">
            <p className="reveal-text">
              ✨ Your mystery box this month includes:
            </p>
            <div className="selected-snacks">
              {finalSnacks.map((snack, index) => (
                <span key={index} className="selected-snack">
                  {snack}
                </span>
              ))}
            </div>
            <p className="plus-more">+ Many More Surprises!</p>
          </div>
        )}
      </div>
    </section>
  );
}