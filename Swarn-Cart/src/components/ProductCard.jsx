import React, { useState } from 'react';
import { fmt } from '../utils/format';

export function ProductCard({ product, inCart, onAdd }) {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(product.liked);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div
      className="reveal is-visible"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:'1.2rem',
        background: hov ? 'var(--surface2)' : 'var(--surface)',
        border:`1px solid ${hov ? 'rgba(212,175,55,.3)' : 'var(--border)'}`,
        borderRadius:16, backdropFilter:'blur(20px)',
        transition: `background 0.4s, border 0.4s, box-shadow 0.4s, transform 0.4s`,
        position:'relative', overflow:'hidden',
        boxShadow: hov ? '0 24px 60px rgba(0,0,0,.3)' : '0 4px 12px rgba(0,0,0,.1)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        height: '100%'
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: hov ? 'radial-gradient(ellipse at top right, rgba(212,175,55,0.08), transparent 60%)' : 'none',
        transition: 'background 0.4s'
      }} />

      <button 
        onClick={toggleLike}
        style={{
          position:'absolute', top:16, left:16, zIndex:10,
          background:'rgba(0,0,0,0.3)', backdropFilter:'blur(8px)',
          border:'none', borderRadius:'50%', width:32, height:32,
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', transition:'all .3s',
          transform: hov ? 'scale(1.1)' : 'scale(1)',
          color: liked ? '#EF4444' : '#fff'
        }}
      >
        {liked ? '❤️' : '♡'}
      </button>

      <div style={{
        height:180, borderRadius:12,
        background:`linear-gradient(135deg,var(--bg3),var(--bg2))`,
        border:'1px solid var(--border)',
        marginBottom:'1.2rem', overflow:'hidden',
        position:'relative'
      }}>
        <img 
          src={product.image || `https://via.placeholder.com/300?text=${product.name}`} 
          alt={product.name} 
          loading="lazy"
          style={{
            width:'100%', height:'100%', objectFit:'cover',
            transition:'transform .6s ease',
            transform: hov ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      </div>

      <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:'1.05rem', marginBottom:'.2rem' }}>{product.name}</div>
      <div style={{ fontSize:'.72rem', letterSpacing:'.1em', textTransform:'uppercase', color:'var(--text3)', marginBottom:'.9rem' }}>{product.category}</div>
      
      <div style={{ marginTop: 'auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:'1.25rem', fontWeight:700, color:'var(--gold)' }}>{fmt(product.price)}</span>
        <button onClick={handleAdd} style={{
          padding:'.55rem 1.2rem', borderRadius:8, border:'none', cursor:'pointer',
          fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'.78rem', fontWeight:600,
          letterSpacing:'.06em', textTransform:'uppercase', transition:'all .25s',
          background: added ? 'var(--emerald,#10B981)' : inCart ? 'rgba(212,175,55,.15)' : 'var(--gold)',
          color: added ? '#fff' : inCart ? 'var(--gold)' : '#000',
          border: inCart && !added ? '1px solid rgba(212,175,55,.4)' : 'none',
        }}>
          {added ? '✓ Added' : inCart ? '+ Add More' : '+ Cart'}
        </button>
      </div>
    </div>
  );
}
