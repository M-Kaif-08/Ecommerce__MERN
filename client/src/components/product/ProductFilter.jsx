const categories = [
    { value: "", label: "All Products" },
    { value: "running", label: "Running" },
    { value: "training", label: "Training" },
    { value: "lifestyle", label: "Lifestyle" },
];

const ProductFilter = ({ value, onChange }) => {
    return (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-6">

            {categories.map((category) => (
                <button
                    key={category.value}
                    type="button"
                    onClick={() => onChange(category.value)}
                    className={`whitespace-nowrap rounded-full border md:px-5 px-3 md:py-3 py-2 text-sm lg:font-semibold transition ${value === category.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                        }`}
                >
                    {category.label}
                </button>
            ))}

        </div>
    );
};

export default ProductFilter;