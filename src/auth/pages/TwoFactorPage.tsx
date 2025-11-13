const TwoFactorPage = () => {
return (

        <>
        {/* Icono superior */}
        <div className="flex justify-center mb-6">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-mail-forward w-14 h-14 text-blue-600"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
            <path d="M3 6l9 6l9 -6" />
            <path d="M15 18h6" />
            <path d="M18 15l3 3l-3 3" />
        </svg>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Verificación de Seguridad
        </h1>

        {/* Descripción */}
        <p className="text-gray-500 text-sm mb-8">
        Hemos enviado un código de 6 dígitos a tu correo electrónico.
        Ingrésalo a continuación para completar el inicio de sesión.
        </p>

        {/* Campos de código */}
        <div className="flex justify-center gap-3 mb-6">
        {[...Array(6)].map((_, i) => (
            <input
            key={i}
            type="text"
            maxLength={1}
            className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        ))}
        </div>

        {/* Enlace para reenviar */}
        <p className="text-gray-500 text-sm mb-8">
        ¿No recibiste el código?{" "}
        <button className="text-blue-600 hover:underline font-medium">
            Reenviar
        </button>
        </p>

        {/* Botón principal */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
        Verificar y Continuar
        </button>
        </>
);
};

export default TwoFactorPage;
