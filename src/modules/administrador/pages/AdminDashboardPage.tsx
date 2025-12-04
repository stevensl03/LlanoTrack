"use client"

import { useState } from "react"
import { useNavigate } from "react-router"

interface SystemStats {
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    entities: number
    requestTypes: number
    pendingAlerts: number
}

export default function AdminDashboardPage() {
    const navigate = useNavigate()
    const [stats] = useState<SystemStats>({
        totalUsers: 45,
        activeUsers: 38,
        inactiveUsers: 7,
        entities: 23,
        requestTypes: 12,
        pendingAlerts: 5,
    })

    const [recentActivities] = useState([
        { id: 1, user: "admin@azdigital.gov.co", action: "Usuario creado", target: "maria.garcia@azdigital.gov.co", time: "Hace 2 horas" },
        { id: 2, user: "admin@azdigital.gov.co", action: "Entidad actualizada", target: "Alcaldía Municipal", time: "Hace 4 horas" },
        { id: 3, user: "admin@azdigital.gov.co", action: "Configuración de alertas modificada", target: "Acceso a Información Pública", time: "Ayer, 15:30" },
        { id: 4, user: "admin@azdigital.gov.co", action: "Usuario desactivado", target: "juan.perez@azdigital.gov.co", time: "Ayer, 11:45" },
        { id: 5, user: "admin@azdigital.gov.co", action: "Tipo de solicitud añadido", target: "Consulta de trámites", time: "16/01/2024" },
    ])

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚙️ Panel de Administración</h1>
                        <p className="text-gray-600">Gestión completa del sistema y configuración</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                            <span>📊</span>
                            Generar reporte
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Usuarios totales</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600">👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Activos</p>
                                <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600">✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Inactivos</p>
                                <p className="text-2xl font-bold text-red-600">{stats.inactiveUsers}</p>
                            </div>
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600">⏸️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Entidades</p>
                                <p className="text-2xl font-bold text-purple-600">{stats.entities}</p>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600">🏛️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tipos de solicitud</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.requestTypes}</p>
                            </div>
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600">📝</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Alertas pendientes</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pendingAlerts}</p>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <span className="text-yellow-600">⚠️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <button
                        onClick={() => navigate("/admin/users")}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <span className="text-blue-600 text-xl">👤</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Crear usuario</p>
                    </button>

                    <button
                        onClick={() => navigate("/admin/entities")}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <span className="text-purple-600 text-xl">🏛️</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Gestionar entidades</p>
                    </button>

                    <button
                        onClick={() => navigate("/admin/request-types")}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                            <span className="text-orange-600 text-xl">📋</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Tipos de solicitud</p>
                    </button>

                    <button
                        onClick={() => navigate("/admin/response-times")}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <span className="text-green-600 text-xl">⏱️</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Tiempos de respuesta</p>
                    </button>

                    <button
                        onClick={() => navigate("/admin/alerts")}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                            <span className="text-yellow-600 text-xl">🔔</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Configurar alertas</p>
                    </button>

                    <button
                        onClick={() => navigate("/admin/activity")}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-gray-600 text-xl">📊</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Ver actividad</p>
                    </button>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Actividad reciente</h2>
                        <p className="text-sm text-gray-600 mt-1">Últimas acciones en el sistema</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 text-sm">🔧</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Por <span className="font-semibold">{activity.user}</span> • {activity.target}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Estado del sistema</h2>
                        <p className="text-sm text-gray-600 mt-1">Métricas y disponibilidad</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600">✅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">API de correo</p>
                                        <p className="text-xs text-gray-500">Estado operativo</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    En línea
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600">✅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Base de datos</p>
                                        <p className="text-xs text-gray-500">Conectada y sincronizada</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    Estable
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <span className="text-yellow-600">⚠️</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Almacenamiento</p>
                                        <p className="text-xs text-gray-500">74% utilizado</p>
                                    </div>
                                </div>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "74%" }}></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600">📊</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Rendimiento</p>
                                        <p className="text-xs text-gray-500">Tiempo de respuesta promedio</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">142 ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}