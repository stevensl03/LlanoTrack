import { useState } from "react";
import { useNavigate } from "react-router";
import { validateUserCredentials, getRoleDataName } from "../../shared/lib/usersData";
import { useAuth } from "../../state/AuthContext";

interface UseLoginReturn {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  error: string;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅ usa tu AuthContext real


  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearError = () => setError("");

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // 🚦 Redirección según rol
  const redirectByRole = (roleName: string) => {
    const routes: Record<string, string> = {
      ADMINISTRADOR_SISTEMA: "/admin",
      ADMINISTRADOR_ASIGNACIONES: "/admin/asignaciones",
      GESTOR: "/gestor/correos",
      REVISOR_JURIDICO: "/revisor/glpi",
      APROBADOR: "/aprobador/pendientes",
      ROL_SEGUIMIENTO: "/seguimiento/metricas",
      AUDITOR: "/auditor/reportes",
    };

    navigate(routes[roleName] || "/dashboard");
  };

  // 🟦 SUBMIT DEL LOGIN
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Validaciones básicas
    if (!email.trim()) {
      return setError("Por favor ingresa tu correo electrónico");
    }
    if (!password.trim()) {
      return setError("Por favor ingresa tu contraseña");
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    // Validación contra tus datos mock JSON
    const result = validateUserCredentials(email, password);

    setIsLoading(false);

    if (!result.success) {
      return setError(result.message ?? "Credenciales incorrectas");
    }

    const usuario = result.user;
    if (!usuario) {
      return setError("Usuario no encontrado");
    }

    const roleInfo = getRoleDataName(usuario.role_id);

    const userData = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      roleId: usuario.role_id,
      roleName: roleInfo.roleName,
      roleDescription: roleInfo.roleDescription,
    };

    // ===================================
    // 🟩 USA TU AUTH CONTEXT + STORE REAL
    // ===================================
    const fakeToken = "mock-token-" + Date.now();

    login(userData, fakeToken); // <-- guarda en contexto + localStorage

    // ===================================
    // 🟨 CONTROL DEL "RECORDARME"
    // ===================================
    if (!rememberMe) {
      // Si NO quiere recordar sesión → limpiar al cerrar pestaña
      sessionStorage.setItem("tempUserSession", JSON.stringify(userData));
    }

    // 🚀 Redirigir según rol
    redirectByRole(roleInfo.roleName);
  };

  return {
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
  };
};
