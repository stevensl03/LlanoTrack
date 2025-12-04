import type { JSX } from "react";
import { useMemo, useState } from "react";

type FilterShape = {
    radicado: string;
    entity: string;
    status: string;
};

type EmailManagementProps = {
    filters: FilterShape;
    setFilters: (filters: FilterShape) => void;
    items?: Array<Record<string, any>>;
};

const AdvancedEmailFilters = ({ filters, setFilters, items }: EmailManagementProps): JSX.Element => {
    const [searchRadicado, setSearchRadicado] = useState("");

    const defaultEntities = ["All Entities", "Ministerio de TIC", "Contralo", "Marketing", "Soporte", "Ventas"];
    const defaultStatuses = ["All Status", "Vencido", "En Proceso", "Gestionado", "Pendiente"];

    const radicadoOptions = useMemo(() => {
        if (items && items.length) {
            const vals = items.map(m => String(m.radicado)).filter(Boolean);
            return ["__", ...Array.from(new Set(vals))];
        }
        return ["__", "1213123", "1213124", "1213125", "1213126", "1213127", "1213128", "1213129", "1213130", "1213131", "1213132"];
    }, [items]);

    const entityOptions = useMemo(() => {
        if (items && items.length) {
            const vals = items.map(m => m.Entidad as string).filter(Boolean);
            return ["All Entities", ...Array.from(new Set(vals))];
        }
        return defaultEntities;
    }, [items]);

    const statusOptions = useMemo(() => {
        if (items && items.length) {
            const vals = items.map(m => m.EstadoActual as string).filter(Boolean);
            return ["All Status", ...Array.from(new Set(vals))];
        }
        return defaultStatuses;
    }, [items]);

    const filteredRadicados = useMemo(() => {
        return radicadoOptions.filter(r => r === "__" || r.includes(searchRadicado));
    }, [searchRadicado, radicadoOptions]);

    const handleRadicadoChange = (val: string) => {
        setFilters({ ...filters, radicado: val });
        setSearchRadicado("");
    };

    const handleReset = () => {
        setFilters({ radicado: "__", entity: "All Entities", status: "All Status" });
        setSearchRadicado("");
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
                {/* Radicado Search Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Radicado</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchRadicado}
                            onChange={(e) => setSearchRadicado(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                        />
                        {searchRadicado && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md z-10 max-h-48 overflow-y-auto">
                                {filteredRadicados.map(rad => (
                                    <button
                                        key={rad}
                                        onClick={() => handleRadicadoChange(rad)}
                                        className="w-full text-left px-3 py-2 hover:bg-blue-100 text-sm"
                                    >
                                        {rad}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Entity Dropdown */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Entity</label>
                    <select
                        value={filters.entity}
                        onChange={(e) => setFilters({ ...filters, entity: e.target.value })}
                        className="appearance-none w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 text-sm pr-8"
                    >
                        {entityOptions.map(ent => <option key={ent} value={ent}>{ent}</option>)}
                    </select>
                </div>

                {/* Status Dropdown */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="appearance-none w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 text-sm pr-8"
                    >
                        {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                </div>

                {/* Reset Button */}
                <div className="col-span-1 md:col-span-2 flex justify-end items-end gap-3 pt-5 md:pt-0">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedEmailFilters;