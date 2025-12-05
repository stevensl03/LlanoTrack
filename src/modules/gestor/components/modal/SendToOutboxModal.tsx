"use client"

import { useState } from "react"

interface EmailDetail {
  id: string
  radicadoNumber: string
  subject: string
  entity: string
  requestType: string
  signedDocument?: {
    id: string
    name: string
    signedAt: string
    signedBy: string
  }
}

interface SendToOutboxModalProps {
  email: EmailDetail
  onClose: () => void
  onSend: (data: {
    radicadoSalida?: string
    additionalAttachments: File[]
    notes: string
  }) => void
}

export default function SendToOutboxModal({ email, onClose, onSend }: SendToOutboxModalProps) {
  const [step, setStep] = useState<"verify" | "details">("verify")
  const [radicadoSalida, setRadicadoSalida] = useState("")
  const [additionalAttachments, setAdditionalAttachments] = useState<File[]>([])
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAdditionalAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAdditionalAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (!email.signedDocument) {
      newErrors.signedDocument = "Debe existir un documento firmado para continuar"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep("details")
    }
  }

  const handleSubmit = () => {
    onSend({
      radicadoSalida: radicadoSalida.trim() || undefined,
      additionalAttachments,
      notes
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-700 rounded-t-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">📤 Enviar a Bandeja de Salida</h2>
              <p className="text-green-100 mt-1">
                Último paso antes del envío final • {email.radicadoNumber}
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
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "verify" ? "bg-white text-green-600" : "bg-green-500 text-white"}`}>
                1
              </div>
              <div className={`w-24 h-1 ${step === "verify" ? "bg-green-400" : "bg-green-500"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "details" ? "bg-white text-green-600" : "bg-green-500 text-white"}`}>
                2
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step === "verify" ? "font-semibold" : ""}>Verificar documentos</span>
            <span className={step === "details" ? "font-semibold" : ""}>Configurar envío</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {step === "verify" ? (
            <div className="space-y-6">
              {errors.signedDocument && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{errors.signedDocument}</p>
                </div>
              )}

              {/* Document Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Verificación de documentos</h3>
                
                {/* Signed Document */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        email.signedDocument ? "bg-green-100" : "bg-red-100"
                      }`}>
                        <span className={email.signedDocument ? "text-green-600" : "text-red-600"}>
                          {email.signedDocument ? "✅" : "❌"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Documento firmado</p>
                        <p className="text-sm text-gray-600">
                          {email.signedDocument ? email.signedDocument.name : "No disponible"}
                        </p>
                      </div>
                    </div>
                    {email.signedDocument && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Firmado: {email.signedDocument.signedAt}
                      </span>
                    )}
                  </div>
                  
                  {email.signedDocument && (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Firmado por</p>
                          <p className="text-gray-900 font-semibold">{email.signedDocument.signedBy}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fecha de firma</p>
                          <p className="text-gray-900 font-semibold">{email.signedDocument.signedAt}</p>
                        </div>
                      </div>
                      <button className="mt-3 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm">
                        👁️ Ver documento firmado
                      </button>
                    </>
                  )}
                </div>

                {/* Additional Attachments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Archivos adicionales (opcional)
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-green-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("additional-files")?.click()}
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xl">📎</span>
                    </div>
                    <p className="text-gray-700 mb-1">Agregar archivos adicionales</p>
                    <p className="text-sm text-gray-500">Formatos: .pdf, .docx, .xlsx, .jpg, .png</p>
                    <input
                      id="additional-files"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Attachments List */}
                {additionalAttachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Archivos a enviar:</p>
                    <div className="space-y-2">
                      {additionalAttachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📄</span>
                            <div>
                              <p className="text-sm text-gray-900 truncate max-w-[200px]">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verification Checklist */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">✅ Lista de verificación</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      email.signedDocument ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      <span className={email.signedDocument ? "text-green-600" : "text-gray-400"}>
                        {email.signedDocument ? "✓" : "○"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">Documento firmado por Representante Legal</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">○</span>
                    </div>
                    <span className="text-sm text-gray-700">Todas las firmas digitales verificadas</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">○</span>
                    </div>
                    <span className="text-sm text-gray-700">Revisión y aprobación completadas</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Send Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Configuración del envío</h3>
                
                {/* Radicado Salida */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Radicado de salida AZ Digital (opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={radicadoSalida}
                      onChange={(e) => setRadicadoSalida(e.target.value)}
                      placeholder="Ej: 322-02840-S25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔢
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Ingrese el número de radicado si ya fue generado externamente
                  </p>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Notas para el Integrador (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Instrucciones especiales, consideraciones para el envío certificado, o información adicional..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Send Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">📦 Resumen del envío</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Documento principal</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {email.signedDocument?.name || "Sin documento"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Archivos adjuntos</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {additionalAttachments.length} archivo(s) adicional(es)
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Destino</span>
                    <span className="text-sm font-semibold text-gray-900">
                      Bandeja de entrada corporativa
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Acción</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      Envío automático al correo corporativo
                    </span>
                  </div>
                </div>
                
                {radicadoSalida && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Radicado salida</span>
                      <span className="text-sm font-semibold text-gray-900">{radicadoSalida}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Final Warning */}
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600">⚠️</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Importante</p>
                    <p className="text-sm text-gray-700">
                      Al enviar a la bandeja de salida, el documento será transferido al correo corporativo principal.
                      El Integrador deberá gestionar el envío físico por correo certificado de forma externa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 p-6 border-t border-gray-200">
          {step === "verify" ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleNext}
                disabled={!email.signedDocument}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all duration-200"
              >
                Continuar →
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("verify")}
                className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors"
              >
                ← Atrás
              </button>
              
              <button
                onClick={handleSubmit}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl text-sm font-medium transition-all duration-200"
              >
                📤 Enviar a bandeja de salida
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}