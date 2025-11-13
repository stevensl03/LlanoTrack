import type { JSX } from "react";
import { useState } from "react";
import { Link } from "react-router";

const LoginForm = (): JSX.Element => {

const roles = [
{
    id: 1,
    nombre: "ADMINISTRADOR_SISTEMA",
    displayName: "Administrador de Sistema",
    descripcion: "Control total del sistema, gestión de usuarios y configuraciones"
},
{
    id: 2,
    nombre: "ADMINISTRADOR_ASIGNACIONES",
    displayName: "Administrador de Asignaciones",
    descripcion: "Gestiona recepción, clasificación y envío final de correos"
},
{
    id: 3,
    nombre: "GESTOR",
    displayName: "Gestor",
    descripcion: "Responsable de redactar respuestas y gestionar el workflow completo"
},
{
    id: 4,
    nombre: "REVISOR_JURIDICO",
    displayName: "Revisor Jurídico",
    descripcion: "Valida y corrige contenido legal (trabaja desde GLPI)"
},
{
    id: 5,
    nombre: "APROBADOR",
    displayName: "Aprobador",
    descripcion: "Da visto bueno final para envío (trabaja desde Drive)"
},
{
    id: 6,
    nombre: "ROL_SEGUIMIENTO",
    displayName: "Rol de Seguimiento",
    descripcion: "Monitorea métricas y genera reportes sin modificar casos"
},
{
    id: 7,
    nombre: "AUDITOR",
    displayName: "Auditor",
    descripcion: "Realiza auditorías de cumplimiento de procedimientos"
} 
];

    const credenciales = [
        {id: 1, nombre:"Pepe Suarez", email: "admin@llanogas.com", password: "admin123", rol: roles[0], isActive: true},
        {id: 2, nombre:"Manuel Gomez", email: "user@llanogas.com", password: "user123", rol: roles[1], isActive: true}, 
        {id: 3, nombre:"Lina Perez", email: "inactive@llanogas.com", password: "inactive123", rol: roles[1], isActive: false},
        {id: 4, nombre:"Daniel Montero", email: "guest@llanogas.com", password: "guest123", rol: roles[2], isActive: true}
    ];

    function validarCredenciales(email: string, password: string): string | null {
        const usuario = credenciales.find(cred => cred.email === email && cred.password === password && cred.isActive);
        return usuario ? usuario.rol.nombre : null;
    }

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        const rol = validarCredenciales(email, password);
        if (!rol) {
            console.log("Credenciales inválidas o cuenta inactiva");
            return;
        }
        if (rol === "ADMINISTRADOR_SISTEMA") {
            console.log("Redirigiendo al panel de administrador...");
        }
    };

    return (
        <>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    className="icon icon-tabler icon-tabler-mail-forward w-12 h-12 text-gray-800"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
                    <path d="M3 6l9 6l9 -6" />
                    <path d="M15 18h6" />
                    <path d="M18 15l3 3l-3 3" />
                </svg>

                <h1 className="text-xl font-extrabold text-gray-900">
                    Bienvenido a LlanoTrack
                </h1>
                
                <p className="text-[16px] text-gray-600">
                    Inicia sesión en tu cuenta para continuar.
                </p>  

        <form onSubmit={handleSubmit} className="grid gap-4 w-full px-6"> 
            
            {/* 1. CAMPO CORREO ELECTRÓNICO */}
            <label htmlFor="email" className="text-[15px] font-bold text-gray-800 grid gap-1 w-full"> 
                Correo electrónico laboral:

                <div className="flex items-center gap-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
                    {/* Ícono de correo SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none" 
                            strokeLinecap="round"
                            strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6l9 -6" />
                    </svg>

                    <input
                        className="w-full bg-white focus:outline-none placeholder-gray-500 text-gray-700 text-sm"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduzca su correo electrónico"
                        required
                    />
                </div>
            </label>

            {/* 2. CAMPO CONTRASEÑA */}
            <label htmlFor="password" className="text-[15px] font-bold text-gray-800 grid gap-1 w-full">
                Contraseña:
                
                <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
                    {/* Ícono de candado SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="5" y="11" width="14" height="10" rx="2" /><circle cx="12" cy="16" r="1" />
                        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                    </svg>

                    <input
                        className="w-full bg-white focus:outline-none placeholder-gray-500 text-gray-700 text-sm mx-2"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduzca su contraseña"
                        required
                    />

                    {/* Ícono de ojo SVG (Mostrar/Ocultar) */}
                    <button type="button" className="text-gray-500 hover:text-gray-700 p-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            className="w-5 h-5"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5" 
                                stroke="currentColor" fill="none" 
                                strokeLinecap="round" 
                                strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                    </button>
                </div>
            </label>

            {/* 3. CHECKBOX Y ENLACE - NOTA: Se ajusta el orden del checkbox */}
            {/* NOTE: Quité el 'px-6' de aquí y lo puse en el form para unificar el padding. */}
            <div className="flex justify-between items-center w-full">
                <label htmlFor="recordarUsuario" className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
                    <input 
                        type="checkbox" 
                        id="recordarUsuario" 
                        name="recordarUsuario" 
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" 
                    />
                    Recordar mi usuario
                </label>
                {}
                <Link
                    to="/auth/forgot-password"
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                    ¿Olvidaste tu contraseña?
                </Link>

            </div>

            {/* 4. BOTÓN "INGRESAR" */}
            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-150 ease-in-out text-base"
            >
                Ingresar
            </button>

        </form>
        </>
    );
}


export default LoginForm;
