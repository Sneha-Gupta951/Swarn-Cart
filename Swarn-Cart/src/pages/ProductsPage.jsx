import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductGrid } from '../components/ProductGrid';

export default function ProductsPage({ products, loading, cart, addToCart, wishlist, toggleWishlist }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get('category');

  const [sortBy, setSortBy] = useState('Featured');
  const [priceRange, setPriceRange] = useState('All');

  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (categoryFilter) {
      result = result.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // 2. Filter by Price Range
    if (priceRange !== 'All') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        result = result.filter(p => p.price >= min && p.price <= max);
      } else {
        // Handle "50000+" case
        result = result.filter(p => p.price >= min);
      }
    }

    // 3. Sort
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Most Discount':
        // For now, stable sort or random discount logic since data doesn't have it
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [products, categoryFilter, sortBy, priceRange]);

  const s = {
    container: {
      padding: '8rem 5% 4rem',
      background: 'var(--bg)',
      minHeight: '100vh',
    },
    header: {
      marginBottom: '2.5rem',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: 'var(--gold)',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: 0,
      marginBottom: '1.5rem',
      transition: 'all 0.2s',
    },
    title: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '1.5rem',
    },
    filterBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      alignItems: 'center',
      padding: '1.2rem',
      background: 'var(--surface)',
      borderRadius: 12,
      border: '1px solid var(--border)',
      marginBottom: '2.5rem',
    },
    select: {
      background: 'var(--bg3)',
      color: '#fff',
      border: '1px solid var(--border)',
      padding: '0.6rem 1rem',
      borderRadius: 8,
      fontSize: '0.85rem',
      outline: 'none',
      cursor: 'pointer',
    },
    label: {
      fontSize: '0.8rem',
      color: 'var(--text2)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }
  };

  return (
    <div className="page-fade-in" style={s.container}>
      <header style={s.header}>
        <button 
          onClick={() => navigate('/categories')} 
          style={s.backBtn}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
        >
          ← Back to Categories
        </button>
        <h1 style={s.title}>
          {categoryFilter || 'All Products'} 
          <span style={{ fontSize: '1.1rem', color: 'var(--text2)', marginLeft: '1rem', fontWeight: 500 }}>
            ({processedProducts.length} items found)
          </span>
        </h1>
      </header>

      <div style={s.filterBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={s.label}>Sort by:</span>
          <select 
            style={s.select} 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Discount</option>
            <option>A-Z</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginLeft: 'auto' }}>
          <span style={s.label}>Price Range:</span>
          <select 
            style={s.select} 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="0-5000">Under ₹5,000</option>
            <option value="5000-15000">₹5,000 - ₹15,000</option>
            <option value="15000-50000">₹15,000 - ₹50,000</option>
            <option value="50000-999999">Over ₹50,000</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: 400, background: 'var(--surface)', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : processedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text2)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h2>No products found in this category.</h2>
          <p>Try adjusting your filters or search criteria.</p>
        </div>
      ) : (
        <ProductGrid 
          products={processedProducts} 
          loading={loading}
          cart={cart}
          onAdd={addToCart}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      )}
    </div>
  );
}
