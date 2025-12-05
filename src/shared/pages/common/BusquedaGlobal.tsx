// pages/BusquedaGlobal.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const BusquedaGlobal = () => {
  const navigate = useNavigate();
  
  // Estado para la búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState('todos'); // todos, id, radicado, asunto, entidad, gestor
  const [resultados, setResultados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({
    fechaDesde: '',
    fechaHasta: '',
    estado: 'todos',
    prioridad: 'todos',
    entidad: ''
  });

  // Tipos de búsqueda
  const tiposBusqueda = [
    { id: 'todos', nombre: 'Todos los campos', icono: '🔍' },
    { id: 'id', nombre: 'ID de caso', icono: '📋' },
    { id: 'radicado', nombre: 'Radicado', icono: '📄' },
    { id: 'asunto', nombre: 'Asunto/cuerpo', icono: '📝' },
    { id: 'entidad', nombre: 'Entidad remitente', icono: '🏢' },
    { id: 'gestor', nombre: 'Gestor responsable', icono: '👤' }
  ];

  // Estados posibles
  const estados = [
    { id: 'todos', nombre: 'Todos los estados' },
    { id: 'asignado', nombre: 'Asignado' },
    { id: 'redaccion', nombre: 'En redacción' },
    { id: 'revision', nombre: 'En revisión' },
    { id: 'aprobacion', nombre: 'En aprobación' },
    { id: 'respondido', nombre: 'Respondido' },
    { id: 'cerrado', nombre: 'Cerrado' }
  ];

  // Prioridades
  const prioridades = [
    { id: 'todos', nombre: 'Todas las prioridades' },
    { id: 'alta', nombre: 'Alta' },
    { id: 'media', nombre: 'Media' },
    { id: 'baja', nombre: 'Baja' }
  ];

  // Datos de ejemplo para resultados
  const datosEjemplo = [
    {
      id: '2025-001-MH',
      tipo: 'correo',
      asunto: 'Solicitud de información contractual - Proceso 2025-001',
      entidad: 'Ministerio de Hacienda',
      gestor: 'Jaime Tiuso',
      estado: 'En aprobación',
      prioridad: 'alta',
      fechaRecepcion: '2025-11-20',
      radicadoEntrada: '322-01527-E25',
      radicadoSalida: '322-02840-S25',
      coincidencias: ['contratual', 'proceso', '2025-001'],
      relevancia: 95
    },
    {
      id: '2025-002-MS',
      tipo: 'correo',
      asunto: 'Informe técnico sobre normativa de salud pública',
      entidad: 'Ministerio de Salud',
      gestor: 'Carlos Ramírez',
      estado: 'Respondido',
      prioridad: 'media',
      fechaRecepcion: '2025-11-18',
      radicadoEntrada: '322-01528-E25',
      radicadoSalida: '322-02841-S25',
      coincidencias: ['normativa', 'salud', 'pública'],
      relevancia: 88
    },
    {
      id: 'APR-001',
      tipo: 'aprobacion',
      asunto: 'Aprobación de respuesta a requerimiento legal',
      entidad: 'Procuraduría General',
      gestor: 'María González',
      estado: 'Aprobado',
      prioridad: 'alta',
      fechaRecepcion: '2025-11-22',
      radicadoEntrada: '322-01529-E25',
      radicadoSalida: '',
      coincidencias: ['requerimiento', 'legal', 'aprobación'],
      relevancia: 92
    },
    {
      id: 'REV-045',
      tipo: 'revision',
      asunto: 'Revisión de documentación técnica para licitación',
      entidad: 'Ministerio de Transporte',
      gestor: 'Ana Rodríguez',
      estado: 'En revisión',
      prioridad: 'media',
      fechaRecepcion: '2025-11-15',
      radicadoEntrada: '322-01530-E25',
      radicadoSalida: '',
      coincidencias: ['documentación', 'técnica', 'licitación'],
      relevancia: 85
    },
    {
      id: '2025-005-MA',
      tipo: 'correo',
      asunto: 'Consulta sobre normativa ambiental para proyecto minero',
      entidad: 'Ministerio de Ambiente',
      gestor: 'Luis Martínez',
      estado: 'En redacción',
      prioridad: 'baja',
      fechaRecepcion: '2025-11-19',
      radicadoEntrada: '322-01531-E25',
      radicadoSalida: '',
      coincidencias: ['normativa', 'ambiental', 'proyecto'],
      relevancia: 78
    }
  ];

  // Función para buscar
  const handleBuscar = () => {
    if (!terminoBusqueda.trim() && tipoBusqueda !== 'todos') {
      alert('Por favor ingrese un término de búsqueda');
      return;
    }

    setCargando(true);

    // Simulación de búsqueda
    setTimeout(() => {
      let resultadosFiltrados = datosEjemplo;

      // Filtrar por término de búsqueda
      if (terminoBusqueda.trim()) {
        resultadosFiltrados = resultadosFiltrados.filter(item => {
          const busquedaLower = terminoBusqueda.toLowerCase();
          
          switch (tipoBusqueda) {
            case 'id':
              return item.id.toLowerCase().includes(busquedaLower);
            case 'radicado':
              return item.radicadoEntrada.toLowerCase().includes(busquedaLower) ||
                     item.radicadoSalida.toLowerCase().includes(busquedaLower);
            case 'asunto':
              return item.asunto.toLowerCase().includes(busquedaLower) ||
                     item.coincidencias.some((c: string) => 
                       c.toLowerCase().includes(busquedaLower));
            case 'entidad':
              return item.entidad.toLowerCase().includes(busquedaLower);
            case 'gestor':
              return item.gestor.toLowerCase().includes(busquedaLower);
            default: // 'todos'
              return item.id.toLowerCase().includes(busquedaLower) ||
                     item.asunto.toLowerCase().includes(busquedaLower) ||
                     item.entidad.toLowerCase().includes(busquedaLower) ||
                     item.gestor.toLowerCase().includes(busquedaLower) ||
                     item.coincidencias.some((c: string) => 
                       c.toLowerCase().includes(busquedaLower));
          }
        });
      }

      // Filtrar por filtros avanzados
      if (filtrosAvanzados.estado !== 'todos') {
        resultadosFiltrados = resultadosFiltrados.filter(item => 
          item.estado.toLowerCase().includes(filtrosAvanzados.estado.toLowerCase())
        );
      }

      if (filtrosAvanzados.prioridad !== 'todos') {
        resultadosFiltrados = resultadosFiltrados.filter(item => 
          item.prioridad === filtrosAvanzados.prioridad
        );
      }

      if (filtrosAvanzados.entidad) {
        resultadosFiltrados = resultadosFiltrados.filter(item => 
          item.entidad.toLowerCase().includes(filtrosAvanzados.entidad.toLowerCase())
        );
      }

      // Ordenar por relevancia
      resultadosFiltrados.sort((a, b) => b.relevancia - a.relevancia);

      setResultados(resultadosFiltrados);
      setCargando(false);
    }, 1000);
  };

  // Función para limpiar búsqueda
  const handleLimpiar = () => {
    setTerminoBusqueda('');
    setResultados([]);
    setFiltrosAvanzados({
      fechaDesde: '',
      fechaHasta: '',
      estado: 'todos',
      prioridad: 'todos',
      entidad: ''
    });
  };

  // Función para navegar al detalle
  const handleVerDetalle = (id: string, tipo: string) => {
    // Navegar según el tipo de resultado
    switch (tipo) {
      case 'correo':
        navigate(`/gestor/caso/${id}`);
        break;
      case 'aprobacion':
        navigate(`/aprobador/detalle/${id}`);
        break;
      case 'revision':
        navigate(`/revisor/review/${id}`);
        break;
      default:
        navigate(`/seguimiento/caso/${id}`);
    }
  };

  // Función para manejar búsqueda con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'asignado':
      case 'en redacción':
      case 'en revisión':
      case 'en aprobación':
        return 'bg-yellow-100 text-yellow-800';
      case 'respondido':
      case 'aprobado':
        return 'bg-green-100 text-green-800';
      case 'cerrado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPrioridadIcon = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baja': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">🔍 Búsqueda Global</h1>
              <p className="text-gray-600 mt-1">
                Busca en todos los casos, documentos y registros del sistema
              </p>
            </div>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <span className="mr-2">←</span>
              Volver
            </button>
          </div>
        </div>

        {/* Campo de búsqueda principal */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              🔎 ¿Qué estás buscando?
            </label>
            <div className="relative">
              <input
                type="text"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa ID, radicado, asunto, entidad o gestor..."
                className="w-full px-4 py-4 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-4 top-4 text-gray-400 text-xl">🔍</span>
              <button
                onClick={handleBuscar}
                className="absolute right-3 top-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {cargando ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>

          {/* Tipos de búsqueda */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              🎯 Tipo de búsqueda
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {tiposBusqueda.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setTipoBusqueda(tipo.id)}
                  className={`p-3 border rounded-lg flex flex-col items-center ${
                    tipoBusqueda === tipo.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl mb-1">{tipo.icono}</span>
                  <span className="text-xs text-center">{tipo.nombre}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filtros avanzados (acordeón) */}
          <div className="border-t border-gray-200 pt-6">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-lg font-medium text-gray-900">⚙️ Filtros avanzados</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📅 Fecha desde
                    </label>
                    <input
                      type="date"
                      value={filtrosAvanzados.fechaDesde}
                      onChange={(e) => setFiltrosAvanzados({
                        ...filtrosAvanzados, 
                        fechaDesde: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📅 Fecha hasta
                    </label>
                    <input
                      type="date"
                      value={filtrosAvanzados.fechaHasta}
                      onChange={(e) => setFiltrosAvanzados({
                        ...filtrosAvanzados, 
                        fechaHasta: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🚦 Estado
                    </label>
                    <select
                      value={filtrosAvanzados.estado}
                      onChange={(e) => setFiltrosAvanzados({
                        ...filtrosAvanzados, 
                        estado: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.id} value={estado.id}>
                          {estado.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ⚠️ Prioridad
                    </label>
                    <select
                      value={filtrosAvanzados.prioridad}
                      onChange={(e) => setFiltrosAvanzados({
                        ...filtrosAvanzados, 
                        prioridad: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {prioridades.map(prioridad => (
                        <option key={prioridad.id} value={prioridad.id}>
                          {prioridad.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏢 Entidad específica
                  </label>
                  <input
                    type="text"
                    value={filtrosAvanzados.entidad}
                    onChange={(e) => setFiltrosAvanzados({
                      ...filtrosAvanzados, 
                      entidad: e.target.value
                    })}
                    placeholder="Filtrar por entidad remitente..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </details>
          </div>

          {/* Acciones */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleLimpiar}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              🗑️ Limpiar búsqueda
            </button>
            <div className="text-sm text-gray-600">
              Presiona Enter para buscar rápidamente
            </div>
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {resultados.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                📊 Resultados de búsqueda ({resultados.length})
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Relevancia</option>
                  <option>Fecha (más reciente)</option>
                  <option>Fecha (más antigua)</option>
                  <option>Prioridad</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {resultados.map((resultado, index) => (
                <div 
                  key={resultado.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Información principal */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {resultado.id} - {resultado.asunto}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(resultado.estado)}`}>
                              {resultado.estado}
                            </span>
                            <span className="text-xl" title={`Prioridad ${resultado.prioridad}`}>
                              {getPrioridadIcon(resultado.prioridad)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-1">🏢</span>
                              {resultado.entidad}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-1">👤</span>
                              {resultado.gestor}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="mr-1">📅</span>
                              {resultado.fechaRecepcion}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Relevancia</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {resultado.relevancia}%
                          </div>
                        </div>
                      </div>

                      {/* Radicados */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        {resultado.radicadoEntrada && (
                          <div>
                            <span className="text-xs text-gray-500">Radicado entrada:</span>
                            <p className="font-medium">{resultado.radicadoEntrada}</p>
                          </div>
                        )}
                        {resultado.radicadoSalida && (
                          <div>
                            <span className="text-xs text-gray-500">Radicado salida:</span>
                            <p className="font-medium">{resultado.radicadoSalida}</p>
                          </div>
                        )}
                      </div>

                      {/* Coincidencias */}
                      {resultado.coincidencias.length > 0 && (
                        <div className="mb-4">
                          <span className="text-sm text-gray-600">Coincidencias encontradas:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {resultado.coincidencias.map((coincidencia: string, idx: number) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                              >
                                {coincidencia}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="md:w-48 flex flex-col space-y-3">
                      <button
                        onClick={() => handleVerDetalle(resultado.id, resultado.tipo)}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        👁️ Ver detalles
                      </button>
                      
                      <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        📥 Descargar
                      </button>
                      
                      <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        📋 Copiar enlace
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado de búsqueda */}
        {cargando && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Buscando en el sistema...</p>
            <p className="text-sm text-gray-500 mt-1">Esto puede tomar unos segundos</p>
          </div>
        )}

        {!cargando && resultados.length === 0 && terminoBusqueda && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-600">
              No hay coincidencias para "{terminoBusqueda}"
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">💡 Sugerencias:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Verifica la ortografía de tu búsqueda</li>
                <li>• Intenta con términos más generales</li>
                <li>• Utiliza los filtros avanzados</li>
                <li>• Busca por ID de caso o radicado</li>
              </ul>
            </div>
          </div>
        )}

        {/* Búsquedas guardadas */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💾 Búsquedas guardadas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 flex items-center">
              <span className="text-2xl mr-3">📋</span>
              <div className="text-left">
                <p className="font-medium text-blue-900">Mis casos asignados</p>
                <p className="text-xs text-gray-600">Filtro personalizado</p>
              </div>
            </button>
            
            <button className="p-4 bg-white border border-green-300 rounded-lg hover:bg-green-50 flex items-center">
              <span className="text-2xl mr-3">⏰</span>
              <div className="text-left">
                <p className="font-medium text-green-900">Casos por vencer</p>
                <p className="text-xs text-gray-600">Próximos 3 días</p>
              </div>
            </button>
            
            <button className="p-4 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 flex items-center">
              <span className="text-2xl mr-3">🏢</span>
              <div className="text-left">
                <p className="font-medium text-purple-900">Ministerio de Hacienda</p>
                <p className="text-xs text-gray-600">Todos los casos</p>
              </div>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              + Guardar esta búsqueda
            </button>
          </div>
        </div>

        {/* Atajos de búsqueda rápida */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Atajos de búsqueda rápida</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => {
                setTerminoBusqueda('2025-');
                setTipoBusqueda('id');
                handleBuscar();
              }}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              📅 Casos 2025
            </button>
            
            <button
              onClick={() => {
                setTerminoBusqueda('urgent');
                setTipoBusqueda('asunto');
                handleBuscar();
              }}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              ⚠️ Urgentes
            </button>
            
            <button
              onClick={() => {
                setTerminoBusqueda('322-');
                setTipoBusqueda('radicado');
                handleBuscar();
              }}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              📄 Por radicado
            </button>
            
            <button
              onClick={() => {
                setTerminoBusqueda('legal');
                setTipoBusqueda('asunto');
                handleBuscar();
              }}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              ⚖️ Consultas legales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusquedaGlobal;