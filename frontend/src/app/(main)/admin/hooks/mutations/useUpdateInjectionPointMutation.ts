import { useMutation } from "@tanstack/react-query";

import { onUpdateInjectionPointApi } from "../../services/injectionPointService";
import {
  UpdateInjectionPointParams,
  UpdateInjectionPointResponse,
} from "../../types";

export const useUpdateInjectionPointMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInjectionPointParams;
    }): Promise<UpdateInjectionPointResponse> => {
      const response = await onUpdateInjectionPointApi(id, data);
      return response.data;
    },
  });
};
