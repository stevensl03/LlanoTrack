import type { JSX } from "react"
import { Outlet } from "react-router"

import HeaderShowNavigator from "../../../../shared/components/SideBarNavigator/HeaderShowNavigator";
import { useApp } from "../../../../state/AppContext";
import SideBarNavigator from "../../../../shared/components/SideBarNavigator/SideBarNavigator";

type AppContextType = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}
const menuOptions = [
    { id: "dashboard", name: "Panel", path: "/auditor/dashboard", icon: "📧" },
    { id: "board", name: "Tablero", path: "/auditor/tablero", icon: "📊" },
    { id: "exportacionComparticion", name: "Exportación y Compartición", path: "/auditor/exportacion", icon: "📤" },
    { id: "analisisTiempos", name: "Análisis de Tiempos", path: "/auditor/analisisTiempos", icon: "⏱" },
    { id: "analisisCumplimiento", name: "Análisis de Cumplimiento", path: "/auditor/analisisCumplimiento", icon: "✅" },
    { id: "reportesEntidad", name: "Reportes por Entidad", path: "/auditor/reportesEntidad", icon: "📈"},
    { id: "reporteGestor", name: "Reporte por Gestor", path: "/auditor/reporteGestor", icon: "📊"}
]
const footerOptions = [
    { id: "help", name: "Ayuda", path: "/auditor", icon: "❓" },
    { id: "logout", name: "Cerrar Sesión", path: "/auditor/logout", icon: "🚪" }
]



const AuditorLayout = (): JSX.Element => {
    const { sidebarOpen, toggleSidebar }: AppContextType = useApp();
    return (
        <div className={`${sidebarOpen ? "grid grid-cols-1" : "grid grid-cols-[200px_1fr]"} gap-0 h-screen`}>
            <aside className={`${sidebarOpen ? "hidden" : "sticky top-0 h-screen overflow-y-auto bg-white border-r border-gray-200"}`}>
                <SideBarNavigator showAll={sidebarOpen} menuOptions={menuOptions} footerOptions={footerOptions} />
            </aside>

            <main className={`overflow-y-auto h-screen ${sidebarOpen ? "w-full" : ""}`}>
                <HeaderShowNavigator showAll={sidebarOpen} setShowAll={toggleSidebar} />
                <Outlet />
            </main>
        </div>
    )
}


export default AuditorLayout;
