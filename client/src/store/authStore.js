import { create } from "zustand"
import { signUp, login, checkAuth, verifyEmail } from "../services/authServices";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    authenticated: false,
    error: null,
    isCheckingAuth: true,

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
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await checkAuth();
            set({ user: response.data.user, isCheckingAuth: false, authenticated: true, error: null });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, authenticated: false });
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