const order = require('./order');
const site = require('./site');
const product = require('./product');
const brand = require('./brand');
const cate = require('./category')

function routersBE(app) {

    app.use('/admin/category', cate);
    app.use('/admin/brand', brand);
    app.use('/admin/product', product);
    app.use('/admin/order', order);
    app.use('/admin', site);
}

module.exports = routersBE;