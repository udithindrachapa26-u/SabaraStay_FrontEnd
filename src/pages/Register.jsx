import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    role: "student",
  });
  const [formFeedback, setFormFeedback] = useState({ message: "", type: "" });

  const passwordCriteria = [
    { label: "At least 8 characters", valid: formData.password.length >= 8 },
    { label: "Uppercase and lowercase letters", valid: /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) },
    { label: "At least one number", valid: /(?=.*\d)/.test(formData.password) },
    { label: "At least one special symbol", valid: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password) },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formFeedback.message) setFormFeedback({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormFeedback({ message: "Passwords do not match.", type: "error" });
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setFormFeedback({
        message:
          "Password must be 8+ characters and include uppercase, lowercase, number, and symbol.",
        type: "error",
      });
      return;
    }

    try {
      const res = await registerUser(formData);
      setFormFeedback({ message: res.data.message || "Account created successfully.", type: "success" });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNo: "",
        role: "student",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Register failed";
      setFormFeedback({ message: errorMessage, type: "error" });
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.16),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111d35_100%)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/10">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 px-5 py-2 rounded-full font-bold text-lg mb-4">
            🏠 SabaraStay
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join SabaraStay today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-slate-300 mb-2">
              Contact Number
            </label>
            <input
              id="contactNo"
              name="contactNo"
              type="tel"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
              required
            />
            <p className="text-sm text-slate-400 mt-2">
              Use a strong password with uppercase, lowercase, numbers and symbols.
            </p>
            <ul className="mt-3 grid gap-1 text-sm">
              {passwordCriteria.map((item) => (
                <li
                  key={item.label}
                  className={
                    item.valid
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                >
                  {item.valid ? "✓" : "•"} {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
              required
            />
          </div>

          {formFeedback.message && (
            <div
              className={
                formFeedback.type === "success"
                  ? "rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 px-4 py-3 text-sm"
                  : "rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm"
              }
            >
              {formFeedback.message}
            </div>
          )}

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors duration-200"
            >
              <option value="student">Student</option>
              <option value="owner">Boarding Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/30 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;