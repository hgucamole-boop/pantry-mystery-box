'use client';

export function GachaSavingsSection({ totalValue, boxPrice, savings, savingsPct }) {
  return (
    <section className="gacha-savings">
      <div>
        <p>Total Box Value</p>
        <h4>${totalValue.toFixed(2)}</h4>
      </div>
      <div>
        <p>You Pay</p>
        <h4>${boxPrice.toFixed(2)}</h4>
      </div>
      <div>
        <p>You Save</p>
        <h4>{savings > 0 ? `${savingsPct}% OFF` : '$0.00'}</h4>
      </div>
    </section>
  );
}


