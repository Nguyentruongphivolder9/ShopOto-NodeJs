class CheckoutController {
    async checkout(req, res) {
        try {
            res.render('font-end/checkout', { admin: false });
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

module.exports = new CheckoutController;