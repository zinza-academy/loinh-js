import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for registration results
const registrationData = [
  {
    stt: 1,
    fullName: "Nguyễn Văn A",
    birthDate: "16/10/1994",
    gender: "Nam",
    idNumber: "030012345678",
    status: "Đăng ký thành công",
  },
];

const ResultsTab = () => {
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
        {registrationData.map((item) => (
          <TableRow key={item.stt}>
            <TableCell>{item.stt}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.birthDate}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.idNumber}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600"
              >
                {item.status}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResultsTab;