import api from "./api";

export const getAllProducts = async (search, category) => {
    const response = await api.get('/products', {
        params: {
            search,
            category
        }
    });

    return response.data;
}