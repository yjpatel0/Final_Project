import React from 'react';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, dispatch } = useCart();

  const handleCheckout = () => {
    alert('Checkout successful!');
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="my-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group mb-4">
            {cart.map(product => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={product._id}>
                {product.name} - ${product.price} x {product.quantity}
                <span>${product.price * product.quantity}</span>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="btn btn-success btn-block" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
