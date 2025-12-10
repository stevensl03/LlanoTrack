// hooks/useLogin.ts
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../state/AuthContext"; 
import type { Rol } from "../../shared/types/authTypes";

interface UseLoginReturn {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  error: string | null;
  isLoading: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRememberMe: (value: boolean) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
    const navigate = useNavigate();
    const auth = useAuth(); 
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
 
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setLocalError(null);
        
        // Validaciones
        if (!email.trim() || !password.trim()) {
            setLocalError("Por favor, complete todos los campos");
            return;
        }

        if (!email.includes('@')) {
            setLocalError("Ingrese un correo electrónico válido");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Realizar login
            await auth.login(email, password);
            
            // 2. Esperar a que el contexto se actualice completamente
            // El login exitoso ya debe haber actualizado el estado del contexto
            // Si necesitas esperar, hazlo aquí:
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // 3. Verificar si el usuario está autenticado y tiene roles
            if (!auth.isAuthenticated) {
                throw new Error("No se pudo completar la autenticación");
            }
            
            if (!auth.user) {
                throw new Error("No se pudo obtener información del usuario");
            }
            
            const userRoles = auth.user.roles;
            
            console.log("Usuario autenticado:", auth.user.email);
            console.log("Roles del usuario:", userRoles);

            // 4. Guardar email si rememberMe está activado
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            // 5. Redirigir según el rol - SIN DEPENDER DE auth.user aquí
            // La redirección se manejará en el componente (ver abajo)
            
        } catch (err: unknown) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : "Error en el inicio de sesión";

            if (
                errorMessage.includes("Credenciales inválidas") ||
                errorMessage.includes("401") ||
                errorMessage.toLowerCase().includes("unauthorized")
            ) {
                setLocalError("Correo o contraseña incorrectos");
            } else if (errorMessage.includes("conectar") || errorMessage.includes("Network Error")) {
                setLocalError("No se pudo conectar con el servidor");
            } else {
                setLocalError(errorMessage);
            }

            console.error("Login error:", err);
        } finally {
            setIsProcessing(false);
        }
    }, [email, password, rememberMe, auth]);

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

    const handleSetEmail = useCallback((value: string) => {
        setEmail(value);
    }, []);

    const handleSetPassword = useCallback((value: string) => {
        setPassword(value);
    }, []);

    const handleSetRememberMe = useCallback((value: boolean) => {
        setRememberMe(value);
    }, []);

    return {
        email,
        password,
        showPassword,
        rememberMe,
        error: localError,
        isLoading: auth.isLoading || isProcessing,
        setEmail: handleSetEmail,
        setPassword: handleSetPassword,
        setRememberMe: handleSetRememberMe,
        togglePasswordVisibility,
        handleSubmit,
        clearError: clearLocalError,
    };
};