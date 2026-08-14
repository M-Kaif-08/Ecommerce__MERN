import { User } from '../models/User.js'
import { Product } from '../models/Product.js'
import { Order } from '../models/Order.js'

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ orderStatus: "pending" });
        const deliveredOrders = await Order.countDocuments({ orderStatus: "delivered" });
        const revenueResult = await Order.aggregate([
            {
                $match: {
                    orderStatus: "delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ]);

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                totalOrders,
                pendingOrders,
                deliveredOrders,
                totalRevenue
            }
        });
    } catch (error) {
        console.log("Error in Dashboard Stats", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}