const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.get('/detail/:slug', productController.getDetailProducts);
router.get('/', productController.getAllProducts);

module.exports = router;