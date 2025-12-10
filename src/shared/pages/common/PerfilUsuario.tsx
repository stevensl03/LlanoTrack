// pages/PerfilUsuario.tsx
import { useState } from 'react';
import { usePerfilUsuario } from './PerfilUsuario/usePerfilUsuario';
import UserHeader from './PerfilUsuario/UserHeader';
import ProfileTabs from './PerfilUsuario/ProfileTabs';
import DatosPersonalesTab from './PerfilUsuario/DatosPersonalesTab';

const PerfilUsuario = () => {
  const [activeTab, setActiveTab] = useState('datos');
  const {
    usuario,
    loading,
    error,
    saving,
    saveMessage,
    handleSavePerfil,
    clearSaveMessage
  } = usePerfilUsuario();

  if (loading && !usuario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Usuario no encontrado</h2>
          <p className="text-gray-600 mb-4">No se pudieron cargar los datos del perfil</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const handlePreferenciasSave = () => {
    // Aquí podrías agregar lógica para guardar preferencias si tienes un endpoint
    console.log('Guardando preferencias...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <UserHeader usuario={usuario} />

        {/* Mensajes de éxito/error */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">{saveMessage.type === 'success' ? '✅' : '❌'}</span>
                <p>{saveMessage.text}</p>
              </div>
              <button 
                onClick={clearSaveMessage}
                className="text-sm hover:opacity-70"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            <div className="flex items-center">
              <span className="mr-2">❌</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'datos' && (
            <DatosPersonalesTab 
              usuario={usuario} 
              saving={saving} 
              onSave={async (data) => { await handleSavePerfil(data); }}
            />
          )}
{/*
          {activeTab === 'preferencias' && (
            <PreferenciasTab onSave={handlePreferenciasSave} />
          )}

          {activeTab === 'actividad' && (
            <HistorialActividadTab />
          )*/}
        </ProfileTabs>
      </div>
    </div>
  );
};

export default PerfilUsuario;