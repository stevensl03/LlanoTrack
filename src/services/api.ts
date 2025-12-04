// @ts-ignore
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api", // cambia cuando te den el backend
  withCredentials: true, // si usarás cookies
});

// Interceptor opcional para agregar token automáticamente
api.interceptors.request.use((config: axios.AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
