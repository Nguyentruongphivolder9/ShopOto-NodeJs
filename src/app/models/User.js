const { Schema, default: mongoose } = require('mongoose');
const UserSchema = new Schema(
    {
        user_id: { type: String, require: [true, 'user_id cannot null.'] },

        username: {
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
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [3, 'GTE 3 and LTE 20'], // LTE = "Less than or equal"
            maxLength: [20, 'GTE 3 and LTE 20'],
            // in case minLength,maxLength are not working
            // validate: {
            //     validator: (v) => v.length >= 3 && v.length <= 20,
            //     message: (props) => `${props.path} have to be GTE 3 and LTE 20`,
            // },
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
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        phone: {
            type: String,
            default: null,
            trim: true,
            validate: {
                validator: (v) => /^\d{10}$/.test(v),
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        address: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: {
                values: ['user', 'admin'],
                message: '{VALUE} is not supported',
            },
            default: 'user',
        },
        avatar: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\.(jpg|jpeg|png)$/i.test(v);
                },
                message: (props) => `${props.value} allow type: jpq, jpeg, png`,
            },
            required: [true, 'Image is required'],
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
