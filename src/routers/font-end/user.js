const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/font-end/UserController');


router.post('/login' , userController.loginUser);
router.post('/create' , userController.createRegister);



module.exports = router;