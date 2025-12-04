"use client"

import { useState } from "react"

interface ResponseTimeConfig {
    id: string
    requestTypeId: string
    requestTypeName: string
    entityCategory: string
    defaultDays: number
    minimumDays: number
    maximumDays: number
    legalBasis: string
    alertThresholds: {
        warning: number // días antes para alerta amarilla
        critical: number // días antes para alerta roja
    }
    status: "active" | "inactive"
    lastUpdated: string
}

export default function ResponseTimesPage() {
    const [configs, setConfigs] = useState<ResponseTimeConfig[]>([
        {
            id: "1",
            requestTypeId: "1",
            requestTypeName: "Acceso a Información Pública",
            entityCategory: "Entidades Públicas",
            defaultDays: 10,
            minimumDays: 5,
            maximumDays: 15,
            legalBasis: "Ley 1712 de 2014, Artículo 14",
            alertThresholds: { warning: 3, critical: 1 },
            status: "active",
            lastUpdated: "2024-01-15",
        },
        {
            id: "2",
            requestTypeId: "2",
            requestTypeName: "PQR",
            entityCategory: "Entidades Públicas",
            defaultDays: 15,
            minimumDays: 10,
            maximumDays: 20,
            legalBasis: "Decreto 1074 de 2015",
            alertThresholds: { warning: 5, critical: 2 },
            status: "active",
            lastUpdated: "2024-01-14",
        },
        {
            id: "3",
            requestTypeId: "3",
            requestTypeName: "Derecho de Petición",
            entityCategory: "Todas las entidades",
            defaultDays: 10,
            minimumDays: 10,
            maximumDays: 10,
            legalBasis: "Artículo 23 CP",
            alertThresholds: { warning: 3, critical: 1 },
            status: "active",
            lastUpdated: "2024-01-13",
        },
        {
            id: "4",
            requestTypeId: "4",
            requestTypeName: "Solicitud Especial",
            entityCategory: "Todas las entidades",
            defaultDays: 20,
            minimumDays: 15,
            maximumDays: 30,
            legalBasis: "Manual Interno AZ Digital",
            alertThresholds: { warning: 7, critical: 3 },
            status: "active",
            lastUpdated: "2024-01-12",
        },
        {
            id: "5",
            requestTypeId: "5",
            requestTypeName: "Requerimiento Legal",
            entityCategory: "Entidades Judiciales",
            defaultDays: 5,
            minimumDays: 3,
            maximumDays: 7,
            legalBasis: "CPA",
            alertThresholds: { warning: 2, critical: 1 },
            status: "active",
            lastUpdated: "2024-01-11",
        },
    ])

    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<ResponseTimeConfig>>({})

    const handleEdit = (config: ResponseTimeConfig) => {
        setEditingId(config.id)
        setEditForm({ ...config })
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditForm({})
    }

    const handleSave = (id: string) => {
        setConfigs(configs.map(config =>
            config.id === id
                ? { ...config, ...editForm, lastUpdated: new Date().toISOString().split('T')[0] }
                : config
        ))
        setEditingId(null)
        setEditForm({})
    }

    const handleCreate = () => {
        const newConfig: ResponseTimeConfig = {
            id: `config_${Date.now()}`,
            requestTypeId: "",
            requestTypeName: "Nuevo tipo",
            entityCategory: "Todas las entidades",
            defaultDays: 15,
            minimumDays: 10,
            maximumDays: 20,
            legalBasis: "",
            alertThresholds: { warning: 3, critical: 1 },
            status: "active",
            lastUpdated: new Date().toISOString().split('T')[0],
        }
        setConfigs([newConfig, ...configs])
        setEditingId(newConfig.id)
        setEditForm(newConfig)
    }

    const handleDelete = (id: string) => {
        if (window.confirm("¿Está seguro de eliminar esta configuración?")) {
            setConfigs(configs.filter(config => config.id !== id))
        }
    }

    const handleToggleStatus = (id: string) => {
        setConfigs(configs.map(config =>
            config.id === id
                ? { ...config, status: config.status === "active" ? "inactive" : "active" }
                : config
        ))
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">⏱️ Tiempos de Respuesta</h1>
                        <p className="text-gray-600">Configura los plazos legales y alertas por tipo de solicitud</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <span>+</span>
                        Nueva configuración
                    </button>
                </div>
            </div>

            {/* Configuration Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo de solicitud</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Categoría</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Plazos (días)</th>
                                <th className="px6 py-3 text-left text-sm font-semibold text-gray-900">Alertas (días antes)</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {configs.map(config => (
                                <tr key={config.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{config.requestTypeName}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-xs">{config.legalBasis}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                            {config.entityCategory}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === config.id ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600 w-20">Por defecto:</span>
                                                    <input
                                                        type="number"
                                                        value={editForm.defaultDays}
                                                        onChange={(e) => setEditForm({ ...editForm, defaultDays: parseInt(e.target.value) })}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                                        min="1"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600 w-20">Mínimo:</span>
                                                    <input
                                                        type="number"
                                                        value={editForm.minimumDays}
                                                        onChange={(e) => setEditForm({ ...editForm, minimumDays: parseInt(e.target.value) })}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                                        min="1"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600 w-20">Máximo:</span>
                                                    <input
                                                        type="number"
                                                        value={editForm.maximumDays}
                                                        onChange={(e) => setEditForm({ ...editForm, maximumDays: parseInt(e.target.value) })}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                                        min="1"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">Por defecto:</span>
                                                    <span className="text-sm font-bold text-gray-900">{config.defaultDays}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">Rango:</span>
                                                    <span className="text-sm text-gray-700">
                                                        {config.minimumDays} - {config.maximumDays} días
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === config.id ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600 w-20">Advertencia:</span>
                                                    <input
                                                        type="number"
                                                        value={editForm.alertThresholds?.warning}
                                                        onChange={(e) => setEditForm({
                                                            ...editForm,
                                                            alertThresholds: { ...editForm.alertThresholds!, warning: parseInt(e.target.value) }
                                                        })}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                                        min="1"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600 w-20">Crítica:</span>
                                                    <input
                                                        type="number"
                                                        value={editForm.alertThresholds?.critical}
                                                        onChange={(e) => setEditForm({
                                                            ...editForm,
                                                            alertThresholds: { ...editForm.alertThresholds!, critical: parseInt(e.target.value) }
                                                        })}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Advertencia:</span>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {config.alertThresholds.warning} días antes
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Crítica:</span>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {config.alertThresholds.critical} días antes
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {config.status === "active" ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                <span>●</span> Activo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                <span>●</span> Inactivo
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === config.id ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleSave(config.id)}
                                                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(config)}
                                                    className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(config.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${config.status === "active"
                                                            ? "text-yellow-600 hover:bg-yellow-50"
                                                            : "text-green-600 hover:bg-green-50"
                                                        }`}
                                                >
                                                    {config.status === "active" ? "Desactivar" : "Activar"}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(config.id)}
                                                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {configs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⏱️</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay configuraciones de tiempo</h3>
                        <p className="text-gray-500 mb-4">Crea una nueva configuración para comenzar</p>
                        <button
                            onClick={handleCreate}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                            Crear configuración
                        </button>
                    </div>
                )}
            </div>

            {/* Stats and Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen estadístico</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Tiempo promedio de respuesta</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round(configs.reduce((acc, config) => acc + config.defaultDays, 0) / configs.length)} días
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Configuración más corta</p>
                            <p className="text-lg font-bold text-gray-900">
                                {configs.reduce((min, config) => config.defaultDays < min.defaultDays ? config : min).requestTypeName}
                                <span className="ml-2 text-green-600">
                                    ({configs.reduce((min, config) => config.defaultDays < min.defaultDays ? config : min).defaultDays} días)
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Configuración más larga</p>
                            <p className="text-lg font-bold text-gray-900">
                                {configs.reduce((max, config) => config.defaultDays > max.defaultDays ? config : max).requestTypeName}
                                <span className="ml-2 text-orange-600">
                                    ({configs.reduce((max, config) => config.defaultDays > max.defaultDays ? config : max).defaultDays} días)
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración rápida</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Configuraciones activas</span>
                            <span className="text-sm font-bold text-gray-900">{configs.filter(c => c.status === "active").length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Última actualización</span>
                            <span className="text-sm font-bold text-gray-900">{configs[0]?.lastUpdated}</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Notas:</p>
                            <ul className="text-xs text-gray-500 space-y-1">
                                <li>• Los tiempos están en días hábiles</li>
                                <li>• Las alertas se envían por correo electrónico</li>
                                <li>• Las configuraciones inactivas no generan alertas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}