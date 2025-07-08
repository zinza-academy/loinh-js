import { onGetLocationListApi } from "@/services/commonService";
import { useQuery } from "@tanstack/react-query";

export const useGetLocationQuery = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => onGetLocationListApi(),
  });
};
