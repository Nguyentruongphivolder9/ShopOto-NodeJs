const mongoose = require('mongoose');
const User = require('../../app/models/User');

const userName = 'admingroup2';
const password = 'dh175';
const databaseName = 'carDb';
const user1 = {
    username: 'john_doe',
    password: 'password123',
    gender: 'male',
    email: 'john_doe@example.com',
    phone: '1234567890',
    addrerss: '123 Main Street',
    role: 'user',
    avatar: 'john_doe.jpg',
};

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
                const result = await User.find({});
                console.log(result);
            });
        console.log('Connect successfully!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
