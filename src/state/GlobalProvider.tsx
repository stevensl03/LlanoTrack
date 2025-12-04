import { type ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { AppProvider } from "./AppContext";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  );
};
