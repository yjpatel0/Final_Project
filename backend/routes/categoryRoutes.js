const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');

// Route to get all categories
router.get('/', (req, res) => {
  console.log('GET /api/categories');
  getCategories(req, res);
});

// Route to create a new category
router.post('/', (req, res) => {
  console.log('POST /api/categories');
  createCategory(req, res);
});

// Route to delete a category by id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /api/categories/${req.params.id}`);
  deleteCategory(req, res);
});

module.exports = router;
