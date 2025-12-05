// pages/PerfilUsuario.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  
  // Datos del usuario (simulados)
  const [usuario, setUsuario] = useState({
    nombre: 'María González',
    cargo: 'Revisor Legal Senior',
    email: 'maria.gonzalez@empresa.com',
    idColaborador: 'EMP-2023-045',
    rol: 'Revisor',
    rolesAdicionales: ['Auditor'],
    area: 'Departamento Legal',
    telefono: '+57 300 123 4567',
    fechaIngreso: '2023-03-15',
    estado: 'Activo',
    avatar: null
  });

  const [preferencias, setPreferencias] = useState({
    notificacionesEmail: true,
    notificacionesPush: true,
    notificacionesSMS: false,
    alertasUrgentes: true,
    alertasVencimiento: true,
    alertasCorreosNuevos: false,
    tema: 'claro',
    idioma: 'es',
    zonaHoraria: 'America/Bogota',
    formatoFecha: 'DD/MM/YYYY'
  });

  const [cambioPassword, setCambioPassword] = useState({
    passwordActual: '',
    nuevoPassword: '',
    confirmarPassword: ''
  });

  const [historialActividad, setHistorialActividad] = useState([
    { id: 1, fecha: '2025-11-26 14:30', accion: 'Revisó documento APR-001', detalle: 'Documento aprobado con comentarios' },
    { id: 2, fecha: '2025-11-26 11:15', accion: 'Descargó anexos técnicos', detalle: '3 archivos descargados' },
    { id: 3, fecha: '2025-11-25 16:45', accion: 'Actualizó preferencias', detalle: 'Configuró notificaciones' },
    { id: 4, fecha: '2025-11-25 09:20', accion: 'Inició sesión', detalle: 'Desde IP 192.168.1.100' },
    { id: 5, fecha: '2025-11-24 15:10', accion: 'Revisó documento REV-045', detalle: 'Solicitó correcciones' },
    { id: 6, fecha: '2025-11-23 10:30', accion: 'Exportó reporte', detalle: 'Reporte de cumplimiento en PDF' },
    { id: 7, fecha: '2025-11-22 13:45', accion: 'Actualizó perfil', detalle: 'Cambió número telefónico' },
    { id: 8, fecha: '2025-11-21 08:15', accion: 'Revisó documento REV-044', detalle: 'Documento aprobado' }
  ]);

  const [activeTab, setActiveTab] = useState('datos');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleSavePerfil = () => {
    // Aquí iría la lógica para guardar en el backend
    setIsEditing(false);
    alert('Perfil actualizado correctamente');
  };

  const handleChangePassword = () => {
    const errors: string[] = [];
    
    if (!cambioPassword.passwordActual) {
      errors.push('La contraseña actual es requerida');
    }
    
    if (cambioPassword.nuevoPassword.length < 8) {
      errors.push('La nueva contraseña debe tener al menos 8 caracteres');
    }
    
    if (cambioPassword.nuevoPassword !== cambioPassword.confirmarPassword) {
      errors.push('Las contraseñas no coinciden');
    }
    
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setPasswordErrors([]);
    setIsChangingPassword(false);
    setCambioPassword({
      passwordActual: '',
      nuevoPassword: '',
      confirmarPassword: ''
    });
    alert('Contraseña cambiada exitosamente');
  };

  const getRolColor = (rol: string) => {
    switch (rol.toLowerCase()) {
      case 'revisor': return 'bg-blue-100 text-blue-800';
      case 'gestor': return 'bg-green-100 text-green-800';
      case 'aprobador': return 'bg-purple-100 text-purple-800';
      case 'integrator': return 'bg-orange-100 text-orange-800';
      case 'administrador': return 'bg-red-100 text-red-800';
      case 'auditor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">👤 Perfil de Usuario</h1>
              <p className="text-gray-600 mt-1">
                Administra tu información personal, preferencias y seguridad
              </p>
            </div>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <span className="mr-2">←</span>
              Volver
            </button>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('datos')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'datos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Datos Personales
              </button>
              <button
                onClick={() => setActiveTab('preferencias')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'preferencias'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ⚙️ Preferencias
              </button>
              <button
                onClick={() => setActiveTab('seguridad')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'seguridad'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🔒 Seguridad
              </button>
              <button
                onClick={() => setActiveTab('actividad')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'actividad'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📜 Historial de Actividad
              </button>
            </nav>
          </div>

          {/* Contenido de las tabs */}
          <div className="p-6">
            {/* Tab: Datos Personales */}
            {activeTab === 'datos' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar y resumen */}
                  <div className="md:w-1/3">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex flex-col items-center">
                        <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <span className="text-4xl text-blue-600">👤</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{usuario.nombre}</h2>
                        <p className="text-gray-600">{usuario.cargo}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">📧</span>
                            <span className="text-sm">{usuario.email}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">📞</span>
                            <span className="text-sm">{usuario.telefono}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">🏢</span>
                            <span className="text-sm">{usuario.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Roles */}
                    <div className="mt-4 bg-gray-50 rounded-xl p-4">
                      <h3 className="font-medium text-gray-900 mb-2">🎭 Roles asignados</h3>
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRolColor(usuario.rol)}`}>
                          {usuario.rol}
                        </span>
                        {usuario.rolesAdicionales.map((rol, index) => (
                          <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRolColor(rol)}`}>
                            {rol}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Formulario de datos */}
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Información personal</h3>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        {isEditing ? 'Cancelar' : '✏️ Editar'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={usuario.nombre}
                              onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.nombre}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cargo
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={usuario.cargo}
                              onChange={(e) => setUsuario({...usuario, cargo: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.cargo}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email corporativo
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={usuario.email}
                              onChange={(e) => setUsuario({...usuario, email: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={usuario.telefono}
                              onChange={(e) => setUsuario({...usuario, telefono: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.telefono}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Área/Departamento
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={usuario.area}
                            onChange={(e) => setUsuario({...usuario, area: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.area}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ID de Colaborador
                          </label>
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.idColaborador}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha de ingreso
                          </label>
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{usuario.fechaIngreso}</p>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end">
                          <button
                            onClick={handleSavePerfil}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            💾 Guardar cambios
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Preferencias */}
            {activeTab === 'preferencias' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notificaciones */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 Configuración de notificaciones</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Notificaciones por email</p>
                          <p className="text-sm text-gray-600">Recibir notificaciones en tu correo electrónico</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferencias.notificacionesEmail}
                            onChange={(e) => setPreferencias({...preferencias, notificacionesEmail: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Notificaciones push</p>
                          <p className="text-sm text-gray-600">Alertas en tiempo real en el sistema</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferencias.notificacionesPush}
                            onChange={(e) => setPreferencias({...preferencias, notificacionesPush: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Alertas de alta urgencia</p>
                          <p className="text-sm text-gray-600">Casos con prioridad alta y vencimientos</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferencias.alertasUrgentes}
                            onChange={(e) => setPreferencias({...preferencias, alertasUrgentes: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Alertas de vencimiento</p>
                          <p className="text-sm text-gray-600">Notificaciones antes del vencimiento de casos</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferencias.alertasVencimiento}
                            onChange={(e) => setPreferencias({...preferencias, alertasVencimiento: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Configuración general */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Configuración general</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tema de interfaz
                        </label>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setPreferencias({...preferencias, tema: 'claro'})}
                            className={`flex-1 py-2 border rounded-lg ${
                              preferencias.tema === 'claro' 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            ☀️ Claro
                          </button>
                          <button
                            onClick={() => setPreferencias({...preferencias, tema: 'oscuro'})}
                            className={`flex-1 py-2 border rounded-lg ${
                              preferencias.tema === 'oscuro' 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            🌙 Oscuro
                          </button>
                          <button
                            onClick={() => setPreferencias({...preferencias, tema: 'auto'})}
                            className={`flex-1 py-2 border rounded-lg ${
                              preferencias.tema === 'auto' 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            🔄 Automático
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Idioma
                        </label>
                        <select
                          value={preferencias.idioma}
                          onChange={(e) => setPreferencias({...preferencias, idioma: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="es">🇪🇸 Español</option>
                          <option value="en">🇺🇸 English</option>
                          <option value="pt">🇧🇷 Português</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zona horaria
                        </label>
                        <select
                          value={preferencias.zonaHoraria}
                          onChange={(e) => setPreferencias({...preferencias, zonaHoraria: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="America/Bogota">🇨🇴 Bogotá (UTC-5)</option>
                          <option value="America/Mexico_City">🇲🇽 Ciudad de México (UTC-6)</option>
                          <option value="America/New_York">🇺🇸 Nueva York (UTC-5)</option>
                          <option value="Europe/Madrid">🇪🇸 Madrid (UTC+1)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Formato de fecha
                        </label>
                        <select
                          value={preferencias.formatoFecha}
                          onChange={(e) => setPreferencias({...preferencias, formatoFecha: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                          <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                          <option value="YYYY-MM-DD">AAAA-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => alert('Preferencias guardadas')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    💾 Guardar preferencias
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Seguridad */}
            {activeTab === 'seguridad' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cambio de contraseña */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">🔐 Cambio de contraseña</h3>
                      <button
                        onClick={() => setIsChangingPassword(!isChangingPassword)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        {isChangingPassword ? 'Cancelar' : 'Cambiar contraseña'}
                      </button>
                    </div>

                    {isChangingPassword ? (
                      <div className="space-y-4">
                        {passwordErrors.length > 0 && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <ul className="text-sm text-red-800">
                              {passwordErrors.map((error, index) => (
                                <li key={index}>• {error}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña actual
                          </label>
                          <input
                            type="password"
                            value={cambioPassword.passwordActual}
                            onChange={(e) => setCambioPassword({...cambioPassword, passwordActual: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nueva contraseña
                          </label>
                          <input
                            type="password"
                            value={cambioPassword.nuevoPassword}
                            onChange={(e) => setCambioPassword({...cambioPassword, nuevoPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas y números
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar nueva contraseña
                          </label>
                          <input
                            type="password"
                            value={cambioPassword.confirmarPassword}
                            onChange={(e) => setCambioPassword({...cambioPassword, confirmarPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleChangePassword}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            🔐 Cambiar contraseña
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🔒</div>
                        <p className="text-gray-600">
                          Tu contraseña se actualizó por última vez el 15/10/2025
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Recomendamos cambiar tu contraseña cada 90 días
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Seguridad de la cuenta */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">🛡️ Seguridad de la cuenta</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Autenticación de dos factores</p>
                          <p className="text-sm text-gray-600">Añade una capa adicional de seguridad</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Activar
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Sesiones activas</p>
                          <p className="text-sm text-gray-600">3 dispositivos conectados</p>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          Gestionar
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Historial de inicios de sesión</p>
                          <p className="text-sm text-gray-600">Último acceso: Hoy 14:30</p>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-medium text-yellow-900 mb-2">⚠️ Recomendaciones de seguridad</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• No compartas tus credenciales de acceso</li>
                    <li>• Utiliza contraseñas diferentes para cada sistema</li>
                    <li>• Activa la autenticación de dos factores</li>
                    <li>• Cierra sesión cuando uses equipos compartidos</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Historial de Actividad */}
            {activeTab === 'actividad' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">📜 Historial de actividad reciente</h3>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Últimos 7 días</option>
                      <option>Últimos 30 días</option>
                      <option>Últimos 3 meses</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      Exportar
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha y hora
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acción
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Detalle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP / Dispositivo
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {historialActividad.map((actividad) => (
                          <tr key={actividad.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-900">{actividad.fecha}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-medium text-gray-900">{actividad.accion}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-700">{actividad.detalle}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs text-gray-500">
                                {actividad.id === 4 ? '192.168.1.100' : 'N/A'}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Cargar más actividades
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;