import type{ JSX} from "react"
import { useEffect } from "react"

type HeaderShowNavigatorprops= {
    showAll: boolean
    setShowAll : (v:boolean) => void
    title : string | null
}


const HeaderShowNavigator =({showAll, setShowAll, title }:HeaderShowNavigatorprops):JSX.Element =>{

        useEffect(() => {
        try {
            localStorage.setItem("side_showAll", JSON.stringify(showAll));
        } catch {
            /* ignore */
        }
    }, [showAll]);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 col-span-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* left: toggle + title */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            aria-label="Toggle sidebar"
                            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {/* hamburger / menu icon */}
                            
                            {/* Contenedor del Renderizado Condicional */}
                        {
                            // Si showAll es TRUE (la sidebar está abierta), muestra el icono de hamburguesa
                            showAll && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )
                        }
                        
                        {
                            // Si showAll es FALSE (la sidebar está cerrada), muestra el otro icono
                            !showAll && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M18 3v4l-3.857 6h3.857v4h-6.429l-2.571 4h-3v-4l3.857 -6h-3.857v-4h6.429l2.571 -4z" />
                                </svg>
                            )
                        }
                        </button>


                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    </div>

                    {/* right: notifications + new email */}
                    <div className="flex items-center gap-3">
                        {/* Notification Button (Bell Icon) */}
                        <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                            {/* Notification Count Badge */}
                            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">1</span>
                        </button>

                        {/* New Email Button */}
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                            </svg>
                            New Email
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );

}

export default HeaderShowNavigator