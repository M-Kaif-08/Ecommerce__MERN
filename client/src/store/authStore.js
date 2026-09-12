import { create } from "zustand"
import { signUp, login, verifyEmail } from "../services/authServices";

export const useAuthStore = create((set) => ({
    loading: false,
    authenticated: false,
    error: null,

    signUp: async (email, name, password) => {
        set({ loading: true, error: null });
        try {
            const response = await signUp(email, name, password);
            set({ loading: false, authenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", loading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await login(email, password);
            set({ loading: false, authenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error in Login", loading: false });
        }
    },

    verifyEmail: async (code) => {
        set({ loading: true, error: null });
        try {
            const response = await verifyEmail(code);
            set({ loading: false, authenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error in email verification", loading: false });
            throw error;
        }
    }
}));