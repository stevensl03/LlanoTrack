"use client"

import { useState } from "react"
import { useParams } from "react-router"

interface WorkflowStep {
    id: string
    step: string
    status: "completed" | "in_progress" | "pending"
    user: string
    role: string
    date: string
    details: string
    documents?: {
        name: string
        url: string
        type: string
    }[]
    comments?: string[]
}

export default function WorkflowTrackingPage() {
    const { id } = useParams()

    const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
        {
            id: "1",
            step: "Recepción y clasificación",
            status: "completed",
            user: "Sistema",
            role: "Automático",
            date: "15/01/2024 08:35",
            details: "Correo recibido automáticamente y clasificado según filtros",
        },
        {
            id: "2",
            step: "Asignación",
            status: "completed",
            user: "Claudia B.",
            role: "Integrador",
            date: "15/01/2024 09:15",
            details: "Asignado a Jaime Tiuso (Área Legal) con urgencia alta",
        },
        {
            id: "3",
            step: "Redacción",
            status: "completed",
            user: "Jaime Tiuso",
            role: "Gestor",
            date: "22/01/2024 10:20",
            details: "Documento de respuesta cargado: Respuesta_oficial_Decreto2471.docx",
            documents: [
                { name: "respuesta_borrador.docx", url: "#", type: "Borrador" },
            ],
        },
        {
            id: "4",
            step: "Revisión legal (GLPI)",
            status: "in_progress",
            user: "María González",
            role: "Revisor Legal",
            date: "22/01/2024 14:30",
            details: "Enviado a GLPI para revisión legal",
            comments: ["Esperando respuesta del área legal"],
        },
        {
            id: "5",
            step: "Revisión técnica",
            status: "pending",
            user: "Carlos Ramírez",
            role: "Revisor Técnico",
            date: "Pendiente",
            details: "Pendiente de revisión técnica",
        },
        {
            id: "6",
            step: "Aprobación",
            status: "pending",
            user: "Ana Martínez",
            role: "Aprobador",
            date: "Pendiente",
            details: "Pendiente de aprobación final",
        },
        {
            id: "7",
            step: "Firma Representante Legal",
            status: "pending",
            user: "Dr. Roberto Mendoza",
            role: "Representante Legal",
            date: "Pendiente",
            details: "Pendiente de firma física",
        },
        {
            id: "8",
            step: "Envío a bandeja de salida",
            status: "pending",
            user: "Sistema",
            role: "Automático",
            date: "Pendiente",
            details: "Pendiente de envío automático",
        },
        {
            id: "9",
            step: "Envío certificado",
            status: "pending",
            user: "Claudia B.",
            role: "Integrador",
            date: "Pendiente",
            details: "Pendiente de gestión por Servientrega",
        },
        {
            id: "10",
            step: "Acuse de recibo",
            status: "pending",
            user: "Sistema",
            role: "Automático",
            date: "Pendiente",
            details: "Pendiente de confirmación de entidad",
        },
    ])

    const [activeStep, setActiveStep] = useState<string>("4")
    const [newComment, setNewComment] = useState("")

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                </div>
            case "in_progress":
                return <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600">⏳</span>
                </div>
            case "pending":
                return <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">○</span>
                </div>
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "text-green-700 bg-green-50 border-green-200"
            case "in_progress": return "text-yellow-700 bg-yellow-50 border-yellow-200"
            case "pending": return "text-gray-500 bg-gray-50 border-gray-200"
        }
    }

    const handleAddComment = (stepId: string) => {
        if (newComment.trim()) {
            setWorkflowSteps(steps =>
                steps.map(step =>
                    step.id === stepId
                        ? {
                            ...step,
                            comments: [...(step.comments || []), newComment]
                        }
                        : step
                )
            )
            setNewComment("")
        }
    }

    const calculateTimeBetweenSteps = (step1: WorkflowStep, step2: WorkflowStep) => {
        if (step1.status !== "completed" || step2.status !== "completed") return null

        const date1 = new Date(step1.date.split(' ')[0].split('/').reverse().join('-'))
        const date2 = new Date(step2.date.split(' ')[0].split('/').reverse().join('-'))
        const diffTime = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Seguimiento del flujo</h1>
                        <p className="text-gray-600">Radicado: AZ2024-001234 • Solicitud de información - Decreto 2471 de 2021</p>
                    </div>
                </div>

                {/* Timeline Summary */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Tiempo transcurrido</p>
                            <p className="text-2xl font-bold text-gray-900">7 días</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Días restantes</p>
                            <p className="text-2xl font-bold text-orange-600">3 días</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">% completado</p>
                            <p className="text-2xl font-bold text-blue-600">30%</p>
                        </div>
                    </div>

                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                            style={{ width: "30%" }}
                        ></div>
                        <div className="absolute w-full h-full flex items-center">
                            <div className="w-1/3 border-r border-white h-full"></div>
                            <div className="w-1/3 border-r border-white h-full"></div>
                            <div className="w-1/3"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Inicio</span>
                        <span>50%</span>
                        <span>Vence</span>
                    </div>
                </div>
            </div>

            {/* Workflow Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">📋 Línea de tiempo del proceso</h2>
                    <p className="text-gray-600">Seguimiento detallado de cada etapa del flujo</p>
                </div>

                <div className="p-6">
                    <div className="space-y-6">
                        {workflowSteps.map((step, index) => (
                            <div key={step.id} className="relative">
                                {/* Connection Line */}
                                {index < workflowSteps.length - 1 && (
                                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                                )}

                                <div className="flex gap-4">
                                    {/* Status Icon */}
                                    <div className="relative z-10">
                                        {getStatusIcon(step.status)}
                                    </div>

                                    {/* Step Content */}
                                    <div className={`flex-1 border rounded-xl p-4 ${activeStep === step.id ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-gray-50"}`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold text-gray-900">{step.step}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(step.status)}`}>
                                                        {step.status === "completed" && "Completado"}
                                                        {step.status === "in_progress" && "En progreso"}
                                                        {step.status === "pending" && "Pendiente"}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{step.details}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-900">{step.user}</p>
                                                <p className="text-xs text-gray-500">{step.role}</p>
                                                <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                                            </div>
                                        </div>

                                        {/* Time Between Steps */}
                                        {index > 0 && step.status === "completed" && workflowSteps[index - 1].status === "completed" && (
                                            <div className="mb-3">
                                                <span className="text-xs text-gray-500">
                                                    ⏱️ Tiempo entre etapas: {calculateTimeBetweenSteps(workflowSteps[index - 1], step)} días
                                                </span>
                                            </div>
                                        )}

                                        {/* Documents */}
                                        {step.documents && step.documents.length > 0 && (
                                            <div className="mb-3">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Documentos:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {step.documents.map((doc, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={doc.url}
                                                            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                        >
                                                            <span>📄</span>
                                                            {doc.name}
                                                            <span className="text-xs text-gray-500">({doc.type})</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Comments */}
                                        {step.comments && step.comments.length > 0 && (
                                            <div className="mb-3">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Comentarios:</p>
                                                <div className="space-y-2">
                                                    {step.comments.map((comment, idx) => (
                                                        <div key={idx} className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-200">
                                                            {comment}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Add Comment (for current step) */}
                                        {activeStep === step.id && step.status === "in_progress" && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Agregar comentario:</p>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        placeholder="Agregar un comentario sobre esta etapa..."
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <button
                                                        onClick={() => handleAddComment(step.id)}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                                                    >
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Estadísticas del flujo</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Etapas completadas</span>
                            <span className="text-sm font-bold text-green-600">3/10</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Etapas en progreso</span>
                            <span className="text-sm font-bold text-yellow-600">1/10</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tiempo promedio por etapa</span>
                            <span className="text-sm font-bold text-blue-600">2.3 días</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Cuello de botella actual</span>
                            <span className="text-sm font-bold text-red-600">Revisión legal</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">👥 Responsables actuales</h3>
                    <div className="space-y-3">
                        {workflowSteps
                            .filter(step => step.status === "in_progress")
                            .map(step => (
                                <div key={step.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <span className="text-yellow-600">👤</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{step.user}</p>
                                        <p className="text-xs text-gray-500">{step.role}</p>
                                    </div>
                                </div>
                            ))}

                        {workflowSteps.filter(step => step.status === "in_progress").length === 0 && (
                            <p className="text-sm text-gray-500">No hay responsables activos en este momento</p>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">⏰ Próximas acciones</h3>
                    <div className="space-y-3">
                        {workflowSteps
                            .filter(step => step.status === "pending")
                            .slice(0, 3)
                            .map(step => (
                                <div key={step.id} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900 mb-1">{step.step}</p>
                                    <p className="text-xs text-gray-500">Responsable: {step.user}</p>
                                    <p className="text-xs text-gray-500">Estado: Pendiente</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}