const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/admin/ProductController');
const upload = require("../../app/middlewares/uploadFile");

router.get('/product', productController.getAllProducts);
router.get('/createProduct',productController.getFormCreate);
router.post('/createProduct',upload.array('image'),productController.createProduct);

module.exports = router;