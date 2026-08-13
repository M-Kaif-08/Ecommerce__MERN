import { Order } from '../models/Order.js'
import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.Id;

        const { fullName, phone, address, city } = req.body;

        // Check shipping information
        if (!fullName || !phone || !address || !city) {
            return res.status(400).json({ success: false, message: "Please provide complete shipping information" });
        }

        // Find user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Your cart is empty" });
        }

        const orderItems = [];
        let totalPrice = 0;

        // Check every cart item 
        for (const cartItem of cart.items) {
            const product = await Product.findById(cartItem.productId)
            if (!product) {
                return res.status(400).json({ success: false, message: "One of the products in your cart no longer exists" });
            }
            // Check stock 
            if (product.stock < cartItem.quantity) {
                return res.status(400).json({ success: false, message: `${product.name} does not have enough stock` });
            }
            // Calculate item total
            const itemTotal = product.price * cartItem.quantity;
            totalPrice += itemTotal;
            // Save product snapshot
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                image: product.image?.url || ""
            });
        }
        // Create order
        const order = await Order.create({
            userId,
            items: orderItems,
            shippingAddress: {
                fullName,
                phone,
                address,
                city
            },
            totalPrice
        })

        //Reduce product stock
        for (const cartItem of cart.items) {
            await Product.findByIdAndUpdate(
                cartItem.productId,
                {
                    $inc: {
                        stock: -cartItem.quantity
                    }
                }
            );
        }

        // Clear Cart
        cart.items = [];
        await cart.save();

        return res.status(201).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        console.log("Error in Create Order", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.Id;

        // Find all the orders
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log("Error in Get My Order", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.Id;
        const { id } = req.params;

        const order = await Order.findOne({ _id: id, userId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.log("Error in Get Order by id", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}