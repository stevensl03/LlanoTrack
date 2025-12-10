// components/StatsBar.tsx
import React from 'react';

interface StatsBarProps {
  filteredCount: number;
  totalCount: number;
  searchTerm?: string;
}

const StatsBar: React.FC<StatsBarProps> = ({
  filteredCount,
  totalCount,
  searchTerm,
}) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between text-sm text-gray-600">
      <div>
        Mostrando <span className="font-semibold">{filteredCount}</span> de{" "}
        <span className="font-semibold">{totalCount}</span> entidades
        {searchTerm && (
          <span className="ml-2">
            para "<span className="font-semibold">{searchTerm}</span>"
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsBar;