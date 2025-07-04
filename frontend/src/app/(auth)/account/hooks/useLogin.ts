import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "./mutations/useLoginMutation";
import { LoginParams } from "../types";
import { TOAST_MESSAGES } from "../constant";

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const loginMutation = useLoginMutation();

  return {
    login: (data: LoginParams) => {
      loginMutation.mutate(data, {
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
    },
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    reset: loginMutation.reset,
  } as const;
};