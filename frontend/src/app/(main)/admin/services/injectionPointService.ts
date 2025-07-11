import api from "@/configs/axios";
import {
  CreateInjectionPointParams,
  CreateInjectionPointResponse,
  CreateInjectionRegistrationParams,
  CreateInjectionRegistrationResponse,
  UpdateInjectionPointParams,
  UpdateInjectionPointResponse,
} from "../types";
import { API_ENDPOINTS } from "@/configs/api-endpoints";
import { CommonResponse } from "@/types";

export async function onCreateInjectionPointApi(
  data: CreateInjectionPointParams
): Promise<CommonResponse<CreateInjectionPointResponse>> {
  const response = await api.post<CommonResponse<CreateInjectionPointResponse>>(
    API_ENDPOINTS.VACCINATION_SITE.CREATE,
    data
  );
  return response.data;
}

export async function onUpdateInjectionPointApi(
  id: string,
  data: UpdateInjectionPointParams
): Promise<CommonResponse<UpdateInjectionPointResponse>> {
  const response = await api.patch<
    CommonResponse<UpdateInjectionPointResponse>
  >(API_ENDPOINTS.VACCINATION_SITE.UPDATE(id), data);
  return response.data;
}

export async function onCreateInjectionRegistrationApi (
  data: CreateInjectionRegistrationParams
): Promise<CommonResponse<CreateInjectionRegistrationResponse>> {
  const response = await api.post<CommonResponse<CreateInjectionRegistrationResponse>>(
    API_ENDPOINTS.VACCINATION_REGISTRATION.CREATE,
    data
  );
  return response.data;
}