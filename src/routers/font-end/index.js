const siteRouter = require('./site');
const productRouter = require('./product');
const userRouter = require('./user');

function routersFE(app) {

    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = routersFE;