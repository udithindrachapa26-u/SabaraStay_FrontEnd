import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/navbar_logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#111d35]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/home"
            className="flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight shrink-0"
          >
            <img
              src={logo}
              alt="SabraStay Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            />
            <span className="text-white">Sabra</span>
            <span className="text-yellow-400">Stay</span>
          </Link>

          <div className="flex-1 flex justify-center hidden sm:flex">
            <div className="flex items-center gap-3 sm:gap-6 text-sm">
              <Link
                to="/how-it-works"
                className="text-white/90 hover:text-yellow-400 transition"
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="text-white/90 hover:text-yellow-400 transition"
              >
                About
              </Link>
              <Link
                to="/help"
                className="text-white/90 hover:text-yellow-400 transition"
              >
                Help
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-sm font-medium shrink-0">
            {token && role === "student" && (
              <Link
                to="/student/dashboard"
                className="hidden sm:inline text-white/90 hover:text-yellow-400 transition"
              >
                Dashboard
              </Link>
            )}
            {token && role === "owner" && (
              <Link
                to="/owner/dashboard"
                className="hidden sm:inline text-white/90 hover:text-yellow-400 transition"
              >
                Owner Dashboard
              </Link>
            )}
            {token && role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="hidden sm:inline text-white/90 hover:text-yellow-400 transition"
              >
                Admin Dashboard
              </Link>
            )}
            {!token && (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline text-white/90 hover:text-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline bg-yellow-400 text-[#173565] px-3 sm:px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-500 transition"
                >
                  Register
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline text-white/80 hover:text-red-400 transition"
              >
                Logout
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/10 p-2 text-white sm:hidden"
              aria-label="Toggle navigation menu"
            >
              <span className="text-xl leading-none">{isMenuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "mt-3 max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-xl border border-white/10 bg-[#0f1a30]/95 p-3 space-y-2">
            <Link
              to="/how-it-works"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
            >
              About
            </Link>
            <Link
              to="/help"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
            >
              Help
            </Link>
            {token && role === "student" && (
              <Link
                to="/student/dashboard"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
              >
                Dashboard
              </Link>
            )}
            {token && role === "owner" && (
              <Link
                to="/owner/dashboard"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
              >
                Owner Dashboard
              </Link>
            )}
            {token && role === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
              >
                Admin Dashboard
              </Link>
            )}
            {!token && (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-center bg-yellow-400 text-[#173565] rounded-lg font-semibold shadow hover:bg-yellow-500 transition"
                >
                  Register
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="block w-full rounded-lg px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-red-400 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}