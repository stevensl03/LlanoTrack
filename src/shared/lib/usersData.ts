// @ts-ignore
import DataPruebaJSON from './DataPruebJSON.json'

// ============================================
// TIPOS Y INTERFACES
// ============================================

export type EstadoCorreo = 'PENDIENTE' | 'VENCIDO' | 'RESPONDIDO';
export type EtapaFlujo = 'GESTION' | 'REVISION' | 'APROBACION';

export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  numeroCelular: string;
  correo: string;
  password: string;
  activo: boolean;
  fechaCreacion: string;
}

export interface Entidad {
  id: number;
  nombreEntidad: string;
  dominioCorreo: string;
}

export interface Dependencia {
  id: number;
  nombreDependencia: string;
  correoDependencia: string;
  entidadId: number;
}

export interface DependenciaConEntidad extends Omit<Dependencia, 'entidadId'> {
  entidad: Entidad | null;
}

export interface Rol {
  id: number;
  nombreRol: string;
}

export interface TipoSolicitud {
  id: number;
  nombre: string;
}

export interface Correo {
  idProcess: string;
  asunto: string;
  cuerpoTexto: string;
  estado: EstadoCorreo;
  fechaRecepcion: string;
  fechaRespuesta: string | null;
  plazoRespuestaEnDias: number;
  radicadoEntrada: string;
  radicadoSalida: string | null;
  dependencialId: number;
  tipoSolicitudId: number;
}

export interface CorreoCompleto extends Omit<Correo, 'dependencialId' | 'tipoSolicitudId'> {
  dependencia: DependenciaConEntidad | null;
  tipoSolicitud: TipoSolicitud | null;
  flujo: FlujoCorreoCompleto | null;
  vencido: boolean;
}

export interface FlujoCorreo {
  id: number;
  correold: string;
  usuarioId: number;
  etapa: EtapaFlujo;
  fechaAsignacion: string;
  fechaFinalizacion: string | null;
}

export interface FlujoCorreoCompleto extends Omit<FlujoCorreo, 'correold' | 'usuarioId'> {
  correo: CorreoCompleto | null;
  usuario: Usuario | null;
}

export interface CredencialesValidadas {
  success: boolean;
  message?: string;
  usuario?: Usuario;
}

export interface EstadisticasCorreos {
  total: number;
  porEstado: Record<EstadoCorreo, number>;
  porTipoSolicitud: Array<{ tipo: string; cantidad: number }>;
  vencidosCalculados: number;
  conRespuesta: number;
  sinRespuesta: number;
}

export interface EstadisticasUsuarios {
  total: number;
  activos: number;
  inactivos: number;
  flujosActivosPorUsuario: Array<{
    usuario: string;
    flujosActivos: number;
    flujosFinalizados: number;
  }>;
}

export interface EstadisticasFlujos {
  total: number;
  activos: number;
  finalizados: number;
  porEtapa: Record<EtapaFlujo, number>;
  tiempoPromedioFinalizacion: number;
}

export interface DashboardData {
  estadisticasCorreos: EstadisticasCorreos;
  estadisticasUsuarios: EstadisticasUsuarios;
  estadisticasFlujos: EstadisticasFlujos;
  correosRecientes: CorreoCompleto[];
  flujosActivos: FlujoCorreoCompleto[];
  correosVencidos: CorreoCompleto[];
}

// ============================================
// DATOS MAESTROS
// ============================================

const usuarios: Usuario[] = DataPruebaJSON.usuarios.map((usuario) => ({
  id: usuario.id,
  nombres: usuario.nombres,
  apellidos: usuario.apellidos,
  numeroCelular: usuario.numeroCelular,
  correo: usuario.correo,
  password: usuario.password,
  activo: usuario.activo,
  fechaCreacion: usuario.fechaCreacion,
}));

const entidades: Entidad[] = DataPruebaJSON.entidades.map((entidad) => ({
  id: entidad.id,
  nombreEntidad: entidad.nombreEntidad,
  dominioCorreo: entidad.dominioCorreo,
}));

