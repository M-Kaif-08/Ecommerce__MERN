import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from 'motion/react'

import { getProductById } from "../services/productServices";

import { FiMinus, FiPlus, FiShoppingBag, FiLoader } from "react-icons/fi";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);

                setProduct(response);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-5 text-muted font-play text-3xl md:text-5xl">
                <div className="animate-spin text-primary"><FiLoader /></div>
                <p>Loading product</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center text-muted font-play text-3xl md:text-5xl">
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen px-5 py-28 md:px-10 lg:px-16">

            {/* Product */}
            <section className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2">

                    {/* ================= IMAGE ================= */}
                    <div>
                        <div className="overflow-hidden rounded-3xl border-4 border-border">
                            <img
                                src={product.image?.url}
                                alt={product.name}
                                className="h-125 w-full object-cover md:h-162.5"
                            />
                        </div>
                    </div>

                    {/* ================= DETAILS ================= */}
                    <div className="flex flex-col justify-center">

                        {/* Category */}
                        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted">
                            {product.category}
                        </p>

                        {/* Product Name */}
                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="mt-5 flex items-center gap-3">
                            <div className="flex gap-1 text-primary">
                                ★★★★★
                            </div>

                            <span className="text-sm text-muted">
                                4.8 (24 Reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <p className="mt-7 text-3xl font-medium">
                            Rs. {product.price.toLocaleString()}
                        </p>

                        {/* Description */}
                        <p className="mt-7 max-w-xl leading-7 text-muted">
                            {product.description}
                        </p>

                        {/* Divider */}
                        <div className="my-6 h-px bg-border" />

                        {/* Quantity */}
                        <div className="mt-8">
                            <h3 className="mb-4 text-xl font-play font-medium">
                                Quantity
                            </h3>

                            <div className="flex w-fit items-center rounded-xl border-2 border-muted">
                                <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="p-4">
                                    <FiMinus />
                                </button>
                                <span className="w-12 text-center">
                                    {quantity}
                                </span>
                                <button onClick={() => setQuantity((prev) => prev + 1)} className="p-4">
                                    <FiPlus />
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <motion.button
                                className="flex flex-1 items-center justify-center gap-3 rounded-full bg-brand-gradient px-6 py-4 font-medium text-foreground"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiShoppingBag size={20} />
                                Add to Cart
                            </motion.button>
                            <motion.button
                                className="flex-1 rounded-full border border-foreground px-6 py-4 font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Order Now
                            </motion.button>
                        </div>

                        {/* Product Information */}
                        <div className="mt-10 space-y-5 border-t border-border pt-7">
                            <div className="flex justify-between">
                                <span className="text-foreground">Category</span>
                                <span>{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground">Availability</span>
                                <span className="text-green-500">In Stock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= DESCRIPTION SECTION ================= */}

            <section className="mx-auto mt-15 max-w-7xl border-t border-border pt-16">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-foreground">Details</p>
                        <h2 className="mt-3 text-3xl font-play font-semibold">Made for every step.</h2>
                    </div>
                    <div className="md:col-span-2">
                        <p className="leading-8 text-muted">
                            Designed with comfort, durability and modern
                            style in mind. Every Stepora shoe is carefully
                            crafted to give you confidence with every step.
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default ProductDetails;