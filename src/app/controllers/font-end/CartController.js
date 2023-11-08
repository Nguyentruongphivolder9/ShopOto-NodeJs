const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

class CartController {
    async getCartUser(req, res) {
        try {
            const cart = await Cart.findOne({ user_id: "123" });

            if (cart) {
                const productIds = cart.products.map(product => product.product_id);
                const products = await Product.find({ product_id: { $in: productIds } });
                console.log(productIds);

                res.render('font-end/shopping-cart', { admin: false, products });
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
        switch (actions) {
            case 'delete':
                await Cart.updateOne(
                    { user_id: '123' },
                    {
                        $pull: { products: { product_id: { $in: cartIds } } }
                    }
                );
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