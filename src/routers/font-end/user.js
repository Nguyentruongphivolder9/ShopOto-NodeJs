const express = require('express');
const router = express.Router();
const UserController = require('../../app/controllers/font-end/UserController');


router.get('/', UserController.getAllUsers);
router.post('/login' , UserController.checkLogin);
router.post('/create' , UserController.checkRegister);



module.exports = router;