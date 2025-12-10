// components/HeaderBar.tsx
import React from 'react';

interface HeaderBarProps {
  title: string;
  buttonText: string;
  loading: boolean;
  onButtonClick: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  buttonText,
  loading,
  onButtonClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <button
        onClick={onButtonClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        <span className="mr-2">+</span> {buttonText}
      </button>
    </div>
  );
};

export default HeaderBar;