class OrderController {
    async getAllOrders(req, res) {
        try {
            res.render('back-end/order', { admin: true });
        } catch (error) {
            res.render('login');
        }
    }
}

module.exports = new OrderController;