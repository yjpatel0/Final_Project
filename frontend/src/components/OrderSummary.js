import React from 'react';
import { useCart } from '../contexts/CartContext';

const OrderSummary = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);

  return (
    <div className="container">
      <h1 className="my-4">Order Summary</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product._id} className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          ))}
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
