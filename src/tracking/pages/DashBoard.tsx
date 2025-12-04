import type{ JSX } from "react";
import Cards from "../components/CardThreeInfo/Cards";
import EmailManagement from "../components/EmailManagement/EmailManagement";

const DashBoard = (): JSX.Element => {
    

    return (
        <div >
                <section>
                    <Cards />
                </section>
                <section>
                    <EmailManagement />
                </section>
        </div>
    );
}

export default DashBoard;