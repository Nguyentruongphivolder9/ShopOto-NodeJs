const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema(
    {
        order_id: { type: String, require: [true, 'order_id cannot null.'] },
        product_id: { type: String },
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
