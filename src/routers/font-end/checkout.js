const express = require('express');
const router = express.Router();
const checkoutController = require('../../app/controllers/font-end/CheckoutController');

router.get('/', checkoutController.checkout);

module.exports = router;