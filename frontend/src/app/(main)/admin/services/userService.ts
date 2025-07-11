import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { CommonResponse, PaginationResponse } from "@/types";
import {
  CreateUserParams,
  CreateUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
  User,
} from "../types";

export async function onCreateUserApi(
  data: CreateUserParams
): Promise<CommonResponse<CreateUserResponse>> {
  const response = await api.post<CommonResponse<CreateUserResponse>>(
    API_ENDPOINTS.USER.CREATE,
    data
  );
  return response.data;
}

export async function onUpdateUserApi(
  id: string | number,
  data: UpdateUserParams
): Promise<CommonResponse<UpdateUserResponse>> {
  const response = await api.patch<CommonResponse<UpdateUserResponse>>(
    API_ENDPOINTS.USER.UPDATE(id),
    data
  );
  return response.data;
}

export async function onGetAllUsersApi(
  page: number = 1,
  limit: number = 10
): Promise<CommonResponse<PaginationResponse<User>>> {
  const response = await api.get<CommonResponse<PaginationResponse<User>>>(
    `${API_ENDPOINTS.USER.GET_ALL}?page=${page}&limit=${limit}`
  );
  return response.data;
}

export async function onDeleteUserApi(
  id: string | number
): Promise<CommonResponse<{ message: string }>> {
  const response = await api.delete<CommonResponse<{ message: string }>>(
    API_ENDPOINTS.USER.DELETE(id)
  );
  return response.data;
}
