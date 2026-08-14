import { Product } from '../models/Product.js'
import cloudinary from '../config/cloudinary.js'

export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = {};

        //Search by name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Category filter
        if (category) {
            filter.category = category;
        }
        const products = await Product.find(filter);
        return res.status(200).json(products);
    } catch (error) {
        console.log("Error in Get Product", error);
        return res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in Get Product by ID", error);
        return res.status(500).json({ message: error.message });
    }
}

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

export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //Update Product Fields
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.category = category ?? product.category;
        product.stock = stock ?? product.stock;

        // If a new image is provided
        if (req.file) {
            // Delete Old image from Cloudinary
            if (product.image?.publicId) {
                await cloudinary.uploader.destroy(product.image.publicId);
            }
            //Upload new image
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "ecommerce/products" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                stream.end(req.file.buffer);
            });
            // Save new image information
            product.image.url = result.secure_url;
            product.image.publicId = result.public_id;
        }

        const updatedProduct = await product.save();
        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.log("Error in Update product", error);
        return res.status(500).json({ message: error.message });
    }
}

export const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        // Delete image from cloudinary
        if (product.image?.publicId) {
            await cloudinary.uploader.destroy(product.image.publicId);
        }
        // Delete product from Database
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in Delete Product", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}