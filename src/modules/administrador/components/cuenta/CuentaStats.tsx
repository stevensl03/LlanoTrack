// src/components/cuentas/CuentaStats.tsx
import React from 'react';

interface CuentaStatsProps {
  totalCuentas: number;
  cuentasFiltradas: number;
  totalEntidades: number;
}

const CuentaStats: React.FC<CuentaStatsProps> = ({
  totalCuentas,
  cuentasFiltradas,
  totalEntidades,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="text-sm text-gray-600">Total Cuentas</div>
        <div className="text-2xl font-bold text-gray-800">{totalCuentas}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="text-sm text-gray-600">Mostrando</div>
        <div className="text-2xl font-bold text-gray-800">{cuentasFiltradas}</div>
        <div className="text-xs text-gray-500 mt-1">
          {totalCuentas === cuentasFiltradas ? 'Todas las cuentas' : 'Cuentas filtradas'}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="text-sm text-gray-600">Entidades</div>
        <div className="text-2xl font-bold text-gray-800">{totalEntidades}</div>
      </div>
    </div>
  );
};

export default CuentaStats;