const dependencias: Dependencia[] = DataPruebaJSON.dependencias.map((dependencia) => ({
  id: dependencia.id,
  nombreDependencia: dependencia.nombreDependencia,
  correoDependencia: dependencia.correoDependencia,
  entidadId: dependencia.entidadId,
}));

const roles: Rol[] = DataPruebaJSON.roles.map((rol) => ({
  id: rol.id,
  nombreRol: rol.nombreRol,
}));

const tiposSolicitud: TipoSolicitud[] = DataPruebaJSON.tipoSolicitud.map((tipo) => ({
  id: tipo.id,
  nombre: tipo.nombre,
}));

const correos: Correo[] = DataPruebaJSON.correos.map((correo) => ({
  idProcess: correo.idProcess,
  asunto: correo.asunto,
  cuerpoTexto: correo.cuerpoTexto,
  estado: correo.estado as EstadoCorreo,
  fechaRecepcion: correo.fechaRecepcion,
  fechaRespuesta: correo.fechaRespuesta,
  plazoRespuestaEnDias: correo.plazoRespuestaEnDías,
  radicadoEntrada: correo.radicadoEntrada,
  radicadoSalida: correo.radicadoSalida,
  dependencialId: correo.dependencialId,
  tipoSolicitudId: correo.tipoSolicitudId,
}));


const flujoCorreos: FlujoCorreo[] = DataPruebaJSON.flujoCorreos.map((flujo) => ({
  id: flujo.id,
  correold: flujo.correold,
  usuarioId: flujo.usuarioId,
  etapa: flujo.etapa as EtapaFlujo,
  fechaAsignacion: flujo.fechaAsignacion,
  fechaFinalizacion: flujo.fechaFinalizacion,
}));

// ============================================
// FUNCIONES AUXILIARES
// ============================================

const getEntidadById = (id: number): Entidad | null => {
  return entidades.find(e => e.id === id) || null;
};

const getDependenciaById = (id: number): DependenciaConEntidad | null => {
  const dependencia = dependencias.find(d => d.id === id);
  if (!dependencia) return null;
  
  return {
    id: dependencia.id,
    nombreDependencia: dependencia.nombreDependencia,
    correoDependencia: dependencia.correoDependencia,
    entidad: getEntidadById(dependencia.entidadId)
  };
};

const getTipoSolicitudById = (id: number): TipoSolicitud | null => {
  return tiposSolicitud.find(t => t.id === id) || null;
};

const getUsuarioById = (id: number): Usuario | null => {
  return usuarios.find(u => u.id === id) || null;
};

const getCorreoById = (id: string): Correo | null => {
  return correos.find(c => c.idProcess === id) || null;
};

const getFlujoByCorreoId = (correoId: string): FlujoCorreo | null => {
  return flujoCorreos.find(f => f.correold === correoId) || null;
};

const isCorreoVencido = (correo: Correo): boolean => {
  if (correo.estado !== 'PENDIENTE') return false;
  
  const fechaRecepcion = new Date(correo.fechaRecepcion);
  const fechaLimite = new Date(fechaRecepcion);
  fechaLimite.setDate(fechaLimite.getDate() + correo.plazoRespuestaEnDias);
  const now = new Date();
  
  return fechaLimite < now;
};

const crearCorreoCompleto = (correo: Correo): CorreoCompleto => {
  const flujo = getFlujoByCorreoId(correo.idProcess);
  
  return {
    idProcess: correo.idProcess,
    asunto: correo.asunto,
    cuerpoTexto: correo.cuerpoTexto,
    estado: correo.estado,
    fechaRecepcion: correo.fechaRecepcion,
    fechaRespuesta: correo.fechaRespuesta,
    plazoRespuestaEnDias: correo.plazoRespuestaEnDias,
    radicadoEntrada: correo.radicadoEntrada,
    radicadoSalida: correo.radicadoSalida,
    dependencia: getDependenciaById(correo.dependencialId),
    tipoSolicitud: getTipoSolicitudById(correo.tipoSolicitudId),
    flujo: flujo ? crearFlujoCorreoCompleto(flujo) : null,
    vencido: isCorreoVencido(correo)
  };
};

