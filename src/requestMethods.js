// src/requestMethods.js
import axios from "axios";

// BASE URL: Change this one line to point to your live server later!
// For now, keep it localhost.
const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// For requests that need the Token (Cart, Orders, etc.)
// We will set the token dynamically in the components or use an interceptor
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