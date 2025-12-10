// shared/hooks/useAuthService.ts
import { useState, useCallback } from 'react';
import type { LoginRequest, AuthUser, LoginResponse } from '../types/authTypes';
import { authService } from '../../services/authService';

export const useAuthService = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Función para iniciar sesión
   * NOTA: El token JWT se obtiene de las cookies, NO se devuelve aquí
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      
      // Transformamos la respuesta al formato de AuthUser
      const user: AuthUser = {
        email: response.email,
        roles: response.roles,
      };
      
      return user;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Función para refrescar el token y obtener datos del usuario
   */
  const refreshToken = useCallback(async (): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.refreshToken();
      
      const user: AuthUser = {
        email: response.email,
        roles: response.roles,
      };
      
      return user;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al refrescar la sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Función para cerrar sesión
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.logout();
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cerrar sesión';
      setError(errorMessage);
      // IMPORTANTE: Aún debemos limpiar el estado local
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Función para verificar si hay una sesión activa
   * Intenta refrescar el token para validarlo
   */
  const verifySession = useCallback(async (): Promise<AuthUser | null> => {
    setIsLoading(true);
    
    try {
      const user = await refreshToken();
      return user;
    } catch (error) {
      // No hay sesión válida
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [refreshToken]);

  return {
    // Estados
    isLoading,
    error,
    
    // Funciones
    login,
    logout,
    refreshToken,
    verifySession,
    
    // Helper para limpiar errores
    clearError: () => setError(null),
  };
};