import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleRemove = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'ADJUST_QUANTITY', productId, quantity });
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link>.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <div className="quantity">
                <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
          <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
