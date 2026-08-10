import { Product } from '../models/Product.js'
import cloudinary from '../config/cloudinary.js'

export const CreateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        // Check image
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product image is required" });
        }
        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "ecommerce/products"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else
                        resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });
        // Save product in database
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });

        return res.status(201).json({ success: true, message: "Product created successfully" });
    } catch (error) {
        console.log("Error in Create product", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}