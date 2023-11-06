const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/back-end/ProductController');

router.get('/', productController.getAllProducts);

module.exports = router;