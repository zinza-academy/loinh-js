import { useToast } from "@/hooks/use-toast";
import { useCreateInjectionRegistrationMutation } from "./mutations/useCreateInjectionRegistrationMutation";
import { CreateInjectionRegistrationParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateInjectionRegistration = () => {
  const { toast } = useToast();
  const createInjectionMutation = useCreateInjectionRegistrationMutation();
  const queryClient = useQueryClient();
  return {
    createInjectionRegistration: (data: CreateInjectionRegistrationParams) => {
      createInjectionMutation.mutate(data, {
        onSuccess: () => {
          toast(TOAST_MESSAGES.CREATE_INJECTION_REGISTRATION_SUCCESS);
          queryClient.invalidateQueries({
            queryKey: ["regist-vaccination-success"],
          });
        },
        onError: (error: unknown) => {
          console.error("create error:", error);
          toast({
            ...TOAST_MESSAGES.CREATE_INJECTION_REGISTRATION_ERROR,
            description:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          });
        },
      });
    },
    createInjectionRegistrationAsync: createInjectionMutation.mutateAsync,
    isLoading: createInjectionMutation.isPending,
    isError: createInjectionMutation.isError,
    error: createInjectionMutation.error,
    reset: createInjectionMutation.reset,
  } as const;
};
