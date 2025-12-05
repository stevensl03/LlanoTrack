// pages/ReviewDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface ReviewDetail {
  id: string;
  subject: string;
  entity: string;
  sender: string;
  manager: string;
  daysLeft: number;
  status: 'pending' | 'in-progress' | 'completed' | 'correction';
  deadline: string;
  originalEmail: string;
  documents: Document[];
  history: {
    date: string;
    action: string;
    user: string;
  }[];
}

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiresCorrection, setRequiresCorrection] = useState(false);
  const [correctionNotes, setCorrectionNotes] = useState('');

  // Datos de ejemplo
  const review: ReviewDetail = {
    id: id || 'REV-001',
    subject: 'Solicitud de información contractual - Proceso 2025-001',
    entity: 'Ministerio de Hacienda (.gov.co)',
    sender: 'juan.perez@hacienda.gov.co',
    manager: 'Jaime Tiuso - Área Legal',
    daysLeft: 3,
    status: 'pending',
    deadline: '2025-12-10',
    originalEmail: `Estimados señores,\n\nMediante la presente solicitamos información detallada sobre el contrato N° 2025-001, específicamente:\n\n1. Términos de pago establecidos\n2. Plazos de ejecución\n3. Garantías presentadas\n4. Modificaciones realizadas\n\nAgradecemos su pronta respuesta dentro de los plazos establecidos.\n\nAtentamente,\nJuan Pérez\nMinisterio de Hacienda`,
    documents: [
      { id: '1', name: 'Respuesta_Borrador.docx', type: 'Word', size: '2.4 MB', uploadedAt: '2025-11-25' },
      { id: '2', name: 'Anexo_Tecnico.pdf', type: 'PDF', size: '5.1 MB', uploadedAt: '2025-11-25' },
      { id: '3', name: 'Tabla_Comparativa.xlsx', type: 'Excel', size: '1.2 MB', uploadedAt: '2025-11-25' },
    ],
    history: [
      { date: '2025-11-20 08:35', action: 'Correo recibido', user: 'Sistema Automático' },
      { date: '2025-11-21 09:15', action: 'Asignado a gestor', user: 'Claudia B. (Integrador)' },
      { date: '2025-11-25 14:30', action: 'Enviado a revisión', user: 'Jaime Tiuso (Gestor)' },
    ]
  };

  const handleDownloadAll = () => {
    // Lógica para descargar todos los documentos
    console.log('Descargando todos los documentos');
    alert('Iniciando descarga de todos los documentos...');
  };

  const handleDownloadDocument = (docId: string, docName: string) => {
    // Lógica para descargar documento individual
    console.log(`Descargando documento: ${docName}`);
    alert(`Descargando: ${docName}`);
  };

  const handleMarkAsCompleted = () => {
    setIsSubmitting(true);
    // Lógica para marcar como completado
    setTimeout(() => {
      setIsSubmitting(false);
      alert('✅ Revisión marcada como completada. El sistema detectará automáticamente su firma en el documento.');
    }, 1000);
  };

  const handleRequestCorrection = () => {
    if (!correctionNotes.trim()) {
      alert('⚠️ Por favor agregue comentarios sobre las correcciones necesarias');
      return;
    }
    
    setIsSubmitting(true);
    // Lógica para solicitar correcciones
    setTimeout(() => {
      setIsSubmitting(false);
      alert('📤 Correcciones solicitadas. El gestor ha sido notificado por correo electrónico.');
      setRequiresCorrection(false);
      setCorrectionNotes('');
    }, 1000);
  };

  const handleOpenGLPI = () => {
    // Lógica para abrir GLPI externamente
    window.open('/glpi', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header con navegación */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/revisor/dashboard')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            <span className="mr-2">←</span>
            Volver al panel
          </button>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Detalle de Revisión</h1>
              <p className="text-gray-600 mt-1">ID: {review.id}</p>
            </div>
            
            <div className={`px-4 py-2 rounded-lg ${
              review.daysLeft < 0 ? 'bg-red-100 text-red-800' :
              review.daysLeft <= 2 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              <div className="flex items-center">
                <span className="mr-2">⏱️</span>
                <span className="font-medium">
                  {review.daysLeft < 0 ? `Vencido hace ${Math.abs(review.daysLeft)} días` :
                   review.daysLeft === 0 ? 'Vence hoy' :
                   `${review.daysLeft} días restantes`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Información Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Columna 1: Información del caso */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de información */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {review.subject}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-gray-400 mt-0.5 mr-3">🏢</span>
                  <div>
                    <p className="text-sm text-gray-600">Entidad Remitente</p>
                    <p className="font-medium">{review.entity}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-gray-400 mt-0.5 mr-3">👤</span>
                  <div>
                    <p className="text-sm text-gray-600">Gestor Responsable</p>
                    <p className="font-medium">{review.manager}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-gray-400 mt-0.5 mr-3">📅</span>
                  <div>
                    <p className="text-sm text-gray-600">Fecha Límite</p>
                    <p className="font-medium">{review.deadline}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-gray-400 mt-0.5 mr-3">👁️</span>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <p className="font-medium capitalize">{review.status.replace('-', ' ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Correo Original */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✉️ Correo Original</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>De:</strong> {review.sender}
                </p>
                <div className="text-gray-800 whitespace-pre-wrap font-sans">
                  {review.originalEmail}
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Documentos y Acciones */}
          <div className="space-y-6">
            {/* Documentos */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">📁 Documentos</h3>
                <button
                  onClick={handleDownloadAll}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span className="mr-1">⬇️</span>
                  Descargar todos
                </button>
              </div>
              
              <div className="space-y-3">
                {review.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {doc.type === 'PDF' && <span className="text-gray-600">📄</span>}
                        {doc.type === 'Word' && <span className="text-gray-600">📝</span>}
                        {doc.type === 'Excel' && <span className="text-gray-600">📊</span>}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">
                          {doc.type} • {doc.size} • {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownloadDocument(doc.id, doc.name)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <span>⬇️</span>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>📌 Importante:</strong> Después de revisar, agregue su firma digital en el campo "Revisado" del documento y guarde los cambios.
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acciones</h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleMarkAsCompleted}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="mr-2">✅</span>
                  {isSubmitting ? 'Procesando...' : 'Marcar como Revisado'}
                </button>
                
                <button
                  onClick={() => setRequiresCorrection(!requiresCorrection)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-yellow-100 text-yellow-800 font-medium rounded-lg hover:bg-yellow-200"
                >
                  <span className="mr-2">⚠️</span>
                  Solicitar Correcciones
                </button>
                
                <button
                  onClick={handleOpenGLPI}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200"
                >
                  <span className="mr-2">⚖️</span>
                  Abrir GLPI (Revisión Legal)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Correcciones (condicional) */}
        {requiresCorrection && (
          <div className="bg-white rounded-lg border border-yellow-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
              <span className="mr-2">⚠️</span>
              Solicitar Correcciones
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentarios para el gestor *
                </label>
                <textarea
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  placeholder="Especifique qué correcciones son necesarias. Ej: Corregir fecha en cláusula 3, ajustar valores en tabla 2..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleRequestCorrection}
                  disabled={isSubmitting || !correctionNotes.trim()}
                  className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud de Corrección'}
                </button>
                
                <button
                  onClick={() => {
                    setRequiresCorrection(false);
                    setCorrectionNotes('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Historial */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📜 Historial</h3>
          
          <div className="space-y-4">
            {review.history.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 mt-1.5 bg-blue-500 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600">
                    📅 {item.date} • 👤 Por: {item.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage;