import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { useScrollReveal } from './hooks/useScrollReveal';
import { API_URL } from './data/constants';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import CategoryHome from './pages/CategoryHome';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
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
    if (!isAuthenticated) {
      setCart([]);
      setWishlist([]);
    } else if (user && user.wishlist) {
      // Initialize wishlist from user data on login
      const initialWishlist = products.filter(p => user.wishlist.includes(p.id));
      if (initialWishlist.length > 0 && wishlist.length === 0) {
        setWishlist(initialWishlist);
      }
    }
  }, [isAuthenticated, user, products]);

  // Sync wishlist to backend
  useEffect(() => {
    if (isAuthenticated && user && wishlist.length > 0) {
      const wishlistIds = wishlist.map(p => p.id);
      fetch(`${API_URL}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ wishlist: wishlistIds })
      }).catch(err => console.error('Failed to sync wishlist:', err));
    }
  }, [wishlist, isAuthenticated, user]);

  useEffect(() => {
    document.body.className = dark ? '' : 'light';
  }, [dark]);

  // Clear cart and wishlist on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setCart([]);
      setWishlist([]);
    }
  }, [isAuthenticated]);

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
          path="/categories" 
          element={<CategoryHome products={products} loading={loadingProducts} />} 
        />
        <Route 
          path="/products" 
          element={
            <ProductsPage 
              products={products} 
              loading={loadingProducts}
              cart={cart}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage 
              cart={cart} 
              clearCart={() => setCart([])} 
            />
          } 
        />
        <Route path="/orders" element={<OrdersPage />} />
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
