import { create } from "zustand";
import { getAllProducts } from "../services/productServices";

const useProductStore = create((set) => ({
    loading: false,
    error: null,

    fetchProduct: async (search, category) => {
        try {
            set({ loading: true, error: null });
            const allProducts = await getAllProducts(search, category);
            set({ loading: false });
            return allProducts;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to fetch products",
                loading: false
            });
        }
    }
}));

export default useProductStore;