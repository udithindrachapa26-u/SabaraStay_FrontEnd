import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await resetPassword({ token, password });
      setMessage(res.data?.message || "Password reset successfully.");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to reset password. Please try again."
      );
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
            🔄 Reset Password
          </div>
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Set a new password
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your new password below to complete the reset.
          </p>
        </div>

        {!token ? (
          <div className="p-6 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900">
            <p className="mb-3">No reset token found in the URL.</p>
            <Link to="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-800">
              Request a new password reset link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50"
                placeholder="New password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}

        {message && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
            {message}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
