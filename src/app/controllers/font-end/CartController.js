class CartController {
    getCartUser(req, res) {
        try {
            res.render('font-end/shopping-cart', { admin: false });
        } catch (error) {
            res.render('login', { layout: false })
        }
    }

    async addToCart(req, res) {
        const { id } = req.params;
        try {
            res.send("success");
        } catch (error) {
            res.render('login', { layout: false })
        }
    }
}

module.exports = new CartController;