// pages/Seguimiento/Cumplimiento.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AuditorCumplimientoPage = () => {
  const navigate = useNavigate();
  
  const [filtros, setFiltros] = useState({
    fechaDesde: '2025-11-01',
    fechaHasta: '2025-11-26',
    gestor: 'todos',
    entidad: 'todos',
    tipo: 'todos',
    cumplimiento: 'todos',
    busqueda: ''
  });

  const [reporteCasos, setReporteCasos] = useState([
    {
      id: '2025-001-MH',
      radicadoEntrada: '322-01527-E25',
      radicadoSalida: '322-02840-S25',
      entidad: 'Ministerio de Hacienda',
      tipo: 'Consulta legal',
      plazoMaximo: 10,
      plazoUsado: 7,
      diasUtilizados: 7,
      estadoCumplimiento: 'cumplido',
      porcentajeUso: 70,
      gestor: 'Jaime Tiuso',
      fechaRecepcion: '2025-11-20',
      fechaEnvio: '2025-11-27'
    },
    {
      id: '2025-002-MS',
      radicadoEntrada: '322-01528-E25',
      radicadoSalida: '322-02841-S25',
      entidad: 'Ministerio de Salud',
      tipo: 'Solicitud técnica',
      plazoMaximo: 7,
      plazoUsado: 8,
      diasUtilizados: 8,
      estadoCumplimiento: 'no-cumplido',
      porcentajeUso: 114,
      gestor: 'Carlos Ramírez',
      fechaRecepcion: '2025-11-18',
      fechaEnvio: '2025-11-26'
    },
    {
      id: '2025-003-PG',
      radicadoEntrada: '322-01529-E25',
      radicadoSalida: '322-02842-S25',
      entidad: 'Procuraduría General',
      tipo: 'Requerimiento legal',
      plazoMaximo: 5,
      plazoUsado: 5,
      diasUtilizados: 5,
      estadoCumplimiento: 'cumplido',
      porcentajeUso: 100,
      gestor: 'María González',
      fechaRecepcion: '2025-11-22',
      fechaEnvio: '2025-11-27'
    },
    {
      id: '2025-004-MT',
      radicadoEntrada: '322-01530-E25',
      radicadoSalida: '322-02843-S25',
      entidad: 'Ministerio de Transporte',
      tipo: 'Documentación administrativa',
      plazoMaximo: 14,
      plazoUsado: 9,
      diasUtilizados: 9,
      estadoCumplimiento: 'cumplido',
      porcentajeUso: 64,
      gestor: 'Ana Rodríguez',
      fechaRecepcion: '2025-11-15',
      fechaEnvio: '2025-11-24'
    },
    {
      id: '2025-005-MA',
      radicadoEntrada: '322-01531-E25',
      radicadoSalida: '322-02844-S25',
      entidad: 'Ministerio de Ambiente',
      tipo: 'Informe técnico',
      plazoMaximo: 8,
      plazoUsado: 11,
      diasUtilizados: 11,
      estadoCumplimiento: 'no-cumplido',
      porcentajeUso: 138,
      gestor: 'Luis Martínez',
      fechaRecepcion: '2025-11-19',
      fechaEnvio: '2025-11-30'
    }
  ]);

  // Indicadores de desempeño
  const [indicadores, setIndicadores] = useState({
    tiempoPromedioEtapas: {
      clasificacion: '0.5 días',
      redaccion: '2.1 días',
      revision: '1.2 días',
      aprobacion: '0.8 días',
      envio: '0.4 días'
    },
    desviacionEstandar: '1.8 días',
    tendenciasMensuales: [
      { mes: 'Sep', cumplimiento: 85 },
      { mes: 'Oct', cumplimiento: 88 },
      { mes: 'Nov', cumplimiento: 87 }
    ]
  });

  const getCumplimientoColor = (estado: string) => {
    switch (estado) {
      case 'cumplido': return 'bg-green-100 text-green-800';
      case 'no-cumplido': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCumplimientoIcon = (estado: string) => {
    switch (estado) {
      case 'cumplido': return '✅';
      case 'no-cumplido': return '❌';
      default: return '⏳';
    }
  };

  const getPorcentajeColor = (porcentaje: number) => {
    if (porcentaje <= 70) return 'text-green-600';
    if (porcentaje <= 90) return 'text-yellow-600';
    if (porcentaje <= 100) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📈 Análisis de Cumplimiento</h1>
              <p className="text-gray-600 mt-1">
                Reporte detallado por caso e indicadores de desempeño
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
                <span className="mr-2">📥</span>
                Exportar reporte
              </button>
            </div>
          </div>
        </div>

        {/* Resumen general */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total casos analizados</p>
                <p className="text-2xl font-bold text-gray-900">{reporteCasos.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">📊</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {reporteCasos.filter(c => c.estadoCumplimiento === 'cumplido').length} cumplidos
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa de cumplimiento</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (reporteCasos.filter(c => c.estadoCumplimiento === 'cumplido').length / reporteCasos.length) * 100
                  )}%
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl text-green-600">✅</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ 
                    width: `${(reporteCasos.filter(c => c.estadoCumplimiento === 'cumplido').length / reporteCasos.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Uso promedio del plazo</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    reporteCasos.reduce((sum, c) => sum + c.porcentajeUso, 0) / reporteCasos.length
                  )}%
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl text-purple-600">⏱️</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Objetivo: ≤ 80% del plazo</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Filtros de análisis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👤 Gestor
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
                🏢 Entidad
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
                ✅ Cumplimiento
              </label>
              <select
                value={filtros.cumplimiento}
                onChange={(e) => setFiltros({...filtros, cumplimiento: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los estados</option>
                <option value="cumplido">Cumplido</option>
                <option value="no-cumplido">No cumplido</option>
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
                tipo: 'todos',
                cumplimiento: 'todos',
                busqueda: ''
              })}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 mr-3"
            >
              🗑️ Limpiar filtros
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              🔄 Aplicar filtros
            </button>
          </div>
        </div>

        {/* Tabla de casos */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">📋 Reporte detallado por caso</h2>
            <p className="text-sm text-gray-600 mt-1">
              Análisis individual de cumplimiento de plazos
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad / Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plazo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo utilizado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cumplimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gestor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reporteCasos.map((caso, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{caso.id}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          <p>📥 {caso.radicadoEntrada}</p>
                          <p>📤 {caso.radicadoSalida}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{caso.entidad}</p>
                        <p className="text-sm text-gray-600">{caso.tipo}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          <p>📅 Rec: {caso.fechaRecepcion}</p>
                          <p>📅 Env: {caso.fechaEnvio}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Máximo:</span>
                          <span className="font-medium">{caso.plazoMaximo} días</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Usado:</span>
                          <span className="font-medium">{caso.plazoUsado} días</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{caso.diasUtilizados} días</p>
                        <p className={`text-sm font-medium ${getPorcentajeColor(caso.porcentajeUso)}`}>
                          {caso.porcentajeUso}% del plazo
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              caso.porcentajeUso <= 70 ? 'bg-green-500' :
                              caso.porcentajeUso <= 90 ? 'bg-yellow-500' :
                              caso.porcentajeUso <= 100 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(caso.porcentajeUso, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCumplimientoColor(caso.estadoCumplimiento)}`}>
                        {getCumplimientoIcon(caso.estadoCumplimiento)} {caso.estadoCumplimiento === 'cumplido' ? 'Cumplido' : 'No cumplido'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-blue-600 text-sm">👤</span>
                        </div>
                        <span className="font-medium text-gray-900">{caso.gestor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indicadores de desempeño */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tiempo promedio por etapa */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">⏱️ Tiempo promedio por etapa</h2>
            
            <div className="space-y-4">
              {Object.entries(indicadores.tiempoPromedioEtapas).map(([etapa, tiempo], index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700 capitalize">{etapa}</span>
                    <span className="text-sm font-medium text-gray-900">{tiempo}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        etapa === 'redaccion' ? 'bg-red-500' :
                        etapa === 'revision' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ 
                        width: `${parseFloat(tiempo) * 50}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>📌 Análisis:</strong> La redacción representa el 48% del tiempo total del proceso.
                Recomendación: Implementar plantillas estandarizadas.
              </p>
            </div>
          </div>

          {/* Tendencias y desviaciones */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Tendencias y desviaciones</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Desviación estándar del tiempo</span>
                  <span className="text-sm font-medium text-gray-900">{indicadores.desviacionEstandar}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Indica la variabilidad en los tiempos de respuesta. Menor es mejor.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tendencias mensuales de cumplimiento</h3>
                <div className="space-y-3">
                  {indicadores.tendenciasMensuales.map((mes, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{mes.mes}</span>
                        <span className={`text-sm font-medium ${
                          mes.cumplimiento >= 90 ? 'text-green-600' :
                          mes.cumplimiento >= 85 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {mes.cumplimiento}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            mes.cumplimiento >= 90 ? 'bg-green-500' :
                            mes.cumplimiento >= 85 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${mes.cumplimiento}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">📋 Distribución de cumplimiento</h3>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round((reporteCasos.filter(c => c.porcentajeUso <= 80).length / reporteCasos.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">Óptimo (≤80%)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {Math.round((reporteCasos.filter(c => c.porcentajeUso > 80 && c.porcentajeUso <= 100).length / reporteCasos.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">Aceptable (81-100%)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {Math.round((reporteCasos.filter(c => c.porcentajeUso > 100).length / reporteCasos.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">Excedido (100%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Análisis de correlación */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🔍 Análisis de correlaciones clave</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">📊 Tipo vs. Cumplimiento</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Consultas legales</span>
                  <span className="text-sm font-medium text-green-600">92% cumplimiento</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Solicitudes técnicas</span>
                  <span className="text-sm font-medium text-yellow-600">85% cumplimiento</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Documentación administrativa</span>
                  <span className="text-sm font-medium text-green-600">94% cumplimiento</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">⏱️ Plazo vs. Uso real</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Plazos cortos (≤7 días)</span>
                  <span className="text-sm font-medium text-green-600">78% uso promedio</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Plazos medios (8-14 días)</span>
                  <span className="text-sm font-medium text-yellow-600">92% uso promedio</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Plazos largos (14 días)</span>
                  <span className="text-sm font-medium text-red-600">115% uso promedio</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 Hallazgo importante:</strong> Los plazos más largos tienden a excederse más frecuentemente.
              Recomendación: Revisar la estimación de tiempos para proyectos de larga duración.
            </p>
          </div>
        </div>

        {/* Exportación de reportes */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📥 Exportar análisis de cumplimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex items-center">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <p className="font-medium text-green-900">Excel completo</p>
                <p className="text-xs text-gray-600">Todos los casos y métricas</p>
              </div>
            </button>
            <button className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex items-center">
              <span className="text-2xl mr-3">📄</span>
              <div>
                <p className="font-medium text-red-900">PDF ejecutivo</p>
                <p className="text-xs text-gray-600">Resumen para dirección</p>
              </div>
            </button>
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex items-center">
              <span className="text-2xl mr-3">📈</span>
              <div>
                <p className="font-medium text-purple-900">Gráficos en imagen</p>
                <p className="text-xs text-gray-600">PNG/JPEG para presentaciones</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditorCumplimientoPage;
