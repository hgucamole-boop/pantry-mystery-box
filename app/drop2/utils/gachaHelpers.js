export const ROLL_ITEM_H = 112;
export const ROLL_WINDOW_H = 340;
export const RESULT_IDX = 22;
export const ROLL_COLUMNS = 6;

export function chunkSelection(items, count = ROLL_COLUMNS) {
  return items.slice(0, count);
}

export function pickRandomSelection(items, count = ROLL_COLUMNS) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function calcValue(items, unitMultiplier) {
  return items.reduce((sum, item) => sum + item.numericValue * item.multiple * unitMultiplier, 0);
}

export function parsePrice(price) {
  if (typeof price === 'number') return price;
  const normalized = String(price || '').replace(/[^0-9.]/g, '');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function shuffleItems(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildColumns(items, count = ROLL_COLUMNS) {
  return Array.from({ length: count }, () => {
    const firstPass = shuffleItems(items);
    const secondPass = shuffleItems(items);
    return [...firstPass, ...secondPass];
  });
}

export function buildStrip(target, pool) {
  const decoys = Array.from({ length: RESULT_IDX }, () => pool[Math.floor(Math.random() * pool.length)]);
  const tailCandidates = pool.filter((item) => item.id !== target.id);
  const tail = tailCandidates.length
    ? tailCandidates[Math.floor(Math.random() * tailCandidates.length)]
    : target;
  return [...decoys, target, tail];
}
