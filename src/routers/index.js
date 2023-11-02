const siteRouter = require('./site');
const productRouter = require('./product');

function routers(app) {

    app.use('/product', productRouter);
    app.use('/', siteRouter);
}

module.exports = routers;