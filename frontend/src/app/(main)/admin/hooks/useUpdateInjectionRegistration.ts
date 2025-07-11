import { useToast } from "@/hooks/use-toast";

import { useQueryClient } from "@tanstack/react-query";
import { UpdateInjectionRegistrationParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useUpdateInjectionRegistrationMutation } from "./mutations/useUpdateInjectionRegistrationMutation";

export const useUpdateInjectionRegistration = () => {
  const { toast } = useToast();

  const updateInjectionRegistrationMutation =
    useUpdateInjectionRegistrationMutation();
  const queryClient = useQueryClient();
  return {
    updateInjectionRegistration: (
      id: string,
      data: UpdateInjectionRegistrationParams
    ) => {
      updateInjectionRegistrationMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            toast(TOAST_MESSAGES.UPDATE_INJECTION_REGISTRATION_SUCCESS);
            queryClient.invalidateQueries({
              queryKey: ["regist-vaccination-success"],
            });
          },
          onError: (error: unknown) => {
            console.error("update error:", error);
            toast({
              ...TOAST_MESSAGES.UPDATE_INJECTION_REGISTRATION_ERROR,
              description:
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred",
            });
          },
        }
      );
    },
    updateInjectionRegristrationAsync:
      updateInjectionRegistrationMutation.mutateAsync,
    isLoading: updateInjectionRegistrationMutation.isPending,
    isError: updateInjectionRegistrationMutation.isError,
    error: updateInjectionRegistrationMutation.error,
    reset: updateInjectionRegistrationMutation.reset,
  } as const;
};
