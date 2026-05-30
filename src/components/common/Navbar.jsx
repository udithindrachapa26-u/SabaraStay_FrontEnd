import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-[#173565]/80
        backdrop-blur-lg
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/home"
          className="text-xl font-extrabold tracking-tight"
        >
          <span className="text-white">Sabra</span>
          <span className="text-yellow-400">Stay</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {/* Student Dashboard */}
          {token && role === "student" && (
            <Link
              to="/student/dashboard"
              className="
                text-white/90
                hover:text-yellow-400
                transition
              "
            >
              Dashboard
            </Link>
          )}

          {/* Not logged in */}
          {!token && (
            <>
              <Link
                to="/login"
                className="
                  text-white/90
                  hover:text-yellow-400
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-yellow-400
                  text-[#173565]
                  px-4 py-2 rounded-lg
                  font-semibold
                  shadow
                  hover:bg-yellow-500
                  transition
                "
              >
                Register
              </Link>
            </>
          )}

          {/* Logged in */}
          {token && (
            <button
              onClick={handleLogout}
              className="
                text-white/80
                hover:text-red-400
                transition
              "
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}