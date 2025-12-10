import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../../services/dashboardService';
import type {
    DashboardEstadisticasResponse,
    MetricaResponse,
    DistribucionItem,
    DashboardData,
    OpcionesFiltroResponse,
    FiltroCorreoRequestDTO,
    RespuestaFiltroCorreos,
    CorreoFiltradoDTO,
    DashboardEstadisticasCompletasDTO
} from '../types/dashboardTypes';

interface UseDashboardReturn {
    // Datos del dashboard principal
    estadisticas: DashboardEstadisticasResponse | null;
    kpis: MetricaResponse[];
    distribucionEstado: DistribucionItem[];
    distribucionEtapa: DistribucionItem[];
    dashboardData: DashboardData | null;
    
    // Datos de filtros
    opcionesFiltro: OpcionesFiltroResponse | null;
    correosFiltrados: CorreoFiltradoDTO[];
    filtrosAplicados: FiltroCorreoRequestDTO | null;
    paginacion: {
        paginaActual: number;
        totalPaginas: number;
        totalElementos: number;
        tamanoPagina: number;
        esPrimeraPagina: boolean;
        esUltimaPagina: boolean;
        totalElementosPagina: number;
    } | null;
    estadisticasCompletas: DashboardEstadisticasCompletasDTO | null;
    
    // Estados de carga y error
    loading: boolean;
    error: string | null;
    
    // Métodos principales
    cargarDashboard: () => Promise<void>;
    cargarEstadisticas: () => Promise<void>;
    cargarKPIs: () => Promise<void>;
    cargarDistribuciones: () => Promise<void>;
    actualizarDashboard: () => Promise<void>;
    
    // Métodos de filtros
    cargarOpcionesFiltro: () => Promise<void>;
    aplicarFiltros: (
        filtro: FiltroCorreoRequestDTO,
        pagina?: number,
        tamano?: number,
        ordenarPor?: string,
        direccion?: string
    ) => Promise<RespuestaFiltroCorreos>;
    limpiarFiltros: (pagina?: number, tamano?: number) => Promise<RespuestaFiltroCorreos>;
    cargarEstadisticasCompletas: () => Promise<void>;
    
    // Utilidades
    limpiarError: () => void;
    resetearFiltros: () => void;
}

