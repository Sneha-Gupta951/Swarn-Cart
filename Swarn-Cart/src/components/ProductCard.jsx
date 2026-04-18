import React from 'react';
import { fmt } from '../utils/format';

export function ProductCard({ product, onAdd, onToggleWishlist, isLiked }) {
  return (
    <div className="reveal" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Wishlist Button */}
      {onToggleWishlist && (
        <button 
          onClick={(e) => { e.preventDefault(); onToggleWishlist(product); }}
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
      )}

      <img 
        src={product.image || `https://source.unsplash.com/featured/?${product.category.toLowerCase()},${product.name.split(' ')[0]}`} 
        alt={product.name} 
        style={{ width: '100%', height: 200, objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          fontSize: '.7rem', color: 'var(--gold)', textTransform: 'uppercase', 
          letterSpacing: '.1em', marginBottom: '.4rem', opacity: 0.8 
        }}>
          {product.category}
        </div>
        <h3 style={{ 
          fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1rem', 
          fontWeight: 700, marginBottom: '.8rem', color: '#fff',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {product.name}
        </h3>
        
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)' }}>
            {fmt(product.price)}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); onAdd(product); }}
            style={{
              background: 'var(--gold)', border: 'none', borderRadius: 8,
              padding: '.5rem 0.8rem', fontWeight: 700, cursor: 'pointer',
              fontSize: '.8rem', transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
