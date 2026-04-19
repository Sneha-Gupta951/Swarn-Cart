import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../data/constants';

export function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
        setLoading(false);
      });
  }, []);

  // UseMemo used to ensure categories are stable and could be sorted or filtered if needed
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => b.count - a.count);
  }, [categories]);

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Categories...</div>;

  return (
    <section style={{ padding: '4rem 5%', background: 'var(--bg)' }}>
      <div className="reveal" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '2.5rem', fontWeight: 800 }}>
          Shop by <span style={{ color: 'var(--gold)' }}>Category</span>
        </h2>
        <p style={{ color: 'var(--text2)', marginTop: '0.5rem' }}>Discover our premium collections</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {sortedCategories.map((cat) => (
          <CategoryCard key={cat.name} category={cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const [hov, setHov] = useState(false);

  return (
    <Link 
      to={`/products?category=${encodeURIComponent(category.name)}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: '400px',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.5s var(--tr), box-shadow 0.5s var(--tr)',
        transform: hov ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hov ? '0 30px 60px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.1)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `url(${category.coverImage}) center/cover no-repeat`,
        transition: 'transform 0.8s var(--tr)',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        zIndex: 2,
        color: '#fff'
      }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
          {category.name}
        </h3>
        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {category.count} Items
        </p>
      </div>
      
      {hov && (
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 2,
          background: 'var(--gold)',
          color: '#000',
          padding: '0.5rem 1rem',
          borderRadius: '30px',
          fontSize: '0.8rem',
          fontWeight: 700,
          animation: 'fadeUp 0.3s forwards'
        }}>
          Explore &rarr;
        </div>
      )}
    </Link>
  );
}