export const useDashboard = (): UseDashboardReturn => {
    // Estados para datos del dashboard principal
    const [estadisticas, setEstadisticas] = useState<DashboardEstadisticasResponse | null>(null);
    const [kpis, setKpis] = useState<MetricaResponse[]>([]);
    const [distribucionEstado, setDistribucionEstado] = useState<DistribucionItem[]>([]);
    const [distribucionEtapa, setDistribucionEtapa] = useState<DistribucionItem[]>([]);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    
    // Estados para datos de filtros
    const [opcionesFiltro, setOpcionesFiltro] = useState<OpcionesFiltroResponse | null>(null);
    const [correosFiltrados, setCorreosFiltrados] = useState<CorreoFiltradoDTO[]>([]);
    const [filtrosAplicados, setFiltrosAplicados] = useState<FiltroCorreoRequestDTO | null>(null);
    const [paginacion, setPaginacion] = useState<{
        paginaActual: number;
        totalPaginas: number;
        totalElementos: number;
        tamanoPagina: number;
        esPrimeraPagina: boolean;
        esUltimaPagina: boolean;
        totalElementosPagina: number;
    } | null>(null);
    const [estadisticasCompletas, setEstadisticasCompletas] = useState<DashboardEstadisticasCompletasDTO | null>(null);
    
    // Estados para UI
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función para transformar distribución de objeto a array
    const transformarDistribucion = useCallback((distribucion: Record<string, number>): DistribucionItem[] => {
        const total = Object.values(distribucion).reduce((sum, val) => sum + val, 0);
        
        return Object.entries(distribucion).map(([nombre, valor]) => ({
            nombre,
            valor,
            porcentaje: total > 0 ? Math.round((valor / total) * 100) : 0
        })).sort((a, b) => b.valor - a.valor);
    }, []);

    // Función para construir datos del dashboard principal
    const construirDashboardData = useCallback((): DashboardData | null => {
        if (!estadisticas || kpis.length === 0) {
            return null;
        }

        return {
            metricas: kpis,
            distribucionEstado: transformarDistribucion(estadisticas.distribucion_estado),
            distribucionEtapa: transformarDistribucion(estadisticas.distribucion_etapa),
            totalCorreos: estadisticas.total_correos,
            cumplimiento: estadisticas.cumplimiento,
            tiempoPromedio: estadisticas.tiempo_promedio
        };
    }, [estadisticas, kpis, transformarDistribucion]);

    // ========== MÉTODOS PRINCIPALES DEL DASHBOARD ==========

    const cargarEstadisticas = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.obtenerEstadisticas();
            setEstadisticas(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar estadísticas del dashboard');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const cargarKPIs = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.obtenerKPIsPrincipales();
            setKpis(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar KPIs del dashboard');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const cargarDistribuciones = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const [estadoData, etapaData] = await Promise.all([
                dashboardService.obtenerDistribucionPorEstado(),
                dashboardService.obtenerDistribucionPorEtapa()
            ]);

            setDistribucionEstado(transformarDistribucion(estadoData));
            setDistribucionEtapa(transformarDistribucion(etapaData));
        } catch (err: any) {
            setError(err.message || 'Error al cargar distribuciones del dashboard');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [transformarDistribucion]);

    const cargarDashboard = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.obtenerDashboardCompleto();
            
            setEstadisticas(data.estadisticas);
            setKpis(data.kpis);
            setDistribucionEstado(transformarDistribucion(data.distribucionEstado));
            setDistribucionEtapa(transformarDistribucion(data.distribucionEtapa));
            
            // Construir datos consolidados
            const dashboardConsolidado: DashboardData = {
                metricas: data.kpis,
                distribucionEstado: transformarDistribucion(data.distribucionEstado),
                distribucionEtapa: transformarDistribucion(data.distribucionEtapa),
                totalCorreos: data.estadisticas.total_correos,
                cumplimiento: data.estadisticas.cumplimiento,
                tiempoPromedio: data.estadisticas.tiempo_promedio
            };
            
            setDashboardData(dashboardConsolidado);
        } catch (err: any) {
            setError(err.message || 'Error al cargar dashboard completo');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [transformarDistribucion]);

    const actualizarDashboard = useCallback(async (): Promise<void> => {
        await cargarDashboard();
    }, [cargarDashboard]);

    // ========== MÉTODOS DE FILTROS ==========

    const cargarOpcionesFiltro = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.cargarOpcionesFiltro();
            setOpcionesFiltro(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar opciones de filtro');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const aplicarFiltros = useCallback(async (
        filtro: FiltroCorreoRequestDTO,
        pagina: number = 0,
        tamano: number = 20,
        ordenarPor: string = "fechaRecepcion",
        direccion: string = "DESC"
    ): Promise<RespuestaFiltroCorreos> => {
        setLoading(true);
        setError(null);
        try {
            const respuesta = await dashboardService.aplicarFiltros(
                filtro,
                pagina,
                tamano,
                ordenarPor,
                direccion
            );
            
            // Actualizar estados con la respuesta
            setCorreosFiltrados(respuesta.correos);
            setFiltrosAplicados(filtro);
            setPaginacion({
                paginaActual: respuesta.paginaActual,
                totalPaginas: respuesta.totalPaginas,
                totalElementos: respuesta.totalElementos,
                tamanoPagina: respuesta.tamanoPagina,
                esPrimeraPagina: respuesta.esPrimeraPagina,
                esUltimaPagina: respuesta.esUltimaPagina,
                totalElementosPagina: respuesta.totalElementosPagina
            });
            
            return respuesta;
        } catch (err: any) {
            setError(err.message || 'Error al aplicar filtros');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const limpiarFiltros = useCallback(async (
        pagina: number = 0,
        tamano: number = 20
    ): Promise<RespuestaFiltroCorreos> => {
        setLoading(true);
        setError(null);
        try {
            const respuesta = await dashboardService.limpiarFiltros(pagina, tamano);
            
            // Actualizar estados con la respuesta limpia
            setCorreosFiltrados(respuesta.correos);
            setFiltrosAplicados(null);
            setPaginacion({
                paginaActual: respuesta.paginaActual,
                totalPaginas: respuesta.totalPaginas,
                totalElementos: respuesta.totalElementos,
                tamanoPagina: respuesta.tamanoPagina,
                esPrimeraPagina: respuesta.esPrimeraPagina,
                esUltimaPagina: respuesta.esUltimaPagina,
                totalElementosPagina: respuesta.totalElementosPagina
            });
            
            return respuesta;
        } catch (err: any) {
            setError(err.message || 'Error al limpiar filtros');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const cargarEstadisticasCompletas = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.obtenerEstadisticasCompletas();
            setEstadisticasCompletas(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar estadísticas completas');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // ========== UTILIDADES ==========

    const limpiarError = useCallback((): void => {
        setError(null);
    }, []);

    const resetearFiltros = useCallback((): void => {
        setCorreosFiltrados([]);
        setFiltrosAplicados(null);
        setPaginacion(null);
    }, []);

    // ========== EFECTOS ==========

    // Cargar datos iniciales del dashboard
    useEffect(() => {
        const inicializarDashboard = async () => {
            try {
                await cargarDashboard();
                await cargarOpcionesFiltro();
            } catch (error) {
                console.error('Error al inicializar dashboard:', error);
            }
        };

        inicializarDashboard();
    }, [cargarDashboard, cargarOpcionesFiltro]);

    // Actualizar dashboardData cuando cambian los datos principales
    useEffect(() => {
        const data = construirDashboardData();
        setDashboardData(data);
    }, [estadisticas, kpis, construirDashboardData]);

    // ========== RETORNO DEL HOOK ==========

    return {
        // Datos del dashboard principal
        estadisticas,
        kpis,
        distribucionEstado,
        distribucionEtapa,
        dashboardData,
        
        // Datos de filtros
        opcionesFiltro,
        correosFiltrados,
        filtrosAplicados,
        paginacion,
        estadisticasCompletas,
        
        // Estados de carga y error
        loading,
        error,
        
        // Métodos principales
        cargarDashboard,
        cargarEstadisticas,
        cargarKPIs,
        cargarDistribuciones,
        actualizarDashboard,
        
        // Métodos de filtros
        cargarOpcionesFiltro,
        aplicarFiltros,
        limpiarFiltros,
        cargarEstadisticasCompletas,
        
        // Utilidades
        limpiarError,
        resetearFiltros
    };
};

export default useDashboard;