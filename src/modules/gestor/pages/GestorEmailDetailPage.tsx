"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import RedactionModal from "../components/modal/RedactionModal"
import ReviewModal from "../components/modal/ReviewModal"
import SendToOutboxModal from "../components/modal/SendToOutboxModal"

interface EmailDetail {
    id: string
    radicadoNumber: string
    subject: string
    from: string
    body: string
    entity: string
    requestType: string
    urgency: "high" | "medium" | "low"
    status: "assigned" | "in_redaction" | "in_review" | "in_approval" | "signed" | "in_outbox" | "sent" | "received"
    daysRemaining: number
    daysUsed: number
    totalDays: number
    deadline: string
    assignedAt: string
    assignedBy: string
    attachments: {
        name: string
        size: string
        type: "original" | "draft" | "reviewed" | "approved" | "signed"
        uploadedAt: string
        uploadedBy: string
    }[]
    internalNotes: {
        id: string
        author: string
        content: string
        createdAt: string
    }[]
    workflowHistory: {
        id: string
        action: string
        user: string
        timestamp: string
        details: string
    }[]
    responseDocument?: {
        id: string
        name: string
        url: string
        status: "draft" | "review" | "approved" | "signed"
        uploadedAt: string
        reviewedBy?: string
        approvedBy?: string
        signedBy?: string
    }
    reviewers: string[]
    approvers: string[]
    contactInfo: {
        name: string
        position: string
        email: string
        phone?: string
    }
}

