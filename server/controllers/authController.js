import bcrypt from 'bcryptjs'
import { User } from "../models/User.js";
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js'

export const SignUp = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a user
        const user = await User.create({
            email,
            name,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresat: Date.now() + 24 * 60 * 60 * 1000  // 24hours
        })

        await user.save();
        //Jwt
        generateTokenAndCookie(res, user._id);
        // Sending verification mail


        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log("Error in signup:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const VerifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresat: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invaild or expired Verification code " })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresat = undefined;
        await user.save();

        // Sending welcome mail

        return res.status(201).json({ success: true, message: "Verification successfully" })
    } catch (error) {
        console.log("Error in Verify email", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}