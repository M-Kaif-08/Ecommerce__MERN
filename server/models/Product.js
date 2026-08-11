import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    image: {
        url: String,
        publicId: String
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);