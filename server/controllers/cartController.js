import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.Id;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        if (quantity < 1) {
            return res.status(400).json({ success: false, message: "Product quantity must be atleast 1" });
        }
        // Check whether product actually exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check whether the user Cart already exists
        const cart = await Cart.findOne({ userId });
        // If Cart does not exists, create a new cart
        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [
                    {
                        productId,
                        quantity
                    }
                ]
            });
            return res.status(201).json({ success: true, message: "Product added to cart", cart });
        }
        // Check whether product already exist in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            // if product already exist, increase its quantity
            existingItem.quantity += quantity;
        } else {
            // if product does not exist, add a new item
            cart.items.push({
                productId,
                quantity
            })
        }
        // Save updated cart
        await cart.save();
        return res.status(201).json({ success: true, message: "Product added to cart" }, cart);
    } catch (error) {
        console.log("Errot in Add to cart", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user.Id;

        // Find cart belonging to this user
        // populate() give us full product detail
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            return res.status(200).json({ success: true, message: "Cart is empty", cart: { items: [] } });
        }

        // Calculate total price
        const totalPrice = cart.items.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        return res.status(200).json({ success: true, cart, totalPrice });
    } catch (error) {
        console.log("Error in Get cart", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateItemQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.Id;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ success: false, message: "Product quantity must be atleast 1" });
        }
        // Find the user cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return req.status(404).json({ success: false, message: "Cart not found" });
        }
        // Find the product in the cart
        const item = cart.items.find(item => item.productId.toString() === productId);
        // If the product is not in cart
        if (!item) {
            return res.status(404).json({ success: false, message: "Product not found in the cart" });
        }

        // Update the quantity
        item.quantity = quantity;

        // Save Cart
        await cart.save();

        // Populate products information before sending responce
        await cart.populate("items.productId");

        return res.status(201).json({ success: true, message: "Cart updated successfully", cart });
    } catch (error) {
        console.log("Error in update cart", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.Id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Store current number of items in Cart
        const oldLength = cart.items.length;

        // Remove the product in the items array
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Check whether anything was actually removed
        if (cart.items.length === oldLength) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        // Save the cart
        await cart.save();

        // Populate products information before sending responce
        await cart.populate("items.productId");

        return res.status(201).json({ success: true, message: "Product removed from cart", cart });
    } catch (error) {
        console.log("Error in Remove Product in the cart bt ID", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const clearChart = async (req, res) => {
    try {
        const userId = req.user.Id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        // Remove all the product in the cart
        cart.items = [];
        await cart.save();
        return res.status(200).json({ success: true, message: "Cart clear successfully" });
    } catch (error) {
        console.log("Error in Clear Cart", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}