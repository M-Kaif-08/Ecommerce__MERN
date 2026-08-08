import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requried: true,
        unique: true
    },
    name: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        requried: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpiresat: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpired: Date
}, { timestamps: true });

export const User = mongoose.model('User', userSchema)