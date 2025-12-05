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

// Router
export { ProtectedRoute } from "./ProtectedRoute";

// Páginas de Tracking
export { default as AdminPanelPage } from "../tracking/pages/AdminPanelPage";

// Lazy Imports - Layouts
export const TrackingLayout = lazy(() => import("../tracking/components/layout/TrackingLayout"));
export const DashBoard = lazy(() => import("../tracking/pages/DashBoard"));
export const IntegradorLayout = lazy(() => import("../modules/integrador/components/layout/IntegradorLayout"));
export const GestorLayout = lazy(() => import("../modules/gestor/components/layout/GestorLayout"));
export const RevisorLayout = lazy(() => import("../modules/revisor/components/layout/RevisorLayout"));
export const AprobadorLayout = lazy(() => import("../modules/aprobador/components/layout/AprobadorLayout"));
export const AuditorLayout = lazy(() => import("../modules/auditor/components/layout/AuditorLayout"));

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

// Lazy Imports - Gestor
export const GestorDashboardPage = lazy(() => import("../modules/gestor/pages/GestorDashboardPage"));
export const GestorEmailDetailPage = lazy(() => import("../modules/gestor/pages/GestorEmailDetailPage"));
export const TemplatesPage = lazy(() => import("../modules/gestor/pages/TemplatesPage"));
export const WorkflowTrackingPage = lazy(() => import("../modules/gestor/pages/WorkflowTrackingPage"));

// Lazy Imports - Revisor
export const RevisorDashboardPage = lazy(() => import("../modules/revisor/pages/RevisorDashboardPage"));
export const ReviewHistoryPage = lazy(() => import("../modules/revisor/pages/ReviewHistoryPage"));
export const EmailDetailPage = lazy(() => import("../modules/revisor/pages/ReviewDetailPage"));

// Lazy Imports - Aprobador
export const AprobadorDashboardPage = lazy(() => import("../modules/aprobador/pages/AprobadorDashboardPage"));
export const AprobadorHistoryPage = lazy(() => import("../modules/aprobador/pages/AprobadorHistoryPage"));
export const AprobadorDetailPage = lazy(() => import("../modules/aprobador/pages/AprobadorDetailPage"));

// Lazy Imports - Auditor
export const AuditorDashboardPage = lazy(() => import("../modules/auditor/pages/AuditorDashboardPage"));
export const AuditorTableroPage = lazy(() => import("../modules/auditor/pages/AuditorTableroPage"));
export const ExportacionComparticionPage = lazy(() => import("../modules/auditor/pages/ExportacionPage"));
export const AnalisisTiemposPage = lazy(() => import("../modules/auditor/pages/AnalisisTiemposPage"));
export const AuditorCumplimientoPage = lazy(() => import("../modules/auditor/pages/AuditorCumplimientoPage"));
export const ReportesEntidadPage = lazy(() => import("../modules/auditor/pages/ReportesEntidadPage"));
export const ReporteGestorPage = lazy(() => import("../modules/auditor/pages/ReportesGestorPage"));
