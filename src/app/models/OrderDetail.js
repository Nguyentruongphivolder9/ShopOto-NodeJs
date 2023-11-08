const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema(
    {
        order_id: { type: String, ref: 'Order' },
        product_id: { type: String, ref: 'Product' },
        quantity: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
