import {
  LoginParams,
  LoginResponse,
  LogoutResponse,
  SignupParams,
  SignupResponse,
  User,
} from "../types";
import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { useAuthStore } from "@/stores/authStore";
import { CommonResponse } from "@/types";

export async function onLoginApi(
  loginRequest: LoginParams
): Promise<CommonResponse<LoginResponse>> {
  const response = await api.post<CommonResponse<LoginResponse>>(
    API_ENDPOINTS.AUTH.LOGIN,
    loginRequest
  );

  // Save user info to authStore
  const userInfo: User = {
    id: response.data.data.user.id,
    name: response.data.data.user.name,
    avatarUrl: response.data.data.user.avatarUrl,
    birthDate: response.data.data.user.birthDate,
    isActive: response.data.data.user.isActive,
    gender: response.data.data.user.gender,
  };

  useAuthStore.getState().setUser(userInfo);

  return response.data;
}
export async function onSignupApi(
  signupRequest: SignupParams
): Promise<CommonResponse<SignupResponse>> {
  const response = await api.post<CommonResponse<SignupResponse>>(
    API_ENDPOINTS.AUTH.SIGNUP,
    signupRequest
  );

  return response.data;
}
export async function onLogoutApi(): Promise<CommonResponse<LogoutResponse>> {
  try {
    const response = await api.post<CommonResponse<LogoutResponse>>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    return {
      data: null as unknown as LogoutResponse,
    };
  } finally {
    useAuthStore.getState().clearUser();
  }
}

export async function onRefreshTokenApi(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post<{ accessToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      {
        refreshToken,
      }
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}
