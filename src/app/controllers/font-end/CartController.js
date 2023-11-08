const Cart = require('../../models/Cart');

class CartController {
    async getCartUser(req, res) {
        try {
            res.render('font-end/shopping-cart', { admin: false });
        } catch (error) {
            console.log("Error: " + error);
            res.send('error');
        }
    }

    async addToCart(req, res) {
        const { id } = req.params;
        try {
            console.log(id);
            res.send("success");
        } catch (error) {
            console.log("Error: " + error);
            res.send('error');
        }
    }

    async deleteCartItem(req, res) {
        const { id } = req.params;
        try {
            res.send("error");
        } catch (error) {
            console.log("Error: " + error);
            res.send('error');
        }
    }

    async handleFormAction(req, res) {
        switch (req.body.actions) {
            case 'delete':
                console.log(req.body.cartIds);
                res.send("success")
                break;
            case 'checkout':
                console.log(req.body.cartIds);
                res.send("oke")
                break;
            default:
                res.json({ message: 'Action is invalid!' })
        }
    }
}

module.exports = new CartController;