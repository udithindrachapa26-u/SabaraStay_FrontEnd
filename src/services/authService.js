import api from "../api/axios";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};