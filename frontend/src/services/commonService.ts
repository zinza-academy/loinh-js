import { API_ENDPOINTS } from "@/configs/api-endpoints";
import api from "@/configs/axios";
import { CommonResponse, LocationsResponse } from "@/types";

class CommonService {
  async getLocationList() {
    const response = await api.get<CommonResponse<LocationsResponse[]>>(
      API_ENDPOINTS.LOCATIONS
    );
    return response.data;
  }
}
export const commonService = new CommonService();
export default commonService;
