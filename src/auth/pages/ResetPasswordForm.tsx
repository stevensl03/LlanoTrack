import { useState } from "react";
// Inline SVG icons to avoid missing lucide-react dependency
const Eye = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const Check = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Circle = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Reglas para validar la contraseña
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isValidPassword =
    validations.length && validations.uppercase && validations.number;
  const match = password === confirm && confirm.length > 0;

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm rounded-xl">
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Crear Nueva Contraseña
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Elige una nueva contraseña para tu cuenta.
        </p>

        {/* Input Nueva contraseña */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nueva Contraseña
        </label>
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Introduce tu nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Input Confirmar contraseña */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar Nueva Contraseña
        </label>
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Confirma tu nueva contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Indicadores de validación */}
        <div className="space-y-2 mb-6">
          <ValidationItem isValid={validations.length} label="Mínimo 8 caracteres" />
          <ValidationItem isValid={validations.uppercase} label="Una letra mayúscula" />
          <ValidationItem isValid={validations.number} label="Un número" />
        </div>

        {/* Botón */}
        <button
          disabled={!isValidPassword || !match}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            isValidPassword && match
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Restablecer Contraseña
        </button>
      </div>
    </div>
  );
}

// ---- Componente pequeño para los checks ----
function ValidationItem({ isValid, label }: { isValid: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <Check className="text-green-500 w-4 h-4" />
      ) : (
        <Circle className="text-gray-400 w-4 h-4" />
      )}
      <span className={isValid ? "text-green-600" : "text-gray-600"}>
        {label}
      </span>
    </div>
  );
}
