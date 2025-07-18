import { useMutation } from "@tanstack/react-query";
import { onUploadUserAvatarApi } from "@/app/(main)/tra-cuu/services/userService";
import { UploadUserAvatarResponse } from "@/app/(main)/tra-cuu/types";

export const useUploadUserAvatarMutaion = () => {
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: File;
    }): Promise<UploadUserAvatarResponse> => {
      const response = await onUploadUserAvatarApi(data);
      return response.data;
    },
  });
};
