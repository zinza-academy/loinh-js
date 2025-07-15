import { useToast } from "@/hooks/use-toast";
import { useCreateUserMutation } from "./mutations/useCreateUserMutation";
import { CreateUserParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateUser = () => {
  const { toast } = useToast();
  const createUserMutation = useCreateUserMutation();
  const queryClient = useQueryClient();

  return {
    createUser: (data: CreateUserParams) => {
      createUserMutation.mutate(data, {
        onSuccess: () => {
          toast(TOAST_MESSAGES.CREATE_USER_SUCCESS);
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: unknown) => {
          console.error("create user error:", error);
          toast({
            ...TOAST_MESSAGES.CREATE_USER_ERROR,
            description:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          });
        },
      });
    },
    createUserAsync: createUserMutation.mutateAsync,
    isLoading: createUserMutation.isPending,
    isError: createUserMutation.isError,
    error: createUserMutation.error,
    reset: createUserMutation.reset,
  } as const;
};
