import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      const userData = res.data.user || res.data || null;

      if (!userData) {
        throw new Error("Login response did not include user data.");
      }

      const token =
        res.data.token ||
        res.data.accessToken ||
        res.data?.user?.token ||
        res.data?.user?.accessToken ||
        "";
      const role =
        res.data.role ||
        res.data?.user?.role ||
        userData.role ||
        "";

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(userData));

      alert("Login successful");
      navigate("/home");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Invalid email or password";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-linear-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
            🏠 SabaraStay
          </div>
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-xl">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
                         focus:outline-none focus:border-blue-500 focus:ring-2
                         focus:ring-blue-200 transition duration-300
                         bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-xl">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
                         focus:outline-none focus:border-blue-500 focus:ring-2
                         focus:ring-blue-200 transition duration-300
                         bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3
                       rounded-xl font-bold text-lg
                       hover:shadow-lg hover:shadow-blue-500/50 transition duration-300
                       transform hover:scale-105 active:scale-95"
          >
            Sign In
          </button>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Forgot password?
            </Link>
          </div>

        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:text-blue-700 transition"
            >
              Create one now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;