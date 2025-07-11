import { API_ENDPOINTS } from "@/configs/api-endpoints";
import { CommonResponse } from "@/types";
import {
  UpdateInjectionRegistrationParams,
  UpdateInjectionRegistrationResponse,
} from "../types";
import api from "@/configs/axios";

export async function onUpdateInjectionRegistrationApi(
  id: string,
  data: UpdateInjectionRegistrationParams
): Promise<CommonResponse<UpdateInjectionRegistrationResponse>> {
  const response = await api.patch<
    CommonResponse<UpdateInjectionRegistrationResponse>
  >(API_ENDPOINTS.VACCINATION_REGISTRATION.UPDATE(id), data);
  return response.data;
}
