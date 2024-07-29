// project/backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');

// Route to get all products
router.get('/', getProducts);

// Route to get a single product by id
router.get('/:id', getProductById);

// Route to create a new product
router.post('/', createProduct);

// Route to update a product by id
router.put('/:id', updateProduct);

// Route to delete a product by id
router.delete('/:id', deleteProduct);

module.exports = router;
