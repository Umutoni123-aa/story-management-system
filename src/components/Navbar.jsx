import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">StoryApp</Link>

        {/* Hamburger button - visible on small/medium screens */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/add" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
            + New Story
          </Link>
          {isAuthenticated ? (
            <button onClick={logout} className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
                Login
              </Link>
              <Link to="/register" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu - shown when hamburger is clicked */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-4" onClick={() => setMenuOpen(false)}>
          <Link to="/add" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition text-center">
            + New Story
          </Link>
          {isAuthenticated ? (
            <button onClick={logout} className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition text-center">
                Login
              </Link>
              <Link to="/register" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-100 transition text-center">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
