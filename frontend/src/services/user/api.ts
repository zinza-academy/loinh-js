import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { User } from "@/types";

export async function onGetMe(userId: string): Promise<User> {
  const response = await api.get<User>(API_ENDPOINTS.USER.GET_BY_ID(userId));
  return response.data;
}
