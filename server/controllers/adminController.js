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

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in get all users", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in Get user by id", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (name !== undefined) {
            user.name = name;
        }
        if (email !== undefined) {
            user.email = email;
        }
        if (role !== undefined) {
            user.role = role;
        }

        await user.save();

        const userResponce = user.toObject();
        console.log(userResponce);
        delete userResponce.password;

        return res.status(200).json({ success: true, message: "User updated successfully", user: userResponce });
    } catch (error) {
        console.log("Error in Update user by Id", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in delete user by id", error);
        return res.status(500).json({ success: false, message: message.erro });
    }
}