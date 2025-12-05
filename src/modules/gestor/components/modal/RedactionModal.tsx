import type React from "react"
import { useState, useRef } from "react"

interface EmailDetail {
    id: string
    radicadoNumber: string
    subject: string
    entity: string
    requestType: string
}

interface RedactionModalProps {
    email: EmailDetail
    onClose: () => void
    onSave: (document: any) => void
    onSendToReview: () => void
}

export default function RedactionModal({ email, onClose, onSave, onSendToReview }: RedactionModalProps) {
    const [step, setStep] = useState<"upload" | "details">("upload")
    const [document, setDocument] = useState<File | null>(null)
    const [documentName, setDocumentName] = useState("")
    const [notes, setNotes] = useState("")
    const [selectedReviewers, setSelectedReviewers] = useState<string[]>(["María González", "Carlos Ramírez"])
    const [errors, setErrors] = useState<Record<string, string>>({})
    
    // Usar useRef para acceder al input de manera segura
    const fileInputRef = useRef<HTMLInputElement>(null)

    const reviewers = [
        "María González",
        "Carlos Ramírez",
        "Ana Martínez",
        "Pedro Sánchez",
        "Laura Ruiz"
    ]

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {}

        if (!document) {
            newErrors.document = "Debe cargar un documento"
        }

        if (!documentName.trim()) {
            newErrors.documentName = "El nombre del documento es requerido"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setDocument(file)
            if (!documentName) {
                setDocumentName(file.name.replace(/\.[^/.]+$/, "")) // Remove extension
            }
            // Limpiar error si existía
            if (errors.document) {
                setErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.document
                    return newErrors
                })
            }
        }
    }

    const handleNext = () => {
        if (step === "upload" && validateStep1()) {
            setStep("details")
        } else if (step === "details") {
            handleSave()
        }
    }

    const handleSave = () => {
        const newDocument = {
            id: `doc_${Date.now()}`,
            name: documentName,
            url: "#",
            status: "draft",
            uploadedAt: new Date().toLocaleString("es-CO"),
        }
        onSave(newDocument)
    }

    const handleSendToReview = () => {
        onSendToReview()
    }

    const toggleReviewer = (reviewer: string) => {
        setSelectedReviewers(prev =>
            prev.includes(reviewer)
                ? prev.filter(r => r !== reviewer)
                : [...prev, reviewer]
        )
    }

    // Función para abrir el selector de archivos
    const openFileSelector = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-t-2xl p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">✍️ Redacción de respuesta</h2>
                            <p className="text-yellow-100 mt-1">
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

                    {/* Steps */}
                    <div className="flex items-center justify-center mt-6">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "upload" ? "bg-white text-yellow-600" : "bg-yellow-500 text-white"}`}>
                                1
                            </div>
                            <div className={`w-24 h-1 ${step === "upload" ? "bg-yellow-400" : "bg-yellow-500"}`}></div>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "details" ? "bg-white text-yellow-600" : "bg-yellow-500 text-white"}`}>
                                2
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                        <span className={step === "upload" ? "font-semibold" : ""}>Cargar documento</span>
                        <span className={step === "details" ? "font-semibold" : ""}>Configurar detalles</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {step === "upload" ? (
                        <div className="space-y-6">
                            {/* Document Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Subir documento de respuesta <span className="text-red-500">*</span>
                                </label>

                                {!document ? (
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-yellow-400 transition-colors cursor-pointer"
                                        onClick={openFileSelector}
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <span className="text-yellow-600 text-2xl">📄</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">Arrastra o haz clic para subir</p>
                                        <p className="text-sm text-gray-500 mb-4">Formatos soportados: .docx, .pdf</p>
                                        <button 
                                            type="button"
                                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
                                        >
                                            Seleccionar archivo
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".docx,.pdf"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </div>
                                ) : (
                                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-green-600 text-xl">✅</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{document.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {(document.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setDocument(null)}
                                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {errors.document && (
                                    <p className="text-xs text-red-600">{errors.document}</p>
                                )}
                            </div>

                            {/* Document Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Nombre del documento <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={documentName}
                                    onChange={(e) => {
                                        setDocumentName(e.target.value)
                                        // Limpiar error si existía
                                        if (errors.documentName && e.target.value.trim()) {
                                            setErrors(prev => {
                                                const newErrors = { ...prev }
                                                delete newErrors.documentName
                                                return newErrors
                                            })
                                        }
                                    }}
                                    placeholder="Ej: Respuesta_oficial_Decreto2471.docx"
                                    className={`w-full px-4 py-3 border ${errors.documentName ? "border-red-300" : "border-gray-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                                />
                                {errors.documentName && (
                                    <p className="text-xs text-red-600">{errors.documentName}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Reviewers Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Revisores (selecciona al menos uno)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {reviewers.map(reviewer => (
                                        <button
                                            key={reviewer}
                                            type="button"
                                            onClick={() => toggleReviewer(reviewer)}
                                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${selectedReviewers.includes(reviewer)
                                                ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                                                : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedReviewers.includes(reviewer) ? "bg-yellow-500 text-white" : "bg-gray-200"
                                                }`}>
                                                {selectedReviewers.includes(reviewer) ? "✓" : "+"}
                                            </div>
                                            {reviewer}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Internal Notes */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Notas para revisores (opcional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    placeholder="Agregar observaciones específicas para los revisores..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">Resumen</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Documento:</span>
                                        <span className="text-gray-900 font-semibold truncate max-w-[200px]">
                                            {documentName || "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Revisores:</span>
                                        <span className="text-gray-900 font-semibold">
                                            {selectedReviewers.length} seleccionados
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Entidad:</span>
                                        <span className="text-gray-900 font-semibold">{email.entity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tipo solicitud:</span>
                                        <span className="text-gray-900 font-semibold">{email.requestType}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-4 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors"
                    >
                        Cancelar
                    </button>

                    {step === "upload" ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex-1 px-5 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                            Continuar
                        </button>
                    ) : (
                        <div className="flex-1 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setStep("upload")}
                                className="px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors"
                            >
                                ← Atrás
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
                            >
                                💾 Guardar borrador
                            </button>
                            <button
                                type="button"
                                onClick={handleSendToReview}
                                className="flex-1 px-5 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-medium transition-colors"
                            >
                                📤 Enviar a revisión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}