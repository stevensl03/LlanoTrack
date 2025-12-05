// pages/RevisorDashboard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import ReviewModal from '../components/modal/ReviewModal';

interface ReviewStatsData {
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

interface PendingReview {
  id: string;
  subject: string;
  entity: string;
  assignedDate: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
}

const RevisorDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<ReviewStatsData>({
    pending: 5,
    inProgress: 2,
    completed: 12,
    overdue: 1
  });

  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
    {
      id: 'REV-001',
      subject: 'Solicitud de información contractual - Proceso 2025-001',
      entity: 'Ministerio de Hacienda',
      assignedDate: '2025-11-25',
      daysLeft: 3,
      priority: 'high'
    },
    {
      id: 'REV-002',
      subject: 'Consulta sobre normativa técnica',
      entity: 'Ministerio de Transporte',
      assignedDate: '2025-11-26',
      daysLeft: 5,
      priority: 'medium'
    },
    {
      id: 'REV-003',
      subject: 'Requerimiento de documentación',
      entity: 'Procuraduría General',
      assignedDate: '2025-11-27',
      daysLeft: 7,
      priority: 'low'
    },
  ]);

  const [selectedReview, setSelectedReview] = useState<PendingReview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      default:
        return '⚫';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleReviewClick = (review: PendingReview) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleCompleteReview = () => {
    // Aquí puedes actualizar el estado para remover la revisión completada
    if (selectedReview) {
      setPendingReviews(prev => prev.filter(r => r.id !== selectedReview.id));
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        completed: prev.completed + 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Panel de Revisor</h1>
              <p className="text-gray-600 mt-1">
                Revise y valide documentos antes de su aprobación final
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/revisor/history"
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <span className="mr-2">📜</span>
                Historial
              </Link>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">🔄</span>
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 text-xl">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">En Progreso</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <span className="text-green-600 text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Vencidos</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.overdue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reviews Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Revisiones Pendientes</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Documentos asignados para su revisión
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Ordenar por: Prioridad</option>
                  <option>Ordenar por: Fecha</option>
                  <option>Ordenar por: Días restantes</option>
                </select>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  🔄
                </button>
              </div>
            </div>
          </div>
          
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
                    Fecha Asignación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Días Restantes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingReviews.map((review) => (
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
                        <span className="mr-2">🏢</span>
                        <p className="text-gray-900">{review.entity}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <p className="text-gray-900">{review.assignedDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        review.daysLeft <= 1 ? 'bg-red-100 text-red-800' :
                        review.daysLeft <= 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        <span className="mr-1">⏱️</span>
                        {review.daysLeft} días
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getPriorityColor(review.priority)}`}>
                        <span className="mr-1">{getPriorityIcon(review.priority)}</span>
                        <span className="capitalize">{review.priority}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReviewClick(review)}
                          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                        >
                          <span className="mr-1">🔍</span>
                          Revisar
                        </button>
                        <Link
                          to={`/revisor/emailDetail/${review.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                        >
                          <span className="mr-1">👁️</span>
                          Detalles
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {pendingReviews.length === 0 && (
              <div className="text-center py-12">
                <span className="text-3xl text-gray-300 mb-4 inline-block">🎉</span>
                <p className="text-gray-500">No hay revisiones pendientes</p>
                <p className="text-sm text-gray-400 mt-1">
                  ¡Excelente trabajo! Todos los documentos han sido revisados
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel de instrucciones */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Proceso Rápido de Revisión</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleReviewClick(pendingReviews[0])}
                disabled={pendingReviews.length === 0}
                className="w-full flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">🔍</span>
                  <div>
                    <p className="font-medium text-blue-900">Revisar el más urgente</p>
                    <p className="text-sm text-blue-700">
                      {pendingReviews.length > 0 
                        ? `${pendingReviews[0].id} - ${pendingReviews[0].entity}`
                        : 'No hay documentos pendientes'
                      }
                    </p>
                  </div>
                </div>
                <span className="text-blue-600">→</span>
              </button>
              
              <Link
                to="/revisor/reviewHistory"
                className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">📜</span>
                  <div>
                    <p className="font-medium text-gray-900">Ver historial completo</p>
                    <p className="text-sm text-gray-600">
                      {stats.completed} revisiones completadas
                    </p>
                  </div>
                </div>
                <span className="text-gray-600">→</span>
              </Link>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📌 Proceso de Revisión</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><strong>Haga clic en "Revisar"</strong> para abrir el modal de revisión</li>
              <li><strong>Descargue los documentos</strong> desde el modal</li>
              <li><strong>Revise el contenido</strong> fuera de la plataforma</li>
              <li><strong>Agregue su firma digital</strong> en el campo "Revisado"</li>
              <li><strong>Regrese al modal</strong> y seleccione una acción</li>
            </ol>
            <div className="mt-4 p-3 bg-white border border-blue-300 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Consejo:</strong> Puede revisar documentos directamente desde la tabla usando el botón "Revisar"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Revisión */}
      {selectedReview && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          review={selectedReview}
        />
      )}
    </div>
  );
};

export default RevisorDashboardPage;