import type { JSX } from "react";

type Props = { data: Array<any> };

const getStatusColor = (status: string): string => {
    switch (status) {
        case "Vencido": return "bg-red-100 text-red-800";
        case "En Proceso": return "bg-yellow-100 text-yellow-800";
        case "Gestionado": return "bg-green-100 text-green-800";
        case "Pendiente": return "bg-blue-100 text-blue-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

const getProgressBarColor = (cumplimiento: number): string => {
    if (cumplimiento >= 80) return "bg-green-500";
    if (cumplimiento >= 50) return "bg-yellow-500";
    return "bg-red-500";
};

const TableEmailManagement = ({ data }: Props): JSX.Element => {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-xs font-semibold text-gray-700 border-b">
                        <th className="py-3 px-4">RADICADO</th>
                        <th className="py-3 px-4">ENTIDAD REMITENTE</th>
                        <th className="py-3 px-4">PLAZO (DIAS)</th>
                        <th className="py-3 px-4">ESTADO ACTUAL</th>
                        <th className="py-3 px-4">GESTOR ASIGNADO</th>
                        <th className="py-3 px-4">% CUMPLIMIENTO</th>
                        <th className="py-3 px-4">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-4 text-center text-gray-500">No results</td>
                        </tr>
                    ) : data.map(m => (
                        <tr key={m.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">#{m.radicado}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{m.Entidad}</td>
                            <td className="py-3 px-4 text-sm">
                                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
                                    {m.plazo}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm">
                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(m.EstadoActual)}`}>
                                    {m.EstadoActual}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                                        {m.Gestor ? m.Gestor.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <span className="text-gray-700">{m.Gestor}</span>
                                </div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${getProgressBarColor(m.cumplimiento)}`}
                                            style={{ width: `${m.cumplimiento}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">{m.cumplimiento}%</span>
                                </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableEmailManagement;