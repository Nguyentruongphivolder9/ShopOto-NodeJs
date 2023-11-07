const express = require('express');
const brandRouter = express.Router();
const brandController = require('../../app/controllers/back-end/BrandController');
const upload = require("../../app/middlewares/uploadFile");

const brandUpload = upload("./src/public/img/brand");

brandRouter.get('/',brandController.getAllBrand);
brandRouter.get('/createBrand',brandController.getBrandCreate);
brandRouter.post('/createBrand',brandUpload.single('brand_img'),brandController.createBrand);
brandRouter.get('/editBrand/:id',brandController.GetBrandEdit);
brandRouter.post('/editBrand/:id',brandUpload.single('brand_img'),brandController.editBrand);

module.exports = brandRouter;