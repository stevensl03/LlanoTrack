import { useState, useEffect } from "react"
import { useMockService } from '../../../shared/hooks/useMockService'
import DashboardMetrics from '../components/DashboardMetrics'
import CorreosTable from '../components/CorreosTable'
import FiltrosAvanzados from '../components/FiltrosAvanzados'
import ExportButtons from '../components/ExportButtons'
import ChartsSection from '../components/ChartsSection'

import type {
  DashboardMetrics as DashboardMetricsType,
  Correo,
  FilterParams,
  ApiResponse
} from '../../../shared/types/core.types'

interface DashboardState extends FilterParams {
  searchTerm: string
  page: number
  size: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export default function DashboardPage() {
  const { 
    getDashboardMetrics, 
    getCorreos, 
    getAvailableFilters, 
    exportToExcel, 
    exportToPDF, 
    loading, 
    error 
  } = useMockService()
  
  const [filters, setFilters] = useState<DashboardState>({
    fechaInicio: '',
    fechaFin: '',
    gestorId: '',
    entidadId: '',
    estado: undefined,
    tipoSolicitudId: '',
    urgencia: undefined,
    searchTerm: '',
    page: 0,
    size: 20,
    sortBy: 'fechaRecepcion',
    sortOrder: 'desc'
  })
  
  const [metrics, setMetrics] = useState<DashboardMetricsType | null>(null)
  const [correos, setCorreos] = useState<Correo[]>([])
  const [availableFilters, setAvailableFilters] = useState<any>(null)
  const [totalItems, setTotalItems] = useState(0)

  // ---------- MÉTRICAS ----------
  const loadDashboardMetrics = async () => {
    const response: ApiResponse<DashboardMetricsType> = await getDashboardMetrics({
      fechaInicio: filters.fechaInicio || undefined,
      fechaFin: filters.fechaFin || undefined,
      gestorId: filters.gestorId || undefined,
      entidadId: filters.entidadId || undefined,
      estado: filters.estado || undefined,
      tipoSolicitudId: filters.tipoSolicitudId || undefined,
      urgencia: filters.urgencia || undefined
    })
    
    if (response.success && response.data) {
      setMetrics(response.data)
    }
  }

  // ---------- CORREOS ----------
  const loadCorreos = async () => {
    const response: ApiResponse<Correo[]> = await getCorreos({
      fechaInicio: filters.fechaInicio || undefined,
      fechaFin: filters.fechaFin || undefined,
      gestorId: filters.gestorId || undefined,
      entidadId: filters.entidadId || undefined,
      estado: filters.estado || undefined,
      tipoSolicitudId: filters.tipoSolicitudId || undefined,
      urgencia: filters.urgencia || undefined,
      searchTerm: filters.searchTerm || undefined,
      page: filters.page,
      size: filters.size,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder
    })
    
    if (response.success && response.data) {
      setCorreos(response.data)
      setTotalItems(response.totalItems || 0)
    }
  }

  // ---------- FILTROS DISPONIBLES ----------
  const loadAvailableFilters = async () => {
    const response = await getAvailableFilters()
    if (response.success && response.data) {
      setAvailableFilters(response.data)
    }
  }

  // ---------- EFECTOS ----------
  useEffect(() => {
    loadDashboardMetrics()
    loadAvailableFilters()
  }, [])

  useEffect(() => {
    loadCorreos()
  }, [filters.page, filters.size, filters.sortBy, filters.sortOrder])

  // ---------- MANEJO DE FILTROS ----------
  const handleFilterChange = (newFilters: Partial<DashboardState>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 0 }))
  }

  const handleApplyFilters = () => {
    loadDashboardMetrics()
    loadCorreos()
  }

  // ---------- EXPORTAR ----------
  const handleExportExcel = async () => {
    const response = await exportToExcel(filters)
    if (response.success && response.data) {
      window.open(response.data.url, '_blank')
    }
  }

  const handleExportPDF = async () => {
    const response = await exportToPDF(filters)
    if (response.success && response.data) {
      window.open(response.data.url, '_blank')
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Dashboard de Seguimiento</h1>
            <p className="text-gray-600">Monitor en tiempo real del sistema de correos</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Actualizado: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosAvanzados
        filters={filters}
        availableFilters={availableFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        loading={loading}
      />

      {/* Métricas */}
      {metrics && <DashboardMetrics metrics={metrics} />}

      {/* Gráficos */}
      {metrics && <ChartsSection metrics={metrics} />}

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">📋 Correos Gestionados</h2>
              <p className="text-sm text-gray-600 mt-1">
                {totalItems} correos encontrados
              </p>
            </div>
            <ExportButtons
              onExportExcel={handleExportExcel}
              onExportPDF={handleExportPDF}
              loading={loading}
            />
          </div>
        </div>
        <div className="p-6">
          <CorreosTable
            correos={correos}
            loading={loading}
            page={filters.page}
            size={filters.size}
            totalItems={totalItems}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onPageChange={(page) => handleFilterChange({ page })}
            onSortChange={(sortBy, sortOrder) => handleFilterChange({ sortBy, sortOrder })}
          />
        </div>
      </div>
    </div>
  )
}
