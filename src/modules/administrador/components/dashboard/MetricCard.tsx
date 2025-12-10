import React from 'react';
import type { MetricaResponse } from '../../../../shared/types/dashboardTypes';

interface MetricCardProps {
    metrica: MetricaResponse;
    className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metrica, className = '' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 text-blue-800',
        green: 'bg-green-50 border-green-200 text-green-800',
        red: 'bg-red-50 border-red-200 text-red-800',
        purple: 'bg-purple-50 border-purple-200 text-purple-800',
        yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };

    const trendIcon = metrica.esPositivo === true ? '↗' : metrica.esPositivo === false ? '↘' : '';
    const trendColor = metrica.esPositivo === true ? 'text-green-600' : 
                       metrica.esPositivo === false ? 'text-red-600' : 'text-gray-600';

    return (
        <div className={`p-6 rounded-xl border ${colorClasses[metrica.color]} ${className} transition-all hover:shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[metrica.color].replace('50', '100')}`}>
                    {/* Icono basado en el tipo de métrica */}
                    {metrica.titulo.includes('Correos') && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    )}
                    {metrica.titulo.includes('Cumplimiento') && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    {metrica.titulo.includes('Vencidos') && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    )}
                    {metrica.titulo.includes('Tiempo') && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
                
                {metrica.porcentajeCambio !== null && (
                    <div className={`text-sm font-medium ${trendColor}`}>
                        {trendIcon} {metrica.porcentajeCambio}%
                    </div>
                )}
            </div>
            
            <div className="mb-2">
                <div className="text-3xl font-bold">{metrica.valor}</div>
                <div className="text-sm font-medium opacity-90">{metrica.titulo}</div>
            </div>
            
            {metrica.descripcion && (
                <div className="text-sm opacity-75 mt-2">{metrica.descripcion}</div>
            )}
        </div>
    );
};

export default MetricCard;