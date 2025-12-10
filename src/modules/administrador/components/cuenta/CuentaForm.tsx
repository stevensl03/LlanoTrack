// src/components/cuentas/CuentaForm.tsx
import React, { useState, useEffect } from 'react';
import type { CuentaCrearRequest, CuentaActualizarRequest, EntidadResponse } from '../../../../shared/types/cuentaEntidadType';

interface CuentaFormProps {
  entidades: EntidadResponse[];
  cuentaExistente?: {
    id: number;
    nombreCuenta: string;
    correoCuenta: string;
    entidadId: number;
  };
  onSubmit: (data: CuentaCrearRequest | CuentaActualizarRequest) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

const CuentaForm: React.FC<CuentaFormProps> = ({
  entidades,
  cuentaExistente,
  onSubmit,
  onClose,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    nombreCuenta: cuentaExistente?.nombreCuenta || '',
    correoCuenta: cuentaExistente?.correoCuenta || '',
    entidadId: cuentaExistente?.entidadId || (entidades.length > 0 ? entidades[0].id : 0),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dominioSeleccionado, setDominioSeleccionado] = useState('');

  // Actualizar dominio cuando cambia la entidad seleccionada
  useEffect(() => {
    const entidad = entidades.find(e => e.id === formData.entidadId);
    if (entidad) {
      setDominioSeleccionado(entidad.dominioCorreo);
    }
  }, [formData.entidadId, entidades]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombreCuenta.trim()) {
      newErrors.nombreCuenta = 'El nombre de la cuenta es requerido';
    }
    
    if (!formData.correoCuenta.trim()) {
      newErrors.correoCuenta = 'El correo es requerido';
    } else if (!isValidEmail(formData.correoCuenta)) {
      newErrors.correoCuenta = 'Formato de correo inválido';
    } else {
      // Validar que el correo termine con el dominio de la entidad seleccionada
      const entidad = entidades.find(e => e.id === formData.entidadId);
      if (entidad && !formData.correoCuenta.endsWith(`@${entidad.dominioCorreo}`)) {
        newErrors.correoCuenta = `El correo debe terminar con @${entidad.dominioCorreo}`;
      }
    }
    
    if (!formData.entidadId) {
      newErrors.entidadId = 'Debe seleccionar una entidad';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      if (cuentaExistente) {
        // Para actualizar
        const updateData: CuentaActualizarRequest = {
          nombreCuenta: formData.nombreCuenta,
          correoCuenta: formData.correoCuenta,
          entidadId: formData.entidadId,
        };
        await onSubmit(updateData);
      } else {
        // Para crear
        const createData: CuentaCrearRequest = {
          nombreCuenta: formData.nombreCuenta,
          correoCuenta: formData.correoCuenta,
          entidadId: formData.entidadId,
        };
        await onSubmit(createData);
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {cuentaExistente ? '✏️ Editar Cuenta' : '👤 Crear Nueva Cuenta'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            {/* Campo: Nombre de la cuenta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.nombreCuenta ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.nombreCuenta}
                onChange={(e) => handleInputChange('nombreCuenta', e.target.value)}
                disabled={loading}
                placeholder="Ej: Juan Pérez"
                maxLength={100}
              />
              {errors.nombreCuenta && (
                <p className="mt-1 text-sm text-red-600">{errors.nombreCuenta}</p>
              )}
            </div>

            {/* Campo: Entidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entidad *
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.entidadId ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.entidadId}
                onChange={(e) => handleInputChange('entidadId', Number(e.target.value))}
                disabled={loading}
              >
                <option value={0}>Seleccione una entidad</option>
                {entidades.map((entidad) => (
                  <option key={entidad.id} value={entidad.id}>
                    {entidad.nombreEntidad} (@{entidad.dominioCorreo})
                  </option>
                ))}
              </select>
              {errors.entidadId && (
                <p className="mt-1 text-sm text-red-600">{errors.entidadId}</p>
              )}
              {dominioSeleccionado && (
                <p className="mt-1 text-xs text-blue-600">
                  Los correos deben terminar con: @{dominioSeleccionado}
                </p>
              )}
            </div>

            {/* Campo: Correo electrónico */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico *
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  className={`flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.correoCuenta ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.correoCuenta}
                  onChange={(e) => handleInputChange('correoCuenta', e.target.value)}
                  disabled={loading}
                  placeholder="ejemplo@dominio.com"
                  maxLength={100}
                />
                {dominioSeleccionado && (
                  <button
                    type="button"
                    onClick={() => {
                      // Extraer nombre de usuario si ya tiene correo
                      const username = formData.correoCuenta.split('@')[0] || '';
                      handleInputChange('correoCuenta', username + '@' + dominioSeleccionado);
                    }}
                    className="ml-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Auto completar
                  </button>
                )}
              </div>
              {errors.correoCuenta && (
                <p className="mt-1 text-sm text-red-600">{errors.correoCuenta}</p>
              )}
              {dominioSeleccionado && formData.correoCuenta && !formData.correoCuenta.includes('@') && (
                <p className="mt-1 text-xs text-gray-500">
                  Sugerencia: {formData.correoCuenta}@{dominioSeleccionado}
                </p>
              )}
            </div>

            {/* Información adicional */}
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Información:</strong> 
                {cuentaExistente 
                  ? ` Esta cuenta tiene el ID ${cuentaExistente.id} y pertenece a la entidad seleccionada.`
                  : ' La nueva cuenta se asociará automáticamente a la entidad seleccionada.'
                }
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md flex items-center ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : cuentaExistente ? (
                'Actualizar Cuenta'
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CuentaForm;