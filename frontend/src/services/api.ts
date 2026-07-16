import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:8000",
  timeout: 120000
});

export default api;
