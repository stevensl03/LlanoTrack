"use client"

import { useState } from "react"
import { useNavigate } from "react-router"

interface AssignedEmail {
    id: string
    radicadoNumber: string
    subject: string
    from: string
    entity: string
    requestType: string
    urgency: "high" | "medium" | "low"
    status: "assigned" | "in_redaction" | "in_review" | "in_approval" | "signed" | "in_outbox" | "sent" | "received"
    daysRemaining: number
    daysUsed: number
    deadline: string
    assignedAt: string
    lastUpdate: string
    assignedBy: string
}

export default function GestorDashboardPage() {
    const navigate = useNavigate()
    const [emails, setEmails] = useState<AssignedEmail[]>([
        {
            id: "1",
            radicadoNumber: "AZ2024-001234",
            subject: "Solicitud de información - Decreto 2471 de 2021",
            from: "solicitudes@alcaldia.gov.co",
            entity: "Alcaldía Municipal",
            requestType: "Acceso a Información Pública",
            urgency: "high",
            status: "in_redaction",
            daysRemaining: 3,
            daysUsed: 7,
            deadline: "2024-01-28",
            assignedAt: "2024-01-15",
            lastUpdate: "2024-01-22",
            assignedBy: "Claudia B.",
        },
        {
            id: "2",
            radicadoNumber: "AZ2024-001233",
            subject: "Radicación de petición PQR #45892",
            from: "tramites@secretaria.gov.co",
            entity: "Secretaría Departamental",
            requestType: "Petición, Queja o Reclamo",
            urgency: "medium",
            status: "assigned",
            daysRemaining: 10,
            daysUsed: 5,
            deadline: "2024-02-05",
            assignedAt: "2024-01-16",
            lastUpdate: "2024-01-16",
            assignedBy: "Claudia B.",
        },
        {
            id: "3",
            radicadoNumber: "AZ2024-001232",
            subject: "Solicitud de ampliación de plazo - Proyecto 458",
            from: "info@gobernacion.gov.co",
            entity: "Gobernación",
            requestType: "Solicitud Especial",
            urgency: "high",
            status: "in_review",
            daysRemaining: 2,
            daysUsed: 8,
            deadline: "2024-01-25",
            assignedAt: "2024-01-13",
            lastUpdate: "2024-01-21",
            assignedBy: "Claudia B.",
        },
        {
            id: "4",
            radicadoNumber: "AZ2024-001231",
            subject: "Consulta técnica sobre implementación TIC",
            from: "planeacion@mintic.gov.co",
            entity: "Ministerio TIC",
            requestType: "Consulta Técnica",
            urgency: "low",
            status: "in_approval",
            daysRemaining: 15,
            daysUsed: 5,
            deadline: "2024-02-10",
            assignedAt: "2024-01-10",
            lastUpdate: "2024-01-15",
            assignedBy: "Claudia B.",
        },
        {
            id: "5",
            radicadoNumber: "AZ2024-001230",
            subject: "Notificación de auditoría programada",
            from: "contraloria@contraloria.gov.co",
            entity: "Contraloría General",
            requestType: "Requerimiento Legal",
            urgency: "high",
            status: "signed",
            daysRemaining: 1,
            daysUsed: 4,
            deadline: "2024-01-23",
            assignedAt: "2024-01-18",
            lastUpdate: "2024-01-22",
            assignedBy: "Claudia B.",
        },
    ])

    const [filter, setFilter] = useState<"all" | "assigned" | "in_redaction" | "in_review" | "in_approval" | "signed" | "urgent">("all")
    const [search, setSearch] = useState("")

    const filteredEmails = emails.filter(email => {
        const matchesSearch =
            search === "" ||
            email.subject.toLowerCase().includes(search.toLowerCase()) ||
            email.radicadoNumber.toLowerCase().includes(search.toLowerCase()) ||
            email.entity.toLowerCase().includes(search.toLowerCase())

        const matchesFilter =
            filter === "all" ||
            (filter === "urgent" && email.urgency === "high") ||
            email.status === filter

        return matchesSearch && matchesFilter
    })

    const stats = {
        total: emails.length,
        assigned: emails.filter(e => e.status === "assigned").length,
        inRedaction: emails.filter(e => e.status === "in_redaction").length,
        inReview: emails.filter(e => e.status === "in_review").length,
        inApproval: emails.filter(e => e.status === "in_approval").length,
        urgent: emails.filter(e => e.urgency === "high").length,
        dueToday: emails.filter(e => e.daysRemaining <= 1).length,
        overdue: emails.filter(e => e.daysRemaining < 0).length,
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "assigned":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                        <span>📋</span> Asignado
                    </span>
                )
            case "in_redaction":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                        <span>✍️</span> En redacción
                    </span>
                )
            case "in_review":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                        <span>🔍</span> En revisión
                    </span>
                )
            case "in_approval":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                        <span>✅</span> En aprobación
                    </span>
                )
            case "signed":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                        <span>🖋️</span> Firmado
                    </span>
                )
            case "in_outbox":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                        <span>📤</span> En salida
                    </span>
                )
            default:
                return null
        }
    }

    const getUrgencyBadge = (urgency: string) => {
        switch (urgency) {
            case "high":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                        <span>⚠️</span> Urgente
                    </span>
                )
            case "medium":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                        <span>⚡</span> Medio
                    </span>
                )
            case "low":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                        <span>📈</span> Bajo
                    </span>
                )
            default:
                return null
        }
    }

    const getProgressColor = (daysRemaining: number, totalDays: number) => {
        const percentage = (daysRemaining / totalDays) * 100
        if (percentage > 50) return "bg-green-500"
        if (percentage > 25) return "bg-yellow-500"
        if (percentage > 0) return "bg-orange-500"
        return "bg-red-500"
    }

    const handleStartRedaction = (id: string) => {
        setEmails(emails.map(email =>
            email.id === id ? { ...email, status: "in_redaction" } : email
        ))
        navigate(`/gestor/email/${id}/redaction`)
    }

    const handleViewDetails = (id: string) => {
        navigate(`/gestor/email/${id}`)
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Panel del Gestor</h1>
                        <p className="text-gray-600">
                            {stats.total} correos asignados • {stats.urgent} urgentes • {stats.dueToday} por vencer hoy
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por asunto o radicado..."
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Asignados</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600">👤</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">En redacción</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.inRedaction}</p>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <span className="text-yellow-600">✍️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">En revisión</p>
                                <p className="text-2xl font-bold text-purple-600">{stats.inReview}</p>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600">🔍</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">En aprobación</p>
                                <p className="text-2xl font-bold text-indigo-600">{stats.inApproval}</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <span className="text-indigo-600">✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Urgentes</p>
                                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
                            </div>
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600">⚠️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Por vencer hoy</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.dueToday}</p>
                            </div>
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600">⏰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Vencidos</p>
                                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                            </div>
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600">🚨</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="text-gray-700 font-medium">Filtrar por:</span>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "all"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                                }`}
                        >
                            Todos ({stats.total})
                        </button>
                        <button
                            onClick={() => setFilter("assigned")}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "assigned"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                                }`}
                        >
                            Asignados ({stats.assigned})
                        </button>
                        <button
                            onClick={() => setFilter("in_redaction")}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "in_redaction"
                                    ? "bg-yellow-600 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                                }`}
                        >
                            En redacción ({stats.inRedaction})
                        </button>
                        <button
                            onClick={() => setFilter("in_review")}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "in_review"
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                                }`}
                        >
                            En revisión ({stats.inReview})
                        </button>
                        <button
                            onClick={() => setFilter("urgent")}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "urgent"
                                    ? "bg-red-600 text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                                }`}
                        >
                            Urgentes ({stats.urgent})
                        </button>
                    </div>
                </div>
            </div>

            {/* Assigned Emails List */}
            <div className="space-y-4">
                {filteredEmails.map((email) => (
                    <div
                        key={email.id}
                        className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3">
                                        {getStatusBadge(email.status)}
                                        {getUrgencyBadge(email.urgency)}
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {email.daysRemaining >= 0 ? `${email.daysRemaining} días restantes` : `Vencido hace ${-email.daysRemaining} días`}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                                            {email.subject}
                                        </h3>
                                        <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {email.radicadoNumber}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">🏢</span>
                                            <span>{email.entity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">📝</span>
                                            <span>{email.requestType}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">📅</span>
                                            <span>Asignado: {email.assignedAt}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">👤</span>
                                            <span>Por: {email.assignedBy}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-32 flex-shrink-0 ml-4">
                                    <div className="text-center mb-2">
                                        <span className="text-sm font-bold text-gray-900">{email.daysUsed}d usados</span>
                                        <span className="text-xs text-gray-500 block">de {email.daysUsed + email.daysRemaining}d</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getProgressColor(email.daysRemaining, email.daysUsed + email.daysRemaining)}`}
                                            style={{ width: `${(email.daysUsed / (email.daysUsed + email.daysRemaining)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                        Última actualización: {email.lastUpdate}
                                    </span>
                                    {email.daysRemaining <= 3 && email.daysRemaining >= 0 && (
                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                            ⏰ Vence pronto
                                        </span>
                                    )}
                                    {email.daysRemaining < 0 && (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                            🚨 VENCIDO
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleViewDetails(email.id)}
                                        className="px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 border border-gray-300 hover:border-blue-300 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Ver detalles
                                    </button>

                                    {email.status === "assigned" && (
                                        <button
                                            onClick={() => handleStartRedaction(email.id)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Iniciar redacción
                                        </button>
                                    )}

                                    {email.status === "in_redaction" && (
                                        <button
                                            onClick={() => navigate(`/gestor/email/${email.id}/redaction`)}
                                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
                                        >
                                            <span>✍️</span>
                                            Continuar redacción
                                        </button>
                                    )}

                                    {email.status === "in_review" && (
                                        <button
                                            onClick={() => navigate(`/gestor/email/${email.id}/tracking`)}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
                                        >
                                            <span>🔍</span>
                                            Ver estado revisión
                                        </button>
                                    )}

                                    {email.status === "in_approval" && (
                                        <button
                                            onClick={() => navigate(`/gestor/email/${email.id}/tracking`)}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
                                        >
                                            <span>✅</span>
                                            Ver estado aprobación
                                        </button>
                                    )}

                                    {email.status === "signed" && (
                                        <button
                                            onClick={() => navigate(`/gestor/email/${email.id}/send`)}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
                                        >
                                            <span>📤</span>
                                            Enviar a bandeja
                                        </button>
                                    )}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay correos para mostrar</h3>
                    <p className="text-gray-500 mb-6">Intenta cambiar los filtros de búsqueda</p>
                    <button
                        onClick={() => { setFilter("all"); setSearch("") }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        Ver todos los correos
                    </button>
                </div>
            )}

            {/* Quick Actions Panel */}
            <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones rápidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        onClick={() => navigate("/gestor/templates")}
                        className="p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors text-left group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600">📄</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Plantillas</p>
                                <p className="text-xs text-gray-500">Ver documentos base</p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/gestor/notes")}
                        className="p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-colors text-left group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600">📝</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Notas internas</p>
                                <p className="text-xs text-gray-500">Agregar observaciones</p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/gestor/reports")}
                        className="p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors text-left group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600">📊</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Mis reportes</p>
                                <p className="text-xs text-gray-500">Ver métricas personales</p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/gestor/alerts")}
                        className="p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors text-left group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600">🔔</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Alertas</p>
                                <p className="text-xs text-gray-500">{stats.dueToday} por vencer hoy</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}