const crearFlujoCorreoCompleto = (flujo: FlujoCorreo): FlujoCorreoCompleto => {
  const correo = getCorreoById(flujo.correold);
  
  return {
    id: flujo.id,
    etapa: flujo.etapa,
    fechaAsignacion: flujo.fechaAsignacion,
    fechaFinalizacion: flujo.fechaFinalizacion,
    correo: correo ? crearCorreoCompleto(correo) : null,
    usuario: getUsuarioById(flujo.usuarioId)
  };
};

// ============================================
// FUNCIONES DE USUARIOS Y AUTENTICACIÓN
// ============================================

export const getUsersDataCredentials = () => {
  return { usuarios };
};

export const getUsuarioByIdPublic = (userId: number): Usuario | null => {
  return getUsuarioById(userId);
};

export const getUsuarioByEmail = (email: string): Usuario | null => {
  const usuario = usuarios.find(u => u.correo.toLowerCase() === email.toLowerCase());
  return usuario || null;
};

export const validateUserCredentials = (email: string, password: string): CredencialesValidadas => {
  const usuario = usuarios.find(u => 
    u.correo.toLowerCase() === email.toLowerCase() && 
    u.password === password &&
    u.activo
  );
  
  if (!usuario) {
    return { 
      success: false, 
      message: "Credenciales inválidas o usuario inactivo" 
    };
  }
  
  return {
    success: true,
    usuario
  };
};

export const getActiveUsers = (): Usuario[] => {
  return usuarios.filter(u => u.activo);
};

export const getInactiveUsers = (): Usuario[] => {
  return usuarios.filter(u => !u.activo);
};

// ============================================
// FUNCIONES DE ROLES
// ============================================

export const getRolById = (rolId: number): Rol | null => {
  return roles.find(r => r.id === rolId) || null;
};

export const getAllRoles = (): Rol[] => {
  return roles;
};

// ============================================
// FUNCIONES DE ENTIDADES Y DEPENDENCIAS
// ============================================

export const getEntidadByIdPublic = (entidadId: number): Entidad | null => {
  return getEntidadById(entidadId);
};

export const getAllEntidades = (): Entidad[] => {
  return entidades;
};

export const getDependenciaByIdPublic = (dependenciaId: number): DependenciaConEntidad | null => {
  return getDependenciaById(dependenciaId);
};

export const getDependenciasByEntidad = (entidadId: number): DependenciaConEntidad[] => {
  return dependencias
    .filter(d => d.entidadId === entidadId)
    .map(dependencia => getDependenciaById(dependencia.id)!);
};

export const getAllDependencias = (): DependenciaConEntidad[] => {
  return dependencias.map(dependencia => getDependenciaById(dependencia.id)!);
};

// ============================================
// FUNCIONES DE TIPOS DE SOLICITUD
// ============================================

export const getTipoSolicitudByIdPublic = (tipoId: number): TipoSolicitud | null => {
  return getTipoSolicitudById(tipoId);
};

export const getAllTiposSolicitud = (): TipoSolicitud[] => {
  return tiposSolicitud;
};

// ============================================
// FUNCIONES DE CORREOS
// ============================================

export const getAllCorreos = (): CorreoCompleto[] => {
  return correos.map(correo => crearCorreoCompleto(correo));
};

export const getCorreoByIdPublic = (correoId: string): CorreoCompleto | null => {
  const correo = getCorreoById(correoId);
  return correo ? crearCorreoCompleto(correo) : null;
};

export const getCorreosByEstado = (estado: EstadoCorreo): CorreoCompleto[] => {
  return correos
    .filter(c => c.estado === estado)
    .map(correo => crearCorreoCompleto(correo));
};

export const getCorreosByDependencia = (dependenciaId: number): CorreoCompleto[] => {
  return correos
    .filter(c => c.dependencialId === dependenciaId)
    .map(correo => crearCorreoCompleto(correo));
};

