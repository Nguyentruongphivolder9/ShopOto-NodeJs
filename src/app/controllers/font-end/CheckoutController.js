const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

class CheckoutController {
    async checkout(req, res, next) {
        try {
            const cartIds = req.session.cartItems;
            if (cartIds) {
                const productsFromProduct = await Product.find({ product_id: { $in: cartIds } });

                const cart = await Cart.findOne({ user_id: '123' });

                if (cart) {
                    const matchedProducts = cartIds.map((productId) => {
                        const product = cart.products.find((p) => p.product_id === productId);
                        const productInfo = productsFromProduct.find((p) => p.product_id === productId);

                        if (product && productInfo) {
                            return {
                                product_id: productId,
                                quantity: product.quantity,
                                product_name: productInfo.product_name,
                                price: productInfo.price
                            };
                        }
                        return null;
                    }).filter(Boolean);

                    const totalPrice = matchedProducts.reduce((total, product) => {
                        return total + (product.price * product.quantity);
                    }, 0);

                    req.session.checkoutOrder = cartIds;
                    res.render('font-end/checkout', { admin: false, products: matchedProducts, total: totalPrice });
                } else {
                    res.redirect("/cart");
                }
            } else {
                res.redirect("/cart");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

module.exports = new CheckoutController;