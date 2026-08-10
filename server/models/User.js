import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    verificationToken: String,
    verificationTokenExpiresat: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpired: Date
}, { timestamps: true });

export const User = mongoose.model('User', userSchema)