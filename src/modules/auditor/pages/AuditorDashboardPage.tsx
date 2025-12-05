// pages/Seguimiento/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AuditorDashboardPage = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo para estadísticas
  const [estadisticasGlobales, setEstadisticasGlobales] = useState({
    totalCorreos: 156,
    cumplimientoGeneral: 87,
    tiempoPromedioRespuesta: '4.2 días',
    casosActivos: 24,
    casosVencidos: 3,
    casosPorVencer: 8
  });

  // Datos para gráfico temporal (últimos 7 días)
  const [datosTemporales, setDatosTemporales] = useState([
    { fecha: 'Nov 20', recibidos: 12, respondidos: 10 },
    { fecha: 'Nov 21', recibidos: 15, respondidos: 12 },
    { fecha: 'Nov 22', recibidos: 8, respondidos: 9 },
    { fecha: 'Nov 23', recibidos: 14, respondidos: 11 },
    { fecha: 'Nov 24', recibidos: 11, respondidos: 10 },
    { fecha: 'Nov 25', recibidos: 13, respondidos: 11 },
    { fecha: 'Nov 26', recibidos: 10, respondidos: 8 }
  ]);

  // Distribución por estado
  const [distribucionEstado, setDistribucionEstado] = useState([
    { estado: 'Asignado', cantidad: 12, color: 'bg-blue-500' },
    { estado: 'En redacción', cantidad: 8, color: 'bg-yellow-500' },
    { estado: 'En revisión', cantidad: 5, color: 'bg-orange-500' },
    { estado: 'En aprobación', cantidad: 3, color: 'bg-purple-500' },
    { estado: 'Respondido', cantidad: 128, color: 'bg-green-500' }
  ]);

  // Tiempo promedio por etapa
  const [tiemposEtapa, setTiemposEtapa] = useState([
    { etapa: 'Clasificación', tiempo: '0.5 días' },
    { etapa: 'Redacción', tiempo: '2.1 días' },
    { etapa: 'Revisión', tiempo: '1.2 días' },
    { etapa: 'Aprobación', tiempo: '0.8 días' },
    { etapa: 'Envío', tiempo: '0.4 días' }
  ]);

  // Alertas y cuellos de botella
  const [alertas, setAlertas] = useState([
    { tipo: 'cuello', etapa: 'Redacción', impacto: 'Alto', descripcion: 'Tiempo promedio 40% superior al objetivo' },
    { tipo: 'tendencia', etapa: 'General', impacto: 'Medio', descripcion: 'Incremento del 15% en solicitudes urgentes' },
    { tipo: 'vencimiento', etapa: 'Gestión', impacto: 'Alto', descripcion: '3 casos vencidos sin seguimiento' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📊 Dashboard de Seguimiento</h1>
              <p className="text-gray-600 mt-1">
                Visión general del sistema - Monitoreo en tiempo real
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">🔄</span>
                Actualizar datos
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                <span className="mr-2">⚙️</span>
                Configurar
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total correos recibidos</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticasGlobales.totalCorreos}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">📧</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📈 +12% vs. mes anterior</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cumplimiento general</p>
                <p className="text-2xl font-bold text-green-600">{estadisticasGlobales.cumplimientoGeneral}%</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl text-green-600">✅</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${estadisticasGlobales.cumplimientoGeneral}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo promedio respuesta</p>
                <p className="text-2xl font-bold text-purple-600">{estadisticasGlobales.tiempoPromedioRespuesta}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl text-purple-600">⏱️</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">🎯 Objetivo: 3.5 días</p>
            </div>
          </div>
        </div>

        {/* Segunda fila de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Casos activos</p>
                <p className="text-2xl font-bold text-blue-600">{estadisticasGlobales.casosActivos}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">📋</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">8 en riesgo de vencimiento</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Casos vencidos</p>
                <p className="text-2xl font-bold text-red-600">{estadisticasGlobales.casosVencidos}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-2xl text-red-600">⚠️</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Requieren atención inmediata</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Por vencer (3 días)</p>
                <p className="text-2xl font-bold text-yellow-600">{estadisticasGlobales.casosPorVencer}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl text-yellow-600">⏳</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Seguimiento requerido</p>
            </div>
          </div>
        </div>

        {/* Gráficos y visualizaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico temporal */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">📈 Volumen diario (últimos 7 días)</h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
                <option>Este mes</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {datosTemporales.map((dato, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{dato.fecha}</span>
                    <div className="flex space-x-4">
                      <span className="text-blue-600">📥 {dato.recibidos} recibidos</span>
                      <span className="text-green-600">📤 {dato.respondidos} respondidos</span>
                    </div>
                  </div>
                  <div className="flex h-4 space-x-1">
                    <div 
                      className="bg-blue-500 rounded-l" 
                      style={{ width: `${(dato.recibidos / 20) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500 rounded-r" 
                      style={{ width: `${(dato.respondidos / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribución por estado */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">📊 Distribución por estado</h2>
              <button 
                onClick={() => navigate('/seguimiento/tablero')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Ver detalles
              </button>
            </div>
            
            <div className="space-y-4">
              {distribucionEstado.map((estado, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${estado.color} mr-2`}></div>
                      <span className="text-sm text-gray-700">{estado.estado}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{estado.cantidad}</span>
                      <span className="text-xs text-gray-500">
                        ({Math.round((estado.cantidad / estadisticasGlobales.totalCorreos) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${estado.color}`}
                      style={{ width: `${(estado.cantidad / estadisticasGlobales.totalCorreos) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tiempo promedio por etapa y alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tiempo promedio por etapa */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">⏱️ Tiempo promedio por etapa</h2>
            
            <div className="space-y-4">
              {tiemposEtapa.map((etapa, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">{etapa.etapa}</span>
                    <span className="text-sm font-medium text-gray-900">{etapa.tiempo}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        etapa.etapa === 'Redacción' ? 'bg-red-500' :
                        etapa.etapa === 'Revisión' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ 
                        width: `${parseFloat(etapa.tiempo) * 40}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>📌 Análisis:</strong> La etapa de redacción representa el 50% del tiempo total del proceso.
                Considerar capacitación o plantillas para optimizar.
              </p>
            </div>
          </div>

          {/* Alertas de gestión */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">🚨 Alertas de gestión</h2>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {alertas.length} alertas activas
              </span>
            </div>
            
            <div className="space-y-4">
              {alertas.map((alerta, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  alerta.impacto === 'Alto' ? 'border-red-200 bg-red-50' :
                  alerta.impacto === 'Medio' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${
                          alerta.impacto === 'Alto' ? 'text-red-600' :
                          alerta.impacto === 'Medio' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {alerta.tipo === 'cuello' ? '⚡' : 
                           alerta.tipo === 'tendencia' ? '📈' : '⏰'}
                        </span>
                        <span className="font-medium text-gray-900">{alerta.etapa}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{alerta.descripcion}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alerta.impacto === 'Alto' ? 'bg-red-100 text-red-800' :
                      alerta.impacto === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alerta.impacto} impacto
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Ver detalles →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen del día */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">📅 Resumen del día - 26 Nov 2025</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">10</p>
              <p className="text-sm text-gray-600">Nuevos correos</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-green-700">Respondidos hoy</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">92%</p>
              <p className="text-sm text-blue-700">Cumplimiento diario</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">Vencen mañana</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700">
                <strong>🎯 Gestor destacado:</strong> Jaime Tiuso - 100% cumplimiento (8/8 casos)
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>🏢 Entidad más activa:</strong> Ministerio de Hacienda - 12 solicitudes
              </p>
            </div>
            <button 
              onClick={() => navigate('/seguimiento/reporte-diario')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              📋 Generar reporte diario
            </button>
          </div>
        </div>

        {/* Acceso rápido a otras vistas */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acceso rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/seguimiento/tablero')}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center"
            >
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-gray-900">Tablero interactivo</span>
              <span className="text-xs text-gray-600 mt-1">Filtros y gráficos avanzados</span>
            </button>
            
            <button 
              onClick={() => navigate('/seguimiento/cumplimiento')}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center"
            >
              <span className="text-2xl mb-2">📈</span>
              <span className="font-medium text-gray-900">Análisis de cumplimiento</span>
              <span className="text-xs text-gray-600 mt-1">Reporte por caso</span>
            </button>
            
            <button 
              onClick={() => navigate('/seguimiento/gestores')}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center"
            >
              <span className="text-2xl mb-2">👥</span>
              <span className="font-medium text-gray-900">Reportes por gestor</span>
              <span className="text-xs text-gray-600 mt-1">Desempeño individual</span>
            </button>
            
            <button 
              onClick={() => navigate('/seguimiento/exportar')}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center"
            >
              <span className="text-2xl mb-2">📥</span>
              <span className="font-medium text-gray-900">Exportar datos</span>
              <span className="text-xs text-gray-600 mt-1">Excel, PDF, CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditorDashboardPage;