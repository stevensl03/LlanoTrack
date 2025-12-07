import type {
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, CorreoEstado, UserRole, UrgencyLevel
} from '../types/core.types';

// Datos de usuarios
export const mockUsers: User[] = [
  { id: '1', nombre: 'Juan Pérez', email: 'juan@llano.com', rol: 'GESTOR', area: 'Legal', activo: true, createdAt: '2024-01-15', updatedAt: '2024-01-15', telefono: '3001234567', departamento: 'Legal' },
  { id: '2', nombre: 'María López', email: 'maria@llano.com', rol: 'REVISOR', area: 'Administración', activo: true, createdAt: '2024-01-10', updatedAt: '2024-01-10', telefono: '3002345678', departamento: 'Calidad' },
  { id: '3', nombre: 'Carlos Ramírez', email: 'carlos@llano.com', rol: 'APROBADOR', area: 'Gerencia', activo: true, createdAt: '2024-01-05', updatedAt: '2024-01-05', telefono: '3003456789', departamento: 'Gerencia' },
  { id: '4', nombre: 'Ana García', email: 'ana@llano.com', rol: 'INTEGRADOR', area: 'Recepción', activo: true, createdAt: '2024-01-01', updatedAt: '2024-01-01', telefono: '3004567890', departamento: 'Recepción' },
  { id: '5', nombre: 'Pedro Martínez', email: 'pedro@llano.com', rol: 'AUDITOR', area: 'Auditoría', activo: true, createdAt: '2024-01-20', updatedAt: '2024-01-20', telefono: '3005678901', departamento: 'Auditoría' },
  { id: '6', nombre: 'Luisa Fernández', email: 'luisa@llano.com', rol: 'GESTOR', area: 'Técnica', activo: true, createdAt: '2024-01-18', updatedAt: '2024-01-18', telefono: '3006789012', departamento: 'Ingeniería' },
  { id: '7', nombre: 'Roberto Sánchez', email: 'roberto@llano.com', rol: 'REVISOR', area: 'Legal', activo: false, createdAt: '2024-01-12', updatedAt: '2024-01-25', telefono: '3007890123', departamento: 'Legal' },
  { id: '8', nombre: 'Sofía Vargas', email: 'sofia@llano.com', rol: 'ADMIN', area: 'Sistemas', activo: true, createdAt: '2024-01-03', updatedAt: '2024-01-03', telefono: '3008901234', departamento: 'TI' },
];

// Datos de entidades
export const mockEntities: Entity[] = [
  { id: '1', nombre: 'Ministerio de Energía', dominios: ['@minenergia.gov.co', '@gov.co'], responsableId: '1', responsableNombre: 'Juan Pérez', activa: true, createdAt: '2024-01-15', updatedAt: '2024-01-15', codigo: 'MINENERGIA' },
  { id: '2', nombre: 'CREG', dominios: ['@creg.gov.co'], responsableId: '2', responsableNombre: 'María López', activa: true, createdAt: '2024-01-10', updatedAt: '2024-01-10', codigo: 'CREG' },
  { id: '3', nombre: 'ANLA', dominios: ['@anla.gov.co'], responsableId: '6', responsableNombre: 'Luisa Fernández', activa: true, createdAt: '2024-01-05', updatedAt: '2024-01-05', codigo: 'ANLA' },
  { id: '4', nombre: 'UPRA', dominios: ['@upra.gov.co'], responsableId: '1', responsableNombre: 'Juan Pérez', activa: false, createdAt: '2024-01-01', updatedAt: '2024-01-20', codigo: 'UPRA' },
  { id: '5', nombre: 'ANH', dominios: ['@anh.gov.co'], responsableId: '6', responsableNombre: 'Luisa Fernández', activa: true, createdAt: '2024-01-08', updatedAt: '2024-01-08', codigo: 'ANH' },
];

