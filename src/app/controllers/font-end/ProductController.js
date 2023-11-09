const Product = require('../../models/Product');
const Category = require('../../models/Category');

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find({}).exec();
            const categories = await Category.find({});
            res.render('font-end/shop', { products,categories, admin: false });
        } catch (error) {
            next(error);
        }
    }

    async getDetailProducts(req, res, next) {
        const slug = req.params.slug;
        try {
            const product = await Product.findOne({ slug: slug });
            res.render('font-end/product-detail', { product, admin: false });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController;