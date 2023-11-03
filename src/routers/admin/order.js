const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/admin/OrderController');

router.get('/order', orderController.getAllOrders);

module.exports = router;