import React from 'react';
import { fmt } from '../utils/format';

export function CartShowcase({ cart, onCartClick }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <section id="cart" style={{ padding:'6rem 5%', background:'var(--bg3)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(212,175,55,.07),transparent)', pointerEvents:'none' }}/>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'4rem', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ flex:'1 1 380px' }}>
            <div className="reveal" style={{ opacity:0, transform:'translateY(28px)', transition:'opacity .8s,transform .8s' }}>
              <div style={{ fontSize:'.72rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.8rem', display:'flex', alignItems:'center', gap:'.7rem' }}>
                <span style={{ width:28, height:1, background:'var(--gold)', display:'inline-block' }}/>Smart Cart
              </div>
              <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', lineHeight:1.1, marginBottom:'1rem' }}>
                The Cart That <span style={{ color:'var(--gold)' }}>Thinks</span> for You
              </h2>
              <p style={{ color:'var(--text2)', fontWeight:300, lineHeight:1.75, marginBottom:'2rem', fontSize:'1rem' }}>
                Real-time price updates, intelligent quantity controls, GST breakdown, and a one-tap checkout flow — our cart is the most premium in Indian e-commerce.
              </p>
              {[
                ['⚡','Instant price recalculation on every change'],
                ['🔒','PCI DSS Level 1 secure checkout'],
                ['🎁','Auto-applied coupon detection'],
                ['📦','Smart shipping threshold tracker'],
              ].map(([ic,t]) => (
                <div key={t} style={{ display:'flex', gap:'.8rem', alignItems:'center', marginBottom:'.75rem' }}>
                  <span style={{ fontSize:'1rem' }}>{ic}</span>
                  <span style={{ color:'var(--text2)', fontSize:'.9rem', fontWeight:300 }}>{t}</span>
                </div>
              ))}
              <button onClick={onCartClick} style={{
                marginTop:'1.5rem', padding:'.9rem 2.2rem',
                background:'var(--gold)', color:'#000', border:'none',
                fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800,
                fontSize:'.85rem', letterSpacing:'.08em', textTransform:'uppercase',
                borderRadius:8, cursor:'pointer', transition:'all .3s',
                boxShadow:'0 0 30px rgba(212,175,55,.3)',
              }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >Open Cart ({cart.length} items)</button>
            </div>
          </div>

          {/* Mini Cart Preview */}
          <div className="reveal" style={{
            flex:'0 0 340px', opacity:0, transform:'translateY(28px)',
            transition:'opacity .8s .15s, transform .8s .15s',
          }}>
            <div style={{
              background:'var(--surface)', border:'1px solid var(--border-gold)',
              borderRadius:16, padding:'1.4rem', boxShadow:'0 20px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(212,175,55,.1)',
              backdropFilter:'blur(20px)',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                <div style={{ fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:700, fontSize:'1rem' }}>Cart Preview</div>
                <div style={{ padding:'.2rem .65rem', background:'rgba(212,175,55,.12)', border:'1px solid rgba(212,175,55,.25)', borderRadius:4, fontSize:'.7rem', letterSpacing:'.1em', color:'var(--gold)' }}>{cart.length} Items</div>
              </div>
              {cart.length === 0 ? (
                <div style={{ padding:'2rem', textAlign:'center', color:'var(--text3)', fontSize:'.88rem' }}>Add products to see them here</div>
              ) : (
                cart.slice(0,3).map(item => (
                  <div key={item.id} style={{ display:'flex', gap:'.8rem', alignItems:'center', padding:'.65rem 0', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ fontSize:'1.5rem' }}>{item.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'.85rem', fontWeight:500 }}>{item.name}</div>
                      <div style={{ fontSize:'.72rem', color:'var(--text3)' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, color:'var(--gold)', fontSize:'.9rem' }}>{fmt(item.price * item.qty)}</div>
                  </div>
                ))
              )}
              {cart.length > 3 && <div style={{ fontSize:'.78rem', color:'var(--text3)', textAlign:'center', padding:'.5rem' }}>+{cart.length - 3} more items</div>}
              <div style={{ marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ color:'var(--text2)', fontSize:'.88rem' }}>Subtotal</span>
                <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'1.15rem', color:'var(--gold)' }}>{fmt(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
