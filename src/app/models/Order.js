const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        order_id: { type: String, require: [true, 'order_id cannot null.'] },
        user_id: { type: String, ref: 'User' },
        order_date: { type: Date, default: Date.now },
        status: { type: String, default: null },
        total_price: { type: String, default: 0 },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
