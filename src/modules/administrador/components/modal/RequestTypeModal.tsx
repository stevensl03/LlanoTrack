// /pages/RequestTypesPage/components/RequestTypeModal.tsx
import React, { useState, useEffect } from 'react';
import type { RequestTypeModalProps, RequestType, RequestTypeFormData } from '../../types';

const URGENCY_LEVELS = ['BAJA', 'MEDIA', 'ALTA'] as const;

const RequestTypeModal: React.FC<RequestTypeModalProps> = ({ 
  requestType, 
  onSave, 
  onClose, 
  loading 
}) => {
  const [formData, setFormData] = useState<RequestTypeFormData>({
    tipo: '',
    plazoDias: 15,
    urgencia: 'MEDIA',
    descripcion: '',
    activo: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inicializar formulario cuando cambia requestType
  useEffect(() => {
    if (requestType) {
      setFormData({
        tipo: requestType.nombre,
        plazoDias: requestType.plazoDiasPromedio || 15,
        urgencia: requestType.urgencia,
        descripcion: requestType.descripcion,
        activo: requestType.activo,
      });
    } else {
      setFormData({
        tipo: '',
        plazoDias: 15,
        urgencia: 'MEDIA',
        descripcion: '',
        activo: true,
      });
    }
    setErrors({});
  }, [requestType]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.tipo.trim()) {
      newErrors.tipo = 'El nombre del tipo es requerido';
    } else if (formData.tipo.length > 50) {
      newErrors.tipo = 'El nombre no puede tener más de 50 caracteres';
    }

    if (formData.plazoDias < 1 || formData.plazoDias > 365) {
      newErrors.plazoDias = 'El plazo debe estar entre 1 y 365 días';
    }

    if (formData.descripcion && formData.descripcion.length > 500) {
      newErrors.descripcion = 'La descripción no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const getUrgencyDescription = (urgency: string): string => {
    switch (urgency) {
      case 'ALTA': return 'Plazo de respuesta corto (1-5 días)';
      case 'MEDIA': return 'Plazo de respuesta moderado (6-15 días)';
      case 'BAJA': return 'Plazo de respuesta extendido (16+ días)';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {requestType ? '✏️ Editar Tipo de Solicitud' : '➕ Nuevo Tipo de Solicitud'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={loading}
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            {/* Nombre del tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Tipo *
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                  errors.tipo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Derecho de Petición, Tutela, Consulta..."
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                disabled={loading}
              />
              {errors.tipo && (
                <p className="mt-1 text-sm text-red-600">{errors.tipo}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Nombre descriptivo del tipo de solicitud
              </p>
            </div>

            {/* Plazo de respuesta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plazo de Respuesta (días) *
              </label>
              <input
                type="number"
                min="1"
                max="365"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                  errors.plazoDias ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.plazoDias}
                onChange={(e) => setFormData({ ...formData, plazoDias: parseInt(e.target.value) || 1 })}
                disabled={loading}
              />
              {errors.plazoDias && (
                <p className="mt-1 text-sm text-red-600">{errors.plazoDias}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Número de días hábiles para responder la solicitud
              </p>
            </div>

            {/* Nivel de urgencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nivel de Urgencia *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {URGENCY_LEVELS.map((level) => (
                  <label
                    key={level}
                    className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                      formData.urgencia === level
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={level}
                      checked={formData.urgencia === level}
                      onChange={(e) => setFormData({ ...formData, urgencia: e.target.value as any })}
                      className="sr-only"
                      disabled={loading}
                    />
                    <span className={`text-sm font-medium ${
                      formData.urgencia === level ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {level}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 text-center">
                      {getUrgencyDescription(level)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción (Opcional)
              </label>
              <textarea
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                  errors.descripcion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Descripción detallada del tipo de solicitud, propósito y características..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                disabled={loading}
              />
              {errors.descripcion && (
                <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
              )}
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Máximo 500 caracteres
                </p>
                <p className="text-xs text-gray-500">
                  {formData.descripcion?.length || 0}/500
                </p>
              </div>
            </div>

            {/* Estado (solo para edición) */}
            {requestType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <div className="flex items-center p-3 border border-gray-300 rounded-md">
                  <input
                    type="checkbox"
                    id="activo"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    disabled={loading}
                  />
                  <label htmlFor="activo" className="ml-3 flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      Tipo activo
                    </span>
                    <span className="block text-sm text-gray-500">
                      {formData.activo 
                        ? 'Este tipo de solicitud estará disponible para asignar a nuevos correos'
                        : 'Este tipo de solicitud no estará disponible para nuevos correos'
                      }
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer del modal */}
          <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  {requestType ? 'Actualizar' : 'Crear'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestTypeModal;