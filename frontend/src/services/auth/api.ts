import api from "@/configs/axios";

export const onLogin = async (email: string, password: string) => {
  console.log(email, password);
  const response = await api.get(`/user/14`);
  return response.data;
};
