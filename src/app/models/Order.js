const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        order_id: { type: String, require: [true, 'order_id cannot null.'] },
        user_id: { type: String, ref: 'User' },
        status: { type: String, default: null },
        total_price: { type: String, default: 0 },
        full_name: {
            type: String,
            required: [true, 'Username is required'],
            minLength: [3, 'GTE 3 and LTE 20'], // GTE = "Greater than or equal"
            maxLength: [20, 'GTE 3 and LTE 20'],
            // in case minLength,maxLength are not working
            // validate: {
            //     validator: (v) => v.length >= 3 && v.length <= 20,
            //     message: (props) => `${props.path} have to be GTE 3 and LTE 20`,
            // },
            trim: true,
        },
        ship_address: {
            type: String,
            default: null,
        },
        ship_phone: {
            type: String,
            default: null,
            trim: true,
            validate: {
                validator: (v) => /^\d{10}$/.test(v),
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        order_date: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
