import { useState, useCallback } from 'react';
import { mockService } from '../../services/mockService';
import type { 
  User, Entity, RequestType, Correo, FlujoCorreo,
  DashboardMetrics, FilterParams, ApiResponse,
  UserFormData, EntityFormData, RequestTypeFormData
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
    
    // Usuarios
    getUsers: useCallback((searchTerm?: string) => 
      handleApiCall(() => mockService.getUsers(searchTerm)), []),

    createUser: useCallback((userData: UserFormData) => 
      handleApiCall(() => mockService.createUser(userData)), []),

    updateUser: useCallback((id: string, userData: Partial<UserFormData>) => 
      handleApiCall(() => mockService.updateUser(id, userData)), []),

    deleteUser: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteUser(id)), []),
    
    // Entidades
    getEntities: useCallback((searchTerm?: string) => 
      handleApiCall(() => mockService.getEntities(searchTerm)), []),

    createEntity: useCallback((entityData: EntityFormData) => 
      handleApiCall(() => mockService.createEntity(entityData)), []),

    updateEntity: useCallback((id: string, entityData: Partial<EntityFormData>) => 
      handleApiCall(() => mockService.updateEntity(id, entityData)), []),

    deleteEntity: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteEntity(id)), []),
    
    // Tipos de Solicitud
    getRequestTypes: useCallback((searchTerm?: string) => 
      handleApiCall(() => mockService.getRequestTypes(searchTerm)), []),

    createRequestType: useCallback((typeData: RequestTypeFormData) => 
      handleApiCall(() => mockService.createRequestType(typeData)), []),

    updateRequestType: useCallback((id: string, typeData: Partial<RequestTypeFormData>) => 
      handleApiCall(() => mockService.updateRequestType(id, typeData)), []),

    deleteRequestType: useCallback((id: string) => 
      handleApiCall(() => mockService.deleteRequestType(id)), []),
    
    // Dashboard
    getDashboardMetrics: useCallback((filters?: Partial<FilterParams>) => 
      handleApiCall(() => mockService.getDashboardMetrics(filters)), []),

    getCorreos: useCallback((filters?: FilterParams) => 
      handleApiCall(() => mockService.getCorreos(filters)), []),

    getCorreoById: useCallback((id: string) => 
      handleApiCall(() => mockService.getCorreoById(id)), []),

    getFlujosByCorreoId: useCallback((correoId: string) => 
      handleApiCall(() => mockService.getFlujosByCorreoId(correoId)), []),
    
    // Filtros
    getAvailableFilters: useCallback(() => 
      handleApiCall(() => mockService.getAvailableFilters()), []),
    
    // Exportación
    exportToExcel: useCallback((filters?: FilterParams) => 
      handleApiCall(() => mockService.exportToExcel(filters)), []),

    exportToPDF: useCallback((filters?: FilterParams) => 
      handleApiCall(() => mockService.exportToPDF(filters)), []),
  };
};