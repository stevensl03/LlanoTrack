import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../../services/apiService.ts';
import type {
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, FilterParams, ApiResponse,
  UserFormData, EntityFormData, RequestTypeFormData
} from '../types/core.types';

export const useApiService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Inicializar token al montar
  useEffect(() => {
    const token = apiService.getAuthToken();
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handleApiCall = async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
    successMessage?: string
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      
      if (!response.success) {
        setError(response.message);
        
        // Si es error de autenticación, limpiar token
        if (response.error === 'AUTH_ERROR' || response.error === 'UNAUTHORIZED') {
          apiService.clearAuthToken();
          setAuthToken(null);
        }
      } else if (successMessage) {
        // Podrías mostrar notificación de éxito aquí
        console.log(successMessage);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
      };
    } finally {
      setLoading(false);
    }
  };

  // ==================== AUTENTICACIÓN ====================
  
  const login = useCallback(async (email: string, password: string) => {
    const response = await handleApiCall(
      () => apiService.login(email, password),
      'Inicio de sesión exitoso'
    );
    
    if (response.success && response.data) {
      const token = response.data.token;
      apiService.setAuthToken(token);
      setAuthToken(token);
    }
    
    return response;
  }, []);

  const logout = useCallback(async () => {
    const response = await handleApiCall(
      () => apiService.logout(),
      'Sesión cerrada exitosamente'
    );
    
    apiService.clearAuthToken();
    setAuthToken(null);
    
    return response;
  }, []);

  const getCurrentUser = useCallback(async () => {
    return await handleApiCall(() => apiService.getCurrentUser());
  }, []);

  // ==================== USUARIOS ====================
  
  const getUsers = useCallback((searchTerm?: string) => 
    handleApiCall(() => apiService.getUsers(searchTerm)), []);

  const createUser = useCallback((userData: UserFormData) => 
    handleApiCall(
      () => apiService.createUser(userData),
      'Usuario creado exitosamente'
    ), []);

  const updateUser = useCallback((id: string, userData: Partial<UserFormData>) => 
    handleApiCall(
      () => apiService.updateUser(id, userData),
      'Usuario actualizado exitosamente'
    ), []);

  const deleteUser = useCallback((id: string) => 
    handleApiCall(
      () => apiService.deleteUser(id),
      'Usuario eliminado exitosamente'
    ), []);

  // ==================== ENTIDADES ====================
  
  const getEntities = useCallback((searchTerm?: string) => 
    handleApiCall(() => apiService.getEntities(searchTerm)), []);

  const createEntity = useCallback((entityData: EntityFormData) => 
    handleApiCall(
      () => apiService.createEntity(entityData),
      'Entidad creada exitosamente'
    ), []);

  const updateEntity = useCallback((id: string, entityData: Partial<EntityFormData>) => 
    handleApiCall(
      () => apiService.updateEntity(id, entityData),
      'Entidad actualizada exitosamente'
    ), []);

  const deleteEntity = useCallback((id: string) => 
    handleApiCall(
      () => apiService.deleteEntity(id),
      'Entidad eliminada exitosamente'
    ), []);

  // ==================== TIPOS DE SOLICITUD ====================
  
  const getRequestTypes = useCallback((searchTerm?: string) => 
    handleApiCall(() => apiService.getRequestTypes(searchTerm)), []);

  const createRequestType = useCallback((typeData: RequestTypeFormData) => 
    handleApiCall(
      () => apiService.createRequestType(typeData),
      'Tipo de solicitud creado exitosamente'
    ), []);

  const updateRequestType = useCallback((id: string, typeData: Partial<RequestTypeFormData>) => 
    handleApiCall(
      () => apiService.updateRequestType(id, typeData),
      'Tipo de solicitud actualizado exitosamente'
    ), []);

  const deleteRequestType = useCallback((id: string) => 
    handleApiCall(
      () => apiService.deleteRequestType(id),
      'Tipo de solicitud eliminado exitosamente'
    ), []);

  // ==================== DASHBOARD ====================
  
  const getDashboardMetrics = useCallback((filters?: Partial<FilterParams>) => 
    handleApiCall(() => apiService.getDashboardMetrics(filters)), []);

  const getCorreos = useCallback((filters?: FilterParams) => 
    handleApiCall(() => apiService.getCorreos(filters)), []);

  const getCorreoById = useCallback((id: string) => 
    handleApiCall(() => apiService.getCorreoById(id)), []);

  const getTrazabilidad = useCallback((correoId: string) => 
    handleApiCall(() => apiService.getTrazabilidad(correoId)), []);

  const getFlujosByCorreoId = useCallback((correoId: string) => 
    handleApiCall(() => apiService.getFlujosByCorreoId(correoId)), []);

  const getMetricas = useCallback((filters?: Partial<FilterParams>) => 
    handleApiCall(() => apiService.getMetricas(filters)), []);

  // ==================== FILTROS ====================
  
  const getAvailableFilters = useCallback(() => 
    handleApiCall(() => apiService.getAvailableFilters()), []);

  // ==================== EXPORTACIÓN ====================
  
  const exportToExcel = useCallback((filters?: FilterParams) => 
    handleApiCall(
      () => apiService.exportToExcel(filters),
      'Exportación a Excel iniciada'
    ), []);

  const exportToPDF = useCallback((filters?: FilterParams) => 
    handleApiCall(
      () => apiService.exportToPDF(filters),
      'Exportación a PDF iniciada'
    ), []);

  return {
    // Estado
    loading,
    error,
    authToken,
    isAuthenticated: !!authToken,
    
    // Métodos de estado
    clearError: () => setError(null),
    setError: (message: string) => setError(message),
    
    // Autenticación
    login,
    logout,
    getCurrentUser,
    
    // Usuarios
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    
    // Entidades
    getEntities,
    createEntity,
    updateEntity,
    deleteEntity,
    
    // Tipos de Solicitud
    getRequestTypes,
    createRequestType,
    updateRequestType,
    deleteRequestType,
    
    // Dashboard
    getDashboardMetrics,
    getCorreos,
    getCorreoById,
    getTrazabilidad,
    getFlujosByCorreoId,
    getMetricas,
    
    // Filtros
    getAvailableFilters,
    
    // Exportación
    exportToExcel,
    exportToPDF,
  };
};