import type { JSX } from "react"
import { Outlet } from "react-router"

import HeaderShowNavigator from "../../../../shared/pages/SideBarNavigator/HeaderShowNavigator";
import { useApp } from "../../../../state/AppContext";
import SideBarNavigator from "../../../../shared/pages/SideBarNavigator/SideBarNavigator";

type AppContextType = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}
const menuOptions = [
    { id: "dashboard", name: "Panel", path: "/aprobador/dashboard", icon: "📧" },
    { id: "history", name: "Historial", path: "/aprobador/history", icon: "📜" },
    { id: "detail", name: "Detalle", path: "/aprobador/detail/:id", icon: "🔍"}
]
const footerOptions = [
    { id: "help", name: "Ayuda", path: "/aprobador", icon: "❓" },
    { id: "logout", name: "Cerrar Sesión", path: "/aprobador/logout", icon: "🚪" }
]



const AprobadorLayout = (): JSX.Element => {
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


export default AprobadorLayout;
