const Product = require('../models/Product');
const Category = require('../models/Category');

class SiteController {
    async home(req, res, next) {
        try {
            const products = await Product.find({});
            const categories = await Category.find({});
            console.log(products);

            res.render('font-end/home', {
                products,
                categories,
                admin: false
            });
        } catch (error) {
            next(error);
        }
    }

    checkout(req, res, next) {
        res.render('font-end/checkout', { admin: false });
    }

    login(req, res, next) {
        res.render('login', { layout: false });
    }

    admin(req, res, next) {
        res.render('back-end/index', { admin: true });
    }
}

module.exports = new SiteController;