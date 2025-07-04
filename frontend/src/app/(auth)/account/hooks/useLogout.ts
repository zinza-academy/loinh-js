import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "./mutations/useLogoutMutation";
import { TOAST_MESSAGES } from "../constant";

export const useLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const logoutMutation = useLogoutMutation();

  return {
    logout: () => {
      logoutMutation.mutate(undefined, {
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
    },
    logoutAsync: logoutMutation.mutateAsync,
    isLoading: logoutMutation.isPending,
    isError: logoutMutation.isError,
    error: logoutMutation.error,
    reset: logoutMutation.reset,
  } as const;
};