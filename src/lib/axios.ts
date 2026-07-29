import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token if it exists
api.interceptors.request.use(
  (config) => {
    // Read directly from localStorage where Zustand saves it
    const storageStr =
      typeof window !== "undefined"
        ? localStorage.getItem("gearup-auth-storage")
        : null;

    if (storageStr) {
      try {
        const { state } = JSON.parse(storageStr);
        if (state.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error("Error parsing auth storage", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Format errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "An unexpected error occurred";

    return Promise.reject(new Error(message));
  },
);
