// /services/tipoSolicitudService.ts - CORREGIDO
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { TipoSolicitud, TipoSolicitudRequest } from '../shared/types/tipoSolicitudTypes';

class TipoSolicitudService {
  private api: AxiosInstance;

  constructor() {
    // Obtener la URL base del archivo .env o usar la predeterminada
    const apiBaseUrl = (window as any).env?.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    
    this.api = axios.create({
      baseURL: apiBaseUrl, // Solo la URL base, sin /api/v1
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configurar interceptores
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Error en petición:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data
        });
        
        if (error.response?.status === 409) {
          error.message = error.response?.data?.message || 'No se puede eliminar porque tiene correos asociados';
        } else if (error.response?.status === 400) {
          error.message = error.response?.data?.message || 'Error en la validación de datos';
        } else if (error.response?.status === 405) {
          error.message = 'Método HTTP no permitido. Verifique la configuración del servidor.';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Obtener todos los tipos de solicitud
   */
  async listarTodos(): Promise<TipoSolicitud[]> {
    const response = await this.api.get<TipoSolicitud[]>('/api/v1/tipos-solicitud'); // URL completa
    return response.data;
  }

  /**
   * Buscar tipos de solicitud por nombre
   */
  async buscarPorNombre(nombre: string): Promise<TipoSolicitud[]> {
    const response = await this.api.get<TipoSolicitud[]>('/api/v1/tipos-solicitud/buscar', {
      params: { nombre }
    });
    return response.data;
  }

  /**
   * Crear un nuevo tipo de solicitud
   */
  async crear(request: TipoSolicitudRequest): Promise<TipoSolicitud> {
    const response = await this.api.post<TipoSolicitud>('/api/v1/tipos-solicitud', request);
    return response.data;
  }

  /**
   * Actualizar un tipo de solicitud existente
   */
  async actualizar(id: number, request: TipoSolicitudRequest): Promise<TipoSolicitud> {
    const response = await this.api.put<TipoSolicitud>(`/api/v1/tipos-solicitud/${id}`, request);
    return response.data;
  }

  /**
   * Eliminar un tipo de solicitud
   */
  async eliminar(id: number): Promise<void> {
    await this.api.delete(`/api/v1/tipos-solicitud/${id}`);
  }

  // ... resto del código
}

export const tipoSolicitudService = new TipoSolicitudService();