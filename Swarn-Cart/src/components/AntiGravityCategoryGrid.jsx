import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../data/constants';

const categoryIcons = {
    'Electronics': '💻',
    'Fashion': '👔',
    'Home Decor': '🏠',
    'Books': '📚',
    'Groceries': '🍎',
    'Beauty': '💄',
    'Sports': '⚽',
    'Toys': '🧸',
    'Furniture': '🛋️',
    'Automotive': '🚗'
};

export function AntiGravityCategoryGrid() {
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

    if (loading) return (
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090E' }}>
            <div className="loader" style={{ width: 40, height: 40, border: '3px solid var(--gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
    );

    return (
        <section id="shop-by-category" style={{ 
            padding: '10rem 5%', 
            background: 'radial-gradient(circle at center, #111122 0%, #09090E 100%)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '80vh'
        }}>
            {/* Stars background */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
                {[...Array(60)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: Math.random() * 3 + 'px',
                        height: Math.random() * 3 + 'px',
                        background: '#fff',
                        borderRadius: '50%',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animation: `shimmer ${Math.random() * 3 + 2}s infinite alternate`,
                        boxShadow: '0 0 10px #fff'
                    }} />
                ))}
            </div>

            <div className="reveal" style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ 
                    fontFamily: "'Bricolage Grotesque', sans-serif", 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(to bottom, #fff 40%, var(--gold) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                }}>
                    Shop by Cosmos
                </h2>
                <div style={{ width: 60, height: 4, background: 'var(--gold)', margin: '0 auto 2rem', borderRadius: 2 }} />
                <p style={{ color: 'var(--text2)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                    Explore our curated categories floating in the digital void. Each tile defies gravity to bring you closer to premium quality.
                </p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                gap: '2.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {categories.map((cat, i) => (
                    <CategoryTile key={cat.name} category={cat} index={i} />
                ))}
            </div>

            <style>{`
                @keyframes float-ag {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-25px); }
                }
                .floating-tile {
                    animation: float-ag 5s ease-in-out infinite;
                }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.25; transform: scale(1.2); }
                }
            `}</style>
        </section>
    );
}

function CategoryTile({ category, index }) {
    const icon = categoryIcons[category.name] || '📦';
    const delay = (index % 5) * 0.7;
    const heightOffset = (index % 3) * 20;

    return (
        <Link 
            to={`/category/${encodeURIComponent(category.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-tile"
            style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(16px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                animationDelay: `${delay}s`,
                marginTop: `${heightOffset}px`,
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-40px) scale(1.08)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                const iconDiv = e.currentTarget.querySelector('.cat-icon');
                if (iconDiv) iconDiv.style.transform = 'scale(1.2) rotate(5deg)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                const iconDiv = e.currentTarget.querySelector('.cat-icon');
                if (iconDiv) iconDiv.style.transform = '';
            }}
        >
            {/* Neon Background Glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center, var(--gold) 0%, transparent 70%)`,
                opacity: 0.1,
                zIndex: -1,
                animation: 'glow-pulse 4s infinite'
            }} />

            <div className="cat-icon" style={{ 
                fontSize: '4.5rem', 
                marginBottom: '1.5rem', 
                transition: '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.2))'
            }}>
                {icon}
            </div>
            
            <span style={{ 
                color: '#fff', 
                fontWeight: 800, 
                fontSize: '1.2rem',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                letterSpacing: '0.02em',
                textAlign: 'center'
            }}>
                {category.name}
            </span>

            <div style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--gold)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.6
            }}>
                Explore &rarr;
            </div>
        </Link>
    );
}
