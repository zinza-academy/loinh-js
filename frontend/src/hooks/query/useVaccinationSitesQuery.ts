import { onGetVaccinationSiteListApi } from "@/services/commonService";
import { useQuery } from "@tanstack/react-query";

export const useVaccinationSitesQuery = () => {
  return useQuery({
    queryKey: ["vaccination-sites"],
    queryFn: async () => onGetVaccinationSiteListApi(),
  });
};
