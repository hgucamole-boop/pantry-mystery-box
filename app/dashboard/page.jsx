'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myDrops');
    if (saved) setDrops(JSON.parse(saved));
  }, []);

  const totalValue = drops.reduce((sum, d) => sum + d.numericValue, 0);
  const rarityCounts = drops.reduce((acc, d) => {
    acc[d.rarity] = (acc[d.rarity] || 0) + 1;
    return acc;
  }, {});

  const rarityColors = {
    COMMON: '#FF6B35',
    RARE: '#00D9FF',
    EPIC: '#7B2FBE',
    LEGENDARY: '#FFD700',
    ULTRA: '#FF2E63',
  };

  const clearDrops = () => {
    localStorage.removeItem('myDrops');
    setDrops([]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', color: '#FFF5E1', fontFamily: 'monospace', padding: '24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '56px', color: '#FFD700', margin: 0 }}>MY HAUL</h1>
        <p style={{ color: '#00D9FF' }}>{drops.length} drops opened</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto 40px' }}>
        <div style={{ background: '#1A1A2E', border: '1px solid #FFD700', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', color: '#FFD700' }}>{drops.length}</div>
          <div style={{ color: '#999' }}>Total Drops</div>
        </div>
        <div style={{ background: '#1A1A2E', border: '1px solid #00D9FF', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', color: '#00D9FF' }}>${totalValue.toFixed(2)}</div>
          <div style={{ color: '#999' }}>Total Value</div>
        </div>
        <div style={{ background: '#1A1A2E', border: '1px solid #FF2E63', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', color: '#FF2E63' }}>{rarityCounts['ULTRA'] || 0}</div>
          <div style={{ color: '#999' }}>Ultra Pulls</div>
        </div>
        <div style={{ background: '#1A1A2E', border: '1px solid #7B2FBE', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', color: '#7B2FBE' }}>{rarityCounts['LEGENDARY'] || 0}</div>
          <div style={{ color: '#999' }}>Legendaries</div>
        </div>
      </div>

      {/* Rarity breakdown */}
      {drops.length > 0 && (
        <div style={{ maxWidth: '900px', margin: '0 auto 40px', background: '#1A1A2E', padding: '20px', border: '1px solid #333' }}>
          <h3 style={{ color: '#FFD700', marginTop: 0 }}>RARITY BREAKDOWN</h3>
          {Object.entries(rarityCounts).map(([rarity, count]) => (
            <div key={rarity} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ color: rarityColors[rarity], width: '100px' }}>{rarity}</span>
              <div style={{ flex: 1, background: '#0D0D1A', height: '20px', position: 'relative' }}>
                <div style={{
                  width: `${(count / drops.length) * 100}%`,
                  height: '100%',
                  background: rarityColors[rarity],
                  opacity: 0.7
                }} />
              </div>
              <span style={{ color: '#999', width: '30px' }}>{count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Drop history */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: '#FFD700', margin: 0 }}>DROP HISTORY</h3>
          {drops.length > 0 && (
            <button onClick={clearDrops} style={{ background: 'transparent', border: '1px solid #FF2E63', color: '#FF2E63', padding: '6px 12px', cursor: 'pointer', fontFamily: 'monospace' }}>
              CLEAR ALL
            </button>
          )}
        </div>

        {drops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>
            <p style={{ fontSize: '48px' }}>📦</p>
            <p>No drops yet. Go open some cases!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '8px' }}>
            {[...drops].reverse().map((drop, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#1A1A2E', padding: '12px 16px', border: '1px solid #333' }}>
                <img src={drop.image} alt={drop.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#FFF5E1' }}>{drop.name}</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>{drop.country} · {new Date(drop.openedAt).toLocaleDateString()}</div>
                </div>
                <span style={{ color: rarityColors[drop.rarity], border: `1px solid ${rarityColors[drop.rarity]}`, padding: '2px 8px', fontSize: '12px' }}>
                  {drop.rarity}
                </span>
                <span style={{ color: '#FFD700' }}>{drop.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/drop" style={{ padding: '12px 32px', background: '#FF2E63', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          🎰 OPEN MORE DROPS
        </Link>
        <Link href="/" style={{ padding: '12px 32px', border: '1px solid #00D9FF', color: '#00D9FF', textDecoration: 'none' }}>
          🏠 HOME
        </Link>
      </div>
    </div>
  );
}