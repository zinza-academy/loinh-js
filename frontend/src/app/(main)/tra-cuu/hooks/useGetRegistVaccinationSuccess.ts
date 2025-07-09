import { useGetRegistVaccinationSuccessQuery } from "./query/useGetRegistVaccinationSuccessQuery";

export const useGetRegistVaccinationSuccess = (page: number, limit: number) => {
  const query = useGetRegistVaccinationSuccessQuery(page, limit);
  return {
    ...query,
    data: query,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
