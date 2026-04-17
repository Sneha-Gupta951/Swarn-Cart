import React, { useState, useEffect } from 'react';

export function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/features')
      .then(res => res.json())
      .then(data => {
        setFeatures(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch features:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="features" style={{ padding:'6rem 5%', background:'var(--bg2)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,175,55,.05),transparent)', pointerEvents:'none' }}/>
      <div className="reveal" style={{ opacity:0, transform:'translateY(28px)', transition:'opacity .8s,transform .8s', marginBottom:'3.5rem' }}>
        <div style={{ fontSize:'.72rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.8rem', display:'flex', alignItems:'center', gap:'.7rem' }}>
          <span style={{ width:28, height:1, background:'var(--gold)', display:'inline-block' }}/>Why Swarn-Cart
        </div>
        <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4.5vw,3.2rem)', lineHeight:1.1 }}>
          Features Built for <span style={{ color:'var(--gold)' }}>The Future</span>
        </h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.2rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text3)' }}>Loading features...</div>
        ) : (
          features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 0.1} />
          ))
        )}
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity:0, transform:'translateY(28px)',
        transition:`opacity .8s ${delay}s, transform .8s ${delay}s`,
        padding: '1.8rem',
        background: hov ? 'rgba(255,255,255,0.07)' : 'var(--surface)',
        border: `1px solid ${hov ? feature.color + '55' : 'var(--border)'}`,
        borderRadius: 12,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: 'default',
        transform: hov ? 'translateY(-6px) scale(1.01)' : 'translateY(28px)',
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,.25), 0 0 0 1px ${feature.color}22, 0 0 40px ${feature.color}18` : 'none',
        transition: `all .4s var(--tr)`,
      }}
    >
      <div style={{
        width:48, height:48, borderRadius:10,
        background:`${feature.color}15`, border:`1px solid ${feature.color}30`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.4rem', marginBottom:'1.4rem',
      }}>{feature.icon}</div>
      <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:'1.1rem', marginBottom:'.6rem' }}>{feature.title}</div>
      <div style={{ color:'var(--text2)', fontSize:'.88rem', lineHeight:1.7, fontWeight:300 }}>{feature.desc}</div>
      <div style={{
        display:'inline-block', marginTop:'1rem',
        padding:'.2rem .75rem', borderRadius:4,
        background:`${feature.color}15`, border:`1px solid ${feature.color}30`,
        fontSize:'.68rem', letterSpacing:'.12em', textTransform:'uppercase', color:feature.color,
      }}>Active</div>
    </div>
  );
}
