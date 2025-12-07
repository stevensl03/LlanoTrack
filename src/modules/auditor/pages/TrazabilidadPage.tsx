import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { useMockService } from '../../../shared/hooks/useMockService'

export default function TrazabilidadPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCorreoById, getFlujosByCorreoId, exportToPDF, loading } = useMockService()
  
  const [correo, setCorreo] = useState<any>(null)
  const [flujos, setFlujos] = useState<any[]>([])
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    if (id) {
      loadCorreoData()
    }
  }, [id])

  const loadCorreoData = async () => {
    const correoResponse = await getCorreoById(id!)
    if (correoResponse.success && correoResponse.data) {
      setCorreo(correoResponse.data)
    }

    const flujosResponse = await getFlujosByCorreoId(id!)
    if (flujosResponse.success && flujosResponse.data) {
      setFlujos(flujosResponse.data)
    }
  }

  const handleExportPDF = async () => {
    setExporting(true)
    const response = await exportToPDF()
    if (response.success && response.data) {
      window.open(response.data.url, '_blank')
    }
    setExporting(false)
  }

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      'RECEPCION': 'bg-blue-100 text-blue-800',
      'ELABORACION': 'bg-yellow-100 text-yellow-800',
      'REVISION': 'bg-purple-100 text-purple-800',
      'APROBACION': 'bg-indigo-100 text-indigo-800',
      'ENVIADO': 'bg-green-100 text-green-800',
      'VENCIDO': 'bg-red-100 text-red-800',
      'ARCHIVADO': 'bg-gray-100 text-gray-800'
    }
    return colors[estado] || 'bg-gray-100 text-gray-800'
  }

  const formatFecha = (fecha: string) => {
    if (!fecha) return 'En progreso'
    return new Date(fecha).toLocaleString('es-ES')
  }

  const calcularDuracion = (duracion: number) => {
    if (!duracion) return '-'
    if (duracion < 1) return `${(duracion * 24).toFixed(1)} horas`
    return `${duracion.toFixed(1)} días`
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Trazabilidad Completa</h1>
            <p className="text-gray-600">
              {correo?.radicadoEntrada} - {correo?.asunto}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/auditor/dashboard')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Volver
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting || loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>📄</span>
              <span>{exporting ? 'Generando...' : 'Descargar PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {loading && !correo ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información del correo...</p>
        </div>
      ) : correo ? (
        <>
          {/* Información General */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📧 Información General</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Radicado Entrada</p>
                <p className="font-medium">{correo.radicadoEntrada}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Radicado Salida</p>
                <p className="font-medium">{correo.radicadoSalida || 'No generado'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Entidad</p>
                <p className="font-medium">{correo.entidadNombre}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Tipo de Solicitud</p>
                <p className="font-medium">{correo.tipoSolicitudNombre}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Plazo Legal</p>
                <p className="font-medium">{correo.diasTranscurridos || 0}/{correo.diasRestantes || 0} días</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Estado Actual</p>
                <p className={`font-medium px-3 py-1 rounded-full inline-block ${getEstadoColor(correo.estado)}`}>
                  {correo.estado.toLowerCase()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Fecha Recepción</p>
                <p className="font-medium">{formatFecha(correo.fechaRecepcion)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Fecha Vencimiento</p>
                <p className="font-medium">{formatFecha(correo.fechaVencimiento)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Gestor Asignado</p>
                <p className="font-medium">{correo.gestorNombre}</p>
              </div>
            </div>
          </div>

          {/* Historial del Flujo */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📜 Historial del Proceso</h2>
            
            <div className="space-y-6">
              {flujos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay historial registrado para este correo</p>
              ) : (
                flujos.map((flujo, index) => (
                  <div key={flujo.id} className="flex items-start gap-4">
                    {/* Línea vertical */}
                    {index < flujos.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 ml-5 mt-2"></div>
                    )}
                    
                    {/* Ícono de etapa */}
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">
                        {flujo.etapa === 'RECEPCION' && '📥'}
                        {flujo.etapa === 'ELABORACION' && '✍️'}
                        {flujo.etapa === 'REVISION' && '👁️'}
                        {flujo.etapa === 'APROBACION' && '✅'}
                        {flujo.etapa === 'ENVIADO' && '📤'}
                      </span>
                    </div>
                    
                    {/* Contenido */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 capitalize">{flujo.etapa.toLowerCase()}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {flujo.usuarioNombre}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatFecha(flujo.fechaInicio)}
                          </p>
                          {flujo.fechaFin && (
                            <p className="text-xs text-gray-500">
                              hasta {formatFecha(flujo.fechaFin)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {flujo.duracion && flujo.duracion > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-gray-500">Duración:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {calcularDuracion(flujo.duracion)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Resumen */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Resumen del Proceso</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Estado General</p>
                <p className={`text-lg font-bold ${correo.diasRestantes < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {correo.diasRestantes < 0 ? 'VENCIDO' : 'EN PROCESO'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Tiempo Utilizado</p>
                <p className="text-lg font-bold text-gray-900">
                  {correo.diasTranscurridos || 0} días
                </p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Días Restantes</p>
                <p className={`text-lg font-bold ${correo.diasRestantes <= 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {Math.abs(correo.diasRestantes || 0)} días
                </p>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso del proceso</span>
                <span>{Math.round((flujos.length / 5) * 100)}% completado</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(flujos.length / 5) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Recepción</span>
                <span>Elaboración</span>
                <span>Revisión</span>
                <span>Aprobación</span>
                <span>Enviado</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontró información para este correo</p>
        </div>
      )}
    </div>
  )
}