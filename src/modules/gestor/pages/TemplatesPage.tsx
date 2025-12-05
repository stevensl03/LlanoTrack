"use client"

import { useState } from "react"

interface Template {
    id: string
    name: string
    description: string
    category: string
    requestType: string[]
    entityType: string[]
    fileUrl: string
    lastModified: string
    createdBy: string
    downloadCount: number
}

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([
        {
            id: "1",
            name: "Respuesta_Acceso_Informacion.docx",
            description: "Plantilla estándar para respuestas de acceso a información pública",
            category: "Legal",
            requestType: ["Acceso a Información Pública"],
            entityType: ["Entidades Públicas", "Alcaldías", "Gobernaciones"],
            fileUrl: "#",
            lastModified: "2024-01-10",
            createdBy: "Departamento Legal",
            downloadCount: 45,
        },
        {
            id: "2",
            name: "Respuesta_PQR_Formal.docx",
            description: "Formato formal para respuestas de Peticiones, Quejas y Reclamos",
            category: "Ciudadana",
            requestType: ["Petición, Queja o Reclamo"],
            entityType: ["Todas las entidades"],
            fileUrl: "#",
            lastModified: "2024-01-12",
            createdBy: "Área de Comunicaciones",
            downloadCount: 32,
        },
        {
            id: "3",
            name: "Oficio_Respuesta_Legal.docx",
            description: "Plantilla para oficios de respuesta de carácter legal",
            category: "Legal",
            requestType: ["Requerimiento Legal", "Solicitud Especial"],
            entityType: ["Entidades Judiciales", "Contraloría", "Procuraduría"],
            fileUrl: "#",
            lastModified: "2024-01-08",
            createdBy: "Departamento Legal",
            downloadCount: 28,
        },
        {
            id: "4",
            name: "Respuesta_Consulta_Tecnica.docx",
            description: "Formato para respuestas técnicas y consultas especializadas",
            category: "Técnica",
            requestType: ["Consulta Técnica"],
            entityType: ["Ministerio TIC", "Entidades Técnicas"],
            fileUrl: "#",
            lastModified: "2024-01-15",
            createdBy: "Área Técnica",
            downloadCount: 19,
        },
        {
            id: "5",
            name: "Notificacion_Auditoria.docx",
            description: "Plantilla para notificaciones de auditoría y control",
            category: "Administrativa",
            requestType: ["Notificación de Auditoría"],
            entityType: ["Contraloría", "Auditoría Interna"],
            fileUrl: "#",
            lastModified: "2024-01-05",
            createdBy: "Área de Control Interno",
            downloadCount: 23,
        },
        {
            id: "6",
            name: "Respuesta_Ampliacion_Plazo.docx",
            description: "Formato para solicitudes de ampliación de plazo",
            category: "Administrativa",
            requestType: ["Solicitud Especial"],
            entityType: ["Todas las entidades"],
            fileUrl: "#",
            lastModified: "2024-01-18",
            createdBy: "Área Administrativa",
            downloadCount: 15,
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [uploading, setUploading] = useState(false)

    const categories = [...new Set(templates.map(t => t.category))]

    const filteredTemplates = templates.filter(template => {
        const matchesSearch =
            searchTerm === "" ||
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = categoryFilter === "all" || template.category === categoryFilter

        return matchesSearch && matchesCategory
    })

    const handleDownload = (templateId: string) => {
        const template = templates.find(t => t.id === templateId)
        if (template) {
            setTemplates(templates.map(t =>
                t.id === templateId ? { ...t, downloadCount: t.downloadCount + 1 } : t
            ))
            alert(`Descargando: ${template.name}`)
        }
    }

    const handleUploadTemplate = () => {
        setUploading(true)
        // Simulate upload
        setTimeout(() => {
            const newTemplate: Template = {
                id: `template_${Date.now()}`,
                name: "Nueva_Plantilla.docx",
                description: "Plantilla recién cargada",
                category: "General",
                requestType: ["General"],
                entityType: ["Todas las entidades"],
                fileUrl: "#",
                lastModified: new Date().toISOString().split('T')[0],
                createdBy: "Jaime Tiuso",
                downloadCount: 0,
            }
            setTemplates([newTemplate, ...templates])
            setUploading(false)
        }, 1000)
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 Plantillas de documentos</h1>
                        <p className="text-gray-600">Plantillas oficiales para redacción de respuestas</p>
                    </div>
                    <button
                        onClick={handleUploadTemplate}
                        disabled={uploading}
                        className="px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <span>📤</span>
                                Subir plantilla
                            </>
                        )}
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar plantilla</label>
                            <input
                                type="text"
                                placeholder="Nombre o descripción..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">Todas las categorías</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de solicitud</label>
                            <select
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option>Todos los tipos</option>
                                <option>Acceso a Información Pública</option>
                                <option>Petición, Queja o Reclamo</option>
                                <option>Requerimiento Legal</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredTemplates.map(template => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 text-xl">📄</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 truncate">{template.name}</h3>
                                            <p className="text-xs text-gray-500">Modificado: {template.lastModified}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                            {template.category}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            📥 {template.downloadCount} descargas
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">{template.description}</p>
                            </div>

                            {/* Tags */}
                            <div className="space-y-2 mb-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-700 mb-1">Tipos de solicitud:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {template.requestType.map(type => (
                                            <span key={type} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-700 mb-1">Entidades aplicables:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {template.entityType.map(entity => (
                                            <span key={entity} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                                {entity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500">Creado por:</p>
                                    <p className="text-sm font-medium text-gray-900">{template.createdBy}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDownload(template.id)}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                    >
                                        <span>⬇</span>
                                        Descargar
                                    </button>
                                    <button className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors">
                                        Vista previa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">📄</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron plantillas</h3>
                    <p className="text-gray-500 mb-4">Intenta cambiar los filtros de búsqueda</p>
                    <button
                        onClick={() => {
                            setSearchTerm("")
                            setCategoryFilter("all")
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Categories Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Resumen por categoría</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map(category => {
                        const count = templates.filter(t => t.category === category).length
                        const downloads = templates.filter(t => t.category === category)
                            .reduce((acc, t) => acc + t.downloadCount, 0)

                        return (
                            <div key={category} className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-900">{category}</span>
                                    <span className="text-lg font-bold text-blue-600">{count}</span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {downloads} descargas totales
                                </p>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${(count / templates.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Upload Instructions */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">ℹ️ Instrucciones para uso de plantillas</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Descargue la plantilla correspondiente al tipo de solicitud</li>
                    <li>• Complete los campos marcados entre corchetes [ ]</li>
                    <li>• Mantenga el formato oficial y las firmas digitales</li>
                    <li>• Guarde el documento con el formato: Respuesta_[Radicado]_[Fecha]</li>
                    <li>• Suba el documento finalizado al sistema para continuar el flujo</li>
                </ul>
            </div>
        </div>
    )
}