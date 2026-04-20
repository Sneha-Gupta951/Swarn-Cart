import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API_URL } from '../data/constants';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const { login: setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to process request');
      alert(`Success! ${data.message}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  const handleGoogleSuccess = async (credentialResponse) => {
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
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const s = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 20% 20%, #1a1a1a 0%, #0a0a0a 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    },
    blob: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      background: 'rgba(245, 197, 24, 0.05)',
      filter: 'blur(100px)',
      borderRadius: '50%',
      top: '-10%',
      right: '-10%',
      zIndex: 0,
    },
    card: {
      width: '100%',
      maxWidth: '450px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '32px',
      padding: '3rem',
      boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
      position: 'relative',
      zIndex: 1,
      animation: 'fadeInUp 0.8s ease-out',
    },
    title: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#fff',
      marginBottom: '0.5rem',
      textAlign: 'center',
      letterSpacing: '-1px',
    },
    subtitle: {
      color: '#a0a0a0',
      textAlign: 'center',
      marginBottom: '2.5rem',
      fontSize: '0.95rem',
      fontWeight: 300,
    },
    inputGroup: {
      marginBottom: '1.2rem',
    },
    label: {
      display: 'block',
      fontSize: '0.8rem',
      color: '#a0a0a0',
      marginBottom: '0.5rem',
      marginLeft: '0.5rem',
      fontWeight: 500,
    },
    input: {
      width: '100%',
      padding: '1rem 1.2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:focus': {
        borderColor: '#F5C518',
        background: 'rgba(255, 255, 255, 0.08)',
      }
    },
    btn: {
      width: '100%',
      padding: '1.1rem',
      background: '#F5C518',
      color: '#000',
      border: 'none',
      borderRadius: '16px',
      fontWeight: 800,
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'all 0.3s',
      boxShadow: '0 10px 20px rgba(245, 197, 24, 0.2)',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '2rem 0',
      color: '#555',
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    line: {
      flex: 1,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    error: {
      background: 'rgba(244, 63, 94, 0.1)',
      border: '1px solid rgba(244, 63, 94, 0.2)',
      color: '#F43F5E',
      padding: '0.8rem',
      borderRadius: '12px',
      fontSize: '0.85rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center',
      color: '#a0a0a0',
      fontSize: '0.9rem',
    },
    link: {
      color: '#F5C518',
      fontWeight: 700,
      textDecoration: 'none',
      marginLeft: '0.5rem',
      cursor: 'pointer',
    }
  };

  return (
    <div style={s.container}>
      <div style={s.blob}></div>
      <div style={s.card}>
        <h1 style={s.title}>{isLogin ? 'Welcome' : 'Join Us'}</h1>
        <p style={s.subtitle}>
          {isLogin ? 'Enter your details to access your account' : 'Create your premium account in seconds'}
        </p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleEmailAuth}>
          {!isLogin && (
            <div style={s.inputGroup}>
              <label style={s.label}>Full Name</label>
              <input
                style={s.input}
                type="text"
                placeholder="Sneha Gupta"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div style={s.inputGroup}>
            <label style={s.label}>Email Address</label>
            <input
              style={s.input}
              type="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            {isLogin && (
              <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                <span 
                  style={{ ...s.link, fontSize: '0.75rem', fontWeight: 500 }} 
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </span>
              </div>
            )}
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started')}
          </button>
        </form>

        <div style={s.divider}>
          <div style={s.line}></div>
          <span style={{ padding: '0 1rem' }}>or continue with</span>
          <div style={s.line}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Authentication Failed')}
            width="100%"
            theme="filled_black"
            shape="pill"
          />
        </div>

        <div style={s.footer}>
          {isLogin ? "Don't have an account?" : "Already a member?"}
          <span style={s.link} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign up for free' : 'Log in here'}
          </span>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input:focus {
          border-color: #F5C518 !important;
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 0 0 4px rgba(245, 197, 24, 0.1);
        }
        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
