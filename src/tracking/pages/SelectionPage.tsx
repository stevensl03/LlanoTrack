import type { JSX } from "react"

const SelectionPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-slate-900">Sistema de Trazabilidad</h1>
                <p className="text-sm text-slate-600">Correspondencia Gubernamental</p>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Control total de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Correspondencia</span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Gestiona el ciclo completo de correos gubernamentales desde la recepción hasta el acuse de recibo. 
              Seguimiento en tiempo real, alertas automáticas y trazabilidad garantizada en cada etapa.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-slate-600">Trazabilidad</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">Real-time</div>
                <div className="text-sm text-slate-600">Seguimiento</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">Auto</div>
                <div className="text-sm text-slate-600">Alertas</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-slate-600">Roles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Características principales</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar correspondencia gubernamental de manera eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Filtrado Inteligente</h3>
            <p className="text-slate-600">
              Recepción automática desde Gmail con filtros por dominios (.gov.co), palabras clave y entidades registradas. Solo los correos relevantes llegan al sistema.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Control de Tiempos</h3>
            <p className="text-slate-600">
              Contador automático de plazos con alertas 3 días antes del vencimiento y notificaciones diarias cuando se excede el tiempo. Control total de cumplimiento.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Workflow de Aprobación</h3>
            <p className="text-slate-600">
              Flujo completo: Redacción → Revisión → Aprobación → Firma Rep. Legal → Envío. Cada etapa con validación automática y registro de responsables.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Notificaciones Automáticas</h3>
            <p className="text-slate-600">
              Alertas vía Gmail en cada cambio de estado. Notificaciones en cadena para todos los involucrados: asignación, revisión, aprobación y envío final.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Dashboard y Reportes</h3>
            <p className="text-slate-600">
              Métricas en tiempo real con gráficos interactivos. Reportes exportables por gestor, entidad, período y cumplimiento. Filtros avanzados para análisis profundo.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Historial Completo</h3>
            <p className="text-slate-600">
              Trazabilidad total de cada correo con registro detallado: fechas, horas, responsables y acciones. Visualización de documentos adjuntos y acuses de recibo.
            </p>
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Flujo del proceso completo</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            10 etapas automatizadas desde la recepción hasta el acuse de recibo
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 transform -translate-x-1/2" />
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      1
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Recepción Automática</h4>
                      <p className="text-sm text-slate-600">Filtrado por API de Gmail</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">El sistema recibe correos automáticamente, filtra por dominios y palabras clave, y almacena toda la información y adjuntos.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:pr-12 lg:order-2">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Clasificación</h4>
                      <p className="text-sm text-slate-600">Integrador</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:order-1 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">El integrador revisa, extrae información clave (entidad, tipo, plazo, urgencia) y registra radicado AZ Digital si aplica.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      3
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Asignación</h4>
                      <p className="text-sm text-slate-600">Integrador</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Asigna el correo al gestor del área correspondiente. Sistema inicia contador de plazo y envía notificación automática.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:pr-12 lg:order-2">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      4
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Redacción</h4>
                      <p className="text-sm text-slate-600">Gestor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:order-1 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Gestor redacta respuesta (externa en Drive), carga documento y anexos al sistema, y envía a revisión seleccionando revisor.</p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      5
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Revisión</h4>
                      <p className="text-sm text-slate-600">Revisor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Revisor descarga, valida y firma digitalmente el documento. Sistema detecta firma automáticamente y cierra ciclo de revisión.</p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:pr-12 lg:order-2">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      6
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Aprobación</h4>
                      <p className="text-sm text-slate-600">Aprobador</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:order-1 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Aprobador da visto bueno final y firma digitalmente. Sistema marca automáticamente como "Aprobada, lista para enviar".</p>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      7
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Firma Rep. Legal</h4>
                      <p className="text-sm text-slate-600">Gestor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Gestor gestiona firma del Representante Legal (proceso externo), escanea documento y lo carga al sistema con radicado de salida.</p>
                </div>
              </div>
            </div>

            {/* Step 8 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:pr-12 lg:order-2">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      8
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Bandeja de Salida</h4>
                      <p className="text-sm text-slate-600">Gestor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:order-1 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Gestor envía a bandeja de salida. Sistema envía documento final y anexos automáticamente al correo corporativo principal.</p>
                </div>
              </div>
            </div>

            {/* Step 9 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      9
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Envío Final</h4>
                      <p className="text-sm text-slate-600">Integrador</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Integrador coordina envío por correo certificado (Servientrega). Sistema actualiza automáticamente estado a "Respondido".</p>
                </div>
              </div>
            </div>

            {/* Step 10 */}
            <div className="relative lg:flex items-center gap-8">
              <div className="lg:w-1/2 lg:pr-12 lg:order-2">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 inline-block">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      10
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-slate-900">Acuse de Recibo</h4>
                      <p className="text-sm text-slate-600">Integrador</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-12 lg:order-1 mt-4 lg:mt-0">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                  <p className="text-slate-700">Integrador registra acuse de recibo. Sistema cierra caso, calcula métricas de cumplimiento y notifica a todos los involucrados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Roles del sistema</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Seis roles especializados para garantizar un proceso eficiente y controlado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Role 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                I
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Integrador</h4>
                <p className="text-xs text-slate-600">Administrador de Correo</p>
              </div>
            </div>SContinue<ul className="text-sm text-slate-700 space-y-2">
              <li>• Recibir y clasificar correos</li>
              <li>• Asignar a gestores</li>
              <li>• Coordinar envío final certificado</li>
              <li>• Registrar acuses de recibo</li>
            </ul>
          </div>
      {/* Role 2 */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Gestor</h4>
            <p className="text-xs text-slate-600">Responsable del Caso</p>
          </div>
        </div>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>• Redactar respuestas</li>
          <li>• Coordinar revisión y aprobación</li>
          <li>• Gestionar firma Rep. Legal</li>
          <li>• Enviar a bandeja de salida</li>
        </ul>
      </div>

      {/* Role 3 */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Revisor</h4>
            <p className="text-xs text-slate-600">Validación de Contenido</p>
          </div>
        </div>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>• Validar y corregir documentos</li>
          <li>• Firma digital de revisión</li>
          <li>• Solicitar correcciones si aplica</li>
          <li>• Acción externa a la plataforma</li>
        </ul>
      </div>

      {/* Role 4 */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Aprobador</h4>
            <p className="text-xs text-slate-600">Visto Bueno Final</p>
          </div>
        </div>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>• Autorizar respuestas finales</li>
          <li>• Firma digital de aprobación</li>
          <li>• Solicitar ajustes si es necesario</li>
          <li>• Acción externa a la plataforma</li>
        </ul>
      </div>

      {/* Role 5 */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Administrador</h4>
            <p className="text-xs text-slate-600">Configuración y Gestión</p>
          </div>
        </div>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>• Gestionar usuarios y roles</li>
          <li>• Configurar entidades y tipos</li>
          <li>• Definir tiempos de respuesta</li>
          <li>• Mantener operatividad del sistema</li>
        </ul>
      </div>

      {/* Role 6 */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Seguimiento</h4>
            <p className="text-xs text-slate-600">Monitoreo y Reportes</p>
          </div>
        </div>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>• Consultar métricas en tiempo real</li>
          <li>• Generar reportes exportables</li>
          <li>• Visualizar historial completo</li>
          <li>• Monitorear cumplimiento de plazos</li>
        </ul>
      </div>
    </div>
  </div>

  {/* CTA Section */}
  <div className="max-w-4xl mx-auto px-6 pb-20">
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center shadow-2xl">
      <h3 className="text-3xl font-bold text-white mb-4">¿Listo para comenzar?</h3>
      <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
        Selecciona tu rol en el menú lateral y accede a las funcionalidades específicas del sistema. 
        Cada rol tiene un panel optimizado para sus responsabilidades.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Ir a Mi Panel
        </button>
        <button className="px-8 py-3 bg-blue-900/40 text-white font-semibold rounded-lg hover:bg-blue-900/60 transition-all duration-300 border-2 border-blue-400">
          Ver Documentación
        </button>
      </div>
    </div>
  </div>

  {/* Quick Reference */}
  <div className="max-w-7xl mx-auto px-6 pb-20">
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Referencia rápida</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">Gmail API</div>
          <p className="text-sm text-slate-600">Única integración directa del sistema</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">10 Etapas</div>
          <p className="text-sm text-slate-600">Desde recepción hasta acuse de recibo</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">Alertas Auto</div>
          <p className="text-sm text-slate-600">3 días antes, al vencer y después</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">100% Trazable</div>
          <p className="text-sm text-slate-600">Registro completo de cada acción</p>
        </div>
      </div>
    </div>
  </div>

  {/* Footer */}
  <footer className="border-t border-slate-200 bg-slate-50/80">
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Sistema de Trazabilidad</p>
            <p className="text-sm text-slate-600">Correspondencia Gubernamental v1.0</p>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Gases del Llano S.A. E.S.P. • Todos los derechos reservados
          </p>
          <p className="text-xs text-slate-500 mt-1">Integración exclusiva con Gmail • AZ Digital, GLPI y Servientrega como procesos externos</p>
        </div>
      </div>
    </div>
  </footer>
</div>
)
}

export default SelectionPage;