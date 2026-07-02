import axios from "axios";

const API_URL = "https://sms-express-app-1-production-a843.up.railway.app";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response?.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response?.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const response = await axios.post(`${API_URL}/api/auth/verify-email`, { email, otp });
  return response?.data;
};