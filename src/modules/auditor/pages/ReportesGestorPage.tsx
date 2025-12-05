// pages/Seguimiento/ReportesGestor.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ReportesGestorPage = () => {
  const navigate = useNavigate();
  
  const [gestorSeleccionado, setGestorSeleccionado] = useState('todos');
  const [periodo, setPeriodo] = useState('mes-actual');

  const [gestores, setGestores] = useState([
    {
      id: 'GT-001',
      nombre: 'Jaime Tiuso',
      cargo: 'Área Legal',
      email: 'jaime.tiuso@empresa.com',
      totalCasos: 28,
      casosCumplidos: 27,
      casosVencidos: 1,
      tiempoPromedio: '3.2 días',
      cumplimiento: 96,
      distribucion: {
        asignado: 3,
        redaccion: 2,
        revision: 1,
        aprobacion: 1,
        respondido: 21
      },
      tendencia: 'mejora',
      comparativaEquipo: '+8%'
    },
    {
      id: 'GT-002',
      nombre: 'Carlos Ramírez',
      cargo: 'Área Técnica',
      email: 'carlos.ramirez@empresa.com',
      totalCasos: 22,
      casosCumplidos: 20,
      casosVencidos: 2,
      tiempoPromedio: '4.1 días',
      cumplimiento: 91,
      distribucion: {
        asignado: 2,
        redaccion: 1,
        revision: 0,
        aprobacion: 1,
        respondido: 18
      },
      tendencia: 'estable',
      comparativaEquipo: '+3%'
    },
    {
      id: 'GT-003',
      nombre: 'María González',
      cargo: 'Área Legal',
      email: 'maria.gonzalez@empresa.com',
      totalCasos: 18,
      casosCumplidos: 16,
      casosVencidos: 2,
      tiempoPromedio: '4.5 días',
      cumplimiento: 89,
      distribucion: {
        asignado: 1,
        redaccion: 2,
        revision: 0,
        aprobacion: 0,
        respondido: 15
      },
      tendencia: 'mejora',
      comparativaEquipo: '+1%'
    },
    {
      id: 'GT-004',
      nombre: 'Ana Rodríguez',
      cargo: 'Área Administrativa',
      email: 'ana.rodriguez@empresa.com',
      totalCasos: 16,
      casosCumplidos: 15,
      casosVencidos: 1,
      tiempoPromedio: '3.8 días',
      cumplimiento: 94,
      distribucion: {
        asignado: 1,
        redaccion: 1,
        revision: 1,
        aprobacion: 0,
        respondido: 13
      },
      tendencia: 'estable',
      comparativaEquipo: '+6%'
    },
    {
      id: 'GT-005',
      nombre: 'Luis Martínez',
      cargo: 'Área Técnica',
      email: 'luis.martinez@empresa.com',
      totalCasos: 14,
      casosCumplidos: 12,
      casosVencidos: 2,
      tiempoPromedio: '4.8 días',
      cumplimiento: 87,
      distribucion: {
        asignado: 2,
        redaccion: 1,
        revision: 0,
        aprobacion: 1,
        respondido: 10
      },
      tendencia: 'disminucion',
      comparativaEquipo: '-1%'
    }
  ]);

  // Métricas promedio del equipo
  const [promedioEquipo, setPromedioEquipo] = useState({
    totalCasos: 19.6,
    cumplimiento: 91.4,
    tiempoPromedio: '4.1 días',
    casosVencidos: 1.6
  });

  const getCumplimientoColor = (porcentaje: number) => {
    if (porcentaje >= 95) return 'bg-green-100 text-green-800';
    if (porcentaje >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'mejora': return '📈';
      case 'estable': return '➡️';
      case 'disminucion': return '📉';
      default: return '➡️';
    }
  };

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'mejora': return 'text-green-600';
      case 'estable': return 'text-yellow-600';
      case 'disminucion': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">👥 Reportes por Gestor</h1>
              <p className="text-gray-600 mt-1">
                Análisis individual y comparativo del desempeño
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
                Exportar todos
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y selección */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👤 Seleccionar gestor
              </label>
              <select
                value={gestorSeleccionado}
                onChange={(e) => setGestorSeleccionado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los gestores</option>
                {gestores.map(gestor => (
                  <option key={gestor.id} value={gestor.id}>{gestor.nombre}</option>
                ))}
              </select>
            </div>

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

            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                🔄 Actualizar reporte
              </button>
            </div>
          </div>
        </div>

        {/* Resumen del equipo */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🏆 Resumen del equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Promedio del equipo</p>
              <p className="text-2xl font-bold text-gray-900">{promedioEquipo.totalCasos.toFixed(1)}</p>
              <p className="text-xs text-gray-500">Casos por gestor</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Cumplimiento promedio</p>
              <p className="text-2xl font-bold text-green-600">{promedioEquipo.cumplimiento}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${promedioEquipo.cumplimiento}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Tiempo promedio</p>
              <p className="text-2xl font-bold text-purple-600">{promedioEquipo.tiempoPromedio}</p>
              <p className="text-xs text-gray-500">🎯 Objetivo: 3.5 días</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Vencidos promedio</p>
              <p className="text-2xl font-bold text-red-600">{promedioEquipo.casosVencidos.toFixed(1)}</p>
              <p className="text-xs text-gray-500">Por gestor</p>
            </div>
          </div>
        </div>

        {/* Tabla de gestores */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">📊 Desempeño individual</h2>
            <p className="text-sm text-gray-600 mt-1">
              Comparativa detallada por gestor
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gestor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Casos / Distribución
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cumplimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo promedio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comparativa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gestores.map((gestor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600">👤</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{gestor.nombre}</p>
                          <p className="text-sm text-gray-600">{gestor.cargo}</p>
                          <p className="text-xs text-gray-500">{gestor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{gestor.totalCasos} casos totales</p>
                        <div className="flex space-x-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            📋 {gestor.distribucion.asignado}
                          </span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            📝 {gestor.distribucion.redaccion}
                          </span>
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            🔍 {gestor.distribucion.revision}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            ✅ {gestor.distribucion.aprobacion}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            📤 {gestor.distribucion.respondido}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCumplimientoColor(gestor.cumplimiento)}`}>
                          {gestor.cumplimiento}% cumplimiento
                        </span>
                        <div className="flex text-xs text-gray-500">
                          <span className="mr-3">✅ {gestor.casosCumplidos} cumplidos</span>
                          <span>❌ {gestor.casosVencidos} vencidos</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{gestor.tiempoPromedio}</p>
                        <div className="flex items-center mt-1">
                          <span className={`mr-1 ${getTendenciaColor(gestor.tendencia)}`}>
                            {getTendenciaIcon(gestor.tendencia)}
                          </span>
                          <span className={`text-xs ${getTendenciaColor(gestor.tendencia)}`}>
                            {gestor.tendencia}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          parseFloat(gestor.comparativaEquipo) >= 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {gestor.comparativaEquipo} vs. equipo
                        </span>
                        <p className="text-xs text-gray-500">
                          {parseFloat(gestor.comparativaEquipo) >= 0 ? 'Por encima' : 'Por debajo'} del promedio
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => navigate(`/seguimiento/gestor-detalle/${gestor.id}`)}
                          className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          Detalles
                        </button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                          📥
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ranking de desempeño */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top performers */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🏆 Top Performers</h2>
            
            <div className="space-y-4">
              {gestores
                .sort((a, b) => b.cumplimiento - a.cumplimiento)
                .slice(0, 3)
                .map((gestor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{gestor.nombre}</p>
                        <p className="text-sm text-gray-600">{gestor.cargo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        gestor.cumplimiento >= 95 ? 'text-green-600' :
                        gestor.cumplimiento >= 90 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {gestor.cumplimiento}%
                      </p>
                      <p className="text-xs text-gray-500">{gestor.totalCasos} casos</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Áreas de oportunidad */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🎯 Áreas de oportunidad</h2>
            
            <div className="space-y-4">
              {gestores
                .filter(g => g.casosVencidos > 0)
                .map((gestor, index) => (
                  <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{gestor.nombre}</p>
                        <p className="text-sm text-gray-600">{gestor.cargo}</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        ❌ {gestor.casosVencidos} vencidos
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>📌 Análisis:</strong> {gestor.casosVencidos} casos vencidos afectan el cumplimiento.
                      Tiempo promedio: {gestor.tiempoPromedio}
                    </p>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                      Ver plan de mejora →
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Métricas comparativas */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Métricas comparativas por área</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">⚖️ Área Legal</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Promedio cumplimiento</span>
                  <span className="text-sm font-medium text-green-600">93%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tiempo promedio</span>
                  <span className="text-sm font-medium text-gray-900">3.8 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Casos vencidos</span>
                  <span className="text-sm font-medium text-red-600">1.5</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">🔧 Área Técnica</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Promedio cumplimiento</span>
                  <span className="text-sm font-medium text-yellow-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tiempo promedio</span>
                  <span className="text-sm font-medium text-gray-900">4.5 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Casos vencidos</span>
                  <span className="text-sm font-medium text-red-600">2.0</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">📋 Área Administrativa</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Promedio cumplimiento</span>
                  <span className="text-sm font-medium text-green-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tiempo promedio</span>
                  <span className="text-sm font-medium text-gray-900">3.8 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Casos vencidos</span>
                  <span className="text-sm font-medium text-red-600">0.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exportación personalizada */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📤 Exportación personalizada</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📊</span>
              <span className="font-medium text-blue-900">Reporte individual</span>
              <span className="text-xs text-gray-600 mt-1">Por gestor seleccionado</span>
            </button>
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex flex-col items-center">
              <span className="text-2xl mb-2">📈</span>
              <span className="font-medium text-green-900">Comparativa de áreas</span>
              <span className="text-xs text-gray-600 mt-1">Análisis por departamento</span>
            </button>
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex flex-col items-center">
              <span className="text-2xl mb-2">🏆</span>
              <span className="font-medium text-purple-900">Ranking de desempeño</span>
              <span className="text-xs text-gray-600 mt-1">Top performers</span>
            </button>
            <button className="p-4 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex flex-col items-center">
              <span className="text-2xl mb-2">🎯</span>
              <span className="font-medium text-red-900">Plan de mejora</span>
              <span className="text-xs text-gray-600 mt-1">Acciones correctivas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesGestorPage;
