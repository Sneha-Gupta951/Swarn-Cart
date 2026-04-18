import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fmt } from '../utils/format';

export function CartDrawer({ cart, open, onClose, onRemove, onQtyChange }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
  const shipping = subtotal > 50000 ? 0 : 199;

  const overlayStyle = {
    position:'fixed', inset:0, zIndex:950,
    background:'rgba(0,0,0,.55)', backdropFilter:'blur(4px)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none',
    transition:'opacity .35s',
  };
  const drawerStyle = {
    position:'fixed', top:0, right:0, bottom:0, zIndex:960,
    width: Math.min(440, window.innerWidth - 20),
    background:'var(--bg2)',
    borderLeft:'1px solid var(--border-gold)',
    display:'flex', flexDirection:'column',
    boxShadow: open ? '-20px 0 80px rgba(0,0,0,.5), -4px 0 0 rgba(212,175,55,.15)' : 'none',
    transform: open ? 'translateX(0)' : 'translateX(105%)',
    transition:'transform .4s cubic-bezier(.22,.61,.36,1), box-shadow .4s',
    overflowY:'auto',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}/>
      <div style={drawerStyle}>
        {/* Header */}
        <div style={{
          padding:'1.5rem 1.6rem 1.2rem', borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'var(--bg2)', position:'sticky', top:0, zIndex:1,
        }}>
          <div>
            <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'1.25rem' }}>
              Your Cart <span style={{ color:'var(--gold)' }}>({cart.length})</span>
            </div>
            {cart.length > 0 && <div style={{ fontSize:'.78rem', color:'var(--text3)', marginTop:'.2rem' }}>
              {cart.length} item{cart.length !== 1 ? 's' : ''} · {fmt(total)} total
            </div>}
          </div>
          <button onClick={onClose} style={{
            width:34, height:34, borderRadius:8, border:'1px solid var(--border)',
            background:'var(--surface)', color:'var(--text)', fontSize:'1rem',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s',
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'1rem 1.2rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign:'center', padding:'4rem 1rem' }}>
              <div style={{ fontSize:'4rem', marginBottom:'1rem', animation:'float 3s ease-in-out infinite' }}>🛒</div>
              <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:600, fontSize:'1.1rem', marginBottom:'.5rem' }}>Cart is Empty</div>
              <div style={{ color:'var(--text3)', fontSize:'.88rem' }}>Add some amazing products above!</div>
              <button onClick={onClose} style={{
                marginTop:'1.5rem', padding:'.7rem 1.8rem', background:'var(--gold)', color:'#000',
                border:'none', borderRadius:6, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600,
                fontSize:'.82rem', cursor:'pointer',
              }}>Explore Products</button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
              {cart.map((item, idx) => (
                <CartItem key={item.id} item={item} idx={idx}
                  onRemove={() => onRemove(item.id)}
                  onQtyChange={(q) => onQtyChange(item.id, q)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div style={{ borderTop:'1px solid var(--border)', padding:'1.2rem 1.6rem', background:'var(--bg2)' }}>
            {[
              ['Subtotal', fmt(subtotal)],
              ['GST (18%)', fmt(tax)],
              ['Shipping', shipping === 0 ? 'FREE 🎉' : fmt(shipping)],
            ].map(([l,v]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', marginBottom:'.55rem', fontSize:'.88rem' }}>
                <span style={{ color:'var(--text2)' }}>{l}</span>
                <span style={{ color: shipping === 0 && l==='Shipping' ? '#10B981' : 'var(--text)' }}>{v}</span>
              </div>
            ))}
            <div style={{ height:1, background:'var(--border)', margin:'.7rem 0' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.2rem' }}>
               <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:'1rem' }}>Total</span>
              <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'1.2rem', color:'var(--gold)' }}>{fmt(total + (shipping === 0 ? 0 : shipping))}</span>
            </div>
            {subtotal < 50000 && (
              <div style={{ padding:'.5rem .8rem', background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)', borderRadius:6, fontSize:'.75rem', color:'#10B981', marginBottom:'1rem' }}>
                💡 Add {fmt(50000 - subtotal)} more for FREE shipping!
              </div>
            )}
            <button 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              style={{
                width:'100%', padding:'.9rem', background:'var(--gold)', color:'#000',
                fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'.9rem',
                letterSpacing:'.06em', textTransform:'uppercase', border:'none',
                borderRadius:8, cursor:'pointer', transition:'all .3s',
                boxShadow:'0 4px 20px rgba(212,175,55,.35)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >Proceed to Checkout →</button>
            <button onClick={onClose} style={{
              width:'100%', padding:'.7rem', marginTop:'.6rem',
              background:'transparent', color:'var(--text2)',
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300, fontSize:'.82rem',
              border:'1px solid var(--border)', borderRadius:8, cursor:'pointer', transition:'all .25s',
            }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}
            >Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}

function CartItem({ item, onRemove, onQtyChange, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:'1rem', borderRadius:10,
        background: hov ? 'var(--surface2)' : 'var(--surface)',
        border:`1px solid ${hov ? 'var(--border-gold)' : 'var(--border)'}`,
        transition:'all .3s',
        animation:`itemPop .35s ${idx * 0.05}s both`,
        display:'flex', gap:'.9rem', alignItems:'flex-start',
      }}
    >
      <div style={{
        width:56, height:56, borderRadius:8,
        background:'var(--bg3)', border:'1px solid var(--border)',
        overflow:'hidden', flexShrink:0,
      }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width:'100%', height:'100%', objectFit:'cover' }} 
        />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:600, fontSize:'.9rem', marginBottom:'.1rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.name}</div>
        <div style={{ fontSize:'.72rem', color:'var(--text3)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.7rem' }}>{item.category}</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* Qty control */}
          <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
            <button onClick={() => onQtyChange(item.qty - 1)} style={{
              width:26, height:26, borderRadius:6, border:'1px solid var(--border)',
              background:'var(--surface)', color:'var(--text)', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.9rem',
              transition:'all .2s',
            }}>−</button>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:'.9rem', minWidth:20, textAlign:'center' }}>{item.qty}</span>
            <button onClick={() => onQtyChange(item.qty + 1)} style={{
              width:26, height:26, borderRadius:6, border:'1px solid var(--border)',
              background:'var(--surface)', color:'var(--text)', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.9rem',
              transition:'all .2s',
            }}>+</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'.7rem' }}>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, color:'var(--gold)', fontSize:'.95rem' }}>{fmt(item.price * item.qty)}</span>
            <button onClick={onRemove} style={{
              width:26, height:26, borderRadius:6, border:'1px solid rgba(244,63,94,.2)',
              background:'rgba(244,63,94,.07)', color:'#F43F5E', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.8rem',
              transition:'all .2s',
            }}>🗑</button>
          </div>
        </div>
      </div>
    </div>
  );
}
