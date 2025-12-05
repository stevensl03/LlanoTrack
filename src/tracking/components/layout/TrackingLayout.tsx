import { Outlet } from "react-router";
import { useApp } from "../../../state/AppContext";
import SideBarNavigator from "../../../shared/pages/SideBarNavigator/SideBarNavigator";
import HeaderShowNavigator from "../../../shared/pages/SideBarNavigator/HeaderShowNavigator";

const TrackingLayout = () => {
  const { sidebarOpen, toggleSidebar } = useApp();
  // Definir las opciones directamente en el componente
  const menuOptions = [
    { id: "dashboard", name: "Panel", path: "/tracking/dashboard", icon: "📊" },
    { id: "inbox", name: "Correo", path: "/inbox", icon: "📥", badge: 3 },
    { id: "reports", name: "Reportes", path: "/reports", icon: "📈" },
    { id: "settings", name: "Configuración", path: "/settings", icon: "⚙️" },
  ];

  const footerOptions = [
    { id: "help", name: "Ayuda", path: "/tracking", icon: "❓" },
    { id: "logout", name: "Cerrar sesión", path: "/", icon: "🚪" },
  ];


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {!sidebarOpen && (
        <div className="sticky top-0 h-screen">
          <SideBarNavigator showAll={sidebarOpen} menuOptions={menuOptions} footerOptions={footerOptions} />
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 ${sidebarOpen ? "w-full" : ""}`}>
        <HeaderShowNavigator
          showAll={sidebarOpen}
          setShowAll={toggleSidebar}
        />
        <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrackingLayout;