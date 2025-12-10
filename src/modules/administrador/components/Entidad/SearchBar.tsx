// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  loading: boolean;
  onSearch: () => void;
  onClear: () => void;
  onSearchTermChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  loading,
  onSearch,
  onClear,
  onSearchTermChange,
  placeholder = "Buscar por nombre o dominio...",
}) => {
  return (
    <div className="mb-6">
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
  );
};

export default SearchBar;