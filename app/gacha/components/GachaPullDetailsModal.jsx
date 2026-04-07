'use client';

import { useEffect } from 'react';
import { calcValue } from '@/app/gacha/utils/gachaHelpers';

export function GachaPullDetailsModal({ pull, selectedBoxName, unitMultiplier, boxPrice, onClose }) {
  useEffect(() => {
    if (!pull) return undefined;

    function handleEscape(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [pull, onClose]);

  if (!pull) return null;

  const pullMultiplier = pull.unitMultiplier ?? unitMultiplier;
  const pullBoxPrice = pull.boxPrice ?? boxPrice;
  const pullValue = calcValue(pull.selection, pullMultiplier);
  const savedValue = pullValue - pullBoxPrice;

  return (
    <div className="gacha-modal-backdrop gacha-modal-backdrop-enter" onClick={onClose}>
      <div
        className="gacha-modal gacha-modal-enter gacha-history-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gacha-history-modal-title"
        aria-describedby="gacha-history-modal-desc"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="gacha-modal-close"
          onClick={onClose}
          aria-label="Close pull details"
        >
          ×
        </button>

        <div className="gacha-history-modal-head">
          <p className="gacha-history-modal-eyebrow">Pull Details</p>
          <h4 id="gacha-history-modal-title">
            {pull.monthLabel} - {pull.boxName || selectedBoxName}
          </h4>
        </div>

        <div className="gacha-history-modal-summary">
          <div>
            <span>Original Value</span>
            <strong>${pullValue.toFixed(2)}</strong>
          </div>
          <div>
            <span>Saved</span>
            <strong>{savedValue >= 0 ? '+' : '-'}${Math.abs(savedValue).toFixed(2)}</strong>
          </div>
        </div>

        <div className="gacha-history-modal-grid">
          {pull.selection.map((item) => {
            const totalUnits = item.multiple * pullMultiplier;
            const itemTotalValue = item.numericValue * totalUnits;

            return (
              <article key={`${pull.id}-${item.id}`} className="gacha-history-modal-item-wrap">
                <div className="gacha-card gacha-history-modal-card gacha-history-modal-card-desktop">
                  <div className="gacha-card-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="gacha-card-body">
                    <div className="gacha-card-header">
                      <span className={`gacha-rarity-badge ${item.rarity.toLowerCase()}`}>
                        {item.rarity.toLowerCase()}
                      </span>
                      <h3>{item.name}</h3>
                    </div>
                    <div className="gacha-card-meta">
                      <span>{totalUnits} units</span>
                      <strong>${itemTotalValue.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>

                <div className="gacha-history-modal-card-mobile">
                  <div className="gacha-history-modal-card-mobile-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="gacha-history-modal-card-mobile-content">
                    <div className="gacha-history-modal-card-mobile-head">
                      <h3>{item.name}</h3>
                      <span className={`gacha-rarity-badge ${item.rarity.toLowerCase()}`}>
                        {item.rarity.toLowerCase()}
                      </span>
                    </div>
                    <div className="gacha-history-modal-card-mobile-stats">
                      <div>
                        <span>Units</span>
                        <strong>{totalUnits}</strong>
                      </div>
                      <div>
                        <span>Value</span>
                        <strong>${itemTotalValue.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
