class ProductController {
    async getAllProducts(req, res) {
        try {
            res.render('back-end/product-listdigital', { admin: false });
        } catch (error) {
            res.render('login');
        }
    }
}

module.exports = new ProductController;