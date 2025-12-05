// pages/Aprobador/Detalle.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';


const AprobadorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<'aprobado' | 'ajustes' | null>(null);
  const [comentarios, setComentarios] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Datos de ejemplo del documento
  const documento = {
    id: id || 'APR-001',
    codigo: '2025-001-MH',
    asunto: 'Respuesta a solicitud de información contractual N° 2025-001',
    gestor: {
      nombre: 'Jaime Tiuso',
      cargo: 'Área Legal',
      email: 'jaime.tiuso@empresa.com'
    },
    entidad: 'Ministerio de Hacienda',
    remitente: 'Juan Pérez - juan.perez@hacienda.gov.co',
    fechaRecepcion: '2025-11-20',
    fechaEnvioRevision: '2025-11-25',
    fechaEnvioAprobacion: '2025-11-26',
    plazoTotal: 10,
    diasUtilizados: 6,
    prioridad: 'alta',
    estadoActual: 'en-aprobacion',
    
    // Documentos
    documentos: [
      {
        id: 'doc1',
        nombre: 'Respuesta_Final_Revisada.docx',
        tipo: 'Word',
        tamano: '2.4 MB',
        fechaSubida: '2025-11-26 10:30',
        version: 'v3.0',
        tieneFirmas: true
      },
      {
        id: 'doc2',
        nombre: 'Anexos_Tecnicos.pdf',
        tipo: 'PDF',
        tamano: '5.1 MB',
        fechaSubida: '2025-11-26 10:32',
        version: 'v1.0',
        tieneFirmas: false
      }
    ],
    
    // Firmas de revisores
    firmasRevisores: [
      {
        nombre: 'María González',
        cargo: 'Revisor Legal',
        fecha: '2025-11-26 09:45',
        estado: 'completada',
        comentarios: 'Documento revisado y aprobado. Se verificaron todas las cláusulas.'
      },
      {
        nombre: 'Carlos López',
        cargo: 'Revisor Técnico',
        fecha: '2025-11-26 10:15',
        estado: 'completada',
        comentarios: 'Aprobado técnicamente. Los cálculos son correctos.'
      }
    ],
    
    // Historial del proceso
    historial: [
      { fecha: '2025-11-20 08:35', accion: 'Correo recibido', usuario: 'Sistema Automático' },
      { fecha: '2025-11-21 09:15', accion: 'Asignado a gestor', usuario: 'Claudia B.' },
      { fecha: '2025-11-24 10:20', accion: 'En redacción', usuario: 'Jaime Tiuso' },
      { fecha: '2025-11-25 14:30', accion: 'Enviado a revisión', usuario: 'Jaime Tiuso' },
      { fecha: '2025-11-26 09:45', accion: 'Revisión completada', usuario: 'María González' },
      { fecha: '2025-11-26 10:15', accion: 'Revisión completada', usuario: 'Carlos López' },
      { fecha: '2025-11-26 11:00', accion: 'Enviado a aprobación', usuario: 'Jaime Tiuso' }
    ]
  };

  const handleDownloadDocumento = (docId: string) => {
    alert(`Descargando documento ${docId}`);
  };

  const handleSubmitAprobacion = () => {
    if (!decision) {
      alert('Por favor seleccione una decisión');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert(decision === 'aprobado' 
        ? '✅ Documento aprobado exitosamente' 
        : '📝 Se han solicitado ajustes al gestor'
      );
      navigate('/aprobador/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navegación */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/aprobador/dashboard')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            <span className="mr-2">←</span>
            Volver al panel
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">🔍 Panel de Aprobación</h1>
              <p className="text-gray-600 mt-1">
                ID: {documento.id} | Código: {documento.codigo}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-lg font-medium ${
                documento.prioridad === 'alta' ? 'bg-red-100 text-red-800' :
                documento.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {documento.prioridad === 'alta' ? '🔴 Alta Prioridad' : 
                 documento.prioridad === 'media' ? '🟡 Prioridad Media' : '🟢 Prioridad Baja'}
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                ⏱️ {documento.diasUtilizados}/{documento.plazoTotal} días
              </span>
            </div>
          </div>
        </div>

        {/* Layout de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del documento */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📄 Información del Documento</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{documento.asunto}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-gray-600 w-32">🏢 Entidad:</span>
                        <span className="font-medium">{documento.entidad}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">👤 Remitente:</span>
                        <span className="font-medium">{documento.remitente}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">📅 Recepción:</span>
                        <span className="font-medium">{documento.fechaRecepcion}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-gray-600 w-32">👨‍💼 Gestor:</span>
                        <span className="font-medium">{documento.gestor.nombre}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">💼 Cargo:</span>
                        <span className="font-medium">{documento.gestor.cargo}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-32">📧 Email:</span>
                        <span className="font-medium">{documento.gestor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Firmas de revisores */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">✍️ Firmas de Revisores</h2>
              
              <div className="space-y-4">
                {documento.firmasRevisores.map((firma, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{firma.nombre}</p>
                        <p className="text-sm text-gray-600">{firma.cargo}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        firma.estado === 'completada' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {firma.estado === 'completada' ? '✅ Firmado' : '⏳ Pendiente'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{firma.comentarios}</p>
                    <p className="text-xs text-gray-500 mt-2">📅 {firma.fecha}</p>
                  </div>
                ))}
                
                {documento.firmasRevisores.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-3xl block mb-2">📝</span>
                    No hay firmas de revisores registradas
                  </div>
                )}
              </div>
            </div>

            {/* Historial del proceso */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🕐 Historial del Proceso</h2>
              
              <div className="space-y-3">
                {documento.historial.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.accion}</p>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>👤 {item.usuario}</span>
                        <span>📅 {item.fecha}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna lateral (1/3) */}
          <div className="space-y-6">
            {/* Documentos adjuntos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">📁 Documentos Adjuntos</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  ⬇️ Descargar todos
                </button>
              </div>
              
              <div className="space-y-3">
                {documento.documentos.map((doc) => (
                  <div key={doc.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-gray-400 mr-3 mt-1">
                          {doc.tipo === 'PDF' ? '📄' : '📝'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{doc.nombre}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.tipo} • {doc.tamano} • {doc.fechaSubida}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {doc.version}
                            </span>
                            {doc.tieneFirmas && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded ml-2">
                                ✍️ Con firmas
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadDocumento(doc.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ⬇️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>📌 Nota:</strong> Revise los documentos antes de tomar una decisión.
                  Asegúrese de que todas las firmas estén completas.
                </p>
              </div>
            </div>

            {/* Panel de decisión */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Decisión de Aprobación</h2>
              
              <div className="space-y-4">
                {/* Opción 1: Aprobado */}
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    decision === 'aprobado' 
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setDecision('aprobado')}
                >
                  <div className="flex items-start">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      decision === 'aprobado' 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {decision === 'aprobado' && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">✅ Documento aprobado</p>
                      <p className="text-sm text-gray-600 mt-1">
                        El documento cumple con todos los requisitos y está listo para firma de representación legal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opción 2: Requiere ajustes */}
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    decision === 'ajustes' 
                      ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-200' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setDecision('ajustes')}
                >
                  <div className="flex items-start">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                      decision === 'ajustes' 
                        ? 'border-yellow-500 bg-yellow-500' 
                        : 'border-gray-300'
                    }`}>
                      {decision === 'ajustes' && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">⚠️ Requiere ajustes</p>
                      <p className="text-sm text-gray-600 mt-1">
                        El documento necesita correcciones antes de poder ser aprobado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comentarios */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Comentarios {decision === 'ajustes' ? '(Obligatorio)' : '(Opcional)'}
                </label>
                <textarea
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  placeholder={
                    decision === 'ajustes' 
                      ? 'Especifique qué ajustes son necesarios...' 
                      : 'Agregue comentarios o observaciones...'
                  }
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required={decision === 'ajustes'}
                />
              </div>

              {/* Botones de acción */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleSubmitAprobacion}
                  disabled={isSubmitting || (decision === 'ajustes' && !comentarios.trim())}
                  className={`w-full py-3 font-medium rounded-lg flex items-center justify-center ${
                    decision === 'aprobado'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Procesando...
                    </>
                  ) : decision === 'aprobado' ? (
                    <>
                      <span className="mr-2">✅</span>
                      Aprobar Documento
                    </>
                  ) : (
                    <>
                      <span className="mr-2">⚠️</span>
                      Solicitar Ajustes
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => navigate('/aprobador/dashboard')}
                  className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>

            {/* Indicadores de tiempo */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">⏱️ Línea de Tiempo</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progreso del plazo</span>
                    <span className="text-sm font-medium text-gray-700">
                      {documento.diasUtilizados}/{documento.plazoTotal} días
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (documento.diasUtilizados / documento.plazoTotal) > 0.8 
                          ? 'bg-red-600' 
                          : (documento.diasUtilizados / documento.plazoTotal) > 0.6 
                            ? 'bg-yellow-600' 
                            : 'bg-green-600'
                      }`}
                      style={{ width: `${(documento.diasUtilizados / documento.plazoTotal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {documento.plazoTotal - documento.diasUtilizados} días restantes
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800 mb-1">📅 Recepción</p>
                    <p className="font-medium">{documento.fechaRecepcion}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-800 mb-1">📤 Envío revisión</p>
                    <p className="font-medium">{documento.fechaEnvioRevision}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-800 mb-1">📝 Envío aprobación</p>
                    <p className="font-medium">{documento.fechaEnvioAprobacion}</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-800 mb-1">⏱️ Días usados</p>
                    <p className="font-medium">{documento.diasUtilizados}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprobadorDetailPage;
