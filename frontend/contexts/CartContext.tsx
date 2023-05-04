import React, { createContext, useState } from 'react';
import { MenuItem } from "../interfaces/MenuItem";

interface CartContextType {
  cartItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (item: MenuItem) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<any> = ({ children }) => {
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    const randInt = Math.floor(Math.random() * (100000000));
    const newItem = { ...item, id:randInt} // generate a unique id
    setCartItems([...cartItems, newItem]);
  };
  
  const removeFromCart = (item: MenuItem) => {
    setCartItems(cartItems.filter(i => i.id !== item.id));
  };
    
  const clearCart = () =>{
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
