// /pages/RequestTypesPage/components/RequestTypeTable.tsx
import React from 'react';
import type { RequestTypeTableProps } from '../../types';

const RequestTypeTable: React.FC<RequestTypeTableProps> = ({
  requestTypes,
  onEdit,
  onDelete,
  loading
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'ALTA': return 'bg-red-100 text-red-800';
      case 'MEDIA': return 'bg-yellow-100 text-yellow-800';
      case 'BAJA': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (activo: boolean, totalCorreos: number) => {
    if (!activo) return 'bg-red-100 text-red-800';
    if (totalCorreos === 0) return 'bg-gray-100 text-gray-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (activo: boolean, totalCorreos: number) => {
    if (!activo) return 'Inactivo';
    if (totalCorreos === 0) return 'Sin uso';
    return 'Activo';
  };

  const formatDays = (days: number | null) => {
    if (days === null || days === 0) return 'No definido';
    return `${days} días`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES');
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Solicitud
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plazo Promedio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rango de Plazos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Urgencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estadísticas
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
            {requestTypes.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No hay tipos de solicitud registrados
                </td>
              </tr>
            ) : (
              requestTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {type.nombre}
                      </div>
                      {type.descripcion && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {type.descripcion}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDays(type.plazoDiasPromedio)}
                    </div>
                    {type.tiempoPromedioRespuestaReal && (
                      <div className="text-xs text-gray-500">
                        Respuesta real: {type.tiempoPromedioRespuestaReal.toFixed(1)} días
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {type.plazoDiasMinimo && type.plazoDiasMaximo ? (
                        <>
                          <span className="font-medium">{type.plazoDiasMinimo}</span>
                          <span className="mx-1">-</span>
                          <span className="font-medium">{type.plazoDiasMaximo}</span>
                          <span className="ml-1">días</span>
                        </>
                      ) : (
                        'No definido'
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(type.urgencia)}`}>
                      {type.urgencia}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>Total: <strong>{formatNumber(type.totalCorreos)}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>Pendientes: {formatNumber(type.correosPendientes)}</span>
                        <span>•</span>
                        <span>Respondidos: {formatNumber(type.correosRespondidos)}</span>
                        <span>•</span>
                        <span>Vencidos: {formatNumber(type.correosVencidos)}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusColor(type.activo, type.totalCorreos)
                    }`}>
                      {getStatusText(type.activo, type.totalCorreos)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => onEdit(type)}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors duration-200"
                      disabled={loading}
                      title="Editar tipo de solicitud"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(Number(type.id))}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors duration-200"
                      disabled={loading || type.totalCorreos > 0}
                      title={type.totalCorreos > 0 ? "No se puede eliminar porque tiene correos asociados" : "Eliminar tipo de solicitud"}
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
    </div>
  );
};

export default RequestTypeTable;