const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/font-end/ProductController');

router.get('/detail/:slug', productController.getDetailProducts);
router.get('/', productController.getAllProducts);

module.exports = router;