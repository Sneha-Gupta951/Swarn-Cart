import React from 'react';

export function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  const styles = {
    container: {
      padding: '1.5rem',
      background: 'var(--bg2)',
      borderRadius: 16,
      border: '1px solid var(--border)',
      marginBottom: '2rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      alignItems: 'center',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.5rem',
    },
    label: {
      fontSize: '.75rem',
      color: 'var(--text3)',
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      fontWeight: 600,
    },
    input: {
      padding: '.6rem 1rem',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      color: 'var(--text)',
      fontSize: '.9rem',
      width: 140,
      outline: 'none',
      transition: 'border-color .3s',
    }
  };

  return (
    <div className="reveal" style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
        <span style={{ fontSize: '1.2rem' }}>⚖️</span>
        <span style={{ fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Price Range</span>
      </div>
      
      <div style={styles.group}>
        <label style={styles.label}>Min (₹)</label>
        <input 
          type="number" 
          value={minPrice} 
          onChange={(e) => setMinPrice(Number(e.target.value))}
          style={styles.input}
          placeholder="0"
        />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Max (₹)</label>
        <input 
          type="number" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={styles.input}
          placeholder="100000"
        />
      </div>

      <div style={{ flex: 1 }} />
      
      <button 
        onClick={() => { setMinPrice(0); setMaxPrice(100000); }}
        style={{
          background: 'transparent', border: '1px solid rgba(212,175,55,0.3)',
          color: 'var(--gold)', padding: '.6rem 1.2rem', borderRadius: 10,
          fontSize: '.8rem', cursor: 'pointer', transition: '0.3s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.05)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        Reset Filters
      </button>
    </div>
  );
}
