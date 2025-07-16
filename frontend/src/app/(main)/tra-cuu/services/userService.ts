import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { CommonResponse } from "@/types";
import {
  UpdateUserParams,
  UpdateUserResponse,
  UploadUserAvatarResponse,
} from "../types";

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

export async function onUploadUserAvatarApi(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.post<CommonResponse<UploadUserAvatarResponse>>(
    API_ENDPOINTS.USER.UPLOAD_AVATAR,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}
