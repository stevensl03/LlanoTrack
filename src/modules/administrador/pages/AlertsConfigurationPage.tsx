"use client"

import { useState } from "react"

interface AlertConfiguration {
    id: string
    name: string
    type: "warning" | "critical" | "expired"
    daysBefore: number
    recipients: string[]
    channels: ("email" | "notification" | "sms")[]
    messageTemplate: string
    isActive: boolean
    lastSent?: string
    nextSchedule?: string
}

export default function AlertsConfigurationPage() {
    const [alerts, setAlerts] = useState<AlertConfiguration[]>([
        {
            id: "1",
            name: "Alerta de vencimiento próximo",
            type: "warning",
            daysBefore: 3,
            recipients: ["gestores@azdigital.gov.co", "supervisores@azdigital.gov.co"],
            channels: ["email", "notification"],
            messageTemplate: "⚠️ {solicitud} vence en {dias} días. Gestor: {gestor}",
            isActive: true,
            lastSent: "2024-01-15",
            nextSchedule: "2024-01-18",
        },
        {
            id: "2",
            name: "Alerta crítica de vencimiento",
            type: "critical",
            daysBefore: 1,
            recipients: ["gestores@azdigital.gov.co", "supervisores@azdigital.gov.co", "directores@azdigital.gov.co"],
            channels: ["email", "notification", "sms"],
            messageTemplate: "🔴 {solicitud} VENCE MAÑANA. Gestor: {gestor}. Prioridad: ALTA",
            isActive: true,
            lastSent: "2024-01-14",
            nextSchedule: "2024-01-16",
        },
        {
            id: "3",
            name: "Alerta de vencido",
            type: "expired",
            daysBefore: 0,
            recipients: ["gestores@azdigital.gov.co", "supervisores@azdigital.gov.co", "directores@azdigital.gov.co", "auditoria@azdigital.gov.co"],
            channels: ["email", "notification"],
            messageTemplate: "🚨 {solicitud} VENCIDA desde {fecha}. Se requiere acción inmediata.",
            isActive: true,
            lastSent: "2024-01-13",
            nextSchedule: "2024-01-15",
        },
        {
            id: "4",
            name: "Recordatorio semanal",
            type: "warning",
            daysBefore: 7,
            recipients: ["gestores@azdigital.gov.co"],
            channels: ["email"],
            messageTemplate: "📋 Recordatorio: Tiene {cantidad} solicitudes próximas a vencer",
            isActive: false,
            lastSent: "2024-01-10",
            nextSchedule: "2024-01-17",
        },
    ])

    const [showForm, setShowForm] = useState(false)
    const [editAlert, setEditAlert] = useState<AlertConfiguration | null>(null)
    const [testRecipient, setTestRecipient] = useState("")

    const handleToggle = (id: string) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
        ))
    }

    const handleCreate = () => {
        setEditAlert(null)
        setShowForm(true)
    }

    const handleEdit = (alert: AlertConfiguration) => {
        setEditAlert(alert)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        if (window.confirm("¿Está seguro de eliminar esta configuración de alerta?")) {
            setAlerts(alerts.filter(alert => alert.id !== id))
        }
    }

    const handleSave = (data: Omit<AlertConfiguration, "id">) => {
        if (editAlert) {
            // Editar
            setAlerts(alerts.map(alert =>
                alert.id === editAlert.id
                    ? { ...alert, ...data }
                    : alert
            ))
        } else {
            // Crear nuevo
            const newAlert: AlertConfiguration = {
                id: `alert_${Date.now()}`,
                ...data,
            }
            setAlerts([newAlert, ...alerts])
        }
        setShowForm(false)
        setEditAlert(null)
    }

    const handleTest = (id: string) => {
        if (!testRecipient) {
            alert("Por favor ingrese un email de prueba")
            return
        }

        const foundAlert = alerts.find(a => a.id === id)
        if (foundAlert) {
            alert(`✅ Alerta de prueba enviada a: ${testRecipient}\nTipo: ${foundAlert.name}`)
            setTestRecipient("")
        }
    }

    const getTypeBadge = (type: string) => {
        const styles = {
            warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
            critical: "bg-red-100 text-red-700 border-red-200",
            expired: "bg-purple-100 text-purple-700 border-purple-200",
        }
        const labels = {
            warning: "⚠️ Advertencia",
            critical: "🔴 Crítica",
            expired: "🚨 Vencido",
        }
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[type as keyof typeof styles]}`}>
                {labels[type as keyof typeof labels]}
            </span>
        )
    }

    const getChannelIcon = (channel: string) => {
        const icons = {
            email: "📧",
            notification: "🔔",
            sms: "📱",
        }
        return icons[channel as keyof typeof icons] || "📨"
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔔 Configuración de Alertas</h1>
                        <p className="text-gray-600">Gestión de notificaciones y recordatorios del sistema</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <span>+</span>
                        Nueva alerta
                    </button>
                </div>
            </div>

            {/* Alerts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {alerts.map(alert => (
                    <div key={alert.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{alert.name}</h3>
                                        {getTypeBadge(alert.type)}
                                        {!alert.isActive && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                Inactiva
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <span>⏰</span>
                                            {alert.daysBefore === 0 ? "Al vencer" : `${alert.daysBefore} días antes`}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>🔄</span>
                                            {alert.lastSent ? `Enviada: ${alert.lastSent}` : "Nunca enviada"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(alert)}
                                        className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Channels */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Canales de envío</p>
                                <div className="flex flex-wrap gap-2">
                                    {alert.channels.map(channel => (
                                        <span key={channel} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-2">
                                            {getChannelIcon(channel)}
                                            {channel === "email" ? "Email" :
                                                channel === "notification" ? "Notificación" : "SMS"}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Recipients */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Destinatarios</p>
                                <div className="space-y-1">
                                    {alert.recipients.map(recipient => (
                                        <p key={recipient} className="text-sm text-gray-600 truncate">{recipient}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Message Preview */}
                            <div className="mb-6">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Plantilla del mensaje</p>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <p className="text-sm text-gray-700 font-mono">{alert.messageTemplate}</p>
                                </div>
                            </div>

                            {/* Actions and Test */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleToggle(alert.id)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${alert.isActive
                                            ? "text-yellow-600 hover:bg-yellow-50"
                                            : "text-green-600 hover:bg-green-50"
                                            }`}
                                    >
                                        {alert.isActive ? "Desactivar" : "Activar"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(alert.id)}
                                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        placeholder="Email de prueba"
                                        value={testRecipient}
                                        onChange={(e) => setTestRecipient(e.target.value)}
                                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm w-40"
                                    />
                                    <button
                                        onClick={() => handleTest(alert.id)}
                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                                    >
                                        Probar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Statistics and Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Estado de alertas</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total configuradas</span>
                            <span className="text-lg font-bold text-gray-900">{alerts.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Activas</span>
                            <span className="text-lg font-bold text-green-600">{alerts.filter(a => a.isActive).length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Inactivas</span>
                            <span className="text-lg font-bold text-red-600">{alerts.filter(a => !a.isActive).length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Tipos diferentes</span>
                            <span className="text-lg font-bold text-purple-600">
                                {new Set(alerts.map(a => a.type)).size}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Próximos envíos programados</h3>
                    <div className="space-y-3">
                        {alerts
                            .filter(a => a.isActive && a.nextSchedule)
                            .map(alert => (
                                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600">🔔</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{alert.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {alert.daysBefore === 0 ? "Al vencer" : `${alert.daysBefore} días antes del vencimiento`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">Próximo envío</p>
                                        <p className="text-xs text-gray-500">{alert.nextSchedule}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {alerts.filter(a => a.isActive && a.nextSchedule).length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No hay envíos programados</p>
                    )}
                </div>
            </div>

            {/* Alert Form Modal */}
            {showForm && (
                <AlertFormModal
                    alert={editAlert}
                    onClose={() => {
                        setShowForm(false)
                        setEditAlert(null)
                    }}
                    onSave={handleSave}
                />
            )}
        </div>
    )
}

// Componente Modal para Formulario de Alerta (simplificado)
function AlertFormModal({ alert, onClose, onSave }: any) {
    const [formData, setFormData] = useState({
        name: alert?.name || "",
        type: alert?.type || "warning",
        daysBefore: alert?.daysBefore || 3,
        recipients: alert?.recipients || [],
        channels: alert?.channels || ["email"],
        messageTemplate: alert?.messageTemplate || "",
        isActive: alert?.isActive ?? true,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {alert ? "Editar alerta" : "Nueva alerta"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form fields here (similar to other modals) */}
                        <div className="flex gap-4">
                            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl">
                                Cancelar
                            </button>
                            <button type="submit" className="flex-1 px-4 py-3 bg-yellow-600 text-white rounded-xl">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}