import { useState } from "react";
import { registerUser } from "../services/authService";
import "../style/registerstyle.css";
import { px } from "framer-motion";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePw = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPw = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Enter a password',
    color: 'var(--error)',
    bars: [false, false, false, false],
  });

  const checkStrength = (pw) => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const colors = ['', '#E24B4A', '#F5A623', '#3BC09A', '#1D9E75'];
    const labels = ['', 'Too weak', 'Could be stronger', 'Almost there', 'Strong password'];
    const bars = [score > 0, score > 1, score > 2, score > 3];

    setPasswordStrength({
      score,
      label: pw.length === 0 ? 'Enter a password' : labels[score],
      color: score >= 3 ? '#10b981' : score >= 2 ? '#6b7280' : '#ef4444',
      bars,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join SabaraStay today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Role selector */}
          <div class="role-selector" id="roleSelector">
            <div class="role-card selected" id="roleStudent" onclick="selectRole('student')">
              <div class="role-icon">
                <svg viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="var(--teal)"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div class="role-label">Student</div>
              <div class="role-desc">Search boarding &amp; book visits</div>
            </div>
            <div class="role-card" id="roleOwner" onclick={() => selectRole('owner')}>
              <div class="role-icon">
                <svg viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="var(--text-soft)"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div class="role-label">Boarding Owner</div>
              <div class="role-desc">List &amp; manage your property</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input class="field" type="text" placeholder="Kavinda" id="firstName"/>
              </div>
             </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input class="field" type="text" placeholder="Perera" id="lastName"/>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            {/* <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            /> */}
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input class="field" type="email" placeholder="you@gmail.com" id="email"/>
            </div>
          </div>

          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            {/* <input
              id="contactNo"
              name="contactNo"
              type="tel"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            /> */}
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <input class="field" type="tel" placeholder="07X XXX XXXX" id="contactNo"/>
            </div>
          </div>

          <div>
            <div className="input-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  id="password"
                  name="password"
                  className="field"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button className="pw-toggle" onClick={togglePw} type="button">
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <div className="pw-strength">
                <div className="strength-bar">
                  <div className="strength-seg" style={{ background: passwordStrength.bars[0] ? passwordStrength.color : 'var(--cream-dark)' }}></div>
                  <div className="strength-seg" style={{ background: passwordStrength.bars[1] ? passwordStrength.color : 'var(--cream-dark)' }}></div>
                  <div className="strength-seg" style={{ background: passwordStrength.bars[2] ? passwordStrength.color : 'var(--cream-dark)' }}></div>
                  <div className="strength-seg" style={{ background: passwordStrength.bars[3] ? passwordStrength.color : 'var(--cream-dark)' }}></div>
                </div>
                <div className="strength-label" style={{ color: passwordStrength.color }}>{passwordStrength.label}</div>
              </div>
            </div>
            {/* <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            />
          </div>

          {formFeedback.message && (
            <div
              className={
                formFeedback.type === "success"
                  ? "rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 px-4 py-3 text-sm"
                  : "rounded-lg border border-red-200 bg-red-50 text-red-900 px-4 py-3 text-sm"
              }
            >
              {formFeedback.message}
            </div>
          )}

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            {/* <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            /> */}
            <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  className="field"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button className="pw-toggle" onClick={toggleConfirmPw} type="button">
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
          </div>
                    {/* This is not working: feedback message */}
          {/* {formFeedback.message && (
            <div
              className={
                formFeedback.type === "success"
                  ? "rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 px-4 py-3 text-sm"
                  : "rounded-lg border border-red-200 bg-red-50 text-red-900 px-4 py-3 text-sm"
              }
            >
              {formFeedback.message}
            </div>
          )} */}

          {/* <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
            >
              <option value="student">Student</option>
              <option value="owner">Boarding Owner</option>
            </select>
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
