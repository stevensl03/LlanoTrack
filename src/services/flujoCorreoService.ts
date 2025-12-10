// /services/flujoCorreoService.ts
import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  FlujoCorreoResponse,
  FlujoCorreoFilterRequest,
  FlujoCorreoPageResponse,
  FlujoCorreoEstadisticasResponse,
  PeriodoEstadisticasRequest
} from '../shared/types/flujoCorreoTypes';

class FlujoCorreoService {
  private api: AxiosInstance;
  private readonly BASE_URL = '/api/v1/flujos-correo';

  constructor() {
    this.api = axios.create({
      baseURL: (window as any).ENV?.REACT_APP_API_BASE_URL || 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para manejar errores globalmente
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Error en petición de FlujoCorreo:', error);
        return Promise.reject(error);
      }
    );
  }

  // ==================== BÚSQUEDA Y FILTRADO ====================

  async buscarFlujosCorreo(filtro: FlujoCorreoFilterRequest): Promise<FlujoCorreoPageResponse> {
    const response = await this.api.post<FlujoCorreoPageResponse>(
      `${this.BASE_URL}/search`,
      filtro
    );
    return response.data;
  }

  async obtenerFlujoCorreo(id: number): Promise<FlujoCorreoResponse> {
    const response = await this.api.get<FlujoCorreoResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  // ==================== CONSULTAS POR CORREO ====================

  async obtenerFlujosPorCorreo(correoId: string): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/correo/${correoId}`
    );
    return response.data;
  }

  async obtenerHistorialCompletoCorreo(correoId: string): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/correo/${correoId}/historial`
    );
    return response.data;
  }

  // ==================== CONSULTAS POR USUARIO ====================

  async obtenerFlujosPorUsuario(usuarioId: number): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/usuario/${usuarioId}`
    );
    return response.data;
  }

  async obtenerFlujosPendientesUsuario(usuarioId: number): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/usuario/${usuarioId}/pendientes`
    );
    return response.data;
  }

  async obtenerFlujosEnProgresoUsuario(usuarioId: number): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/usuario/${usuarioId}/en-progreso`
    );
    return response.data;
  }

  // ==================== CONSULTAS POR ETAPA ====================

  async obtenerFlujosPorEtapa(etapa: string): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/etapa/${etapa}`
    );
    return response.data;
  }

  async obtenerFlujosEnProgresoPorEtapa(etapa: string): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/etapa/${etapa}/en-progreso`
    );
    return response.data;
  }

  // ==================== CONSULTAS ESPECIALES ====================

  async obtenerFlujosEnProgreso(): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(`${this.BASE_URL}/en-progreso`);
    return response.data;
  }

  async obtenerFlujosCompletados(): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(`${this.BASE_URL}/completados`);
    return response.data;
  }

  async obtenerFlujosSinAsignar(): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(`${this.BASE_URL}/sin-asignar`);
    return response.data;
  }

  async obtenerUltimosFlujosCompletados(limite: number = 10): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/ultimos-completados`,
      {
        params: { limite }
      }
    );
    return response.data;
  }

  async obtenerFlujosConMayorTiempo(limite: number = 10): Promise<FlujoCorreoResponse[]> {
    const response = await this.api.get<FlujoCorreoResponse[]>(
      `${this.BASE_URL}/mayor-tiempo`,
      {
        params: { limite }
      }
    );
    return response.data;
  }

  // ==================== ESTADÍSTICAS ====================

  async obtenerEstadisticas(): Promise<FlujoCorreoEstadisticasResponse> {
    const response = await this.api.get<FlujoCorreoEstadisticasResponse>(
      `${this.BASE_URL}/estadisticas`
    );
    return response.data;
  }

  async obtenerEstadisticasPorPeriodo(
    periodo: PeriodoEstadisticasRequest
  ): Promise<FlujoCorreoEstadisticasResponse> {
    const response = await this.api.get<FlujoCorreoEstadisticasResponse>(
      `${this.BASE_URL}/estadisticas/periodo`,
      {
        params: {
          inicio: periodo.inicio,
          fin: periodo.fin
        }
      }
    );
    return response.data;
  }

  // ==================== OPERACIONES ====================

  async asignarUsuario(flujoId: number, usuarioId: number): Promise<FlujoCorreoResponse> {
    const response = await this.api.put<FlujoCorreoResponse>(
      `${this.BASE_URL}/${flujoId}/asignar-usuario`,
      null,
      {
        params: { usuarioId }
      }
    );
    return response.data;
  }

  async finalizarEtapa(flujoId: number): Promise<FlujoCorreoResponse> {
    const response = await this.api.put<FlujoCorreoResponse>(
      `${this.BASE_URL}/${flujoId}/finalizar`
    );
    return response.data;
  }

  async reasignarFlujo(flujoId: number, nuevoUsuarioId: number): Promise<FlujoCorreoResponse> {
    const response = await this.api.put<FlujoCorreoResponse>(
      `${this.BASE_URL}/${flujoId}/reasignar`,
      null,
      {
        params: { nuevoUsuarioId }
      }
    );
    return response.data;
  }

  // Métodos para añadir interceptores personalizados si es necesario
  setAuthToken(token: string): void {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.api.defaults.headers.common['Authorization'];
  }
}

export const flujoCorreoService = new FlujoCorreoService();