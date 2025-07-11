import { useMutation } from "@tanstack/react-query";

import {
  CreateInjectionRegistrationParams,
  CreateInjectionRegistrationResponse,
} from "../../types";
import { onCreateInjectionRegistrationApi } from "../../services/injectionPointService";

export const useCreateInjectionRegistrationMutation = () => {
  return useMutation({
    mutationFn: async (
      data: CreateInjectionRegistrationParams
    ): Promise<CreateInjectionRegistrationResponse> => {
      const response = await onCreateInjectionRegistrationApi(data);
      return response.data;
    },
  });
};
