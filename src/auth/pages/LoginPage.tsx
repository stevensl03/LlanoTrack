import type { JSX } from "react";
import { Link } from "react-router";
import { useLogin } from "../lib/UseLoginLogic"; // Ahora usa el hook actualizado

const LoginForm = (): JSX.Element => {
    // El hook ahora usa useAuthService internamente
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
        clearError
    } = useLogin();

    return (
        <>
            {/* Tu JSX existente permanece igual */}
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
                
                {/* Mensaje de Error - actualizado para manejar ambos tipos de error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <div className="flex-1">
                            <p className="text-sm text-red-800">{error}</p>
                            {/* Puedes mostrar más detalles si es necesario */}
                            {error.includes('credenciales') && (
                                <p className="text-xs text-red-600 mt-1">
                                    Verifique su correo y contraseña
                                </p>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Campos del formulario (permanecen igual) */}
                <label htmlFor="email" className="text-[15px] font-bold text-gray-800 grid gap-1 w-full"> 
                    Correo electrónico laboral:

                    <div className="flex items-center gap-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
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
                            className="w-full bg-white focus:outline-none placeholder-gray-500 text-gray-700 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) clearError();
                            }}
                            placeholder="Introduzca su correo electrónico"
                            disabled={isLoading}
                            required
                            autoComplete="username"
                        />
                    </div>
                </label>

                <label htmlFor="password" className="text-[15px] font-bold text-gray-800 grid gap-1 w-full">
                    Contraseña:
                    
                    <div className="flex items-center p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                        </svg>

                        <input
                            className="w-full bg-white focus:outline-none placeholder-gray-500 text-gray-700 text-sm mx-2 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            type={showPassword ? "text" : "password"}
                            id="password"
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
                            className="text-gray-500 hover:text-gray-700 p-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {/* Iconos para mostrar/ocultar contraseña */}
                        </button>
                    </div>
                </label>

                <div className="flex justify-between items-center w-full">
                    <label htmlFor="recordarUsuario" className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
                        <input 
                            type="checkbox" 
                            id="recordarUsuario" 
                            name="recordarUsuario"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isLoading}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                        />
                        Recordar mi usuario
                    </label>
                    
                    <Link
                        to="/auth/forgot-password"
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-150 ease-in-out text-base disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        </>
    );
}

export default LoginForm;