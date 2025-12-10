import React from 'react';
import useDashboard from '../../../shared/hooks/useDashboard';
import MetricCard from '../components/dashboard/MetricCard';
import DistributionChart from '../components/dashboard/DistributionChart';

const DashboardPage: React.FC = () => {
    const {
        dashboardData,
        loading,
        error,
        actualizarDashboard,
        limpiarError
    } = useDashboard();

    if (loading && !dashboardData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-red-800">Error al cargar dashboard</h3>
                            <div className="mt-2 text-red-700">
                                <p>{error}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => {
                                        limpiarError();
                                        actualizarDashboard();
                                    }}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Sin datos</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        No hay datos disponibles para mostrar en el dashboard.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={actualizarDashboard}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Panel de Gestión de Correos</h1>
                        <p className="mt-2 text-gray-600">Sistema integral de seguimiento de solicitudes</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={actualizarDashboard}
                            disabled={loading}
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                loading
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Actualizando...
                                </>
                            ) : (
                                <>
                                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Actualizar
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Métricas principales */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Métricas de Correos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardData.metricas.map((metrica, index) => (
                        <MetricCard key={index} metrica={metrica} />
                    ))}
                </div>
            </div>

            {/* Distribuciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <DistributionChart
                    titulo="Distribución por Estado"
                    datos={dashboardData.distribucionEstado}
                    color="blue"
                    maxItems={5}
                />
                <DistributionChart
                    titulo="Distribución por Etapa"
                    datos={dashboardData.distribucionEtapa}
                    color="green"
                    maxItems={5}
                />
            </div>

            {/* Resumen estadístico */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Resumen Estadístico</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{dashboardData.totalCorreos}</div>
                        <div className="text-sm text-gray-600">Total de correos gestionados</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{dashboardData.cumplimiento}%</div>
                        <div className="text-sm text-gray-600">Tasa de cumplimiento global</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{dashboardData.tiempoPromedio}d</div>
                        <div className="text-sm text-gray-600">Tiempo promedio de respuesta</div>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Información del Dashboard</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <p>
                                Este dashboard muestra métricas en tiempo real del sistema de gestión de correos.
                                Los datos se actualizan automáticamente cada vez que recargas la página.
                            </p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li><strong>Total Correos:</strong> Número total de solicitudes recibidas</li>
                                <li><strong>Cumplimiento:</strong> Porcentaje de solicitudes respondidas a tiempo</li>
                                <li><strong>Vencidos:</strong> Solicitudes que excedieron el plazo de respuesta</li>
                                <li><strong>Tiempo Promedio:</strong> Días promedio para responder una solicitud</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;