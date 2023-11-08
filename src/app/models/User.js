const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    // user_id: { type: String, required: [true, 'user_id cannot be null.'] },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username should be at least 3 characters long'],
        maxLength: [20, 'Username should not exceed 20 characters'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [3, 'Password should be at least 3 characters long'],
        maxLength: [20, 'Password should not exceed 20 characters'],
        trim: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
            message: 'Invalid email address!',
        },
    },
    phone: {
        type: String,
        default: null,
        trim: true,
        validate: {
            validator: (v) => /^\d{10}$/.test(v) || v === null,
            message: 'Invalid phone number!',
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
            validator: function (v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: 'Only .jpg, .jpeg, .png files are allowed.',
        },
        // required: [true, 'Image is required'],
    },
}, {
    timestamps: true,
});

const User = model('User', UserSchema);

module.exports = User;
