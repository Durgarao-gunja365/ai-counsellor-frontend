import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-counsellor-backend-3.onrender.com",
   withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
