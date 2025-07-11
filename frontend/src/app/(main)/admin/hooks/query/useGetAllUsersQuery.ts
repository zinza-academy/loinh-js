import { useQuery } from "@tanstack/react-query";
import { onGetAllUsersApi } from "../../services/userService";

export const useGetAllUsersQuery = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      return onGetAllUsersApi(page, limit);
    },
  });
};
