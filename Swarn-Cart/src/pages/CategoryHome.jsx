import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryHome({ products, loading }) {
  const navigate = useNavigate();

  const categoriesData = useMemo(() => {
    if (!products.length) return [];

    // Group products by category
    const grouped = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    // Create category objects
    return Object.keys(grouped).map(catName => {
      const catProducts = grouped[catName];
      const previewImages = catProducts.slice(0, 4).map(p => p.image);
      
      // Mock subcategories and badges for visual richness
      const subcategories = {
        'Electronics': 'Laptops, phones & gadgets',
        'Clothing': 'Men, women & kids fashion',
        'Home Decor': 'Furniture, lighting & storage',
        'Beauty': 'Skincare, grooming & wellness',
        'Footwear': 'Sneakers, boots & heels',
        'Accessories': 'Watches, belts & jewelry',
        'Grocery': 'Fresh food & pantry staples',
        'Fitness': 'Equipment, shoes & gear'
      };

      const badges = {
        'Electronics': 'Up to 45% off',
        'Clothing': 'Min. 40% off',
        'Home Decor': 'Revamp your home',
        'Beauty': 'Starting ₹99',
        'Footwear': 'New Arrivals',
        'Accessories': 'Luxury Picks',
        'Grocery': 'Fresh Daily',
        'Fitness': 'Up to 50% off'
      };

      return {
        name: catName,
        subtitle: subcategories[catName] || 'Explore our collection',
        badge: badges[catName] || 'Great Deals',
        count: catProducts.length,
        images: previewImages
      };
    });
  }, [products]);

  const s = {
    container: {
      padding: '8rem 5% 4rem',
      background: 'var(--bg)',
      minHeight: '100vh',
    },
    header: {
      marginBottom: '3rem',
    },
    title: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 800,
      color: '#fff',
      marginBottom: '1rem',
    },
    subtitle: {
      color: 'var(--text2)',
      fontSize: '1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem',
    },
    card: {
      background: 'var(--surface)',
      borderRadius: 12,
      padding: '1.5rem',
      border: '1px solid var(--border)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    badge: {
      background: 'var(--gold)',
      color: '#000',
      padding: '0.4rem 0.8rem',
      borderRadius: 6,
      fontSize: '0.75rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      width: 'fit-content',
      marginBottom: '1.2rem',
    },
    catName: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '0.4rem',
    },
    catSub: {
      color: 'var(--text2)',
      fontSize: '0.85rem',
      marginBottom: '1.5rem',
    },
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.8rem',
      marginBottom: '1.5rem',
    },
    image: {
      width: '100%',
      aspectRatio: '1',
      objectFit: 'cover',
      borderRadius: 8,
      background: 'var(--bg3)',
    },
    footer: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    count: {
      fontSize: '0.85rem',
      fontWeight: 700,
      color: 'var(--gold)',
    },
    link: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: 'var(--text2)',
    }
  };

  return (
    <div className="page-fade-in" style={s.container}>
      <header style={s.header}>
        <div style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Explore Collections
        </div>
        <h1 style={s.title}>Browse by <span style={{ color: 'var(--gold)' }}>Category</span></h1>
        <p style={s.subtitle}>
          Discover {categoriesData.length} categories and {products.length} handpicked products.
        </p>
      </header>

      {loading ? (
        <div style={s.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ ...s.card, height: 420, animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : (
        <div style={s.grid}>
          {categoriesData.map(cat => (
            <div 
              key={cat.name} 
              style={s.card}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={s.badge}>{cat.badge}</div>
              <h2 style={s.catName}>{cat.name}</h2>
              <p style={s.catSub}>{cat.subtitle}</p>
              
              <div style={s.imageGrid}>
                {cat.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" style={s.image} />
                ))}
                {/* Fallback if less than 4 images */}
                {[...Array(Math.max(0, 4 - cat.images.length))].map((_, idx) => (
                  <div key={`fallback-${idx}`} style={s.image} />
                ))}
              </div>

              <div style={s.footer}>
                <span style={s.count}>{cat.count} products</span>
                <span style={s.link}>See all →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
