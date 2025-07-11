import { useMutation } from "@tanstack/react-query";

import {
  UpdateInjectionRegistrationResponse,
  UpdateInjectionRegistrationParams,
} from "../../types";
import { onUpdateInjectionRegistrationApi } from "../../services/InjectionRegistrationService";

export const useUpdateInjectionRegistrationMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInjectionRegistrationParams;
    }): Promise<UpdateInjectionRegistrationResponse> => {
      const response = await onUpdateInjectionRegistrationApi(id, data);
      return response.data;
    },
  });
};
