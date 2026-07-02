import axios from "axios";

const API_URL = import.meta.env.DEV
  ? "https://sms-express-app-1-production-a843.up.railway.app/api/stories"
  : "/api/stories";

export const createStory = async (story) => {
  const response = await axios.post(API_URL, story);
  return response.data;
};

export const getStories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getStoryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateStory = async (id, story) => {
  const response = await axios.put(`${API_URL}/${id}`, story);
  return response.data;
};

export const deleteStory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};