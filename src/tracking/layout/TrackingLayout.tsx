import type { JSX } from "react";
import { Outlet } from "react-router";

const TrackingLayout = ():JSX.Element => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default TrackingLayout;