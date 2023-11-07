const siteRouter = require('./site');
const productRouter = require('./product');
const userRouter = require('./user');

function routersFE(app) {

    app.use('/product', productRouter);
    app.use('/', siteRouter);
    app.use('/user', userRouter);
}

module.exports = routersFE;