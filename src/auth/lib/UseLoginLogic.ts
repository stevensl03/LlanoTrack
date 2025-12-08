// hooks/useLogin.ts o lib/useLogin.ts
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuthService } from '../../shared/hooks/useAuthService';

export const useLogin = () => {
    const navigate = useNavigate();
    const { login, loading, error, clearError } = useAuthService();
    
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
        
        // Validaciones básicas
        if (!email || !password) {
            setLocalError('Por favor, complete todos los campos');
            return;
        }

        if (!email.includes('@')) {
            setLocalError('Ingrese un correo electrónico válido');
            return;
        }

        try {
            const result = await login(email, password);
            
            if (result.success) {
                // Redirigir al dashboard
                navigate('/admin', { replace: true });
                
                // Opcional: Guardar email en localStorage si rememberMe está activado
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
            } else {
                // El error ya está manejado por useAuthService, pero podemos personalizarlo
                const errorMessage = result.error || 'Error en el inicio de sesión';
                setLocalError(errorMessage);
            }
        } catch (err) {
            setLocalError('Error de conexión. Por favor, intente nuevamente');
            console.error('Login error:', err);
        }
    }, [email, password, rememberMe, login, navigate]);

    // Cargar email recordado al iniciar
    useState(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    });

    return {
        // Estado
        email,
        password,
        showPassword,
        rememberMe,
        error: error || localError,
        isLoading: loading,
        
        // Setters
        setEmail,
        setPassword,
        setRememberMe,
        togglePasswordVisibility,
        
        // Funciones
        handleSubmit,
        clearError: () => {
            clearError();
            setLocalError(null);
        }
    };
};