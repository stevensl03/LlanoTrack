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

// Componentes compartidos
export { default as NotFound404 } from "../shared/pages/NotFound404";
export { SpinnerCircule } from "../shared/ui/Spinner";

// Router
export { ProtectedRoute } from "./ProtectedRoute";

// Páginas de Tracking
export { default as AdminPanelPage } from "../tracking/pages/AdminPanelPage";
export { default as SelectionPage } from "../tracking/pages/SelectionPage";

// Lazy Imports - Layouts
export const TrackingLayout = lazy(() => import("../tracking/components/layout/TrackingLayout"));
export const DashBoard = lazy(() => import("../tracking/pages/DashBoard"));
export const IntegradorLayout = lazy(() => import("../modules/integrador/components/layout/IntegradorLayout"));

// Lazy Imports - Integrador
export const InboxPage = lazy(() => import("../modules/integrador/pages/inbox-page"));
export const HistoryPage = lazy(() => import("../modules/integrador/pages/history-page"));

// Lazy Imports - Admin
export const AdminLayout = lazy(() => import("../modules/administrador/components/layout/AdminLayout"));
export const AdminDashboardPage = lazy(() => import("../modules/administrador/pages/AdminDashboardPage"));
export const UsersManagementPage = lazy(() => import("../modules/administrador/pages/UsersManagementPage"));
export const ActivityHistoryPage = lazy(() => import("../modules/administrador/pages/ActivityHistoryPage"));
export const AlertsConfigurationPage = lazy(() => import("../modules/administrador/pages/AlertsConfigurationPage"));
export const EntitiesManagementPage = lazy(() => import("../modules/administrador/pages/EntitiesManagementPage"));
export const RequestTypesPage = lazy(() => import("../modules/administrador/pages/RequestTypesPage"));
export const ResponseTimesPage = lazy(() => import("../modules/administrador/pages/ResponseTimesPage"));