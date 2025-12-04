import { Link } from "react-router";
import { useApp } from "../../../state/AppContext";
import { useAuth } from "../../../state/AuthContext";
import { useState } from "react";



type sideBarNavProps = {
  showAll: boolean;
  menuOptions: Array<{ id: string; name: string; path: string; icon: string; badge?: number }>;
  footerOptions: Array<{ id: string; name: string; path: string; icon: string }>;
}

const SideBarNavigator = ({ showAll,menuOptions, footerOptions }: sideBarNavProps) => {
  const { setCurrentPageTitle } = useApp();
  const { user, logout } = useAuth();
  const [activeLink, setActiveLink]:[string, (id: string) => void] = useState("dashboard");

  if (!showAll) {
    return (
      <nav className="flex flex-col h-screen w-[200px] bg-white border-r border-gray-200 p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-8 p-2">
          <div className="w-9 h-9 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold text-orange-700">
            {user?.nombre?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm">{user?.nombre || "Usuario"}</p>
            <p className="text-gray-500 text-xs">{user?.email || "email@ejemplo.com"}</p>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 space-y-1">
          {menuOptions.map((option) => (
            <Link
              key={option.id}
              to={option.path}
              onClick={() => {
                setActiveLink(option.id);
                setCurrentPageTitle(option.name);
              }}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition ${
                activeLink === option.id
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.name}</span>
              {option.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {option.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Footer Options */}
        <div className="pt-4 border-t border-gray-200 space-y-1">
          {footerOptions.map((option) => (
            <Link
              key={option.id}
              to={option.path}
              onClick={() => {
                if (option.id === "logout"){ 
                    logout();
                    setCurrentPageTitle("Menu");
                }
                if (option.id !== "logout") setCurrentPageTitle(option.name);
              }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }
  
  return null;
};

export default SideBarNavigator;