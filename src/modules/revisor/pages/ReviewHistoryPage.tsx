// pages/ReviewHistory.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';

interface CompletedReview {
  id: string;
  subject: string;
  entity: string;
  completedDate: string;
  manager: string;
  daysUsed: number;
  totalDays: number;
  status: 'approved' | 'corrected';
}

const ReviewHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Datos de ejemplo
  const completedReviews: CompletedReview[] = [
    {
      id: 'REV-001',
      subject: 'Consulta técnica sobre especificaciones del proyecto',
      entity: 'Ministerio de Salud',
      completedDate: '2025-11-20',
      manager: 'Carlos Ramírez',
      daysUsed: 2,
      totalDays: 5,
      status: 'approved'
    },
    {
      id: 'REV-002',
      subject: 'Solicitud de documentación legal para contrato',
      entity: 'Procuraduría General',
      completedDate: '2025-11-18',
      manager: 'María González',
      daysUsed: 4,
      totalDays: 7,
      status: 'corrected'
    },
    {
      id: 'REV-003',
      subject: 'Requerimiento de información financiera',
      entity: 'Ministerio de Hacienda',
      completedDate: '2025-11-15',
      manager: 'Jaime Tiuso',
      daysUsed: 3,
      totalDays: 5,
      status: 'approved'
    },
    {
      id: 'REV-004',
      subject: 'Consulta sobre normativa ambiental',
      entity: 'Ministerio de Ambiente',
      completedDate: '2025-11-12',
      manager: 'Ana López',
      daysUsed: 5,
      totalDays: 10,
      status: 'approved'
    },
  ];

  const filteredReviews = completedReviews.filter(review => {
    const matchesSearch = review.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEntity = selectedEntity === 'all' || review.entity === selectedEntity;
    return matchesSearch && matchesEntity;
  });

  const entities = Array.from(new Set(completedReviews.map(r => r.entity)));

  // Paginación
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">📜 Historial de Revisiones</h1>
              <p className="text-gray-600 mt-1">
                Todas las revisiones completadas
              </p>
            </div>
            <Link
              to="/revisor/dashboard"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              ← Volver al panel
            </Link>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Asunto o entidad..."
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filtro por entidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏢 Entidad
              </label>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas las entidades</option>
                {entities.map(entity => (
                  <option key={entity} value={entity}>{entity}</option>
                ))}
              </select>
            </div>

            {/* Botón de exportar */}
            <div className="flex items-end">
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">📥</span>
                Exportar a Excel
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Revisiones Completadas */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID / Asunto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Completada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo Utilizado
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
                {paginatedReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{review.id}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {review.subject}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">🏢</span>
                        <span className="text-gray-900">{review.entity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">📅</span>
                        <span className="text-gray-900">{review.completedDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">⏱️</span>
                        <span className="text-gray-900">
                          {review.daysUsed}/{review.totalDays} días
                          <span className={`ml-2 text-xs ${
                            (review.daysUsed / review.totalDays) <= 0.7 ? 'text-green-600' :
                            (review.daysUsed / review.totalDays) <= 0.9 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            ({Math.round((review.daysUsed / review.totalDays) * 100)}%)
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        review.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status === 'approved' ? '✅ Aprobado' : '🔄 Con correcciones'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/revisor/review/${review.id}`}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          title="Ver detalles"
                        >
                          <span>👁️</span>
                        </Link>
                        <button
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
                          title="Descargar documentos"
                          onClick={() => alert(`Descargando documentos de ${review.id}`)}
                        >
                          <span>📥</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Mensaje sin resultados */}
            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <span className="text-3xl text-gray-300 mb-4 inline-block">📭</span>
                <p className="text-gray-500">No se encontraron revisiones</p>
                <p className="text-sm text-gray-400 mt-1">
                  Intente con otros términos de búsqueda
                </p>
              </div>
            )}
          </div>
          
          {/* Paginación */}
          {filteredReviews.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700 mb-2 sm:mb-0">
                  Mostrando <span className="font-medium">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredReviews.length)}</span> de <span className="font-medium">{filteredReviews.length}</span> revisiones
                </p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Anterior
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded text-sm ${
                        currentPage === page
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumen de métricas */}
        {filteredReviews.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Total revisado</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredReviews.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Tasa de aprobación</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round((filteredReviews.filter(r => r.status === 'approved').length / filteredReviews.length) * 100)}%
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Tiempo promedio</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(filteredReviews.reduce((sum, r) => sum + r.daysUsed, 0) / filteredReviews.length).toFixed(1)} días
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewHistoryPage;