import { useChangePasswordMutation } from "./mutations/useChangePasswordMutation";
import { ChangePasswordParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useToast } from "@/hooks/use-toast";

export const useChangePassword = () => {
  const { toast } = useToast();

  const mutation = useChangePasswordMutation();

  const changePassword = (params: ChangePasswordParams) => {
    mutation.mutate(params, {
      onSuccess: () => {
        toast(TOAST_MESSAGES.CHANGE_PASSWORD_SUCCESS);
      },
      onError: (error: unknown) => {
        console.error("change password error:", error);
        toast({
          ...TOAST_MESSAGES.CHANGE_PASSWORD_ERROR,
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      },
    });
  };

  return {
    ...mutation,
    changePassword,
  };
};
