import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ── Drawer Component ──────────────────────────────────────────────────────────
function Drawer({ open, onClose, dark, setDark }) {
  const { user, logout } = useAuth();
  const navLinks = [
    { label: 'Home', icon: '✦', to: '/' },
    { label: 'Features', icon: '◈', to: '/features' },
    { label: 'Products', icon: '◎', to: '/#products' },
    { label: 'About', icon: '◇', to: '/#about' },
  ];

  const categories = ['Electronics', 'Clothing', 'Home Decor', 'Beauty', 'Footwear', 'Accessories', 'Grocery', 'Fitness'];

  const drawerStyles = {
    sectionTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '.65rem',
      fontWeight: 600,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'rgba(212,175,55,0.5)',
      padding: '0 .5rem .6rem',
    },
    rowBase: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 8,
      transition: 'all .2s',
      fontFamily: "'Poppins', sans-serif",
    },
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity .4s cubic-bezier(.4,0,.2,1)',
        }}
      />

      {/* Drawer Panel */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: 'min(320px, 86vw)', zIndex: 1001,
          background: 'rgba(9,9,14,0.97)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderRight: '1px solid rgba(212,175,55,0.18)',
          display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform .45s cubic-bezier(.4,0,.2,1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.4rem', height: 68, borderBottom: '1px solid rgba(212,175,55,0.12)', flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#D4AF37' }}>
            SWARN<span style={{ color: '#fff', fontWeight: 300 }}>-CART</span>
          </span>
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:'#D4AF37', cursor:'pointer', fontSize:'1.5rem' }}>&times;</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '1.2rem 0' }}>
          {user && (
            <div style={{ padding: '0 1.4rem 1.2rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
               <p style={{ fontSize: '.7rem', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', marginBottom: '.4rem' }}>Account</p>
               <p style={{ fontWeight: 600, color: '#fff' }}>{user.name}</p>
               <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.5)' }}>{user.email}</p>
            </div>
          )}

          <div style={{ padding: '0 1rem' }}>
            <p style={drawerStyles.sectionTitle}>Navigation</p>
            {navLinks.map(({ label, to, icon }) => (
              <Link key={label} to={to} onClick={onClose} style={{
                display:'flex', alignItems:'center', gap:'1rem', padding:'.75rem .8rem', color:'#fff', textDecoration:'none', fontSize:'.9rem'
              }}>{icon} {label}</Link>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(212,175,55,0.1)', margin: '1rem 0' }} />

          <div style={{ padding: '0 1rem' }}>
            <p style={drawerStyles.sectionTitle}>Categories</p>
            {categories.map(cat => (
              <Link key={cat} to={`/#${cat.toLowerCase()}`} onClick={onClose} style={{
                display:'block', padding:'.6rem .8rem', color:'rgba(255,255,255,0.6)', textDecoration:'none', fontSize:'.85rem'
              }}>{cat}</Link>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(212,175,55,0.1)', margin: '1rem 0' }} />

          {user && (
            <div style={{ padding: '0 1rem' }}>
              <p style={drawerStyles.sectionTitle}>Settings</p>
              <div style={{ ...drawerStyles.rowBase, padding: '.75rem .8rem', color: '#fff', fontSize: '.9rem' }}>
                ⚙️ User Settings
              </div>
              <button onClick={() => { logout(); onClose(); }} style={{
                width:'100%', padding:'.8rem', marginTop: '.5rem', background:'rgba(244,63,94,0.1)', color:'#F43F5E', border:'1px solid rgba(244,63,94,0.2)', borderRadius:8, cursor:'pointer',
                textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px'
              }}>🚪 Logout</button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export function Navbar({ dark, setDark, cartCount, wishlistCount, onCartClick, onLoginClick, onSignupClick, search, setSearch }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    const closeDropdown = () => setShowSettings(false);
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('scroll', fn);
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  const s = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 5%', backdropFilter: 'blur(24px)', background: scrolled ? 'rgba(9,9,14,0.85)' : 'rgba(9,9,14,0.4)',
      borderBottom: `1px solid ${scrolled ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.06)'}`,
      transition: 'all 0.4s',
    },
    actions: { display: 'flex', alignItems: 'center', gap: '1rem' },
    searchContainer: {
      flex: 1,
      maxWidth: 500,
      margin: '0 2rem',
      position: 'relative',
      display: window.innerWidth < 768 ? 'none' : 'block' // Simple responsive hide
    },
    searchInput: {
      width: '100%',
      padding: '.6rem 1rem .6rem 2.6rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(212,175,55,0.15)',
      borderRadius: 12,
      color: '#fff',
      fontSize: '.85rem',
      outline: 'none',
      transition: 'all 0.3s',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    },
    iconBtn: {
      position: 'relative', width: 40, height: 40, borderRadius: 8,
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.15)',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.2rem', transition: 'all 0.25s',
    },
    badge: {
      position: 'absolute', top: -4, right: -4, width: 17, height: 17,
      borderRadius: '50%', background: 'var(--gold)', color: '#000',
      fontSize: '.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    profileContainer: {
      display: 'flex', alignItems: 'center', gap: '.8rem',
      padding: '.4rem .8rem', borderRadius: 12, cursor: 'pointer',
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.1)',
      transition: 'all .3s', position: 'relative',
    },
    avatar: {
      width: 32, height: 32, borderRadius: '50%',
      border: '2px solid var(--gold)', objectFit: 'cover',
    },
    dropdown: {
      position: 'absolute', top: 'calc(100% + 12px)', right: 0,
      width: 200, background: 'rgba(15,15,20,0.98)',
      backdropFilter: 'blur(20px)', borderRadius: 12,
      border: '1px solid rgba(212,175,55,0.2)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      overflow: 'hidden', zIndex: 1000,
      animation: 'fadeSlideDown 0.3s ease-out forwards',
    },
    dropdownItem: {
      padding: '1rem', color: '#fff', fontSize: '.9rem',
      cursor: 'pointer', transition: 'background .2s',
      display: 'flex', alignItems: 'center', gap: '10px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }
  };

  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} dark={dark} setDark={setDark} />
      <nav style={s.nav}>
        <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
          <button onClick={() => setDrawerOpen(true)} style={{ background:'transparent', border:'none', cursor:'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <Link to="/" style={{ textDecoration:'none', color:'var(--gold)', fontWeight:800, fontSize:'1.4rem' }}>SWARN-CART</Link>
        </div>

        {/* Search Bar */}
        <div style={s.searchContainer}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search for electronics, fashion, decor..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          />
        </div>

        <div style={s.actions}>
          <button style={s.iconBtn} title="Wishlist">
            ❤️ {wishlistCount > 0 && <span style={s.badge}>{wishlistCount}</span>}
          </button>
          <button style={s.iconBtn} onClick={onCartClick} title="Cart">
            🛒 {cartCount > 0 && <span style={s.badge}>{cartCount}</span>}
          </button>
          
          {user ? (
            <div 
              style={s.profileContainer} 
              onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
            >
               {user.picture ? (
                 <img src={user.picture} alt={user.name} style={s.avatar} />
               ) : (
                 <div style={{ ...s.avatar, background: 'var(--gold)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                   {user.name[0]}
                 </div>
               )}
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                 <span style={{ fontSize:'.85rem', color:'#fff', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
                 <span style={{ fontSize:'.65rem', color:'rgba(255,255,255,0.5)' }}>Account</span>
               </div>
               
               {showSettings && (
                 <div style={s.dropdown}>
                    <div style={{ ...s.dropdownItem, background: 'rgba(212,175,55,0.05)' }}>
                       <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span style={{ fontSize: '.8rem', fontWeight: 700 }}>{user.name}</span>
                         <span style={{ fontSize: '.7rem', opacity: 0.6 }}>{user.email}</span>
                       </div>
                    </div>
                    <div style={s.dropdownItem} onClick={() => {/* Navigate to settings */}}>
                      ⚙️ Settings
                    </div>
                    <div 
                      style={{ ...s.dropdownItem, color: '#F43F5E', borderBottom: 'none' }} 
                      onClick={() => { logout(); setShowSettings(false); }}
                    >
                      🚪 Logout
                    </div>
                 </div>
               )}
            </div>
          ) : (
            <>
              <button onClick={onLoginClick} style={{ background:'transparent', color:'#fff', border:'none', cursor:'pointer', fontSize:'.85rem' }}>Log In</button>
              <button onClick={onSignupClick} style={{ background:'var(--gold)', color:'#000', border:'none', padding:'.5rem 1.2rem', borderRadius:6, fontWeight:700, cursor:'pointer', fontSize:'.8rem' }}>Sign Up</button>
            </>
          )}
        </div>
      </nav>
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}