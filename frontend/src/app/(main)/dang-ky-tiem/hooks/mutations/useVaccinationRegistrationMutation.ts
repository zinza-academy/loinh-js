import { useMutation } from "@tanstack/react-query";
import {
  VaccinationRegistrationParams,
  VaccinationRegistrationResponse,
} from "../../types";
import { onRegistVaccination } from "../../services/vaccinationRegistrationService";
import { useVaccinationRegistrationStore } from "../../store/vacinationRegistrationStore";

export const useVaccinationRegistrationMutation = () => {
  const { setRegistrationId } = useVaccinationRegistrationStore();

  return useMutation({
    mutationFn: async (
      data: VaccinationRegistrationParams
    ): Promise<VaccinationRegistrationResponse> => {
      const response = await onRegistVaccination(data);
      console.log("onRegistVaccination response", response);
      setRegistrationId(response.data.id ? String(response.data.id) : "");

      return response.data;
    },
  });
};
