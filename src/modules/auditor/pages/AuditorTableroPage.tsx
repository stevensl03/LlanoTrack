// pages/Seguimiento/Tablero.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const AuditorTableroPage = () => {
  const navigate = useNavigate();
  
  const [filtros, setFiltros] = useState({
    fechaDesde: '2025-11-01',
    fechaHasta: '2025-11-26',
    gestor: 'todos',
    entidad: 'todos',
    tipoSolicitud: 'todos',
    estado: 'todos',
    urgencia: 'todos',
    cumplimiento: 'todos'
  });

  // Datos de ejemplo para gráficos
  const [datosGestores, setDatosGestores] = useState([
    { nombre: 'Jaime Tiuso', casos: 28, cumplimiento: 96, tiempoPromedio: '3.2 días' },
    { nombre: 'Carlos Ramírez', casos: 22, cumplimiento: 91, tiempoPromedio: '4.1 días' },
    { nombre: 'María González', casos: 18, cumplimiento: 89, tiempoPromedio: '4.5 días' },
    { nombre: 'Ana Rodríguez', casos: 16, cumplimiento: 94, tiempoPromedio: '3.8 días' },
    { nombre: 'Luis Martínez', casos: 14, cumplimiento: 87, tiempoPromedio: '4.8 días' }
  ]);

  const [datosEntidades, setDatosEntidades] = useState([
    { nombre: 'Ministerio de Hacienda', casos: 32, cumplimiento: 91 },
    { nombre: 'Ministerio de Salud', casos: 28, cumplimiento: 93 },
    { nombre: 'Procuraduría General', casos: 24, cumplimiento: 88 },
    { nombre: 'Ministerio de Transporte', casos: 20, cumplimiento: 95 },
    { nombre: 'Ministerio de Ambiente', casos: 18, cumplimiento: 90 }
  ]);

  const [tendenciasTemporales, setTendenciasTemporales] = useState([
    { semana: 'Sem 45', recibidos: 42, respondidos: 38, cumplimiento: 90 },
    { semana: 'Sem 46', recibidos: 38, respondidos: 35, cumplimiento: 92 },
    { semana: 'Sem 47', recibidos: 45, respondidos: 40, cumplimiento: 89 },
    { semana: 'Sem 48', recibidos: 41, respondidos: 38, cumplimiento: 93 },
    { semana: 'Sem 49', recibidos: 39, respondidos: 36, cumplimiento: 92 }
  ]);

  // Heatmap de actividad
  const [heatmapData, setHeatmapData] = useState([
    { hora: '08:00', lunes: 3, martes: 2, miercoles: 4, jueves: 3, viernes: 2 },
    { hora: '10:00', lunes: 5, martes: 4, miercoles: 6, jueves: 5, viernes: 3 },
    { hora: '12:00', lunes: 2, martes: 3, miercoles: 2, jueves: 4, viernes: 1 },
    { hora: '14:00', lunes: 4, martes: 5, miercoles: 4, jueves: 6, viernes: 2 },
    { hora: '16:00', lunes: 3, martes: 2, miercoles: 3, jueves: 4, viernes: 1 }
  ]);

  const getHeatmapColor = (valor: number) => {
    if (valor >= 5) return 'bg-red-500';
    if (valor >= 4) return 'bg-orange-500';
    if (valor >= 3) return 'bg-yellow-500';
    if (valor >= 2) return 'bg-green-400';
    return 'bg-green-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📊 Tablero Interactivo</h1>
              <p className="text-gray-600 mt-1">
                Visualizaciones dinámicas y filtros avanzados para análisis detallado
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
                <span className="mr-2">💾</span>
                Guardar vista
              </button>
            </div>
          </div>
        </div>

        {/* Filtros dinámicos */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Filtros dinámicos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Período de fechas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filtros.fechaDesde}
                  onChange={(e) => setFiltros({...filtros, fechaDesde: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="date"
                  value={filtros.fechaHasta}
                  onChange={(e) => setFiltros({...filtros, fechaHasta: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👤 Gestor específico
              </label>
              <select
                value={filtros.gestor}
                onChange={(e) => setFiltros({...filtros, gestor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los gestores</option>
                <option value="jaime">Jaime Tiuso</option>
                <option value="carlos">Carlos Ramírez</option>
                <option value="maria">María González</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏢 Entidad remitente
              </label>
              <select
                value={filtros.entidad}
                onChange={(e) => setFiltros({...filtros, entidad: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todas las entidades</option>
                <option value="mh">Ministerio de Hacienda</option>
                <option value="ms">Ministerio de Salud</option>
                <option value="pg">Procuraduría General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Tipo de solicitud
              </label>
              <select
                value={filtros.tipoSolicitud}
                onChange={(e) => setFiltros({...filtros, tipoSolicitud: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los tipos</option>
                <option value="legal">Legal</option>
                <option value="tecnica">Técnica</option>
                <option value="administrativa">Administrativa</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🚦 Estado del proceso
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los estados</option>
                <option value="asignado">Asignado</option>
                <option value="redaccion">En redacción</option>
                <option value="revision">En revisión</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ⚠️ Nivel de urgencia
              </label>
              <select
                value={filtros.urgencia}
                onChange={(e) => setFiltros({...filtros, urgencia: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los niveles</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ✅ Cumplimiento
              </label>
              <select
                value={filtros.cumplimiento}
                onChange={(e) => setFiltros({...filtros, cumplimiento: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="cumplido">Cumplido</option>
                <option value="no-cumplido">No cumplido</option>
                <option value="en-proceso">En proceso</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setFiltros({
                fechaDesde: '2025-11-01',
                fechaHasta: '2025-11-26',
                gestor: 'todos',
                entidad: 'todos',
                tipoSolicitud: 'todos',
                estado: 'todos',
                urgencia: 'todos',
                cumplimiento: 'todos'
              })}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mr-3"
            >
              🗑️ Limpiar filtros
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <span className="mr-2">🔍</span>
              Aplicar filtros
            </button>
          </div>
        </div>

        {/* Visualizaciones */}
        <div className="space-y-6">
          {/* Gráficos de barras - Por gestor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">📊 Desempeño por gestor</h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Ordenar por: Casos</option>
                <option>Ordenar por: Cumplimiento</option>
                <option>Ordenar por: Tiempo</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {datosGestores.map((gestor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm">👤</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{gestor.nombre}</p>
                        <p className="text-xs text-gray-500">⏱️ {gestor.tiempoPromedio}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">{gestor.casos} casos</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        gestor.cumplimiento >= 95 ? 'bg-green-100 text-green-800' :
                        gestor.cumplimiento >= 90 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {gestor.cumplimiento}% cumplimiento
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: `${(gestor.casos / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráficos de barras - Por entidad */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">🏢 Volumen por entidad</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Ver reporte completo
              </button>
            </div>
            
            <div className="space-y-4">
              {datosEntidades.map((entidad, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span className="mr-3">🏢</span>
                      <p className="font-medium text-gray-900">{entidad.nombre}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">{entidad.casos} solicitudes</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entidad.cumplimiento >= 95 ? 'bg-green-100 text-green-800' :
                        entidad.cumplimiento >= 90 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entidad.cumplimiento}% cumplimiento
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-green-500"
                      style={{ width: `${(entidad.casos / 35) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico de líneas - Tendencias temporales */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">📈 Tendencias semanales</h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Últimas 5 semanas</option>
                <option>Últimas 10 semanas</option>
                <option>Este trimestre</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {tendenciasTemporales.map((semana, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{semana.semana}</span>
                    <div className="flex space-x-4">
                      <span className="text-sm text-blue-600">📥 {semana.recibidos}</span>
                      <span className="text-sm text-green-600">📤 {semana.respondidos}</span>
                      <span className={`text-sm ${
                        semana.cumplimiento >= 95 ? 'text-green-600' :
                        semana.cumplimiento >= 90 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        ✅ {semana.cumplimiento}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-4 space-x-1">
                    <div 
                      className="bg-blue-500 rounded-l" 
                      style={{ width: `${(semana.recibidos / 50) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500 rounded-r" 
                      style={{ width: `${(semana.respondidos / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap de actividad */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">🔥 Heatmap de actividad</h2>
              <p className="text-sm text-gray-600">Correos recibidos por hora y día</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hora</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Lunes</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Martes</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Miércoles</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Jueves</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Viernes</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((fila, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{fila.hora}</td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-block w-10 h-10 ${getHeatmapColor(fila.lunes)} rounded flex items-center justify-center text-white font-medium`}>
                          {fila.lunes}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-block w-10 h-10 ${getHeatmapColor(fila.martes)} rounded flex items-center justify-center text-white font-medium`}>
                          {fila.martes}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-block w-10 h-10 ${getHeatmapColor(fila.miercoles)} rounded flex items-center justify-center text-white font-medium`}>
                          {fila.miercoles}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-block w-10 h-10 ${getHeatmapColor(fila.jueves)} rounded flex items-center justify-center text-white font-medium`}>
                          {fila.jueves}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-block w-10 h-10 ${getHeatmapColor(fila.viernes)} rounded flex items-center justify-center text-white font-medium`}>
                          {fila.viernes}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-300 rounded mr-2"></div>
                <span className="text-xs text-gray-600">Baja (0-1)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                <span className="text-xs text-gray-600">Media (2)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-xs text-gray-600">Alta (3)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span className="text-xs text-gray-600">Muy alta (4)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-xs text-gray-600">Crítica (5+)</span>
              </div>
            </div>
          </div>

          {/* Análisis de correlaciones */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🔗 Análisis de correlaciones</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">📊 Correlación volumen-cumplimiento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gestores con mayor volumen</span>
                    <span className="text-sm font-medium text-green-600">94% cumplimiento</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gestores con menor volumen</span>
                    <span className="text-sm font-medium text-yellow-600">88% cumplimiento</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  💡 Los gestores con mayor volumen mantienen mejor cumplimiento
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">⏱️ Correlación urgencia-tiempo</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Casos Alta urgencia</span>
                    <span className="text-sm font-medium text-green-600">2.3 días promedio</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Casos Baja urgencia</span>
                    <span className="text-sm font-medium text-yellow-600">5.1 días promedio</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  💡 Los casos urgentes se procesan 55% más rápido
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Opciones de exportación */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📥 Exportar vista actual</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-green-900">Exportar a Excel</span>
              <span className="text-xs text-gray-600 mt-1">Datos completos (.xlsx)</span>
            </button>
            <button className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📄</span>
              <span className="font-medium text-red-900">Generar PDF</span>
              <span className="text-xs text-gray-600 mt-1">Reporte formal (.pdf)</span>
            </button>
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📈</span>
              <span className="font-medium text-purple-900">Imagen de dashboard</span>
              <span className="text-xs text-gray-600 mt-1">Captura PNG/JPEG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditorTableroPage;
