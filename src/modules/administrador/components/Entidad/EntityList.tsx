// components/EntityList.tsx
import React from 'react';
import type { EntidadResponse } from '../../../../shared/types/cuentaEntidadType';

interface EntityListProps {
  entities: EntidadResponse[];
  loading: boolean;
  onEdit: (entity: EntidadResponse) => void;
  onDelete: (id: number) => void;
  onSelect?: (entity: EntidadResponse) => void;
}

const EntityList: React.FC<EntityListProps> = ({
  entities,
  loading,
  onEdit,
  onDelete,
  onSelect,
}) => {
  if (loading && entities.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Cargando entidades...
        </div>
      </div>
    );
  }

  if (entities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay entidades registradas
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dominio de Correo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cuentas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entities.map((entity) => (
            <tr key={entity.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entity.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entity.nombreEntidad}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{entity.dominioCorreo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {entity.totalCuentas || 0} cuenta(s)
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(entity)}
                  className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(entity.id)}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntityList;