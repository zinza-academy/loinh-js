import { useVaccinationSitesQuery } from "./query/useVaccinationSitesQuery";

export const useVaccinationSites = () => {
  const { data, isLoading, isError, error, refetch } =
    useVaccinationSitesQuery();

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } as const;
};
