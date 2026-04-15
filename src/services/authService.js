import api from "../api/axios";

// REGISTER
export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

// LOGIN
export const loginUser = (loginData) => {
  return api.post("/auth/login", loginData);
};