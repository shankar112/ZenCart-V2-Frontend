// src/requestMethods.js
import axios from "axios";

// 🚀 LIVE BACKEND URL (From your Render Dashboard)
const BASE_URL = "https://zencart-v2-backend.onrender.com/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to inject the token automatically
userRequest.interceptors.request.use((config) => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const user = JSON.parse(JSON.parse(persistRoot).user);
    const accessToken = user.currentUser?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});