import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

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

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="my-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="row">
            {cart.map(product => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">${product.price}</small>
                      <input
                        type="number"
                        value={product.quantity || 1}
                        onChange={(e) => adjustQuantity(product, parseInt(e.target.value))}
                        min="1"
                        className="form-control w-25"
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <Link to="/checkout" className="btn btn-success btn-block">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
