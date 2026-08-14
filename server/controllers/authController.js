import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { User } from "../models/User.js";
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js'
import { sendVerificationEmail, sendWelcomeEmail, sendPaswordResetEmail, sendResetPasswordEmail } from '../utils/email.js'

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
            verificationTokenExpiresat: Date.now() + 15 * 60 * 1000  // 15mins
        })

        await user.save();
        //Jwt
        generateTokenAndCookie(res, user._id, user.role);
        // Sending verification mail
        await sendVerificationEmail(user.email, user.name, verificationToken);

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
        await sendWelcomeEmail(user.email, user.name);

        return res.status(200).json({ success: true, message: "Verification successfully" })
    } catch (error) {
        console.log("Error in Verify email", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

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

        generateTokenAndCookie(res, user._id, user.role);
        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({ success: true, message: "Login Successfully" });
    } catch (error) {
        console.log("Error in Login:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logout successfully" })
}

export const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        // Generate reset token
        const resetPasswordToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordTokenExpired = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpired = resetPasswordTokenExpired;
        await user.save();

        // Send reset password mail
        await sendPaswordResetEmail(user.email, user.name, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

        return res.status(200).json({ success: true, message: "Reset password link successfully" });
    } catch (error) {
        console.log("Error in forgot password:", error);
        return res.status(500).json({ success: true, message: error.message });
    }
}

export const ResetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpired: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpired = undefined;
        await user.save();
        // Sending success reset password mail
        await sendResetPasswordEmail(user.email, user.name);

        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("Error in reset password:", error);
        return res.status(500).json({ success: true, message: error.message });
    }
}

export const CheckAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user.Id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
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
        console.log("Error in Checkauth:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}