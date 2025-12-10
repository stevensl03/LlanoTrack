// src/components/cuentas/CuentaTable.tsx
import React from 'react';
import type { CuentaResponse } from '../../../../shared/types/cuentaEntidadType';

interface CuentaTableProps {
  cuentas: CuentaResponse[];
  loading: boolean;
  onEdit: (cuenta: CuentaResponse) => void;
  onDelete: (cuenta: CuentaResponse) => void;
}

const CuentaTable: React.FC<CuentaTableProps> = ({
  cuentas,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading && cuentas.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Cargando cuentas...
      </div>
    );
  }

  if (cuentas.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay cuentas disponibles
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
              Correo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entidad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cuentas.map((cuenta) => (
            <tr key={cuenta.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">#{cuenta.id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{cuenta.nombreCuenta}</div>
              </td>
              <td className="px-6 py-4">
                <a
                  href={`mailto:${cuenta.correoCuenta}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {cuenta.correoCuenta}
                </a>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  <div className="font-medium">{cuenta.nombreEntidad}</div>
                  <div className="text-xs text-gray-500">ID: {cuenta.entidadId}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(cuenta)}
                  className="px-3 py-1 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 disabled:opacity-50"
                  disabled={loading}
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(cuenta)}
                  className="px-3 py-1 text-red-600 bg-red-50 rounded hover:bg-red-100 disabled:opacity-50"
                  disabled={loading}
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

export default CuentaTable;