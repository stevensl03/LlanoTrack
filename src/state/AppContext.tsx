import { createContext, useContext, useState, type ReactNode, type JSX } from "react";

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentPageTitle: string;
  setCurrentPageTitle: (title: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPageTitle, setCurrentPageTitle] = useState<string>("Menú");

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        currentPageTitle,
        setCurrentPageTitle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};