import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { CommonResponse } from "@/types";
import { UpdateUserParams, UpdateUserResponse } from "../types";

export async function onUpdateUserInfoApi(
  userId: string | number,
  data: UpdateUserParams
) {
  const response = await api.patch<CommonResponse<UpdateUserResponse>>(
    API_ENDPOINTS.USER.UPDATE(userId),
    data
  );
  return response.data;
}
