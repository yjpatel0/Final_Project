import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: ''
  });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleProductChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      fetchProducts();
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      fetchCategories();
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleProductDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Admin Dashboard</h1>
      
      <h2>Products</h2>
      <form onSubmit={handleProductSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={newProduct.name} onChange={handleProductChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={newProduct.description} onChange={handleProductChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" className="form-control" id="price" name="price" value={newProduct.price} onChange={handleProductChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category" name="category" value={newProduct.category} onChange={handleProductChange} required>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>
      
      <h2 className="mt-5">Categories</h2>
      <form onSubmit={handleCategorySubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input type="text" className="form-control" id="categoryName" value={newCategory} onChange={handleCategoryChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Category</button>
      </form>

      <h3 className="mt-5">Product List</h3>
      <ul className="list-group">
        {products.map(product => (
          <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name}
            <div>
              <button onClick={() => handleProductDelete(product._id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-5">Category List</h3>
      <ul className="list-group">
        {categories.map(category => (
          <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <div>
              <button onClick={() => handleCategoryDelete(category._id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
