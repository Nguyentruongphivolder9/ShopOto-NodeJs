const siteRouter = require('./site');
const productRouter = require('./product');

function routersFE(app) {

    app.use('/product', productRouter);
    app.use('/', siteRouter);
}

module.exports = routersFE;