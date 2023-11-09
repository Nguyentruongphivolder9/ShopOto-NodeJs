const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const OrderDetail = require("../../models/OrderDetail");

class OrdersController {
    async createOrder(req, res) {
        const {
            status,
            total_price,
            fullName,
            ship_address,
            ship_phone
        } = req.body;
        const newOrderId = await generateRandomOrderId();

        const formOrder = {
            order_id: newOrderId,
            user_id: "123",
            status: status,
            total_price: total_price,
            full_name: fullName,
            ship_address: ship_address,
            ship_phone: ship_phone
        }
        try {
            const checkoutProductIds = req.session.checkoutOrder;
            if (checkoutProductIds) {

                const itemCarts = await Cart.findOne({ user_id: "123" });

                const formOrderDetail = checkoutProductIds.map(async (productId) => {
                    let product = null;

                    for (const item of itemCarts.products) {
                        if (item.product_id === productId) {
                            product = item;
                            break;
                        }
                    }

                    if (product) {
                        return {
                            order_id: newOrderId,
                            product_id: productId,
                            quantity: product.quantity,
                        };
                    }
                    return null;
                });

                await Promise.all(formOrderDetail.map(async (detail) => {
                    if (detail) {
                        return await OrderDetail.create(detail);
                    }
                    return null;
                }));

            } else {
                res.redirect("/cart");
            }
            await Order.create(formOrder);
            await Cart.updateOne(
                { user_id: '123' },
                {
                    $pull: { products: { product_id: { $in: checkoutProductIds } } }
                }
            );
            res.send("success");
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

const generateRandomOrderId = async (minLength = 6) => {
    let newOrderId = '';
    const characters = '0123456789';

    while (newOrderId.length < minLength) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newOrderId += characters[randomIndex];
    }

    const existingOrder = await Order.findOne({ order_id: newOrderId });

    if (existingOrder) {
        return generateRandomOrderId(minLength);
    }

    return newOrderId;
};

module.exports = new OrdersController;