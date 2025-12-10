// components/ProfileTabs.tsx
import React from 'react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const ProfileTabs = ({ activeTab, onTabChange, children }: ProfileTabsProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => onTabChange('datos')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'datos'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📋 Datos Personales
          </button>
         
        </nav>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default ProfileTabs;