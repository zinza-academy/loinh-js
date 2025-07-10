import { useUpdateUserMutation } from "./mutations/useUpdateUserMutation";
import { UpdateUserParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useToast } from "@/hooks/use-toast";

export const useUpdateUser = () => {
  const mutation = useUpdateUserMutation();
  const { toast } = useToast();

  const updateUser = (userId: string | number, data: UpdateUserParams) => {
    mutation.mutate(
      { userId, data },
      {
        onSuccess: () => {
          toast(TOAST_MESSAGES.UPDATE_USER_INFO_SUCCESS);
        },
        onError: (error: unknown) => {
          console.error("update user info error:", error);
          toast({
            ...TOAST_MESSAGES.UPDATE_USER_INFO_ERROR,
            description:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          });
        },
      }
    );
  };

  return {
    ...mutation,
    updateUser,
  };
};
