// /shared/hooks/useFlujoCorreo.ts
import { useState, useCallback } from 'react';
import type {
  FlujoCorreoResponse,
  FlujoCorreoFilterRequest,
  FlujoCorreoPageResponse,
  FlujoCorreoEstadisticasResponse,
  PeriodoEstadisticasRequest
} from '../types/flujoCorreoTypes';
import { flujoCorreoService } from '../../services/flujoCorreoService';

export const useFlujoCorreo = () => {
  // Estados para datos
  const [flujoCorreo, setFlujoCorreo] = useState<FlujoCorreoResponse | null>(null);
  const [flujosCorreo, setFlujosCorreo] = useState<FlujoCorreoResponse[]>([]);
  const [flujosCorreoPaginated, setFlujosCorreoPaginated] = useState<FlujoCorreoPageResponse | null>(null);
  const [estadisticas, setEstadisticas] = useState<FlujoCorreoEstadisticasResponse | null>(null);

  // Estados para control de UI
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ==================== BÚSQUEDA Y FILTRADO ====================

  const buscarFlujosCorreo = useCallback(async (filtro: FlujoCorreoFilterRequest): Promise<FlujoCorreoPageResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.buscarFlujosCorreo(filtro);
      setFlujosCorreoPaginated(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al buscar flujos de correo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujoCorreo = useCallback(async (id: number): Promise<FlujoCorreoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujoCorreo(id);
      setFlujoCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujo de correo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== CONSULTAS POR CORREO ====================

  const obtenerFlujosPorCorreo = useCallback(async (correoId: string): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosPorCorreo(correoId);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos por correo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerHistorialCompletoCorreo = useCallback(async (correoId: string): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerHistorialCompletoCorreo(correoId);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener historial completo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== CONSULTAS POR USUARIO ====================

  const obtenerFlujosPorUsuario = useCallback(async (usuarioId: number): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosPorUsuario(usuarioId);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos por usuario';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujosPendientesUsuario = useCallback(async (usuarioId: number): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosPendientesUsuario(usuarioId);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos pendientes';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujosEnProgresoUsuario = useCallback(async (usuarioId: number): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosEnProgresoUsuario(usuarioId);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos en progreso';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== CONSULTAS POR ETAPA ====================

  const obtenerFlujosPorEtapa = useCallback(async (etapa: string): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosPorEtapa(etapa);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos por etapa';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujosEnProgresoPorEtapa = useCallback(async (etapa: string): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosEnProgresoPorEtapa(etapa);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos en progreso por etapa';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== CONSULTAS ESPECIALES ====================

  const obtenerFlujosEnProgreso = useCallback(async (): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosEnProgreso();
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos en progreso';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujosCompletados = useCallback(async (): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosCompletados();
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos completados';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujosSinAsignar = useCallback(async (): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosSinAsignar();
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos sin asignar';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerUltimosFlujosCompletados = useCallback(async (limite: number = 10): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerUltimosFlujosCompletados(limite);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener últimos flujos completados';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerFlujosConMayorTiempo = useCallback(async (limite: number = 10): Promise<FlujoCorreoResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerFlujosConMayorTiempo(limite);
      setFlujosCorreo(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener flujos con mayor tiempo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== ESTADÍSTICAS ====================

  const obtenerEstadisticas = useCallback(async (): Promise<FlujoCorreoEstadisticasResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerEstadisticas();
      setEstadisticas(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener estadísticas';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerEstadisticasPorPeriodo = useCallback(async (
    periodo: PeriodoEstadisticasRequest
  ): Promise<FlujoCorreoEstadisticasResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.obtenerEstadisticasPorPeriodo(periodo);
      setEstadisticas(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al obtener estadísticas por periodo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== OPERACIONES ====================

  const asignarUsuario = useCallback(async (flujoId: number, usuarioId: number): Promise<FlujoCorreoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.asignarUsuario(flujoId, usuarioId);
      // Actualizar el flujo en el estado si existe
      if (flujoCorreo?.id === flujoId) {
        setFlujoCorreo(response);
      }
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al asignar usuario';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [flujoCorreo]);

  const finalizarEtapa = useCallback(async (flujoId: number): Promise<FlujoCorreoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.finalizarEtapa(flujoId);
      // Actualizar el flujo en el estado si existe
      if (flujoCorreo?.id === flujoId) {
        setFlujoCorreo(response);
      }
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al finalizar etapa';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [flujoCorreo]);

  const reasignarFlujo = useCallback(async (flujoId: number, nuevoUsuarioId: number): Promise<FlujoCorreoResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await flujoCorreoService.reasignarFlujo(flujoId, nuevoUsuarioId);
      // Actualizar el flujo en el estado si existe
      if (flujoCorreo?.id === flujoId) {
        setFlujoCorreo(response);
      }
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al reasignar flujo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [flujoCorreo]);

  // ==================== MÉTODOS AUXILIARES ====================

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setFlujoCorreo(null);
    setFlujosCorreo([]);
    setFlujosCorreoPaginated(null);
    setEstadisticas(null);
    setError(null);
  }, []);

  return {
    // Datos
    flujoCorreo,
    flujosCorreo,
    flujosCorreoPaginated,
    estadisticas,
    
    // Estados de UI
    loading,
    error,
    
    // Métodos de consulta
    buscarFlujosCorreo,
    obtenerFlujoCorreo,
    
    // Métodos por correo
    obtenerFlujosPorCorreo,
    obtenerHistorialCompletoCorreo,
    
    // Métodos por usuario
    obtenerFlujosPorUsuario,
    obtenerFlujosPendientesUsuario,
    obtenerFlujosEnProgresoUsuario,
    
    // Métodos por etapa
    obtenerFlujosPorEtapa,
    obtenerFlujosEnProgresoPorEtapa,
    
    // Métodos especiales
    obtenerFlujosEnProgreso,
    obtenerFlujosCompletados,
    obtenerFlujosSinAsignar,
    obtenerUltimosFlujosCompletados,
    obtenerFlujosConMayorTiempo,
    
    // Métodos de estadísticas
    obtenerEstadisticas,
    obtenerEstadisticasPorPeriodo,
    
    // Métodos de operaciones
    asignarUsuario,
    finalizarEtapa,
    reasignarFlujo,
    
    // Métodos auxiliares
    clearError,
    reset
  };
};