import { useQuery } from "@tanstack/react-query";
import commonService from "../services/commonService";

export const useGetLocation = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => commonService.getLocationList(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
