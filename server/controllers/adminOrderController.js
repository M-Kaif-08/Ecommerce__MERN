import { Order } from '../models/Order.js'

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("userId", "name email")
            .populate("items.productId", "name price image")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log("Error in admin Get all orders", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate("userId", "name email")
            .populate("items.productId", "name price image");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.log("Error in Admin get order my id", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

        // Check Status
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid order status" });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = status;

        await order.save();

        return res.status(200).json({ success: true, message: "Order status updated successfully", order });
    } catch (error) {
        console.log("Error in Admin update order status", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}