"use client"

import { useState } from "react"
import RequestTypeFormModal from "../components/modal/RequestTypeFormModal"

interface RequestType {
    id: string
    name: string
    description: string
    defaultResponseTime: number
    legalReference: string
    priority: "low" | "medium" | "high"
    category: string
    status: "active" | "inactive"
    createdAt: string
}

export default function RequestTypesPage() {
    const [requestTypes, setRequestTypes] = useState<RequestType[]>([
        {
            id: "1",
            name: "Acceso a Información Pública",
            description: "Solicitud de información pública según Ley de Transparencia",
            defaultResponseTime: 10,
            legalReference: "Ley 1712 de 2014",
            priority: "high",
            category: "Legal",
            status: "active",
            createdAt: "2024-01-10",
        },
        {
            id: "2",
            name: "Petición, Queja o Reclamo (PQR)",
            description: "Peticiones, quejas o reclamos ciudadanos",
            defaultResponseTime: 15,
            legalReference: "Decreto 1074 de 2015",
            priority: "medium",
            category: "Ciudadana",
            status: "active",
            createdAt: "2024-01-11",
        },
        {
            id: "3",
            name: "Derecho de Petición",
            description: "Ejercicio del derecho constitucional de petición",
            defaultResponseTime: 10,
            legalReference: "Artículo 23 Constitución Política",
            priority: "high",
            category: "Legal",
            status: "active",
            createdAt: "2024-01-12",
        },
        {
            id: "4",
            name: "Solicitud Especial",
            description: "Solicitudes especiales no contempladas en otras categorías",
            defaultResponseTime: 20,
            legalReference: "Manual Interno AZ Digital",
            priority: "low",
            category: "Administrativa",
            status: "active",
            createdAt: "2024-01-13",
        },
        {
            id: "5",
            name: "Requerimiento Legal",
            description: "Requerimientos de autoridades judiciales o administrativas",
            defaultResponseTime: 5,
            legalReference: "Código de Procedimiento Administrativo",
            priority: "high",
            category: "Legal",
            status: "active",
            createdAt: "2024-01-14",
        },
        {
            id: "6",
            name: "Consulta Técnica",
            description: "Consultas sobre aspectos técnicos o procedimentales",
            defaultResponseTime: 30,
            legalReference: "Manual de Procedimientos",
            priority: "low",
            category: "Técnica",
            status: "inactive",
            createdAt: "2024-01-15",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [priorityFilter, setPriorityFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
    const [showFormModal, setShowFormModal] = useState(false)
    const [selectedRequestType, setSelectedRequestType] = useState<RequestType | null>(null)

    const categories = [...new Set(requestTypes.map(rt => rt.category))]

    const filteredRequestTypes = requestTypes.filter(rt => {
        const matchesSearch =
            rt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rt.legalReference.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = categoryFilter === "all" || rt.category === categoryFilter
        const matchesPriority = priorityFilter === "all" || rt.priority === priorityFilter
        const matchesStatus = statusFilter === "all" || rt.status === statusFilter

        return matchesSearch && matchesCategory && matchesPriority && matchesStatus
    })

    const handleCreate = () => {
        setSelectedRequestType(null)
        setShowFormModal(true)
    }

    const handleEdit = (requestType: RequestType) => {
        setSelectedRequestType(requestType)
        setShowFormModal(true)
    }

    const handleToggleStatus = (id: string) => {
        setRequestTypes(rt => rt.map(item =>
            item.id === id
                ? { ...item, status: item.status === "active" ? "inactive" : "active" }
                : item
        ))
    }

    const handleDelete = (id: string) => {
        if (window.confirm("¿Está seguro de eliminar este tipo de solicitud?")) {
            setRequestTypes(rt => rt.filter(item => item.id !== id))
        }
    }

    const handleSave = (data: Omit<RequestType, "id" | "createdAt">) => {
        if (selectedRequestType) {
            // Editar
            setRequestTypes(rt => rt.map(item =>
                item.id === selectedRequestType.id
                    ? { ...item, ...data }
                    : item
            ))
        } else {
            // Crear nuevo
            const newItem: RequestType = {
                id: `rt_${Date.now()}`,
                ...data,
                createdAt: new Date().toISOString().split('T')[0],
            }
            setRequestTypes([newItem, ...requestTypes])
        }
        setShowFormModal(false)
        setSelectedRequestType(null)
    }

    const getPriorityBadge = (priority: string) => {
        const styles = {
            high: "bg-red-100 text-red-700 border-red-200",
            medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
            low: "bg-green-100 text-green-700 border-green-200",
        }
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority as keyof typeof styles]}`}>
                {priority === "high" ? "🔴 Alta" : priority === "medium" ? "🟡 Media" : "🟢 Baja"}
            </span>
        )
    }

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            "Legal": "text-blue-600 bg-blue-50",
            "Ciudadana": "text-green-600 bg-green-50",
            "Administrativa": "text-purple-600 bg-purple-50",
            "Técnica": "text-orange-600 bg-orange-50",
        }
        return colors[category] || "text-gray-600 bg-gray-50"
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Tipos de Solicitud</h1>
                        <p className="text-gray-600">Configura los tipos de solicitudes procesadas en el sistema</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <span>+</span>
                        Nuevo tipo
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
                            <input
                                type="text"
                                placeholder="Nombre o descripción..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="all">Todas las categorías</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Prioridad</label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="all">Todas las prioridades</option>
                                <option value="high">Alta</option>
                                <option value="medium">Media</option>
                                <option value="low">Baja</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="active">Activos</option>
                                <option value="inactive">Inactivos</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredRequestTypes.map(rt => (
                    <div key={rt.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{rt.name}</h3>
                                        {rt.status === "inactive" && (
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                                Inactivo
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        {getPriorityBadge(rt.priority)}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(rt.category)}`}>
                                            {rt.category}
                                        </span>
                                        <span className="text-xs text-gray-500">Creado: {rt.createdAt}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleEdit(rt)}
                                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">{rt.description}</p>
                            </div>

                            {/* Details */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-700">Tiempo de respuesta:</span>
                                    <span className="text-sm font-bold text-gray-900">{rt.defaultResponseTime} días</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-700">Referencia legal:</span>
                                    <p className="text-sm text-gray-600">{rt.legalReference}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleToggleStatus(rt.id)}
                                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${rt.status === "active"
                                        ? "text-yellow-600 hover:bg-yellow-50"
                                        : "text-green-600 hover:bg-green-50"
                                        }`}
                                >
                                    {rt.status === "active" ? "Desactivar" : "Activar"}
                                </button>
                                <button
                                    onClick={() => handleDelete(rt.id)}
                                    className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRequestTypes.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron tipos de solicitud</h3>
                    <p className="text-gray-500 mb-4">Intenta cambiar los filtros de búsqueda</p>
                    <button
                        onClick={() => {
                            setSearchTerm("")
                            setCategoryFilter("all")
                            setPriorityFilter("all")
                            setStatusFilter("all")
                        }}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Total tipos</p>
                    <p className="text-2xl font-bold text-gray-900">{requestTypes.length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Alta prioridad</p>
                    <p className="text-2xl font-bold text-red-600">{requestTypes.filter(rt => rt.priority === "high").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Tiempo promedio</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {Math.round(requestTypes.reduce((acc, rt) => acc + rt.defaultResponseTime, 0) / requestTypes.length)} días
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Categorías</p>
                    <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
                </div>
            </div>

            {/* Form Modal */}
            {showFormModal && (
                <RequestTypeFormModal
                    requestType={selectedRequestType}
                    onClose={() => {
                        setShowFormModal(false)
                        setSelectedRequestType(null)
                    }}
                    onSave={handleSave}
                    categories={categories}
                />
            )}
        </div>
    )
}