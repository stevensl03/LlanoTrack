import { useNavigate } from 'react-router'

interface CorreosTableProps {
  correos: any[]
  loading: boolean
  page: number
  size: number
  totalItems: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onPageChange: (page: number) => void
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void
}

export default function CorreosTable({
  correos,
  loading,
  page,
  size,
  totalItems,
  sortBy,
  sortOrder,
  onPageChange,
  onSortChange
}: CorreosTableProps) {
  const navigate = useNavigate()
  const totalPages = Math.ceil(totalItems / size)

  const getEstadoBadge = (estado: string, diasRestantes: number) => {
    const colors: Record<string, string> = {
      'RECEPCION': 'bg-blue-100 text-blue-800',
      'ELABORACION': 'bg-yellow-100 text-yellow-800',
      'REVISION': 'bg-purple-100 text-purple-800',
      'APROBACION': 'bg-indigo-100 text-indigo-800',
      'ENVIADO': 'bg-green-100 text-green-800',
      'VENCIDO': 'bg-red-100 text-red-800',
      'ARCHIVADO': 'bg-gray-100 text-gray-800'
    }
    
    const baseClass = colors[estado] || 'bg-gray-100 text-gray-800'
    const isVencido = diasRestantes < 0
    
    return (
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${baseClass}`}>
          {estado.toLowerCase()}
        </span>
        {isVencido && (
          <span className="text-red-500 text-sm">⚠️</span>
        )}
      </div>
    )
  }

  const getDiasRestantes = (diasRestantes: number) => {
    if (diasRestantes < 0) {
      return <span className="text-red-600 font-bold">{Math.abs(diasRestantes)} días vencido</span>
    } else if (diasRestantes <= 2) {
      return <span className="text-yellow-600 font-bold">{diasRestantes} días</span>
    } else {
      return <span className="text-green-600">{diasRestantes} días</span>
    }
  }

  const handleSort = (column: string) => {
    const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc'
    onSortChange(column, newSortOrder)
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return null
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  return (
    <div>
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando correos...</p>
        </div>
      ) : correos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron correos con los filtros actuales</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('radicadoEntrada')}
                  >
                    <div className="flex items-center gap-1">
                      Radicado
                      <SortIcon column="radicadoEntrada" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('entidadNombre')}
                  >
                    <div className="flex items-center gap-1">
                      Entidad
                      <SortIcon column="entidadNombre" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('tipoSolicitudNombre')}
                  >
                    Tipo
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('gestorNombre')}
                  >
                    <div className="flex items-center gap-1">
                      Gestor
                      <SortIcon column="gestorNombre" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('estado')}
                  >
                    <div className="flex items-center gap-1">
                      Estado
                      <SortIcon column="estado" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {correos.map((correo) => (
                  <tr key={correo.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {correo.radicadoEntrada}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(correo.fechaRecepcion).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{correo.entidadNombre}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {correo.asunto}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">{correo.tipoSolicitudNombre}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{correo.gestorNombre}</div>
                    </td>
                    <td className="px-4 py-4">
                      {getEstadoBadge(correo.estado, correo.diasRestantes)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Transcurridos:</span>
                            <span className="font-medium">{correo.diasTranscurridos || 0}d</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Restantes:</span>
                            {getDiasRestantes(correo.diasRestantes || 0)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/auditor/trazabilidad/${correo.id}`)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(page * size) + 1}</span> a{' '}
                <span className="font-medium">{Math.min((page + 1) * size, totalItems)}</span> de{' '}
                <span className="font-medium">{totalItems}</span> correos
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 0}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}