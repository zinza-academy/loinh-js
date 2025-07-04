import { useMutation } from "@tanstack/react-query";
import { LoginParams, LoginResponse } from "../../types";
import { onLoginApi } from "../../services/authService";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginParams): Promise<LoginResponse> => {
      const response = await onLoginApi({
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
  });
};
