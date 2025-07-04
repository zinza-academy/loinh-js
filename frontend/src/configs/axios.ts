import axios from "axios";
import { API_ENDPOINTS } from "./api-endpoints";
import { removeAuthToken, setAuthToken } from "@/services/localStorageAsync";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh" &&
      originalRequest.url !== "/auth/login" &&
      originalRequest.url !== "/auth/logout" &&
      originalRequest.url !== "/auth/register"
    ) {
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        try {
          delete originalRequest.headers["Authorization"];

          const response = await api.post(
            `${API_ENDPOINTS.API_BASE_URL}/auth/refresh`,
            { refresh_token: refreshToken },
            { withCredentials: true }
          );

          if (response.status === 200 && response.data?.data?.access_token) {
            const { access_token, refresh_token: newRefreshToken } =
              response.data.data;
            setAuthToken(access_token);
            if (newRefreshToken) {
              Cookies.set("refresh_token", newRefreshToken, {
                secure: true,
                sameSite: "strict",
              });
            }

            originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
            return axios(originalRequest);
          } else {
            throw new Error("Invalid refresh token response");
          }
        } catch (refreshError: unknown) {
          removeAuthToken();
          Cookies.remove("refresh_token");
          if (typeof window !== "undefined") {
            window.location.href = "/account/login";
          }
          if (
            typeof refreshError === "object" &&
            refreshError !== null &&
            "response" in refreshError &&
            typeof (refreshError as { response?: { data?: unknown } })
              .response === "object"
          ) {
            return Promise.reject(
              (refreshError as { response?: { data?: unknown } }).response
                ?.data || refreshError
            );
          }
          return Promise.reject(refreshError);
        }
      } else {
        removeAuthToken();
        Cookies.remove("refresh_token");
        if (typeof window !== "undefined") {
          window.location.href = "/account/login";
        }
        return Promise.reject(error.response?.data || error);
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default api;
