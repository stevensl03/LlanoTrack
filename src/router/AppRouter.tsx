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
  SelectionPage,
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
  ActivityHistoryPage
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
          <Route index element={<SelectionPage />} />
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
          <Route index element={<SelectionPage />} />
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
          <Route index element={<SelectionPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/usersConfig" element={<UsersManagementPage />} />
          <Route path="/admin/activityHistory" element={<ActivityHistoryPage />} />
          <Route path="/admin/alertsConfig" element={<AlertsConfigurationPage />} />
          <Route path="/admin/entitiesConfig" element={<EntitiesManagementPage />} />
          <Route path="/admin/requestTypesConfig" element={<RequestTypesPage />} />
          <Route path="/admin/responseTime" element={<ResponseTimesPage />} />
        </Route>

        {/* Rutas generales */}
        <Route path="/not-found-404" element={<NotFound404 />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/not-found-404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;