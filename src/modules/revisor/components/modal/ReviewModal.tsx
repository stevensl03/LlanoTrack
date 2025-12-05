// components/modal/ReviewModal.tsx
import React, { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    id: string;
    subject: string;
    entity: string;
    daysLeft: number;
  };
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, review }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiresCorrection, setRequiresCorrection] = useState(false);
  const [correctionNotes, setCorrectionNotes] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedAction, setSelectedAction] = useState<'approved' | 'correction' | null>(null);

  if (!isOpen) return null;

  const handleSubmitReview = () => {
    if (!selectedAction) {
      alert('⚠️ Por favor seleccione una acción');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedAction === 'approved') {
        alert('✅ Revisión completada exitosamente');
      } else {
        alert('📝 Correcciones solicitadas al gestor');
      }
      onClose();
    }, 1500);
  };

  const handleDownloadDocument = () => {
    alert(`📥 Descargando documentos para ${review.id}`);
  };

  const handleOpenGLPI = () => {
    window.open('/glpi', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo con opacidad */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">🔍 Revisar Documento</h3>
                <p className="text-sm text-gray-600 mt-1">ID: {review.id}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 text-2xl"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Contenido del modal */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda - Información */}
              <div className="space-y-4">
                {/* Información principal */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">📋 Información del caso</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Asunto:</span>
                      <span className="text-sm font-medium text-gray-900">{review.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Entidad:</span>
                      <span className="text-sm font-medium text-gray-900">{review.entity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Días restantes:</span>
                      <span className={`text-sm font-medium ${
                        review.daysLeft <= 2 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {review.daysLeft} días
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documentos disponibles */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">📁 Documentos disponibles</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Respuesta_Borrador.docx', type: 'Word', size: '2.4 MB' },
                      { name: 'Anexos_Tecnicos.pdf', type: 'PDF', size: '3.1 MB' },
                      { name: 'Evidencias.xlsx', type: 'Excel', size: '1.8 MB' }
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {doc.type === 'PDF' ? '📄' : doc.type === 'Word' ? '📝' : '📊'}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleDownloadDocument}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          ⬇️
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleDownloadDocument}
                    className="w-full mt-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium"
                  >
                    ⬇️ Descargar todos los documentos
                  </button>
                </div>

                {/* Acceso a GLPI */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">⚖️ Revisión Legal</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Si requiere revisión legal externa, utilice el sistema GLPI
                  </p>
                  <button
                    onClick={handleOpenGLPI}
                    className="w-full py-2 bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"
                  >
                    🔗 Abrir GLPI
                  </button>
                </div>
              </div>

              {/* Columna derecha - Acciones y notas */}
              <div className="space-y-4">
                {/* Instrucciones */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">📌 Instrucciones de revisión</h4>
                  <ol className="text-sm text-yellow-800 space-y-1 list-decimal pl-5">
                    <li>Descargue y revise los documentos fuera de la plataforma</li>
                    <li>Agregue su firma digital en el campo "Revisado"</li>
                    <li>Regrese a esta ventana para completar el proceso</li>
                    <li>Seleccione una de las opciones a continuación</li>
                  </ol>
                </div>

                {/* Selección de acción */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">⚡ Acción de revisión</h4>
                  <div className="space-y-3">
                    {/* Opción 1: Aprobado */}
                    <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAction === 'approved' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedAction('approved')}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          selectedAction === 'approved' 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedAction === 'approved' && <span className="text-white text-xs">✓</span>}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">✅ Documento aprobado</p>
                          <p className="text-sm text-gray-600 mt-1">
                            El documento cumple con todos los requisitos y puede continuar a aprobación
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Opción 2: Requiere correcciones */}
                    <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAction === 'correction' 
                        ? 'border-yellow-500 bg-yellow-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedAction('correction')}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          selectedAction === 'correction' 
                            ? 'border-yellow-500 bg-yellow-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedAction === 'correction' && <span className="text-white text-xs">✓</span>}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">⚠️ Requiere correcciones</p>
                          <p className="text-sm text-gray-600 mt-1">
                            El documento necesita ajustes antes de continuar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notas de revisión */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Notas de revisión {selectedAction === 'correction' && '(Opcional)'}
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder={
                      selectedAction === 'correction' 
                        ? 'Detalle las correcciones necesarias...' 
                        : 'Agregue comentarios o observaciones (opcional)...'
                    }
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Mensaje importante */}
                {selectedAction === 'approved' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>⚠️ Importante:</strong> Asegúrese de haber agregado su firma digital en el documento antes de marcar como aprobado.
                    </p>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={handleSubmitReview}
                    disabled={isSubmitting || !selectedAction}
                    className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✅</span>
                        {selectedAction === 'approved' ? 'Marcar como revisado' : 'Solicitar correcciones'}
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;