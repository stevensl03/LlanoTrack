import { useNavigate } from "react-router";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
        <div className="text-blue-500 text-7xl font-bold mb-4">404</div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Página no encontrada
            </h2>
            <p className="text-gray-600">
              La página que buscas no existe o no tienes acceso.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGoBack}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Volver al inicio
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              Si crees que esto es un error, contacta al administrador.
            </p>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Llanogas
      </p>
    </div>
  );
};
console.log("Historial length:", window.history.length);
console.log("Document referrer:", document.referrer);
console.log("Puede volver atrás:", window.history.length > 1);
export default NotFound404;