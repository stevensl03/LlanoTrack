import React from 'react';
import type { DistribucionItem } from '../../../../shared/types/dashboardTypes';

interface DistributionChartProps {
    titulo: string;
    datos: DistribucionItem[];
    color?: 'blue' | 'green' | 'purple' | 'orange';
    maxItems?: number;
}

const DistributionChart: React.FC<DistributionChartProps> = ({
    titulo,
    datos,
    color = 'blue',
    maxItems = 5
}) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        purple: 'bg-purple-100 text-purple-800',
        orange: 'bg-orange-100 text-orange-800'
    };

    const barColors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-500'
    };

    const datosMostrados = datos.slice(0, maxItems);
    const total = datos.reduce((sum, item) => sum + item.valor, 0);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>
            
            <div className="space-y-4">
                {datosMostrados.map((item, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700">{item.nombre}</span>
                            <span className="text-gray-600">
                                {item.valor} ({item.porcentaje}%)
                            </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`${barColors[color]} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${item.porcentaje}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {datos.length > maxItems && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                        +{datos.length - maxItems} más...
                    </p>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Total</span>
                    <span className="font-bold text-gray-800">{total}</span>
                </div>
            </div>
        </div>
    );
};

export default DistributionChart;