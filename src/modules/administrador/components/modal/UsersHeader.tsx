// src/components/UsersHeader.tsx
import React from 'react';

interface UsersHeaderProps {
  onAddNew: () => void;
  loading: boolean;
  totalUsuarios: number;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onAddNew, loading, totalUsuarios }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">👥 Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1">
          Administra los usuarios del sistema
          {totalUsuarios > 0 && (
            <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
              {totalUsuarios} registros
            </span>
          )}
        </p>
      </div>
      <button
        onClick={onAddNew}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={loading}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nuevo Usuario
      </button>
    </div>
  );
};

export default UsersHeader;