import bcrypt from "bcryptjs";
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js'
import { User } from "../models/User.js";

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        if (user.role !== "admin") {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        generateTokenAndCookie(res, user._id, user.role);
        user.lastLogin = new Date();

        await user.save();
        return res.status(201).json({ success: true, message: "Login successfully" });
    } catch (error) {
        console.log("Error in admin login:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logout Successfully" });
}

export const CheckAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user.Id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not Found" });
        }
        return res.status(200).json({
            success: true,
            message: "User Authorized",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in checkAuth", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}