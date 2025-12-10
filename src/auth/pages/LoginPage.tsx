// pages/LoginPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../state/AuthContext';
import { useLogin } from '../lib/UseLoginLogic';
import { Link } from 'react-router';
import type { Rol } from '../../shared/types/authTypes';

const LoginPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const {
        email,
        password,
        showPassword,
        rememberMe,
        error,
        isLoading,
        setEmail,
        setPassword,
        setRememberMe,
        togglePasswordVisibility,
        handleSubmit,
        clearError,
    } = useLogin();

    // Redirigir cuando el usuario esté autenticado
    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            const userRoles = auth.user.roles;
            
            if (userRoles.includes("ROLE_ADMIN" as Rol)) {
                navigate("/admin", { replace: true });
            } else if (userRoles.includes("ROLE_AUDITOR" as Rol)) {
                navigate("/auditor", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [auth.isAuthenticated, auth.user, navigate]);

    return (
        <div className="">
            <div className=" ">
                {/* Tarjeta de Login */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Logo y Título */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                className="w-7 h-7 text-blue-600"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
                                <path d="M3 6l9 6l9 -6" />
                                <path d="M15 18h6" />
                                <path d="M18 15l3 3l-3 3" />
                            </svg>
                        </div>
                        
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Bienvenido a LlanoTrack
                        </h1>
                        
                        <p className="text-gray-500 text-sm">
                            Inicia sesión en tu cuenta para continuar.
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                        {/* Mensaje de Error */}
                        {error && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="12" cy="12" r="9" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <div>
                                    <p className="text-sm text-red-800 font-medium">{error}</p>
                                    {error.includes('incorrectos') && (
                                        <p className="text-xs text-red-600 mt-1">
                                            Verifique su correo y contraseña
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* Campo Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico laboral
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="M3 7l9 6l9 -6" />
                                    </svg>
                                </div>
                                <input
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) clearError();
                                    }}
                                    placeholder="admin@gmail.com"
                                    disabled={isLoading}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <rect x="5" y="11" width="14" height="10" rx="2" />
                                        <circle cx="12" cy="16" r="1" />
                                        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                                    </svg>
                                </div>
                                <input
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) clearError();
                                    }}
                                    placeholder="Introduzca su contraseña"
                                    disabled={isLoading}
                                    required
                                    autoComplete="current-password"
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility}
                                    disabled={isLoading}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <circle cx="12" cy="12" r="2" />
                                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Opciones */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label className="ml-2 text-sm text-gray-600">
                                    Recordar mi usuario
                                </label>
                            </div>
                            
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Botón de Login */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Ingresando...
                                </>
                            ) : (
                                'Ingresar'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;