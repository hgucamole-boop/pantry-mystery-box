'use client';

const rarityClassMap = {
  common: 'common',
  rare: 'rare',
  legendary: 'legendary',
};

export function ReelSnackItem({ item, isTarget, unitMultiplier = 1 }) {
  const rarityTone = rarityClassMap[item.rarity] || 'common';
  const quantity = (item.multiple || 1) * unitMultiplier;
  const quantityLabel = `${Math.round(quantity)}`;
  const badgeTone = unitMultiplier >= 2 ? 'large' : unitMultiplier === 1 ? 'medium' : 'small';

  return (
    <div className={`gacha-roller-item ${isTarget ? 'target' : 'decoy'}`}>
      <div className={`gacha-roller-item-surface ${rarityTone}`}>
        <img src={item.image} alt={item.name} />
      </div>
      <span className={`gacha-roller-qty-tag ${badgeTone}`}>x{quantityLabel}</span>
    </div>
  );
}
