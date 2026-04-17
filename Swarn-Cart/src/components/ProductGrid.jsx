import React from 'react';
import { fmt } from '../utils/format';

export function ProductGrid({ products, loading, onAdd, wishlist = [], onToggleWishlist }) {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
        {[1,2,3,4].map(n => (
          <div key={n} className="reveal" style={{ height: 350, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
      gap: '2rem' 
    }}>
      {products.map((p, i) => {
        const isLiked = wishlist.some(item => item.id === p.id);
        
        return (
          <div key={p.id} className="reveal" style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
          }}>
            {/* Wishlist Button */}
            <button 
              onClick={() => onToggleWishlist(p)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                border: isLiked ? '1px solid var(--rose)' : '1px solid rgba(255,255,255,0.2)',
                color: isLiked ? 'var(--rose)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: '0.3s'
              }}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>

            <img 
              src={p.image} 
              alt={p.name} 
              style={{ width: '100%', height: 260, objectFit: 'cover' }} 
            />
            
            <div style={{ padding: '1.2rem' }}>
              <div style={{ 
                fontSize: '.7rem', color: 'var(--gold)', textTransform: 'uppercase', 
                letterSpacing: '.1em', marginBottom: '.4rem', opacity: 0.8 
              }}>
                {p.category}
              </div>
              <h3 style={{ 
                fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.1rem', 
                fontWeight: 700, marginBottom: '.8rem', color: '#fff' 
              }}>
                {p.name}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold)' }}>
                  {fmt(p.price)}
                </div>
                <button 
                  onClick={() => onAdd(p)}
                  style={{
                    background: 'var(--gold)', border: 'none', borderRadius: 8,
                    padding: '.5rem 1rem', fontWeight: 700, cursor: 'pointer',
                    fontSize: '.85rem', transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