export const getCorreosByTipoSolicitud = (tipoId: number): CorreoCompleto[] => {
  return correos
    .filter(c => c.tipoSolicitudId === tipoId)
    .map(correo => crearCorreoCompleto(correo));
};

export const getCorreosVencidos = (): CorreoCompleto[] => {
  return correos
    .filter(c => isCorreoVencido(c))
    .map(correo => crearCorreoCompleto(correo));
};

// ============================================
// FUNCIONES DE FLUJO DE CORREOS
// ============================================

export const getAllFlujos = (): FlujoCorreoCompleto[] => {
  return flujoCorreos.map(flujo => crearFlujoCorreoCompleto(flujo));
};

export const getFlujoByCorreoIdPublic = (correoId: string): FlujoCorreoCompleto | null => {
  const flujo = getFlujoByCorreoId(correoId);
  return flujo ? crearFlujoCorreoCompleto(flujo) : null;
};

export const getFlujosByUsuario = (usuarioId: number): FlujoCorreoCompleto[] => {
  return flujoCorreos
    .filter(f => f.usuarioId === usuarioId)
    .map(flujo => crearFlujoCorreoCompleto(flujo));
};

export const getFlujosByEtapa = (etapa: EtapaFlujo): FlujoCorreoCompleto[] => {
  return flujoCorreos
    .filter(f => f.etapa === etapa)
    .map(flujo => crearFlujoCorreoCompleto(flujo));
};

export const getFlujosActivos = (): FlujoCorreoCompleto[] => {
  return flujoCorreos
    .filter(f => !f.fechaFinalizacion)
    .map(flujo => crearFlujoCorreoCompleto(flujo));
};

export const getFlujosFinalizados = (): FlujoCorreoCompleto[] => {
  return flujoCorreos
    .filter(f => f.fechaFinalizacion)
    .map(flujo => crearFlujoCorreoCompleto(flujo));
};

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

export const getEstadisticasCorreos = (): EstadisticasCorreos => {
  const vencidos = getCorreosVencidos();
  
  const porEstado: Record<EstadoCorreo, number> = {
    PENDIENTE: correos.filter(c => c.estado === 'PENDIENTE').length,
    VENCIDO: correos.filter(c => c.estado === 'VENCIDO').length,
    RESPONDIDO: correos.filter(c => c.estado === 'RESPONDIDO').length,
  };
  
  const porTipoSolicitud = tiposSolicitud.map(tipo => ({
    tipo: tipo.nombre,
    cantidad: correos.filter(c => c.tipoSolicitudId === tipo.id).length
  }));
  
  return {
    total: correos.length,
    porEstado,
    porTipoSolicitud,
    vencidosCalculados: vencidos.length,
    conRespuesta: porEstado.RESPONDIDO,
    sinRespuesta: porEstado.PENDIENTE,
  };
};

export const getEstadisticasUsuarios = (): EstadisticasUsuarios => {
  const flujosActivosPorUsuario = usuarios.map(usuario => ({
    usuario: `${usuario.nombres} ${usuario.apellidos}`,
    flujosActivos: flujoCorreos.filter(f => f.usuarioId === usuario.id && !f.fechaFinalizacion).length,
    flujosFinalizados: flujoCorreos.filter(f => f.usuarioId === usuario.id && f.fechaFinalizacion).length
  }));
  
  return {
    total: usuarios.length,
    activos: usuarios.filter(u => u.activo).length,
    inactivos: usuarios.filter(u => !u.activo).length,
    flujosActivosPorUsuario,
  };
};

