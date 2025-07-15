import { useGetAllUsersQuery } from "./query/useGetAllUsersQuery";

export const useGetAllUsers = (page: number = 1, limit: number = 10) => {
  const query = useGetAllUsersQuery(page, limit);

  return {
    ...query,
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
