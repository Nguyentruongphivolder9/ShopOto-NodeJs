const express = require("express");
const cateRouter = express.Router();
const CateController = require('../../app/controllers/back-end/CateController');
const upload = require("../../app/middlewares/uploadFile");

const CateUpload = upload("./src/public/img/category");

cateRouter.get('/',CateController.getAllCate);
cateRouter.get('/createCategory',CateController.getCateCreate);
cateRouter.post('/createCategory',CateUpload.single('cate_img'),CateController.createCrate);
cateRouter.get('/editCategory/:category_id',CateController.getCategoryEdit);
cateRouter.post('/editCategory/:category_id',CateUpload.single('cate_img'),CateController.editCate);
cateRouter.get('/showCategory/:category_id',CateController.showCategory);

module.exports = cateRouter;