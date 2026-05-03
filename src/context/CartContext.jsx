// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load from localStorage on initialization
    const savedCart = localStorage.getItem('cross_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync with localStorage on change
  useEffect(() => {
    localStorage.setItem('cross_cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };


  // ✅ NOUVEAU : Supprimer un article complètement
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ✅ NOUVEAU : Augmenter ou diminuer la quantité (+1 ou -1)
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          // Ne pas descendre en dessous de 1
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  // ✅ NOUVEAU : Vider le panier après checkout
  const clearCart = () => setCart([]);

  // Calculate total items (for Navbar)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price (for Cart Page)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    // ✅ Les 3 nouvelles fonctions exposées dans value
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}