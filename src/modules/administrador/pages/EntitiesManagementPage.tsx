"use client"

import { useState } from "react"
import EntityFormModal from "../components/modal/EntityFormModal"

interface Entity {
    id: string
    name: string
    domains: string[]
    keywords: string[]
    defaultManager: string
    contactEmail: string
    status: "active" | "inactive"
    createdAt: string
}

export default function EntitiesManagementPage() {
    const [entities, setEntities] = useState<Entity[]>([
        {
            id: "1",
            name: "Alcaldía Municipal",
            domains: ["alcaldia.gov.co", "municipio.gov.co"],
            keywords: ["municipal", "alcalde", "alcaldía"],
            defaultManager: "María García",
            contactEmail: "contacto@alcaldia.gov.co",
            status: "active",
            createdAt: "2024-01-10",
        },
        {
            id: "2",
            name: "Secretaría Departamental",
            domains: ["secretaria.gov.co", "departamento.gov.co"],
            keywords: ["secretaría", "departamental", "gobernación"],
            defaultManager: "Carlos Rodríguez",
            contactEmail: "secretaria@departamento.gov.co",
            status: "active",
            createdAt: "2024-01-11",
        },
        {
            id: "3",
            name: "Gobernación",
            domains: ["gobernacion.gov.co"],
            keywords: ["gobernador", "gobernación", "departamental"],
            defaultManager: "Ana Martínez",
            contactEmail: "gobernacion@departamento.gov.co",
            status: "active",
            createdAt: "2024-01-12",
        },
        {
            id: "4",
            name: "Defensoría del Pueblo",
            domains: ["defensoria.gov.co"],
            keywords: ["defensoría", "derechos", "pueblo"],
            defaultManager: "Juan Pérez",
            contactEmail: "defensoria@pueblo.gov.co",
            status: "inactive",
            createdAt: "2024-01-13",
        },
        {
            id: "5",
            name: "Contraloría General",
            domains: ["contraloria.gov.co"],
            keywords: ["contraloría", "control", "auditoría"],
            defaultManager: "Laura Ruiz",
            contactEmail: "contraloria@control.gov.co",
            status: "active",
            createdAt: "2024-01-14",
        },
        {
            id: "6",
            name: "Ministerio TIC",
            domains: ["mintic.gov.co", "tic.gov.co"],
            keywords: ["TIC", "tecnología", "información"],
            defaultManager: "Pedro Sánchez",
            contactEmail: "tic@ministerio.gov.co",
            status: "active",
            createdAt: "2024-01-15",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
    const [showEntityForm, setShowEntityForm] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)

    const filteredEntities = entities.filter(entity => {
        const matchesSearch =
            entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entity.domains.some(domain => domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
            entity.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesStatus = statusFilter === "all" || entity.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleCreateEntity = () => {
        setSelectedEntity(null)
        setShowEntityForm(true)
    }

    const handleEditEntity = (entity: Entity) => {
        setSelectedEntity(entity)
        setShowEntityForm(true)
    }

    const handleToggleStatus = (entityId: string) => {
        setEntities(entities.map(entity =>
            entity.id === entityId
                ? { ...entity, status: entity.status === "active" ? "inactive" : "active" }
                : entity
        ))
    }

    const handleDeleteEntity = (entityId: string) => {
        if (window.confirm("¿Está seguro de eliminar esta entidad?")) {
            setEntities(entities.filter(entity => entity.id !== entityId))
        }
    }

    const handleSaveEntity = (entityData: Omit<Entity, "id" | "createdAt">) => {
        if (selectedEntity) {
            // Editar entidad existente
            setEntities(entities.map(entity =>
                entity.id === selectedEntity.id
                    ? { ...entity, ...entityData }
                    : entity
            ))
        } else {
            // Crear nueva entidad
            const newEntity: Entity = {
                id: `entity_${Date.now()}`,
                ...entityData,
                createdAt: new Date().toISOString().split('T')[0],
            }
            setEntities([newEntity, ...entities])
        }
        setShowEntityForm(false)
        setSelectedEntity(null)
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏛️ Gestión de Entidades</h1>
                        <p className="text-gray-600">Administra las entidades remitentes del sistema</p>
                    </div>
                    <button
                        onClick={handleCreateEntity}
                        className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <span>+</span>
                        Nueva entidad
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar entidad</label>
                            <input
                                type="text"
                                placeholder="Nombre, dominio o palabra clave..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="all">Todas las entidades</option>
                                <option value="active">Activas</option>
                                <option value="inactive">Inactivas</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Entities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredEntities.map(entity => (
                    <div key={entity.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{entity.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        {entity.status === "active" ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                <span>●</span> Activa
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                <span>●</span> Inactiva
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">Creada: {entity.createdAt}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleEditEntity(entity)}
                                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Domains */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Dominios</p>
                                <div className="flex flex-wrap gap-2">
                                    {entity.domains.map(domain => (
                                        <span key={domain} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                            {domain}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Keywords */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Palabras clave</p>
                                <div className="flex flex-wrap gap-2">
                                    {entity.keywords.map(keyword => (
                                        <span key={keyword} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Gestor predeterminado</p>
                                    <p className="text-sm text-gray-600">{entity.defaultManager}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Email de contacto</p>
                                    <p className="text-sm text-gray-600 truncate">{entity.contactEmail}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleToggleStatus(entity.id)}
                                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${entity.status === "active"
                                        ? "text-yellow-600 hover:bg-yellow-50"
                                        : "text-green-600 hover:bg-green-50"
                                        }`}
                                >
                                    {entity.status === "active" ? "Desactivar" : "Activar"}
                                </button>
                                <button
                                    onClick={() => handleDeleteEntity(entity.id)}
                                    className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredEntities.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🏛️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron entidades</h3>
                    <p className="text-gray-500 mb-4">Intenta cambiar los filtros de búsqueda</p>
                    <button
                        onClick={() => {
                            setSearchTerm("")
                            setStatusFilter("all")
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Total entidades</p>
                    <p className="text-2xl font-bold text-gray-900">{entities.length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Activas</p>
                    <p className="text-2xl font-bold text-green-600">{entities.filter(e => e.status === "active").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Inactivas</p>
                    <p className="text-2xl font-bold text-red-600">{entities.filter(e => e.status === "inactive").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Dominios únicos</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {new Set(entities.flatMap(e => e.domains)).size}
                    </p>
                </div>
            </div>

            {/* Entity Form Modal */}
            {showEntityForm && (
                <EntityFormModal
                    entity={selectedEntity}
                    onClose={() => {
                        setShowEntityForm(false)
                        setSelectedEntity(null)
                    }}
                    onSave={handleSaveEntity}
                />
            )}
        </div>
    )
}