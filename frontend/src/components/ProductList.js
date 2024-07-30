import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <Link to={`/product/${product._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
