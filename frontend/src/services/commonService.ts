import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import {
  CommonResponse,
  LocationsResponse,
  PaginationResponse,
  User,
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

export async function onGetUserDetailApi(id: string) {
  const response = await api.get<CommonResponse<User>>(
    API_ENDPOINTS.USER.GET_BY_ID(id)
  );
  return response.data;
}
