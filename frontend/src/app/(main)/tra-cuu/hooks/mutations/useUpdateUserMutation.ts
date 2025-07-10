import { useMutation } from "@tanstack/react-query";
import { UpdateUserParams, UpdateUserResponse } from "../../types";
import { onUpdateUserInfoApi } from "../../services/userService";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string | number;
      data: UpdateUserParams;
    }): Promise<UpdateUserResponse> => {
      const response = await onUpdateUserInfoApi(userId, data);
      return response.data;
    },
  });
};
