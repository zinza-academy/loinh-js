import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "./api-endpoints";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/authStore";
const api = axios.create({
  baseURL: "http://localhost:8080",
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
        await api.post(
          `${API_ENDPOINTS.API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
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
