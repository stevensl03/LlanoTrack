"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface User {
    id: string
    name: string
    email: string
    employeeId: string
    process: string
    role: string[]
    status: "active" | "inactive"
    createdAt: string
}

interface UserFormModalProps {
    user: User | null
    onClose: () => void
    onSave: (userData: Omit<User, "id" | "createdAt">) => void
    roles: string[]
}

const processes = [
    "Gestión Administrativa",
    "Gestión Financiera",
    "Gestión Técnica",
    "Gestión Ambiental",
    "Gestión Social",
    "Auditoría Interna",
    "Seguimiento",
    "Dirección General",
]

export default function UserFormModal({ user, onClose, onSave, roles }: UserFormModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        employeeId: "",
        process: "",
        role: [] as string[],
        status: "active" as "active" | "inactive",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                employeeId: user.employeeId,
                process: user.process,
                role: user.role,
                status: user.status,
            })
        }
    }, [user])

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email) && email.endsWith("@azdigital.gov.co")
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es requerido"
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido"
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Debe ser un email empresarial válido (@azdigital.gov.co)"
        }

        if (!formData.employeeId.trim()) {
            newErrors.employeeId = "El ID de colaborador es requerido"
        }

        if (!formData.process) {
            newErrors.process = "Debe seleccionar un proceso/área"
        }

        if (formData.role.length === 0) {
            newErrors.role = "Debe asignar al menos un rol"
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

    const handleRoleToggle = (role: string) => {
        setFormData(prev => ({
            ...prev,
            role: prev.role.includes(role)
                ? prev.role.filter(r => r !== role)
                : [...prev.role, role]
        }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {user ? "Editar usuario" : "Crear nuevo usuario"}
                            </h2>
                            <p className="text-blue-100 mt-1">
                                {user ? "Actualiza la información del usuario" : "Complete todos los campos para crear un nuevo usuario"}
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
                                    Nombre completo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Ej: María García López"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Gmail empresarial <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-4 py-3 border ${errors.email ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="nombre@azdigital.gov.co"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        @azdigital.gov.co
                                    </span>
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-600">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Employee Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    ID de colaborador <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.employeeId ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Ej: AZ00123"
                                />
                                {errors.employeeId && (
                                    <p className="text-xs text-red-600">{errors.employeeId}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Proceso/Área/Cargo <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.process}
                                    onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                                    className={`w-full px-4 py-3 border ${errors.process ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                >
                                    <option value="">Selecciona un proceso</option>
                                    {processes.map(process => (
                                        <option key={process} value={process}>{process}</option>
                                    ))}
                                </select>
                                {errors.process && (
                                    <p className="text-xs text-red-600">{errors.process}</p>
                                )}
                            </div>
                        </div>

                        {/* Roles Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Rol(es) asignado(s) <span className="text-red-500">*</span>
                                {errors.role && (
                                    <span className="text-red-600 text-sm ml-2">{errors.role}</span>
                                )}
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {roles.map(role => {
                                    const isSelected = formData.role.includes(role)
                                    const roleColors: Record<string, string> = {
                                        "Integrador": "border-blue-300",
                                        "Gestor": "border-green-300",
                                        "Revisor": "border-yellow-300",
                                        "Aprobador": "border-purple-300",
                                        "Auditor": "border-red-300",
                                        "Seguimiento": "border-indigo-300",
                                    }

                                    return (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleRoleToggle(role)}
                                            className={`p-3 border-2 rounded-xl text-sm font-medium transition-all duration-200 ${isSelected
                                                    ? `bg-blue-50 ${roleColors[role]} text-blue-700 shadow-sm`
                                                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? "bg-blue-100" : "bg-gray-100"
                                                    }`}>
                                                    <span className={isSelected ? "text-blue-600" : "text-gray-400"}>
                                                        {isSelected ? "✓" : "+"}
                                                    </span>
                                                </div>
                                                {role}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Puede seleccionar múltiples roles para un usuario
                            </p>
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
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Activo</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={formData.status === "inactive"}
                                        onChange={() => setFormData({ ...formData, status: "inactive" })}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Inactivo</span>
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
                                    <p className="text-gray-900 font-semibold truncate">{formData.email || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Proceso</p>
                                    <p className="text-gray-900 font-semibold">{formData.process || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Roles</p>
                                    <p className="text-gray-900 font-semibold">
                                        {formData.role.length > 0 ? formData.role.join(", ") : "-"}
                                    </p>
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
                            className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {user ? "💾 Guardar cambios" : "👤 Crear usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}