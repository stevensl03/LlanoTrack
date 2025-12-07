import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useMockService } from '../../../shared/hooks/useMockService'

interface SystemStats {
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    entities: number
    requestTypes: number
    totalCorreos: number
    correosVencidos: number
    porcentajeCumplimiento: number
    tiempoPromedioRespuesta: number
}

export default function AdminDashboardPage() {
    const navigate = useNavigate()
    const { 
        getUsers, 
        getEntities, 
        getRequestTypes, 
        getDashboardMetrics,  // ¡Esto es clave!
        loading, 
        error 
    } = useMockService()
    
    const [stats, setStats] = useState<SystemStats>({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        entities: 0,
        requestTypes: 0,
        totalCorreos: 0,
        correosVencidos: 0,
        porcentajeCumplimiento: 0,
        tiempoPromedioRespuesta: 0
    })

    const [dashboardMetrics, setDashboardMetrics] = useState<any>(null)
    const [loadingMetrics, setLoadingMetrics] = useState(true)

    // Cargar todas las estadísticas
    useEffect(() => {
        loadAllStats()
        loadDashboardMetrics()
    }, [])

    const loadAllStats = async () => {
        try {
            // Cargar usuarios
            const usersResponse = await getUsers()
            if (usersResponse.success && usersResponse.data) {
                const users = usersResponse.data
                const activeUsers = users.filter(u => u.activo).length
                const inactiveUsers = users.filter(u => !u.activo).length
                
                setStats(prev => ({
                    ...prev,
                    totalUsers: users.length,
                    activeUsers,
                    inactiveUsers,
                }))
            }

            // Cargar entidades
            const entitiesResponse = await getEntities()
            if (entitiesResponse.success && entitiesResponse.data) {
                setStats(prev => ({
                    ...prev,
                    entities: entitiesResponse.data!.length,
                }))
            }

            // Cargar tipos de solicitud
            const typesResponse = await getRequestTypes()
            if (typesResponse.success && typesResponse.data) {
                setStats(prev => ({
                    ...prev,
                    requestTypes: typesResponse.data!.length,
                }))
            }

        } catch (error) {
            console.error("Error cargando estadísticas:", error)
        }
    }

    const loadDashboardMetrics = async () => {
        setLoadingMetrics(true)
        try {
            const response = await getDashboardMetrics()
            if (response.success && response.data) {
                const metrics = response.data
                setDashboardMetrics(metrics)
                
                // Actualizar stats con datos del dashboard
                setStats(prev => ({
                    ...prev,
                    totalCorreos: metrics.totalCorreos || 0,
                    correosVencidos: metrics.correosVencidos || 0,
                    porcentajeCumplimiento: metrics.porcentajeCumplimiento || 0,
                    tiempoPromedioRespuesta: metrics.tiempoPromedioRespuesta || 0
                }))
            }
        } catch (error) {
            console.error("Error cargando métricas:", error)
        } finally {
            setLoadingMetrics(false)
        }
    }

    const refreshAll = () => {
        loadAllStats()
        loadDashboardMetrics()
    }

    if (loading && loadingMetrics) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando datos del sistema...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Panel de Gestión de Correos</h1>
                        <p className="text-gray-600">Sistema integral de seguimiento de solicitudes</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={refreshAll}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                        >
                            <span>↻</span>
                            <span>Actualizar</span>
                        </button>
                    </div>
                </div>

                {/* Panel de Métricas de Correos - REEMPLAZO DE ACCIONES RÁPIDAS */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Métricas de Correos</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                        {/* Total Correos */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600 mb-1">Total Correos</p>
                                    <p className="text-2xl font-bold text-blue-900">{stats.totalCorreos}</p>
                                    <p className="text-xs text-blue-500 mt-1">Solicitudes gestionadas</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <span className="text-blue-600">📨</span>
                                </div>
                            </div>
                        </div>

                        {/* Porcentaje Cumplimiento */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600 mb-1">Cumplimiento</p>
                                    <p className="text-2xl font-bold text-green-900">{stats.porcentajeCumplimiento.toFixed(1)}%</p>
                                    <p className="text-xs text-green-500 mt-1">Tasa de éxito</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <span className="text-green-600">✅</span>
                                </div>
                            </div>
                        </div>

                        {/* Correos Vencidos */}
                        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-red-600 mb-1">Vencidos</p>
                                    <p className="text-2xl font-bold text-red-900">{stats.correosVencidos}</p>
                                    <p className="text-xs text-red-500 mt-1">Requieren atención</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <span className="text-red-600">⚠️</span>
                                </div>
                            </div>
                        </div>

                        {/* Tiempo Promedio */}
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 mb-1">Tiempo Promedio</p>
                                    <p className="text-2xl font-bold text-purple-900">{stats.tiempoPromedioRespuesta}d</p>
                                    <p className="text-xs text-purple-500 mt-1">Días por solicitud</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <span className="text-purple-600">⏱️</span>
                                </div>
                            </div>
                        </div>

                        {/* Estado del Sistema */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Sistema</p>
                                    <p className={`text-2xl font-bold ${!error ? 'text-gray-900' : 'text-red-600'}`}>
                                        {!error ? 'Activo' : 'Error'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {!error ? 'Todo funciona' : 'Revisar conexión'}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <span className={!error ? 'text-gray-600' : 'text-red-600'}>
                                        {!error ? '⚡' : '❌'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Distribución por Estado */}
                    {dashboardMetrics && dashboardMetrics.correosPorEstado && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="font-medium text-gray-900 mb-4">📊 Distribución por Estado</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                                {Object.entries(dashboardMetrics.correosPorEstado).map(([estado, cantidad]) => (
                                    <div key={estado} className="text-center">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{cantidad as number}</p>
                                            <p className="text-xs text-gray-500 capitalize">{estado.toLowerCase()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Información del Sistema */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">⚙️ Configuración del Sistema</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Usuarios */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Usuarios</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                                    <div className="flex gap-2 mt-1 text-xs">
                                        <span className="text-green-600">{stats.activeUsers} activos</span>
                                        <span className="text-red-600">{stats.inactiveUsers} inactivos</span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600">👥</span>
                                </div>
                            </div>

                        </div>

                        {/* Entidades */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Entidades</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.entities}</p>
                                    <p className="text-xs text-gray-500 mt-1">Organizaciones registradas</p>
                                </div>
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600">🏛️</span>
                                </div>
                            </div>

                        </div>

                        {/* Tipos de Solicitud */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Tipos de Solicitud</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.requestTypes}</p>
                                    <p className="text-xs text-gray-500 mt-1">Configuraciones</p>
                                </div>
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600">📋</span>
                                </div>
                            </div>

                        </div>

                        {/* Rendimiento */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Rendimiento</p>
                                    <p className="text-2xl font-bold text-green-900">{stats.porcentajeCumplimiento > 80 ? 'Óptimo' : 'Regular'}</p>
                                    <p className="text-xs text-gray-500 mt-1">Basado en cumplimiento</p>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600">📈</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Información Adicional si hay métricas */}
            {dashboardMetrics && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Entidades */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">🏢 Top Entidades</h2>
                            <p className="text-sm text-gray-600 mt-1">Con más solicitudes recibidas</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {dashboardMetrics.correosPorEntidad && dashboardMetrics.correosPorEntidad.slice(0, 5).map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <span className="text-blue-600">{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{item.entidad}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.cantidad}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tendencias */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">📈 Tendencias Mensuales</h2>
                            <p className="text-sm text-gray-600 mt-1">Últimos 6 meses</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {dashboardMetrics.tendenciaMensual && dashboardMetrics.tendenciaMensual.slice(-6).map((mes: any, index: number) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-900">{mes.mes}</span>
                                            <span className="text-gray-600">{mes.cumplidos}/{mes.total} cumplidos</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full" 
                                                style={{ width: `${(mes.cumplidos / mes.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {((mes.cumplidos / mes.total) * 100).toFixed(1)}% de cumplimiento
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}