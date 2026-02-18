import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth endpoints
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// Protected endpoints
export const getClientDashboard = () => API.get("/client/dashboard");
export const getAdminOverview = () => API.get("/admin/overview");
export const analyzePage = (url) => API.post("/analyze/page", { url });