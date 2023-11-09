const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Must be at least 3 characters'],
        maxLength: [20, 'Must be at most 20 characters'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [3, 'Must be at least 3 characters'],
        maxLength: [20, 'Must be at most 20 characters'],
        trim: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not supported',
        },
        default: 'male',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        validate: {
            validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
            message: 'Invalid email address',
        },
    },
    phone: {
        type: String,
        default: null,
        trim: true,
        validate: {
            validator: (v) => /^\d{10}$/.test(v) || v === null,
            message: 'Invalid phone number',
        },
    },
    address: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: {
        type: String,
        validate: {
            validator: (v) => /\.(jpg|jpeg|png)$/i.test(v),
            message: 'Only .jpg, .jpeg, .png files are allowed',
        },
    },
}, {
    timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;
