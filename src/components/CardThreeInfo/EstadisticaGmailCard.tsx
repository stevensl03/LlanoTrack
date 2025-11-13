import type {JSX} from "react";

type EstadisticaGmailCardProps = {
    num: number;
    numPrev: number;
    numTotal: number;
}

const EstadisticaGmailCard = ({num, numPrev, numTotal}: EstadisticaGmailCardProps): JSX.Element => {

    if (num == null) {
        return <p className="text-gray-600">Sin datos</p>;
    }

    const diff = num - numPrev;
    const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'equal';

    // Porcentaje respecto al anterior (evitar división por 0)
    const percentPrev = numPrev !== 0 ? (diff / Math.abs(numPrev)) * 100 : NaN;
    // Porcentaje respecto al total
    const percentTotal = numTotal !== 0 ? (num / numTotal) * 100 : NaN;

    const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—';
    const colorClass =
        trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

    return (
        <div className="flex flex-col">
            <div className={`flex items-center gap-2 ${colorClass}`}>
                <span className="font-semibold">{arrow}</span>
                <span className="font-bold">{diff >= 0 ? `+${diff}` : diff}</span>
                <span className="text-sm">desde anterior</span>
            </div>

            <div className="text-sm text-gray-700">
                {Number.isNaN(percentPrev)
                    ? <span>Porcentaje respecto anterior: —</span>
                    : <span>({percentPrev.toFixed(1)}%) respecto al anterior</span>}
            </div>

            <div className="text-sm text-gray-700">
                {Number.isNaN(percentTotal)
                    ? <span>Porcentaje del total: —</span>
                    : <span>{percentTotal.toFixed(1)}% del total ({numTotal})</span>}
            </div>
        </div>
    );

}

export default EstadisticaGmailCard;