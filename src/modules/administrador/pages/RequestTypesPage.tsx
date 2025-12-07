import React, { useState, useEffect } from 'react';
import { useMockService } from '../../../shared/hooks/useMockService';
import type { RequestType, RequestTypeFormData } from '../types/index';

const RequestTypesPage: React.FC = () => {
  // Usar el hook del servicio
  const { 
    getRequestTypes, 
    createRequestType, 
    updateRequestType, 
    deleteRequestType, 
    loading, 
    error 
  } = useMockService();

  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<RequestType | null>(null);

  // Cargar tipos de solicitud al montar el componente
  useEffect(() => {
    loadRequestTypes();
  }, []);

  const loadRequestTypes = async () => {
    const response = await getRequestTypes();
    if (response.success && response.data) {
      setRequestTypes(response.data);
    }
  };

  const filteredTypes = requestTypes.filter(type =>
    type.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este tipo de solicitud?')) {
      const response = await deleteRequestType(id);
      if (response.success) {
        await loadRequestTypes(); // Recargar la lista
      }
    }
  };

  const handleEdit = (type: RequestType) => {
    setEditingType(type);
    setShowModal(true);
  };

  const handleSave = async (typeData: RequestTypeFormData) => {
    if (editingType) {
      // Actualizar tipo existente
      const response = await updateRequestType(editingType.id, typeData);
      if (response.success) {
        await loadRequestTypes();
      }
    } else {
      // Crear nuevo tipo
      const response = await createRequestType(typeData);
      if (response.success) {
        await loadRequestTypes();
      }
    }
    setShowModal(false);
    setEditingType(null);
  };

  const handleAddNew = () => {
    setEditingType(null);
    setShowModal(true);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'ALTA': return 'bg-red-100 text-red-800';
      case 'MEDIA': return 'bg-yellow-100 text-yellow-800';
      case 'BAJA': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const urgencyLevels = ['BAJA', 'MEDIA', 'ALTA'] as const;

  if (loading && requestTypes.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando tipos de solicitud...</div>
      </div>
    );
  }

  if (error && requestTypes.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📝 Gestión de Tipos de Solicitud</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <span className="mr-2">+</span> Nuevo Tipo
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por tipo o descripción..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Solicitud
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plazo (días)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Urgencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTypes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No se encontraron tipos con ese criterio' : 'No hay tipos de solicitud registrados'}
                </td>
              </tr>
            ) : (
              filteredTypes.map((type) => (
                <tr key={type.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{type.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{type.plazoDias} días</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(type.urgencia)}`}>
                      {type.urgencia}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate" title={type.descripcion}>
                      {type.descripcion || 'Sin descripción'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      type.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {type.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(type)}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar tipo de solicitud */}
      {showModal && (
        <RequestTypeModal
          requestType={editingType}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingType(null);
          }}
          urgencyLevels={urgencyLevels}
          loading={loading}
        />
      )}
    </div>
  );
};

interface RequestTypeModalProps {
  requestType: RequestType | null;
  onSave: (typeData: RequestTypeFormData) => void;
  onClose: () => void;
  urgencyLevels: readonly string[];
  loading?: boolean;
}

const RequestTypeModal: React.FC<RequestTypeModalProps> = ({ 
  requestType, 
  onSave, 
  onClose, 
  urgencyLevels, 
  loading 
}) => {
  const [formData, setFormData] = useState<RequestTypeFormData>({
    tipo: requestType?.tipo || '',
    plazoDias: requestType?.plazoDias || 1,
    urgencia: requestType?.urgencia || 'MEDIA',
    descripcion: requestType?.descripcion || '',
    activo: requestType?.activo ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {requestType ? 'Editar Tipo de Solicitud' : 'Nuevo Tipo de Solicitud'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Solicitud *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="Ej: Derecho de Petición"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plazo de Respuesta (días) *
              </label>
              <input
                type="number"
                min="1"
                max="365"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={formData.plazoDias}
                onChange={(e) => setFormData({ ...formData, plazoDias: parseInt(e.target.value) || 1 })}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Número de días hábiles para responder
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nivel de Urgencia *
              </label>
              <div className="flex space-x-4">
                {urgencyLevels.map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value={level}
                      checked={formData.urgencia === level}
                      onChange={(e) => setFormData({ ...formData, urgencia: e.target.value as any })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                      disabled={loading}
                    />
                    <span className="ml-2 text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción (Opcional)
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="Descripción detallada del tipo de solicitud..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                disabled={loading}
              />
            </div>

            {requestType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    disabled={loading}
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Tipo activo
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Guardando...' : requestType ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestTypesPage;