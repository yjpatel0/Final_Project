import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const adjustQuantity = (product, quantity) => {
    dispatch({
      type: 'ADJUST_QUANTITY',
      payload: { ...product, quantity: Math.max(quantity, 1) }
    });
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="my-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">${item.price}</p>
                    <div className="input-group">
                      <button onClick={() => adjustQuantity(item, item.quantity - 1)} className="btn btn-outline-secondary">-</button>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) => adjustQuantity(item, parseInt(e.target.value))}
                        min="1"
                      />
                      <button onClick={() => adjustQuantity(item, item.quantity + 1)} className="btn btn-outline-secondary">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item)} className="btn btn-danger">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
            <Link to="/checkout" className="btn btn-primary btn-lg btn-block">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
