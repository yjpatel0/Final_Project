import React from 'react';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const { cart } = useCart();

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  };

  return (
    <div className="container">
      <h1 className="my-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cart.map(product => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">${product.price}</small>
                      <small className="text-muted">Quantity: {product.quantity}</small>
                      <small className="text-muted">Total: ${product.price * (product.quantity || 1)}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total Price: ${getTotalPrice()}</h4>
            <button className="btn btn-success">Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
