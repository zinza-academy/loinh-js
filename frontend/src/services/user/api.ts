import api from "@/configs/axios";



export async function onGetMe(): Promise<User> {
  const response = await api.get<User>("/user/14");
  return response.data;
}
