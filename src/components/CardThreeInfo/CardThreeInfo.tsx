import type { JSX } from "react";
import EstadisticaTiempoCard from "./EstadisticaTiempoCard";
import EstadisticaGmailCard from "./EstadisticaGmailCard";

const typeCards = [  "time","gmailInfo" ]

const Icon = [
    /* Placeholder for an icon component or SVG */
    {name: 'mail-down', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mail-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" /><path d="M19 16v6" /><path d="M22 19l-3 3l-3 -3" /><path d="M3 7l9 6l9 -6" /></svg>`},
    {name: 'Circle-Check', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /><path d="M9 12l2 2l4 -4" /></svg>`},
    {name: 'AnotherIcon', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.873l6.9 -1l3.093 -6.26l3.093 6.26l6.9 1l-5 4.873l1.179 6.873z" /></svg>`},
    {name: 'mail-up', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-mail-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4" /><path d="M12 5v14" /><path d="M9 8l3 -3l3 3" /></svg>`},
];

type CardThreeInfoProps = {
    title: string;
    image: string;
    nameIcon: string;
    num: number;
    typeCard: string;
}



const CardThreeInfo = ({title,nameIcon, num, typeCard}: CardThreeInfoProps): JSX.Element => {
    return (
        <div className="card p-6 bg-white border border-gray-300 rounded-lg shadow-md max-w-sm w-full mx-auto">

            <div className="card-header flex items-center justify-between mb-4">
                 <h2 className="card-title text-lg font-semibold">{title}</h2>
                 <div className="icon-wrapper" aria-hidden>
                    {Icon.map((icon) => (
                        icon.name === nameIcon ? (
                            <div key={icon.name} dangerouslySetInnerHTML={{ __html: icon.svg }} />
                        ) : null
                    ))}
                 </div>
            </div>

            <div className="value text-3xl font-bold text-gray-800 mb-3">{typeof num === 'number' ? num : '—'}</div>

            <div className="stats">
                { /* Manejo especial por tipo de tarjeta */ }
                {typeCard === typeCards[0] ? <EstadisticaTiempoCard time={num ?? 0} timePrev={360} timeTotal={3000} /> : null}
                {typeCard === typeCards[1] ? <EstadisticaGmailCard num={num ?? 0} numPrev={700} numTotal={2000} /> : null}
            </div>

        </div>
 
    );
};

export default CardThreeInfo;