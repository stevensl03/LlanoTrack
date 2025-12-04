import type { JSX } from "react";

type Props = {
    currentPage: number;
    setCurrentPage: (n: number) => void;
    totalItems: number;
    pageSize: number;
};

const EmailManagementPagination = ({ currentPage, setCurrentPage, totalItems, pageSize }: Props): JSX.Element => {
    const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

    const goFirst = () => setCurrentPage(1);
    const goPrev = () => {
        // Calcula el nuevo valor aquí y pásalo directamente:
        const newPage = Math.max(1, currentPage - 1);
        setCurrentPage(newPage); 
    };
    const goNext = () => {
        // Calcula el nuevo valor aquí y pásalo directamente:
        const newPage = Math.min(pageCount, currentPage + 1);
        setCurrentPage(newPage);
    };
    const goLast = () => setCurrentPage(pageCount);

    return (
        <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-gray-600">
                Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} de {totalItems}
            </div>

            <div className="flex items-center gap-2" role="navigation" aria-label="Paginación de correos">
                <button
                    onClick={goFirst}
                    disabled={currentPage <= 1}
                    aria-label="Ir a la primera página"
                    title="Primera"
                    className="px-2 py-1 border rounded disabled:opacity-50"
                >
                    «
                </button>

                <button
                    onClick={goPrev}
                    disabled={currentPage <= 1}
                    aria-label="Página anterior"
                    title="Anterior"
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <div className="text-sm px-3" aria-live="polite">
                    Página {currentPage} / {pageCount}
                </div>

                <button
                    onClick={goNext}
                    disabled={currentPage >= pageCount}
                    aria-label="Página siguiente"
                    title="Siguiente"
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Siguiente
                </button>

                <button
                    onClick={goLast}
                    disabled={currentPage >= pageCount}
                    aria-label="Ir a la última página"
                    title="Última"
                    className="px-2 py-1 border rounded disabled:opacity-50"
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default EmailManagementPagination;