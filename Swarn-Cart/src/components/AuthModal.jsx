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
      animation: 'fadeUp 0.3s both',
    },
    modal: {
      width: '100%', maxWidth: 420, padding: '2.5rem',
      background: 'var(--bg2)',
      border: '1px solid var(--border)', borderRadius: 16,
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
      marginBottom: '2rem', fontWeight: 300,
    },
    error: {
      color: '#F43F5E', fontSize: '.8rem', marginBottom: '1rem', textAlign: 'center'
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
          {isLogin ? 'Sign in with your Google account to access your cart.' : 'Create an account instantly using Google.'}
        </p>

        {error && <div style={s.error}>{error}</div>}

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
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

