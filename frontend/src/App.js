import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminLogin from './components/AdminLogin'; // Updated import
import { CartProvider } from './contexts/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Updated route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
