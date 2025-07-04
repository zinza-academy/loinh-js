import { useToast } from "@/hooks/use-toast";
import { useCreateInjectionPointMutation } from "./mutations/useCreateInjectionPointMutation";
import { CreateInjectionPointParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateInjection = () => {
  const { toast } = useToast();
  const createInjectionMutation = useCreateInjectionPointMutation();
  const queryClient = useQueryClient();
  return {
    createInjectionPoint: (data: CreateInjectionPointParams) => {
      createInjectionMutation.mutate(data, {
        onSuccess: () => {
          toast(TOAST_MESSAGES.CREATE_INJECTION_POINT_SUCCESS);
          queryClient.invalidateQueries({ queryKey: ["vaccination-sites"] });
        },
        onError: (error: unknown) => {
          console.error("create error:", error);
          toast({
            ...TOAST_MESSAGES.CREATE_INJECTION_POINT_ERROR,
            description:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          });
        },
      });
    },
    createInjectionPointAsync: createInjectionMutation.mutateAsync,
    isLoading: createInjectionMutation.isPending,
    isError: createInjectionMutation.isError,
    error: createInjectionMutation.error,
    reset: createInjectionMutation.reset,
  } as const;
};
