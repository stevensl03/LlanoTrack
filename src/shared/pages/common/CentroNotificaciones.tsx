// pages/CentroNotificaciones.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CentroNotificaciones = () => {
  const navigate = useNavigate();
  
  // Estado para las notificaciones
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: 'asignacion',
      titulo: 'Nuevo correo asignado',
      mensaje: 'Se te ha asignado el caso 2025-001-MH del Ministerio de Hacienda',
      fecha: '2025-11-26 14:30',
      leida: false,
      urgente: true,
      accion: '/gestor/caso/2025-001-MH',
      icono: '📋'
    },
    {
      id: 2,
      tipo: 'vencimiento',
      titulo: 'Caso por vencer',
      mensaje: 'El caso 2025-045-PG vence en 2 días',
      fecha: '2025-11-26 11:15',
      leida: false,
      urgente: true,
      accion: '/gestor/caso/2025-045-PG',
      icono: '⏰'
    },
    {
      id: 3,
      tipo: 'revision',
      titulo: 'Documento pendiente de revisión',
      mensaje: 'Jaime Tiuso ha enviado un documento para tu revisión',
      fecha: '2025-11-25 16:45',
      leida: true,
      urgente: false,
      accion: '/revisor/revisar/APR-001',
      icono: '🔍'
    },
    {
      id: 4,
      tipo: 'aprobacion',
      titulo: 'Documento aprobado',
      mensaje: 'Carlos Ramírez ha aprobado el documento APR-002',
      fecha: '2025-11-25 09:20',
      leida: true,
      urgente: false,
      accion: '/gestor/caso/2025-002-MS',
      icono: '✅'
    },
    {
      id: 5,
      tipo: 'correccion',
      titulo: 'Correcciones solicitadas',
      mensaje: 'El revisor ha solicitado correcciones en el documento REV-045',
      fecha: '2025-11-24 15:10',
      leida: true,
      urgente: false,
      accion: '/gestor/correcciones/REV-045',
      icono: '📝'
    },
    {
      id: 6,
      tipo: 'sistema',
      titulo: 'Actualización del sistema',
      mensaje: 'Nuevas funcionalidades disponibles en el panel de seguimiento',
      fecha: '2025-11-23 10:30',
      leida: true,
      urgente: false,
      accion: '/actualizaciones',
      icono: '🔄'
    },
    {
      id: 7,
      tipo: 'envio',
      titulo: 'Documento enviado',
      mensaje: 'El caso 2025-043-MH ha sido enviado a la entidad',
      fecha: '2025-11-22 13:45',
      leida: true,
      urgente: false,
      accion: '/seguimiento/caso/2025-043-MH',
      icono: '📤'
    },
    {
      id: 8,
      tipo: 'acuse',
      titulo: 'Acuse de recibo recibido',
      mensaje: 'El Ministerio de Hacienda ha confirmado recepción del documento',
      fecha: '2025-11-21 08:15',
      leida: true,
      urgente: false,
      accion: '/integrador/acuse/2025-001-MH',
      icono: '📨'
    }
  ]);

  // Estado para filtros
  const [filtro, setFiltro] = useState('todas'); // todas, no-leidas, urgentes, por-tipo
  const [tipoFiltro, setTipoFiltro] = useState('todos'); // todos los tipos
  const [busqueda, setBusqueda] = useState('');

  // Tipos de notificaciones
  const tipos = [
    { id: 'todos', nombre: 'Todos los tipos', icono: '📋' },
    { id: 'asignacion', nombre: 'Asignaciones', icono: '📋' },
    { id: 'vencimiento', nombre: 'Vencimientos', icono: '⏰' },
    { id: 'revision', nombre: 'Revisiones', icono: '🔍' },
    { id: 'aprobacion', nombre: 'Aprobaciones', icono: '✅' },
    { id: 'correccion', nombre: 'Correcciones', icono: '📝' },
    { id: 'envio', nombre: 'Envíos', icono: '📤' },
    { id: 'acuse', nombre: 'Acuses', icono: '📨' },
    { id: 'sistema', nombre: 'Sistema', icono: '🔄' }
  ];

  // Filtrar notificaciones
  const notificacionesFiltradas = notificaciones.filter(notif => {
    // Filtro por estado (leídas/no leídas)
    if (filtro === 'no-leidas' && notif.leida) return false;
    if (filtro === 'urgentes' && !notif.urgente) return false;
    
    // Filtro por tipo
    if (tipoFiltro !== 'todos' && notif.tipo !== tipoFiltro) return false;
    
    // Búsqueda
    if (busqueda && !notif.titulo.toLowerCase().includes(busqueda.toLowerCase()) && 
        !notif.mensaje.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Contadores
  const noLeidas = notificaciones.filter(n => !n.leida).length;
  const urgentes = notificaciones.filter(n => n.urgente).length;

  // Funciones
  const marcarComoLeida = (id: number) => {
    setNotificaciones(prev => prev.map(n => 
      n.id === id ? { ...n, leida: true } : n
    ));
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  };

  const eliminarNotificacion = (id: number) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  const eliminarTodasLeidas = () => {
    setNotificaciones(prev => prev.filter(n => !n.leida));
  };

  const handleAccionNotificacion = (notificacion: any) => {
    // Marcar como leída
    marcarComoLeida(notificacion.id);
    
    // Navegar a la acción
    if (notificacion.accion) {
      navigate(notificacion.accion);
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'asignacion': return 'bg-blue-100 text-blue-800';
      case 'vencimiento': return 'bg-red-100 text-red-800';
      case 'revision': return 'bg-yellow-100 text-yellow-800';
      case 'aprobacion': return 'bg-green-100 text-green-800';
      case 'correccion': return 'bg-orange-100 text-orange-800';
      case 'envio': return 'bg-purple-100 text-purple-800';
      case 'acuse': return 'bg-indigo-100 text-indigo-800';
      case 'sistema': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">🔔 Centro de Notificaciones</h1>
              <p className="text-gray-600 mt-1">
                Gestiona todas tus alertas y notificaciones del sistema
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <span className="mr-2">←</span>
                Volver
              </button>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {noLeidas}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  ⚙️ Configurar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total notificaciones</p>
                <p className="text-2xl font-bold text-gray-900">{notificaciones.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">No leídas</p>
                <p className="text-2xl font-bold text-red-600">{noLeidas}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-2xl text-red-600">🔔</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-yellow-600">{urgentes}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl text-yellow-600">⚠️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hoy</p>
                <p className="text-2xl font-bold text-green-600">
                  {notificaciones.filter(n => n.fecha.startsWith('2025-11-26')).length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl text-green-600">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y controles */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Filtro por estado
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFiltro('todas')}
                  className={`flex-1 py-2 border rounded-lg text-sm ${
                    filtro === 'todas' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFiltro('no-leidas')}
                  className={`flex-1 py-2 border rounded-lg text-sm ${
                    filtro === 'no-leidas' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  No leídas ({noLeidas})
                </button>
                <button
                  onClick={() => setFiltro('urgentes')}
                  className={`flex-1 py-2 border rounded-lg text-sm ${
                    filtro === 'urgentes' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Urgentes ({urgentes})
                </button>
              </div>
            </div>

            {/* Filtro por tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏷️ Filtro por tipo
              </label>
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {tipos.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.icono} {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔎 Buscar notificaciones
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Título o mensaje..."
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Acciones masivas */}
          <div className="flex justify-between mt-6">
            <div className="flex space-x-3">
              <button
                onClick={marcarTodasComoLeidas}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                ✅ Marcar todas como leídas
              </button>
              <button
                onClick={eliminarTodasLeidas}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                🗑️ Eliminar leídas
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Mostrando {notificacionesFiltradas.length} de {notificaciones.length} notificaciones
            </p>
          </div>
        </div>

        {/* Lista de notificaciones */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {notificacionesFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¡No hay notificaciones!</h3>
              <p className="text-gray-600">
                {busqueda 
                  ? 'No se encontraron notificaciones con esos criterios' 
                  : 'Estás al día con todas tus notificaciones'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notificacionesFiltradas.map((notificacion) => (
                <div 
                  key={notificacion.id} 
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notificacion.leida ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    {/* Icono */}
                    <div className="flex-shrink-0 mr-4">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl ${
                        notificacion.urgente ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {notificacion.icono}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">
                              {notificacion.titulo}
                            </h3>
                            {!notificacion.leida && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Nuevo
                              </span>
                            )}
                            {notificacion.urgente && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                Urgente
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full ${getTipoColor(notificacion.tipo)}`}>
                              {tipos.find(t => t.id === notificacion.tipo)?.nombre}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{notificacion.mensaje}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{notificacion.fecha}</p>
                          {notificacion.leida ? (
                            <p className="text-xs text-gray-400 mt-1">Leída</p>
                          ) : (
                            <p className="text-xs text-blue-600 mt-1">No leída</p>
                          )}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAccionNotificacion(notificacion)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Ver acción
                          </button>
                          {!notificacion.leida && (
                            <button
                              onClick={() => marcarComoLeida(notificacion.id)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                            >
                              Marcar como leída
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => eliminarNotificacion(notificacion.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Eliminar notificación"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferencias de notificaciones */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Preferencias de notificaciones</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📧</span>
              <span className="font-medium text-blue-900">Configurar email</span>
              <span className="text-xs text-gray-600 mt-1">Notificaciones por correo</span>
            </button>
            
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📱</span>
              <span className="font-medium text-green-900">Notificaciones push</span>
              <span className="text-xs text-gray-600 mt-1">Alertas en tiempo real</span>
            </button>
            
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
              <span className="text-2xl mb-2">🔕</span>
              <span className="font-medium text-purple-900">Silenciar temporalmente</span>
              <span className="text-xs text-gray-600 mt-1">Pausar notificaciones</span>
            </button>
            
            <button className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-red-900">Reporte de actividad</span>
              <span className="text-xs text-gray-600 mt-1">Historial de notificaciones</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroNotificaciones;