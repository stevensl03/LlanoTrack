// /pages/RequestTypesPage/components/RequestTypeSearch.tsx
import React from 'react';
import type { RequestTypeSearchProps } from '../../types';

const RequestTypeSearch: React.FC<RequestTypeSearchProps> = ({
  searchTerm,
  onSearchChange,
  loading,
  onAddNew
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por tipo o descripción..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              disabled={loading}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        
        <button
          onClick={onAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          disabled={loading}
        >
          <span className="mr-2">+</span> Nuevo Tipo
        </button>
      </div>
      
      {searchTerm && (
        <p className="mt-2 text-sm text-gray-500">
          Buscando por: "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default RequestTypeSearch;