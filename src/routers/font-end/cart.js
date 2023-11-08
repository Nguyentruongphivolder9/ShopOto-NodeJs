const express = require('express');
const router = express.Router();
const cartController = require('../../app/controllers/font-end/CartController');

router.post('/handle-form-action', cartController.handleFormAction);
router.get('/delete/:id', cartController.deleteCartItem);
router.post('/add/:id', cartController.addToCart);
router.get('/', cartController.getCartUser);

module.exports = router;