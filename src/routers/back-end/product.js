const express = require('express');
const productRouter = express.Router();
const productController = require('../../app/controllers/back-end/ProductController');
const upload = require("../../app/middlewares/uploadFile");

const productUpload = upload("./src/public/img/product");

productRouter.get('/', productController.getAllProducts);
productRouter.get('/createProduct', productController.getFormCreate);
productRouter.post('/createProduct', productUpload.array('image'), productController.createProduct);
productRouter.get('/editProduct/:product_id', productController.getFormEdit);
productRouter.post('/editProduct/:product_id', productUpload.array('image'), productController.editProduct);
productRouter.get('/showProduct/:product_id', productController.showProduct);

module.exports = productRouter;
