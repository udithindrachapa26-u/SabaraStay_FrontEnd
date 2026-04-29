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
    <nav className="bg-[#173565] text-white px-6 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/home" className="text-xl font-bold">
        SabraStay
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 text-sm">
        {/* 👨‍🎓 Student Dashboard */}
        {token && role?.toLowerCase() === "student" && (
          <Link
            to="/student/dashboard"
            className="hover:underline font-medium"
          >
            Dashboard
          </Link>
        )}

        {/* 🔐 Not logged in */}
        {!token && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-[#173565] px-3 py-1 rounded font-medium"
            >
              Register
            </Link>
          </>
        )}

        {/* 🚪 Logged in */}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}