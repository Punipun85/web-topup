import api from "../api/axios";

export const login = (data) => api.post("/login", data);
export const getMe = () => api.get("/me");
export const logout = () => api.post("/logout");
export const register = (data) => api.post("/register", data);