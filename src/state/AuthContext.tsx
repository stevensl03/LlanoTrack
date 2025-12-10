// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { tokenStorage } from "../store/tokenStorage";
import { userStorage } from "../store/userStorage";
import type { AuthUser, Rol } from "../shared/types/authTypes";
import { authService } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Función auxiliar para verificar si hay una cookie específica
const hasCookie = (name: string): boolean => {
  return document.cookie.split(';').some((cookie) => {
    return cookie.trim().startsWith(`${name}=`);
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = userStorage.get();
    return savedUser ? (savedUser as AuthUser) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => tokenStorage.get());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verificar sesión al cargar la app
  useEffect(() => {
    const checkInitialAuth = async () => {
      setIsLoading(true);
      
      const savedUser = userStorage.get();
      const savedToken = tokenStorage.get();
      
      // Verificar si tenemos cookies de autenticación
      const hasRefreshCookie = hasCookie('refreshToken');
      const hasAccessCookie = hasCookie('accessToken');
      
      if (hasRefreshCookie && savedUser && savedToken) {
        try {
          // Intentar refrescar el token
          const response = await authService.refreshToken();
          
          // Actualizar usuario con datos frescos
          const freshUser: AuthUser = {
            email: response.email,
            roles: response.roles,
          };
          
          setUser(freshUser);
          userStorage.save(freshUser);
          setToken('cookie-token-present');
          setIsAuthenticated(true);
          
        } catch (error) {
          console.error('Error al verificar sesión:', error);
          // Limpiar estado local si el refresh falla
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
          userStorage.remove();
          tokenStorage.remove();
        }
      } else if (savedUser && savedToken) {
        // Tenemos datos locales pero no cookies, mantener sesión local
        setUser(savedUser as AuthUser);
        setToken(savedToken);
        setIsAuthenticated(true);
      } else {
        // No hay datos de sesión
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        userStorage.remove();
        tokenStorage.remove();
      }
      
      setIsLoading(false);
    };

    checkInitialAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      // Transformar respuesta a AuthUser
      const userData: AuthUser = {
        email: response.email,
        roles: response.roles,
      };
      
      setUser(userData);
      setToken('cookie-token-present');
      setIsAuthenticated(true);
      userStorage.save(userData);
      tokenStorage.save('cookie-token-present');
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido en login';
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      userStorage.remove();
      tokenStorage.remove();
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error: unknown) {
      console.error('Error en logout del servidor:', error);
    } finally {
      // Siempre limpiamos el estado local
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      userStorage.remove();
      tokenStorage.remove();
      setIsLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const response = await authService.refreshToken();
      
      const userData: AuthUser = {
        email: response.email,
        roles: response.roles,
      };
      
      setUser(userData);
      setToken('cookie-token-present');
      setIsAuthenticated(true);
      userStorage.save(userData);
      
      return true;
    } catch (error: unknown) {
      console.error('Error al refrescar sesión:', error);
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      userStorage.remove();
      tokenStorage.remove();
      return false;
    }
  }, []);

  // Sincronizar pestañas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        const newToken = tokenStorage.get();
        setToken(newToken);
        setIsAuthenticated(!!(user && newToken));
      }

      if (e.key === "user_data") {
        const newUser = userStorage.get() as AuthUser | null;
        setUser(newUser);
        setIsAuthenticated(!!(newUser && token));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user, token]);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    isLoading,
    login,
    logout,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};