interface FiltrosAvanzadosProps {
  filters: any
  availableFilters: any
  onFilterChange: (filters: any) => void
  onApplyFilters: () => void
  loading: boolean
}

export default function FiltrosAvanzados({ filters, availableFilters, onFilterChange, onApplyFilters, loading }: FiltrosAvanzadosProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">🔍 Filtros Avanzados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Fecha Inicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha inicio
          </label>
          <input
            type="date"
            value={filters.fechaInicio || ''}
            onChange={(e) => onFilterChange({ fechaInicio: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fecha Fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha fin
          </label>
          <input
            type="date"
            value={filters.fechaFin || ''}
            onChange={(e) => onFilterChange({ fechaFin: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gestor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gestor
          </label>
          <select
            value={filters.gestorId || ''}
            onChange={(e) => onFilterChange({ gestorId: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!availableFilters?.gestores}
          >
            <option value="">Todos los gestores</option>
            {availableFilters?.gestores?.map((gestor: any) => (
              <option key={gestor.id} value={gestor.id}>
                {gestor.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Entidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entidad
          </label>
          <select
            value={filters.entidadId || ''}
            onChange={(e) => onFilterChange({ entidadId: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!availableFilters?.entidades}
          >
            <option value="">Todas las entidades</option>
            {availableFilters?.entidades?.map((entidad: any) => (
              <option key={entidad.id} value={entidad.id}>
                {entidad.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={filters.estado || ''}
            onChange={(e) => onFilterChange({ estado: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!availableFilters?.estados}
          >
            <option value="">Todos los estados</option>
            {availableFilters?.estados?.map((estado: string) => (
              <option key={estado} value={estado}>
                {estado.toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Solicitud */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de solicitud
          </label>
          <select
            value={filters.tipoSolicitudId || ''}
            onChange={(e) => onFilterChange({ tipoSolicitudId: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!availableFilters?.tiposSolicitud}
          >
            <option value="">Todos los tipos</option>
            {availableFilters?.tiposSolicitud?.map((tipo: any) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.tipo}
              </option>
            ))}
          </select>
        </div>

        {/* Urgencia */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgencia
          </label>
          <select
            value={filters.urgencia || ''}
            onChange={(e) => onFilterChange({ urgencia: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!availableFilters?.urgencias}
          >
            <option value="">Todas las urgencias</option>
            {availableFilters?.urgencias?.map((urgencia: string) => (
              <option key={urgencia} value={urgencia}>
                {urgencia.toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            placeholder="Radicado, asunto, remitente..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onFilterChange({
            fechaInicio: null,
            fechaFin: null,
            gestorId: null,
            entidadId: null,
            estado: null,
            tipoSolicitudId: null,
            urgencia: null,
            searchTerm: ''
          })}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
        >
          Limpiar filtros
        </button>
        
        <button
          onClick={onApplyFilters}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Aplicando...' : 'Aplicar Filtros'}
        </button>
      </div>
    </div>
  )
}