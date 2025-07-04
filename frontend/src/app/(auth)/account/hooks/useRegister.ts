import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignupParams, SignupResponse } from "../types";
import authService from "../services/authService";
import { TOAST_MESSAGES } from "../constant";
import { useToast } from "@/hooks/use-toast";

export const useRegister = () => {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutation = useMutation({
    mutationFn: async (data: SignupParams): Promise<SignupResponse> => {
      const response = await authService.signup(data);
      return response.data;
    },
    onSuccess: () => {
      toast(TOAST_MESSAGES.REGISTER_SUCCESS);
      router.replace("/account/signin");
    },
    onError: (error: unknown) => {
      console.error("register error:", error);

      type ErrorWithResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      const err = error as ErrorWithResponse;

      toast({
        ...TOAST_MESSAGES.REGISTER_ERROR,
        description:
          err.response?.data?.message ??
          (error instanceof Error
            ? error.message
            : "An unexpected error occurred"),
      });
    },
  });

  return {
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isLoading: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
    reset: registerMutation.reset,
  } as const;
};
