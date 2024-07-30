import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEditProduct = ({ match, history }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const productId = match.params.id;

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:5000/api/products/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = productId ? 'put' : 'post';
    const url = productId 
      ? `http://localhost:5000/api/products/${productId}` 
      : 'http://localhost:5000/api/products';

    axios[method](url, product)
      .then(() => history.push('/admin'))
      .catch(error => console.error('Error saving product:', error));
  };

  return (
    <div>
      <h2>{productId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={product.name} 
          onChange={handleChange} 
          placeholder="Product Name" 
        />
        <input 
          type="text" 
          name="description" 
          value={product.description} 
          onChange={handleChange} 
          placeholder="Product Description" 
        />
        <input 
          type="number" 
          name="price" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Product Price" 
        />
        <button type="submit">{productId ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default AddEditProduct;
