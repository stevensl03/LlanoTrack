import { Link } from "react-router";

const NotFound404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-blue-100 text-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md animate-fade-in">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-500 mb-8">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>

        <Link
          to="/auth"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow transition-all duration-200 hover:scale-105"
        >
          Ir al inicio de sesión
        </Link>
      </div>

      <p className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Llanogas — Todos los derechos reservados
      </p>
    </div>
  );
};

export default NotFound404;
