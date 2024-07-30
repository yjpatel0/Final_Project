import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.find(item => item._id === action.product._id);
      if (existingProduct) {
        return state.map(item =>
          item._id === action.product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.productId);
    case 'ADJUST_QUANTITY':
      return state.map(item =>
        item._id === action.productId ? { ...item, quantity: action.quantity } : item
      );
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
