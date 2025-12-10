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
  EntitiesManagementPage,
  RequestTypesPage,
  AdminLayout,
  AdminDashboardPage,
  UsersManagementPage,
  LandingPage,
  DashboardPage,
  TrazabilidadPage,
  AuditorLayout,
  BusquedaGlobal,
 // CentroNotificaciones,
  PerfilUsuario,
  AccountsManagementPage,
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
        {/*Rutas comunes */}
        <Route 
          path="/busqueda" 
          element={
            <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_AUDITOR"]}>
              <BusquedaGlobal />
            </ProtectedRoute>
          } 
        />
        <Route path="/not-found-404"
                element={
                  <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_AUDITOR"]}>
                    <NotFound404 />
                  </ProtectedRoute> 
                }
        />

        {/*
        <Route 
          path="/notificaciones" 
          element={
            <ProtectedRoute>
              <CentroNotificaciones />
            </ProtectedRoute>
          } 
        />
        */}
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_AUDITOR"]}>
              <PerfilUsuario />
            </ProtectedRoute>
          } 
        />

        {/* Rutas para el layout de administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ROLE_ADMIN"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage   />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/usersConfig" element={<UsersManagementPage />} />
          <Route path="/admin/entitiesConfig" element={<EntitiesManagementPage />} />
          <Route path="/admin/requestTypesConfig" element={<RequestTypesPage />} />
          <Route path="/admin/accountsConfig" element={<AccountsManagementPage />} />
        </Route>


        {/* Rutas para el layout de auditor */}
        <Route
          path="/auditor"
          element={
            <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_AUDITOR"]}>
              <Suspense fallback={<SpinnerCircule />}>
                <AuditorLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/auditor/dashboard" element={<DashboardPage />} />
          <Route path="/auditor/trazabilidad/:id" element={<TrazabilidadPage />} />
        </ Route >

        {/* Rutas generales */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/not-found-404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;