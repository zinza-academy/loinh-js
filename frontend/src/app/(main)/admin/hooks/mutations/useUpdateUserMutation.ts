import { useMutation } from "@tanstack/react-query";
import { UpdateUserParams, UpdateUserResponse } from "../../types";
import { onUpdateUserApi } from "../../services/userService";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: UpdateUserParams;
    }): Promise<UpdateUserResponse> => {
      const response = await onUpdateUserApi(id, data);
      return response.data;
    },
  });
};
