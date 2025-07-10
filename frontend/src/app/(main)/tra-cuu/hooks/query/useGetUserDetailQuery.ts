import { onGetUserDetailApi } from "@/services/commonService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetailQuery = (id?: string) => {
  console.log("idLLLL", id, !!id);
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) return undefined;
      return onGetUserDetailApi(id);
    },
    enabled: !!id,
  });
};
