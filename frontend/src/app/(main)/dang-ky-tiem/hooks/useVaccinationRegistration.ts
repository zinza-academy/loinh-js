import { useToast } from "@/hooks/use-toast";
import { useVaccinationRegistrationMutation } from "./mutations/useVaccinationRegistrationMutation";
import { VaccinationRegistrationParams } from "../types";
import { TOAST_MESSAGES } from "../constant";
import { useVaccinationRegistrationStore } from "../store/vacinationRegistrationStore";

export const useVaccinationRegistration = () => {
  const { toast } = useToast();
  const createInjectionMutation = useVaccinationRegistrationMutation();
  const { setRegistrationId } = useVaccinationRegistrationStore();

  return {
    registVaccination: (data: VaccinationRegistrationParams) => {
      console.log("Gọi mutation với data:", data);
      createInjectionMutation.mutate(data, {
        onSuccess: (data) => {
          setRegistrationId(data.id ? String(data.id) : "");
          toast(TOAST_MESSAGES.CREATE_VACCINATION_RERISTRATION_SUCCESS);
        },
        onError: (error: unknown) => {
          toast({
            ...TOAST_MESSAGES.CREATE_VACCINATION_RERISTRATION_ERROR,
            description:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          });
        },
      });
    },
    registVaccinationAsync: createInjectionMutation.mutateAsync,
    isLoading: createInjectionMutation.isPending,
    isError: createInjectionMutation.isError,
    error: createInjectionMutation.error,
    reset: createInjectionMutation.reset,
  } as const;
};
