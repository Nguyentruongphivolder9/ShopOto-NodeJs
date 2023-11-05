const order = require('./order');
const product = require('./product');
const site = require('./site');

function routersBE(app) {

    app.use('/admin/product', product);
    app.use('/admin/order', order);
    app.use('/admin', site);
}

module.exports = routersBE;