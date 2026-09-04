import { IoSearchOutline } from "react-icons/io5";

const ProductSearch = ({ value, onChange }) => {
    return (
        <div className="relative">

            <IoSearchOutline
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search shoes..."
                className="lg:w-100 w-80 rounded-full border border-border py-3 pl-11 pr-4 text-sm outline-none transition focus:border-foreground"
            />

        </div>
    );
};

export default ProductSearch;