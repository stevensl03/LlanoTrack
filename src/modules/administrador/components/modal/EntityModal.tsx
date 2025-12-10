// src/pages/EntityManagement/components/modal/EntityModal.tsx
import React, { useState } from 'react';
import type { EntidadResponse } from '../../../../shared/types/cuentaEntidadType';

interface EntidadFormData {
  nombreEntidad: string;
  dominioCorreo: string;
}

interface EntityModalProps {
  entity: EntidadResponse | null;
  onSave: (entityData: EntidadFormData) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

const EntityModal: React.FC<EntityModalProps> = ({ 
  entity, 
  onSave, 
  onClose, 
  loading = false 
}) => {
  const [formData, setFormData] = useState<EntidadFormData>({
    nombreEntidad: entity?.nombreEntidad || '',
    dominioCorreo: entity?.dominioCorreo || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombreEntidad.trim()) {
      newErrors.nombreEntidad = 'El nombre de la entidad es requerido';
    } else if (formData.nombreEntidad.trim().length < 3) {
      newErrors.nombreEntidad = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.dominioCorreo.trim()) {
      newErrors.dominioCorreo = 'El dominio de correo es requerido';
    } else if (!isValidDomain(formData.dominioCorreo)) {
      newErrors.dominioCorreo = 'Formato de dominio inválido (ej: ejemplo.com)';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      await onSave(formData);
    }
  };

  const isValidDomain = (domain: string): boolean => {
    // Validación simple de dominio
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
  };

  const handleInputChange = (field: keyof EntidadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {entity ? '✏️ Editar Entidad' : '🏢 Nueva Entidad'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="px-6 py-4 space-y-4 flex-grow">
            {/* Campo: Nombre de Entidad */}
            <div>
              <label htmlFor="nombreEntidad" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Entidad *
              </label>
              <input
                id="nombreEntidad"
                type="text"
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.nombreEntidad ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.nombreEntidad}
                onChange={(e) => handleInputChange('nombreEntidad', e.target.value)}
                disabled={loading}
                placeholder="Ej: Universidad de los Llanos"
                maxLength={100}
              />
              {errors.nombreEntidad && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.nombreEntidad}
                </p>
              )}
            </div>

            {/* Campo: Dominio de Correo */}
            <div>
              <label htmlFor="dominioCorreo" className="block text-sm font-medium text-gray-700 mb-1">
                Dominio de Correo *
              </label>
              <input
                id="dominioCorreo"
                type="text"
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.dominioCorreo ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.dominioCorreo}
                onChange={(e) => handleInputChange('dominioCorreo', e.target.value)}
                disabled={loading}
                placeholder="Ej: unillanos.edu.co (sin @)"
                maxLength={100}
              />
              {errors.dominioCorreo && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.dominioCorreo}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Los correos de las cuentas de esta entidad terminarán con @{formData.dominioCorreo || 'dominio.com'}
              </p>
            </div>

            {/* Información adicional si es edición */}
            {entity && (
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                <p className="text-sm text-blue-800 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <strong>Información:</strong> Esta entidad tiene el ID {entity.id} y cuenta con {entity.totalCuentas || 0} cuentas asociadas.
                </p>
              </div>
            )}

            {/* Nota informativa */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Nota:</strong> Las entidades representan organizaciones que tienen cuentas de correo asociadas.
                Al crear una entidad, podrás agregar cuentas de correo que pertenezcan a este dominio.
              </p>
            </div>
          </div>

          {/* Footer del modal con botones */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !formData.nombreEntidad.trim() || !formData.dominioCorreo.trim()}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md flex items-center justify-center min-w-[120px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                loading || !formData.nombreEntidad.trim() || !formData.dominioCorreo.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  {entity ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Actualizar
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Crear Entidad
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityModal;