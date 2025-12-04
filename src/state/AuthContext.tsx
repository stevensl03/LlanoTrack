import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

import { tokenStorage } from "../store/tokenStorage";
import { userStorage } from "../store/userStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial tomado desde localStorage
  const [user, setUser] = useState<any | null>(userStorage.get());
  const [token, setToken] = useState<string | null>(tokenStorage.get());

  // Sincronizar pestañas (si hacen logout en una, afecta todas)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        setToken(tokenStorage.get());
      }

      if (e.key === "user_data") {
        setUser(userStorage.get());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (userData: any, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    userStorage.save(userData);
    tokenStorage.save(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    userStorage.remove();
    tokenStorage.remove();
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
