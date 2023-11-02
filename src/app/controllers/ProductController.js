const Product = require('../models/Product');

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find({}).exec();
            res.render('font-end/shop', { products });
        } catch (error) {
            next(error);
        }
    }

    async getDetailProducts(req, res, next) {
        const slug = req.params.slug;
        try {
            const product = await Product.findOne({ slug: slug });
            res.render('font-end/product-detail', { product });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController;