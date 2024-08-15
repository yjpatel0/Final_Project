const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');

// Route to get all products
router.get('/', (req, res) => {
  console.log('GET /api/products');
  getProducts(req, res);
});

// Route to get a single product by id
router.get('/:id', (req, res) => {
  console.log(`GET /api/products/${req.params.id}`);
  getProductById(req, res);
});

// Route to create a new product
router.post('/', (req, res) => {
  console.log('POST /api/products');
  createProduct(req, res);
});

// Route to update a product by id
router.put('/:id', (req, res) => {
  console.log(`PUT /api/products/${req.params.id}`);
  updateProduct(req, res);
});

// Route to delete a product by id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /api/products/${req.params.id}`);
  deleteProduct(req, res);
});

module.exports = router;
