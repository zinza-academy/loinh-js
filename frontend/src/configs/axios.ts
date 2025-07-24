import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "./api-endpoints";
import { useAuthStore } from "@/stores/authStore";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      ![
        "/auth/refresh",
        "/auth/login",
        "/auth/logout",
        "/auth/register",
      ].includes(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await api.get(`${API_ENDPOINTS.API_BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearUser();
        if (typeof window !== "undefined") {
          window.location.href = "/account/signin";
        }
        const axiosRefreshError = refreshError as AxiosError;
        return Promise.reject(axiosRefreshError.response?.data || refreshError);
      }
    }
    const axiosError = error as AxiosError;
    return Promise.reject(axiosError.response?.data || error);
  }
);

export default api;
