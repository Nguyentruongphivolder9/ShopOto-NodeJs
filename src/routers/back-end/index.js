const order = require('./order');
const site = require('./site');
const product = require('./product');
const brand = require('./brand');

function routersBE(app) {
    
    app.use('/admin/brand',brand);
    app.use('/admin/product', product);
    app.use('/admin/order', order);
    app.use('/admin', site);
}

module.exports = routersBE;