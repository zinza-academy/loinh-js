import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogoutResponse } from "../types";
import authService from "../services/authService";
import { TOAST_MESSAGES } from "../constant";
import { useToast } from "@/hooks/use-toast";

export const useLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const logoutMutation = useMutation({
    mutationFn: async (): Promise<LogoutResponse> => {
      const response = await authService.logout();
      return response.data;
    },
    onSuccess: () => {
      toast(TOAST_MESSAGES.LOGOUT_SUCCESS);
      router.replace("/account/signin");
    },
    onError: (error: unknown) => {
      console.error("logout error:", error);

      type ErrorWithResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      const err = error as ErrorWithResponse;

      toast({
        ...TOAST_MESSAGES.LOGOUT_ERROR,
        description:
          err.response?.data?.message ??
          (error instanceof Error
            ? error.message
            : "An unexpected error occurred"),
      });
    },
  });

  return {
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoading: logoutMutation.isPending,
    isError: logoutMutation.isError,
    error: logoutMutation.error,
    reset: logoutMutation.reset,
  } as const;
};
