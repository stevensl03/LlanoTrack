import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Suspense,
  AuthLayout,
  LoginPage,
  TwoFactorPage,
  ForgotPasswordPage,
  ResetPasswordForm,
  NotFound404,
  SpinnerCircule,
  ProtectedRoute,
  AdminPanelPage,
  InboxPage,
  HistoryPage,
  AlertsConfigurationPage,
  EntitiesManagementPage,
  RequestTypesPage,
  ResponseTimesPage,
  TrackingLayout,
  DashBoard,
  IntegradorLayout,
  AdminLayout,
  AdminDashboardPage,
  UsersManagementPage,
  ActivityHistoryPage,
  GestorLayout,
  GestorDashboardPage,
  GestorEmailDetailPage,
  TemplatesPage,
  WorkflowTrackingPage,
  RevisorLayout,
  RevisorDashboardPage,
  EmailDetailPage,
  ReviewHistoryPage,
  AprobadorLayout,
  AprobadorDashboardPage,
  AprobadorHistoryPage,
  AprobadorDetailPage,
  LandingPage,
  AuditorDashboardPage,
  AuditorTableroPage,
  ExportacionComparticionPage,
  AnalisisTiemposPage,
  AuditorCumplimientoPage,
  ReportesEntidadPage,
  ReporteGestorPage,
  AuditorLayout,
} from "./main";

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Rutas públicas */}
      {/* Rutas para el layout de autenticación */}
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/two-factor" element={<TwoFactorPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
        </Route>
        

        {/* Rutas protegidas */}
        {/* Rutas para el layout de seguimiento de correos*/}
        <Route
          path="/tracking"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA", "manager"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <TrackingLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/tracking/dashboard" element={<DashBoard />} />
          <Route path="/tracking/admin-panel" element={<AdminPanelPage />} />
        </Route>

        {/* Rutas para el layout de integrador */}
        <Route
          path="/integrador"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA", "manager"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <IntegradorLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/integrador/inbox" element={<InboxPage />} />
          <Route path="/integrador/history" element={<HistoryPage />} />
        </Route>

        {/* Rutas para el layout de administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage   />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/usersConfig" element={<UsersManagementPage />} />
          <Route path="/admin/activityHistory" element={<ActivityHistoryPage />} />
          <Route path="/admin/alertsConfig" element={<AlertsConfigurationPage />} />
          <Route path="/admin/entitiesConfig" element={<EntitiesManagementPage />} />
          <Route path="/admin/requestTypesConfig" element={<RequestTypesPage />} />
          <Route path="/admin/responseTime" element={<ResponseTimesPage />} />
        </Route>

        {/* Rutas para el layout de gestor */}
        <Route
          path="/gestor"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA", "manager"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <GestorLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/gestor/dashboard" element={<GestorDashboardPage />} />
          <Route path="/gestor/emailDetail" element={<GestorEmailDetailPage />} />
          <Route path="/gestor/templates" element={<TemplatesPage />} />
          <Route path="/gestor/workflowTracking" element={<WorkflowTrackingPage />} />
        </Route>

        {/* Rutas para el layout de revisor */}
        <Route
          path="/revisor"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA", "manager"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <RevisorLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/revisor/dashboard" element={<RevisorDashboardPage />} />
          <Route path="/revisor/emailDetail/:id" element={<EmailDetailPage />} />
          <Route path="/revisor/reviewHistory" element={<ReviewHistoryPage />} />
        </Route>

        {/* Rutas para el layout de aprobador */}
        <Route
          path="/aprobador"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA", "manager"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <AprobadorLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/aprobador/dashboard" element={<AprobadorDashboardPage />} />
          <Route path="/aprobador/history" element={<AprobadorHistoryPage />} />
          <Route path="/aprobador/detail/:id" element={<AprobadorDetailPage />} />
        </Route>

        {/* Rutas para el layout de auditor */}
        <Route
          path="/auditor"
          element={
            <ProtectedRoute roles={["ADMINISTRADOR_SISTEMA", "manager"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <AuditorLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/auditor/dashboard" element={<AuditorDashboardPage />} />
          <Route path="/auditor/tablero" element={<AuditorTableroPage />} />
          <Route path="/auditor/exportacion" element={<ExportacionComparticionPage />} />
          <Route path="/auditor/analisisTiempos" element={<AnalisisTiemposPage />} />
          <Route path="/auditor/analisisCumplimiento" element={<AuditorCumplimientoPage />} />
          <Route path="/auditor/reportesEntidad" element={<ReportesEntidadPage />} />
          <Route path="/auditor/reporteGestor" element={<ReporteGestorPage />} />
        </ Route >

        {/* Rutas generales */}
        <Route path="/not-found-404" element={<NotFound404 />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/not-found-404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;