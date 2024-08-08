import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
    alert('Order placed successfully!');
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userDetails.phone}
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
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Order Summary</h2>
        <ul className="order-summary">
          {cart.map((item) => (
            <li key={item._id}>
              <div>
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-amount">
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </div>

        <button type="submit" className="checkout-button">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
