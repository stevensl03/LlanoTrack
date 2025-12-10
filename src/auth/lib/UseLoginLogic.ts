// hooks/useLogin.ts
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../state/AuthContext"; 
import type { Rol } from "../../shared/types/authTypes";

export const useLogin = () => {
    const navigate = useNavigate();
    const auth = useAuth(); 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
 
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        
        // Validaciones
        if (!email || !password) {
            setLocalError("Por favor, complete todos los campos");
            return;
        }

        if (!email.includes('@')) {
            setLocalError("Ingrese un correo electrónico válido");
            return;
        }

        try {
            await auth.login(email, password);

            console.log("Roles del usuario:", auth.user?.roles);

            // -------------------------------
            // REDIRECCIÓN SEGÚN ROL
            // -------------------------------
            if (auth.user?.roles.includes("ROLE_ADMIN" as Rol)) {
                navigate("/admin", { replace: true });
                return;
            }

            if (auth.user?.roles.includes("ROLE_AUDITOR" as Rol)) {
                navigate("/auditor", { replace: true });
                return;
            }



            // Si no tiene roles válidos
            navigate("/", { replace: true });

            // Guardar email si rememberMe está activado
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

        } catch (err: any) {
            const errorMessage = err.message || "Error en el inicio de sesión";

            if (
                errorMessage.includes("Credenciales inválidas") ||
                errorMessage.includes("401")
            ) {
                setLocalError("Correo o contraseña incorrectos");
            } else if (errorMessage.includes("conectar")) {
                setLocalError("No se pudo conectar con el servidor");
            } else {
                setLocalError(errorMessage);
            }

            console.error("Login error:", err);
        }
    }, [email, password, rememberMe, auth.login, navigate, auth.user]);

    // Cargar email recordado
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const clearLocalError = useCallback(() => {
        setLocalError(null);
    }, []);

    return {
        // Estado
        email,
        password,
        showPassword,
        rememberMe,
        error: localError || (auth.user === null && auth.isAuthenticated === false ? null : undefined),
        isLoading: auth.isLoading,
        
        // Setters
        setEmail,
        setPassword,
        setRememberMe,
        togglePasswordVisibility,
        
        // Funciones
        handleSubmit,
        clearError: clearLocalError,
    };
};
