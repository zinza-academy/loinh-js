import { useToast } from "@/hooks/use-toast";
import { useUpdateInjectionPointMutation } from "./mutations/useUpdateInjectionPointMutation";

import { useQueryClient } from "@tanstack/react-query";
import { UpdateInjectionPointParams } from "../types";
import { TOAST_MESSAGES } from "../constant";

export const useUpdateInjection = () => {
  const { toast } = useToast();
  const updateInjectionMutation = useUpdateInjectionPointMutation();
  const queryClient = useQueryClient();
  return {
    updateInjectionPoint: (id: string, data: UpdateInjectionPointParams) => {
      updateInjectionMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            toast(TOAST_MESSAGES.CREATE_INJECTION_POINT_SUCCESS);
            queryClient.invalidateQueries({ queryKey: ["vaccination-sites"] });
          },
          onError: (error: unknown) => {
            console.error("update error:", error);
            toast({
              ...TOAST_MESSAGES.CREATE_INJECTION_POINT_ERROR,
              description:
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred",
            });
          },
        }
      );
    },
    updateInjectionPointAsync: updateInjectionMutation.mutateAsync,
    isLoading: updateInjectionMutation.isPending,
    isError: updateInjectionMutation.isError,
    error: updateInjectionMutation.error,
    reset: updateInjectionMutation.reset,
  } as const;
};
