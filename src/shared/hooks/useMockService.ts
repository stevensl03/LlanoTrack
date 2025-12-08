import { useState, useCallback } from 'react';
import { mockService } from '../../services/mockService';
import type { 
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, FilterParams, ApiResponse,
  UserFormData, EntityFormData, RequestTypeFormData,
  LoginCredentials, LoginResponse, Notification, NotificationType
} from '../types/core.types';

export const useMockService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async <T>(apiCall: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      if (!response.success) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: 'API_ERROR',
        timestamp: new Date().toISOString(),
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estado
    loading,
    error,
    clearError: () => setError(null),
    
    // ==================== AUTENTICACIÓN ====================
    login: useCallback((credentials: LoginCredentials) => 
      handleApiCall(() => mockService.login(credentials.email, credentials.password)), []),

    logout: useCallback(() => 
      handleApiCall(() => mockService.logout()), []),

    getCurrentUser: useCallback(() => 
      handleApiCall(() => mockService.getCurrentUser()), []),

    // Métodos de token
    setAuthToken: useCallback((token: string) => {
      mockService.setAuthToken(token);
    }, []),

    clearAuthToken: useCallback(() => {
      mockService.clearAuthToken();
    }, []),

    getAuthToken: useCallback(() => {
      return mockService.getAuthToken();
    }, []),
    
    // ==================== USUARIOS ====================
    getUsers: useCallback((searchTerm?: string) => 
      handleApiCall(() => mockService.getUsers(searchTerm)), []),

    createUser: useCallback((userData: UserFormData) => 
      handleApiCall(() => mockService.createUser(userData)), []),

    updateUser: useCallback((id: string, userData: Partial<UserFormData>) => 
      handleApiCall(() => mockService.updateUser(id, userData)), []),

    deleteUser: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteUser(id)), []),
    
    // ==================== ENTIDADES ====================
    getEntities: useCallback((searchTerm?: string) => 
      handleApiCall(() => mockService.getEntities(searchTerm)), []),

    createEntity: useCallback((entityData: EntityFormData) => 
      handleApiCall(() => mockService.createEntity(entityData)), []),

    updateEntity: useCallback((id: string, entityData: Partial<EntityFormData>) => 
      handleApiCall(() => mockService.updateEntity(id, entityData)), []),

    deleteEntity: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteEntity(id)), []),
    
    // ==================== TIPOS DE SOLICITUD ====================
    getRequestTypes: useCallback((searchTerm?: string) => 
      handleApiCall(() => mockService.getRequestTypes(searchTerm)), []),

    createRequestType: useCallback((typeData: RequestTypeFormData) => 
      handleApiCall(() => mockService.createRequestType(typeData)), []),

    updateRequestType: useCallback((id: string, typeData: Partial<RequestTypeFormData>) => 
      handleApiCall(() => mockService.updateRequestType(id, typeData)), []),

    deleteRequestType: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteRequestType(id)), []),
    
    // ==================== DASHBOARD Y MÉTRICAS ====================
    getDashboardMetrics: useCallback((filters?: Partial<FilterParams>) => 
      handleApiCall(() => mockService.getDashboardMetrics(filters)), []),

    getCorreos: useCallback((filters?: FilterParams) => 
      handleApiCall(() => mockService.getCorreos(filters)), []),

    getCorreoById: useCallback((id: string) => 
      handleApiCall(() => mockService.getCorreoById(id)), []),

    getFlujosByCorreoId: useCallback((correoId: string) => 
      handleApiCall(() => mockService.getFlujosByCorreoId(correoId)), []),
    
    // ==================== FILTROS ====================
    getAvailableFilters: useCallback(() => 
      handleApiCall(() => mockService.getAvailableFilters()), []),
    
    // ==================== EXPORTACIÓN ====================
    exportToExcel: useCallback((filters?: FilterParams) => 
      handleApiCall(() => mockService.exportToExcel(filters)), []),

    exportToPDF: useCallback((filters?: FilterParams) => 
      handleApiCall(() => mockService.exportToPDF(filters)), []),

        // ==================== NOTIFICACIONES ====================
    getNotifications: useCallback((userId?: string) => 
      handleApiCall(() => mockService.getNotifications(userId)), []),

    getNotificationStats: useCallback((userId?: string) => 
      handleApiCall(() => mockService.getNotificationStats(userId)), []),

    markNotificationAsRead: useCallback((id: string) => 
      handleApiCall(() => mockService.markNotificationAsRead(id)), []),

    markAllNotificationsAsRead: useCallback((userId: string) => 
      handleApiCall(() => mockService.markAllNotificationsAsRead(userId)), []),

    deleteNotification: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteNotification(id)), []),

    createTestNotification: useCallback((notification: Partial<Notification>) => 
      handleApiCall(async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const newNotification: Notification = {
          id: `test-${Date.now()}`,
          tipo: notification.tipo || 'SISTEMA',
          titulo: notification.titulo || 'Notificación de prueba',
          mensaje: notification.mensaje || 'Esta es una notificación de prueba',
          fecha: new Date().toISOString(),
          leida: false,
          urgente: notification.urgente || false,
          usuarioId: notification.usuarioId || 'current-user',
          correoId: notification.correoId,
          entidadId: notification.entidadId,
          userId: notification.userId,
          accion: notification.accion,
          metadata: notification.metadata
        };
        
        return {
          success: true,
          data: newNotification,
          message: 'Notificación de prueba creada',
          timestamp: new Date().toISOString(),
        };
      }), []),
  };
};