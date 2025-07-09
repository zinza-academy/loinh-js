import { useQuery } from "@tanstack/react-query";
import { onGetregistVaccinationSuccess } from "../../services/registVaccinationSuccessService";

export const useGetRegistVaccinationSuccessQuery = (
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["regist-vaccination-success"],
    queryFn: async () => onGetregistVaccinationSuccess(page, limit),
  });
};
