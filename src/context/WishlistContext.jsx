import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    // Load from localStorage on initialization
    const savedWishlist = localStorage.getItem('cross_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Sync with localStorage on change
  useEffect(() => {
    localStorage.setItem('cross_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
