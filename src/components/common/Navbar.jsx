import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };

    loadUser();

    const handleStorageChange = (event) => {
      if (event.key === "user" || event.key === null) {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const displayName =
    user?.firstName || user?.firstname || user?.name || user?.email || "User";

  return (
    <header className="flex justify-between items-center px-10 py-6">
      
      {/* LOGO */}
      <Link to="/home">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Sabra<span className="text-yellow-400">Stay</span>
        </h1>
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 text-white">

        {user ? (
          <>
            <span className="font-medium">
              Hi, <span className="text-yellow-400">Welcome back</span>
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-white
                         hover:bg-white hover:text-gray-900 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="px-5 py-2 rounded-md bg-white text-gray-900
                         text-sm font-semibold hover:bg-gray-200 transition"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="px-5 py-2 rounded-md bg-yellow-400 text-gray-900
                         text-sm font-semibold hover:bg-yellow-500 transition"
            >
              Login
            </Link>
          </>
        )}

      </div>
    </header>
  );
}