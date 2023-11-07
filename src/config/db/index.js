const mongoose = require('mongoose');
const User = require('../../app/models/User');
const Cart = require('../../app/models/Cart');
const { product } = require('../../routers/admin');
const userName = 'admingroup2';
const password = 'dh175';
const databaseName = 'carDb';

async function connect() {
    try {
        await mongoose
            .connect(
                `mongodb+srv://${userName}:${password}@cluster0.vjzkd85.mongodb.net/?retryWrites=true&w=majority`,
                {
                    dbName: databaseName,
                },
            )
            .then(async () => {
                Cart.aggregate([
                    {
                        $unwind: '$products',
                    },
                    {
                        $lookup: {
                            from: 'products', // Tên của bảng Product
                            localField: 'products.product_id',
                            foreignField: 'product_id',
                            as: 'product_info',
                        },
                    },
                    {
                        $unwind: '$product_info',
                    },
                    {
                        $addFields: {
                            'products.product_info': '$product_info',
                        },
                    },
                    {
                        $lookup: {
                            from: 'categories', // Tên của bảng Category
                            localField: 'products.product_info.category_id',
                            foreignField: 'category_id',
                            as: 'products.category_info',
                        },
                    },

                    {
                        $unwind: '$products.category_info',
                    },
                    {
                        $group: {
                            _id: '$_id',
                            user_id: { $first: '$user_id' },
                            total_price: { $first: '$total_price' },
                            products: { $push: '$products' },
                        },
                    },
                ]).then((result) => {
                    console.log(result);
                    result.forEach((v) => console.log(v));
                });
            });
        console.log('Connect successfully!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
