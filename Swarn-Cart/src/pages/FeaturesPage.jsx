import React, { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { API_URL } from '../data/constants';

export default function FeaturesPage() {
  const [baseFeatures, setBaseFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    fetch(`${API_URL}/features`)
      .then(res => res.json())
      .then(data => {
        setBaseFeatures(data);
      })
      .catch(err => {
        console.error('Failed to fetch features:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ── Extended features data for the dedicated page ── */
  const EXTENDED_FEATURES = [
    ...baseFeatures,
    { icon: '🔒', title: 'Secure Checkout', desc: 'End-to-end encryption with PCI-DSS compliance. Your payment data is never stored on our servers.', color: '#8B5CF6' },
    { icon: '🚀', title: 'Express Delivery', desc: 'Same-day dispatch for metro cities. Track your order in real-time from warehouse to doorstep.', color: '#F59E0B' },
    { icon: '🎁', title: 'Rewards Program', desc: 'Earn gold coins on every purchase. Redeem them for exclusive discounts and early access to sales.', color: '#EC4899' },
    { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free returns with free pickup. No questions asked — just peace of mind.', color: '#14B8A6' },
  ];

  return (
    <div className="page-fade-in">
      {/* ── Hero Banner ── */}
      <section style={{
        position: 'relative',
        padding: 'clamp(7rem, 12vw, 10rem) 5% 4rem',
        background: 'var(--bg2)',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 55% at 50% 20%, rgba(212,175,55,.08), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Floating orbs */}
        <div style={{
          position: 'absolute', top: '15%', left: '8%', width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06), transparent 70%)',
          animation: 'float 6s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%', width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05), transparent 70%)',
          animation: 'float 8s ease-in-out infinite 1s',
          pointerEvents: 'none',
        }} />

        <div style={{
          fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.7rem',
        }}>
          <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          Everything You Need
          <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
        </div>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          lineHeight: 1.1, marginBottom: '1.2rem',
        }}>
          Features Built for{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>The Future</span>
        </h1>
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(.9rem, 1.5vw, 1.1rem)',
          color: 'var(--text2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontWeight: 300,
        }}>
          Discover what makes Swarn-Cart the most innovative shopping experience.
          Every feature is designed to save you time, money, and effort.
        </p>
      </section>

      {/* ── Features Grid ── */}
      <section style={{
        padding: '4rem 5% 5rem',
        background: 'var(--bg)',
        position: 'relative',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.4rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text3)', width: '100%' }}>Loading feature set...</div>
          ) : (
            EXTENDED_FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))
          )}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section style={{
        padding: '4rem 5%',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {[
            { value: '50K+', label: 'Happy Customers', icon: '🎉' },
            { value: '99.9%', label: 'Uptime SLA', icon: '⚡' },
            { value: '< 200ms', label: 'Avg Response', icon: '🚀' },
            { value: '4.9★', label: 'User Rating', icon: '⭐' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: '1.5rem 1rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              transition: 'all .3s var(--tr)',
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '.5rem' }}>{stat.icon}</div>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                fontSize: '1.6rem', color: 'var(--gold)',
                marginBottom: '.3rem',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontSize: '.78rem',
                color: 'var(--text2)', fontWeight: 400,
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Feature Card Component ── */
function FeatureCard({ feature, index }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '2rem',
        background: hov ? 'rgba(255,255,255,0.07)' : 'var(--surface)',
        border: `1px solid ${hov ? feature.color + '55' : 'var(--border)'}`,
        borderRadius: 14,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: 'default',
        transform: hov ? 'translateY(-8px) scale(1.01)' : 'translateY(0)',
        boxShadow: hov
          ? `0 24px 60px rgba(0,0,0,.3), 0 0 0 1px ${feature.color}22, 0 0 50px ${feature.color}15`
          : '0 2px 12px rgba(0,0,0,.1)',
        transition: 'all .4s var(--tr)',
        animation: `fadeUp .6s ${index * 0.08}s both`,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: `${feature.color}15`, border: `1px solid ${feature.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', marginBottom: '1.4rem',
        transition: 'transform .3s',
        transform: hov ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
      }}>{feature.icon}</div>

      {/* Title */}
      <div style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 700,
        fontSize: '1.12rem', marginBottom: '.65rem',
        transition: 'color .3s',
        color: hov ? feature.color : 'var(--text)',
      }}>{feature.title}</div>

      {/* Description */}
      <div style={{
        color: 'var(--text2)', fontSize: '.88rem', lineHeight: 1.75, fontWeight: 300,
      }}>{feature.desc}</div>

      {/* Tag */}
      <div style={{
        display: 'inline-block', marginTop: '1.2rem',
        padding: '.25rem .85rem', borderRadius: 6,
        background: `${feature.color}15`, border: `1px solid ${feature.color}30`,
        fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase',
        color: feature.color, fontWeight: 600,
        transition: 'all .3s',
        transform: hov ? 'translateX(4px)' : 'translateX(0)',
      }}>Active</div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%',
        height: 2, borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${feature.color}40, transparent)`,
        opacity: hov ? 1 : 0,
        transition: 'opacity .4s',
      }} />
    </div>
  );
}
