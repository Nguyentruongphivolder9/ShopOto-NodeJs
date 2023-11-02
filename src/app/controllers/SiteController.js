const Product = require('../models/Product');
const Category = require('../models/Category');

class SiteController {
    async home(req, res, next) {
        try {
            const products = await Product.find({});
            const categories = await Category.find({});

            res.render('font-end/home', {
                products,
                categories
            });
        } catch (error) {
            next(error);
        }
    }

    checkout(req, res, next) {
        res.render('font-end/checkout');
    }
}

module.exports = new SiteController;