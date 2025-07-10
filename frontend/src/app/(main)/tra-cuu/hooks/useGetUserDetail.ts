import { useGetUserDetailQuery } from "./query/useGetUserDetailQuery";

export const useGetUserDetail = (id?: string) => {
  const query = useGetUserDetailQuery(id);
  return {
    ...query,
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
