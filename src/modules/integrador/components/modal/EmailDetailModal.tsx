"use client"

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

interface EmailDetailModalProps {
  email: Email
  onClose: () => void
  onClassify: () => void
}

export default function EmailDetailModal({ email, onClose, onClassify }: EmailDetailModalProps) {

  const emailDetails = {
    id: email.id,
    from: email.from,
    sender: "Juan Carlos Rodríguez",
    subject: email.subject,
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
    receivedAt: email.receivedAt,
    entity: "Alcaldía Municipal de Medellín",
    attachments: [
      { name: "solicitud_formal.pdf", size: "245 KB" },
      { name: "copia_cedula.pdf", size: "156 KB" },
      { name: "comprobante_pago.pdf", size: "89 KB" },
    ],
    requestType: "Acceso a Información Pública",
    responseDeadline: 10,
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay sutil */}
      <div
        className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container con animación */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 animate-fadeIn">
        {/* Header elegante */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white bg-opacity-20 p-2 rounded-lg">
                  📧
                </span>
                <h2 className="text-2xl font-bold truncate">{emailDetails.subject}</h2>
              </div>
              <p className="text-blue-100 text-sm truncate">De: {emailDetails.from}</p>
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

        {/* Info grid */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-blue-600 font-medium">ENTIDAD</p>
              <p className="text-sm font-semibold text-gray-900">{emailDetails.entity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-blue-600 font-medium">RECIBIDO</p>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                <span className="text-gray-500">📅</span>
                {new Date(emailDetails.receivedAt).toLocaleDateString("es-CO")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-blue-600 font-medium">PLAZO MÁXIMO</p>
              <p className="text-sm font-semibold text-gray-900">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                  ⏱️ {emailDetails.responseDeadline} días
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-blue-600 font-medium">REMITENTE</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{emailDetails.sender}</p>
            </div>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="p-6">
            {/* Email Content */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">✉️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Contenido del correo</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                    {emailDetails.body}
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">📎</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Archivos adjuntos ({emailDetails.attachments.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {emailDetails.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-500 text-xl">📄</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate mb-1">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">{attachment.size}</p>
                        <button className="w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                          <span>⬇</span>
                          Descargar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 bg-gray-50 rounded-b-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
                <span className="text-xs text-gray-600 font-medium">Estado:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200">
                  ⏳ Pendiente
                </span>
              </div>
              <div className="text-xs text-gray-500">
                ID: <span className="font-mono font-semibold text-gray-700">{emailDetails.id}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                Cerrar
              </button>
              <button
                onClick={onClassify}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl shadow-blue-100 hover:shadow-blue-200 flex items-center gap-2"
              >
                <span>🏷️</span>
                Clasificar correo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}