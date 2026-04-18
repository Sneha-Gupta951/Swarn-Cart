import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, loading, onAdd, wishlist = [], onToggleWishlist }) {
  if (loading) {
    return (
      <div className="amazon-product-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {[1,2,3,4,5].map(n => (
          <div key={n} style={{ height: 350, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
    );
  }

  return (
    <div className="amazon-product-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '1.5rem' 
    }}>
      <style>{`
        .amazon-product-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 600px) {
          .amazon-product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px) {
          .amazon-product-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 1200px) {
          .amazon-product-grid { grid-template-columns: repeat(5, 1fr); }
        }
      `}</style>
      {products.map((p) => (
        <ProductCard 
          key={p.id}
          product={p} 
          onAdd={onAdd} 
          onToggleWishlist={onToggleWishlist}
          isLiked={wishlist.some(item => item.id === p.id)}
        />
      ))}
    </div>
  );
}

