import type { JSX } from "react";


import { Outlet } from "react-router";

const Login = (): JSX.Element => {

    return (
        <>
            <div className="text-[22px] grid gap-4 place-items-center p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md max-w-md w-full mx-auto mt-12">
                <Outlet />
            </div>
        </>
    );
}

export default Login;