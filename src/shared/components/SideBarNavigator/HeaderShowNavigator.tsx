import { useApp } from "../../../state/AppContext";
import { Link } from "react-router";

const HeaderShowNavigator = ({ showAll, setShowAll, user }: { 
  showAll: boolean; 
  setShowAll: (v: boolean) => void 
  user: {
    roleName: string;
  } | null;
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

        {/* User info */}
        <div className="flex items-center gap-3">
          {user && (
            <>
              <span className="text-gray-600">{user.roleName}</span>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" to="/notificaciones">
            🔔
          </Link>
          <Link  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" to="/busqueda">
            🔍
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderShowNavigator;