// hooks/useAuthService.ts
import { useState } from 'react';
import { useMockService } from './useMockService';
import { useAuth } from '../../state/AuthContext';

export const useAuthService = () => {
  const { login: authLogin, logout: authLogout } = useAuth();
  const { login: apiLogin, logout: apiLogout, getCurrentUser, loading, error } = useMockService();
  
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoginLoading(true);
    setLoginError(null);
    
    try {
      const response = await apiLogin({ email, password });
      
      if (response.success && response.data) {
        // Guardar en contexto y almacenamiento
        authLogin(response.data.user, response.data.token);
        return { success: true, user: response.data.user };
      } else {
        setLoginError(response.message || 'Error en el inicio de sesión');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setLoginError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
      authLogout();
      return { success: true };
    } catch (err) {
      console.error('Error en logout:', err);
      // Forzar logout de todas formas
      authLogout();
      return { success: false };
    }
  };

  const refreshCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        return { success: true, user: response.data };
      }
      return { success: false, error: response.message };
    } catch (err) {
      return { success: false, error: 'Error al obtener usuario actual' };
    }
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    refreshCurrentUser,
    loading: loading || loginLoading,
    error: error || loginError,
    clearError: () => {
      setLoginError(null);
      // También limpiar error del useMockService si tiene método para ello
    }
  };
};