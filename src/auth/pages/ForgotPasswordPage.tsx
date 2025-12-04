import { Link, useNavigate } from "react-router";
import { useState } from "react";
//import { generateResetToken, sendResetEmail } from "../../services/auth.service";


const ForgotPasswordPage = () => {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const resetPassword = async (email: string) => {
        if (!email) {
            alert("Por favor, ingresa tu correo electrónico laboral.");
            return;
        }
        {/* if (!email.endsWith("@llanogas.com")) {
            alert("Por favor, ingresa tu correo electrónico laboral.");
            return;
        }*/}

        setLoading(true);
        try {
            // Generar token con expiración de 10 minutos
            //const token = await generateResetToken(email);

            // Enviar correo con el enlace de recuperación
            //await sendResetEmail(email, token);

            alert("Se ha enviado un enlace de recuperación a tu correo. El enlace expira en 10 minutos.");
            navigate("/auth");
        } catch (error) {
            alert("Error al enviar el correo. Por favor, intenta nuevamente.");
            console.error("Reset password error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Logo e Identidad */}
            <div className="flex items-center gap-2 mb-8">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-mail-forward w-8 h-8 text-blue-600"
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
                <span className="text-xl font-semibold text-gray-800">LlanoTrack</span>
            </div>

            {/* Card principal */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Recuperar Contraseña
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Ingresa tu correo electrónico laboral y te enviaremos un enlace para
                    restablecer tu contraseña.
                </p>

                {/* Formulario */}
                <form className="text-left" onSubmit={(e) => {
                    e.preventDefault();
                    resetPassword((e.target as HTMLFormElement).email.value);
                }}>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Correo electrónico laboral
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="tu@empresa.com"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
                    </button>
                </form>
            </div>

            {/* Enlace inferior */}
            <Link
                to="/auth"
                className="mt-6 text-blue-600 hover:underline text-sm font-medium"
            >
                Volver a Iniciar Sesión
            </Link>
        </>
    );
};

export default ForgotPasswordPage;