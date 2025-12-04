// @ts-ignore
import DataPruebJSON from './DataPruebJSON.json'

// ============================================
// MAPEO DE DATOS
// ============================================

const roles = DataPruebJSON.roles.map((rol: any) => ({
    id: rol.id_rol as string,
    nombre: rol.nombre as string,
    descripcion: rol.descripcion as string,
}));

const usuario_rol = DataPruebJSON.usuario_rol.map((ur: any) => ({
    user_id: ur.id_usuario as string,
    role_id: ur.id_rol as string,
}));

const users = DataPruebJSON.usuarios.map((usuario: any) => ({
    id: usuario.id_usuario as string,
    nombre: usuario.nombre as string,
    email: usuario.correo as string,
    password: usuario.password as string,
    isActive: usuario.activo as boolean,
    fecha_creacion: usuario.fecha_creacion as string,
    role_id: usuario_rol.find((item) => item.user_id === usuario.id_usuario)?.role_id as string,
}));

const correos = DataPruebJSON.correos.map((correo: any) => ({
    id: correo.id_correo as string,
    remitente: correo.remitente as string,
    asunto: correo.asunto as string,
    cuerpo: correo.cuerpo as string,
    fecha_recepcion: correo.fecha_recepcion as string,
    estado: correo.estado as string,
    prioridad: correo.prioridad as string,
    id_responsable: correo.id_responsable as string | null,
}));

const adjuntos = DataPruebJSON.adjuntos.map((adj: any) => ({
    id: adj.id_adjunto as string,
    nombre_archivo: adj.nombre_archivo as string,
    tipo: adj.tipo as string,
    tamaño: adj.tamaño as number,
    ruta: adj.ruta as string,
    id_correo: adj.id_correo as string,
}));

const flujos_trabajo = DataPruebJSON.flujos_trabajo.map((flujo: any) => ({
    id: flujo.id_flujo as string,
    paso_actual: flujo.paso_actual as string,
    fecha_inicio: flujo.fecha_inicio as string,
    fecha_vencimiento: flujo.fecha_vencimiento as string,
    id_correo: flujo.id_correo as string,
}));

const auditorias = DataPruebJSON.auditorias.map((aud: any) => ({
    id: aud.id_auditoria as string,
    id_usuario: aud.id_usuario as string,
    accion: aud.accion as string,
    fecha: aud.fecha as string,
    detalles: aud.detalles as string,
}));

// ============================================
// FUNCIONES DE USUARIOS Y AUTENTICACIÓN
// ============================================

export const getUsersDataCredencials = () => {   
    return { users }
}

export const getUserById = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return null;
    
    const role = getRoleById(user.role_id);
    return {
        ...user,
        role: role
    };
}

export const getUserByEmail = (email: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    
    const role = getRoleById(user.role_id);
    return {
        ...user,
        role: role
    };
}

export const validateUserCredentials = (email: string, password: string) => {
    const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password &&
        u.isActive
    );
    
    if (!user) return { success: false, message: "Credenciales inválidas o usuario inactivo" };
    
    const role = getRoleById(user.role_id);
    return {
        success: true,
        user: {
            ...user,
            role: role
        }
    };
}

export const getActiveUsers = () => {
    return users.filter(u => u.isActive).map(user => ({
        ...user,
        role: getRoleById(user.role_id)
    }));
}

export const getInactiveUsers = () => {
    return users.filter(u => !u.isActive).map(user => ({
        ...user,
        role: getRoleById(user.role_id)
    }));
}

// ============================================
// FUNCIONES DE ROLES
// ============================================

export const getRoleById = (roleId: string) => {
    return roles.find(r => r.id === roleId) || null;
}

export const getRoleDataName = (role_id: string) => {
    const role = roles.find((item) => item.id === role_id);
    return {
        roleName: role?.nombre || "Sin rol",
        roleDescription: role?.descripcion || ""
    }
}

export const getAllRoles = () => {
    return roles;
}

export const getUsersByRole = (roleId: string) => {
    return users.filter(u => u.role_id === roleId).map(user => ({
        ...user,
        role: getRoleById(user.role_id)
    }));
}

// ============================================
// FUNCIONES DE CORREOS
// ============================================

export const getAllCorreos = () => {
    return correos.map(correo => ({
        ...correo,
        responsable: correo.id_responsable ? getUserById(correo.id_responsable) : null,
        adjuntos: getAdjuntosByCorreoId(correo.id),
        flujo: getFlujoByCorreoId(correo.id)
    }));
}

export const getCorreoById = (correoId: string) => {
    const correo = correos.find(c => c.id === correoId);
    if (!correo) return null;
    
    return {
        ...correo,
        responsable: correo.id_responsable ? getUserById(correo.id_responsable) : null,
        adjuntos: getAdjuntosByCorreoId(correo.id),
        flujo: getFlujoByCorreoId(correo.id)
    };
}

