"use client"

import type React from "react"
import { useState, useEffect } from "react"

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

interface EntityFormModalProps {
    entity: Entity | null
    onClose: () => void
    onSave: (entityData: Omit<Entity, "id" | "createdAt">) => void
}

const managers = [
    "María García",
    "Carlos Rodríguez",
    "Ana Martínez",
    "Juan Pérez",
    "Laura Ruiz",
    "Pedro Sánchez",
    "Fernando Acosta",
    "Diana Romero"
]

export default function EntityFormModal({ entity, onClose, onSave }: EntityFormModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        domains: [""],
        keywords: [""],
        defaultManager: "",
        contactEmail: "",
        status: "active" as "active" | "inactive",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (entity) {
            setFormData({
                name: entity.name,
                domains: entity.domains,
                keywords: entity.keywords,
                defaultManager: entity.defaultManager,
                contactEmail: entity.contactEmail,
                status: entity.status,
            })
        } else {
            // Initialize with empty arrays for new entity
            setFormData({
                name: "",
                domains: [""],
                keywords: [""],
                defaultManager: "",
                contactEmail: "",
                status: "active",
            })
        }
    }, [entity])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "El nombre de la entidad es requerido"
        }

        if (formData.domains.length === 0 || formData.domains.every(d => !d.trim())) {
            newErrors.domains = "Debe agregar al menos un dominio"
        } else {
            const invalidDomains = formData.domains
                .filter(d => d.trim())
                .filter(d => !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(d))

            if (invalidDomains.length > 0) {
                newErrors.domains = "Algunos dominios no son válidos"
            }
        }

        if (!formData.contactEmail.trim()) {
            newErrors.contactEmail = "El email de contacto es requerido"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = "El email no es válido"
        }

        if (!formData.defaultManager) {
            newErrors.defaultManager = "Debe seleccionar un gestor predeterminado"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            // Filter out empty values before saving
            const filteredData = {
                ...formData,
                domains: formData.domains.filter(d => d.trim()),
                keywords: formData.keywords.filter(k => k.trim()),
            }
            onSave(filteredData)
        }
    }

    const handleAddDomain = () => {
        setFormData(prev => ({
            ...prev,
            domains: [...prev.domains, ""]
        }))
    }

    const handleDomainChange = (index: number, value: string) => {
        const newDomains = [...formData.domains]
        newDomains[index] = value
        setFormData(prev => ({ ...prev, domains: newDomains }))
    }

    const handleRemoveDomain = (index: number) => {
        if (formData.domains.length > 1) {
            const newDomains = formData.domains.filter((_, i) => i !== index)
            setFormData(prev => ({ ...prev, domains: newDomains }))
        }
    }

    const handleAddKeyword = () => {
        setFormData(prev => ({
            ...prev,
            keywords: [...prev.keywords, ""]
        }))
    }

    const handleKeywordChange = (index: number, value: string) => {
        const newKeywords = [...formData.keywords]
        newKeywords[index] = value
        setFormData(prev => ({ ...prev, keywords: newKeywords }))
    }

    const handleRemoveKeyword = (index: number) => {
        if (formData.keywords.length > 1) {
            const newKeywords = formData.keywords.filter((_, i) => i !== index)
            setFormData(prev => ({ ...prev, keywords: newKeywords }))
        } else {
            // If only one keyword left, just clear it
            const newKeywords = [""]
            setFormData(prev => ({ ...prev, keywords: newKeywords }))
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
                <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-2xl p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {entity ? "Editar entidad" : "Crear nueva entidad"}
                            </h2>
                            <p className="text-purple-100 mt-1">
                                {entity ? "Actualiza la información de la entidad" : "Complete todos los campos para crear una nueva entidad"}
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
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Nombre de la entidad <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="Ej: Alcaldía Municipal de Medellín"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Email de contacto <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.contactEmail ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="Ej: contacto@entidad.gov.co"
                                />
                                {errors.contactEmail && (
                                    <p className="text-xs text-red-600">{errors.contactEmail}</p>
                                )}
                            </div>
                        </div>

                        {/* Domains */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Dominios de email <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddDomain}
                                    className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                                >
                                    <span>+</span> Agregar dominio
                                </button>
                            </div>
                            {errors.domains && (
                                <p className="text-xs text-red-600">{errors.domains}</p>
                            )}

                            <div className="space-y-2">
                                {formData.domains.map((domain, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={domain}
                                                onChange={(e) => handleDomainChange(index, e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Ej: alcaldia.gov.co"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                🌐
                                            </span>
                                        </div>
                                        {formData.domains.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDomain(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">
                                Agrega los dominios de email utilizados por esta entidad (ej: @alcaldia.gov.co)
                            </p>
                        </div>

                        {/* Keywords */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Palabras clave
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddKeyword}
                                    className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                                >
                                    <span>+</span> Agregar palabra
                                </button>
                            </div>

                            <div className="space-y-2">
                                {formData.keywords.map((keyword, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={keyword}
                                                onChange={(e) => handleKeywordChange(index, e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Ej: municipal, alcalde, ayuntamiento"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                🔑
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyword(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">
                                Palabras relacionadas con la entidad para mejorar la clasificación automática
                            </p>
                        </div>

                        {/* Default Manager */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Gestor predeterminado <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.defaultManager}
                                onChange={(e) => setFormData({ ...formData, defaultManager: e.target.value })}
                                className={`w-full px-4 py-3 border ${errors.defaultManager ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            >
                                <option value="">Selecciona un gestor</option>
                                {managers.map(manager => (
                                    <option key={manager} value={manager}>{manager}</option>
                                ))}
                            </select>
                            {errors.defaultManager && (
                                <p className="text-xs text-red-600">{errors.defaultManager}</p>
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
                                        className="text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-sm text-gray-700">Activa</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={formData.status === "inactive"}
                                        onChange={() => setFormData({ ...formData, status: "inactive" })}
                                        className="text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-sm text-gray-700">Inactiva</span>
                                </label>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Resumen</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Nombre</p>
                                    <p className="text-gray-900 font-semibold truncate">{formData.name || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Email</p>
                                    <p className="text-gray-900 font-semibold truncate">{formData.contactEmail || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Dominios</p>
                                    <p className="text-gray-900 font-semibold">
                                        {formData.domains.filter(d => d.trim()).length || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Gestor</p>
                                    <p className="text-gray-900 font-semibold">{formData.defaultManager || "-"}</p>
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
                            className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {entity ? "💾 Guardar cambios" : "🏛️ Crear entidad"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}