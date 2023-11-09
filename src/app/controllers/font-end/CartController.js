const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

class CartController {
    async getCartUser(req, res) {
        try {
            const cart = await Cart.findOne({ user_id: "123" });
            const categories = await Category.find({});
            if (cart) {
                const productIds = cart.products.map(product => product.product_id);
                const products = await Product.find({ product_id: { $in: productIds } });

                res.render('font-end/shopping-cart', { admin: false, products,categories });
            }
        } catch (error) {
            console.log("Error: " + error);
            res.send('error');
        }
    }

    async addToCart(req, res) {
        const { id, quantity } = req.body;
        const cartUser = await Cart.findOne({ user_id: '123' });

        try {
            if (cartUser) {
                const cartItem = await Cart.findOne({ user_id: '123', "products.product_id": id });
                if (cartItem) {
                    const updateQuantity = (parseInt(cartUser.products[0].quantity, 10)) + (parseInt(quantity, 10));

                    const cartFormUpdate = {
                        products: [
                            {
                                product_id: id,
                                quantity: updateQuantity,
                            },
                        ]
                    }
                    await Cart.updateOne({ user_id: '123', "products.product_id": id }, { $set: cartFormUpdate });
                    res.send("success");
                } else {
                    const newProduct = {
                        product_id: id,
                        quantity: quantity,
                    };

                    await Cart.updateOne(
                        { user_id: '123' },
                        {
                            $push: { products: newProduct }
                        }
                    );
                    res.send("success");
                }
            } else {
                const newCart = new Cart({
                    user_id: '123',
                    products: [
                        {
                            product_id: id,
                            quantity: quantity,
                        },
                    ]
                });
                await newCart.save();
                res.send("success");
            }
        } catch (error) {
            console.log("Error: " + error);
            res.send('error');
        }
    }

    async deleteCartItem(req, res) {
        const { id } = req.params;
        try {
            await Cart.updateOne(
                { user_id: '123' },
                {
                    $pull: { products: { product_id: id } }
                }
            );
            res.redirect('back');
        } catch (error) {
            console.log("Error: " + error);
            res.send('error');
        }
    }

    async handleFormAction(req, res) {
        const { cartIds, actions } = req.body;

        try {
            switch (actions) {
                case 'delete':
                    await Cart.updateOne(
                        { user_id: '123' },
                        {
                            $pull: { products: { product_id: { $in: cartIds } } }
                        }
                    );
                    res.send("success-deleted");
                    break;
                case 'checkout':
                    req.session.cartItems = cartIds;
                    res.send("checkout");
                    break;
                default:
                    res.status(400).json({ message: 'Action is invalid!' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }
}

module.exports = new CartController;