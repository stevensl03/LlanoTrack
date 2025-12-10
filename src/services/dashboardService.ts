import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
    DashboardEstadisticasResponse,
    MetricaResponse,
    DashboardEstadisticasCompletasDTO,
    OpcionesFiltroResponse,
    FiltroCorreoRequestDTO,
    RespuestaFiltroCorreos
} from "../shared/types/dashboardTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

class DashboardService {
    private api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    constructor() {
        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                if (error.response) {
                    console.error("Error en respuesta del dashboard:", error.response.data);
                    return Promise.reject(error.response.data);
                } else if (error.request) {
                    console.error("Error en la solicitud del dashboard:", error.request);
                    return Promise.reject({ message: "Error de conexión con el servidor" });
                } else {
                    console.error("Error en dashboard:", error.message);
                    return Promise.reject({ message: error.message });
                }
            }
        );
    }

    /**
     * Obtener estadísticas completas del dashboard
     */
    async obtenerEstadisticas(): Promise<DashboardEstadisticasResponse> {
        try {
            const response = await this.api.get<DashboardEstadisticasResponse>("/dashboard/estadisticas/correos");
            return response.data;
        } catch (error) {
            console.error("Error al obtener estadísticas del dashboard:", error);
            throw error;
        }
    }

    /**
     * Obtener KPIs principales
     */
    async obtenerKPIsPrincipales(): Promise<MetricaResponse[]> {
        try {
            const response = await this.api.get<MetricaResponse[]>("/dashboard/indicadores");
            return response.data;
        } catch (error) {
            console.error("Error al obtener KPIs del dashboard:", error);
            throw error;
        }
    }

    /**
     * Obtener distribución por estado
     */
    async obtenerDistribucionPorEstado(): Promise<Record<string, number>> {
        try {
            const response = await this.api.get<Record<string, number>>("/dashboard/distribucion/estado");
            return response.data;
        } catch (error) {
            console.error("Error al obtener distribución por estado:", error);
            throw error;
        }
    }

    /**
     * Obtener distribución por etapa
     */
    async obtenerDistribucionPorEtapa(): Promise<Record<string, number>> {
        try {
            const response = await this.api.get<Record<string, number>>("/dashboard/distribucion/etapa");
            return response.data;
        } catch (error) {
            console.error("Error al obtener distribución por etapa:", error);
            throw error;
        }
    }
    /**
 * Obtener estadísticas completas del dashboard
 * (Endpoint: GET /dashboard/estadisticas)
 */
async obtenerEstadisticasCompletas(): Promise<DashboardEstadisticasCompletasDTO> {
    try {
        const response = await this.api.get<DashboardEstadisticasCompletasDTO>("/dashboard/estadisticas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas completas del dashboard:", error);
        throw error;
    }
}

/**
 * Cargar opciones de filtro para el dashboard
 * (Endpoint: GET /dashboard/opciones-filtro)
 */
async cargarOpcionesFiltro(): Promise<OpcionesFiltroResponse> {
    try {
        const response = await this.api.get<OpcionesFiltroResponse>("/dashboard/opciones-filtro");
        return response.data;
    } catch (error) {
        console.error("Error al cargar opciones de filtro:", error);
        throw error;
    }
}

/**
 * Aplicar filtros a los correos
 * (Endpoint: POST /dashboard/filtrar)
 */
async aplicarFiltros(
    filtro: FiltroCorreoRequestDTO,
    pagina: number = 0,
    tamano: number = 20,
    ordenarPor: string = "fechaRecepcion",
    direccion: string = "DESC"
): Promise<RespuestaFiltroCorreos> {
    try {
        const response = await this.api.post<RespuestaFiltroCorreos>(
            `/dashboard/filtrar?pagina=${pagina}&tamano=${tamano}&ordenarPor=${ordenarPor}&direccion=${direccion}`,
            filtro
        );
        return response.data;
    } catch (error) {
        console.error("Error al aplicar filtros:", error);
        throw error;
    }
}

/**
 * Limpiar filtros y obtener datos sin filtros
 * (Endpoint: POST /dashboard/limpiar-filtros)
 */
async limpiarFiltros(
    pagina: number = 0,
    tamano: number = 20
): Promise<RespuestaFiltroCorreos> {
    try {
        const response = await this.api.post<RespuestaFiltroCorreos>(
            `/dashboard/limpiar-filtros?pagina=${pagina}&tamano=${tamano}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al limpiar filtros:", error);
        throw error;
    }
}   

    /**
     * Obtener todas las métricas del dashboard en una sola llamada
     */
    async obtenerDashboardCompleto(): Promise<{
        estadisticas: DashboardEstadisticasResponse;
        kpis: MetricaResponse[];
        distribucionEstado: Record<string, number>;
        distribucionEtapa: Record<string, number>;
    }> {
        try {
            const [estadisticas, kpis, distribucionEstado, distribucionEtapa] = await Promise.all([
                this.obtenerEstadisticas(),
                this.obtenerKPIsPrincipales(),
                this.obtenerDistribucionPorEstado(),
                this.obtenerDistribucionPorEtapa()
            ]);

            return {
                estadisticas,
                kpis,
                distribucionEstado,
                distribucionEtapa
            };
        } catch (error) {
            console.error("Error al obtener dashboard completo:", error);
            throw error;
        }
    }

    
}

export const dashboardService = new DashboardService();
export default dashboardService;