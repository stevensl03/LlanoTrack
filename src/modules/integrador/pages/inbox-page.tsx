"use client"

import { useState } from "react"
import { useNavigate } from "react-router"
import EmailDetailModal from "../components/modal/EmailDetailModal"
import ClassifyEmailModal from "../components/modal/ClassifyEmailModal"

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

const mockEmails: Email[] = [
  {
    id: "1",
    from: "solicitudes@alcaldia.gov.co",
    subject: "Solicitud de información - Decreto 2471 de 2021",
    body: "Se requiere información detallada sobre la implementación del decreto mencionado para el próximo informe trimestral...",
    receivedAt: "2024-01-15T10:30:00",
    entity: "Alcaldía Municipal",
    attachments: 3,
    urgency: "high",
    hasAttachment: true,
  },
  {
    id: "2",
    from: "tramites@secretaria.gov.co",
    subject: "Radicación de petición PQR #45892",
    body: "Se adjunta petición ciudadana para revisión y respuesta dentro de los plazos establecidos por la ley...",
    receivedAt: "2024-01-15T09:15:00",
    entity: "Secretaría Departamental",
    attachments: 1,
    urgency: "medium",
    hasAttachment: true,
  },
  {
    id: "3",
    from: "info@gobernacion.gov.co",
    subject: "Solicitud de ampliación de plazo - Proyecto 458",
    body: "Solicita ampliación de 5 días hábiles para la entrega de respuesta completa al ciudadano solicitante...",
    receivedAt: "2024-01-14T16:45:00",
    entity: "Gobernación",
    attachments: 2,
    urgency: "high",
    hasAttachment: true,
  },
  {
    id: "4",
    from: "derechos@defensoria.gov.co",
    subject: "Solicitud de acceso a información pública",
    body: "Solicitud realizada bajo Ley de Transparencia y Acceso a la Información Pública Nacional...",
    receivedAt: "2024-01-14T14:20:00",
    entity: "Defensoría del Pueblo",
    attachments: 0,
    urgency: "medium",
    hasAttachment: false,
  },
  {
    id: "5",
    from: "planeacion@mintic.gov.co",
    subject: "Consulta técnica sobre implementación TIC",
    body: "Consulta relacionada con los requerimientos técnicos para la implementación del sistema de gobierno digital...",
    receivedAt: "2024-01-13T11:10:00",
    entity: "Ministerio TIC",
    attachments: 1,
    urgency: "low",
    hasAttachment: true,
  },
  {
    id: "6",
    from: "contraloria@contraloria.gov.co",
    subject: "Notificación de auditoría programada",
    body: "Notificación formal de la próxima auditoría de cumplimiento programada para el próximo mes...",
    receivedAt: "2024-01-13T09:45:00",
    entity: "Contraloría General",
    attachments: 4,
    urgency: "high",
    hasAttachment: true,
  },
]

