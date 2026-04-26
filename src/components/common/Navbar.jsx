import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-5 bg-transparent text-white">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Sabra<span className="text-yellow-400">Stay</span>
      </Link>

      {/* Center Links */}
      <ul className="hidden md:flex gap-8 text-sm font-medium">
        <li className="hover:text-yellow-400 transition">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-yellow-400 transition">
          <Link to="/search">Find Stay</Link>
        </li>
        <li className="hover:text-yellow-400 transition">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-yellow-400 transition">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/list-property"
          className="hidden md:inline-block px-4 py-2 rounded-md bg-yellow-400 text-gray-900 text-sm font-semibold hover:bg-yellow-500 transition"
        >
          List Your Property
        </Link>

        <Link
          to="/login"
          className="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-semibold hover:bg-gray-200 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 rounded-md border border-white text-white text-sm font-semibold hover:bg-white hover:text-gray-900 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}