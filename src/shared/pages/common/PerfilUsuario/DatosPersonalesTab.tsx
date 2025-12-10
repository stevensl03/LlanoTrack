// components/DatosPersonalesTab.tsx
import { useState } from 'react';
import type { UsuarioResponse, UsuarioActualizarRequest, Rol } from '../../../../shared/types/usuarioTypes';

interface DatosPersonalesTabProps {
  usuario: UsuarioResponse;
  saving: boolean;
  onSave: (data: UsuarioActualizarRequest) => Promise<void>;
}

const DatosPersonalesTab = ({ usuario, saving, onSave }: DatosPersonalesTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombres: usuario.nombres || '',
    apellidos: usuario.apellidos || '',
    correo: usuario.correo || '',
    numeroCelular: usuario.numeroCelular || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const data: UsuarioActualizarRequest = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      correo: formData.correo,
      numeroCelular: formData.numeroCelular,
      roles: Array.from(usuario.roles || []) as Rol[]
    };

    try {
      await onSave(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Información personal</h3>
        <button
          onClick={() => {
            if (isEditing) {
              setIsEditing(false);
              setFormData({
                nombres: usuario.nombres || '',
                apellidos: usuario.apellidos || '',
                correo: usuario.correo || '',
                numeroCelular: usuario.numeroCelular || '',
              });
            } else {
              setIsEditing(true);
            }
          }}
          disabled={saving}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            isEditing 
              ? 'bg-gray-600 text-white hover:bg-gray-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isEditing ? 'Cancelar' : '✏️ Editar'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombres
            </label>
            {isEditing ? (
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={saving}
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.nombres || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos
            </label>
            {isEditing ? (
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={saving}
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.apellidos || 'No especificado'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            {isEditing ? (
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={saving}
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.correo || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="numeroCelular"
                value={formData.numeroCelular}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={saving}
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.numeroCelular || 'No especificado'}</p>
            )}
          </div>
        </div>

        {/* Roles (solo lectura) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Roles del sistema
          </label>
          <div className="px-3 py-2 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {Array.from(usuario.roles || []).map((rol, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800"
                >
                  {rol}
                </span>
              ))}
              {(!usuario.roles || usuario.roles.length === 0) && (
                <span className="text-sm text-gray-500">Sin roles asignados</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Los roles solo pueden ser modificados por un administrador
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsEditing(false)}
              disabled={saving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : (
                '💾 Guardar cambios'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatosPersonalesTab;