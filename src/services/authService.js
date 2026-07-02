import api from "../api/axios";

// REGISTER
export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

// LOGIN
export const loginUser = (loginData) => {
  return api.post("/auth/login", loginData);
};

// FORGOT PASSWORD
export const forgotPassword = (emailData) => {
  return api.post("/auth/forgot-password", emailData);
};

// RESET PASSWORD
export const resetPassword = (resetData) => {
  return api.post("/auth/reset-password", resetData);
};

// GOOGLE LOGIN
export const loginWithGoogle = (idToken) => {
  return api.post("/auth/google-login", { token: idToken });
};