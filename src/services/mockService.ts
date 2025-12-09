import type {
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, FilterParams, ApiResponse,
  UserFormData, EntityFormData, RequestTypeFormData,
  CorreoEstado, UrgencyLevel, Notification, NotificationType
} from '../shared/types/core.types';
import { mockData } from '../shared/lib/mockData';

// Simulación de delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockService {

    // ==================== AUTENTICACIÓN ====================

    async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockData.users.find(u => u.email === email && u.activo);

    console.log('Mock login:', email, password, user?.email);
    if (!user) {
        return {
        success: false,
        message: 'Credenciales incorrectas',
        error: 'AUTH_ERROR',
        timestamp: new Date().toISOString(),
        };
    }

    return {
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
        token: 'mock-jwt-token',
        user,
        },
        timestamp: new Date().toISOString(),
    };
    }

    async logout(): Promise<ApiResponse<void>> {
    return {
        success: true,
        message: 'Sesión cerrada',
        timestamp: new Date().toISOString(),
    };
    }

    async getCurrentUser(): Promise<ApiResponse<User>> {
    // Simular usuario autenticado
    const user = mockData.users[0];

    return {
        success: true,
        message: 'Usuario obtenido',
        data: user,
        timestamp: new Date().toISOString(),
    };
    }


    

  // ==================== USUARIOS ====================
  async getUsers(searchTerm?: string): Promise<ApiResponse<User[]>> {
    await delay(300);
    
    let users = mockData.users;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      users = users.filter(user =>
        user.nombre.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.area.toLowerCase().includes(term) ||
        user.rol.toLowerCase().includes(term)
      );
    }
    
    return {
      success: true,
      message: 'Usuarios obtenidos exitosamente',
      data: users,
      timestamp: new Date().toISOString(),
    };
  }
  
  async createUser(userData: UserFormData): Promise<ApiResponse<User>> {
    await delay(500);
    
    const newUser: User = {
      id: Date.now().toString(),
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      area: userData.area,
      activo: userData.activo ?? true,
      telefono: userData.telefono,
      extension: userData.extension,
      departamento: userData.departamento,
      fechaIngreso: userData.fechaIngreso,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockData.users.push(newUser);
    
    return {
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUser,
      timestamp: new Date().toISOString(),
    };
  }
  
  async updateUser(id: string, userData: Partial<UserFormData>): Promise<ApiResponse<User>> {
    await delay(500);
    
    const index = mockData.users.findIndex(u => u.id === id);
    if (index === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    mockData.users[index] = {
      ...mockData.users[index],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: mockData.users[index],
      timestamp: new Date().toISOString(),
    };
  }
  
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    await delay(500);
    
    const index = mockData.users.findIndex(u => u.id === id);
    if (index === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    mockData.users[index].activo = false;
    mockData.users[index].updatedAt = new Date().toISOString();
    
    return {
      success: true,
      message: 'Usuario desactivado exitosamente',
      timestamp: new Date().toISOString(),
    };
  }
  
  // ==================== ENTIDADES ====================
  async getEntities(searchTerm?: string): Promise<ApiResponse<Entity[]>> {
    await delay(300);
    
    let entities = mockData.entities;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      entities = entities.filter(entity =>
        entity.nombre.toLowerCase().includes(term) ||
        entity.dominios.some(domain => domain.toLowerCase().includes(term))
      );
    }
    
    return {
      success: true,
      message: 'Entidades obtenidas exitosamente',
      data: entities,
      timestamp: new Date().toISOString(),
    };
  }
  
  async createEntity(entityData: EntityFormData): Promise<ApiResponse<Entity>> {
    await delay(500);
    
    const responsable = mockData.users.find(u => u.id === entityData.responsableId);
    
    const newEntity: Entity = {
      id: Date.now().toString(),
      nombre: entityData.nombre,
      dominios: entityData.dominios,
      responsableId: entityData.responsableId,
      responsableNombre: responsable?.nombre,
      activa: entityData.activa ?? true,
      codigo: entityData.codigo,
      direccion: entityData.direccion,
      telefono: entityData.telefono,
      contacto: entityData.contacto,
      observaciones: entityData.observaciones,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockData.entities.push(newEntity);
    
    return {
      success: true,
      message: 'Entidad creada exitosamente',
      data: newEntity,
      timestamp: new Date().toISOString(),
    };
  }
  
  async updateEntity(id: string, entityData: Partial<EntityFormData>): Promise<ApiResponse<Entity>> {
    await delay(500);
    
    const index = mockData.entities.findIndex(e => e.id === id);
    if (index === -1) {
      return {
        success: false,
        message: 'Entidad no encontrada',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    const responsable = entityData.responsableId 
      ? mockData.users.find(u => u.id === entityData.responsableId)
      : undefined;
    
    mockData.entities[index] = {
      ...mockData.entities[index],
      ...entityData,
      responsableNombre: responsable?.nombre || mockData.entities[index].responsableNombre,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: 'Entidad actualizada exitosamente',
      data: mockData.entities[index],
      timestamp: new Date().toISOString(),
    };
  }
  
  async deleteEntity(id: string): Promise<ApiResponse<void>> {
    await delay(500);
    
    const index = mockData.entities.findIndex(e => e.id === id);
    if (index === -1) {
      return {
        success: false,
        message: 'Entidad no encontrada',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    mockData.entities.splice(index, 1);
    
    return {
      success: true,
      message: 'Entidad eliminada exitosamente',
      timestamp: new Date().toISOString(),
    };
  }
  
  // ==================== TIPOS DE SOLICITUD ====================
  async getRequestTypes(searchTerm?: string): Promise<ApiResponse<RequestType[]>> {
    await delay(300);
    
    let types = mockData.requestTypes;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      types = types.filter(type =>
        type.tipo.toLowerCase().includes(term) ||
        type.descripcion?.toLowerCase().includes(term)
      );
    }
    
    return {
      success: true,
      message: 'Tipos de solicitud obtenidos exitosamente',
      data: types,
      timestamp: new Date().toISOString(),
    };
  }
  
  async createRequestType(typeData: RequestTypeFormData): Promise<ApiResponse<RequestType>> {
    await delay(500);
    
    const newType: RequestType = {
      id: Date.now().toString(),
      tipo: typeData.tipo,
      plazoDias: typeData.plazoDias,
      urgencia: typeData.urgencia,
      descripcion: typeData.descripcion,
      activo: typeData.activo ?? true,
      requiereAprobacion: typeData.requiereAprobacion,
      requiereRevision: typeData.requiereRevision,
      diasRecordatorio: typeData.diasRecordatorio,
      plantillaRespuesta: typeData.plantillaRespuesta,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockData.requestTypes.push(newType);
    
    return {
      success: true,
      message: 'Tipo de solicitud creado exitosamente',
      data: newType,
      timestamp: new Date().toISOString(),
    };
  }
  
  async updateRequestType(id: string, typeData: Partial<RequestTypeFormData>): Promise<ApiResponse<RequestType>> {
    await delay(500);
    
    const index = mockData.requestTypes.findIndex(t => t.id === id);
    if (index === -1) {
      return {
        success: false,
        message: 'Tipo de solicitud no encontrado',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    mockData.requestTypes[index] = {
      ...mockData.requestTypes[index],
      ...typeData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      message: 'Tipo de solicitud actualizado exitosamente',
      data: mockData.requestTypes[index],
      timestamp: new Date().toISOString(),
    };
  }
  
  async deleteRequestType(id: string): Promise<ApiResponse<void>> {
    await delay(500);
    
    const index = mockData.requestTypes.findIndex(t => t.id === id);
    if (index === -1) {
      return {
        success: false,
        message: 'Tipo de solicitud no encontrado',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    mockData.requestTypes.splice(index, 1);
    
    return {
      success: true,
      message: 'Tipo de solicitud eliminado exitosamente',
      timestamp: new Date().toISOString(),
    };
  }
  
  // ==================== DASHBOARD Y MÉTRICAS ====================
  async getDashboardMetrics(filters?: Partial<FilterParams>): Promise<ApiResponse<DashboardMetrics>> {
    await delay(500);
    
    let metrics = { ...mockData.dashboardMetrics };
    
    if (filters) {
      const filteredCorreos = mockData.correos.filter(correo => {
        if (filters.estado && correo.estado !== filters.estado) return false;
        if (filters.gestorId && correo.gestorId !== filters.gestorId) return false;
        if (filters.entidadId && correo.entidadId !== filters.entidadId) return false;
        if (filters.tipoSolicitudId && correo.tipoSolicitudId !== filters.tipoSolicitudId) return false;
        if (filters.fechaInicio && new Date(correo.fechaRecepcion) < new Date(filters.fechaInicio)) return false;
        if (filters.fechaFin && new Date(correo.fechaRecepcion) > new Date(filters.fechaFin)) return false;
        return true;
      });
      
      const totalCorreos = filteredCorreos.length;
      const correosPorEstado = filteredCorreos.reduce((acc, correo) => {
        acc[correo.estado] = (acc[correo.estado] || 0) + 1;
        return acc;
      }, {} as Record<CorreoEstado, number>);
      
      const correosVencidos = filteredCorreos.filter(c => c.diasRestantes < 0).length;
      const correosCumplidos = filteredCorreos.filter(c => c.estado === 'ENVIADO').length;
      
      metrics = {
        totalCorreos,
        correosPorEstado,
        correosVencidos,
        correosCumplidos,
        porcentajeCumplimiento: totalCorreos > 0 ? (correosCumplidos / totalCorreos) * 100 : 0,
        tiempoPromedioRespuesta: 6.2,
        tiempoPromedioPorEtapa: mockData.dashboardMetrics.tiempoPromedioPorEtapa,
        correosPorEntidad: [],
        correosPorGestor: [],
        tendenciaMensual: mockData.dashboardMetrics.tendenciaMensual,
      };
    }
    
    return {
      success: true,
      message: 'Métricas obtenidas exitosamente',
      data: metrics,
      timestamp: new Date().toISOString(),
    };
  }
  
  async getCorreos(filters?: FilterParams): Promise<ApiResponse<Correo[]>> {
    await delay(500);
    
    let correos = mockData.correos;
    
    if (filters) {
      correos = correos.filter(correo => {
        if (filters.estado && correo.estado !== filters.estado) return false;
        if (filters.gestorId && correo.gestorId !== filters.gestorId) return false;
        if (filters.entidadId && correo.entidadId !== filters.entidadId) return false;
        if (filters.tipoSolicitudId && correo.tipoSolicitudId !== filters.tipoSolicitudId) return false;
        if (filters.urgencia) {
          const tipo = mockData.requestTypes.find(t => t.id === correo.tipoSolicitudId);
          if (tipo?.urgencia !== filters.urgencia) return false;
        }
        if (filters.fechaInicio && new Date(correo.fechaRecepcion) < new Date(filters.fechaInicio)) return false;
        if (filters.fechaFin && new Date(correo.fechaRecepcion) > new Date(filters.fechaFin)) return false;
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          return (
            correo.asunto.toLowerCase().includes(term) ||
            correo.radicadoEntrada.toLowerCase().includes(term) ||
            correo.entidadNombre?.toLowerCase().includes(term) ||
            correo.remitente.toLowerCase().includes(term)
          );
        }
        return true;
      });
      
      if (filters.sortBy) {
        correos.sort((a, b) => {
          const aVal = a[filters.sortBy as keyof Correo];
          const bVal = b[filters.sortBy as keyof Correo];
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return filters.sortOrder === 'desc' 
              ? bVal.localeCompare(aVal)
              : aVal.localeCompare(bVal);
          }
          return 0;
        });
      }
      
      if (filters.page !== undefined && filters.size !== undefined) {
        const start = filters.page * filters.size;
        const end = start + filters.size;
        correos = correos.slice(start, end);
      }
    }
    
    return {
      success: true,
      message: 'Correos obtenidos exitosamente',
      data: correos,
      timestamp: new Date().toISOString(),
      page: filters?.page,
      totalPages: filters?.size ? Math.ceil(mockData.correos.length / filters.size) : undefined,
      totalItems: mockData.correos.length,
    };
  }
  
  async getCorreoById(id: string): Promise<ApiResponse<Correo>> {
    await delay(300);
    
    const correo = mockData.correos.find(c => c.id === id);
    
    if (!correo) {
      return {
        success: false,
        message: 'Correo no encontrado',
        error: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      success: true,
      message: 'Correo obtenido exitosamente',
      data: correo,
      timestamp: new Date().toISOString(),
    };
  }
  
  async getFlujosByCorreoId(correoId: string): Promise<ApiResponse<FlujoCorreo[]>> {
    await delay(300);
    
    const flujos = mockData.flujos.filter(f => f.correoId === correoId);
    
    return {
      success: true,
      message: 'Flujos obtenidos exitosamente',
      data: flujos,
      timestamp: new Date().toISOString(),
    };
  }
  
  // ==================== FILTROS DISPONIBLES ====================
  async getAvailableFilters(): Promise<ApiResponse<typeof mockData.filters>> {
    await delay(200);
    
    return {
      success: true,
      message: 'Filtros obtenidos exitosamente',
      data: mockData.filters,
      timestamp: new Date().toISOString(),
    };
  }
  
  // ==================== EXPORTACIÓN ====================
  async exportToExcel(filters?: FilterParams): Promise<ApiResponse<{ url: string }>> {
    await delay(1000);
    
    return {
      success: true,
      message: 'Archivo Excel generado exitosamente',
      data: { url: `/exports/reporte-${Date.now()}.xlsx` },
      timestamp: new Date().toISOString(),
    };
  }
  
  async exportToPDF(filters?: FilterParams): Promise<ApiResponse<{ url: string }>> {
    await delay(1500);
    
    return {
      success: true,
      message: 'Archivo PDF generado exitosamente',
      data: { url: `/exports/reporte-${Date.now()}.pdf` },
      timestamp: new Date().toISOString(),
    };
  }
  // ==================== MÉTODOS DE AUTENTICACIÓN ADICIONALES ====================
  
  setAuthToken(token: string): void {
    console.log('Token establecido:', token);
  }
  
  clearAuthToken(): void {
    console.log('Token limpiado');
  }
  
  getAuthToken(): string | null {
    return 'mock-jwt-token';
  }
   // ==================== NOTIFICACIONES ====================

  async getNotifications(userId?: string): Promise<ApiResponse<Notification[]>> {
    await delay(500);
    
    const notifications = this.generateNotifications();
    
    // Filtrar por usuario si se especifica
    let filteredNotifications = notifications;
    if (userId && userId !== 'all') {
      filteredNotifications = notifications.filter(
        n => n.usuarioId === userId || n.usuarioId === 'all'
      );
    }
    
    return {
      success: true,
      data: filteredNotifications,
      message: 'Notificaciones obtenidas exitosamente',
      timestamp: new Date().toISOString(),
    };
  }

  async getNotificationStats(userId?: string): Promise<ApiResponse<{
    total: number;
    unread: number;
    urgent: number;
    byType: Record<string, number>;
  }>> {
    await delay(300);
    
    const notifications = this.generateNotifications();
    
    // Filtrar por usuario
    let filteredNotifications = notifications;
    if (userId && userId !== 'all') {
      filteredNotifications = notifications.filter(
        n => n.usuarioId === userId || n.usuarioId === 'all'
      );
    }
    
    const unread = filteredNotifications.filter(n => !n.leida).length;
    const urgent = filteredNotifications.filter(n => n.urgente).length;
    
    const byType: Record<string, number> = {};
    filteredNotifications.forEach(n => {
      byType[n.tipo] = (byType[n.tipo] || 0) + 1;
    });
    
    return {
      success: true,
      data: {
        total: filteredNotifications.length,
        unread,
        urgent,
        byType,
      },
      message: 'Estadísticas obtenidas',
      timestamp: new Date().toISOString(),
    };
  }

  async markNotificationAsRead(id: string): Promise<ApiResponse<{ id: string; leida: boolean }>> {
    await delay(300);
    
    // En una implementación real, buscarías la notificación en mockData.notifications
    // y la marcarías como leída. Por ahora simulamos éxito.
    return {
      success: true,
      message: 'Notificación marcada como leída',
      data: { id, leida: true },
      timestamp: new Date().toISOString(),
    };
  }

  async markAllNotificationsAsRead(userId: string): Promise<ApiResponse<{ updated: number }>> {
    await delay(500);
    
    // Contar cuántas notificaciones no leídas tiene el usuario
    const notifications = this.generateNotifications();
    const userNotifications = notifications.filter(
      n => n.usuarioId === userId || n.usuarioId === 'all'
    );
    const unreadCount = userNotifications.filter(n => !n.leida).length;
    
    return {
      success: true,
      data: { updated: unreadCount },
      message: `${unreadCount} notificaciones marcadas como leídas`,
      timestamp: new Date().toISOString(),
    };
  }

  async deleteNotification(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    await delay(300);
    
    // En una implementación real, eliminarías de mockData.notifications
    return {
      success: true,
      data: { deleted: true },
      message: 'Notificación eliminada',
      timestamp: new Date().toISOString(),
    };
  }

  // ==================== GENERAR NOTIFICACIONES ====================

  generateNotifications(): Notification[] {
    const notifications: Notification[] = [];
    let idCounter = 1;
    
    // Usar usuarios reales como base
    const currentUserId = '8'; // Sofía Vargas (admin) o el usuario actual
    
    // 1. Notificaciones de RECEPCIÓN (basadas en correos con estado RECEPCION)
    mockData.correos
      .filter(correo => correo.estado === 'RECEPCION')
      .forEach(correo => {
        const tipoSolicitud = mockData.requestTypes.find(t => t.id === correo.tipoSolicitudId);
        
        notifications.push({
          id: `notif-${idCounter++}`,
          tipo: 'RECEPCION',
          titulo: `Nuevo ${tipoSolicitud?.tipo || 'documento'} recibido`,
          mensaje: `${correo.entidadNombre} - ${correo.asunto}. Radicado: ${correo.radicadoEntrada}`,
          fecha: correo.fechaRecepcion,
          leida: Math.random() > 0.3, // 70% no leídas
          urgente: correo.diasRestantes < 2,
          usuarioId: correo.gestorId || currentUserId,
          correoId: correo.id,
          accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
          metadata: {
            radicado: correo.radicadoEntrada,
            entidad: correo.entidadNombre,
            diasRestantes: correo.diasRestantes
          }
        });
      });
    
    // 2. Notificaciones de ASIGNACIÓN (correos con gestor asignado)
    mockData.correos
      .filter(correo => correo.gestorId && correo.estado === 'ELABORACION')
      .forEach(correo => {
        const gestor = mockData.users.find(u => u.id === correo.gestorId);
        const entidad = mockData.entities.find(e => e.id === correo.entidadId);
        
        notifications.push({
          id: `notif-${idCounter++}`,
          tipo: 'ASIGNACION',
          titulo: 'Correo asignado para elaboración',
          mensaje: `${correo.radicadoEntrada} - ${correo.asunto}. Asignado a: ${gestor?.nombre}`,
          fecha: correo.updatedAt,
          leida: false,
          urgente: correo.diasRestantes < 3,
          usuarioId: correo.gestorId || currentUserId,
          correoId: correo.id,
          accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
          metadata: {
            radicado: correo.radicadoEntrada,
            gestor: gestor?.nombre,
            entidad: entidad?.nombre
          }
        });
      });
    
    // 3. Notificaciones de VENCIMIENTO (basadas en días restantes REALES)
    mockData.correos
      .filter(correo => 
        correo.diasRestantes < 5 && 
        correo.diasRestantes >= 0 &&
        correo.estado !== 'ENVIADO' && 
        correo.estado !== 'ARCHIVADO'
      )
      .forEach(correo => {
        const tipoSolicitud = mockData.requestTypes.find(t => t.id === correo.tipoSolicitudId);
        const diasTexto = correo.diasRestantes === 0 ? 'HOY' : `en ${correo.diasRestantes} días`;
        
        notifications.push({
          id: `notif-${idCounter++}`,
          tipo: 'VENCIMIENTO',
          titulo: `${tipoSolicitud?.tipo || 'Documento'} por vencer`,
          mensaje: `${correo.radicadoEntrada} vence ${diasTexto}. Entidad: ${correo.entidadNombre}`,
          fecha: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString(),
          leida: Math.random() > 0.5,
          urgente: correo.diasRestantes < 2,
          usuarioId: correo.gestorId || currentUserId,
          correoId: correo.id,
          accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
          metadata: {
            radicado: correo.radicadoEntrada,
            fechaVencimiento: correo.fechaVencimiento,
            diasRestantes: correo.diasRestantes
          }
        });
      });
    
    // 4. Notificaciones de REVISIÓN (basadas en flujos REALES)
    mockData.flujos
      .filter(flujo => flujo.etapa === 'REVISION' && flujo.usuarioId)
      .forEach(flujo => {
        const correo = mockData.correos.find(c => c.id === flujo.correoId);
        const revisor = mockData.users.find(u => u.id === flujo.usuarioId);
        
        if (correo) {
          notifications.push({
            id: `notif-${idCounter++}`,
            tipo: 'REVISION',
            titulo: 'Documento pendiente de revisión',
            mensaje: `${correo.radicadoEntrada} - ${correo.asunto}. Asignado a: ${revisor?.nombre}`,
            fecha: flujo.fechaInicio,
            leida: !!flujo.fechaFin, // Si ya tiene fecha fin, está leída
            urgente: correo.diasRestantes < 3,
            usuarioId: flujo.usuarioId!,
            correoId: correo.id,
            accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
            metadata: {
              radicado: correo.radicadoEntrada,
              etapa: flujo.etapa,
              duracion: flujo.duracion
            }
          });
        }
      });
    
    // 5. Notificaciones de APROBACIÓN (basadas en flujos REALES)
    mockData.flujos
      .filter(flujo => flujo.etapa === 'APROBACION' && flujo.usuarioId)
      .forEach(flujo => {
        const correo = mockData.correos.find(c => c.id === flujo.correoId);
        const aprobador = mockData.users.find(u => u.id === flujo.usuarioId);
        
        if (correo) {
          notifications.push({
            id: `notif-${idCounter++}`,
            tipo: 'APROBACION',
            titulo: 'Documento pendiente de aprobación',
            mensaje: `${correo.radicadoEntrada} - ${correo.asunto}. Asignado a: ${aprobador?.nombre}`,
            fecha: flujo.fechaInicio,
            leida: !!flujo.fechaFin,
            urgente: correo.diasRestantes < 2,
            usuarioId: flujo.usuarioId!,
            correoId: correo.id,
            accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
            metadata: {
              radicado: correo.radicadoEntrada,
              etapa: flujo.etapa
            }
          });
        }
      });
    
    // 6. Notificaciones de ENVÍO (correos con radicado de salida)
    mockData.correos
      .filter(correo => correo.radicadoSalida && correo.estado === 'ENVIADO')
      .forEach(correo => {
        const tipoSolicitud = mockData.requestTypes.find(t => t.id === correo.tipoSolicitudId);
        
        notifications.push({
          id: `notif-${idCounter++}`,
          tipo: 'ENVIO',
          titulo: `${tipoSolicitud?.tipo || 'Documento'} enviado`,
          mensaje: `${correo.radicadoEntrada} ha sido enviado a ${correo.entidadNombre}. Radicado salida: ${correo.radicadoSalida}`,
          fecha: correo.updatedAt,
          leida: true,
          urgente: false,
          usuarioId: correo.gestorId || currentUserId,
          correoId: correo.id,
          accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
          metadata: {
            radicadoEntrada: correo.radicadoEntrada,
            radicadoSalida: correo.radicadoSalida,
            entidad: correo.entidadNombre
          }
        });
      });
    
    // 7. Notificaciones de VENCIDOS (estado real)
    mockData.correos
      .filter(correo => correo.estado === 'VENCIDO')
      .forEach(correo => {
        notifications.push({
          id: `notif-${idCounter++}`,
          tipo: 'VENCIMIENTO',
          titulo: 'Documento VENCIDO',
          mensaje: `${correo.radicadoEntrada} ha vencido. Entidad: ${correo.entidadNombre}`,
          fecha: correo.fechaVencimiento,
          leida: false,
          urgente: true,
          usuarioId: correo.gestorId || currentUserId,
          correoId: correo.id,
          accion: `/auditor/trazabilidad/${correo.id}`, // CORREGIDO
          metadata: {
            radicado: correo.radicadoEntrada,
            fechaVencimiento: correo.fechaVencimiento,
            estado: 'VENCIDO'
          }
        });
      });
    
    // 8. Notificaciones del SISTEMA (basadas en datos REALES)
    // Estadísticas del dashboard
    const hoy = new Date().toISOString().split('T')[0];
    const correosHoy = mockData.correos.filter(c => 
      c.fechaRecepcion.split('T')[0] === hoy
    ).length;
    
    const correosVencidos = mockData.correos.filter(c => c.estado === 'VENCIDO').length;
    
    if (correosHoy > 0) {
      notifications.push({
        id: `notif-${idCounter++}`,
        tipo: 'SISTEMA',
        titulo: 'Resumen diario',
        mensaje: `Hoy has recibido ${correosHoy} nuevos correos. ${correosVencidos} documentos vencidos pendientes.`,
        fecha: new Date().toISOString(),
        leida: false,
        urgente: correosVencidos > 5,
        usuarioId: currentUserId,
        accion: '/tracking/dashboard', // CORREGIDO
        metadata: {
          correosHoy,
          correosVencidos,
          fecha: hoy
        }
      });
    }
    
    // Notificación de actividad reciente
    const usuarioActividad = mockData.users.find(u => u.id === currentUserId);
    if (usuarioActividad) {
      const fechaActualizacion = new Date(usuarioActividad.updatedAt);
      const diasDesdeActualizacion = Math.floor(
        (Date.now() - fechaActualizacion.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (diasDesdeActualizacion > 7) {
        notifications.push({
          id: `notif-${idCounter++}`,
          tipo: 'SISTEMA',
          titulo: 'Actualización de perfil pendiente',
          mensaje: `Tu perfil no se actualiza desde hace ${diasDesdeActualizacion} días. Revisa tu información.`,
          fecha: new Date().toISOString(),
          leida: false,
          urgente: false,
          usuarioId: currentUserId,
          accion: '/perfil', // CORREGIDO
          metadata: {
            ultimaActualizacion: usuarioActividad.updatedAt,
            diasDesdeActualizacion
          }
        });
      }
    }
    
    return notifications;
  }
}

export const mockService = new MockService();