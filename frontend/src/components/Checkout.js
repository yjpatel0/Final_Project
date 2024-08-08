import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order submission here (you can add your own logic)
    console.log('Order submitted', { cart, userDetails });
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
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text">Price: ${product.price.toFixed(2)}</p>
                    <p className="card-text">Total: ${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="my-4">Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={userDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                value={userDetails.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
