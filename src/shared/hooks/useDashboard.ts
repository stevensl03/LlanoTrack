import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../../services/dashboardService';
import type {
    DashboardEstadisticasResponse,
    MetricaResponse,
    DistribucionItem,
    DashboardData
} from '../types/dashboardTypes';

interface UseDashboardReturn {
    // Datos
    estadisticas: DashboardEstadisticasResponse | null;
    kpis: MetricaResponse[];
    distribucionEstado: DistribucionItem[];
    distribucionEtapa: DistribucionItem[];
    dashboardData: DashboardData | null;
    
    // Estado
    loading: boolean;
    error: string | null;
    
    // Métodos
    cargarDashboard: () => Promise<void>;
    cargarEstadisticas: () => Promise<void>;
    cargarKPIs: () => Promise<void>;
    cargarDistribuciones: () => Promise<void>;
    actualizarDashboard: () => Promise<void>;
    limpiarError: () => void;
}

export const useDashboard = (): UseDashboardReturn => {
    // Estados para datos
    const [estadisticas, setEstadisticas] = useState<DashboardEstadisticasResponse | null>(null);
    const [kpis, setKpis] = useState<MetricaResponse[]>([]);
    const [distribucionEstado, setDistribucionEstado] = useState<DistribucionItem[]>([]);
    const [distribucionEtapa, setDistribucionEtapa] = useState<DistribucionItem[]>([]);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    
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

    // Función para construir datos del dashboard
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

    // Cargar todas las estadísticas
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

    // Cargar KPIs
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

    // Cargar distribuciones
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

    // Cargar todo el dashboard
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

    // Actualizar dashboard
    const actualizarDashboard = useCallback(async (): Promise<void> => {
        await cargarDashboard();
    }, [cargarDashboard]);

    // Limpiar error
    const limpiarError = useCallback((): void => {
        setError(null);
    }, []);

    // Cargar datos iniciales
    useEffect(() => {
        const inicializarDashboard = async () => {
            try {
                await cargarDashboard();
            } catch (error) {
                console.error('Error al inicializar dashboard:', error);
            }
        };

        inicializarDashboard();
    }, [cargarDashboard]);

    // Actualizar dashboardData cuando cambian los datos
    useEffect(() => {
        const data = construirDashboardData();
        setDashboardData(data);
    }, [estadisticas, kpis, construirDashboardData]);

    return {
        // Datos
        estadisticas,
        kpis,
        distribucionEstado,
        distribucionEtapa,
        dashboardData,
        
        // Estado
        loading,
        error,
        
        // Métodos
        cargarDashboard,
        cargarEstadisticas,
        cargarKPIs,
        cargarDistribuciones,
        actualizarDashboard,
        limpiarError
    };
};

export default useDashboard;