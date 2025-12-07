import type { JSX } from "react"
import { Outlet } from "react-router"

import HeaderShowNavigator from "../../../../shared/components/SideBarNavigator/HeaderShowNavigator";
import { useApp } from "../../../../state/AppContext";
import SideBarNavigator from "../../../../shared/components/SideBarNavigator/SideBarNavigator";
import { useAuth } from "../../../../state/AuthContext";

type AppContextType = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

type AuthContextType = {
    user: {
        nombres: string;
        email: string;
        roleName: string;
    } | null;
    logout: () => void;
}


const menuOptions = [
    { id: "dashboard", name: "Panel", path: "/admin/dashboard", icon: "📧" },
    { id: "user", name: "usuarios", path: "/admin/usersConfig", icon: "👥" },
    { id: "entity", name: "Entidades", path: "/admin/entitiesConfig", icon: "🏢" },
    { id: "requestType", name: "Solicitud", path: "/admin/requestTypesConfig", icon: "📲" },
]
const footerOptions = [
    { id: "help", name: "Ayuda", path: "/admin", icon: "❓" },
    { id: "logout", name: "Cerrar Sesión", path: "/admin/logout", icon: "🚪" }
]



const AdminLayout = (): JSX.Element => {
    const { sidebarOpen, toggleSidebar }: AppContextType = useApp();
    const { user, logout }:AuthContextType = useAuth();

    return (
        <div className={`${sidebarOpen ? "grid grid-cols-1" : "grid grid-cols-[200px_1fr]"} gap-0 h-screen`}>
            <aside className={`${sidebarOpen ? "hidden" : "sticky top-0 h-screen overflow-y-auto bg-white border-r border-gray-200"}`}>
                <SideBarNavigator showAll={sidebarOpen} menuOptions={menuOptions} footerOptions={footerOptions} user={user} logout={logout} />
            </aside>

            <main className={`overflow-y-auto h-screen ${sidebarOpen ? "w-full" : ""}`}>
                <HeaderShowNavigator showAll={sidebarOpen} setShowAll={toggleSidebar} user={(user)} />
                <Outlet />
            </main>
        </div>
    )
}


export default AdminLayout;