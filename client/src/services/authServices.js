import api from "./api";

export const signUp = async (email, name, password) => {
    const response = await api.post('/auth/signup', { email, name, password });
    return response;
}

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
}

export const checkAuth = async () => {
    const response = await api.get('/auth/check-auth');
    return response;
}

export const verifyEmail = async (code) => {
    const response = await api.post('/auth/verify-email', { code });
    return response;
}

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
}

export const resetPassword = async (token, password)=>{
    const response = await api.post(`/auth/reset-password/${token}`, {password});
    return response;
}