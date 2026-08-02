import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/navbar_logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsMenuOpen(false);
    setShowLogoutConfirm(false);
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
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition hover:bg-yellow-400/20 hover:text-yellow-400"
                aria-label="Student dashboard"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 19a6 6 0 1 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </Link>
            )}
            {token && role === "owner" && (
              <Link
                to="/owner/dashboard"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition hover:bg-yellow-400/20 hover:text-yellow-400"
                aria-label="Owner dashboard"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-3v-5H8v5H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </Link>
            )}
            {token && role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition hover:bg-yellow-400/20 hover:text-yellow-400"
                aria-label="Admin dashboard"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 3 4 7v5c0 5 3.4 7.8 8 9 4.6-1.2 8-4 8-9V7l-8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 12.5 11 14l3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                onClick={() => setShowLogoutConfirm(true)}
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
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
                aria-label="Student dashboard"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 19a6 6 0 1 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>Profile</span>
              </Link>
            )}
            {token && role === "owner" && (
              <Link
                to="/owner/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
                aria-label="Owner dashboard"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-3v-5H8v5H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>Profile</span>
              </Link>
            )}
            {token && role === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-400 transition"
                aria-label="Admin dashboard"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 3 4 7v5c0 5 3.4 7.8 8 9 4.6-1.2 8-4 8-9V7l-8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 12.5 11 14l3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Profile</span>
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
                onClick={() => setShowLogoutConfirm(true)}
                className="block w-full rounded-lg px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-red-400 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Confirm logout</h3>
            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to log out of your account?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}