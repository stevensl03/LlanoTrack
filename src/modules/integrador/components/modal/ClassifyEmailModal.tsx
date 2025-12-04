"use client"

import type React from "react"
import { useState } from "react"

interface Email {
  id: string
  from: string
  subject: string
  body: string
  receivedAt: string
  entity: string
  attachments: number
  urgency: "high" | "medium" | "low"
  hasAttachment: boolean
}

interface ClassifyEmailModalProps {
  email: Email
  onClose: () => void
  onBack: () => void
}

export default function ClassifyEmailModal({ email, onClose, onBack }: ClassifyEmailModalProps) {
  const [formData, setFormData] = useState({
    entity: "",
    requestType: "",
    responseDeadline: "",
    urgency: "medium",
    radicadoNumber: "",
    area: "",
    manager: "",
  })

  const entities = [
    "Alcaldía Municipal",
    "Gobernación",
    "Secretaría Departamental",
    "Defensoría del Pueblo",
    "Procuraduría",
    "Contraloría",
  ]

  const requestTypes = [
    "Acceso a Información Pública",
    "Petición, Queja o Reclamo (PQR)",
    "Derecho de Petición",
    "Solicitud Especial",
    "Requerimiento Legal",
  ]

  const areas = [
    "Gestión Administrativa",
    "Gestión Financiera",
    "Gestión Técnica",
    "Gestión Ambiental",
    "Gestión Social",
  ]

  const managers: Record<string, string[]> = {
    "Gestión Administrativa": ["María García", "Carlos López"],
    "Gestión Financiera": ["Ana Martínez", "Roberto Díaz"],
    "Gestión Técnica": ["Pedro Sánchez", "Laura Ruiz"],
    "Gestión Ambiental": ["Jorge Morales", "Isabel Torres"],
    "Gestión Social": ["Fernando Acosta", "Diana Romero"],
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "area" && { manager: "" }),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { email, formData })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay sutil con blur */}
      <div
        className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 animate-fadeIn">
        {/* Header con gradiente */}
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 rounded-t-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏷️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Clasificar correo</h2>
                  <p className="text-emerald-100 text-sm truncate mt-1">
                    Asunto: {email.subject}
                  </p>
                </div>
              </div>

              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-emerald-100 hover:text-white text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al detalle
              </button>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-8">
              {/* Sección 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">1️⃣</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Información del correo</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Entidad remitente <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="entity"
                      value={formData.entity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="text-gray-400">Selecciona una entidad</option>
                      {entities.map((entity) => (
                        <option key={entity} value={entity} className="text-gray-700">
                          {entity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Tipo de solicitud <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="text-gray-400">Selecciona un tipo</option>
                      {requestTypes.map((type) => (
                        <option key={type} value={type} className="text-gray-700">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600">2️⃣</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Plazo y urgencia</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Plazo máximo de respuesta (días) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="responseDeadline"
                        value={formData.responseDeadline}
                        onChange={handleChange}
                        required
                        min="1"
                        max="90"
                        placeholder="Ej: 10"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        📅
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Nivel de urgencia
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="low" className="text-green-600">🟢 Baja</option>
                      <option value="medium" className="text-yellow-600">🟡 Media</option>
                      <option value="high" className="text-red-600">🔴 Alta</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">3️⃣</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Radicado (Opcional)</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Número de radicado AZ Digital
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="radicadoNumber"
                      value={formData.radicadoNumber}
                      onChange={handleChange}
                      placeholder="Ej: AZ2024-001234"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔢
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Déjalo en blanco si aún no se ha generado el radicado
                  </p>
                </div>
              </div>

              {/* Sección 4 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600">4️⃣</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Asignación al gestor</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Área/Proceso <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="text-gray-400">Selecciona un área</option>
                      {areas.map((area) => (
                        <option key={area} value={area} className="text-gray-700">
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Gestor responsable <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="manager"
                      value={formData.manager}
                      onChange={handleChange}
                      required
                      disabled={!formData.area}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" className="text-gray-400">
                        {formData.area ? "Selecciona un gestor" : "Primero selecciona un área"}
                      </option>
                      {formData.area &&
                        managers[formData.area as keyof typeof managers]?.map((manager) => (
                          <option key={manager} value={manager} className="text-gray-700">
                            👤 {manager}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-500">📊</span>
                  Resumen de clasificación
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Entidad</p>
                    <p className={`text-sm font-semibold ${formData.entity ? "text-gray-900" : "text-gray-400"}`}>
                      {formData.entity || "No asignada"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Tipo</p>
                    <p className={`text-sm font-semibold ${formData.requestType ? "text-gray-900" : "text-gray-400"}`}>
                      {formData.requestType || "No asignado"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Plazo</p>
                    <p className={`text-sm font-semibold ${formData.responseDeadline ? "text-gray-900" : "text-gray-400"}`}>
                      {formData.responseDeadline ? `${formData.responseDeadline} días` : "No asignado"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Gestor</p>
                    <p className={`text-sm font-semibold ${formData.manager ? "text-gray-900" : "text-gray-400"}`}>
                      {formData.manager || "No asignado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                ✕ Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl shadow-green-100 hover:shadow-green-200 flex items-center justify-center gap-2"
              >
                <span>💾</span>
                Guardar y asignar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}