import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API_URL } from '../data/constants';
import { useAuth } from '../context/AuthContext';

export function AuthModal({ type, onClose }) {
  const { login: setAuthUser } = useAuth();
  const [isLogin, setIsLogin] = useState(type === 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!type) return null;

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!isLogin && !formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }

    setLoading(true);
    setError('');
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      setAuthUser(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Google Authentication failed');
      
      setAuthUser(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const s = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    },
    modal: {
      width: '100%', maxWidth: 420, padding: '2.5rem',
      background: 'var(--bg2)',
      border: '1px solid var(--border)', borderRadius: 24,
      boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      position: 'relative', overflow: 'hidden',
    },
    close: {
      position: 'absolute', top: '1.2rem', right: '1.5rem',
      background: 'transparent', border: 'none', color: 'var(--text2)',
      fontSize: '1.5rem', cursor: 'pointer', transition: 'color .3s',
    },
    title: {
      fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '2rem',
      marginBottom: '.5rem', color: 'var(--text)',
    },
    subtitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '.9rem', color: 'var(--text2)',
      marginBottom: '1.5rem', fontWeight: 300,
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block', fontSize: '.8rem', color: 'var(--text2)', marginBottom: '.4rem', marginLeft: '.4rem',
    },
    input: {
      width: '100%', padding: '0.8rem 1rem', background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 12, color: 'var(--text)', fontSize: '.9rem', outline: 'none', transition: 'all 0.3s',
    },
    btn: {
      width: '100%', padding: '1rem', background: 'var(--gold)', color: '#000', border: 'none',
      borderRadius: 12, fontWeight: 700, cursor: 'pointer', marginTop: '1rem', fontSize: '.95rem',
      transition: 'transform 0.2s',
    },
    divider: {
      display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--text2)', fontSize: '.8rem',
    },
    line: { flex: 1, height: 1, background: 'var(--border)' },
    error: {
      color: '#F43F5E', fontSize: '.8rem', marginBottom: '1rem', textAlign: 'center',
      background: 'rgba(244, 63, 94, 0.1)', padding: '0.6rem', borderRadius: 8,
    },
    toggleText: {
      marginTop: '1.5rem', textAlign: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '.85rem', color: 'var(--text2)',
    },
    toggleLink: {
      color: 'var(--gold)', cursor: 'pointer', fontWeight: 600,
      textDecoration: 'underline', textUnderlineOffset: 4, marginLeft: '.4rem',
    }
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <button style={s.close} onClick={onClose}>&times;</button>
        
        <h2 style={s.title}>{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
        <p style={s.subtitle}>
          {isLogin ? 'Sign in to access your cart and account.' : 'Create an account to start shopping.'}
        </p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleEmailAuth}>
          {!isLogin && (
            <div style={s.inputGroup}>
              <label style={s.label}>Full Name</label>
              <input 
                style={s.input} type="text" placeholder="John Doe" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div style={s.inputGroup}>
            <label style={s.label}>Email Address</label>
            <input 
              style={s.input} type="email" placeholder="name@example.com" required
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <input 
              style={s.input} type="password" placeholder="••••••••" required
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={s.divider}>
          <div style={s.line}></div>
          <span style={{ padding: '0 0.8rem' }}>OR</span>
          <div style={s.line}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Authentication Failed')}
            useOneTap
            width="340"
          />
        </div>

        <div style={s.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={s.toggleLink} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </div>
      </div>
    </div>
  );
}