// Datos de tipos de solicitud
export const mockRequestTypes: RequestType[] = [
  { id: '1', tipo: 'Derecho de Petición', plazoDias: 15, urgencia: 'MEDIA', descripcion: 'Petición formal a entidad pública', activo: true, createdAt: '2024-01-15', updatedAt: '2024-01-15', requiereAprobacion: true, requiereRevision: true, diasRecordatorio: 3 },
  { id: '2', tipo: 'Tutela', plazoDias: 3, urgencia: 'ALTA', descripcion: 'Acción de protección de derechos fundamentales', activo: true, createdAt: '2024-01-10', updatedAt: '2024-01-10', requiereAprobacion: true, requiereRevision: true, diasRecordatorio: 1 },
  { id: '3', tipo: 'Consulta', plazoDias: 10, urgencia: 'BAJA', descripcion: 'Consulta general a entidad', activo: true, createdAt: '2024-01-05', updatedAt: '2024-01-05', requiereAprobacion: false, requiereRevision: true, diasRecordatorio: 2 },
  { id: '4', tipo: 'Requerimiento', plazoDias: 5, urgencia: 'MEDIA', descripcion: 'Requerimiento específico de información', activo: true, createdAt: '2024-01-01', updatedAt: '2024-01-01', requiereAprobacion: true, requiereRevision: true, diasRecordatorio: 1 },
  { id: '5', tipo: 'Notificación', plazoDias: 20, urgencia: 'BAJA', descripcion: 'Notificación formal de procedimientos', activo: false, createdAt: '2024-01-20', updatedAt: '2024-01-25', requiereAprobacion: false, requiereRevision: false, diasRecordatorio: 5 },
];

