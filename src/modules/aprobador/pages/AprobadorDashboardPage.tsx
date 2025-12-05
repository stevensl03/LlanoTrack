// pages/Aprobador/AprobadorDashboardPage.tsx
import  { useState } from 'react';
import { useNavigate } from 'react-router';

const AprobadorDashboardPage = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo
  const [stats, setStats] = useState({
    pendientes: 8,
    aprobadosEsteMes: 24,
    tiempoPromedio: '2.3 días',
    tasaAprobacion: '92%'
  });

  const [documentosPendientes, setDocumentosPendientes] = useState([
    {
      id: 'APR-001',
      codigo: '2025-001-MH',
      asunto: 'Respuesta a solicitud de información contractual',
      gestor: 'Jaime Tiuso',
      entidad: 'Ministerio de Hacienda',
      fechaEnvio: '2025-11-26',
      prioridad: 'alta',
      diasPendientes: 2,
      revisores: ['María González', 'Carlos López']
    },
    {
      id: 'APR-002',
      codigo: '2025-002-MT',
      asunto: 'Informe técnico sobre normativa de transporte',
      gestor: 'Ana Rodríguez',
      entidad: 'Ministerio de Transporte',
      fechaEnvio: '2025-11-27',
      prioridad: 'media',
      diasPendientes: 1,
      revisores: ['Pedro Sánchez']
    },
    {
      id: 'APR-003',
      codigo: '2025-003-MS',
      asunto: 'Documentación para licitación pública',
      gestor: 'Luis Martínez',
      entidad: 'Ministerio de Salud',
      fechaEnvio: '2025-11-28',
      prioridad: 'baja',
      diasPendientes: 0,
      revisores: ['María González', 'Sofía Ramírez']
    }
  ]);

  const [aprobacionesRecientes, setAprobacionesRecientes] = useState([
    {
      id: 'APR-045',
      codigo: '2025-045-PG',
      asunto: 'Respuesta a requerimiento legal',
      gestor: 'Carlos Ramírez',
      entidad: 'Procuraduría General',
      fechaAprobacion: '2025-11-25',
      estado: 'aprobado',
      tiempoProceso: '3 días'
    },
    {
      id: 'APR-044',
      codigo: '2025-044-MA',
      asunto: 'Informe ambiental para proyecto',
      gestor: 'Sandra Gómez',
      entidad: 'Ministerio de Ambiente',
      fechaAprobacion: '2025-11-24',
      estado: 'aprobado',
      tiempoProceso: '2 días'
    },
    {
      id: 'APR-043',
      codigo: '2025-043-MH',
      asunto: 'Aclaración presupuestal',
      gestor: 'Jaime Tiuso',
      entidad: 'Ministerio de Hacienda',
      fechaAprobacion: '2025-11-23',
      estado: 'con-ajustes',
      tiempoProceso: '4 días'
    }
  ]);

  const handleVerDetalle = (id: string) => {
    navigate(`/aprobador/detalle/${id}`);
  };

  const handleAprobarRapido = (id: string) => {
    // Lógica para aprobación rápida
    alert(`Documento ${id} aprobado exitosamente`);
    setDocumentosPendientes(prev => prev.filter(doc => doc.id !== id));
    setStats(prev => ({
      ...prev,
      pendientes: prev.pendientes - 1,
      aprobadosEsteMes: prev.aprobadosEsteMes + 1
    }));
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'aprobado': return 'bg-green-100 text-green-800';
      case 'con-ajustes': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📋 Panel de Aprobación</h1>
              <p className="text-gray-600 mt-1">
                Revise y apruebe documentos finales antes del envío oficial
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">🔄</span>
                Actualizar
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                <span className="mr-2">⚙️</span>
                Configurar
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">📄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pendientes de aprobación</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendientes}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📈 +2 desde ayer</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl text-green-600">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Aprobados este mes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.aprobadosEsteMes}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">🎯 Meta: 30 documentos</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl text-purple-600">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Tiempo promedio</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tiempoPromedio}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📉 -0.5 días vs. mes anterior</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl text-yellow-600">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Tasa de aprobación</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tasaAprobacion}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">🎯 8% requieren ajustes</p>
            </div>
          </div>
        </div>

        {/* Dos columnas principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: Documentos pendientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">📋 Documentos Pendientes</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {documentosPendientes.length} documentos esperando su aprobación
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Ordenar por: Prioridad</option>
                      <option>Ordenar por: Fecha</option>
                      <option>Ordenar por: Gestor</option>
                    </select>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      🎯
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gestor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioridad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documentosPendientes.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">📄</span>
                              <div>
                                <p className="font-semibold text-gray-900">{doc.codigo}</p>
                                <p className="text-sm text-gray-600 truncate max-w-xs">
                                  {doc.asunto}
                                </p>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs text-gray-500 mr-3">🏢 {doc.entidad}</span>
                                  <span className="text-xs text-gray-500">📅 {doc.fechaEnvio}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-gray-500">
                                👥 Revisores: {doc.revisores.join(', ')}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <span className="text-blue-600 text-sm">👤</span>
                            </div>
                            <span className="text-gray-900">{doc.gestor}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(doc.prioridad)}`}>
                              {doc.prioridad === 'alta' ? '🔴 Alta' : 
                               doc.prioridad === 'media' ? '🟡 Media' : '🟢 Baja'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              doc.diasPendientes > 2 ? 'bg-red-100 text-red-800' :
                              doc.diasPendientes > 0 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              ⏱️ {doc.diasPendientes === 0 ? 'Hoy' : `${doc.diasPendientes}d`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <button
                              onClick={() => handleVerDetalle(doc.id)}
                              className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center"
                            >
                              <span className="mr-1">👁️</span>
                              Revisar
                            </button>
                            <button
                              onClick={() => handleAprobarRapido(doc.id)}
                              className="px-3 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 flex items-center justify-center"
                            >
                              <span className="mr-1">✅</span>
                              Aprobar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {documentosPendientes.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Todo al día!</h3>
                    <p className="text-gray-600">
                      No hay documentos pendientes de aprobación
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: Aprobaciones recientes y métricas */}
          <div className="space-y-6">
            {/* Aprobaciones recientes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">🕐 Aprobaciones Recientes</h2>
                <p className="text-sm text-gray-600 mt-1">Últimas 10 aprobaciones</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {aprobacionesRecientes.map((aprobacion) => (
                    <div key={aprobacion.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{aprobacion.codigo}</p>
                          <p className="text-sm text-gray-600 truncate">{aprobacion.asunto}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${getEstadoColor(aprobacion.estado)}`}>
                          {aprobacion.estado === 'aprobado' ? '✅' : '🔄'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>👤 {aprobacion.gestor}</span>
                        <span>🏢 {aprobacion.entidad}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">📅 {aprobacion.fechaAprobacion}</span>
                        <span className="text-xs text-gray-500">⏱️ {aprobacion.tiempoProceso}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  📜 Ver historial completo
                </button>
              </div>
            </div>

            {/* Métricas rápidas */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">📈 Métricas del Mes</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Eficiencia de aprobación</span>
                      <span className="text-sm font-bold text-green-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Tiempo promedio</span>
                      <span className="text-sm font-bold text-blue-600">2.3 días</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Documentos/mes</span>
                      <span className="text-sm font-bold text-purple-600">24/30</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">8</p>
                    <p className="text-xs text-blue-800">Pendientes</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">24</p>
                    <p className="text-xs text-green-800">Aprobados</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">2</p>
                    <p className="text-xs text-yellow-800">Con ajustes</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">0</p>
                    <p className="text-xs text-red-800">Vencidos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📥</span>
              <span className="font-medium text-blue-900">Descargar todos</span>
              <span className="text-xs text-gray-600 mt-1">Documentos pendientes</span>
            </button>
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-green-900">Reporte mensual</span>
              <span className="text-xs text-gray-600 mt-1">Generar y exportar</span>
            </button>
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
              <span className="text-2xl mb-2">🔔</span>
              <span className="font-medium text-purple-900">Configurar alertas</span>
              <span className="text-xs text-gray-600 mt-1">Notificaciones</span>
            </button>
            <button className="p-4 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 flex flex-col items-center">
              <span className="text-2xl mb-2">👥</span>
              <span className="font-medium text-orange-900">Gestores frecuentes</span>
              <span className="text-xs text-gray-600 mt-1">Ver estadísticas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprobadorDashboardPage;
