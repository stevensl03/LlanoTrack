import type {
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, FilterParams, ApiResponse,
  UserFormData, EntityFormData, RequestTypeFormData,
  CorreoEstado, UrgencyLevel
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
}

export const mockService = new MockService();