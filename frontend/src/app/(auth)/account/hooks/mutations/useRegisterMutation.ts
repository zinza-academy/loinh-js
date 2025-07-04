import { useMutation } from "@tanstack/react-query";
import { SignupParams, SignupResponse } from "../../types";
import { onSignupApi } from "../../services/authService";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: SignupParams): Promise<SignupResponse> => {
      const response = await onSignupApi(data);
      return response.data;
    },
  });
};
