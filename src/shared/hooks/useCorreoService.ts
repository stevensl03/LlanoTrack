import { useState, useCallback } from 'react';
import { correoService } from '../../services/correoService';
import type {
    CorreoFilterRequest,
    CorreoResponse,
    PageResponse
} from '../types/correoTypes';

interface UseCorreoServiceReturn {
    // Datos
    correosPaginados: PageResponse<CorreoResponse> | null;
    correos: CorreoResponse[];
    
    // Estado de la búsqueda
    loadingBusqueda: boolean;
    errorBusqueda: string | null;
    totalCorreos: number;
    totalPaginas: number;
    paginaActual: number;
    
    // Métodos (solo el de búsqueda por ahora)
    buscarCorreos: (filtro: CorreoFilterRequest) => Promise<void>;
    limpiarBusqueda: () => void;
    limpiarErrorBusqueda: () => void;
}

export const useCorreoService = (): UseCorreoServiceReturn => {
    // Estados para la búsqueda paginada
    const [correosPaginados, setCorreosPaginados] = useState<PageResponse<CorreoResponse> | null>(null);
    const [loadingBusqueda, setLoadingBusqueda] = useState<boolean>(false);
    const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);

    // Estados derivados para facilitar el acceso
    const correos = correosPaginados?.content || [];
    const totalCorreos = correosPaginados?.totalElements || 0;
    const totalPaginas = correosPaginados?.totalPages || 0;
    const paginaActual = correosPaginados?.number || 0;

    /**
     * Función para buscar correos con filtros
     */
    const buscarCorreos = useCallback(async (filtro: CorreoFilterRequest): Promise<void> => {
        setLoadingBusqueda(true);
        setErrorBusqueda(null);
        
        try {
            const resultado = await correoService.buscarCorreos(filtro);
            setCorreosPaginados(resultado);
        } catch (err: any) {
            const mensajeError = err.message || "Error al buscar correos";
            setErrorBusqueda(mensajeError);
            throw err; // Propaga el error para que el componente pueda manejarlo
        } finally {
            setLoadingBusqueda(false);
        }
    }, []);

    /**
     * Limpiar resultados de búsqueda
     */
    const limpiarBusqueda = useCallback((): void => {
        setCorreosPaginados(null);
        setErrorBusqueda(null);
    }, []);

    /**
     * Limpiar solo el error de búsqueda
     */
    const limpiarErrorBusqueda = useCallback((): void => {
        setErrorBusqueda(null);
    }, []);

    return {
        // Datos
        correosPaginados,
        correos,
        
        // Estado
        loadingBusqueda,
        errorBusqueda,
        totalCorreos,
        totalPaginas,
        paginaActual,
        
        // Métodos
        buscarCorreos,
        limpiarBusqueda,
        limpiarErrorBusqueda
    };
};

export default useCorreoService;