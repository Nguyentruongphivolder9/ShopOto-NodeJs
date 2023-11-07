const express = require('express');
const router = express.Router();
const cartController = require('../../app/controllers/font-end/CartController');

router.post('/:id', cartController.addToCart);
router.get('/', cartController.getCartUser);

module.exports = router;