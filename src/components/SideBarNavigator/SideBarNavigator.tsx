import type { JSX } from "react";
import { useState } from 'react';

type LinkName = "Dashboard" | "Inbox" | "Reports" | "Teams" | "Settings" | "Help" | "Logout";

type SideBarNavigatorProps= {
    showAll: boolean;
}

const SideBarNavigator = ({showAll}:SideBarNavigatorProps): JSX.Element | undefined => {

    const [activeLink, setActiveLink] = useState<LinkName>("Dashboard");

    function handleLinkClick(name: LinkName, path: string) {
            // 1. Guarda el estado localmente (para el estilo 'activo')
            setActiveLink(name);

            // 2. Navega a la nueva ruta usando React Router
            // navigate(path);
        }

    // Función para generar clases de enlace
    const getLinkClasses = (name: LinkName): string => {

        const baseClasses = "flex items-center gap-3 py-3 px-4 rounded-lg transition duration-150 text-gray-700 hover:bg-gray-100";
        if (name === activeLink) {
            return `${baseClasses} bg-blue-50 text-blue-600 font-semibold`;
        }
        return baseClasses;
    };

   
    if(!showAll){
        return (
            <nav className="flex flex-col h-screen w-full bg-white border-r border-gray-200 p-4" >
                
                {/* 1. SECCIÓN DE CABECERA/LOGO */}
            <div className="flex items-center gap-3 mb-8 p-2 relative">
                {/* Avatar / Logo Placeholder */}
                <div className="w-9 h-9 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold text-orange-700">EF</div> 
                <div>
                    <p className="text-gray-900 font-bold leading-none">EmailFlow</p>
                    <p className="text-gray-500 text-xs">Management</p>
                </div>

            </div>

                {/* 2. MENÚ PRINCIPAL (ENLACES SUPERIORES) */}
                <ul className="flex flex-col gap-2 flex-grow">
                    
                    {/* Enlace de Dashboard */}
                    <li>
                        <a href="/dashboard" onClick={() => handleLinkClick("Dashboard","/dashboard")} className={getLinkClasses("Dashboard")}>
                            {/* SVG Dashboard */}
                            <svg className={`w-5 h-5 ${activeLink === "Dashboard" ? 'text-blue-600' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="13" y="3" width="7" height="5" /><rect x="13" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
                            Dashboard
                        </a>
                    </li>
                    
                    {/* Enlace de Inbox */}
                    <li>
                        <a href="/inbox" onClick={() => handleLinkClick("Inbox","/inbox")} className={getLinkClasses("Inbox")}>
                            {/* SVG Inbox */}
                            <svg className={`w-5 h-5 ${activeLink === "Inbox" ? 'text-blue-600' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            Inbox
                        </a>
                    </li>
                    
                    {/* Enlace de Reports (ACTIVO) */}
                    <li>
                        <a href="/reports" onClick={() => handleLinkClick("Reports","/reports")} className={getLinkClasses("Reports")}>
                            {/* SVG Reports (Barras) */}
                            <svg className={`w-5 h-5 ${activeLink === "Reports" ? 'text-blue-600' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
                            Reports
                        </a>
                    </li>

                    {/* Enlace de Teams */}
                    <li>
                        <a href="/teams" onClick={() => handleLinkClick("Teams","/teams")} className={getLinkClasses("Teams")}>
                            {/* SVG Teams */}
                            <svg className={`w-5 h-5 ${activeLink === "Teams" ? 'text-blue-600' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Teams
                        </a>
                    </li>
                    
                    {/* Enlace de Settings */}
                    <li>
                        <a href="/settings" onClick={() => handleLinkClick("Settings","/settings")} className={getLinkClasses("Settings")}>
                            {/* SVG Settings */}
                            <svg className={`w-5 h-5 ${activeLink === "Settings" ? 'text-blue-600' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 5 9.4a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H12a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 .51h.06a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2z"/></svg>
                            Settings
                        </a>
                    </li>
                </ul>

                {/* 3. SECCIÓN INFERIOR (FOOTER) */}
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                    
                    {/* Enlace de Help */}
                    <a href="/help" className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100">
                        {/* SVG Help */}
                        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 1.5-1.5 2.5-3 3.5" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        Help
                    </a>
                    
                    {/* Enlace de Logout */}
                    <a href="/logout" className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100">
                        {/* SVG Logout */}
                        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Logout
                    </a>
                </div>



            </nav>
            
        );
    }
};

export default SideBarNavigator;