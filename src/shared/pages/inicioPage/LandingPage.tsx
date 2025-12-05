import type { JSX } from "react"

const LandingPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header y Navegación */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Sistema de Trazabilidad</h1>
                <p className="text-xs text-slate-600">Correos Electrónicos Gubernamentales</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#caracteristicas" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Características</a>
              <a href="#flujo" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Flujo del Proceso</a>
              <a href="#roles" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Roles</a>
              <a href="#integraciones" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Integraciones</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section con Introducción */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-slate-700">Versión 1.0 • En producción</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Sistema de Trazabilidad de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Correos Electrónicos Gubernamentales
              </span>
            </h1>
            
            <div className="prose prose-lg mx-auto mb-10">
              <p className="text-xl text-slate-700 leading-relaxed">
                Plataforma integral para el control y seguimiento completo del ciclo de vida de correos 
                especiales (<code className="text-blue-600">.gov.co</code>, entidades gubernamentales) desde su 
                recepción hasta la respuesta final. Sistema diseñado para garantizar trazabilidad absoluta, 
                cumplimiento de plazos legales y eficiencia en procesos de correspondencia oficial.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-sm text-slate-600">Etapas del flujo</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-slate-600">Roles especializados</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-slate-600">Trazabilidad</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">Gmail API</div>
                <div className="text-sm text-slate-600">Integración principal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Problema y Solución */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">El Problema</h2>
              </div>
              <div className="prose prose-slate">
                <p className="text-slate-700 mb-4">
                  Las entidades gubernamentales y empresas del sector público manejan diariamente una gran 
                  cantidad de correos oficiales que requieren seguimiento estricto. La falta de un sistema 
                  centralizado genera:
                </p>
                <ul className="text-slate-700 space-y-2">
                  <li>• Pérdida de trazabilidad en el proceso de respuesta</li>
                  <li>• Incumplimiento de plazos legales establecidos</li>
                  <li>• Dificultad para localizar documentos y acuses de recibo</li>
                  <li>• Falta de métricas sobre tiempos de respuesta y eficiencia</li>
                  <li>• Procesos manuales propensos a errores humanos</li>
                  <li>• Dificultad en la auditoría y rendición de cuentas</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Nuestra Solución</h2>
              </div>
              <div className="prose prose-slate">
                <p className="text-slate-700 mb-4">
                  Sistema especializado que automatiza y controla el ciclo completo de gestión de 
                  correos gubernamentales mediante:
                </p>
                <ul className="text-slate-700 space-y-2">
                  <li>• Integración directa con Gmail para recepción automática</li>
                  <li>• Workflow estructurado de 10 etapas con validaciones</li>
                  <li>• Sistema de alertas inteligentes para cumplimiento de plazos</li>
                  <li>• Trazabilidad completa con historial de acciones</li>
                  <li>• Dashboard en tiempo real con métricas de desempeño</li>
                  <li>• Control de versiones y firma digital de documentos</li>
                  <li>• Reportes exportables para auditoría y análisis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Características Principales */}
      <section id="caracteristicas" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Características Técnicas del Sistema</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plataforma diseñada para cumplir con los requisitos de transparencia, trazabilidad y 
              eficiencia en la gestión de correspondencia gubernamental
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Flujo del Proceso Detallado */}
      <section id="flujo" className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Flujo del Proceso: 10 Etapas Detalladas</h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              Cada correo gubernamental atraviesa un proceso estructurado que garantiza trazabilidad, 
              cumplimiento de plazos y calidad en las respuestas oficiales
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <div className="sticky top-24 bg-white rounded-xl p-6 shadow-md border border-slate-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{step.title}</h3>
                          <p className="text-sm text-slate-600">{step.role}</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                        <span className="font-medium">Duración estimada:</span> {step.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                      <div className="prose prose-slate max-w-none">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Descripción del proceso</h4>
                        <p className="text-slate-700 mb-6">{step.description}</p>
                        
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                          <h5 className="font-medium text-blue-800 mb-2">Acciones automatizadas del sistema:</h5>
                          <ul className="text-blue-700 text-sm space-y-1">
                            {step.automatedActions.map((action, i) => (
                              <li key={i}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 rounded-lg p-4">
                            <h5 className="font-medium text-slate-800 mb-2">Entradas:</h5>
                            <ul className="text-slate-600 text-sm space-y-1">
                              {step.inputs.map((input, i) => (
                                <li key={i}>• {input}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-4">
                            <h5 className="font-medium text-slate-800 mb-2">Salidas:</h5>
                            <ul className="text-slate-600 text-sm space-y-1">
                              {step.outputs.map((output, i) => (
                                <li key={i}>• {output}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Roles del Sistema */}
      <section id="roles" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Roles y Responsabilidades del Sistema</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Estructura organizacional diseñada para garantizar la correcta ejecución del workflow 
              con especialización y separación de funciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="bg-gradient-to-b from-white to-slate-50 rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                    <p className="text-sm text-slate-600">{role.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Responsabilidades principales:</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i}>• {resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Permisos del sistema:</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {role.permissions.map((perm, i) => (
                        <li key={i}>• {perm}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Acceso:</span> {role.access}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Integraciones */}
      <section id="integraciones" className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Arquitectura e Integraciones del Sistema</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plataforma diseñada para interoperar con sistemas existentes manteniendo la seguridad 
              y trazabilidad requerida en entornos gubernamentales
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Integraciones Directas</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-green-700">G</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Google Gmail API</h4>
                    <p className="text-sm text-slate-600">
                      Conexión bidireccional para recepción automática, envío de notificaciones 
                      y gestión de correos. OAuth 2.0 para autenticación segura.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-orange-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Procesos Externos</h3>
              </div>
              <div className="space-y-4">
                {externalProcesses.map((process, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-orange-700">{process.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{process.title}</h4>
                      <p className="text-sm text-slate-600">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Métricas y Reportes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Sistema de Métricas y Reportes</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Dashboard en tiempo real con indicadores clave para monitoreo de desempeño y toma de decisiones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {metric.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{metric.title}</h4>
                    <p className="text-xs text-slate-600">{metric.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Reportes Exportables</h3>
              <p className="text-blue-100 mb-6">
                Generación automática de reportes en formato Excel y PDF para análisis detallado:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/30 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Reporte de Cumplimiento</h4>
                  <p className="text-sm text-blue-100">Por entidad, tipo y gestor</p>
                </div>
                <div className="bg-blue-500/30 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Reporte de Tiempos</h4>
                  <p className="text-sm text-blue-100">Análisis de eficiencia por etapa</p>
                </div>
                <div className="bg-blue-500/30 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Reporte Auditoría</h4>
                  <p className="text-sm text-blue-100">Trazabilidad completa por caso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sistema de Trazabilidad</h3>
                  <p className="text-blue-200 text-sm">Versión 1.0 Final</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm">
                Plataforma especializada para la gestión de correspondencia gubernamental 
                con enfoque en trazabilidad, cumplimiento y eficiencia.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Documentación Técnica</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">• Manual de Usuario</a></li>
                <li><a href="#" className="hover:text-white transition-colors">• Guía de Implementación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">• API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">• Políticas de Seguridad</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Información de Contacto</h4>
              <div className="text-slate-300 text-sm space-y-2">
                <p>© {new Date().getFullYear()} Gases del Llano S.A. E.S.P.</p>
                <p>Todos los derechos reservados</p>
                <p className="pt-4 text-xs text-slate-400">
                  Sistema desarrollado para cumplimiento de normativa gubernamental 
                  colombiana en gestión de correspondencia oficial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Datos de características
const features = [
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
    title: "Filtrado Inteligente",
    description: "Integración directa con API de Gmail para recepción automática de correos. Sistema de filtros por dominios (.gov.co), palabras clave específicas y entidades gubernamentales registradas en el sistema."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Control de Plazos",
    description: "Sistema de contadores automáticos con alertas configurables: 3 días antes del vencimiento, al día del vencimiento y alertas diarias post-vencimiento. Cálculo automático de cumplimiento."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "Workflow Validado",
    description: "Flujo estructurado de 10 etapas con validaciones automáticas. Sistema de firmas digitales detectadas automáticamente. Control de versiones de documentos y anexos."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    title: "Notificaciones en Cadena",
    description: "Sistema de notificaciones automáticas vía Gmail para todos los involucrados en cada cambio de estado. Alertas configuradas por roles y niveles de urgencia."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Dashboard en Tiempo Real",
    description: "Panel de control interactivo con métricas actualizadas automáticamente. Gráficos, tablas y filtros avanzados para análisis de desempeño y cumplimiento."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: "Trazabilidad Completa",
    description: "Historial detallado de cada caso con registro de fechas, horas, responsables y acciones. Visualización completa de documentos adjuntos y estados del proceso."
  }
]

// Datos del flujo del proceso
const processSteps = [
  {
    number: "1",
    title: "Recepción Automática",
    role: "Sistema Automático",
    duration: "Inmediato",
    description: "El sistema se conecta vía API de Gmail al buzón corporativo configurado y realiza filtrado automático de correos entrantes. Solo los correos que cumplen con los criterios de dominios (.gov.co) y palabras clave previamente configuradas son capturados por el sistema.",
    automatedActions: [
      "Conexión segura a API de Gmail",
      "Filtrado por dominios y palabras clave",
      "Descarga automática de adjuntos",
      "Registro de metadatos del correo",
      "Almacenamiento en base de datos"
    ],
    inputs: [
      "Correos entrantes en buzón corporativo",
      "Configuración de filtros del sistema",
      "Lista de dominios y palabras clave"
    ],
    outputs: [
      "Correo registrado en sistema con estado 'Recibido'",
      "Adjuntos almacenados en repositorio seguro",
      "Metadatos completos del correo"
    ]
  },
  {
    number: "2",
    title: "Clasificación Manual",
    role: "Integrador",
    duration: "5-15 minutos",
    description: "El integrador revisa manualmente el correo recibido, analiza su contenido y los documentos adjuntos (generalmente PDFs oficiales) para extraer información clave que determinará el flujo del proceso.",
    automatedActions: [
      "Presentación de interfaz de clasificación",
      "Sugerencias de entidad basadas en remitente",
      "Cálculo automático de plazo según tipo",
      "Registro de acciones en historial"
    ],
    inputs: [
      "Correo filtrado del sistema",
      "Documentos adjuntos PDF",
      "Información del remitente"
    ],
    outputs: [
      "Correo clasificado con entidad, tipo y plazo",
      "Radicado de entrada registrado (si aplica)",
      "Nivel de urgencia asignado"
    ]
  },
  {
    number: "3",
    title: "Asignación a Gestor",
    role: "Integrador",
    duration: "2-5 minutos",
    description: "El integrador asigna el correo clasificado al gestor responsable según el área o proceso correspondiente. El sistema inicia automáticamente el contador de tiempo para el cumplimiento del plazo establecido.",
    automatedActions: [
      "Lista de gestores por área/proceso",
      "Inicio automático de contador de plazo",
      "Notificación automática vía Gmail al gestor",
      "Cambio de estado a 'Asignado'",
      "Registro en historial de asignación"
    ],
    inputs: [
      "Correo clasificado",
      "Gestor seleccionado según área",
      "Plazo establecido en clasificación"
    ],
    outputs: [
      "Correo asignado a gestor específico",
      "Notificación enviada al gestor",
      "Contador de tiempo iniciado"
    ]
  },
  {
    number: "4",
    title: "Redacción de Respuesta",
    role: "Gestor",
    duration: "Variable según complejidad",
    description: "El gestor analiza el caso, redacta la respuesta oficial (proceso externo en Google Drive) y carga al sistema el borrador del documento con los anexos correspondientes. El documento debe incluir campos predefinidos para firmas digitales.",
    automatedActions: [
      "Visualización de contador de tiempo restante",
      "Alertas de vencimiento (3 días antes)",
      "Sistema de carga de documentos",
      "Control de versiones de archivos",
      "Registro de fecha inicio redacción"
    ],
    inputs: [
      "Correo original y adjuntos",
      "Información de clasificación",
      "Documento borrador de respuesta"
    ],
    outputs: [
      "Documento borrador cargado al sistema",
      "Anexos adicionales (si aplican)",
      "Estado cambiado a 'En Redacción'"
    ]
  },
  {
    number: "5",
    title: "Revisión de Contenido",
    role: "Revisor",
    duration: "1-2 días hábiles",
    description: "El revisor descarga el documento, realiza validaciones de contenido y procedimiento, e incorpora su firma digital en el campo correspondiente. El sistema detecta automáticamente la firma mediante análisis del documento.",
    automatedActions: [
      "Notificación automática al revisor",
      "Detección automática de firma digital",
      "Cierre automático de ciclo de revisión",
      "Registro de fecha/hora de revisión",
      "Envío de notificación al gestor"
    ],
    inputs: [
      "Documento borrador del gestor",
      "Correo original y contexto",
      "Firma digital del revisor"
    ],
    outputs: [
      "Documento revisado y firmado",
      "Comentarios de revisión (si aplican)",
      "Estado actualizado a 'Revisión Completada'"
    ]
  },
  {
    number: "6",
    title: "Aprobación Final",
    role: "Aprobador",
    duration: "1 día hábil",
    description: "El aprobador da el visto bueno final al documento revisado, incorporando su firma digital en el campo correspondiente. El sistema detecta automáticamente esta firma y marca el documento como listo para el siguiente paso.",
    automatedActions: [
      "Notificación automática al aprobador",
      "Detección automática de firma de aprobación",
      "Marcado automático como 'Aprobado'",
      "Registro de fecha/hora de aprobación",
      "Envío de notificación al gestor"
    ],
    inputs: [
      "Documento revisado y firmado",
      "Firma digital del aprobador",
      "Contexto completo del caso"
    ],
    outputs: [
      "Documento aprobado y firmado",
      "Estado actualizado a 'Aprobado, listo para enviar'",
      "Registro completo de aprobación"
    ]
  },
  {
    number: "7",
    title: "Firma Representación Legal",
    role: "Gestor (Proceso externo)",
    duration: "Variable según disponibilidad",
    description: "Proceso físico externo al sistema donde el gestor lleva el documento impreso al Representante Legal para firma física. Posteriormente, el documento escaneado con todas las firmas es cargado al sistema.",
    automatedActions: [
      "Registro de fecha/hora de carga",
      "Verificación de firmas completas",
      "Actualización de estado del caso",
      "Posibilidad de registro de radicado salida"
    ],
    inputs: [
      "Documento aprobado impreso",
      "Firma física de Representante Legal",
      "Documento escaneado final"
    ],
    outputs: [
      "Documento final firmado por todas las partes",
      "Estado actualizado a 'Firmado, listo para envío'",
      "Radicado de salida registrado (si aplica)"
    ]
  },
  {
    number: "8",
    title: "Envío a Bandeja de Salida",
    role: "Gestor",
    duration: "5-10 minutos",
    description: "El gestor envía el documento final y todos los anexos a la bandeja de salida del sistema. El sistema envía automáticamente estos documentos al correo corporativo principal, listos para el envío certificado.",
    automatedActions: [
      "Envío automático a correo corporativo",
      "Actualización de estado del caso",
      "Registro de fecha/hora de envío",
      "Notificación automática al integrador"
    ],
    inputs: [
      "Documento final firmado",
      "Anexos finales",
      "Información de contacto del destinatario"
    ],
    outputs: [
      "Documento en bandeja de salida del correo",
      "Estado actualizado a 'En bandeja de salida'",
      "Notificación enviada al integrador"
    ]
  },
  {
    number: "9",
    title: "Envío Certificado Final",
    role: "Integrador",
    duration: "15-30 minutos",
    description: "El integrador gestiona el envío físico a través del servicio de correo certificado (Servientrega). Este proceso es externo al sistema, pero al realizarse el envío, se actualiza el estado en la plataforma.",
    automatedActions: [
      "Actualización automática de estado",
      "Registro de fecha/hora de envío",
      "Posibilidad de registro de número de guía",
      "Notificación automática a todos los involucrados"
    ],
    inputs: [
      "Documento de bandeja de salida",
      "Datos de envío certificado",
      "Número de guía (opcional)"
    ],
    outputs: [
      "Documento enviado físicamente",
      "Estado actualizado a 'Respondido'",
      "Registro de guía de seguimiento",
      "Notificaciones de envío completado"
    ]
  },
  {
    number: "10",
    title: "Acuse de Recibo y Cierre",
    role: "Integrador",
    duration: "Variable según entidad",
    description: "Cuando se recibe confirmación de la entidad destinataria (acuse de correo certificado o confirmación electrónica), el integrador carga el soporte y registra la recepción. El sistema calcula automáticamente las métricas finales de cumplimiento.",
    automatedActions: [
      "Cálculo automático de días utilizados",
      "Determinación automática de cumplimiento",
      "Cálculo de porcentaje de uso del plazo",
      "Cierre automático del caso",
      "Notificación final a todos los involucrados"
    ],
    inputs: [
      "Soporte de acuse de recibo",
      "Fecha de recepción por entidad",
      "Información completa del caso"
    ],
    outputs: [
      "Caso cerrado con métricas finales",
      "Estado final: 'Recibido por entidad'",
      "Reporte de cumplimiento generado",
      "Notificaciones de cierre enviadas"
    ]
  }
]

// Datos de roles
const roles = [
  {
    icon: "I",
    title: "Integrador",
    subtitle: "Administrador de Correo",
    responsibilities: [
      "Clasificación inicial de correos recibidos",
      "Extracción de información clave de documentos",
      "Asignación a gestores por área/proceso",
      "Coordinación de envío certificado final",
      "Registro de acuses de recibo"
    ],
    permissions: [
      "Acceso completo a recepción de correos",
      "Permisos de clasificación y asignación",
      "Registro de envíos y acuses",
      "Consulta de historial completo",
      "Acceso limitado a dashboard"
    ],
    access: "Acceso completo al módulo de recepción y envío"
  },
  {
    icon: "G",
    title: "Gestor",
    subtitle: "Responsable del Caso",
    responsibilities: [
      "Redacción de respuestas oficiales",
      "Coordinación del workflow completo",
      "Carga de documentos y anexos",
      "Gestión de firma de Representante Legal",
      "Envío a bandeja de salida"
    ],
    permissions: [
      "Gestión de casos asignados",
      "Carga y descarga de documentos",
      "Envío a revisión y aprobación",
      "Consulta de historial del caso",
      "Acceso a contadores de tiempo"
    ],
    access: "Acceso a casos asignados y módulos correspondientes"
  },
  {
    icon: "R",
    title: "Revisor",
    subtitle: "Validación de Contenido",
    responsibilities: [
      "Validación técnica y legal del contenido",
      "Corrección de documentos cuando sea necesario",
      "Firma digital de revisión",
      "Solicitud de correcciones específicas",
      "Coordinación con equipo legal (GLPI)"
    ],
    permissions: [
      "Descarga de documentos para revisión",
      "Registro de observaciones",
      "Consulta de contexto del caso",
      "Acceso a módulo de revisión asignado",
      "Sin permisos de edición directa"
    ],
    access: "Acceso externo para revisión y firma digital"
  },
  {
    icon: "A",
    title: "Aprobador",
    subtitle: "Visto Bueno Final",
    responsibilities: [
      "Aprobación formal de respuestas",
      "Validación de cumplimiento normativo",
      "Firma digital de aprobación",
      "Solicitud de ajustes finales",
      "Autorización para firma legal"
    ],
    permissions: [
      "Descarga de documentos para aprobación",
      "Registro de aprobación/ajustes",
      "Consulta completa del caso",
      "Acceso a módulo de aprobación",
      "Sin permisos de modificación"
    ],
    access: "Acceso externo para aprobación y firma digital"
  },
  {
    icon: "S",
    title: "Administrador",
    subtitle: "Configuración del Sistema",
    responsibilities: [
      "Gestión de usuarios y permisos",
      "Configuración de entidades y tipos",
      "Definición de tiempos de respuesta",
      "Mantenimiento de parámetros del sistema",
      "Supervisión de operatividad general"
    ],
    permissions: [
      "Acceso completo a configuración",
      "Gestión de usuarios y roles",
      "Definición de parámetros del sistema",
      "Supervisión de métricas globales",
      "Acceso a logs y auditoría"
    ],
    access: "Acceso completo a todos los módulos del sistema"
  },
  {
    icon: "M",
    title: "Seguimiento",
    subtitle: "Monitoreo y Auditoría",
    responsibilities: [
      "Monitoreo de cumplimiento de plazos",
      "Generación de reportes y análisis",
      "Auditoría de procesos completados",
      "Identificación de cuellos de botella",
      "Propuestas de mejora de procesos"
    ],
    permissions: [
      "Acceso completo a dashboard",
      "Generación de reportes exportables",
      "Consulta de historial completo",
      "Análisis de métricas y tendencias",
      "Sin permisos de modificación"
    ],
    access: "Acceso de solo lectura a todos los módulos"
  }
]

// Datos de procesos externos
const externalProcesses = [
  {
    icon: "AZ",
    title: "AZ Digital",
    description: "Sistema de radicación documental externo. Los números de radicado de entrada y salida se ingresan manualmente en el sistema para mantener la trazabilidad cruzada."
  },
  {
    icon: "GL",
    title: "GLPI",
    description: "Sistema de gestión de servicios TI utilizado para revisiones legales. Cuando un documento requiere validación legal, se crea un ticket en GLPI que se gestiona externamente."
  },
  {
    icon: "SV",
    title: "Servientrega",
    description: "Plataforma de correo certificado para envío físico de documentos. El proceso de envío y seguimiento se gestiona completamente fuera del sistema."
  },
  {
    icon: "GD",
    title: "Google Drive",
    description: "Plataforma externa para creación y edición de documentos oficiales. Los gestores redactan las respuestas en Drive y luego cargan los archivos al sistema."
  }
]

// Datos de métricas
const metrics = [
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Cumplimiento de Plazos",
    subtitle: "Indicador clave",
    description: "Porcentaje de casos respondidos dentro del plazo legal establecido. Incluye análisis por tipo de solicitud y entidad remitente."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Tiempo Promedio",
    subtitle: "Eficiencia del proceso",
    description: "Tiempo promedio desde recepción hasta respuesta final. Análisis por etapa y comparativa histórica mensual."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: "Carga por Gestor",
    subtitle: "Distribución de trabajo",
    description: "Número de casos activos y completados por gestor. Identificación de sobrecarga y balanceo de distribución."
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    title: "Tipos de Solicitud",
    subtitle: "Análisis por categoría",
    description: "Distribución de casos por tipo de solicitud y nivel de urgencia. Identificación de patrones y tendencias."
  }
]

export default LandingPage