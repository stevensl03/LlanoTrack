// pages/Aprobador/Historial.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

const AprobadorHistoryPage = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    gestor: 'todos',
    entidad: 'todos',
    tipo: 'todos',
    fechaDesde: '',
    fechaHasta: '',
    estado: 'todos',
    busqueda: ''
  });

  const [aprobaciones, setAprobaciones] = useState([
    {
      id: 'APR-045',
      codigo: '2025-045-PG',
      asunto: 'Respuesta a requerimiento legal sobre contratación',
      gestor: 'Carlos Ramírez',
      entidad: 'Procuraduría General',
      tipo: 'Legal',
      fechaAprobacion: '2025-11-25',
      estado: 'aprobado',
      tiempoProceso: '3 días',
      comentarios: 'Documento completo y bien fundamentado',
      revisores: ['María González', 'Luis Fernández']
    },
    {
      id: 'APR-044',
      codigo: '2025-044-MA',
      asunto: 'Informe ambiental para proyecto de desarrollo',
      gestor: 'Sandra Gómez',
      entidad: 'Ministerio de Ambiente',
      tipo: 'Técnico',
      fechaAprobacion: '2025-11-24',
      estado: 'aprobado',
      tiempoProceso: '2 días',
      comentarios: 'Cumple con todas las normativas ambientales',
      revisores: ['Pedro Sánchez']
    },
    {
      id: 'APR-043',
      codigo: '2025-043-MH',
      asunto: 'Aclaración presupuestal para proyecto educativo',
      gestor: 'Jaime Tiuso',
      entidad: 'Ministerio de Hacienda',
      tipo: 'Administrativo',
      fechaAprobacion: '2025-11-23',
      estado: 'con-ajustes',
      tiempoProceso: '4 días',
      comentarios: 'Requiere ajuste en cifras del anexo 3',
      revisores: ['Carlos López', 'Ana Rodríguez']
    },
    {
      id: 'APR-042',
      codigo: '2025-042-MT',
      asunto: 'Informe técnico sobre normativa de transporte pesado',
      gestor: 'Ana Rodríguez',
      entidad: 'Ministerio de Transporte',
      tipo: 'Técnico',
      fechaAprobacion: '2025-11-22',
      estado: 'aprobado',
      tiempoProceso: '1 día',
      comentarios: 'Excelente trabajo, bien documentado',
      revisores: ['Pedro Sánchez']
    },
    {
      id: 'APR-041',
      codigo: '2025-041-MS',
      asunto: 'Documentación para licitación pública de equipos',
      gestor: 'Luis Martínez',
      entidad: 'Ministerio de Salud',
      tipo: 'Administrativo',
      fechaAprobacion: '2025-11-21',
      estado: 'aprobado',
      tiempoProceso: '3 días',
      comentarios: 'Aprobado sin observaciones',
      revisores: ['María González', 'Sofía Ramírez']
    }
  ]);

  const gestores = Array.from(new Set(aprobaciones.map(a => a.gestor)));
  const entidades = Array.from(new Set(aprobaciones.map(a => a.entidad)));
  const tipos = Array.from(new Set(aprobaciones.map(a => a.tipo)));

  const filteredAprobaciones = aprobaciones.filter(aprob => {
    const matchesGestor = filtros.gestor === 'todos' || aprob.gestor === filtros.gestor;
    const matchesEntidad = filtros.entidad === 'todos' || aprob.entidad === filtros.entidad;
    const matchesTipo = filtros.tipo === 'todos' || aprob.tipo === filtros.tipo;
    const matchesEstado = filtros.estado === 'todos' || aprob.estado === filtros.estado;
    const matchesBusqueda = filtros.busqueda === '' || 
      aprob.asunto.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      aprob.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    return matchesGestor && matchesEntidad && matchesTipo && matchesEstado && matchesBusqueda;
  });

  const handleExportar = (formato: 'excel' | 'pdf') => {
    alert(`Exportando historial en formato ${formato.toUpperCase()}`);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'aprobado': return 'bg-green-100 text-green-800';
      case 'con-ajustes': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcono = (estado: string) => {
    switch (estado) {
      case 'aprobado': return '✅';
      case 'con-ajustes': return '🔄';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📜 Historial de Aprobaciones</h1>
              <p className="text-gray-600 mt-1">
                Registro completo de todas las aprobaciones realizadas
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/aprobador/dashboard')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <span className="mr-2">←</span>
                Volver al panel
              </button>
              <div className="relative">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => handleExportar(e.target.value as 'excel' | 'pdf')}
                >
                  <option value="">📥 Exportar...</option>
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="pdf">PDF (.pdf)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filtros Avanzados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                {gestores.map(gestor => (
                  <option key={gestor} value={gestor}>{gestor}</option>
                ))}
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
                {entidades.map(entidad => (
                  <option key={entidad} value={entidad}>{entidad}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Tipo
              </label>
              <select
                value={filtros.tipo}
                onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los tipos</option>
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🚦 Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los estados</option>
                <option value="aprobado">Aprobado</option>
                <option value="con-ajustes">Con ajustes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Fecha desde
              </label>
              <input
                type="date"
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros({...filtros, fechaDesde: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Fecha hasta
              </label>
              <input
                type="date"
                value={filtros.fechaHasta}
                onChange={(e) => setFiltros({...filtros, fechaHasta: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔎 Búsqueda
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                  placeholder="Código, asunto..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setFiltros({
                gestor: 'todos',
                entidad: 'todos',
                tipo: 'todos',
                fechaDesde: '',
                fechaHasta: '',
                estado: 'todos',
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

        {/* Resumen de resultados */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-gray-700">
                Mostrando <span className="font-semibold">{filteredAprobaciones.length}</span> aprobaciones
              </p>
              {filtros.gestor !== 'todos' && (
                <p className="text-sm text-gray-600">
                  Filtrado por gestor: <span className="font-medium">{filtros.gestor}</span>
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Fecha (más reciente)</option>
                <option>Fecha (más antigua)</option>
                <option>Gestor (A-Z)</option>
                <option>Entidad (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de aprobaciones */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gestor / Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha / Tiempo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAprobaciones.map((aprob) => (
                  <tr key={aprob.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{aprob.codigo}</p>
                        <p className="text-sm text-gray-600 mt-1 truncate max-w-md">
                          {aprob.asunto}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {aprob.tipo}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            👥 {aprob.revisores.length} revisores
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <span className="text-blue-600 text-sm">👤</span>
                          </div>
                          <span className="font-medium text-gray-900">{aprob.gestor}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">🏢</span>
                          <span className="text-sm text-gray-600">{aprob.entidad}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{aprob.fechaAprobacion}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          ⏱️ {aprob.tiempoProceso}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(aprob.estado)}`}>
                          {getEstadoIcono(aprob.estado)} {aprob.estado === 'aprobado' ? 'Aprobado' : 'Con ajustes'}
                        </span>
                        {aprob.comentarios && (
                          <p className="text-xs text-gray-600 truncate max-w-xs">
                            💬 {aprob.comentarios}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/aprobador/detalle/${aprob.id}`)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
                          title="Ver detalles"
                        >
                          <span className="text-lg">👁️</span>
                        </button>
                        <button
                          onClick={() => alert(`Reabrir aprobación ${aprob.id}`)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg"
                          title="Reabrir"
                        >
                          <span className="text-lg">🔄</span>
                        </button>
                        <button
                          onClick={() => alert(`Descargar documentos de ${aprob.id}`)}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg"
                          title="Descargar"
                        >
                          <span className="text-lg">📥</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAprobaciones.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-600">
                  Intente con otros filtros de búsqueda
                </p>
              </div>
            )}
          </div>

          {/* Paginación */}
          {filteredAprobaciones.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de{' '}
                    <span className="font-medium">{filteredAprobaciones.length}</span> resultados
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
                    ← Anterior
                  </button>
                  <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 rounded text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumen estadístico */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Resumen Estadístico</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total aprobaciones</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredAprobaciones.length}</p>
                </div>
                <span className="text-2xl">📈</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tasa de aprobación</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((filteredAprobaciones.filter(a => a.estado === 'aprobado').length / filteredAprobaciones.length) * 100)}%
                  </p>
                </div>
                <span className="text-2xl">✅</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tiempo promedio</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {(
                      filteredAprobaciones.reduce((sum, a) => {
                        const dias = parseInt(a.tiempoProceso.split(' ')[0]);
                        return sum + dias;
                      }, 0) / filteredAprobaciones.length
                    ).toFixed(1)} días
                  </p>
                </div>
                <span className="text-2xl">⏱️</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gestor más activo</p>
                  <p className="text-lg font-bold text-gray-900 truncate">
                    {(() => {
                      const counts: Record<string, number> = {};
                      filteredAprobaciones.forEach(a => {
                        counts[a.gestor] = (counts[a.gestor] || 0) + 1;
                      });
                      const maxGestor = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '');
                      return maxGestor;
                    })()}
                  </p>
                </div>
                <span className="text-2xl">👑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprobadorHistoryPage;
