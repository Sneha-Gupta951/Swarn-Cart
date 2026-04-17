import React, { useState, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { CartShowcase } from '../components/CartShowcase';
import { Footer } from '../components/Footer';
import { BudgetOptimizer } from '../components/BudgetOptimizer';
import { PriceFilter } from '../components/PriceFilter';

export default function HomePage({ cart, wishlist, addToCart, toggleWishlist, onCartClick, products, loading }) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price >= minPrice &&
      p.price <= maxPrice
    );
  }, [products, search, minPrice, maxPrice]);

  const categories = ['Electronics', 'Clothing', 'Home Decor', 'Beauty', 'Footwear', 'Accessories', 'Grocery', 'Fitness'];

  return (
    <div className="page-fade-in">
      <Hero onCartClick={onCartClick} />
      
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

      {/* Grouped Category Sections */}
      {categories.map(cat => {
        const catProducts = filteredProducts.filter(p => p.category === cat);
        if (catProducts.length === 0) return null;

        return (
          <section key={cat} id={cat.toLowerCase()} style={{ padding: '0 5% 4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.8rem', fontWeight: 800 }}>
                {cat}
              </h2>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border), transparent)' }} />
            </div>
            <ProductGrid 
              cart={cart} 
              wishlist={wishlist}
              onAdd={addToCart} 
              onToggleWishlist={toggleWishlist}
              products={catProducts} 
              loading={loading} 
            />
          </section>
        );
      })}

      <CartShowcase cart={cart} onCartClick={onCartClick} />
      <Footer />
    </div>
  );
}
