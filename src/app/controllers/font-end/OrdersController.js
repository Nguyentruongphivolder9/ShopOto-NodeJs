class OrdersController {
    async createOrder(req, res) {
        try {
            res.send("oke");
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

module.exports = new OrdersController;