import axios from "axios";
const authAPI = "/api/auth";

export const register = (user) => axios.post(`${authAPI}/register`, user);

export const login = (user) => axios.post(`${authAPI}/login`, user);
