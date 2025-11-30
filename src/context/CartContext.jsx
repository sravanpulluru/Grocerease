import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

/**
 * CartProvider - provides cart state & helpers to the app.
 * - Persists cart to localStorage under "grocerease_cart"
 * - Each cart item shape: { id, name, price, image, qty }
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("grocerease_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("grocerease_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product, amount = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + amount } : p
        );
      }
      return [...prev, { ...product, qty: amount }];
    });
  };

  const updateQty = (productId, qty) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === productId ? { ...p, qty: Number(qty) } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + (i.qty || 0), 0);
  const totalPrice = cart.reduce((s, i) => s + (i.qty || 0) * (i.price || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/** hook for consuming the cart context */
export function useCart() {
  return useContext(CartContext);
}
