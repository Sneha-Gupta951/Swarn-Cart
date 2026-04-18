import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/constants';

export function CategoryScroll({ activeCategory }) {
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const offset = 140; // Navbar + ScrollStrip height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const s = {
    container: {
      position: 'sticky',
      top: 68,
      zIndex: 800,
      padding: '0.8rem 5%',
      display: 'flex',
      gap: '2rem',
      overflowX: 'auto',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      background: 'rgba(9,9,14,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(212,175,55,0.1)',
      alignItems: 'center'
    },
    item: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      padding: '0.4rem 0',
      borderBottom: `2px solid ${isActive ? 'var(--gold)' : 'transparent'}`,
      transition: 'all 0.3s ease',
      opacity: isActive ? 1 : 0.6,
    }),
    icon: {
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      objectFit: 'cover'
    },
    name: (isActive) => ({
      fontSize: '0.85rem',
      fontWeight: isActive ? 700 : 500,
      color: isActive ? 'var(--gold)' : '#fff',
    })
  };

  if (loading) return null;

  return (
    <div style={s.container} className="no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.name;
        return (
          <div 
            key={cat.name} 
            style={s.item(isActive)} 
            onClick={() => scrollToSection(cat.name)}
          >
            <img src={cat.coverImage} alt="" style={s.icon} />
            <span style={s.name(isActive)}>{cat.name}</span>
          </div>
        );
      })}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

