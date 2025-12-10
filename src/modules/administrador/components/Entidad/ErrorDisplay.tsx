// components/ErrorDisplay.tsx
import React from 'react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
  onClear?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onClear,
}) => {
  return (
    <div className="p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <div className="flex justify-between items-center">
          <div>
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          {onClear && (
            <button onClick={onClear} className="text-red-700 hover:text-red-900">
              ✕
            </button>
          )}
        </div>
      </div>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reintentar
      </button>
    </div>
  );
};

export default ErrorDisplay;