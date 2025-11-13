import type {JSX} from "react";

type EstadisticaTiempoCardProps = {
    time: number;
    timePrev: number;
    timeTotal: number;
}

const EstadisticaTiempoCard = ({time, timePrev, timeTotal}: EstadisticaTiempoCardProps): JSX.Element => {
    const formatMinutes = (mins: number): string => {
        if (!Number.isFinite(mins)) return '—';
        const h = Math.floor(mins / 60);
        const m = Math.round(mins % 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    if (time == null) {
        return <p className="text-gray-600">Sin datos</p>;
    }

    const diff = time - timePrev; // positive = slower (worse), negative = faster (better)
    const trend = diff < 0 ? 'improve' : diff > 0 ? 'worse' : 'equal';

    // Porcentaje respecto al anterior (evitar división por 0)
    const percentPrev = timePrev !== 0 ? (Math.abs(diff) / Math.abs(timePrev)) * 100 : NaN;
    // Porcentaje respecto a un máximo/total (ej. objetivo o ventana)
    const percentTotal = timeTotal !== 0 ? (time / timeTotal) * 100 : NaN;

    const arrow = trend === 'worse' ? '▲' : trend === 'improve' ? '▼' : '—';
    const colorClass =
        trend === 'improve' ? 'text-green-600' : trend === 'worse' ? 'text-red-600' : 'text-gray-600';
    const trendText =
        trend === 'improve' ? 'mejoró respecto al anterior' :
        trend === 'worse' ? 'empeoró respecto al anterior' :
        'sin cambios respecto al anterior';

    return (
        <div className="flex flex-col">
            <div className="text-sm text-gray-700 mb-1">Tiempo promedio</div>

            <div className="text-xl font-semibold mb-2">{formatMinutes(time)}</div>

            <div className={`flex items-center gap-2 ${colorClass}`}>
                <span className="font-semibold">{arrow}</span>
                <span className="font-bold">{diff === 0 ? '0' : `${diff > 0 ? '+' : ''}${diff.toFixed(0)}m`}</span>
                <span className="text-sm">{trendText}</span>
            </div>

            <div className="text-sm text-gray-700">
                {Number.isNaN(percentPrev)
                    ? <span>Porcentaje respecto anterior: —</span>
                    : <span>({percentPrev.toFixed(1)}%) respecto al anterior</span>}
            </div>

            <div className="text-sm text-gray-700">
                {Number.isNaN(percentTotal)
                    ? <span>Porcentaje del objetivo: —</span>
                    : <span>{percentTotal.toFixed(1)}% del total ({formatMinutes(timeTotal)})</span>}
            </div>
        </div>
    );
}

export default EstadisticaTiempoCard;