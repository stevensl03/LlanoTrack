// src/components/cuentas/CuentaFilters.tsx
import React from 'react';
import type { EntidadResponse } from '../../../../shared/types/cuentaEntidadType';

interface CuentaFiltersProps {
  entidades: EntidadResponse[];
  filterEntity: number | 'all';
  loading: boolean;
  onFilterChange: (value: number | 'all') => void;
}

const CuentaFilters: React.FC<CuentaFiltersProps> = ({
  entidades,
  filterEntity,
  loading,
  onFilterChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filtrar por Entidad
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        value={filterEntity}
        onChange={(e) => onFilterChange(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        disabled={loading || entidades.length === 0}
      >
        <option value="all">Todas las entidades</option>
        {entidades.map((entidad) => (
          <option key={entidad.id} value={entidad.id}>
            {entidad.nombreEntidad} ({entidad.totalCuentas || 0} cuentas)
          </option>
        ))}
      </select>
    </div>
  );
};

export default CuentaFilters;