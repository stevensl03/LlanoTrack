// services/axiosConfig.ts - Configuración CORRECTA
import axios from 'axios';

// URL base - IMPORTANTE: usar localhost, no 127.0.0.1
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Configuración GLOBAL de axios
axios.defaults.withCredentials = true; // Esto es CLAVE
axios.defaults.baseURL = API_BASE_URL;

// Interceptor de request para debug
axios.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', {
      url: config.url,
      method: config.method,
      withCredentials: config.withCredentials,
      baseURL: config.baseURL
    });
    
    // Asegurar que withCredentials esté habilitado
    config.withCredentials = true;
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de response
axios.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  async (error) => {
    console.error('❌ Response error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });
    
    // Si es 401, redirigir a login
    if (error.response?.status === 401 && window.location.pathname !== '/auth/login') {
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default axios;