export default function GestorEmailDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState<EmailDetail>({
        id: id || "1",
        radicadoNumber: "AZ2024-001234",
        subject: "Solicitud de información - Decreto 2471 de 2021",
        from: "solicitudes@alcaldia.gov.co",
        body: `Distinguidos funcionarios,

Solicito respetuosamente información detallada sobre la implementación del Decreto 2471 de 2021 en su institución.

Específicamente, requiero:
1. Listado de beneficiarios registrados
2. Presupuesto asignado para el año 2024
3. Resultados alcanzados en la vigencia anterior

Esta información es requerida para propósitos de control y vigilancia ciudadana.

Atentamente,
Juan Carlos Rodríguez
Cédula: 1234567890
Correo: jcrodriguez@email.com`,
        entity: "Alcaldía Municipal de Medellín",
        requestType: "Acceso a Información Pública",
        urgency: "high",
        status: "in_redaction",
        daysRemaining: 3,
        daysUsed: 7,
        totalDays: 10,
        deadline: "2024-01-28",
        assignedAt: "2024-01-15",
        assignedBy: "Claudia B.",
        attachments: [
            {
                name: "solicitud_formal.pdf",
                size: "245 KB",
                type: "original",
                uploadedAt: "2024-01-15 08:35",
                uploadedBy: "Sistema",
            },
            {
                name: "copia_cedula.pdf",
                size: "156 KB",
                type: "original",
                uploadedAt: "2024-01-15 08:35",
                uploadedBy: "Sistema",
            },
            {
                name: "respuesta_borrador.docx",
                size: "89 KB",
                type: "draft",
                uploadedAt: "2024-01-22 10:20",
                uploadedBy: "Jaime Tiuso",
            },
        ],
        internalNotes: [
            {
                id: "1",
                author: "Jaime Tiuso",
                content: "Se requiere revisión legal por temas de transparencia",
                createdAt: "2024-01-22 10:30",
            },
            {
                id: "2",
                author: "Jaime Tiuso",
                content: "Documento enviado a María González para revisión",
                createdAt: "2024-01-22 14:30",
            },
        ],
        workflowHistory: [
            {
                id: "1",
                action: "Correo recibido",
                user: "Sistema",
                timestamp: "2024-01-15 08:35",
                details: "Correo recibido automáticamente de solicitudes@alcaldia.gov.co",
            },
            {
                id: "2",
                action: "Correo clasificado",
                user: "Claudia B.",
                timestamp: "2024-01-15 09:15",
                details: "Clasificado como Acceso a Información Pública, urgencia alta",
            },
            {
                id: "3",
                action: "Correo asignado",
                user: "Claudia B.",
                timestamp: "2024-01-15 09:15",
                details: "Asignado a Jaime Tiuso (Área Legal)",
            },
            {
                id: "4",
                action: "Redacción iniciada",
                user: "Jaime Tiuso",
                timestamp: "2024-01-22 10:20",
                details: "Iniciada redacción de respuesta",
            },
        ],
        responseDocument: {
            id: "doc1",
            name: "Respuesta_oficial_Decreto2471.docx",
            url: "#",
            status: "draft",
            uploadedAt: "2024-01-22 10:20",
        },
        reviewers: ["María González", "Carlos Ramírez"],
        approvers: ["Ana Martínez"],
        contactInfo: {
            name: "Juan Carlos Rodríguez",
            position: "Ciudadano",
            email: "jcrodriguez@email.com",
            phone: "+57 300 123 4567",
        },
    })

    const [showRedactionModal, setShowRedactionModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [showSendModal, setShowSendModal] = useState(false)
    const [newNote, setNewNote] = useState("")

    const handleStartRedaction = () => {
        setShowRedactionModal(true)
    }

    const handleSendToReview = () => {
        setShowReviewModal(true)
    }

    const handleSendToApproval = () => {
        // Actualizar estado y mostrar modal
        setEmail(prev => ({ ...prev, status: "in_approval" }))
        alert("Documento enviado a aprobación. Notificación enviada a aprobadores.")
    }

    const handleSendToOutbox = () => {
        setShowSendModal(true)
    }

    const handleAddNote = () => {
        if (newNote.trim()) {
            const note = {
                id: `note_${Date.now()}`,
                author: "Jaime Tiuso",
                content: newNote,
                createdAt: new Date().toLocaleString("es-CO"),
            }
            setEmail(prev => ({
                ...prev,
                internalNotes: [note, ...prev.internalNotes]
            }))
            setNewNote("")
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "assigned": return "bg-blue-100 text-blue-700 border-blue-200"
            case "in_redaction": return "bg-yellow-100 text-yellow-700 border-yellow-200"
            case "in_review": return "bg-purple-100 text-purple-700 border-purple-200"
            case "in_approval": return "bg-indigo-100 text-indigo-700 border-indigo-200"
            case "signed": return "bg-green-100 text-green-700 border-green-200"
            case "in_outbox": return "bg-orange-100 text-orange-700 border-orange-200"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case "high": return "bg-red-100 text-red-700 border-red-200"
            case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200"
            case "low": return "bg-green-100 text-green-700 border-green-200"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    const getDocumentStatusBadge = (status: string) => {
        switch (status) {
            case "draft":
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Borrador</span>
            case "review":
                return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">En revisión</span>
            case "approved":
                return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Aprobado</span>
            case "signed":
                return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Firmado</span>
            default:
                return null
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <button
                            onClick={() => navigate("/gestor")}
                            className="mb-4 gap-2 text-gray-600 hover:text-gray-900 text-sm bg-transparent flex items-center"
                        >
                            ← Volver al panel
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{email.subject}</h1>
                        <p className="text-gray-600">Radicado: {email.radicadoNumber}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(email.status)}`}>
                            {email.status === "assigned" && "Asignado"}
                            {email.status === "in_redaction" && "En redacción"}
                            {email.status === "in_review" && "En revisión"}
                            {email.status === "in_approval" && "En aprobación"}
                            {email.status === "signed" && "Firmado"}
                            {email.status === "in_outbox" && "En bandeja de salida"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(email.urgency)}`}>
                            {email.urgency === "high" && "Urgente"}
                            {email.urgency === "medium" && "Medio"}
                            {email.urgency === "low" && "Bajo"}
                        </span>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Días restantes</p>
                            <p className={`text-2xl font-bold ${email.daysRemaining <= 2 ? "text-red-600" : "text-gray-900"}`}>
                                {email.daysRemaining}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Días usados</p>
                            <p className="text-2xl font-bold text-gray-900">{email.daysUsed}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Plazo total</p>
                            <p className="text-2xl font-bold text-gray-900">{email.totalDays}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">% usado</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round((email.daysUsed / email.totalDays) * 100)}%
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Fecha límite</p>
                            <p className="text-lg font-bold text-gray-900">{email.deadline}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Asignado por</p>
                            <p className="text-sm font-bold text-gray-900">{email.assignedBy}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Fecha asignación</p>
                            <p className="text-sm font-bold text-gray-900">{email.assignedAt}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Contacto</p>
                            <p className="text-sm font-bold text-gray-900 truncate">{email.contactInfo.name}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progreso del plazo</span>
                            <span>{email.daysUsed}/{email.totalDays} días</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full ${(email.daysUsed / email.totalDays) < 0.5 ? "bg-green-500" :
                                    (email.daysUsed / email.totalDays) < 0.8 ? "bg-yellow-500" : "bg-red-500"
                                    }`}
                                style={{ width: `${(email.daysUsed / email.totalDays) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Email Content and Actions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Email Content */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">📧 Contenido original del correo</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Remitente</p>
                                    <p className="text-sm text-gray-900">{email.from}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Entidad</p>
                                    <p className="text-sm text-gray-900">{email.entity}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Tipo de solicitud</p>
                                    <p className="text-sm text-gray-900">{email.requestType}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Mensaje</p>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700 whitespace-pre-wrap text-sm">{email.body}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Actions */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">📋 Acciones del flujo</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Redacción */}
                            <div className={`p-4 rounded-xl border-2 ${email.status === "assigned" || email.status === "in_redaction"
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200 bg-gray-50"
                                }`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${email.status === "assigned" || email.status === "in_redaction"
                                        ? "bg-blue-100"
                                        : "bg-gray-100"
                                        }`}>
                                        <span className={`${email.status === "assigned" || email.status === "in_redaction"
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                            }`}>✍️</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Redacción</p>
                                        <p className="text-xs text-gray-500">
                                            {email.status === "assigned" ? "Pendiente" : "En curso"}
                                        </p>
                                    </div>
                                </div>

                                {email.status === "assigned" && (
                                    <button
                                        onClick={handleStartRedaction}
                                        className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Iniciar redacción
                                    </button>
                                )}

                                {email.status === "in_redaction" && email.responseDocument && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">Documento:</span>
                                            <span className="text-xs font-semibold text-gray-900 truncate max-w-[120px]">
                                                {email.responseDocument.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setShowRedactionModal(true)}
                                            className="w-full px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors"
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Revisión */}
                            <div className={`p-4 rounded-xl border-2 ${email.status === "in_review"
                                ? "border-purple-300 bg-purple-50"
                                : "border-gray-200 bg-gray-50"
                                }`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${email.status === "in_review"
                                        ? "bg-purple-100"
                                        : "bg-gray-100"
                                        }`}>
                                        <span className={`${email.status === "in_review" ? "text-purple-600" : "text-gray-400"}`}>🔍</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Revisión</p>
                                        <p className="text-xs text-gray-500">
                                            {email.status === "in_review" ? "En curso" : "Pendiente"}
                                        </p>
                                    </div>
                                </div>

                                {email.status === "in_redaction" && email.responseDocument && (
                                    <button
                                        onClick={handleSendToReview}
                                        className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Enviar a revisión
                                    </button>
                                )}

                                {email.status === "in_review" && (
                                    <div className="space-y-2">
                                        <div className="text-xs text-gray-600">
                                            Revisores: {email.reviewers.join(", ")}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/gestor/email/${id}/tracking`)}
                                            className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                                        >
                                            Ver estado
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Aprobación */}
                            <div className={`p-4 rounded-xl border-2 ${email.status === "in_approval"
                                ? "border-indigo-300 bg-indigo-50"
                                : "border-gray-200 bg-gray-50"
                                }`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${email.status === "in_approval"
                                        ? "bg-indigo-100"
                                        : "bg-gray-100"
                                        }`}>
                                        <span className={`${email.status === "in_approval" ? "text-indigo-600" : "text-gray-400"}`}>✅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Aprobación</p>
                                        <p className="text-xs text-gray-500">
                                            {email.status === "in_approval" ? "En curso" : "Pendiente"}
                                        </p>
                                    </div>
                                </div>

                                {email.status === "in_review" && email.responseDocument?.status === "review" && (
                                    <button
                                        onClick={handleSendToApproval}
                                        className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Enviar a aprobación
                                    </button>
                                )}

                                {email.status === "in_approval" && (
                                    <div className="space-y-2">
                                        <div className="text-xs text-gray-600">
                                            Aprobador: {email.approvers[0]}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/gestor/email/${id}/tracking`)}
                                            className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                                        >
                                            Ver estado
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Envío */}
                            <div className={`p-4 rounded-xl border-2 ${email.status === "signed" || email.status === "in_outbox"
                                ? "border-green-300 bg-green-50"
                                : "border-gray-200 bg-gray-50"
                                }`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${email.status === "signed" || email.status === "in_outbox"
                                        ? "bg-green-100"
                                        : "bg-gray-100"
                                        }`}>
                                        <span className={`${email.status === "signed" || email.status === "in_outbox"
                                            ? "text-green-600"
                                            : "text-gray-400"
                                            }`}>📤</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Envío</p>
                                        <p className="text-xs text-gray-500">
                                            {email.status === "signed" ? "Listo" : "Pendiente"}
                                        </p>
                                    </div>
                                </div>

                                {email.status === "signed" && (
                                    <button
                                        onClick={handleSendToOutbox}
                                        className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Enviar a bandeja
                                    </button>
                                )}

                                {email.status === "in_outbox" && (
                                    <div className="space-y-2">
                                        <div className="text-xs text-gray-600">
                                            Listo para envío
                                        </div>
                                        <button
                                            onClick={() => navigate(`/gestor/email/${id}/send`)}
                                            className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                                        >
                                            Ver detalles
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">📎 Archivos adjuntos</h2>
                        <div className="space-y-3">
                            {email.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <span className="text-blue-600">
                                                {attachment.type === "original" ? "📄" : "📝"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {attachment.size} • {attachment.uploadedAt} • Subido por: {attachment.uploadedBy}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {attachment.type === "draft" && getDocumentStatusBadge("draft")}
                                        <button className="px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg text-sm transition-colors">
                                            Descargar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Info and Notes */}
                <div className="space-y-6">
                    {/* Internal Notes */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Notas internas</h2>

                        {/* Add Note Form */}
                        <div className="mb-4">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Agregar una nota interna..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                Agregar nota
                            </button>
                        </div>

                        {/* Notes List */}
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {email.internalNotes.map((note) => (
                                <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-900">{note.author}</span>
                                        <span className="text-xs text-gray-500">{note.createdAt}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{note.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">👤 Información de contacto</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Nombre</p>
                                <p className="text-sm text-gray-900">{email.contactInfo.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Cargo</p>
                                <p className="text-sm text-gray-900">{email.contactInfo.position}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Email</p>
                                <p className="text-sm text-gray-900">{email.contactInfo.email}</p>
                            </div>
                            {email.contactInfo.phone && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Teléfono</p>
                                    <p className="text-sm text-gray-900">{email.contactInfo.phone}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Información rápida</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Radicado entrada</span>
                                <span className="text-sm font-semibold text-gray-900">{email.radicadoNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Fecha recepción</span>
                                <span className="text-sm font-semibold text-gray-900">{email.assignedAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Responsable</span>
                                <span className="text-sm font-semibold text-gray-900">Jaime Tiuso</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Área</span>
                                <span className="text-sm font-semibold text-gray-900">Legal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showRedactionModal && (
                <RedactionModal
                    email={email}
                    onClose={() => setShowRedactionModal(false)}
                    onSave={(document) => {
                        setEmail(prev => ({
                            ...prev,
                            responseDocument: document,
                            status: "in_redaction"
                        }))
                        setShowRedactionModal(false)
                    }}
                    onSendToReview={() => {
                        setEmail(prev => ({ ...prev, status: "in_review" }))
                        setShowRedactionModal(false)
                        alert("Documento enviado a revisión. Notificación enviada a revisores.")
                    }}
                />
            )}

            {showReviewModal && (
                <ReviewModal
                    email={email}
                    onClose={() => setShowReviewModal(false)}
                    onSendToReview={() => {
                        setEmail(prev => ({ ...prev, status: "in_review" }))
                        setShowReviewModal(false)
                        alert("Documento enviado a revisión. Notificación enviada a revisores.")
                    }}
                />
            )}

            {showSendModal && (
                <SendToOutboxModal
                    email={email}
                    onClose={() => setShowSendModal(false)}
                    onSend={() => {
                        setEmail(prev => ({ ...prev, status: "in_outbox" }))
                        setShowSendModal(false)
                        alert("Documento enviado a bandeja de salida. Notificación enviada al Integrador.")
                    }}
                />
            )}
        </div>
    )
}