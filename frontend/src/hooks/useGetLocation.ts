import { useGetLocationQuery } from "./query/useGetLocationQuery";

export const useGetLocation = () => {
  const { data, isLoading, isError, error, refetch } = useGetLocationQuery();

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } as const;
};
