// pages/Seguimiento/ReportesEntidad.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ReportesEntidadPage = () => {
  const navigate = useNavigate();
  
  const [filtros, setFiltros] = useState({
    periodo: 'mes-actual',
    tipoAnalisis: 'volumen',
    busqueda: ''
  });

  const [entidades, setEntidades] = useState([
    {
      id: 'ENT-001',
      nombre: 'Ministerio de Hacienda',
      dominio: 'hacienda.gov.co',
      totalSolicitudes: 32,
      volumenMensual: 8,
      distribucionUrgencia: {
        alta: 12,
        media: 15,
        baja: 5
      },
      tiposSolicitud: [
        { tipo: 'Consulta legal', cantidad: 18, porcentaje: 56 },
        { tipo: 'Requerimiento administrativo', cantidad: 10, porcentaje: 31 },
        { tipo: 'Solicitud técnica', cantidad: 4, porcentaje: 13 }
      ],
      tiempoPromedioRespuesta: '3.8 días',
      cumplimientoHistorico: 91,
      tendencia: 'estable',
      contactoPrincipal: 'Juan Pérez - juan.perez@hacienda.gov.co'
    },
    {
      id: 'ENT-002',
      nombre: 'Ministerio de Salud',
      dominio: 'salud.gov.co',
      totalSolicitudes: 28,
      volumenMensual: 7,
      distribucionUrgencia: {
        alta: 8,
        media: 14,
        baja: 6
      },
      tiposSolicitud: [
        { tipo: 'Solicitud técnica', cantidad: 16, porcentaje: 57 },
        { tipo: 'Documentación administrativa', cantidad: 8, porcentaje: 29 },
        { tipo: 'Consulta legal', cantidad: 4, porcentaje: 14 }
      ],
      tiempoPromedioRespuesta: '4.2 días',
      cumplimientoHistorico: 93,
      tendencia: 'mejora',
      contactoPrincipal: 'María Rodríguez - maria.rodriguez@salud.gov.co'
    },
    {
      id: 'ENT-003',
      nombre: 'Procuraduría General',
      dominio: 'procuraduria.gov.co',
      totalSolicitudes: 24,
      volumenMensual: 6,
      distribucionUrgencia: {
        alta: 15,
        media: 8,
        baja: 1
      },
      tiposSolicitud: [
        { tipo: 'Requerimiento legal', cantidad: 20, porcentaje: 83 },
        { tipo: 'Consulta legal', cantidad: 4, porcentaje: 17 }
      ],
      tiempoPromedioRespuesta: '4.8 días',
      cumplimientoHistorico: 88,
      tendencia: 'disminucion',
      contactoPrincipal: 'Carlos López - carlos.lopez@procuraduria.gov.co'
    },
    {
      id: 'ENT-004',
      nombre: 'Ministerio de Transporte',
      dominio: 'transporte.gov.co',
      totalSolicitudes: 20,
      volumenMensual: 5,
      distribucionUrgencia: {
        alta: 6,
        media: 10,
        baja: 4
      },
      tiposSolicitud: [
        { tipo: 'Documentación técnica', cantidad: 12, porcentaje: 60 },
        { tipo: 'Solicitud administrativa', cantidad: 6, porcentaje: 30 },
        { tipo: 'Consulta legal', cantidad: 2, porcentaje: 10 }
      ],
      tiempoPromedioRespuesta: '3.5 días',
      cumplimientoHistorico: 95,
      tendencia: 'mejora',
      contactoPrincipal: 'Ana Gómez - ana.gomez@transporte.gov.co'
    },
    {
      id: 'ENT-005',
      nombre: 'Ministerio de Ambiente',
      dominio: 'ambiente.gov.co',
      totalSolicitudes: 18,
      volumenMensual: 4.5,
      distribucionUrgencia: {
        alta: 5,
        media: 10,
        baja: 3
      },
      tiposSolicitud: [
        { tipo: 'Informe técnico', cantidad: 10, porcentaje: 56 },
        { tipo: 'Requerimiento ambiental', cantidad: 6, porcentaje: 33 },
        { tipo: 'Consulta legal', cantidad: 2, porcentaje: 11 }
      ],
      tiempoPromedioRespuesta: '4.0 días',
      cumplimientoHistorico: 90,
      tendencia: 'estable',
      contactoPrincipal: 'Luis Fernández - luis.fernandez@ambiente.gov.co'
    }
  ]);

  // Tendencias de solicitud (últimos 6 meses)
  const [tendencias, setTendencias] = useState([
    { mes: 'Jun', total: 42, tendencia: '↗️' },
    { mes: 'Jul', total: 38, tendencia: '↘️' },
    { mes: 'Ago', total: 45, tendencia: '↗️' },
    { mes: 'Sep', total: 41, tendencia: '↘️' },
    { mes: 'Oct', total: 48, tendencia: '↗️' },
    { mes: 'Nov', total: 44, tendencia: '↘️' }
  ]);

  const getCumplimientoColor = (porcentaje: number) => {
    if (porcentaje >= 95) return 'bg-green-100 text-green-800';
    if (porcentaje >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'mejora': return 'text-green-600';
      case 'estable': return 'text-yellow-600';
      case 'disminucion': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'mejora': return '📈';
      case 'estable': return '➡️';
      case 'disminucion': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">🏢 Reportes por Entidad</h1>
              <p className="text-gray-600 mt-1">
                Análisis de solicitudes y desempeño por entidad remitente
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
                Exportar análisis
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y controles */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Período de análisis
              </label>
              <select
                value={filtros.periodo}
                onChange={(e) => setFiltros({...filtros, periodo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="mes-actual">Mes actual</option>
                <option value="trimestre">Último trimestre</option>
                <option value="semestre">Último semestre</option>
                <option value="anual">Año completo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Tipo de análisis
              </label>
              <select
                value={filtros.tipoAnalisis}
                onChange={(e) => setFiltros({...filtros, tipoAnalisis: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="volumen">Por volumen</option>
                <option value="cumplimiento">Por cumplimiento</option>
                <option value="urgencia">Por nivel de urgencia</option>
                <option value="tiempo">Por tiempo de respuesta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔎 Buscar entidad
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                  placeholder="Nombre de entidad..."
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen general */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total entidades</p>
                <p className="text-2xl font-bold text-gray-900">{entidades.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">🏢</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📈 +2 nuevas este año</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Solicitudes totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {entidades.reduce((sum, e) => sum + e.totalSolicitudes, 0)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl text-green-600">📧</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📊 {Math.round(entidades.reduce((sum, e) => sum + e.totalSolicitudes, 0) / entidades.length)} promedio</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cumplimiento promedio</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(entidades.reduce((sum, e) => sum + e.cumplimientoHistorico, 0) / entidades.length)}%
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
                    width: `${Math.round(entidades.reduce((sum, e) => sum + e.cumplimientoHistorico, 0) / entidades.length)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo promedio</p>
                <p className="text-2xl font-bold text-purple-600">4.1 días</p>
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

        {/* Tabla de entidades */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">📋 Análisis por entidad</h2>
            <p className="text-sm text-gray-600 mt-1">
              Desglose detallado de solicitudes y desempeño
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volumen / Urgencia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipos de solicitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desempeño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entidades.map((entidad, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{entidad.nombre}</p>
                        <p className="text-sm text-gray-600">{entidad.dominio}</p>
                        <div className="flex items-center mt-2">
                          <span className={`mr-1 ${getTendenciaColor(entidad.tendencia)}`}>
                            {getTendenciaIcon(entidad.tendencia)}
                          </span>
                          <span className={`text-xs ${getTendenciaColor(entidad.tendencia)}`}>
                            {entidad.tendencia}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-900">{entidad.totalSolicitudes} solicitudes</p>
                          <p className="text-xs text-gray-500">📈 {entidad.volumenMensual}/mes</p>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            🔴 {entidad.distribucionUrgencia.alta}
                          </span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            🟡 {entidad.distribucionUrgencia.media}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            🟢 {entidad.distribucionUrgencia.baja}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {entidad.tiposSolicitud.slice(0, 2).map((tipo, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-sm text-gray-700">{tipo.tipo}</span>
                            <span className="text-sm font-medium text-gray-900">{tipo.porcentaje}%</span>
                          </div>
                        ))}
                        {entidad.tiposSolicitud.length > 2 && (
                          <p className="text-xs text-gray-500">+{entidad.tiposSolicitud.length - 2} tipos más</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCumplimientoColor(entidad.cumplimientoHistorico)}`}>
                          {entidad.cumplimientoHistorico}% cumplimiento
                        </span>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>⏱️ {entidad.tiempoPromedioRespuesta}</span>
                          <span>📊 Histórico</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-700 truncate max-w-xs">{entidad.contactoPrincipal}</p>
                        <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                          Ver historial completo →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Análisis de tendencias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tendencias de volumen */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">📈 Tendencias de solicitud</h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Últimos 6 meses</option>
                <option>Último año</option>
                <option>Últimos 2 años</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {tendencias.map((mes, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{mes.mes}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-700">{mes.total} solicitudes</span>
                      <span className="text-lg">{mes.tendencia}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(mes.total / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>📌 Análisis:</strong> Volumen estable con picos en agosto y octubre.
                Tendencia general: ligero crecimiento del 5% semestral.
              </p>
            </div>
          </div>

          {/* Distribución por tipo y urgencia */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Distribución por tipo y urgencia</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">📝 Tipos más comunes</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Consulta legal</span>
                      <span className="text-sm font-medium text-gray-900">38%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Solicitud técnica</span>
                      <span className="text-sm font-medium text-gray-900">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Administrativo</span>
                      <span className="text-sm font-medium text-gray-900">22%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">⚠️ Niveles de urgencia</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Alta urgencia</span>
                      <span className="text-sm font-medium text-gray-900">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Media urgencia</span>
                      <span className="text-sm font-medium text-gray-900">52%</span>
                    </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
             <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '52%' }}>
                </div>
        </div>
    </div>
        <div> <div className="flex justify-between mb-1"> <span className="text-sm text-gray-600">Baja urgencia</span> <span className="text-sm font-medium text-gray-900">20%</span> </div> <div className="w-full bg-gray-200 rounded-full h-2"> <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div> </div> </div> </div> </div> </div>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>💡 Hallazgo:</strong> El 28% de las solicitudes son de alta urgencia, 
            requiriendo atención prioritaria. Mayor volumen en consultas legales (38%).
          </p>
        </div>
      </div>
    </div>

    {/* Análisis de cumplimiento por entidad */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">✅ Cumplimiento histórico por entidad</h2>
      
      <div className="space-y-6">
        {entidades.map((entidad, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-3">🏢</span>
                <div>
                  <p className="font-medium text-gray-900">{entidad.nombre}</p>
                  <p className="text-xs text-gray-500">{entidad.totalSolicitudes} solicitudes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCumplimientoColor(entidad.cumplimientoHistorico)}`}>
                  {entidad.cumplimientoHistorico}% cumplimiento
                </span>
                <span className="text-sm text-gray-700">⏱️ {entidad.tiempoPromedioRespuesta}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${
                  entidad.cumplimientoHistorico >= 95 ? 'bg-green-500' :
                  entidad.cumplimientoHistorico >= 90 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${entidad.cumplimientoHistorico}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recomendaciones estratégicas */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">🎯 Recomendaciones estratégicas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-900 mb-3">📈 Oportunidades de mejora</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• <strong>Procuraduría General:</strong> Incrementar cumplimiento del 88% al 92% con revisión temprana</li>
            <li>• <strong>Ministerio de Ambiente:</strong> Reducir tiempo de respuesta de 4.0 a 3.5 días</li>
            <li>• <strong>Entidades con alta urgencia:</strong> Implementar proceso express para solicitudes críticas</li>
          </ul>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">🤝 Gestión de relaciones</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Ministerio de Hacienda:</strong> Mayor volumen, mantener comunicación proactiva</li>
            <li>• <strong>Ministerio de Transporte:</strong> Excelente desempeño (95%), considerar como referencia</li>
            <li>• <strong>Entidades con tendencia a la baja:</strong> Programar reuniones de seguimiento</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Exportación y reportes */}
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📥 Reportes específicos por entidad</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center">
          <span className="text-2xl mb-2">📊</span>
          <span className="font-medium text-blue-900">Reporte por entidad</span>
          <span className="text-xs text-gray-600 mt-1">Análisis individual completo</span>
        </button>
        
        <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
          <span className="text-2xl mb-2">📈</span>
          <span className="font-medium text-green-900">Tendencias históricas</span>
          <span className="text-xs text-gray-600 mt-1">Evolución temporal</span>
        </button>
        
        <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
          <span className="text-2xl mb-2">🤝</span>
          <span className="font-medium text-purple-900">Gestión de contactos</span>
          <span className="text-xs text-gray-600 mt-1">Directorio y seguimiento</span>
        </button>
        
        <button className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex flex-col items-center">
          <span className="text-2xl mb-2">🎯</span>
          <span className="font-medium text-red-900">Plan estratégico</span>
          <span className="text-xs text-gray-600 mt-1">Recomendaciones ejecutivas</span>
        </button>
      </div>
    </div>
  </div>
</div>
);
};

export default ReportesEntidadPage;
