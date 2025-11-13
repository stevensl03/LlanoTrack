import type{ JSX } from "react";
import { useState } from "react";
import SideBarNavigator from "../../components/SideBarNavigator/SideBarNavigator";
import Cards from "../../components/CardThreeInfo/Cards";
import EmailManagement from "../../components/EmailManagement/EmailManagement";
import HeaderShowNavigator from "../../components/SideBarNavigator/HeaderShowNavigator";

const DashBoard = (): JSX.Element => {

        const [showAll, setShowAll] = useState<boolean>(() => {
            try {
                return JSON.parse(localStorage.getItem("side_showAll") ?? "false");
            } catch {
                return false;
            }
        });




    return (
        <div className={`${showAll ? "grid grid-cols-1" : "grid grid-cols-[200px_1fr]"} gap-0 h-screen`}>
        
            <aside className={`${showAll ? "hidden" : "sticky top-0 h-screen overflow-y-auto bg-white border-r border-gray-200"}`}>
                <SideBarNavigator showAll={showAll} />
            </aside>
            <main className={`overflow-y-auto h-screen ${showAll ? "w-full" : ""}`}>
                <HeaderShowNavigator showAll={showAll} setShowAll={setShowAll} title={"DashBoard"}/>
                <section>
                    <Cards />
                </section>
                <section>
                    <EmailManagement />
                </section>
            </main>
        </div>
    );
}

export default DashBoard;