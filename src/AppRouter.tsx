import { lazy, Suspense, type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthLayout from "./auth/layout/AuthLayout";
import LoginPage from "./auth/pages/LoginPage";
import NotFound404 from "./NotFound404";
import TwoFactorPage from "./auth/pages/TwoFactorPage";
import ForgotPasswordPage from "./auth/pages/ForgotPasswordPage";


const Spinner = ():JSX.Element => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100/75 z-50">
      {/* El Spinner de Tailwind CSS (Ahora más grande) */}
      <div className="w-16 h-16 rounded-full border-8 border-t-8 border-blue-600 border-t-transparent animate-spin"></div>
    </div>
  );
};

{/*Lazy Loading de los componentes */}
const TrackingLayout = lazy(() => import("./tracking/layout/TrackingLayout"));
const DashBoard = lazy(() => import("./tracking/pages/DashBoard"));


const AppRouter = () => {
  return (
    <BrowserRouter>

      {/* Rutas para el layout de autenticación */}
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/two-factor" element={<TwoFactorPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Rutas para el layout de seguimiento de correos*/}
        <Route path="/tracking" element={
          <Suspense fallback={<Spinner />}>
            <TrackingLayout />
          </Suspense>
        } >
          <Route index element={<DashBoard />} />
        </Route> 

        {/* Ruta para cuando no se encuentre la página  y otros redirecionamientos*/}
        <Route path="/not-found-404" element={<NotFound404 />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/not-found-404" />} /> 
        
      </Routes>
    </BrowserRouter>

  );
};

export default AppRouter;