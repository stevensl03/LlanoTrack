import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import AdvancedEmailFilters from "./AdvancedEmailFilters";
import TableEmailManagement from "./TableEmailManagement";
import EmailManagementPagination from "./EmailManagementPagination";

type FilterShape = {
    radicado: string;
    entity: string;
    status: string;
};

const filtro = [
    { id: 1, radicado: "1213123", Entidad: "Ministerio de TIC", plazo: 3, EstadoActual: "Vencido", Gestor: "Manuel C.", cumplimiento: 70 },
    { id: 2, radicado: "1213124", Entidad: "Contralo", plazo: 5, EstadoActual: "En Proceso", Gestor: "Juan M.", cumplimiento: 45 },
    { id: 3, radicado: "1213125", Entidad: "Marketing", plazo: 7, EstadoActual: "Gestionado", Gestor: "Steven S.", cumplimiento: 100 },
    { id: 4, radicado: "1213126", Entidad: "Soporte", plazo: 2, EstadoActual: "Vencido", Gestor: "Daniel M.", cumplimiento: 60 },
    { id: 5, radicado: "1213127", Entidad: "Ventas", plazo: 4, EstadoActual: "En Proceso", Gestor: "Danna V.", cumplimiento: 50 },
    { id: 6, radicado: "1213128", Entidad: "Ministerio de TIC", plazo: 10, EstadoActual: "Pendiente", Gestor: "Vareria R.", cumplimiento: 20 },
    { id: 7, radicado: "1213129", Entidad: "Contralo", plazo: 1, EstadoActual: "Gestionado", Gestor: "John D.", cumplimiento: 100 },
    { id: 8, radicado: "1213130", Entidad: "Marketing", plazo: 6, EstadoActual: "En Proceso", Gestor: "Matro V.", cumplimiento: 80 },
    { id: 9, radicado: "1213131", Entidad: "Soporte", plazo: 8, EstadoActual: "Pendiente", Gestor: "Lina F.", cumplimiento: 30 },
    { id: 10, radicado: "1213132", Entidad: "Ventas", plazo: 3, EstadoActual: "Vencido", Gestor: "Sofia S.", cumplimiento: 55 }
];

const filtrosIniciales: FilterShape = {
    radicado: "__",
    entity: "All Entities",
    status: "All Status",
};

const EmailManagement = (): JSX.Element => {
    const [filters, setFilters] = useState<FilterShape>(filtrosIniciales);
    const [emails, setEmails] = useState(filtro);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const applyFilters = (currentFilters: FilterShape) => {
        setCurrentPage(1);

        const filtered = filtro.filter((m) => {
            const radicadoVal = String(m.radicado);
            const entityVal = m.Entidad;
            const statusVal = m.EstadoActual;

            if (currentFilters.radicado && currentFilters.radicado !== "__" && radicadoVal !== currentFilters.radicado) return false;
            if (currentFilters.entity && currentFilters.entity !== "All Entities" && entityVal !== currentFilters.entity) return false;
            if (currentFilters.status && currentFilters.status !== "All Status" && statusVal !== currentFilters.status) return false;

            return true;
        });

        setEmails(filtered);
    };

    useEffect(() => {
        applyFilters(filters);
    }, [filters]);

   //const pageCount = Math.max(1, Math.ceil(emails.length / pageSize));
    const pageItems = useMemo(() => emails.slice((currentPage - 1) * pageSize, currentPage * pageSize), [emails, currentPage]);

    return (
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md w-full mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Gmail Management</h2>

            <AdvancedEmailFilters
                filters={filters}
                setFilters={setFilters}
                items={filtro}
            />

            <TableEmailManagement data={pageItems} />

            <div className="mt-4">
                <EmailManagementPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={emails.length}
                    pageSize={pageSize}
                />
            </div>
        </div>
    );
};

export default EmailManagement;