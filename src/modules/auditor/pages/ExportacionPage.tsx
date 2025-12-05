// pages/Seguimiento/Exportacion.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ExportacionComparticionPage = () => {
  const navigate = useNavigate();
  
  const [tipoReporte, setTipoReporte] = useState('cumplimiento-general');
  const [formato, setFormato] = useState('excel');
  const [programacion, setProgramacion] = useState('manual');
  const [destinatarios, setDestinatarios] = useState('');
  
  const [reportesConfigurados, setReportesConfigurados] = useState([
    {
      id: 'REP-001',
      nombre: 'Reporte de Cumplimiento Mensual',
      tipo: 'cumplimiento-general',
      formato: 'excel',
      programacion: 'mensual',
      ultimaEjecucion: '2025-11-25',
      proximaEjecucion: '2025-12-25',
      destinatarios: ['direccion@empresa.com', 'gerencia@empresa.com'],
      estado: 'activo'
    },
    {
      id: 'REP-002',
      nombre: 'Dashboard Ejecutivo',
      tipo: 'dashboard-ejecutivo',
      formato: 'pdf',
      programacion: 'semanal',
      ultimaEjecucion: '2025-11-26',
      proximaEjecucion: '2025-12-03',
      destinatarios: ['ceo@empresa.com'],
      estado: 'activo'
    },
    {
      id: 'REP-003',
      nombre: 'Análisis por Gestor - Trimestral',
      tipo: 'reporte-gestor',
      formato: 'excel',
      programacion: 'trimestral',
      ultimaEjecucion: '2025-10-31',
      proximaEjecucion: '2026-01-31',
      destinatarios: ['rh@empresa.com', 'supervisores@empresa.com'],
      estado: 'activo'
    },
    {
      id: 'REP-004',
      nombre: 'Reporte de Tendencias',
      tipo: 'analisis-tendencias',
      formato: 'pdf',
      programacion: 'manual',
      ultimaEjecucion: '2025-11-20',
      proximaEjecucion: 'N/A',
      destinatarios: ['planeacion@empresa.com'],
      estado: 'inactivo'
    }
  ]);

  const [dashboardsPersonalizados, setDashboardsPersonalizados] = useState([
    {
      id: 'DASH-001',
      nombre: 'Dashboard Dirección',
      audiencia: 'Dirección General',
      metricas: ['Cumplimiento general', 'Casos vencidos', 'Tiempo promedio'],
      frecuencia: 'diaria',
      acceso: ['ceo@empresa.com', 'coo@empresa.com'],
      estado: 'activo'
    },
    {
      id: 'DASH-002',
      nombre: 'Dashboard Operativo',
      audiencia: 'Gestores y Supervisores',
      metricas: ['Casos asignados', 'Estado por gestor', 'Alertas vencimiento'],
      frecuencia: 'diaria',
      acceso: ['gestores@empresa.com', 'supervisores@empresa.com'],
      estado: 'activo'
    },
    {
      id: 'DASH-003',
      nombre: 'Dashboard Auditoría',
      audiencia: 'Auditoría Interna',
      metricas: ['Trazabilidad completa', 'Historial de cambios', 'Reportes de cumplimiento'],
      frecuencia: 'semanal',
      acceso: ['auditoria@empresa.com'],
      estado: 'activo'
    }
  ]);

  const tiposReporte = [
    { id: 'cumplimiento-general', nombre: 'Cumplimiento General', descripcion: 'Métricas generales de cumplimiento' },
    { id: 'reporte-gestor', nombre: 'Reporte por Gestor', descripcion: 'Desempeño individual por gestor' },
    { id: 'reporte-entidad', nombre: 'Reporte por Entidad', descripcion: 'Análisis por entidad remitente' },
    { id: 'analisis-tiempos', nombre: 'Análisis de Tiempos', descripcion: 'Desglose por etapa del proceso' },
    { id: 'dashboard-ejecutivo', nombre: 'Dashboard Ejecutivo', descripcion: 'Resumen ejecutivo para dirección' },
    { id: 'trazabilidad-completa', nombre: 'Trazabilidad Completa', descripcion: 'Historial detallado de todos los casos' }
  ];

  const formatosExportacion = [
    { id: 'excel', nombre: 'Excel (.xlsx)', icono: '📊', descripcion: 'Datos completos para análisis' },
    { id: 'pdf', nombre: 'PDF (.pdf)', icono: '📄', descripcion: 'Reporte formal para presentación' },
    { id: 'csv', nombre: 'CSV (.csv)', icono: '📝', descripcion: 'Datos estructurados para sistemas externos' },
    { id: 'html', nombre: 'HTML (.html)', icono: '🌐', descripcion: 'Dashboard interactivo en navegador' },
    { id: 'json', nombre: 'JSON (.json)', icono: '🔧', descripcion: 'Datos para integración con APIs' }
  ];

  const frecuenciaProgramacion = [
    { id: 'manual', nombre: 'Manual', descripcion: 'Generar solo cuando se solicite' },
    { id: 'diaria', nombre: 'Diaria', descripcion: 'Generar automáticamente cada día' },
    { id: 'semanal', nombre: 'Semanal', descripcion: 'Generar automáticamente cada lunes' },
    { id: 'mensual', nombre: 'Mensual', descripcion: 'Generar automáticamente primer día del mes' },
    { id: 'trimestral', nombre: 'Trimestral', descripcion: 'Generar automáticamente cada trimestre' }
  ];

  const handleGenerarReporte = () => {
    alert(`Generando reporte ${tipoReporte} en formato ${formato}...`);
    // Aquí iría la lógica para generar el reporte
  };

  const handleProgramarReporte = () => {
    alert(`Programando reporte ${tipoReporte} para ${programacion}...`);
    // Aquí iría la lógica para programar el reporte
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📤 Exportación y Compartición</h1>
              <p className="text-gray-600 mt-1">
                Genera, programa y comparte reportes y dashboards personalizados
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/seguimiento/dashboard')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <span className="mr-2">←</span>
                Volver al dashboard
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">⚙️</span>
                Configurar API
              </button>
            </div>
          </div>
        </div>

        {/* Configuración de nuevo reporte */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🆕 Configurar nuevo reporte</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de reporte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                📊 Tipo de reporte
              </label>
              <div className="space-y-3">
                {tiposReporte.map((tipo) => (
                  <div 
                    key={tipo.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      tipoReporte === tipo.id 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setTipoReporte(tipo.id)}
                  >
                    <div className="flex items-start">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                        tipoReporte === tipo.id 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {tipoReporte === tipo.id && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tipo.nombre}</p>
                        <p className="text-sm text-gray-600 mt-1">{tipo.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuración de formato y programación */}
            <div className="space-y-6">
              {/* Formato de exportación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  📁 Formato de exportación
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {formatosExportacion.map((formatoItem) => (
                    <div 
                      key={formatoItem.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        formato === formatoItem.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setFormato(formatoItem.id)}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{formatoItem.icono}</span>
                        <div>
                          <p className="font-medium text-gray-900">{formatoItem.nombre}</p>
                          <p className="text-xs text-gray-500">{formatoItem.descripcion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ⏰ Programación
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {frecuenciaProgramacion.map((frec) => (
                    <button
                      key={frec.id}
                      onClick={() => setProgramacion(frec.id)}
                      className={`p-2 border rounded-lg text-sm ${
                        programacion === frec.id 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {frec.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destinatarios */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  👥 Destinatarios (separados por coma)
                </label>
                <textarea
                  value={destinatarios}
                  onChange={(e) => setDestinatarios(e.target.value)}
                  placeholder="email1@empresa.com, email2@empresa.com"
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleGenerarReporte}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center"
            >
              <span className="mr-2">🚀</span>
              Generar ahora
            </button>
            <button
              onClick={handleProgramarReporte}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
            >
              <span className="mr-2">⏰</span>
              Programar automáticamente
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
          </div>
        </div>

        {/* Reportes configurados */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">📋 Reportes configurados</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {reportesConfigurados.length} reportes configurados
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporte
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Configuración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ejecución
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destinatarios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportesConfigurados.map((reporte) => (
                  <tr key={reporte.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{reporte.nombre}</p>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            reporte.estado === 'activo' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {reporte.estado === 'activo' ? '✅ Activo' : '❌ Inactivo'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2">📊</span>
                          <span className="text-sm text-gray-700">{reporte.tipo}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2">📁</span>
                          <span className="text-sm text-gray-700">{reporte.formato}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2">⏰</span>
                          <span className="text-sm text-gray-700">{reporte.programacion}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2">📅</span>
                          <span className="text-sm text-gray-700">Última: {reporte.ultimaEjecucion}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2">⏱️</span>
                          <span className="text-sm text-gray-700">Próxima: {reporte.proximaEjecucion}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-700">
                          {reporte.destinatarios.length} destinatario(s)
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">
                          {reporte.destinatarios.join(', ')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg">
                          <span className="text-lg">🔄</span>
                        </button>
                        <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg">
                          <span className="text-lg">📧</span>
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg">
                          <span className="text-lg">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dashboards personalizados */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">📊 Dashboards personalizados</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Nuevo dashboard
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardsPersonalizados.map((dashboard) => (
              <div key={dashboard.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{dashboard.nombre}</h3>
                    <p className="text-sm text-gray-600">{dashboard.audiencia}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    dashboard.estado === 'activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dashboard.estado === 'activo' ? '✅' : '❌'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">📈 Métricas incluidas</p>
                    <div className="flex flex-wrap gap-1">
                      {dashboard.metricas.slice(0, 3).map((metrica, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {metrica}
                        </span>
                      ))}
                      {dashboard.metricas.length > 3 && (
                        <span className="text-xs text-gray-500">+{dashboard.metricas.length - 3}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-1">⏰</span>
                      <span className="text-gray-700">{dashboard.frecuencia}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-1">👥</span>
                      <span className="text-gray-700">{dashboard.acceso.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                      Acceder
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integraciones y API */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🔗 Integraciones y API</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">🌐 API de exportación</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Endpoint disponible</span>
                  <span className="text-sm font-medium text-green-600">✅ Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Límite de solicitudes</span>
                  <span className="text-sm font-medium text-gray-900">1000/día</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Formatos soportados</span>
                  <span className="text-sm font-medium text-gray-900">JSON, CSV, XML</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                🔑 Ver documentación API
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">🔄 Sincronización automática</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Google Drive</span>
                  <span className="text-sm font-medium text-green-600">✅ Conectado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Microsoft OneDrive</span>
                  <span className="text-sm font-medium text-yellow-600">🔄 Pendiente</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Slack / Teams</span>
                  <span className="text-sm font-medium text-green-600">✅ Disponible</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                ⚙️ Configurar integraciones
              </button>
            </div>
          </div>
        </div>

        {/* Opciones de compartición avanzada */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Opciones de compartición avanzada</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center">
              <span className="text-2xl mb-2">🔗</span>
              <span className="font-medium text-blue-900">Enlace público</span>
              <span className="text-xs text-gray-600 mt-1">Compartir con acceso temporal</span>
            </button>
            
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📧</span>
              <span className="font-medium text-green-900">Newsletter automática</span>
              <span className="text-xs text-gray-600 mt-1">Reportes periódicos por email</span>
            </button>
            
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📱</span>
              <span className="font-medium text-purple-900">App móvil</span>
              <span className="text-xs text-gray-600 mt-1">Dashboard en dispositivo móvil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportacionComparticionPage;
