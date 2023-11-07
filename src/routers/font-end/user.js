const express = require('express');
const router = express.Router();
const UserController = require('../../app/controllers/font-end/UserController');

router.post('/login' , UserController.checkLogin);
router.get('/', UserController.getAllUsers);



module.exports = router;