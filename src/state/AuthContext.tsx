// contexts/AuthContext.tsx (actualizado)
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { tokenStorage } from "../store/tokenStorage";
import { userStorage } from "../store/userStorage";
import type { AuthUser } from "../shared/types/authTypes";
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
  const [user, setUser] = useState<AuthUser | null>(() => userStorage.get() as AuthUser | null);
  const [token, setToken] = useState<string | null>(tokenStorage.get());
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          // Nota: El token está en cookies httpOnly, no podemos accederlo
          // Solo marcamos que hay token
          setToken('cookie-token-present');
          
        } catch (error) {
          console.error('Error al verificar sesión:', error);
          // Limpiar estado local si el refresh falla
          setUser(null);
          setToken(null);
          userStorage.remove();
          tokenStorage.remove();
        }
      } else if (savedUser && savedToken) {
        // Tenemos datos locales pero no cookies, mantener sesión local
        setUser(savedUser as AuthUser | null);
        setToken(savedToken);
      } else {
        // No hay datos de sesión
        setUser(null);
        setToken(null);
        userStorage.remove();
        tokenStorage.remove();
      }
      
      setIsLoading(false);
    };

    checkInitialAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      // Transformar respuesta a AuthUser
      const userData: AuthUser = {
        email: response.email,
        roles: response.roles,
      };
      
      setUser(userData);
      setToken('cookie-token-present'); // Marcamos que hay token en cookies
      userStorage.save(userData);
      tokenStorage.save('cookie-token-present');
      
    } catch (error) {
      setUser(null);
      setToken(null);
      userStorage.remove();
      tokenStorage.remove();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout del servidor:', error);
    } finally {
      // Siempre limpiamos el estado local
      setUser(null);
      setToken(null);
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
      userStorage.save(userData);
      
      return true;
    } catch (error) {
      console.error('Error al refrescar sesión:', error);
      setUser(null);
      setToken(null);
      userStorage.remove();
      tokenStorage.remove();
      return false;
    }
  }, []);

  // Sincronizar pestañas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        setToken(tokenStorage.get());
      }

      if (e.key === "user_data") {
        setUser(userStorage.get() as AuthUser | null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        isLoading,
        login,
        logout,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};