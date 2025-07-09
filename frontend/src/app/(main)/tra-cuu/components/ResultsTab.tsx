import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRegistVaccinationSuccess } from "../hooks/useGetRegistVaccinationSuccess";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import dayjs from "dayjs";

const ResultsTab = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagination, _setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isPending } = useGetRegistVaccinationSuccess(
    pagination.page,
    pagination.limit
  );

  const { user } = useAuthStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>STT</TableHead>
          <TableHead>Họ và tên</TableHead>
          <TableHead>Ngày sinh</TableHead>
          <TableHead>Giới tính</TableHead>
          <TableHead>Số CMND/CCCD/Mã định danh công dân</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? "Loading..."
          : data.data?.data.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>
                  {user?.birthDate
                    ? dayjs(user.birthDate).isValid()
                      ? dayjs(user.birthDate).format("DD/MM/YYYY")
                      : ""
                    : ""}
                </TableCell>
                <TableCell>{user?.gender}</TableCell>
                <TableCell>{item.healthInsuranceNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600"
                  >
                    {"Đăng ký thành công"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default ResultsTab;