export const getCorreosByEstado = (estado: string) => {
    return correos.filter(c => c.estado === estado).map(correo => ({
        ...correo,
        responsable: correo.id_responsable ? getUserById(correo.id_responsable) : null,
    }));
}

export const getCorreosByPrioridad = (prioridad: string) => {
    return correos.filter(c => c.prioridad === prioridad).map(correo => ({
        ...correo,
        responsable: correo.id_responsable ? getUserById(correo.id_responsable) : null,
    }));
}

export const getCorreosByResponsable = (userId: string) => {
    return correos.filter(c => c.id_responsable === userId).map(correo => ({
        ...correo,
        responsable: getUserById(userId),
        adjuntos: getAdjuntosByCorreoId(correo.id)
    }));
}

export const getCorreosSinAsignar = () => {
    return correos.filter(c => !c.id_responsable);
}

// ============================================
// FUNCIONES DE ADJUNTOS
// ============================================

export const getAdjuntosByCorreoId = (correoId: string) => {
    return adjuntos.filter(adj => adj.id_correo === correoId);
}

export const getAdjuntoById = (adjuntoId: string) => {
    return adjuntos.find(adj => adj.id === adjuntoId) || null;
}

// ============================================
// FUNCIONES DE FLUJOS DE TRABAJO
// ============================================

export const getAllFlujos = () => {
    return flujos_trabajo.map(flujo => ({
        ...flujo,
        correo: getCorreoById(flujo.id_correo)
    }));
}

export const getFlujoByCorreoId = (correoId: string) => {
    return flujos_trabajo.find(f => f.id_correo === correoId) || null;
}

export const getFlujosByPasoActual = (paso: string) => {
    return flujos_trabajo.filter(f => f.paso_actual === paso).map(flujo => ({
        ...flujo,
        correo: getCorreoById(flujo.id_correo)
    }));
}

export const getFlujosVencidos = () => {
    const now = new Date();
    return flujos_trabajo.filter(f => {
        const vencimiento = new Date(f.fecha_vencimiento);
        return vencimiento < now;
    }).map(flujo => ({
        ...flujo,
        correo: getCorreoById(flujo.id_correo)
    }));
}

// ============================================
// FUNCIONES DE AUDITORÍA
// ============================================

export const getAllAuditorias = () => {
    return auditorias.map(aud => ({
        ...aud,
        usuario: getUserById(aud.id_usuario)
    }));
}

export const getAuditoriasByUsuario = (userId: string) => {
    return auditorias.filter(aud => aud.id_usuario === userId).map(aud => ({
        ...aud,
        usuario: getUserById(aud.id_usuario)
    }));
}

export const getAuditoriasByAccion = (accion: string) => {
    return auditorias.filter(aud => aud.accion === accion).map(aud => ({
        ...aud,
        usuario: getUserById(aud.id_usuario)
    }));
}

export const getAuditoriasByFecha = (fechaInicio: string, fechaFin: string) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    return auditorias.filter(aud => {
        const fecha = new Date(aud.fecha);
        return fecha >= inicio && fecha <= fin;
    }).map(aud => ({
        ...aud,
        usuario: getUserById(aud.id_usuario)
    }));
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

export const getEstadisticasCorreos = () => {
    return {
        total: correos.length,
        porEstado: DataPruebJSON.estados_correo.map(estado => ({
            estado,
            cantidad: correos.filter(c => c.estado === estado).length
        })),
        porPrioridad: DataPruebJSON.prioridades.map(prioridad => ({
            prioridad,
            cantidad: correos.filter(c => c.prioridad === prioridad).length
        })),
        sinAsignar: correos.filter(c => !c.id_responsable).length,
        asignados: correos.filter(c => c.id_responsable).length
    };
}

export const getEstadisticasUsuarios = () => {
    return {
        total: users.length,
        activos: users.filter(u => u.isActive).length,
        inactivos: users.filter(u => !u.isActive).length,
        porRol: roles.map(rol => ({
            rol: rol.nombre,
            cantidad: users.filter(u => u.role_id === rol.id).length
        }))
    };
}

export const getEstadisticasFlujos = () => {
    const now = new Date();
    return {
        total: flujos_trabajo.length,
        vencidos: flujos_trabajo.filter(f => new Date(f.fecha_vencimiento) < now).length,
        porPaso: DataPruebJSON.pasos_workflow.map(paso => ({
            paso,
            cantidad: flujos_trabajo.filter(f => f.paso_actual === paso).length
        }))
    };
}

// ============================================
// FUNCIONES DE CATÁLOGOS
// ============================================

export const getEstadosCorreo = () => DataPruebJSON.estados_correo;
export const getPrioridades = () => DataPruebJSON.prioridades;
export const getSistemasOrigen = () => DataPruebJSON.sistemas_origen;
export const getPasosWorkflow = () => DataPruebJSON.pasos_workflow;




    


