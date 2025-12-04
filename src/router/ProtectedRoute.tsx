import { Navigate } from "react-router";
import { useAuth } from "../state/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[]; // roles permitidos
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  //console.log(user?.roleName)

  // 1️⃣ Validar si el usuario está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // 2️⃣ Validar roles si fueron especificados
  if (roles && roles.length > 0) {
    console.log(roles, user?.roleName)
    if (!user?.roleName || !roles.includes(user.roleName)) {
      return <Navigate to="/not-found-404" replace />;
    }
  }

  // 3️⃣ Si pasa validaciones → mostrar la vista protegida
  return children;
};
