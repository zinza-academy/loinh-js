import { useMutation } from "@tanstack/react-query";
import { LogoutResponse } from "../../types";
import { onLogoutApi } from "../../services/authService";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async (): Promise<LogoutResponse> => {
      const response = await onLogoutApi();
      return response.data;
    },
  });
};
