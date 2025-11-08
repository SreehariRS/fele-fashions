const express = require('express');
const router = express.Router();
const authenticateApiKey = require('../middleware/auth');
const {
  getCategories,
  getProductsByCategory,
  saveProduct
} = require('../controllers/productController');

router.use(authenticateApiKey);

router.get('/categories', getCategories);

router.get('/list', getProductsByCategory);

router.post('/save', saveProduct);

module.exports = router;
