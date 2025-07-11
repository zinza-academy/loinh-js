import { useToast } from "@/hooks/use-toast";
import { useUpdateUserMutation } from "./mutations/useUpdateUserMutation";
import { UpdateUserParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { toast } = useToast();
  const updateUserMutation = useUpdateUserMutation();
  const queryClient = useQueryClient();

  return {
    updateUser: (id: string | number, data: UpdateUserParams) => {
      updateUserMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            toast(TOAST_MESSAGES.UPDATE_USER_SUCCESS);
            queryClient.invalidateQueries({ queryKey: ["users"] });
          },
          onError: (error: unknown) => {
            console.error("update user error:", error);
            toast({
              ...TOAST_MESSAGES.UPDATE_USER_ERROR,
              description:
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred",
            });
          },
        }
      );
    },
    updateUserAsync: updateUserMutation.mutateAsync,
    isLoading: updateUserMutation.isPending,
    isError: updateUserMutation.isError,
    error: updateUserMutation.error,
    reset: updateUserMutation.reset,
  } as const;
};
