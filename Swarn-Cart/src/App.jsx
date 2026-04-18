import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { useScrollReveal } from './hooks/useScrollReveal';
import { API_URL } from './data/constants';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import CategoryPage from './pages/CategoryPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/index.css';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [dark, setDark] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [search, setSearch] = useState('');
  const location = useLocation();

  useScrollReveal();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoadingProducts(false);
      });
  }, []);

  useEffect(() => {
    document.body.className = dark ? '' : 'light';
  }, [dark]);

  const addToCart = useCallback((product) => {
    if (!isAuthenticated) {
      setAuthModal('login');
      return;
    }
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }, [isAuthenticated]);

  const toggleWishlist = useCallback((product) => {
    if (!isAuthenticated) {
      setAuthModal('login');
      return;
    }
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  }, [isAuthenticated]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar 
        dark={dark} 
        setDark={setDark} 
        cartCount={cartCount} 
        wishlistCount={wishlist.length}
        onCartClick={() => setDrawerOpen(true)} 
        onLoginClick={() => setAuthModal('login')}
        onSignupClick={() => setAuthModal('signup')}
        search={search}
        setSearch={setSearch}
      />

      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <HomePage
              cart={cart}
              wishlist={wishlist}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              onCartClick={() => setDrawerOpen(true)}
              products={products}
              loading={loadingProducts}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route path="/features" element={<FeaturesPage />} />
        <Route 
          path="/category/:slug" 
          element={
            <CategoryPage 
              cart={cart} 
              wishlist={wishlist} 
              addToCart={addToCart} 
              toggleWishlist={toggleWishlist} 
              search={search}
            />
          } 
        />
      </Routes>

      <CartDrawer
        cart={cart}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onRemove={removeFromCart}
        onQtyChange={updateQty}
      />
      <AuthModal type={authModal} onClose={() => setAuthModal(null)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
