// src/components/cuentas/CuentaSearchBar.tsx
import React from 'react';

interface CuentaSearchBarProps {
  searchTerm: string;
  loading: boolean;
  onSearch: () => void;
  onClear: () => void;
  onSearchTermChange: (term: string) => void;
  onAddNew?: () => void;
  placeholder?: string;
}

const CuentaSearchBar: React.FC<CuentaSearchBarProps> = ({
  searchTerm,
  loading,
  onSearch,
  onClear,
  onSearchTermChange,
  onAddNew,
  placeholder = "Buscar por nombre, correo o entidad...",
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              disabled={loading}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
            <div className="absolute right-2 top-1.5 flex space-x-1">
              {searchTerm && (
                <button
                  onClick={onClear}
                  className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
                  disabled={loading}
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
              <button
                onClick={onSearch}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <span className="mr-2">+</span> Nueva Cuenta
          </button>
        )}
      </div>
    </div>
  );
};

export default CuentaSearchBar;