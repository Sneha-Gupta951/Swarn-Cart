import React, { useState, useMemo, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { CartShowcase } from '../components/CartShowcase';
import { Footer } from '../components/Footer';
import { BudgetOptimizer } from '../components/BudgetOptimizer';
import { PriceFilter } from '../components/PriceFilter';
import { API_URL } from '../data/constants';

import { AntiGravityCategoryGrid } from '../components/AntiGravityCategoryGrid';

export default function HomePage({ cart, wishlist, addToCart, toggleWishlist, onCartClick, products, loading, search, setSearch }) {
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
      
      <div style={{ padding: '0 5%', marginTop: '2rem' }}>
        <PriceFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        <BudgetOptimizer cart={cart} products={products} />
      </div>

      <AntiGravityCategoryGrid />

      <CartShowcase cart={cart} onCartClick={onCartClick} />
      <Footer />
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}


