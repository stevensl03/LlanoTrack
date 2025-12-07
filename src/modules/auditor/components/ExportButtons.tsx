interface ExportButtonsProps {
  onExportExcel: () => void
  onExportPDF: () => void
  loading: boolean
}

export default function ExportButtons({ onExportExcel, onExportPDF, loading }: ExportButtonsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onExportExcel}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span>📄</span>
        <span>Exportar Excel</span>
      </button>
      <button
        onClick={onExportPDF}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span>📄</span>
        <span>Exportar PDF</span>
      </button>
    </div>
  )
}