import type { JSX } from "react"
import { Outlet } from "react-router"
import { useEffect, useState } from "react";

import HeaderShowNavigator from "../../../../shared/components/SideBarNavigator/HeaderShowNavigator";
import { useApp } from "../../../../state/AppContext";
import SideBarNavigator from "../../../../shared/components/SideBarNavigator/SideBarNavigator";
import { useAuth } from "../../../../state/AuthContext";
import useUsuarios from "../../../../shared/hooks/useUsuarios";


type AppContextType = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

// AuthContext.tsx
export interface AuthUser {
    email: string;
    roles: string;
}



export interface AuthContextType {
    user: AuthUser | null;
    logout: () => void;
}


const menuOptions = [
    { id: "resumenGeneral", name: "resumenGeneral", path: "/auditor/resumenGeneral", icon: "📧" },
    { id: "filtrosAvanzados", name: "filtrosAvanzados", path: "/auditor/filtrosAvanzados", icon: "🔍" },
    { id: "listaCorreo", name: "listaCorreo", path: "/auditor/listaCorreo", icon: "🔍" },
]
const footerOptions = [
    { id: "help", name: "Ayuda", path: "/auditor", icon: "❓" },
    { id: "logout", name: "Cerrar Sesión", path: "/auditor/logout", icon: "🚪" }
]



const AuditorLayout = (): JSX.Element => {
    const { sidebarOpen, toggleSidebar }: AppContextType = useApp();
    const { user, logout } = useAuth() as AuthContextType;
    const { obtenerUsuarioPorCorreo } = useUsuarios();
    const [usuarioInfo, setUsuarioInfo] = useState<any>(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(false);
    const [errorUsuario, setErrorUsuario] = useState<string | null>(null);

       
      useEffect(() => {
        const buscarUsuario = async () => {
          if (!user?.email) return;
          
          setCargandoUsuario(true);
          setErrorUsuario(null);
          
          try {
            const usuarioEncontrado = await obtenerUsuarioPorCorreo(user.email);
            setUsuarioInfo(usuarioEncontrado);
            console.log("Usuario encontrado:", usuarioEncontrado);
          } catch (error: any) {
            setErrorUsuario(error.message || "Error al obtener usuario");
            console.error("Error al obtener usuario:", error);
          } finally {
            setCargandoUsuario(false);
          }
        };
    
        buscarUsuario();
      }, [user?.email, obtenerUsuarioPorCorreo]);
    
      // Ahora puedes usar usuarioInfo en tu componente
      const nombres = usuarioInfo?.nombres;

    return (
        <div className={`${sidebarOpen ? "grid grid-cols-1" : "grid grid-cols-[200px_1fr]"} gap-0 h-screen`}>
            <aside className={`${sidebarOpen ? "hidden" : "sticky top-0 h-screen overflow-y-auto bg-white border-r border-gray-200"}`}>
                <SideBarNavigator showAll={sidebarOpen} menuOptions={menuOptions} footerOptions={footerOptions} user={user} nombre={nombres} logout={logout} />
            </aside>

            <main className={`overflow-y-auto h-screen ${sidebarOpen ? "w-full" : ""}`}>
                <HeaderShowNavigator showAll={sidebarOpen} setShowAll={toggleSidebar} user={(user)} />
                <Outlet />
            </main>
        </div>
    )
}


export default AuditorLayout;