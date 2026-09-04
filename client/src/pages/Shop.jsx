import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import ProductSearch from "../components/product/ProductSearch";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";

import useProductStore from "../store/productStore";

const Shop = () => {

    const [searchParams] = useSearchParams();
    const { loading, fetchProduct } = useProductStore();

    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProduct(search, category);
            setProducts(data || []);
        }
        loadProducts();
    }, [search, category])


    return (
        <main className="relative overflow-hidden min-h-screen md:pt-18 pt-22">

            <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-4">
                <ProductSearch
                    value={search}
                    onChange={setSearch}
                />

                <ProductFilter
                    value={category}
                    onChange={setCategory}
                />
            </div>

            <ProductGrid
                products={products}
                loading={loading}
            />

        </main>
    )
}

export default Shop