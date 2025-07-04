import { useMutation } from "@tanstack/react-query";

import {
  CreateInjectionPointParams,
  CreateInjectionPointResponse,
} from "../../types";
import { onCreateInjectionPointApi } from "../../services/injectionPointService";

export const useCreateInjectionPointMutation = () => {
  return useMutation({
    mutationFn: async (
      data: CreateInjectionPointParams
    ): Promise<CreateInjectionPointResponse> => {
      const response = await onCreateInjectionPointApi(data);
      return response.data;
    },
  });
};
