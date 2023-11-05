const siteRouter = require('./site');
const productRouter = require('./product');
const adminRouter = require('./admin');

function routers(app) {

    app.use('/admin', adminRouter.router);
    app.use('/admin', adminRouter.order);
    app.use('/admin', adminRouter.product);
    app.use('/product', productRouter);
    app.use('/', siteRouter);
}

module.exports = routers;