const mongoose = require('mongoose');

const userName = 'admingroup2';
const password = 'dh175';
const databaseName = 'carDb';

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://${userName}:${password}@cluster0.vjzkd85.mongodb.net/?retryWrites=true&w=majority`,
            {
                dbName: databaseName,
            },
        );

        console.log('Connect successfully!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };