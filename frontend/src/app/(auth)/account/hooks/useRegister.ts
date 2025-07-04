import { useToast } from "@/hooks/use-toast";
import { TOAST_MESSAGES } from "../constant";
import { SignupParams } from "../types";
import { useRegisterMutation } from "./mutations/useRegisterMutation";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutation = useRegisterMutation();

  return {
    register: (data: SignupParams) => {
      registerMutation.mutate(data, {
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
    },
    registerAsync: registerMutation.mutateAsync,
    isLoading: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
    reset: registerMutation.reset,
  } as const;
};
