import React from 'react';

export function Hero({ onCartClick }) {
  return (
    <section id="home" style={{
      minHeight: '48vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 5% 2.5rem',  // 👈 top padding accounts for fixed navbar (~70px)
      overflow: 'hidden',
    }}>
      {/* Mesh BG */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[
          { w:500, h:500, t:-150, l:-100, c:'rgba(212,175,55,0.1)', d:'0s' },
          { w:350, h:350, t:'10%', r:-80, c:'rgba(99,102,241,0.08)', d:'-3s' },
        ].map((o, i) => (
          <div key={i} style={{
            position:'absolute', width:o.w, height:o.h,
            top:o.t, left:o.l, right:o.r,
            borderRadius:'50%', filter:'blur(70px)',
            background:`radial-gradient(circle,${o.c},transparent 70%)`,
            animation:`meshMove 10s ease-in-out infinite`,
            animationDelay: o.d,
          }}/>
        ))}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(212,175,55,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.03) 1px,transparent 1px)',
          backgroundSize:'64px 64px',
        }}/>
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth: 720 }}>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'.5rem',
          padding:'.25rem .85rem', border:'1px solid rgba(212,175,55,.3)',
          background:'rgba(212,175,55,.06)', borderRadius:4,
          fontSize:'.65rem', letterSpacing:'.2em', textTransform:'uppercase',
          color:'var(--gold)', marginBottom:'1rem',
          animation:'fadeUp .7s both',
        }}>
          <span style={{width:5,height:5,borderRadius:'50%',background:'var(--gold)',display:'inline-block',animation:'pulse 2s infinite'}}/>
          India's Most Premium Cart Experience
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily:"'Poppins', sans-serif", fontWeight:800,
          fontSize:'clamp(2rem,5.5vw,4rem)', lineHeight:1.05,
          letterSpacing:'-.03em', marginBottom:'.6rem',
          animation:'fadeUp .7s .1s both',
        }}>
          Shop Smarter.<br/>
          <span style={{
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            backgroundImage:'linear-gradient(135deg,#D4AF37,#EDCD82,#D4AF37)',
          }}>Cart Perfected.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize:'clamp(.85rem,1.6vw,1rem)', fontWeight:300, color:'var(--text2)',
          maxWidth:480, margin:'0 auto 0',  // 👈 no bottom margin needed, stats removed
          lineHeight:1.7,
          animation:'fadeUp .7s .2s both',
        }}>
          Swarn-Cart delivers intelligent, real-time sync and AI-powered shopping — built for Indian commerce.
        </p>

        {/* ❌ Buttons removed */}
        {/* ❌ Stats removed */}

      </div>
    </section>
  );
}