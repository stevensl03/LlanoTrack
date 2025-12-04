"use client"

import { useState } from "react"

interface ActivityLog {
    id: string
    timestamp: string
    user: string
    userRole: string
    action: string
    targetType: string
    targetName: string
    details: string
    ipAddress: string
    status: "success" | "error" | "warning"
}

export default function ActivityHistoryPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([
        {
            id: "1",
            timestamp: "2024-01-15 14:30:25",
            user: "admin@azdigital.gov.co",
            userRole: "Administrador",
            action: "CREAR_USUARIO",
            targetType: "Usuario",
            targetName: "maria.garcia@azdigital.gov.co",
            details: "Usuario creado con rol Gestor en área Gestión Administrativa",
            ipAddress: "192.168.1.100",
            status: "success",
        },
        {
            id: "2",
            timestamp: "2024-01-15 14:25:10",
            user: "admin@azdigital.gov.co",
            userRole: "Administrador",
            action: "ACTUALIZAR_ENTIDAD",
            targetType: "Entidad",
            targetName: "Alcaldía Municipal",
            details: "Dominios actualizados: alcaldia.gov.co, municipio.gov.co",
            ipAddress: "192.168.1.100",
            status: "success",
        },
        {
            id: "3",
            timestamp: "2024-01-15 14:20:45",
            user: "carlos.rodriguez@azdigital.gov.co",
            userRole: "Aprobador",
            action: "DESACTIVAR_USUARIO",
            targetType: "Usuario",
            targetName: "juan.perez@azdigital.gov.co",
            details: "Usuario desactivado por inactividad prolongada",
            ipAddress: "192.168.1.105",
            status: "success",
        },
        {
            id: "4",
            timestamp: "2024-01-15 14:15:30",
            user: "admin@azdigital.gov.co",
            userRole: "Administrador",
            action: "CONFIGURAR_ALERTA",
            targetType: "Alerta",
            targetName: "Recordatorio semanal",
            details: "Alerta desactivada temporalmente",
            ipAddress: "192.168.1.100",
            status: "warning",
        },
        {
            id: "5",
            timestamp: "2024-01-15 14:10:15",
            user: "ana.martinez@azdigital.gov.co",
            userRole: "Integrador",
            action: "INTENTO_ACCESO",
            targetType: "Sistema",
            targetName: "API de correo",
            details: "Intento de acceso fallido con credenciales incorrectas",
            ipAddress: "192.168.1.110",
            status: "error",
        },
        {
            id: "6",
            timestamp: "2024-01-15 14:05:00",
            user: "admin@azdigital.gov.co",
            userRole: "Administrador",
            action: "AGREGAR_TIPO_SOLICITUD",
            targetType: "Tipo de solicitud",
            targetName: "Consulta Técnica",
            details: "Nuevo tipo de solicitud añadido con tiempo de respuesta 30 días",
            ipAddress: "192.168.1.100",
            status: "success",
        },
        {
            id: "7",
            timestamp: "2024-01-15 14:00:30",
            user: "laura.ruiz@azdigital.gov.co",
            userRole: "Seguimiento",
            action: "EXPORTAR_REPORTE",
            targetType: "Reporte",
            targetName: "Reporte mensual de actividades",
            details: "Reporte exportado en formato PDF",
            ipAddress: "192.168.1.115",
            status: "success",
        },
        {
            id: "8",
            timestamp: "2024-01-15 13:55:20",
            user: "admin@azdigital.gov.co",
            userRole: "Administrador",
            action: "ACTUALIZAR_TIEMPO_RESPUESTA",
            targetType: "Configuración",
            targetName: "Acceso a Información Pública",
            details: "Tiempo de respuesta actualizado de 15 a 10 días",
            ipAddress: "192.168.1.100",
            status: "success",
        },
    ])

    const [filters, setFilters] = useState({
        user: "",
        action: "",
        status: "all",
        dateRange: "today",
    })

    const [searchTerm, setSearchTerm] = useState("")

    const filteredLogs = logs.filter(log => {
        const matchesSearch = searchTerm === "" ||
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesUser = filters.user === "" || log.user.includes(filters.user)
        const matchesAction = filters.action === "" || log.action.includes(filters.action)
        const matchesStatus = filters.status === "all" || log.status === filters.status

        // Filter by date range
        const logDate = new Date(log.timestamp)
        const today = new Date()
        let matchesDate = true

        switch (filters.dateRange) {
            case "today":
                matchesDate = logDate.toDateString() === today.toDateString()
                break
            case "week":
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
                matchesDate = logDate >= weekAgo
                break
            case "month":
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
                matchesDate = logDate >= monthAgo
                break
        }

        return matchesSearch && matchesUser && matchesAction && matchesStatus && matchesDate
    })

    const getStatusBadge = (status: string) => {
        const styles = {
            success: "bg-green-100 text-green-700",
            error: "bg-red-100 text-red-700",
            warning: "bg-yellow-100 text-yellow-700",
        }
        const icons = {
            success: "✅",
            error: "❌",
            warning: "⚠️",
        }
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]} {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    const getActionIcon = (action: string) => {
        const icons: Record<string, string> = {
            "CREAR_USUARIO": "👤",
            "ACTUALIZAR_ENTIDAD": "🏛️",
            "DESACTIVAR_USUARIO": "⏸️",
            "CONFIGURAR_ALERTA": "🔔",
            "INTENTO_ACCESO": "🔐",
            "AGREGAR_TIPO_SOLICITUD": "📋",
            "EXPORTAR_REPORTE": "📊",
            "ACTUALIZAR_TIEMPO_RESPUESTA": "⏱️",
        }
        return icons[action] || "📝"
    }

    const handleExport = () => {
        const dataStr = JSON.stringify(filteredLogs, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = `activity_logs_${new Date().toISOString().split('T')[0]}.json`

        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Historial de Actividad</h1>
                        <p className="text-gray-600">Registro de todas las acciones realizadas en el sistema</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <span>📥</span>
                            Exportar registros
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
                            <input
                                type="text"
                                placeholder="Usuario, acción o detalles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
                            <select
                                value={filters.user}
                                onChange={(e) => setFilters({ ...filters, user: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos los usuarios</option>
                                <option value="admin@azdigital.gov.co">Administrador</option>
                                <option value="carlos.rodriguez@azdigital.gov.co">Carlos Rodríguez</option>
                                <option value="ana.martinez@azdigital.gov.co">Ana Martínez</option>
                                <option value="laura.ruiz@azdigital.gov.co">Laura Ruiz</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Acción</label>
                            <select
                                value={filters.action}
                                onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todas las acciones</option>
                                <option value="CREAR_USUARIO">Crear usuario</option>
                                <option value="ACTUALIZAR_ENTIDAD">Actualizar entidad</option>
                                <option value="CONFIGURAR_ALERTA">Configurar alerta</option>
                                <option value="AGREGAR_TIPO_SOLICITUD">Agregar tipo solicitud</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="success">Éxito</option>
                                <option value="error">Error</option>
                                <option value="warning">Advertencia</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Periodo</label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="today">Hoy</option>
                                <option value="week">Última semana</option>
                                <option value="month">Último mes</option>
                                <option value="all">Todo el tiempo</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                            Mostrando {filteredLogs.length} de {logs.length} registros
                        </span>
                        <button
                            onClick={() => {
                                setFilters({ user: "", action: "", status: "all", dateRange: "today" })
                                setSearchTerm("")
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Activity Logs Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fecha/Hora</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acción</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Objeto</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Detalles</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map(log => (
                                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{log.timestamp.split(' ')[0]}</p>
                                            <p className="text-xs text-gray-500">{log.timestamp.split(' ')[1]}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{log.user}</p>
                                            <p className="text-xs text-gray-500">{log.userRole}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{getActionIcon(log.action)}</span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {log.action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                                                </p>
                                                <p className="text-xs text-gray-500">{log.ipAddress}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{log.targetName}</p>
                                            <p className="text-xs text-gray-500">{log.targetType}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700 max-w-xs">{log.details}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(log.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron registros</h3>
                        <p className="text-gray-500 mb-4">Intenta cambiar los filtros de búsqueda</p>
                    </div>
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Total registros</p>
                    <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Éxitos</p>
                    <p className="text-2xl font-bold text-green-600">{logs.filter(l => l.status === "success").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Errores</p>
                    <p className="text-2xl font-bold text-red-600">{logs.filter(l => l.status === "error").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Acciones hoy</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
                    </p>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de actividad</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Usuarios más activos</p>
                        <div className="space-y-2">
                            {Array.from(new Set(logs.map(l => l.user)))
                                .map(user => ({
                                    user,
                                    count: logs.filter(l => l.user === user).length
                                }))
                                .sort((a, b) => b.count - a.count)
                                .slice(0, 3)
                                .map((item, index) => (
                                    <div key={item.user} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{item.user.split('@')[0]}</span>
                                        <span className="text-sm font-bold text-gray-900">{item.count} acciones</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Acciones más frecuentes</p>
                        <div className="space-y-2">
                            {Object.entries(
                                logs.reduce((acc, log) => {
                                    acc[log.action] = (acc[log.action] || 0) + 1
                                    return acc
                                }, {} as Record<string, number>)
                            )
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 3)
                                .map(([action, count]) => (
                                    <div key={action} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">
                                            {action.replace(/_/g, ' ').toLowerCase()}
                                        </span>
                                        <span className="text-sm font-bold text-gray-900">{count}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Distribución por hora</p>
                        <div className="space-y-2">
                            {['09:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00'].map(range => {
                                const [start, end] = range.split('-')
                                const count = logs.filter(log => {
                                    const hour = parseInt(log.timestamp.split(' ')[1].split(':')[0])
                                    return hour >= parseInt(start) && hour < parseInt(end)
                                }).length
                                return (
                                    <div key={range} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{range}</span>
                                        <span className="text-sm font-bold text-gray-900">{count}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}