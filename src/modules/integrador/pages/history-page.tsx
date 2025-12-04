"use client"

import { useState } from "react"

interface ClassifiedEmail {
  id: string
  from: string
  subject: string
  entity: string
  requestType: string
  classifiedAt: string
  classifiedBy: string
  assignedTo: string
  status: "assigned" | "in_progress" | "completed"
  radicadoNumber?: string
}

const mockClassified: ClassifiedEmail[] = [
  {
    id: "1",
    from: "solicitudes@alcaldia.gov.co",
    subject: "Solicitud de información - Decreto 2471 de 2021",
    entity: "Alcaldía Municipal",
    requestType: "Acceso a Información Pública",
    classifiedAt: "2024-01-15T11:30:00",
    classifiedBy: "Juan Díaz",
    assignedTo: "María García",
    status: "in_progress",
    radicadoNumber: "AZ2024-001234",
  },
  {
    id: "2",
    from: "tramites@secretaria.gov.co",
    subject: "Radicación de petición PQR",
    entity: "Secretaría Departamental",
    requestType: "Petición, Queja o Reclamo",
    classifiedAt: "2024-01-14T16:45:00",
    classifiedBy: "Juan Díaz",
    assignedTo: "Roberto Díaz",
    status: "completed",
    radicadoNumber: "AZ2024-001233",
  },
  {
    id: "3",
    from: "info@gobernacion.gov.co",
    subject: "Solicitud de ampliación de plazo",
    entity: "Gobernación",
    requestType: "Solicitud Especial",
    classifiedAt: "2024-01-14T10:20:00",
    classifiedBy: "Juan Díaz",
    assignedTo: "Pedro Sánchez",
    status: "assigned",
    radicadoNumber: "AZ2024-001232",
  },
]

const HistoryPage = () => {
  const [emails, setEmails] = useState<ClassifiedEmail[]>(mockClassified)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "assigned" | "in_progress" | "completed">("all")

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.radicadoNumber?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || email.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
            Asignado
          </span>
        )
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
            En proceso
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            ✓ Completado
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">📦 Correos clasificados</h1>
            <p className="text-gray-600">Historial de correos procesados</p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Buscar por asunto, remitente o radicado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            {["all", "assigned", "in_progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                  }`}
              >
                {status === "all" && "Todos"}
                {status === "assigned" && "Asignados"}
                {status === "in_progress" && "En proceso"}
                {status === "completed" && "Completados"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Asunto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Entidad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Radicado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Asignado a</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Clasificado</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.map((email) => (
                <tr
                  key={email.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{email.subject}</p>
                      <p className="text-xs text-gray-500">{email.from}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{email.entity}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono text-blue-600">{email.radicadoNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{email.assignedTo}</p>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(email.status)}</td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      📅 {formatDate(email.classifiedAt)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3 opacity-30">📦</div>
            <p className="text-gray-500">No se encontraron correos clasificados</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Total clasificados</p>
          <p className="text-2xl font-bold text-gray-900">{emails.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Asignados</p>
          <p className="text-2xl font-bold text-blue-600">{emails.filter((e) => e.status === "assigned").length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">En proceso</p>
          <p className="text-2xl font-bold text-yellow-600">
            {emails.filter((e) => e.status === "in_progress").length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Completados</p>
          <p className="text-2xl font-bold text-green-600">{emails.filter((e) => e.status === "completed").length}</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage