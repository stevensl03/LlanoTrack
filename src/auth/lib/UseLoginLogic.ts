import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../state/AuthContext";
import { useData } from "../../shared/lib/usersData";
import type { Usuario } from "../../shared/lib/usersData";

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

// Mapeo de usuarios a roles (en una app real esto vendría de la BD)
const usuarioRolesMap: Record<number, { roleId: number; roleName: string }> = {
  1: { roleId: 2, roleName: "GESTOR" },        // Ana - GESTOR
  2: { roleId: 4, roleName: "APROBADOR" },     // Luis - APROBADOR
  3: { roleId: 5, roleName: "ADMINISTRADOR_SISTEMA" }, // Carlos - ADMIN
  4: { roleId: 3, roleName: "REVISOR" },       // María - REVISOR
  5: { roleId: 2, roleName: "GESTOR" },        // Pedro - GESTOR
  6: { roleId: 1, roleName: "Integrador" },    // Laura - Integrador
  7: { roleId: 6, roleName: "AUDITOR" }        // Javier - AUDITOR
};

interface UserDataForContext {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  roleId: number;
  roleName: string;
  roleDescription?: string;
  entidadId: number | null;
  dependenciaId: number | null;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const { login } = useAuth();

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

  // 🚦 Redirección según rol (actualizado con todos los roles)
  const redirectByRole = (roleName: string) => {
    const routes: Record<string, string> = {
      ADMINISTRADOR_SISTEMA: "/admin",
      INTEGRADOR: "/integrador",
      GESTOR: "/gestor",
      REVISOR: "/revisor",
      APROBADOR: "/aprobador",
      AUDITOR: "/auditor",
    };

    // Asegurarse de que el nombre del rol esté en mayúsculas para coincidir
    const normalizedRoleName = roleName.toUpperCase();
    navigate(routes[normalizedRoleName] || "/dashboard");
  };

  // Función para obtener información del usuario para el contexto
  const getUserDataForContext = (usuario: Usuario): UserDataForContext => {
    // Obtener rol del mapeo
    const roleInfo = usuarioRolesMap[usuario.id] || { 
      roleId: 0, 
      roleName: "USUARIO" 
    };

    // Si no está en el mapeo, intentar inferir del email
    let roleName = roleInfo.roleName;
    if (!roleInfo.roleId && usuario.correo.includes("admin")) {
      roleName = "ADMINISTRADOR_SISTEMA";
    } else if (!roleInfo.roleId && usuario.correo.includes("auditor")) {
      roleName = "AUDITOR";
    }

    // Buscar el rol correspondiente en los datos
    const todosLosRoles = useData.getAllRoles();
    const rolEncontrado = todosLosRoles.find(r => 
      r.nombreRol.toUpperCase() === roleName.toUpperCase()
    );

    const roleId = rolEncontrado?.id || 0;

    // Buscar dependencia asociada
    const dependencias = useData.getAllDependencias();
    const dependenciaUsuario = dependencias.find(d => {
      const usuarioDominio = usuario.correo.split('@')[1];
      const dependenciaDominio = d.correoDependencia.split('@')[1];
      return usuarioDominio === dependenciaDominio;
    });

    return {
      id: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.correo,
      roleId,
      roleName: roleName.toUpperCase(),
      roleDescription: obtenerDescripcionRol(roleName),
      entidadId: dependenciaUsuario?.entidad?.id || null,
      dependenciaId: dependenciaUsuario?.id || null
    };
  };

  // Función auxiliar para obtener descripción del rol
  const obtenerDescripcionRol = (roleName: string): string => {
    const descripciones: Record<string, string> = {
      "INTEGRADOR": "Usuario con permisos de integración de sistemas",
      "GESTOR": "Responsable de gestionar correos y solicitudes",
      "REVISOR": "Encargado de revisar contenido y documentos",
      "APROBADOR": "Autoridad para aprobar procesos y solicitudes",
      "ADMINISTRADOR_SISTEMA": "Administrador completo del sistema",
      "AUDITOR": "Supervisa y audita procesos del sistema",
      "USUARIO": "Usuario básico del sistema"
    };
    
    return descripciones[roleName.toUpperCase()] || "Usuario del sistema";
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

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Por favor ingresa un correo electrónico válido");
    }

    setIsLoading(true);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Validación contra los nuevos datos
      const result = useData.validateUserCredentials(email, password);

      if (!result.success) {
        setError(result.message ?? "Credenciales incorrectas");
        return;
      }

      const usuario = result.usuario;
      if (!usuario) {
        setError("Usuario no encontrado");
        return;
      }

      // Verificar si el usuario está activo
      if (!usuario.activo) {
        setError("Tu cuenta está desactivada. Contacta al administrador.");
        return;
      }

      // Obtener datos del usuario para el contexto
      const userData = getUserDataForContext(usuario);

      // ===================================
      // 🟩 USA TU AUTH CONTEXT + STORE REAL
      // ===================================
      const fakeToken = `mock-token-${Date.now()}-${usuario.id}-${userData.roleName}`;

      // login espera (userData, token)
      login(userData, fakeToken);

      // ===================================
      // 🟨 CONTROL DEL "RECORDARME"
      // ===================================
      if (!rememberMe) {
        // Si NO quiere recordar sesión → usar sessionStorage
        sessionStorage.setItem("tempUserSession", JSON.stringify(userData));
      }

      // 🚀 Redirigir según rol
      redirectByRole(userData.roleName);

    } catch (error) {
      console.error("Error en login:", error);
      setError("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
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