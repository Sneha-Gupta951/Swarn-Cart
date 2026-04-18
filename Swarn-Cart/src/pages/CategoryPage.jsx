import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/constants';
import { ProductCard } from '../components/ProductCard';

export default function CategoryPage({ cart, wishlist, addToCart, toggleWishlist, search }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset to page 1 on category change
    
    fetch(`${API_URL}/products?category=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [slug]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const s = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '2rem',
      padding: '0 5%'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      marginTop: '4rem',
      paddingBottom: '4rem'
    },
    pageBtn: (disabled) => ({
      padding: '0.8rem 1.5rem',
      background: disabled ? 'rgba(255,255,255,0.05)' : 'var(--gold)',
      color: disabled ? 'rgba(255,255,255,0.2)' : '#000',
      border: 'none',
      borderRadius: 12,
      fontWeight: 700,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: '0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    })
  };

  return (
    <div className="page-fade-in" style={{ padding: '10rem 0 4rem', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ padding: '0 5%', marginBottom: '3rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer',
            fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: 0
          }}
        >
          &larr; Back to Home
        </button>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '3rem', fontWeight: 800 }}>
          {slug} <span style={{ color: 'var(--gold)', fontSize: '1rem', verticalAlign: 'middle', marginLeft: '1rem' }}>({products.length} Items)</span>
        </h1>
      </div>

      {loading ? (
        <div style={s.grid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: 350, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : (
        <>
          <div style={s.grid}>
            {paginatedProducts.map(p => (
              <ProductCard 
                key={p.id}
                product={p} 
                onAdd={addToCart}
                onToggleWishlist={toggleWishlist}
                isLiked={wishlist.some(w => w.id === p.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={s.pagination}>
              <button 
                disabled={currentPage === 1} 
                onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }}
                style={s.pageBtn(currentPage === 1)}
              >
                &larr; Previous
              </button>
              <span style={{ fontWeight: 600, color: 'var(--text2)' }}>
                Page <span style={{ color: '#fff' }}>{currentPage}</span> of {totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}
                style={s.pageBtn(currentPage === totalPages)}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