export const getEstadisticasFlujos = (): EstadisticasFlujos => {
  const flujosActivos = getFlujosActivos();
  const flujosFinalizados = getFlujosFinalizados();
  
  const porEtapa: Record<EtapaFlujo, number> = {
    GESTION: flujoCorreos.filter(f => f.etapa === 'GESTION').length,
    REVISION: flujoCorreos.filter(f => f.etapa === 'REVISION').length,
    APROBACION: flujoCorreos.filter(f => f.etapa === 'APROBACION').length,
  };
  
  const calcularTiempoPromedioFinalizacion = (): number => {
    const flujosFinalizadosConFecha = flujoCorreos.filter(f => f.fechaFinalizacion);
    
    if (flujosFinalizadosConFecha.length === 0) return 0;
    
    const totalDias = flujosFinalizadosConFecha.reduce((total, flujo) => {
      const asignacion = new Date(flujo.fechaAsignacion);
      const finalizacion = new Date(flujo.fechaFinalizacion!);
      const diferenciaMs = finalizacion.getTime() - asignacion.getTime();
      const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);
      return total + diferenciaDias;
    }, 0);
    
    return Math.round(totalDias / flujosFinalizadosConFecha.length);
  };
  
  return {
    total: flujoCorreos.length,
    activos: flujosActivos.length,
    finalizados: flujosFinalizados.length,
    porEtapa,
    tiempoPromedioFinalizacion: calcularTiempoPromedioFinalizacion(),
  };
};

// ============================================
// FUNCIONES DE CATÁLOGOS
// ============================================

export const getEstadosCorreo = (): EstadoCorreo[] => ['PENDIENTE', 'VENCIDO', 'RESPONDIDO'];
export const getEtapasFlujo = (): EtapaFlujo[] => ['GESTION', 'REVISION', 'APROBACION'];

// ============================================
// FUNCIONES DE BÚSQUEDA Y DASHBOARD
// ============================================

export const getDashboardData = (): DashboardData => {
  return {
    estadisticasCorreos: getEstadisticasCorreos(),
    estadisticasUsuarios: getEstadisticasUsuarios(),
    estadisticasFlujos: getEstadisticasFlujos(),
    correosRecientes: getAllCorreos()
      .sort((a, b) => new Date(b.fechaRecepcion).getTime() - new Date(a.fechaRecepcion).getTime())
      .slice(0, 10),
    flujosActivos: getFlujosActivos().slice(0, 10),
    correosVencidos: getCorreosVencidos().slice(0, 10)
  };
};

export const searchCorreos = (query: string): CorreoCompleto[] => {
  const queryLower = query.toLowerCase();
  
  return correos
    .filter(correo => 
      correo.asunto.toLowerCase().includes(queryLower) ||
      correo.cuerpoTexto.toLowerCase().includes(queryLower) ||
      correo.radicadoEntrada.toLowerCase().includes(queryLower) ||
      (correo.radicadoSalida && correo.radicadoSalida.toLowerCase().includes(queryLower))
    )
    .map(correo => crearCorreoCompleto(correo));
};

// ============================================
// EXPORTACIÓN COMPLETA
// ============================================

export const useData = {
  // Usuarios
  getUsersDataCredentials,
  getUsuarioById: getUsuarioByIdPublic,
  getUsuarioByEmail,
  validateUserCredentials,
  getActiveUsers,
  getInactiveUsers,
  
  // Roles
  getRolById,
  getAllRoles,
  
  // Entidades y Dependencias
  getEntidadById: getEntidadByIdPublic,
  getAllEntidades,
  getDependenciaById: getDependenciaByIdPublic,
  getDependenciasByEntidad,
  getAllDependencias,
  
  // Tipos de Solicitud
  getTipoSolicitudById: getTipoSolicitudByIdPublic,
  getAllTiposSolicitud,
  
  // Correos
  getAllCorreos,
  getCorreoById: getCorreoByIdPublic,
  getCorreosByEstado,
  getCorreosByDependencia,
  getCorreosByTipoSolicitud,
  getCorreosVencidos,
  
  // Flujo de Correos
  getAllFlujos,
  getFlujoByCorreoId: getFlujoByCorreoIdPublic,
  getFlujosByUsuario,
  getFlujosByEtapa,
  getFlujosActivos,
  getFlujosFinalizados,
  
  // Estadísticas
  getEstadisticasCorreos,
  getEstadisticasUsuarios,
  getEstadisticasFlujos,
  
  // Catálogos
  getEstadosCorreo,
  getEtapasFlujo,
  
  // Dashboard y Búsqueda
  getDashboardData,
  searchCorreos,
};

export default useData;