import api from "./api";

export const signUp = async (email, name, password) => {
    const response = await api.post('/auth/signup', { email, name, password });
    return response;
}

export const login = async (email, password)=>{
    const response = await api.post('/auth/login', {email, password});
    return response;
}

export const verifyEmail = async (code) => {
    const response = await api.post('/auth/verify-email', { code });
    return response;
}