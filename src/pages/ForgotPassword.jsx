import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setResetLink("");

    try {
      const res = await forgotPassword({ email });
      const message =
        res.data?.message ||
        "If this email is registered, a reset link was sent.";
      setSuccessMessage(message);
      setResetLink(res.data?.resetLink || "");
    } catch (error) {
      const errorMessage =
        error.response?.status === 404
          ? "Password reset is not available yet on the backend. Please contact support or check with the app owner."
          : error.response?.data?.message ||
            error.message ||
            "Unable to send reset instructions. Please try again later.";
      setSuccessMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-500 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block bg-linear-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
            🔐 Reset Password
          </div>
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Forgot your password?
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your email and we'll send a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-xl">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl
                         focus:outline-none focus:border-blue-500 focus:ring-2
                         focus:ring-blue-200 transition duration-300
                         bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3
                       rounded-xl font-bold text-lg
                       hover:shadow-lg hover:shadow-blue-500/50 transition duration-300
                       transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {successMessage && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
            <p>{successMessage}</p>
            {resetLink && (
              <p className="mt-3 break-all">
                <a
                  href={resetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Open password reset page
                </a>
              </p>
            )}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
