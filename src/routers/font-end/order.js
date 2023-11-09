const express = require('express');
const router = express.Router();
const ordersController = require('../../app/controllers/font-end/OrdersController');

router.post('/', ordersController.createOrder);

module.exports = router;