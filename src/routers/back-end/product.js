const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/back-end/ProductController');
const upload = require("../../app/middlewares/uploadFile");

const productUpload = upload("./src/public/img/product");

router.get('/', productController.getAllProducts);
router.get('/createProduct',productController.getFormCreate);
router.post('/createProduct',productUpload.array('image'),productController.createProduct);

module.exports = router;