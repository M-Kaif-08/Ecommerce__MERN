import { easeInOut, motion } from 'motion/react'

import ProductCards from './ProductCards';

const ProductGrid = ({ products, loading }) => {

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="overflow-hidden rounded-2xl border border-border"
                        initial={{ opacity: 0.5 }}
                        transition={{ duration: 2, ease: easeInOut, repeat: Infinity }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="aspect-square bg-light-background" />

                        <div className="space-y-3 p-4">
                            <div className="h-3 w-20 rounded bg-light-background" />
                            <div className="h-5 w-3/4 rounded bg-light-background" />
                            <div className="h-4 w-full rounded bg-light-background" />
                            <div className="h-6 w-24 rounded bg-light-background" />
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex min-h-[75vh] items-center justify-center mx-6 rounded-2xl border border-dashed border-border">
                <div className="text-center">
                    <h2 className="text-2xl font-play font-bold">
                        No products found
                    </h2>

                    <p className="mt-2 text-sm text-muted">
                        Try changing your search or category.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCards
                    key={product._id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;