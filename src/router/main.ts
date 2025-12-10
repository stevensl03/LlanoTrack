import { lazy } from "react";
// Importaciones de React
export { lazy, Suspense } from "react";
export { BrowserRouter, Routes, Route, Navigate } from "react-router";

// Componentes de Auth
export { default as AuthLayout } from "../auth/components/layout/AuthLayout";
export { default as LoginPage } from "../auth/pages/LoginPage";
export { default as TwoFactorPage } from "../auth/pages/TwoFactorPage";
export { default as ForgotPasswordPage } from "../auth/pages/ForgotPasswordPage";
export { default as ResetPasswordForm } from "../auth/pages/ResetPasswordForm";

// componenetes de Pagina de Inicio
export {default as LandingPage} from "../shared/pages/inicioPage/LandingPage";

// Componentes compartidos
export { default as NotFound404 } from "../shared/pages/NotFound404";
export { SpinnerCircule } from "../shared/ui/Spinner";

//Vistas comunes
//export {default as CentroNotificaciones} from "../shared/pages/common/CentroNotificaciones";
export {default as PerfilUsuario} from "../shared/pages/common/PerfilUsuario";

// Router
export { ProtectedRoute } from "./ProtectedRoute";

// Lazy Imports - Layouts
export const AuditorLayout = lazy(() => import("../modules/auditor/components/layout/AuditorLayout"));
export const AdminLayout = lazy(() => import("../modules/administrador/components/layout/AdminLayout"));


// Lazy Imports - Admin
export const AdminDashboardPage = lazy(() => import("../modules/administrador/pages/AdminDashboardPage"));
export const UsersManagementPage = lazy(() => import("../modules/administrador/pages/UsersManagementPage"));
export const EntitiesManagementPage = lazy(() => import("../modules/administrador/pages/EntitiesManagementPage"));
export const RequestTypesPage = lazy(() => import("../modules/administrador/pages/RequestTypesPage"));
export const AccountsManagementPage = lazy(() => import("../modules/administrador/pages/CuentaAdminPage"));

// Lazy Imports - Auditor
export const ResumenGeneralPage = lazy(() => import("../modules/auditor/pages/ResumenGeneralPage"));
export const FiltrosAvanzadosPage = lazy(() => import("../modules/auditor/pages/FiltrosAvanzadosPage"));
export const ListaCorreoPage = lazy(() => import("../modules/auditor/pages/ListaCorreosPage"));



