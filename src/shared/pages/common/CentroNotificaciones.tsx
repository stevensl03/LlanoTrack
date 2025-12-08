// pages/CentroNotificaciones.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../state/AuthContext';
import { useMockService } from '../../hooks/useMockService';
import type { Notification } from '../../types/core.types';

const CentroNotificaciones = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getNotifications, 
    getNotificationStats,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification 
  } = useMockService();
  
  // Estado para las notificaciones REALES
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  
  // Estado para filtros
  const [filtro, setFiltro] = useState('todas'); // todas, no-leidas, urgentes
  const [tipoFiltro, setTipoFiltro] = useState('todos'); // todos los tipos
  const [busqueda, setBusqueda] = useState('');

  // Tipos de notificaciones REALES basados en tu generateNotifications
  const tipos = [
    { id: 'todos', nombre: 'Todos los tipos', icono: '📋' },
    { id: 'RECEPCION', nombre: 'Recepción', icono: '📥' },
    { id: 'ASIGNACION', nombre: 'Asignaciones', icono: '👤' },
    { id: 'VENCIMIENTO', nombre: 'Vencimientos', icono: '⏰' },
    { id: 'REVISION', nombre: 'Revisiones', icono: '🔍' },
    { id: 'APROBACION', nombre: 'Aprobaciones', icono: '✅' },
    { id: 'ENVIO', nombre: 'Envíos', icono: '📤' },
    { id: 'SISTEMA', nombre: 'Sistema', icono: '⚙️' }
  ];

  // Estadísticas REALES
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    urgent: 0,
    today: 0
  });

  // Cargar notificaciones REALES
  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const response = await getNotifications(user?.id);
        if (response.success && response.data) {
          setNotificaciones(response.data);
        }
        
        const statsResponse = await getNotificationStats(user?.id);
        if (statsResponse.success && statsResponse.data) {
          setStats({
            total: statsResponse.data.total,
            unread: statsResponse.data.unread,
            urgent: statsResponse.data.urgent,
            today: calculateTodayNotifications(response.data || [])
          });
        }
      } catch (error) {
        console.error('Error cargando notificaciones:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadNotifications();
  }, [user?.id]);

  // Filtrar notificaciones
  const notificacionesFiltradas = notificaciones.filter(notif => {
    // Filtro por estado (leídas/no leídas)
    if (filtro === 'no-leidas' && notif.leida) return false;
    if (filtro === 'urgentes' && !notif.urgente) return false;
    
    // Filtro por tipo
    if (tipoFiltro !== 'todos' && notif.tipo !== tipoFiltro) return false;
    
    // Búsqueda
    if (busqueda && 
        !notif.titulo.toLowerCase().includes(busqueda.toLowerCase()) && 
        !notif.mensaje.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Calcular notificaciones de hoy
  const calculateTodayNotifications = (notifications: Notification[]) => {
    const hoy = new Date().toISOString().split('T')[0];
    return notifications.filter(n => n.fecha.split('T')[0] === hoy).length;
  };

  // Funciones REALES usando la API
  const marcarComoLeida = async (id: string) => {
    setProcessing(id);
    try {
      const response = await markNotificationAsRead(id);
      if (response.success) {
        setNotificaciones(prev => prev.map(n => 
          n.id === id ? { ...n, leida: true } : n
        ));
        setStats(prev => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
      }
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    } finally {
      setProcessing(null);
    }
  };

  const marcarTodasComoLeidas = async () => {
    if (!user?.id) return;
    
    setProcessing('all');
    try {
      const response = await markAllNotificationsAsRead(user.id);
      if (response.success) {
        setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
        setStats(prev => ({ ...prev, unread: 0 }));
      }
    } catch (error) {
      console.error('Error marcando todas como leídas:', error);
    } finally {
      setProcessing(null);
    }
  };

  const eliminarNotificacion = async (id: string) => {
    setProcessing(id);
    try {
      const response = await deleteNotification(id);
      if (response.success) {
        const notificacionAEliminar = notificaciones.find(n => n.id === id);
        setNotificaciones(prev => prev.filter(n => n.id !== id));
        
        // Actualizar estadísticas
        if (notificacionAEliminar) {
          setStats(prev => ({
            ...prev,
            total: prev.total - 1,
            unread: notificacionAEliminar.leida ? prev.unread : Math.max(0, prev.unread - 1),
            urgent: notificacionAEliminar.urgente ? prev.urgent - 1 : prev.urgent,
            today: notificacionAEliminar.fecha.startsWith(new Date().toISOString().split('T')[0]) 
              ? prev.today - 1 
              : prev.today
          }));
        }
      }
    } catch (error) {
      console.error('Error eliminando notificación:', error);
    } finally {
      setProcessing(null);
    }
  };

  const eliminarTodasLeidas = async () => {
    const leidasAEliminar = notificaciones.filter(n => n.leida);
    
    // Eliminar una por una (en un sistema real sería batch)
    for (const notif of leidasAEliminar) {
      await deleteNotification(notif.id);
    }
    
    // Actualizar estado local
    setNotificaciones(prev => prev.filter(n => !n.leida));
    setStats(prev => ({
      total: prev.total - leidasAEliminar.length,
      unread: prev.unread,
      urgent: prev.urgent - leidasAEliminar.filter(n => n.urgente).length,
      today: prev.today - leidasAEliminar.filter(n => 
        n.fecha.startsWith(new Date().toISOString().split('T')[0])
      ).length
    }));
  };

  const handleAccionNotificacion = async (notificacion: Notification) => {
    // Marcar como leída si no lo está
    if (!notificacion.leida) {
      await marcarComoLeida(notificacion.id);
    }
    
    // Navegar a la acción
    if (notificacion.accion) {
      navigate(notificacion.accion);
    } else if (notificacion.correoId) {
      navigate(`/correos/${notificacion.correoId}`);
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'RECEPCION': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'ASIGNACION': return 'bg-green-100 text-green-800 border border-green-200';
      case 'VENCIMIENTO': return 'bg-red-100 text-red-800 border border-red-200';
      case 'REVISION': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'APROBACION': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'ENVIO': return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'SISTEMA': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case 'RECEPCION': return '📥';
      case 'ASIGNACION': return '👤';
      case 'VENCIMIENTO': return '⏰';
      case 'REVISION': return '🔍';
      case 'APROBACION': return '✅';
      case 'ENVIO': return '📤';
      case 'SISTEMA': return '⚙️';
      default: return '📋';
    }
  };

  const formatFecha = (fecha: string) => {
    try {
      const date = new Date(fecha);
      const hoy = new Date();
      const ayer = new Date(hoy);
      ayer.setDate(ayer.getDate() - 1);
      
      if (date.toDateString() === hoy.toDateString()) {
        return `Hoy ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
      } else if (date.toDateString() === ayer.toDateString()) {
        return `Ayer ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch {
      return fecha;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando notificaciones...</p>
        </div>
      </div>
    );
  }

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
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
              >
                <span className="mr-2">←</span>
                Volver
              </button>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {stats.unread}
                </span>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => navigate('/perfil?tab=preferencias')}
                >
                  ⚙️ Configurar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas REALES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total notificaciones</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{stats.urgent}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.today}</p>
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
                  className={`flex-1 py-2 border rounded-lg text-sm transition-colors ${
                    filtro === 'todas' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFiltro('no-leidas')}
                  className={`flex-1 py-2 border rounded-lg text-sm transition-colors ${
                    filtro === 'no-leidas' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  No leídas ({stats.unread})
                </button>
                <button
                  onClick={() => setFiltro('urgentes')}
                  className={`flex-1 py-2 border rounded-lg text-sm transition-colors ${
                    filtro === 'urgentes' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Urgentes ({stats.urgent})
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
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-3">
              <button
                onClick={marcarTodasComoLeidas}
                disabled={stats.unread === 0 || processing === 'all'}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center ${
                  stats.unread === 0 || processing === 'all'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {processing === 'all' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  '✅ Marcar todas como leídas'
                )}
              </button>
              <button
                onClick={eliminarTodasLeidas}
                disabled={notificaciones.length === stats.unread || processing?.startsWith('delete')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  notificaciones.length === stats.unread || processing?.startsWith('delete')
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                🗑️ Eliminar leídas
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Mostrando {notificacionesFiltradas.length} de {notificaciones.length} notificaciones
            </p>
          </div>
        </div>

        {/* Lista de notificaciones REALES */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {notificacionesFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {busqueda 
                  ? 'No se encontraron notificaciones' 
                  : '¡No hay notificaciones!'}
              </h3>
              <p className="text-gray-600 mb-4">
                {busqueda 
                  ? 'Intenta con otros términos de búsqueda' 
                  : 'Estás al día con todas tus notificaciones del sistema'}
              </p>
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Limpiar búsqueda
                </button>
              )}
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
                        {getTipoIcono(notificacion.tipo)}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {notificacion.titulo}
                            </h3>
                            {!notificacion.leida && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                                Nuevo
                              </span>
                            )}
                            {notificacion.urgente && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full whitespace-nowrap">
                                Urgente
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getTipoColor(notificacion.tipo)}`}>
                              {tipos.find(t => t.id === notificacion.tipo)?.nombre}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{notificacion.mensaje}</p>
                          
                          {/* Metadata adicional si existe */}
                          {notificacion.metadata && (
                            <div className="text-xs text-gray-500 mt-2">
                              {notificacion.metadata.radicado && (
                                <span className="mr-3">📄 {notificacion.metadata.radicado}</span>
                              )}
                              {notificacion.metadata.diasRestantes !== undefined && (
                                <span className="mr-3">⏱️ {notificacion.metadata.diasRestantes} días restantes</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right min-w-[140px]">
                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            {formatFecha(notificacion.fecha)}
                          </p>
                          {notificacion.leida ? (
                            <p className="text-xs text-gray-400 mt-1">Leída</p>
                          ) : (
                            <p className="text-xs text-blue-600 mt-1">No leída</p>
                          )}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAccionNotificacion(notificacion)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors whitespace-nowrap"
                          >
                            {notificacion.correoId ? 'Ver correo' : 'Ver detalles'}
                          </button>
                          {!notificacion.leida && (
                            <button
                              onClick={() => marcarComoLeida(notificacion.id)}
                              disabled={processing === notificacion.id}
                              className={`px-4 py-2 border rounded-lg text-sm transition-colors whitespace-nowrap ${
                                processing === notificacion.id
                                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {processing === notificacion.id ? 'Procesando...' : 'Marcar como leída'}
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => eliminarNotificacion(notificacion.id)}
                          disabled={processing === notificacion.id}
                          className={`text-gray-400 hover:text-red-600 transition-colors ${
                            processing === notificacion.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title="Eliminar notificación"
                        >
                          {processing === notificacion.id ? '⏳' : '🗑️'}
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
            <button 
              onClick={() => navigate('/perfil?tab=preferencias')}
              className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center transition-colors"
            >
              <span className="text-2xl mb-2">📧</span>
              <span className="font-medium text-blue-900">Configurar email</span>
              <span className="text-xs text-gray-600 mt-1">Notificaciones por correo</span>
            </button>
            
            <button 
              onClick={() => navigate('/perfil?tab=preferencias')}
              className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center transition-colors"
            >
              <span className="text-2xl mb-2">📱</span>
              <span className="font-medium text-green-900">Notificaciones push</span>
              <span className="text-xs text-gray-600 mt-1">Alertas en tiempo real</span>
            </button>
            
            <button 
              onClick={() => {
                // Lógica para silenciar notificaciones temporalmente
                alert('Funcionalidad en desarrollo: Silenciar notificaciones por 1 hora');
              }}
              className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center transition-colors"
            >
              <span className="text-2xl mb-2">🔕</span>
              <span className="font-medium text-purple-900">Silenciar temporalmente</span>
              <span className="text-xs text-gray-600 mt-1">Pausar notificaciones</span>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex flex-col items-center transition-colors"
            >
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-red-900">Reporte de actividad</span>
              <span className="text-xs text-gray-600 mt-1">Ver dashboard completo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroNotificaciones;