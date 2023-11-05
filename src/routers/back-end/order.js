const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/back-end/OrderController');

router.get('/', orderController.getAllOrders);

module.exports = router;