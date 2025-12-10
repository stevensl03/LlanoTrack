// components/UserHeader.tsx
import { useNavigate } from 'react-router';
import type { UsuarioResponse } from '../../../../shared/types/usuarioTypes';

interface UserHeaderProps {
  usuario: UsuarioResponse;
}

const getRolColor = (rol: string) => {
  const rolLower = rol.toLowerCase();
  
  if (rolLower.includes('admin')) {
    return 'bg-red-100 text-red-800 border border-red-200';
  } else if (rolLower.includes('auditor')) {
    return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
  } else if (rolLower.includes('revisor') || rolLower.includes('aprobador')) {
    return 'bg-blue-100 text-blue-800 border border-blue-200';
  } else if (rolLower.includes('gestor') || rolLower.includes('integrador')) {
    return 'bg-green-100 text-green-800 border border-green-200';
  } else {
    return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const UserHeader = ({ usuario }: UserHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">👤 Perfil de Usuario</h1>
          <p className="text-gray-600 mt-1">
            Administra tu información personal
          </p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
        >
          <span className="mr-2">←</span>
          Volver
        </button>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-3xl text-blue-600">
              {usuario.nombres?.charAt(0) || '👤'}
            </span>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {usuario.nombres || 'Sin nombre'} {usuario.apellidos || ''}
            </h2>
            <p className="text-gray-600 mb-3">{usuario.correo || 'Sin email'}</p>
            
            <div className="flex flex-wrap gap-2">
              {usuario.roles?.map((rol, index) => (
                <span 
                  key={index} 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRolColor(rol)}`}
                >
                  {rol}
                </span>
              ))}
            </div>
          </div>

          {/* Estado corregido */}
          <div className="flex items-center">
            <div
              className={`h-3 w-3 rounded-full mr-2 ${
                usuario.activo ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>

            <span
              className={`text-sm font-medium ${
                usuario.activo ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {usuario.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
