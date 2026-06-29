import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-semibold text-gray-800 text-lg">JobTracker</span>
        <div className="flex gap-2">
          <Link to="/" className={linkClass("/")}>
            Dashboard
          </Link>
          <Link to="/applications" className={linkClass("/applications")}>
            Applications
          </Link>
        </div>
      </div>
    </nav>
  );
}
