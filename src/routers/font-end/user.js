const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/font-end/UserController');

router.get('/', userController.getUsersforForm);
router.post('/login' , userController.loginUser);
router.post('/create' , userController.createRegister);
router.get('/logout', userController.logout);
router.get('/detailUser', userController.getDetailUser);




module.exports = router;