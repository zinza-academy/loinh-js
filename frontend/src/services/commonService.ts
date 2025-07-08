import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import {
  CommonResponse,
  LocationsResponse,
  PaginationResponse,
  VaccinationSitesResponse,
} from "@/types";

export async function onGetLocationListApi() {
  const response = await api.get<CommonResponse<LocationsResponse[]>>(
    API_ENDPOINTS.LOCATIONS
  );
  return response.data;
}

export async function onGetVaccinationSiteListApi() {
  const response = await api.get<
    CommonResponse<PaginationResponse<VaccinationSitesResponse>>
  >(API_ENDPOINTS.VACCINATION_SITE.GET_ALL);
  return response.data;
}
