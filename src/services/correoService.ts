import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
    CorreoFilterRequest,
    CorreoResponse,
    PageResponse
} from "../shared/types/correoTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

class CorreoService {
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
                    console.error("Error en respuesta de correos:", error.response.data);
                    return Promise.reject(error.response.data);
                } else if (error.request) {
                    console.error("Error en la solicitud de correos:", error.request);
                    return Promise.reject({ message: "Error de conexión con el servidor" });
                } else {
                    console.error("Error en correos:", error.message);
                    return Promise.reject({ message: error.message });
                }
            }
        );
    }

    /**
     * POST /api/v1/correos/search
     * Busca correos con filtros avanzados (paginado)
     * @param filtro - Objeto con los filtros de búsqueda
     * @returns Promise<PageResponse<CorreoResponse>>
     */
    async buscarCorreos(filtro: CorreoFilterRequest): Promise<PageResponse<CorreoResponse>> {
        try {
            const response = await this.api.post<PageResponse<CorreoResponse>>("/correos/search", filtro);
            return response.data;
        } catch (error) {
            console.error("Error al buscar correos:", error);
            throw error;
        }
    }

    // NOTA: Los otros métodos del controller se implementarán más adelante
    // según el patrón "un endpoint a la vez"
}

export const correoService = new CorreoService();
export default correoService;