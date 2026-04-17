import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import { API_URL } from '../data/constants';
import { ProductCard } from '../components/ProductCard'; // We'll need to export this from ProductGrid or create a new file

export default function CategoryPage({ cart, addToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate async fetching with 300ms delay as requested
    const timer = setTimeout(() => {
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
    }, 300);
    return () => clearTimeout(timer);
  }, [slug]);

  // Virtualization helper: grouping products into rows
  const ITEMS_PER_ROW = 4; // We can make this dynamic later
  const rows = useMemo(() => {
    const res = [];
    for (let i = 0; i < products.length; i += ITEMS_PER_ROW) {
      res.push(products.slice(i, i + ITEMS_PER_ROW));
    }
    return res;
  }, [products]);

  const Row = ({ index, style }) => {
    const rowItems = rows[index];
    return (
      <div style={{ ...style, display: 'flex', gap: '1.5rem', padding: '0 5% 1.5rem' }}>
        {rowItems.map(p => (
          <div key={p.id} style={{ flex: `0 0 calc((100% - ${(ITEMS_PER_ROW - 1) * 1.5}rem) / ${ITEMS_PER_ROW})` }}>
            <ProductCard 
              product={p} 
              inCart={cart.some(c => c.id === p.id)} 
              onAdd={() => addToCart(p)} 
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-fade-in" style={{ padding: '8rem 0 4rem', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ padding: '0 5%', marginBottom: '3rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--gold)',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: 0
          }}
        >
          &larr; Back to Categories
        </button>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '3rem', fontWeight: 800 }}>
          {slug} <span style={{ color: 'var(--gold)', fontSize: '1rem', verticalAlign: 'middle', marginLeft: '1rem' }}>({products.length} Items)</span>
        </h1>
      </div>

      {loading ? (
        <div style={{ padding: '0 5%', display: 'grid', gridTemplateColumns: `repeat(${ITEMS_PER_ROW}, 1fr)`, gap: '1.5rem' }}>
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <FixedSizeList
          height={800} // This should be dynamic based on viewport
          itemCount={rows.length}
          itemSize={450} // Height of each row
          width={'100%'}
        >
          {Row}
        </FixedSizeList>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      height: 400,
      background: 'var(--surface)',
      borderRadius: 16,
      border: '1px solid var(--border)',
      padding: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ height: 180, background: 'var(--bg3)', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: 24, width: '70%', background: 'var(--bg3)', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
      <div style={{ height: 16, width: '40%', background: 'var(--bg3)', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ height: 28, width: 80, background: 'var(--bg3)', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: 36, width: 100, background: 'var(--bg3)', borderRadius: 8, animation: 'pulse 1.5s infinite' }} />
      </div>
    </div>
  );
}
