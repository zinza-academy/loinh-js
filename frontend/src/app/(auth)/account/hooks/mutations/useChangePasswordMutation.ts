import { useMutation } from "@tanstack/react-query";
import { ChangePasswordParams, ChangePasswordResponse } from "../../types";
import { onChangePasswordApi } from "../../services/authService";

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (
      data: ChangePasswordParams
    ): Promise<ChangePasswordResponse> => {
      const response = await onChangePasswordApi(data.newPassword);
      return response.data;
    },
  });
};
