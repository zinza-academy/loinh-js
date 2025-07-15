import { useMutation } from "@tanstack/react-query";
import { CreateUserParams, CreateUserResponse } from "../../types";
import { onCreateUserApi } from "../../services/userService";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateUserParams): Promise<CreateUserResponse> => {
      const response = await onCreateUserApi(data);
      return response.data;
    },
  });
};
