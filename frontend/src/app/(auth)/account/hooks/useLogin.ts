import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginParams, LoginResponse } from "../types";
import authService from "../services/authService";
import { TOAST_MESSAGES } from "../constant";
import { useToast } from "@/hooks/use-toast";

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const loginMutation = useMutation({
    mutationFn: async (data: LoginParams): Promise<LoginResponse> => {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      toast(TOAST_MESSAGES.LOGIN_SUCCESS);
      router.replace("/");
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
      toast({
        ...TOAST_MESSAGES.LOGIN_ERROR,
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    reset: loginMutation.reset,
  } as const;
};
