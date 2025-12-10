import type { JSX } from "react"

const LandingPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      {/* Logo y Título Principal */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900">LlanoTrack</h1>
            <p className="text-lg text-slate-600">Sistema de Trazabilidad de Correos Electrónicos</p>
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 bg-green-100 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">Versión 1.0 • En producción</span>
            </div>
          </div>
        </div>

        {/* Sección: Descripción General */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Documentación Técnica - LlanoTrack</h2>
            <p className="text-slate-700 mb-4">
              <strong>LlanoTrack</strong> es una plataforma web diseñada para la gestión, monitoreo y trazabilidad 
              del ciclo de vida de las comunicaciones por correo electrónico en <strong>Llano Gas</strong>. 
              Convierte bandejas de entrada desordenadas en un sistema centralizado, automatizado y totalmente auditable.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">🎯 Propósito</h4>
                <p className="text-sm text-blue-700">
                  Análisis completo de la arquitectura, tecnologías y flujos de información del sistema.
                  Documento dirigido a arquitectos de software, desarrolladores y líderes técnicos.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">⚙️ Tecnologías Clave</h4>
                <p className="text-sm text-green-700">
                  Backend: Spring Boot (Java 17), PostgreSQL, Camunda BPM<br/>
                  Frontend: React 19, TypeScript, Vite, Tailwind CSS
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-2">📊 Características</h4>
                <p className="text-sm text-purple-700">
                  Centralización, automatización BPM, trazabilidad completa, dashboards en tiempo real, 
                  control de SLAs y seguridad basada en roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Problema de Negocio */}
        <section className="mb-12">
          <div className="bg-red-50 rounded-2xl p-8 shadow-lg border border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">🔴 Problema de Negocio</h2>
            </div>
            
            <div className="prose prose-slate">
              <p className="text-slate-700 mb-4">
                Las cuentas de correo críticas (contacto@empresa.com, soporte@empresa.com, notificaciones.judiciales@empresa.com) 
                se convierten en puntos ciegos operativos. La gestión manual origina:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">📉 Problemas Operativos</h4>
                  <ul className="text-slate-700 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Pérdida de visibilidad y control:</strong> Sin claridad sobre responsables, estado del correo o atención oportuna</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Incumplimiento de SLAs:</strong> PQR y notificaciones legales con plazos estrictos no cumplidos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Falta de trazabilidad:</strong> Dificultad para reconstruir historial completo de interacciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>Ineficiencia operativa:</strong> Clasificación y seguimiento manual consumen recursos humanos</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">✅ Solución LlanoTrack</h4>
                  <ul className="text-slate-700 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Centralización:</strong> Todas las comunicaciones críticas en una plataforma</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Automatización:</strong> Clasificación, asignación y seguimiento mediante BPM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Trazabilidad completa:</strong> Historial inmutable de cada acción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Analítica en tiempo real:</strong> Monitoreo de SLAs y rendimiento operacional</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Arquitectura del Sistema */}
        <section className="mb-12">
          <div className="bg-blue-50 rounded-2xl p-8 shadow-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">🏗️ Arquitectura del Sistema</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🖥️ Backend (Spring Boot)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Arquitectura:</strong> 3 capas (Controladores, Servicios, Repositorios)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Java 17 LTS:</strong> Entorno empresarial optimizado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Spring Boot:</strong> Marco centralizador con auto-configuración</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Spring Security:</strong> Protección de endpoints con JWT</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Spring Data JPA:</strong> Persistencia ORM con PostgreSQL</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Camunda BPM:</strong> Motor de procesos embebido para orquestación</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>API RESTful:</strong> Stateless, JSON, métodos HTTP semánticos</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🎨 Frontend (React 19)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>React 19:</strong> Enfoque orientado a componentes con Virtual DOM</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>TypeScript:</strong> Tipado estático para estabilidad a largo plazo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>Vite:</strong> Build tool con HMR extremadamente ágil</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>Tailwind CSS:</strong> Framework CSS utilitario para estilizado rápido</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>React Router:</strong> Navegación declarativa SPA</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>Axios:</strong> Cliente HTTP para comunicación con API</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>Recharts:</strong> Librería para gráficos y visualización de datos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">🔗 Componentes Principales</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">🎨</div>
                  <h4 className="font-bold text-slate-800">Frontend React</h4>
                  <p className="text-sm text-slate-600">Interfaz de usuario modular y reactiva</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">⚙️</div>
                  <h4 className="font-bold text-slate-800">Backend Spring</h4>
                  <p className="text-sm text-slate-600">Núcleo lógico con reglas de negocio</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-2">🗄️</div>
                  <h4 className="font-bold text-slate-800">PostgreSQL</h4>
                  <p className="text-sm text-slate-600">Base de datos para persistencia</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">🔄</div>
                  <h4 className="font-bold text-slate-800">Camunda BPM</h4>
                  <p className="text-sm text-slate-600">Motor de orquestación de procesos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Flujo de Proceso */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">🔄 Flujo de Proceso Detallado</h2>
            </div>

            <div className="space-y-6">
              {/* Paso 1 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-700">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">📨 Recepción Automática de Correos</h3>
                    <p className="text-sm text-slate-600">Servicio programado con Jakarta Mail (Angus Mail)</p>
                  </div>
                </div>
                <div className="ml-14">
                  <p className="text-slate-700 mb-3">
                    Un servicio programado en el backend se conecta periódicamente al servidor de correo, 
                    analiza mensajes nuevos y extrae información relevante (remitente, asunto, contenido, adjuntos).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <span className="font-medium text-blue-800">Acciones:</span>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• Creación entidad Correo con radicado único</li>
                        <li>• Persistencia en base de datos</li>
                        <li>• Estado inicial: "Entrada al sistema"</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <span className="font-medium text-green-800">Activación BPM:</span>
                      <ul className="text-green-700 mt-1 space-y-1">
                        <li>• RuntimeService crea instancia de proceso</li>
                        <li>• BusinessKey asocia proceso al correo</li>
                        <li>• Camunda incorpora representación formal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-700">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">🏷️ Clasificación Automática</h3>
                    <p className="text-sm text-slate-600">Tarea de servicio Camunda con delegate Java</p>
                  </div>
                </div>
                <div className="ml-14">
                  <p className="text-slate-700 mb-3">
                    Camunda ejecuta un delegate Java que analiza el asunto y aplica reglas de negocio para 
                    determinar prioridad y categoría. Ejemplo: asunto "URGENTE: Falla en el servicio" → Prioridad alta, categoría PQR.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <span className="font-medium text-purple-800">Variables de Proceso:</span>
                      <ul className="text-purple-700 mt-1 space-y-1">
                        <li>• prioridad = "ALTA"</li>
                        <li>• categoria = "PQR"</li>
                        <li>• grupo_asignado = "GRUPO_PQR"</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <span className="font-medium text-orange-800">Ruta del Proceso:</span>
                      <ul className="text-orange-700 mt-1 space-y-1">
                        <li>• Evaluación en pasarela exclusiva</li>
                        <li>• Correo PQR → Rama específica PQR</li>
                        <li>• Tarea humana asignada a grupo PQR</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-700">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">👥 Gestión por Auditor</h3>
                    <p className="text-sm text-slate-600">Tarea humana en Camunda asignada a grupo</p>
                  </div>
                </div>
                <div className="ml-14">
                  <p className="text-slate-700 mb-3">
                    Camunda registra la tarea en su tabla de tareas activas. El auditor inicia sesión en LlanoTrack, 
                    consulta tareas asignadas a través del endpoint que usa TaskService, y selecciona la tarea "Revisar PQR".
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <span className="font-medium text-blue-800">Frontend:</span>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• Dashboard React muestra tareas</li>
                        <li>• Vista detalle con información completa</li>
                        <li>• Contenido original, historial y acciones</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <span className="font-medium text-green-800">Completar Tarea:</span>
                      <ul className="text-green-700 mt-1 space-y-1">
                        <li>• Auditor registra comentarios</li>
                        <li>• Define departamento asignado</li>
                        <li>• POST al endpoint → TaskService.complete()</li>
                        <li>• Token BPM avanza a siguiente fase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-700">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">✅ Finalización y Trazabilidad</h3>
                    <p className="text-sm text-slate-600">Evento de finalización y auditoría completa</p>
                  </div>
                </div>
                <div className="ml-14">
                  <p className="text-slate-700 mb-3">
                    El proceso alcanza el evento de finalización. Camunda marca la instancia como concluida y 
                    conserva toda la información de auditoría en sus tablas de historial.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <span className="font-medium text-purple-800">Trazabilidad:</span>
                      <ul className="text-purple-700 mt-1 space-y-1">
                        <li>• Consulta completa desde frontend</li>
                        <li>• Reconstrucción detallada de cada transición</li>
                        <li>• Decisiones, acciones humanas y automatizadas</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <span className="font-medium text-green-800">Resultado Final:</span>
                      <ul className="text-green-700 mt-1 space-y-1">
                        <li>• Transparencia y control operativo</li>
                        <li>• Evidencia verificable para auditorías</li>
                        <li>• Historial desde recepción hasta resolución</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Conclusión y Futuro */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6">🚀 Conclusión y Visión Futura</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">✅ Fortalezas Arquitectónicas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-300 mt-1">•</span>
                    <span><strong>Desacoplamiento completo:</strong> Cliente y servidor escalables independientemente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300 mt-1">•</span>
                    <span><strong>Camunda BPM:</strong> Orquestación compleja sin modificar código, trazabilidad integral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300 mt-1">•</span>
                    <span><strong>Backend en capas:</strong> Mantenibilidad y fácil incorporación de desarrolladores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300 mt-1">•</span>
                    <span><strong>Frontend modular:</strong> React + TypeScript, escalable y coherente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300 mt-1">•</span>
                    <span><strong>API REST stateless:</strong> Seguridad JWT, estándares modernos de la industria</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🔮 Evolución Futura</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    <span><strong>WebSockets:</strong> Notificaciones en tiempo real para nuevas tareas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    <span><strong>Analítica avanzada:</strong> Business Intelligence para identificación de cuellos de botella</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    <span><strong>Machine Learning:</strong> Clasificación automática y análisis de sentimiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    <span><strong>CI/CD pipelines:</strong> Automatización de pruebas, validaciones y despliegues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-300 mt-1">•</span>
                    <span><strong>Contenerización:</strong> Docker y Kubernetes para escalabilidad y confiabilidad</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <h3 className="text-xl font-bold mb-4">🏆 Declaración Final</h3>
              <p className="text-blue-100 leading-relaxed">
                LlanoTrack se posiciona como mucho más que una aplicación para gestionar correos: es un sistema 
                integral de automatización y trazabilidad que transforma la manera en que Llano Gas administra y 
                responde sus comunicaciones. Su diseño arquitectónico, alineado con buenas prácticas y apoyado en 
                tecnologías de clase empresarial, ofrece una base fuerte, clara y adaptable, preparada no solo para 
                atender las necesidades actuales, sino también para convertirse en un componente estratégico en la 
                operación futura de la organización.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Informativo */}
        <footer className="bg-slate-100 rounded-2xl p-6 border border-slate-300">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">LlanoTrack - Documentación Técnica</h3>
                <p className="text-sm text-slate-600">Sistema de Trazabilidad de Correos Electrónicos</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-4">
              <strong>Autores:</strong> Steven A. Sanchez, Daniel R. Montero, Javic C. Rojas<br/>
              <strong>Organización:</strong> Gases del Llano S.A. E.S.P.<br/>
              <strong>Versión:</strong> 1.0 • <strong>Estado:</strong> En producción
            </p>
            
            <div className="text-xs text-slate-500 pt-4 border-t border-slate-300">
              <p>© {new Date().getFullYear()} LlanoTrack - Sistema de Trazabilidad de Correos. Todos los derechos reservados.</p>
              <p className="mt-1">Documentación técnica para arquitectos de software, desarrolladores y líderes técnicos.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage