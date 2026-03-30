'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ROLL_ITEM_H,
  ROLL_WINDOW_H,
  RESULT_IDX,
  buildStrip,
} from '@/app/gacha/utils/gachaHelpers';

export function ReelColumn({ items, target, reelIdx, spinTrigger, onDone, isSpinning, isSettled }) {
  const stripRef = useRef(null);
  const animRef = useRef(null);
  const [strip, setStrip] = useState([]);
  const isIdle = !isSpinning && spinTrigger === 0;

  useEffect(() => {
    if (spinTrigger === 0) {
      setStrip([...items, ...items]);
    }
  }, [items, spinTrigger]);

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
      className={`gacha-roller-window ${isSpinning && !isSettled ? 'spinning' : ''} ${isSettled ? 'settled' : ''}`.trim()}
    >
      <div className="gacha-roller-payline" />
      <div
        ref={stripRef}
        className={`gacha-roller-track ${isIdle ? 'idle' : ''}`.trim()}
        style={isIdle ? { animationDuration: `${42 + reelIdx * 4}s` } : undefined}
      >
        {strip.map((item, itemIdx) => (
          <div
            key={`${item.id}-${reelIdx}-${itemIdx}`}
            className={`gacha-roller-item ${itemIdx === RESULT_IDX ? 'target' : 'decoy'}`}
          >
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}



