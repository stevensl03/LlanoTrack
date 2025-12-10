// /pages/RequestTypesPage/RequestTypesPage.tsx
import React, { useState, useEffect } from 'react';
import { useTipoSolicitud } from '../../../shared/hooks/useTipoSolicitud';

const RequestTypesPage: React.FC = () => {
  const {
    tiposSolicitud,
    loading,
    error,
    cargarTipos,
    crear,
    actualizar,
    eliminar,
    clearError
  } = useTipoSolicitud();

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<{ id: number; nombre: string } | null>(null);
  const [modalNombre, setModalNombre] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cargar tipos al montar
  useEffect(() => {
    cargarTipos();
  }, []);

  // Filtrar por término de búsqueda
  const filteredTypes = tiposSolicitud.filter(tipo =>
    tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const typeToDelete = tiposSolicitud.find(t => t.id === id);
    
    if (!typeToDelete) return;

    if (window.confirm(`¿Está seguro de eliminar el tipo "${typeToDelete.nombre}"?`)) {
      try {
        await eliminar(id);
        setSuccessMessage(`Tipo "${typeToDelete.nombre}" eliminado correctamente`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err: any) {
        // El error ya es manejado por el hook
      }
    }
  };

  const handleEdit = (type: { id: number; nombre: string }) => {
    setEditingType(type);
    setModalNombre(type.nombre);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!modalNombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    try {
      if (editingType) {
        await actualizar(editingType.id, { nombre: modalNombre });
        setSuccessMessage(`Tipo "${modalNombre}" actualizado correctamente`);
      } else {
        await crear({ nombre: modalNombre });
        setSuccessMessage(`Tipo "${modalNombre}" creado correctamente`);
      }
      
      setTimeout(() => setSuccessMessage(null), 3000);
      handleCloseModal();
    } catch (err) {
      // El error ya es manejado por el hook
    }
  };

  const handleAddNew = () => {
    setEditingType(null);
    setModalNombre('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingType(null);
    setModalNombre('');
    clearError();
  };

  // Mostrar estados de carga
  if (loading && tiposSolicitud.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-gray-600">Cargando tipos de solicitud...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            📝 Gestión de Tipos de Solicitud
          </h1>
          <p className="text-gray-600">
            Administra los diferentes tipos de solicitud que pueden recibirse por correo
          </p>
        </div>

        {/* Contador simple */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total de Tipos Registrados</div>
              <div className="text-3xl font-bold text-gray-800">{tiposSolicitud.length}</div>
            </div>
            <div className="text-blue-600">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y acciones */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar tipo de solicitud..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading}
                />
                <div className="absolute left-4 top-3.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm hover:shadow"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Tipo
            </button>
          </div>
          
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-500">
              Buscando por: "{searchTerm}"
            </p>
          )}
        </div>

        {/* Mensajes */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Tabla simplificada */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nombre del Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTypes.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-500 mb-1">
                          {searchTerm 
                            ? 'No se encontraron tipos con ese nombre' 
                            : 'No hay tipos de solicitud registrados'
                          }
                        </p>
                        <p className="text-sm text-gray-400">
                          {!searchTerm && 'Comienza creando tu primer tipo de solicitud'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTypes.map((tipo) => (
                    <tr key={tipo.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          #{tipo.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {tipo.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEdit(tipo)}
                            className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 hover:border-blue-400 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
                            disabled={loading}
                            title="Editar tipo"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(tipo.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 hover:border-red-400 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
                            disabled={loading}
                            title="Eliminar tipo"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-4 px-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Mostrando {filteredTypes.length} de {tiposSolicitud.length} tipos
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        </div>

        {/* Modal simplificado */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {editingType ? '✏️ Editar Tipo' : '➕ Nuevo Tipo de Solicitud'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {editingType 
                    ? 'Modifica el nombre del tipo de solicitud existente'
                    : 'Define un nuevo tipo para clasificar los correos entrantes'
                  }
                </p>
              </div>
              
              <div className="px-6 py-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Tipo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Derecho de Petición, Tutela, Consulta..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition duration-200"
                    value={modalNombre}
                    onChange={(e) => setModalNombre(e.target.value)}
                    disabled={loading}
                    autoFocus
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    El nombre debe ser único y descriptivo (máx. 50 caracteres)
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                    disabled={loading || !modalNombre.trim()}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingType ? 'Actualizando...' : 'Creando...'}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d={editingType ? "M5 13l4 4L19 7" : "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"} />
                        </svg>
                        {editingType ? 'Actualizar' : 'Crear'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Acerca de los tipos de solicitud</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Los tipos de solicitud ayudan a categorizar y organizar los correos entrantes.</p>
                <p>• Cada tipo puede ser asignado a múltiples correos para facilitar el seguimiento.</p>
                <p>• No se pueden eliminar tipos que tengan correos asociados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTypesPage;