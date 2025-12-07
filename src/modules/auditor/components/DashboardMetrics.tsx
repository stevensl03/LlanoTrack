interface DashboardMetricsProps {
  metrics: any
}

export default function DashboardMetrics({ metrics }: DashboardMetricsProps) {
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Métricas en Tiempo Real</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {/* Total Correos */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 mb-1">Total Correos</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.totalCorreos || 0}</p>
              <p className="text-xs text-blue-500 mt-1">Solicitudes</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-blue-600">📨</span>
            </div>
          </div>
        </div>

        {/* Vencidos */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 mb-1">Vencidos</p>
              <p className="text-2xl font-bold text-red-900">{metrics.correosVencidos || 0}</p>
              <p className="text-xs text-red-500 mt-1">Requieren atención</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-red-600">⚠️</span>
            </div>
          </div>
        </div>

        {/* Cumplidos */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 mb-1">Cumplidos</p>
              <p className="text-2xl font-bold text-green-900">{metrics.correosCumplidos || 0}</p>
              <p className="text-xs text-green-500 mt-1">Enviados a tiempo</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-green-600">✅</span>
            </div>
          </div>
        </div>

        {/* Cumplimiento */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 mb-1">Cumplimiento</p>
              <p className="text-2xl font-bold text-purple-900">{metrics.porcentajeCumplimiento?.toFixed(1) || 0}%</p>
              <p className="text-xs text-purple-500 mt-1">Tasa de éxito</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-purple-600">📊</span>
            </div>
          </div>
        </div>

        {/* Tiempo Promedio */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 mb-1">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-orange-900">{metrics.tiempoPromedioRespuesta?.toFixed(1) || 0}d</p>
              <p className="text-xs text-orange-500 mt-1">Días por respuesta</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-orange-600">⏱️</span>
            </div>
          </div>
        </div>

        {/* A Tiempo */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-600 mb-1">A Tiempo</p>
              <p className="text-2xl font-bold text-teal-900">
                {(metrics.totalCorreos || 0) - (metrics.correosVencidos || 0)}
              </p>
              <p className="text-xs text-teal-500 mt-1">Dentro de plazo</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-teal-600">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Distribución por Estado */}
      {metrics.correosPorEstado && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-900 mb-3">📊 Distribución por Estado</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(metrics.correosPorEstado).map(([estado, cantidad]) => (
              <div key={estado} className="text-center">
                <div className={`p-3 rounded-lg ${getEstadoColor(estado)}`}>
                  <p className="text-lg font-bold">{String(cantidad)}</p>
                  <p className="text-xs capitalize">{estado.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}