// Generar correos de prueba
const generateCorreos = (): Correo[] => {
  const correos: Correo[] = [];
  const estados: CorreoEstado[] = ['RECEPCION', 'ELABORACION', 'REVISION', 'APROBACION', 'ENVIADO', 'VENCIDO', 'ARCHIVADO'];
  const tipos = mockRequestTypes;
  const entidades = mockEntities;
  const gestores = mockUsers.filter(u => u.rol === 'GESTOR');
  
  for (let i = 1; i <= 50; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const entidad = entidades[Math.floor(Math.random() * entidades.length)];
    const gestor = gestores[Math.floor(Math.random() * gestores.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const diasPlazo = tipo.plazoDias;
    const diasTranscurridos = Math.floor(Math.random() * (diasPlazo + 5));
    const diasRestantes = diasPlazo - diasTranscurridos;
    
    const fechaRecepcion = new Date(Date.now() - diasTranscurridos * 24 * 60 * 60 * 1000).toISOString();
    const fechaVencimiento = new Date(new Date(fechaRecepcion).getTime() + diasPlazo * 24 * 60 * 60 * 1000).toISOString();
    
    correos.push({
      id: i.toString(),
      radicadoEntrada: `322-${String(15000 + i).padStart(5, '0')}-E25`,
      radicadoSalida: i % 2 === 0 ? `322-${String(28000 + i).padStart(5, '0')}-S25` : undefined,
      entidadId: entidad.id,
      entidadNombre: entidad.nombre,
      tipoSolicitudId: tipo.id,
      tipoSolicitudNombre: tipo.tipo,
      asunto: `Solicitud ${tipo.tipo.toLowerCase()} sobre ${['permisos', 'licencias', 'información', 'procedimientos', 'requerimientos'][i % 5]}`,
      remitente: `contacto@${entidad.dominios[0].replace('@', '')}`,
      destinatario: 'info@llanoenergy.com',
      fechaRecepcion,
      fechaVencimiento,
      estado,
      gestorId: gestor.id,
      gestorNombre: gestor.nombre,
      diasTranscurridos,
      diasRestantes: Math.max(-5, diasRestantes),
      createdAt: fechaRecepcion,
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
    });
  }
  
  return correos;
};

export const mockCorreos = generateCorreos();

// Datos de flujo de correos
export const mockFlujos: FlujoCorreo[] = [
  {
    id: '1',
    correoId: '1',
    etapa: 'RECEPCION',
    usuarioNombre: 'Sistema (Automático)',
    fechaInicio: '2024-01-25T08:30:00Z',
    duracion: 0,
    createdAt: '2024-01-25T08:30:00Z',
  },
  {
    id: '2',
    correoId: '1',
    etapa: 'ELABORACION',
    usuarioId: '1',
    usuarioNombre: 'Juan Pérez',
    fechaInicio: '2024-01-25T09:15:00Z',
    fechaFin: '2024-01-26T14:30:00Z',
    duracion: 29.25,
    createdAt: '2024-01-25T09:15:00Z',
  },
  {
    id: '3',
    correoId: '1',
    etapa: 'REVISION',
    usuarioId: '2',
    usuarioNombre: 'María López',
    fechaInicio: '2024-01-26T14:30:00Z',
    fechaFin: '2024-01-27T09:45:00Z',
    duracion: 19.25,
    createdAt: '2024-01-26T14:30:00Z',
  },
  {
    id: '4',
    correoId: '1',
    etapa: 'APROBACION',
    usuarioId: '3',
    usuarioNombre: 'Carlos Ramírez',
    fechaInicio: '2024-01-27T11:00:00Z',
    fechaFin: '2024-01-28T08:20:00Z',
    duracion: 21.33,
    createdAt: '2024-01-27T11:00:00Z',
  },
  {
    id: '5',
    correoId: '1',
    etapa: 'ENVIADO',
    usuarioNombre: 'Sistema',
    fechaInicio: '2024-01-29T10:00:00Z',
    duracion: 0,
    createdAt: '2024-01-29T10:00:00Z',
  },
];

// Datos de métricas
export const mockDashboardMetrics: DashboardMetrics = {
  totalCorreos: 150,
  correosPorEstado: {
    RECEPCION: 12,
    ELABORACION: 23,
    REVISION: 8,
    APROBACION: 5,
    ENVIADO: 89,
    VENCIDO: 12,
    ARCHIVADO: 1,
  },
  correosVencidos: 12,
  correosCumplidos: 125,
  porcentajeCumplimiento: 83.33,
  tiempoPromedioRespuesta: 6.2,
  tiempoPromedioPorEtapa: {
    RECEPCION: 0.5,
    ELABORACION: 3.2,
    REVISION: 1.8,
    APROBACION: 1.2,
    ENVIADO: 0.3,
    VENCIDO: 0,
    ARCHIVADO: 0,
  },
  correosPorEntidad: [
    { entidad: 'Ministerio de Energía', cantidad: 45 },
    { entidad: 'CREG', cantidad: 32 },
    { entidad: 'ANLA', cantidad: 28 },
    { entidad: 'ANH', cantidad: 25 },
    { entidad: 'UPRA', cantidad: 20 },
  ],
  correosPorGestor: [
    { gestor: 'Juan Pérez', cantidad: 42 },
    { gestor: 'Luisa Fernández', cantidad: 38 },
    { gestor: 'María López', cantidad: 35 },
    { gestor: 'Carlos Ramírez', cantidad: 25 },
    { gestor: 'Ana García', cantidad: 10 },
  ],
  tendenciaMensual: [
    { mes: 'Ene', total: 45, cumplidos: 40 },
    { mes: 'Feb', total: 52, cumplidos: 46 },
    { mes: 'Mar', total: 48, cumplidos: 42 },
    { mes: 'Abr', total: 55, cumplidos: 48 },
    { mes: 'May', total: 60, cumplidos: 52 },
    { mes: 'Jun', total: 58, cumplidos: 51 },
  ],
};

// Filtros disponibles
export const availableFilters = {
  gestores: mockUsers.filter(u => u.rol === 'GESTOR').map(u => ({ id: u.id, nombre: u.nombre })),
  entidades: mockEntities.filter(e => e.activa).map(e => ({ id: e.id, nombre: e.nombre })),
  estados: ['RECEPCION', 'ELABORACION', 'REVISION', 'APROBACION', 'ENVIADO', 'VENCIDO', 'ARCHIVADO'] as CorreoEstado[],
  tiposSolicitud: mockRequestTypes.filter(t => t.activo).map(t => ({ id: t.id, tipo: t.tipo })),
  urgencias: ['BAJA', 'MEDIA', 'ALTA'] as UrgencyLevel[],
};

// Exportar todos los datos
export const mockData = {
  users: mockUsers,
  entities: mockEntities,
  requestTypes: mockRequestTypes,
  correos: mockCorreos,
  flujos: mockFlujos,
  dashboardMetrics: mockDashboardMetrics,
  filters: availableFilters,
};