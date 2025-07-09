import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { CommonResponse, PaginationResponse } from "@/types";
import { GetregistVaccinationSuccessResponse } from "../types";

export async function onGetregistVaccinationSuccess(
  page: number,
  limit: number
) {
  const response = await api.get<
    CommonResponse<PaginationResponse<GetregistVaccinationSuccessResponse>>
  >(
    API_ENDPOINTS.VACCINATION_REGISTRATION.GET_ALL +
      `?page=${page}&limit=${limit}`
  );
  return response.data;
}
