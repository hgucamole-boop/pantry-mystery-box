'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import '@/styles/drop2.css';
import { snacks as SNACKS } from '@/data/products';

const BOX_PRICE = 19.99;
const ROLL_ITEM_H = 112;
const ROLL_WINDOW_H = 340;
const RESULT_IDX = 22;

function chunkSelection(items) {
  return items.slice(0, 6);
}

function pickRandomSelection(items, count = 6) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function calcValue(items) {
  return items.reduce((sum, item) => sum + item.numericValue * item.multiple, 0);
}

function buildColumns(items, count = 6) {
  return Array.from({ length: count }, (_, idx) => {
    const offset = idx % items.length;
    const rotated = [...items.slice(offset), ...items.slice(0, offset)];
    return [...rotated, ...rotated];
  });
}

function buildStrip(target, pool) {
  const decoys = Array.from({ length: RESULT_IDX }, () => pool[Math.floor(Math.random() * pool.length)]);
  const tailCandidates = pool.filter((item) => item.id !== target.id);
  const tail = tailCandidates.length
    ? tailCandidates[Math.floor(Math.random() * tailCandidates.length)]
    : target;
  return [...decoys, target, tail];
}

function ReelColumn({ items, target, reelIdx, spinTrigger, onDone, isSpinning, isSettled }) {
  const stripRef = useRef(null);
  const animRef = useRef(null);
  const [strip, setStrip] = useState([]);

  useEffect(() => {
    // Deterministic initial content before any spin.
    const fallbackTail = items.find((item) => item.id !== target.id) ?? target;
    setStrip([...items.slice(0, RESULT_IDX), target, fallbackTail]);
  }, [items, target]);

  useEffect(() => {
    if (spinTrigger === 0) return;

    const newStrip = buildStrip(target, items);
    setStrip(newStrip);

    const raf = requestAnimationFrame(() => {
      if (stripRef.current) stripRef.current.style.transform = 'translateY(0px)';

      const stopDelay = 900 + reelIdx * 420;
      const startTime = performance.now();
      let pos = 0;

      if (animRef.current) cancelAnimationFrame(animRef.current);

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / stopDelay);
        const speed = progress > 0.75
          ? ROLL_ITEM_H * 0.58 * (1 - (progress - 0.75) / 0.25) + ROLL_ITEM_H * 0.03
          : ROLL_ITEM_H * 0.58;

        pos += speed;

        const loopAt = (RESULT_IDX - 4) * ROLL_ITEM_H;
        if (pos >= loopAt) pos = pos % loopAt;

        if (elapsed >= stopDelay && speed <= ROLL_ITEM_H * 0.05) {
          if (stripRef.current) {
            const settleAt = RESULT_IDX * ROLL_ITEM_H + (ROLL_ITEM_H / 2) - (ROLL_WINDOW_H / 2);
            stripRef.current.style.transform = `translateY(-${settleAt}px)`;
          }
          onDone(reelIdx);
          return;
        }

        if (stripRef.current) stripRef.current.style.transform = `translateY(-${pos}px)`;
        animRef.current = requestAnimationFrame(tick);
      }

      animRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [spinTrigger, reelIdx, target, items, onDone]);

  return (
    <div
      className={`drop2-roller-window ${isSpinning && !isSettled ? 'spinning' : ''} ${isSettled ? 'settled' : ''}`.trim()}
    >
      <div className="drop2-roller-payline" />
      <div ref={stripRef} className="drop2-roller-track">
        {strip.map((item, itemIdx) => (
          <div
            key={`${item.id}-${reelIdx}-${itemIdx}`}
            className={`drop2-roller-item ${itemIdx === RESULT_IDX ? 'target' : 'decoy'}`}
          >
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Drop2Page() {
  const initialSelection = useMemo(() => chunkSelection(SNACKS), []);
  const [selection, setSelection] = useState(initialSelection);
  const [pendingSelection, setPendingSelection] = useState(initialSelection);
  const [isSpinning, setIsSpinning] = useState(false);
  const [settledCount, setSettledCount] = useState(0);
  const [spinTrigger, setSpinTrigger] = useState(0);

  const totalValue = calcValue(selection);
  const savings = totalValue - BOX_PRICE;
  const savingsPct = totalValue > 0 ? Math.round((savings / totalValue) * 100) : 0;
  const columns = useMemo(() => buildColumns(SNACKS, 6), []);

  const handleReelDone = useCallback((idx) => {
    setSelection((prev) => {
      const updated = [...prev];
      updated[idx] = pendingSelection[idx];
      return updated;
    });

    setSettledCount((prev) => {
      const next = prev + 1;
      if (next === 6) setIsSpinning(false);
      return next;
    });
  }, [pendingSelection]);

  const handleGenerate = () => {
    if (isSpinning) return;

    const nextSelection = pickRandomSelection(SNACKS, 6);
    setPendingSelection(nextSelection);
    setIsSpinning(true);
    setSettledCount(0);
    setSpinTrigger((prev) => prev + 1);
  };

  return (
    <div className="drop2-page">
      <nav className="drop2-nav">
        <div className="drop2-nav-inner">
          <div className="drop2-brand">Snack Preview</div>
          <div className="drop2-links">
            <a href="#">Discover</a>
            <a href="#">Boxes</a>
            <a href="/sustainability">Sustainability</a>
            <a href="#">About</a>
          </div>
          <button className="drop2-pill-btn">Get Started</button>
        </div>
      </nav>

      <main className="drop2-main">
        <header className="drop2-hero">
          <div className="drop2-hero-badge">Sustainable Discovery</div>
          <h1 className="drop2-title">
            Preview This Month&apos;s <span>Curated Selection</span>
          </h1>
          <p className="drop2-subtitle">
            Every box is a unique rescue mission. We curate premium selections from surplus inventory and rescued ingredients to fight food waste while delivering joy to your door.
          </p>
          <div className="drop2-chips">
            <span>Rescued Inventory</span>
            <span>Zero Waste Goal</span>
            <span>Premium Quality</span>
          </div>
        </header>

        <section className="drop2-engine">
          <h2>The Discovery Engine</h2>
          <p>Six rolling bars reveal a fresh, curated preview from this month&apos;s available snack inventory.</p>

          <div className="drop2-rollers">
            {columns.map((col, colIdx) => (
              <ReelColumn
                key={colIdx}
                items={col}
                target={pendingSelection[colIdx]}
                reelIdx={colIdx}
                spinTrigger={spinTrigger}
                onDone={handleReelDone}
                isSpinning={isSpinning}
                isSettled={settledCount > colIdx}
              />
            ))}
          </div>

          <div className="drop2-engine-actions">
            <button className="drop2-primary-btn" onClick={handleGenerate} disabled={isSpinning}>
              {isSpinning ? 'Generating...' : 'Generate My Selection'}
            </button>
            <button className="drop2-secondary-btn" onClick={handleGenerate} disabled={isSpinning}>
              {isSpinning ? `Settling ${settledCount}/6` : 'Preview Another Box'}
            </button>
          </div>
        </section>

        <section className="drop2-results">
          {selection.map((item) => (
            <article key={item.id} className="drop2-card">
              <div className="drop2-card-media">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="drop2-card-body">
                <h3>{item.name}</h3>
                <p>{item.country} · {item.rarity.toLowerCase()} pick</p>
                <div className="drop2-card-meta">
                  <span>{item.multiple} units</span>
                  <strong>${(item.numericValue * item.multiple).toFixed(2)}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="drop2-savings">
          <div>
            <p>Total Box Value</p>
            <h4>${totalValue.toFixed(2)}</h4>
          </div>
          <div>
            <p>You Pay</p>
            <h4>${BOX_PRICE.toFixed(2)}</h4>
          </div>
          <div>
            <p>You Save</p>
            <h4>{savings > 0 ? `${savingsPct}% OFF` : '$0.00'}</h4>
          </div>
        </section>

        <section className="drop2-trust">
          <div>
            <h5>Fighting Food Waste</h5>
            <p>Every preview reflects inventory that helps reduce unnecessary waste.</p>
          </div>
          <div>
            <h5>Affordable Discovery</h5>
            <p>Surplus sourcing keeps quality high and prices friendlier.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
