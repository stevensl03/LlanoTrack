"use client"

import { useState } from "react"

interface EmailDetail {
  id: string
  radicadoNumber: string
  subject: string
  entity: string
  requestType: string
  responseDocument?: {
    id: string
    name: string
    status: string
  }
}

interface Reviewer {
  id: string
  name: string
  role: string
  email: string
  area: string
}

interface ReviewModalProps {
  email: EmailDetail
  onClose: () => void
  onSendToReview: (selectedReviewers: Reviewer[], notes: string) => void
}

export default function ReviewModal({ email, onClose, onSendToReview }: ReviewModalProps) {
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [priority, setPriority] = useState<"normal" | "urgent">("normal")
  const [deadlineDays, setDeadlineDays] = useState(3)

  const reviewers: Reviewer[] = [
    {
      id: "1",
      name: "María González",
      role: "Revisor Legal",
      email: "maria.gonzalez@azdigital.gov.co",
      area: "Área Legal"
    },
    {
      id: "2",
      name: "Carlos Ramírez",
      role: "Revisor Técnico",
      email: "carlos.ramirez@azdigital.gov.co",
      area: "Área Técnica"
    },
    {
      id: "3",
      name: "Ana Martínez",
      role: "Revisor de Contenido",
      email: "ana.martinez@azdigital.gov.co",
      area: "Comunicaciones"
    },
    {
      id: "4",
      name: "Pedro Sánchez",
      role: "Revisor Administrativo",
      email: "pedro.sanchez@azdigital.gov.co",
      area: "Administración"
    },
    {
      id: "5",
      name: "Laura Ruiz",
      role: "Revisor Financiero",
      email: "laura.ruiz@azdigital.gov.co",
      area: "Finanzas"
    }
  ]

  const toggleReviewer = (reviewerId: string) => {
    setSelectedReviewers(prev =>
      prev.includes(reviewerId)
        ? prev.filter(id => id !== reviewerId)
        : [...prev, reviewerId]
    )
  }

  const handleSubmit = () => {
    if (selectedReviewers.length === 0) {
      alert("Debe seleccionar al menos un revisor")
      return
    }

    const selectedReviewersData = reviewers.filter(r => selectedReviewers.includes(r.id))
    onSendToReview(selectedReviewersData, notes)
  }

  const getSelectedReviewersCount = () => {
    return selectedReviewers.length
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
              <h2 className="text-2xl font-bold">🔍 Enviar a Revisión</h2>
              <p className="text-purple-100 mt-1">
                {email.subject} • {email.radicadoNumber}
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

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Document Info */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📄</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Documento a revisar
                  </p>
                  <p className="text-sm text-gray-600">
                    {email.responseDocument?.name || "Sin documento"}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviewers Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Seleccionar revisores</h3>
                  <p className="text-sm text-gray-600">
                    Selecciona al menos un revisor ({getSelectedReviewersCount()} seleccionados)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedReviewers(reviewers.map(r => r.id))}
                    className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    Seleccionar todos
                  </button>
                  <button
                    onClick={() => setSelectedReviewers([])}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Limpiar
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {reviewers.map((reviewer) => (
                  <div
                    key={reviewer.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedReviewers.includes(reviewer.id)
                        ? "border-purple-300 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleReviewer(reviewer.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedReviewers.includes(reviewer.id)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200"
                      }`}>
                        {selectedReviewers.includes(reviewer.id) ? "✓" : ""}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-gray-900">{reviewer.name}</h4>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {reviewer.area}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{reviewer.role}</p>
                        <p className="text-xs text-gray-500">{reviewer.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Configuración de la revisión</h3>
              
              {/* Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Prioridad</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPriority("normal")}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        priority === "normal"
                          ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                          : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>📄</span>
                        Normal
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority("urgent")}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        priority === "urgent"
                          ? "bg-red-100 text-red-700 border-2 border-red-300"
                          : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>⚠️</span>
                        Urgente
                      </div>
                    </button>
                  </div>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Plazo de revisión</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={deadlineDays}
                      onChange={(e) => setDeadlineDays(parseInt(e.target.value) || 1)}
                      min="1"
                      max="30"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ⏱️
                    </span>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      días
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Instrucciones para los revisores (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Agregar observaciones específicas, puntos a revisar, o consideraciones especiales..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Resumen del envío</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Documento</p>
                  <p className="text-gray-900 font-semibold truncate">
                    {email.responseDocument?.name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Revisores seleccionados</p>
                  <p className="text-gray-900 font-semibold">{getSelectedReviewersCount()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Prioridad</p>
                  <p className="text-gray-900 font-semibold">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      priority === "urgent" 
                        ? "bg-red-100 text-red-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {priority === "urgent" ? "Urgente" : "Normal"}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Plazo máximo</p>
                  <p className="text-gray-900 font-semibold">{deadlineDays} días</p>
                </div>
              </div>
              
              {selectedReviewers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Revisores seleccionados:</p>
                  <div className="flex flex-wrap gap-2">
                    {reviewers
                      .filter(r => selectedReviewers.includes(r.id))
                      .map(reviewer => (
                        <span key={reviewer.id} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {reviewer.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={selectedReviewers.length === 0}
            className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all duration-200"
          >
            📤 Enviar a revisión
          </button>
        </div>
      </div>
    </div>
  )
}