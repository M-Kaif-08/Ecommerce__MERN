import { Link } from "react-router";

const ProductCards = ({ product }) => {
    return (
        <article className="group overflow-hidden border border-border rounded-2xl">

            {/* Product Image */}
            <Link
                to={`/products/${product._id}`}
                className="block overflow-hidden"
            >
                <img
                    src={product.image?.url}
                    alt={product.name}
                    className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Product Information */}
            <div className="space-y-3 p-4">

                {/* Category */}
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {product.category}
                </p>

                {/* Product Name */}
                <Link to={`/products/${product._id}`}>
                    <h2 className="line-clamp-1 font-play text-lg font-semibold transition-colors hover:text-primary">
                        {product.name}
                    </h2>
                </Link>

                {/* Price + Cart */}
                <div className="flex items-center justify-between pt-2">

                    <span className="text-lg font-semibold">
                        Rs. {product.price.toLocaleString()}
                    </span>

                    <Link
                        to={`/products/${product._id}`}
                        className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:scale-105"
                    >
                        View
                    </Link>

                </div>

            </div>
        </article>
    );
};

export default ProductCards