import type {
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, FilterParams, ApiResponse,
  UserFormData, EntityFormData, RequestTypeFormData,
  CorreoEstado
} from '../shared/types/core.types';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Interceptor para manejar respuestas
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Helper para construir query strings
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

class ApiService {
  // ==================== USUARIOS ====================
  
  async getUsers(searchTerm?: string): Promise<ApiResponse<User[]>> {
    try {
      const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
      const response = await fetch(`${API_BASE_URL}/usuarios${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<User[]>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener usuarios',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async createUser(userData: UserFormData): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(userData),
      });
      
      return await handleResponse<User>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al crear usuario',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async updateUser(id: string, userData: Partial<UserFormData>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(userData),
      });
      
      return await handleResponse<User>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al actualizar usuario',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al eliminar usuario',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== ENTIDADES ====================
  
  async getEntities(searchTerm?: string): Promise<ApiResponse<Entity[]>> {
    try {
      const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
      const response = await fetch(`${API_BASE_URL}/entidades${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<Entity[]>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener entidades',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async createEntity(entityData: EntityFormData): Promise<ApiResponse<Entity>> {
    try {
      const response = await fetch(`${API_BASE_URL}/entidades`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(entityData),
      });
      
      return await handleResponse<Entity>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al crear entidad',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async updateEntity(id: string, entityData: Partial<EntityFormData>): Promise<ApiResponse<Entity>> {
    try {
      const response = await fetch(`${API_BASE_URL}/entidades/${id}`, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(entityData),
      });
      
      return await handleResponse<Entity>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al actualizar entidad',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async deleteEntity(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/entidades/${id}`, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al eliminar entidad',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== TIPOS DE SOLICITUD ====================
  
  async getRequestTypes(searchTerm?: string): Promise<ApiResponse<RequestType[]>> {
    try {
      const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
      const response = await fetch(`${API_BASE_URL}/tipos-solicitud${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<RequestType[]>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener tipos de solicitud',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async createRequestType(typeData: RequestTypeFormData): Promise<ApiResponse<RequestType>> {
    try {
      const response = await fetch(`${API_BASE_URL}/tipos-solicitud`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(typeData),
      });
      
      return await handleResponse<RequestType>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al crear tipo de solicitud',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async updateRequestType(id: string, typeData: Partial<RequestTypeFormData>): Promise<ApiResponse<RequestType>> {
    try {
      const response = await fetch(`${API_BASE_URL}/tipos-solicitud/${id}`, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(typeData),
      });
      
      return await handleResponse<RequestType>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al actualizar tipo de solicitud',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async deleteRequestType(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/tipos-solicitud/${id}`, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al eliminar tipo de solicitud',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== DASHBOARD Y MÉTRICAS ====================
  
  async getDashboardMetrics(filters?: Partial<FilterParams>): Promise<ApiResponse<DashboardMetrics>> {
    try {
      const query = filters ? buildQueryString(filters) : '';
      const response = await fetch(`${API_BASE_URL}/correos/dashboard${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<DashboardMetrics>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener métricas',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async getCorreos(filters?: FilterParams): Promise<ApiResponse<Correo[]>> {
    try {
      const query = filters ? buildQueryString(filters) : '';
      const response = await fetch(`${API_BASE_URL}/correos/historico${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<Correo[]>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener correos',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async getCorreoById(id: string): Promise<ApiResponse<Correo>> {
    try {
      const response = await fetch(`${API_BASE_URL}/correos/${id}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<Correo>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener correo',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async getTrazabilidad(correoId: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/correos/${correoId}/trazabilidad`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<any>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener trazabilidad',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async getFlujosByCorreoId(correoId: string): Promise<ApiResponse<FlujoCorreo[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/correos/${correoId}/flujos`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<FlujoCorreo[]>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener flujos',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async getMetricas(filters?: Partial<FilterParams>): Promise<ApiResponse<DashboardMetrics>> {
    try {
      const query = filters ? buildQueryString(filters) : '';
      const response = await fetch(`${API_BASE_URL}/correos/metricas${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<DashboardMetrics>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener métricas',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== FILTROS DISPONIBLES ====================
  
  async getAvailableFilters(): Promise<ApiResponse<{
    gestores: Array<{ id: string; nombre: string }>;
    entidades: Array<{ id: string; nombre: string }>;
    estados: CorreoEstado[];
    tiposSolicitud: Array<{ id: string; tipo: string }>;
    urgencias: string[];
  }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/filtros/disponibles`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener filtros',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== EXPORTACIÓN ====================
  
  async exportToExcel(filters?: FilterParams): Promise<ApiResponse<{ url: string }>> {
    try {
      const query = filters ? buildQueryString(filters) : '';
      const response = await fetch(`${API_BASE_URL}/correos/export/excel${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<{ url: string }>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al exportar a Excel',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async exportToPDF(filters?: FilterParams): Promise<ApiResponse<{ url: string }>> {
    try {
      const query = filters ? buildQueryString(filters) : '';
      const response = await fetch(`${API_BASE_URL}/correos/export/pdf${query}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<{ url: string }>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al exportar a PDF',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== AUTENTICACIÓN ====================
  
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({ email, password }),
      });
      
      return await handleResponse<{ token: string; user: User }>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error de autenticación',
        error: 'AUTH_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al cerrar sesión',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await handleResponse<User>(response);
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener usuario actual',
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  // ==================== MÉTODOS AUXILIARES ====================
  
  setAuthToken(token: string): void {
    // Guardar token en localStorage
    localStorage.setItem('auth_token', token);
    
    // Actualizar headers para incluir token
    (DEFAULT_HEADERS as any)['Authorization'] = `Bearer ${token}`;
  }
  
  clearAuthToken(): void {
    localStorage.removeItem('auth_token');
    delete (DEFAULT_HEADERS as any)['Authorization'];
  }
  
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  // Inicializar token si existe
  constructor() {
    const token = this.getAuthToken();
    if (token) {
      this.setAuthToken(token);
    }
  }
}

export const apiService = new ApiService();