export default function InboxPage() {
  const navigate = useNavigate()
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all")
  const [search, setSearch] = useState("")
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showClassifyModal, setShowClassifyModal] = useState(false)

  const filteredEmails = emails.filter(email => {
    const matchesFilter = filter === "all" || email.urgency === filter
    const matchesSearch = search === "" ||
      email.subject.toLowerCase().includes(search.toLowerCase()) ||
      email.from.toLowerCase().includes(search.toLowerCase()) ||
      email.entity.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleViewDetails = (email: Email) => {
    setSelectedEmail(email)
    setShowDetailModal(true)
  }

  const handleClassify = (email: Email) => {
    setSelectedEmail(email)
    setShowClassifyModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedEmail(null)
  }

  const handleCloseClassifyModal = () => {
    setShowClassifyModal(false)
    setSelectedEmail(null)
  }

  const formatTime = (date: string) => {
    const now = new Date()
    const emailDate = new Date(date)
    const diffHours = Math.floor((now.getTime() - emailDate.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Hace pocos minutos"
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return "Ayer"
    return `Hace ${diffDays} días`
  }

  const getUrgencyStats = () => {
    const high = emails.filter(e => e.urgency === "high").length
    const medium = emails.filter(e => e.urgency === "medium").length
    const low = emails.filter(e => e.urgency === "low").length
    return { high, medium, low, total: emails.length }
  }

  const stats = getUrgencyStats()

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📨 Bandeja de Entrada</h1>
              <p className="text-gray-600">
                {stats.total} correos pendientes • {stats.high} urgentes • {stats.medium} medios • {stats.low} bajos
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar correos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full md:w-64 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <button className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Urgentes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.high}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600">⚠️</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Medios</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.medium}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600">⚡</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Bajos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.low}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">📈</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-gray-700 font-medium">Filtrar por urgencia:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${filter === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  }`}
              >
                <span>📋</span>
                Todos ({stats.total})
              </button>
              <button
                onClick={() => setFilter("high")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${filter === "high"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  }`}
              >
                <span className={`${filter === "high" ? "" : "text-red-500"}`}>⚠️</span>
                Urgentes ({stats.high})
              </button>
              <button
                onClick={() => setFilter("medium")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${filter === "medium"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  }`}
              >
                <span className={`${filter === "medium" ? "" : "text-yellow-500"}`}>⚡</span>
                Medios ({stats.medium})
              </button>
              <button
                onClick={() => setFilter("low")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${filter === "low"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  }`}
              >
                <span className={`${filter === "low" ? "" : "text-green-500"}`}>📈</span>
                Bajos ({stats.low})
              </button>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="space-y-4">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 flex items-start gap-4">
                {/* Avatar/Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${email.urgency === "high" ? "bg-red-50 border border-red-200" :
                    email.urgency === "medium" ? "bg-yellow-50 border border-yellow-200" :
                      "bg-green-50 border border-green-200"
                    }`}>
                    <span className={`text-2xl ${email.urgency === "high" ? "text-red-600" :
                      email.urgency === "medium" ? "text-yellow-600" :
                        "text-green-600"
                      }`}>
                      {email.hasAttachment ? "📎" : "✉️"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                          {email.entity}
                        </p>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {formatTime(email.receivedAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                        {email.subject}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 truncate">{email.from}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {email.urgency === "high" && (
                        <span className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full border border-red-200 flex items-center gap-1.5">
                          <span className="text-xs">⚠️</span>
                          Urgente
                        </span>
                      )}
                      {email.urgency === "medium" && (
                        <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full border border-yellow-200 flex items-center gap-1.5">
                          <span className="text-xs">⚡</span>
                          Medio
                        </span>
                      )}
                      {email.urgency === "low" && (
                        <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200 flex items-center gap-1.5">
                          <span className="text-xs">📈</span>
                          Bajo
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 line-clamp-2 mb-4">{email.body}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {email.hasAttachment ? (
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="font-medium">{email.attachments} archivo{email.attachments !== 1 ? "s" : ""} adjunto{email.attachments !== 1 ? "s" : ""}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 012-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-medium">Sin adjuntos</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleViewDetails(email)}
                        className="px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 border border-gray-300 hover:border-blue-300 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver detalles
                      </button>
                      <button
                        onClick={() => handleClassify(email)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Clasificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay correos para mostrar</h3>
            <p className="text-gray-500 mb-6">Intenta cambiar los filtros o busca con otros términos</p>
            <button
              onClick={() => { setFilter("all"); setSearch("") }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Ver todos los correos
            </button>
          </div>
        )}

        {/* Pagination/Info Footer */}
        {filteredEmails.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div>
              Mostrando <span className="font-semibold text-gray-900">{filteredEmails.length}</span> de{" "}
              <span className="font-semibold text-gray-900">{emails.length}</span> correos
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                ← Anterior
              </button>
              <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg">1</span>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalle de Email */}
      {showDetailModal && selectedEmail && (
        <EmailDetailModal
          email={selectedEmail}
          onClose={handleCloseDetailModal}
          onClassify={() => {
            setShowDetailModal(false)
            setShowClassifyModal(true)
          }}
        />
      )}

      {/* Modal de Clasificación */}
      {showClassifyModal && selectedEmail && (
        <ClassifyEmailModal
          email={selectedEmail}
          onClose={handleCloseClassifyModal}
          onBack={() => {
            setShowClassifyModal(false)
            setShowDetailModal(true)
          }}
        />
      )}
    </>
  )
}