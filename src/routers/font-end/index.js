const siteRouter = require('./site');
const productRouter = require('./product');
const cartRouter = require('./cart');

function routersFE(app) {

    app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);
}

module.exports = routersFE;