"use client"

import type React from "react"
import { useState, useEffect } from "react"

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

interface RequestTypeFormModalProps {
    requestType: RequestType | null
    onClose: () => void
    onSave: (data: Omit<RequestType, "id" | "createdAt">) => void
    categories: string[]
}

const defaultCategories = [
    "Legal",
    "Ciudadana",
    "Administrativa",
    "Técnica",
    "Financiera",
    "Ambiental",
    "Social",
    "Otro"
]

export default function RequestTypeFormModal({ requestType, onClose, onSave, categories: propCategories }: RequestTypeFormModalProps) {
    const categories = propCategories.length > 0 ? propCategories : defaultCategories

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        defaultResponseTime: 15,
        legalReference: "",
        priority: "medium" as "low" | "medium" | "high",
        category: "",
        status: "active" as "active" | "inactive",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [newCategory, setNewCategory] = useState("")
    const [showNewCategory, setShowNewCategory] = useState(false)

    useEffect(() => {
        if (requestType) {
            setFormData({
                name: requestType.name,
                description: requestType.description,
                defaultResponseTime: requestType.defaultResponseTime,
                legalReference: requestType.legalReference,
                priority: requestType.priority,
                category: requestType.category,
                status: requestType.status,
            })
        } else {
            setFormData({
                name: "",
                description: "",
                defaultResponseTime: 15,
                legalReference: "",
                priority: "medium",
                category: categories[0] || "",
                status: "active",
            })
        }
    }, [requestType, categories])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "El nombre del tipo de solicitud es requerido"
        }

        if (!formData.description.trim()) {
            newErrors.description = "La descripción es requerida"
        }

        if (formData.defaultResponseTime < 1 || formData.defaultResponseTime > 365) {
            newErrors.defaultResponseTime = "El tiempo de respuesta debe estar entre 1 y 365 días"
        }

        if (!formData.legalReference.trim()) {
            newErrors.legalReference = "La referencia legal es requerida"
        }

        if (!formData.category) {
            newErrors.category = "Debe seleccionar o crear una categoría"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSave(formData)
        }
    }

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            setFormData(prev => ({ ...prev, category: newCategory.trim() }))
            setNewCategory("")
            setShowNewCategory(false)
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-700 border-red-200"
            case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200"
            case "low": return "bg-green-100 text-green-700 border-green-200"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 rounded-t-2xl p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {requestType ? "Editar tipo de solicitud" : "Crear nuevo tipo de solicitud"}
                            </h2>
                            <p className="text-orange-100 mt-1">
                                {requestType ? "Actualiza la información del tipo de solicitud" : "Complete todos los campos para crear un nuevo tipo de solicitud"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Nombre del tipo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                    placeholder="Ej: Acceso a Información Pública"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Prioridad <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: "low" })}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${formData.priority === "low"
                                            ? "bg-green-100 text-green-700 border-2 border-green-300"
                                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <span>🟢</span> Baja
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: "medium" })}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${formData.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <span>🟡</span> Media
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: "high" })}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${formData.priority === "high"
                                            ? "bg-red-100 text-red-700 border-2 border-red-300"
                                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <span>🔴</span> Alta
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Descripción <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className={`w-full px-4 py-3 border ${errors.description ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
                                placeholder="Describe el propósito y características de este tipo de solicitud..."
                            />
                            {errors.description && (
                                <p className="text-xs text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Response Time and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Tiempo de respuesta (días) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.defaultResponseTime}
                                        onChange={(e) => setFormData({ ...formData, defaultResponseTime: parseInt(e.target.value) || 0 })}
                                        min="1"
                                        max="365"
                                        className={`w-full px-4 py-3 border ${errors.defaultResponseTime ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        ⏱️
                                    </span>
                                </div>
                                {errors.defaultResponseTime && (
                                    <p className="text-xs text-red-600">{errors.defaultResponseTime}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Tiempo máximo legal para responder esta solicitud
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Categoría <span className="text-red-500">*</span>
                                </label>
                                {!showNewCategory ? (
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className={`flex-1 px-4 py-3 border ${errors.category ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => setShowNewCategory(true)}
                                            className="px-4 py-3 border border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                                        >
                                            Nueva
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="flex-1 px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Nombre de nueva categoría"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddCategory}
                                            className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors"
                                        >
                                            Agregar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowNewCategory(false)}
                                            className="px-4 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                                {errors.category && (
                                    <p className="text-xs text-red-600">{errors.category}</p>
                                )}
                            </div>
                        </div>

                        {/* Legal Reference */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Referencia legal <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.legalReference}
                                    onChange={(e) => setFormData({ ...formData, legalReference: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.legalReference ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                    placeholder="Ej: Ley 1712 de 2014, Artículo 14"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    ⚖️
                                </span>
                            </div>
                            {errors.legalReference && (
                                <p className="text-xs text-red-600">{errors.legalReference}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Estado</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={formData.status === "active"}
                                        onChange={() => setFormData({ ...formData, status: "active" })}
                                        className="text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-sm text-gray-700">Activo</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={formData.status === "inactive"}
                                        onChange={() => setFormData({ ...formData, status: "inactive" })}
                                        className="text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-sm text-gray-700">Inactivo</span>
                                </label>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Resumen</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Nombre</p>
                                    <p className="text-gray-900 font-semibold truncate">{formData.name || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Prioridad</p>
                                    <p className="text-gray-900 font-semibold">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(formData.priority)}`}>
                                            {formData.priority === "high" ? "Alta" : formData.priority === "medium" ? "Media" : "Baja"}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Tiempo</p>
                                    <p className="text-gray-900 font-semibold">{formData.defaultResponseTime} días</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Categoría</p>
                                    <p className="text-gray-900 font-semibold">{formData.category || "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-5 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {requestType ? "💾 Guardar cambios" : "📋 Crear tipo de solicitud"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}