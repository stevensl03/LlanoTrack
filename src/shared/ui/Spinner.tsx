import type { JSX } from "react";


export const SpinnerCircule = ():JSX.Element => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100/75 z-50">
      {/* El Spinner de Tailwind CSS*/}
      <div className="w-16 h-16 rounded-full border-8 border-t-8 border-blue-600 border-t-transparent animate-spin"></div>
    </div>
  );
};