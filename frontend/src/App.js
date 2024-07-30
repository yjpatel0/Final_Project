import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import './App.css';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
