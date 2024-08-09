// project/backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');

// Route to get all categories
router.get('/', getCategories);

// Route to create a new category
router.post('/', createCategory);

// Route to delete a category by id
router.delete('/:id', deleteCategory);

module.exports = router;
