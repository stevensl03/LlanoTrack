import type { JSX } from "react";
import { useState } from "react";
import CardThreeInfo from "./CardThreeInfo";


const CardsInfo = [
    { title: "Correos Recibidos", image: "recibidos.png", nameIcon: "mail-down", num: 1230, typeCard: "gmailInfo" },
    { title: "Correos Gestionados", image: "gestionados.png", nameIcon: "Circle-Check", num: 980, typeCard: "gmailInfo" },
    { title: "Correos Vencidos", image: "vencidos.png", nameIcon: "mail-down", num: 45, typeCard: "gmailInfo" },
    { title: "Tiempo promedios Resp.", image: "pendientes.png", nameIcon: "mail-up", num: 190, typeCard: "time" },
    { title: "Correos Pendientes", image: "pendientes.png", nameIcon: "mail-down", num: 150, typeCard: "gmailInfo" },
    { title: "Tiempo promedio Respuesta", image: "tiempo.png", nameIcon: "AnotherIcon", num: 250, typeCard: "time" },
    { title: "Tasa de Respuesta", image: "tasa.png", nameIcon: "AnotherIcon", num: 85, typeCard: "gmailInfo" },
    { title: "Correos Spam", image: "spam.png", nameIcon: "mail-down", num: 30, typeCard: "gmailInfo" },
    { title: "Tiempo de Resolución", image: "resolucion.png", nameIcon: "AnotherIcon", num: 300, typeCard: "time" },
];


const Cards = ():JSX.Element => {
        const [showAll, setShowAll] = useState(false);
        const displayedCards = showAll ? CardsInfo : CardsInfo.slice(0, 4);

    return(
        <>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {displayedCards.map((card, index) => (
                    <CardThreeInfo
                        key={index}
                        title={card.title}
                        image={card.image}
                        nameIcon={card.nameIcon}
                        num={card.num}
                        typeCard={card.typeCard}
                    />
                ))}
            </div>

            {/* Botón Mostrar Más */}
            {CardsInfo.length > 4 && (
                <div className="flex justify-center p-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        {showAll ? '▲ Mostrar Menos' : '▼ Mostrar Más'}
                    </button>
                </div>
            )}
        </>
    );

}

export default Cards