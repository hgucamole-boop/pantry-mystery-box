'use client';

import { ReelColumn } from '@/app/drop2/components/ReelColumn';
import { ROLL_COLUMNS } from '@/app/drop2/utils/gachaHelpers';

export function GachaPreviewEngine({
  columns,
  pendingSelection,
  spinTrigger,
  onReelDone,
  isSpinning,
  settledCount,
  onGenerate,
}) {
  return (
    <section className="gacha-engine">
      <h2>Preview Generator</h2>
      <p>Take a look at this month's selection of snacks. Box size changes the quantity per snack in your final box.</p>

      <div className="gacha-rollers">
        {columns.map((col, colIdx) => (
          <ReelColumn
            key={colIdx}
            items={col}
            target={pendingSelection[colIdx]}
            reelIdx={colIdx}
            spinTrigger={spinTrigger}
            onDone={onReelDone}
            isSpinning={isSpinning}
            isSettled={settledCount > colIdx}
          />
        ))}
      </div>

      <div className="gacha-engine-actions">
        <button className="gacha-primary-btn" onClick={onGenerate} disabled={isSpinning}>
          {isSpinning ? 'Generating...' : 'Generate My Selection'}
        </button>
        <button className="gacha-secondary-btn" onClick={onGenerate} disabled={isSpinning}>
          {isSpinning ? `Settling ${settledCount}/${ROLL_COLUMNS}` : 'Preview Another Box'}
        </button>
      </div>
    </section>
  );
}



