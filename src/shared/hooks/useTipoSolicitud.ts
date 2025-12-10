// /shared/hooks/useTipoSolicitud.ts
import { useState, useCallback } from 'react';
import type { TipoSolicitud, TipoSolicitudRequest } from '../types/tipoSolicitudTypes';
import { tipoSolicitudService } from '../../services/tipoSolicitudService';

interface UseTipoSolicitudReturn {
  // Datos
  tiposSolicitud: TipoSolicitud[];
  
  // Estados
  loading: boolean;
  error: string | null;
  
  // Métodos CRUD
  cargarTipos: () => Promise<TipoSolicitud[]>;
  buscarPorNombre: (nombre: string) => Promise<TipoSolicitud[]>;
  crear: (request: TipoSolicitudRequest) => Promise<TipoSolicitud>;
  actualizar: (id: number, request: TipoSolicitudRequest) => Promise<TipoSolicitud>;
  eliminar: (id: number) => Promise<void>;
  
  // Métodos auxiliares
  clearError: () => void;
  reset: () => void;
}

export const useTipoSolicitud = (): UseTipoSolicitudReturn => {
  const [tiposSolicitud, setTiposSolicitud] = useState<TipoSolicitud[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarTipos = useCallback(async (): Promise<TipoSolicitud[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await tipoSolicitudService.listarTodos();
      setTiposSolicitud(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar tipos de solicitud';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarPorNombre = useCallback(async (nombre: string): Promise<TipoSolicitud[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await tipoSolicitudService.buscarPorNombre(nombre);
      setTiposSolicitud(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al buscar tipos de solicitud';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (request: TipoSolicitudRequest): Promise<TipoSolicitud> => {
    setLoading(true);
    setError(null);
    try {
      const response = await tipoSolicitudService.crear(request);
      // Actualizar la lista después de crear
      await cargarTipos();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear tipo de solicitud';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cargarTipos]);

  const actualizar = useCallback(async (id: number, request: TipoSolicitudRequest): Promise<TipoSolicitud> => {
    setLoading(true);
    setError(null);
    try {
      const response = await tipoSolicitudService.actualizar(id, request);
      // Actualizar la lista después de actualizar
      await cargarTipos();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar tipo de solicitud';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cargarTipos]);

  const eliminar = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await tipoSolicitudService.eliminar(id);
      // Actualizar la lista después de eliminar
      setTiposSolicitud(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar tipo de solicitud';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setTiposSolicitud([]);
    setError(null);
  }, []);

  return {
    tiposSolicitud,
    loading,
    error,
    cargarTipos,
    buscarPorNombre,
    crear,
    actualizar,
    eliminar,
    clearError,
    reset
  };
};