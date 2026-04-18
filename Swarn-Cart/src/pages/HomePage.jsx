import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CartShowcase } from '../components/CartShowcase';
import { Footer } from '../components/Footer';
import { BudgetOptimizer } from '../components/BudgetOptimizer';
import { PriceFilter } from '../components/PriceFilter';
import { ProductCard } from '../components/ProductCard';
import { API_URL } from '../data/constants';

import { AntiGravityCategoryGrid } from '../components/AntiGravityCategoryGrid';

export default function HomePage({ cart, wishlist, addToCart, toggleWishlist, onCartClick, products, loading }) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price >= minPrice &&
      p.price <= maxPrice
    );
  }, [products, search, minPrice, maxPrice]);

  return (
    <div className="page-fade-in" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Hero onCartClick={onCartClick} />
      
      <AntiGravityCategoryGrid />

      <div style={{ padding: '0 5%', marginBottom: '4rem' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto 2rem' }}>
          <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search for electronics, fashion, decor..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '1.2rem 1.2rem 1.2rem 3rem',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, color: '#fff', fontSize: '1rem', outline: 'none',
              transition: '0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(212,175,55,0.1)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; }}
          />
        </div>

        <PriceFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </div>

      <BudgetOptimizer cart={cart} products={products} />

      {/* Category Sections */}
      <div style={{ paddingBottom: '5rem' }}>
        {categories.map((cat) => {
          const catProducts = filteredProducts.filter(p => p.category === cat.name).slice(0, 6);
          if (catProducts.length === 0) return null;

          return (
            <section 
              key={cat.name} 
              id={cat.name.toLowerCase().replace(/\s+/g, '-')}
              style={{ padding: '2rem 0 4rem' }}
            >
              <div style={{ padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '2rem', fontWeight: 800 }}>
                    {cat.name}
                  </h2>
                  <div style={{ width: '40px', height: '3px', background: 'var(--gold)', marginTop: '0.5rem' }} />
                </div>
                <Link 
                  to={`/category/${encodeURIComponent(cat.name)}`} 
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  See All &rarr;
                </Link>
              </div>

              <div className="no-scrollbar" style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                overflowX: 'auto', 
                padding: '0 5% 1rem',
                scrollSnapType: 'x mandatory'
              }}>
                {catProducts.map(p => (
                  <div key={p.id} style={{ minWidth: '280px', flex: '0 0 280px', scrollSnapAlign: 'start' }}>
                    <ProductCard 
                      product={p} 
                      onAdd={addToCart} 
                      onToggleWishlist={toggleWishlist}
                      isLiked={wishlist.some(w => w.id === p.id)}
                    />
                  </div>
                ))}
                {/* Last Card as a "See All" link if there are many products */}
                <Link 
                  to={`/category/${encodeURIComponent(cat.name)}`}
                  style={{ 
                    minWidth: '200px', flex: '0 0 200px', 
                    background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', color: 'var(--gold)', gap: '1rem', transition: '0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    &rarr;
                  </div>
                  <span style={{ fontWeight: 700 }}>See All {cat.name}</span>
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <CartShowcase cart={cart} onCartClick={onCartClick} />
      <Footer />
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}


