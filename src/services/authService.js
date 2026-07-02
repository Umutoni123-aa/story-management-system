import axios from "axios";

const API_URL = import.meta.env.DEV
  ? "https://sms-express-app-1-production-a843.up.railway.app/api/auth"
  : "/api/auth";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};