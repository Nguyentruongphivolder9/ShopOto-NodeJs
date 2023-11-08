const siteRouter = require('./site');
const productRouter = require('./product');
const cartRouter = require('./cart');
const checkoutRouter = require('./checkout');
const orderRouter = require('./order');

function routersFE(app) {

    app.use('/checkout', checkoutRouter);
    app.use('/order', orderRouter);
    app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);
}

module.exports = routersFE;