import { useApp } from "../../../state/AppContext";

const HeaderShowNavigator = ({ showAll, setShowAll }: { 
  showAll: boolean; 
  setShowAll: (v: boolean) => void 
}) => {
  const { currentPageTitle } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4">
      <div className="flex items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            {showAll ? "☰" : "✕"}
          </button>
          <h1 className="text-xl font-bold text-gray-900">{currentPageTitle}</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            🔔
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
            Nuevo Email
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderShowNavigator;