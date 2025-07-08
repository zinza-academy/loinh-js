import { CommonResponse } from "@/types";
import {
  VaccinationRegistrationParams,
  VaccinationRegistrationResponse,
} from "../types";
import api from "@/configs/axios";
import { API_ENDPOINTS } from "@/configs/api-endpoints";

export async function onRegistVaccination(
  data: VaccinationRegistrationParams
): Promise<CommonResponse<VaccinationRegistrationResponse>> {
  const response = await api.post<
    CommonResponse<VaccinationRegistrationResponse>
  >(API_ENDPOINTS.VACCINATION_REGISTRATION.CREATE, data);
  return response.data;
}
