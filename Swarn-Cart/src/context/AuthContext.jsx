import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('swarn_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('swarn_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swarn_user');
  };

  const updateAddresses = (newAddresses) => {
    setUser(prev => {
      const updated = { ...prev, addresses: newAddresses };
      localStorage.setItem('swarn_user', JSON.stringify(updated));
      return updated;
    });
  };

  const updateWishlist = (newWishlist) => {
    setUser(prev => {
      const updated = { ...prev, wishlist: newWishlist };
      localStorage.setItem('swarn_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAddresses, updateWishlist, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
