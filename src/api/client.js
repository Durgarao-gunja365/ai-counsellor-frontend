import axios from "axios";

// ✅ Use your deployed backend URL
const api = axios.create({
  baseURL: "https://ai-counsellor-backend-3.onrender.com",
  timeout: 10000, // 10s timeout
});

// Attach token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("TOKEN SENT:", token); // Optional: debug only
    } else {
      console.log("No token found, proceeding unauthenticated.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: centralized response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or backend unreachable
      console.error("Network error: Cannot reach backend.");
      alert("Backend server is unreachable. Please try again later.");
    } else {
      // Handle other HTTP errors
      console.error("Backend error:", error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
