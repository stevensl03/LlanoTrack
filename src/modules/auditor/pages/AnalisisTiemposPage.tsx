
// pages/Seguimiento/AnalisisTiempos.tsx
import  { useState } from 'react';
import { useNavigate } from 'react-router';

const AnalisisTiemposPage = () => {
  const navigate = useNavigate();
  
  const [periodo, setPeriodo] = useState('trimestre');
  const [filtroEtapa, setFiltroEtapa] = useState('todas');

  // Datos de tiempos por etapa
  const [tiemposEtapa, setTiemposEtapa] = useState([
    {
      etapa: 'Clasificación',
      tiempoActual: '0.5 días',
      tiempoObjetivo: '0.3 días',
      variacion: '+0.2 días',
      tendencia: 'estable',
      cuellos: false,
      recomendacion: 'Automatizar proceso inicial'
    },
    {
      etapa: 'Asignación',
      tiempoActual: '0.8 días',
      tiempoObjetivo: '0.5 días',
      variacion: '+0.3 días',
      tendencia: 'disminucion',
      cuellos: false,
      recomendacion: 'Mejorar notificaciones automáticas'
    },
    {
      etapa: 'Redacción',
      tiempoActual: '2.1 días',
      tiempoObjetivo: '1.5 días',
      variacion: '+0.6 días',
      tendencia: 'aumento',
      cuellos: true,
      recomendacion: 'Implementar plantillas estandarizadas'
    },
    {
      etapa: 'Revisión',
      tiempoActual: '1.2 días',
      tiempoObjetivo: '1.0 días',
      variacion: '+0.2 días',
      tendencia: 'estable',
      cuellos: false,
      recomendacion: 'Definir plazos por tipo de documento'
    },
    {
      etapa: 'Aprobación',
      tiempoActual: '0.8 días',
      tiempoObjetivo: '0.7 días',
      variacion: '+0.1 días',
      tendencia: 'estable',
      cuellos: false,
      recomendacion: 'Establecer prioridades claras'
    },
    {
      etapa: 'Firma Representación Legal',
      tiempoActual: '1.5 días',
      tiempoObjetivo: '1.0 días',
      variacion: '+0.5 días',
      tendencia: 'aumento',
      cuellos: true,
      recomendacion: 'Agendar firma semanal programada'
    },
    {
      etapa: 'Envío',
      tiempoActual: '0.4 días',
      tiempoObjetivo: '0.3 días',
      variacion: '+0.1 días',
      tendencia: 'estable',
      cuellos: false,
      recomendacion: 'Coordinación con servicio de mensajería'
    }
  ]);

  // Comparativa histórica (últimos 6 meses)
  const [comparativaHistorica, setComparativaHistorica] = useState([
    { mes: 'Jun', tiempoTotal: '7.2 días', eficiencia: 82 },
    { mes: 'Jul', tiempoTotal: '6.8 días', eficiencia: 85 },
    { mes: 'Ago', tiempoTotal: '7.5 días', eficiencia: 80 },
    { mes: 'Sep', tiempoTotal: '7.0 días', eficiencia: 83 },
    { mes: 'Oct', tiempoTotal: '6.5 días', eficiencia: 87 },
    { mes: 'Nov', tiempoTotal: '6.3 días', eficiencia: 89 }
  ]);

  // Cuellos de botella identificados
  const [cuellosBottleneck, setCuellosBottleneck] = useState([
    {
      etapa: 'Redacción',
      impacto: 'Alto',
      casosAfectados: 12,
      tiempoExtra: '2.6 días',
      causa: 'Falta de plantillas estandarizadas',
      solucion: 'Desarrollar biblioteca de plantillas'
    },
    {
      etapa: 'Firma Representación Legal',
      impacto: 'Medio',
      casosAfectados: 8,
      tiempoExtra: '1.8 días',
      causa: 'Disponibilidad del representante',
      solucion: 'Agendar día fijo semanal para firma'
    },
    {
      etapa: 'Revisión Técnica',
      impacto: 'Bajo',
      casosAfectados: 5,
      tiempoExtra: '1.2 días',
      causa: 'Dependencia de especialistas externos',
      solucion: 'Capacitar revisores internos'
    }
  ]);

  // Sugerencias de optimización
  const [sugerencias, setSugerencias] = useState([
    {
      titulo: 'Plantillas estandarizadas',
      etapa: 'Redacción',
      impacto: 'Reducción del 30%',
      esfuerzo: 'Medio',
      plazo: '1 mes',
      descripcion: 'Desarrollar plantillas para los 5 tipos de documentos más comunes'
    },
    {
      titulo: 'Proceso express para urgencias',
      etapa: 'Todo el proceso',
      impacto: 'Reducción del 50%',
      esfuerzo: 'Alto',
      plazo: '2 meses',
      descripcion: 'Crear flujo paralelo para casos de alta urgencia'
    },
    {
      titulo: 'Automatización de notificaciones',
      etapa: 'Asignación y seguimiento',
      impacto: 'Reducción del 20%',
      esfuerzo: 'Bajo',
      plazo: '2 semanas',
      descripcion: 'Implementar alertas automáticas para cada etapa'
    }
  ]);

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'aumento': return 'text-red-600';
      case 'disminucion': return 'text-green-600';
      default: return 'text-yellow-600';
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'aumento': return '📈';
      case 'disminucion': return '📉';
      default: return '➡️';
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getEsfuerzoColor = (esfuerzo: string) => {
    switch (esfuerzo) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">⏱️ Análisis de Tiempos</h1>
              <p className="text-gray-600 mt-1">
                Desglose por etapa, identificación de cuellos de botella y optimización
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

        {/* Controles de análisis */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Período de análisis
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
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
                📊 Filtro por etapa
              </label>
              <select
                value={filtroEtapa}
                onChange={(e) => setFiltroEtapa(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todas">Todas las etapas</option>
                <option value="redaccion">Redacción</option>
                <option value="revision">Revisión</option>
                <option value="aprobacion">Aprobación</option>
                <option value="firma">Firma</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                🔄 Actualizar análisis
              </button>
            </div>
          </div>
        </div>

        {/* Resumen general de tiempos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo total promedio</p>
                <p className="text-2xl font-bold text-gray-900">6.3 días</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl text-blue-600">⏱️</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">🎯 Objetivo: 5.5 días</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Etapa más larga</p>
                <p className="text-2xl font-bold text-red-600">Redacción</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-2xl text-red-600">📝</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">2.1 días (33% del total)</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Eficiencia del proceso</p>
                <p className="text-2xl font-bold text-green-600">89%</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl text-green-600">📈</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Análisis detallado por etapa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">📊 Desglose por etapa</h2>
            <p className="text-sm text-gray-600">Tiempo actual vs. objetivo</p>
          </div>
          
          <div className="space-y-4">
            {tiemposEtapa.map((etapa, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {etapa.cuellos && <span className="mr-2 text-red-500">⚠️</span>}
                    <div>
                      <p className="font-medium text-gray-900">{etapa.etapa}</p>
                      <div className="flex items-center mt-1">
                        <span className={`mr-1 ${getTendenciaColor(etapa.tendencia)}`}>
                          {getTendenciaIcon(etapa.tendencia)}
                        </span>
                        <span className={`text-xs ${getTendenciaColor(etapa.tendencia)}`}>
                          {etapa.variacion} vs. objetivo
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{etapa.tiempoActual}</p>
                      <p className="text-xs text-gray-500">Actual</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">{etapa.tiempoObjetivo}</p>
                      <p className="text-xs text-gray-500">Objetivo</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-red-500 h-3" 
                      style={{ width: `${parseFloat(etapa.tiempoActual) * 30}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-3" 
                      style={{ width: `${parseFloat(etapa.tiempoObjetivo) * 30}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">💡 {etapa.recomendacion}</p>
                  {etapa.cuellos && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      🔴 Cuello de botella
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cuellos de botella identificados */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">⚠️ Cuellos de botella</h2>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {cuellosBottleneck.length} identificados
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cuellosBottleneck.map((cuello, index) => (
              <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{cuello.etapa}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cuello.causa}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactoColor(cuello.impacto)}`}>
                    {cuello.impacto} impacto
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Casos afectados</span>
                    <span className="text-sm font-medium text-gray-900">{cuello.casosAfectados}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tiempo extra</span>
                    <span className="text-sm font-medium text-red-600">{cuello.tiempoExtra}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white border border-red-300 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>🎯 Solución:</strong> {cuello.solucion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparativa histórica */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Evolución del tiempo total */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Evolución del tiempo total</h2>
            
            <div className="space-y-4">
              {comparativaHistorica.map((mes, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{mes.mes}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">{mes.tiempoTotal}</span>
                      <span className={`text-sm font-medium ${
                        mes.eficiencia >= 85 ? 'text-green-600' :
                        mes.eficiencia >= 80 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {mes.eficiencia}% eficiencia
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full" 
                        style={{ width: `${(parseFloat(mes.tiempoTotal) / 8) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full" 
                        style={{ width: `${mes.eficiencia}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>📌 Tendencia positiva:</strong> Reducción del 12.5% en los últimos 6 meses.
                Eficiencia mejorada del 82% al 89%.
              </p>
            </div>
          </div>

          {/* Sugerencias de optimización */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">🎯 Sugerencias de optimización</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Ver plan completo
              </button>
            </div>
            
            <div className="space-y-4">
              {sugerencias.map((sugerencia, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{sugerencia.titulo}</h3>
                      <p className="text-sm text-gray-600 mt-1">{sugerencia.etapa}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEsfuerzoColor(sugerencia.esfuerzo)}`}>
                      {sugerencia.esfuerzo} esfuerzo
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Impacto esperado</span>
                      <span className="text-sm font-medium text-green-600">{sugerencia.impacto}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Plazo estimado</span>
                      <span className="text-sm font-medium text-blue-600">{sugerencia.plazo}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700">{sugerencia.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análisis de impacto potencial */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Impacto potencial de optimizaciones</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">🎯 Escenario optimista</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tiempo total actual</span>
                  <span className="text-sm font-medium text-gray-900">6.3 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Con optimizaciones</span>
                  <span className="text-sm font-medium text-green-600">4.4 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reducción</span>
                  <span className="text-sm font-medium text-green-600">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Casos adicionales/mes</span>
                  <span className="text-sm font-medium text-blue-600">+8</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">📈 Beneficios esperados</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cumplimiento mejorado</span>
                  <span className="text-sm font-medium text-green-600">89% → 95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reducción vencimientos</span>
                  <span className="text-sm font-medium text-green-600">-60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Capacidad incrementada</span>
                  <span className="text-sm font-medium text-blue-600">+25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI estimado</span>
                  <span className="text-sm font-medium text-purple-600">3.2x</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 Recomendación prioritaria:</strong> Implementar plantillas estandarizadas para redacción.
              Impacto esperado: Reducción del 30% en el tiempo de esa etapa, con esfuerzo medio y plazo de 1 mes.
            </p>
          </div>
        </div>

        {/* Exportación y plan de acción */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📤 Exportar análisis y plan de acción</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-blue-900">Reporte detallado</span>
              <span className="text-xs text-gray-600 mt-1">Análisis completo en Excel</span>
            </button>
            
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📈</span>
              <span className="font-medium text-green-900">Presentación ejecutiva</span>
              <span className="text-xs text-gray-600 mt-1">PPT para dirección</span>
            </button>
            
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
              <span className="text-2xl mb-2">🎯</span>
              <span className="font-medium text-purple-900">Plan de optimización</span>
              <span className="text-xs text-gray-600 mt-1">Ruta crítica y cronograma</span>
            </button>
            
            <button className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📋</span>
              <span className="font-medium text-red-900">Dashboard en tiempo real</span>
              <span className="text-xs text-gray-600 mt-1">Monitoreo continuo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisTiemposPage;
