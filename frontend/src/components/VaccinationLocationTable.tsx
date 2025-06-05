import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

const VaccinationLocationTable = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const tableData = [
    {
      stt: 1,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 2,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 3,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 4,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 5,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 6,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 7,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 8,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    },
    {
      stt: 9,
      tenDiemTiem: "Bệnh viện Đa khoa Medlatec",
      diaChi: "42-44 Nghĩa Dũng",
      xaPhuong: "Phúc Xá",
      quanHuyen: "Quận Ba Đình",
      tinhThanhPho: "Thành phố Hà Nội",
      nguoiDongDau: "Nguyễn Thị Kim Liên",
      soBanTiem: 1
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Tra cứu điểm tiêm theo địa bàn
        </CardTitle>
        
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1">
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tỉnh/Thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Thành phố Hà Nội</SelectItem>
                <SelectItem value="hcm">Thành phố Hồ Chí Minh</SelectItem>
                <SelectItem value="danang">Thành phố Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="badinh">Quận Ba Đình</SelectItem>
                <SelectItem value="hoankkiem">Quận Hoàn Kiếm</SelectItem>
                <SelectItem value="dongda">Quận Đống Đa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Xã/Phường" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phucxa">Phúc Xá</SelectItem>
                <SelectItem value="trucbach">Trúc Bạch</SelectItem>
                <SelectItem value="viendong">Viên Đông</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center font-semibold text-gray-900">STT</TableHead>
                <TableHead className="font-semibold text-gray-900">Tên điểm tiêm</TableHead>
                <TableHead className="font-semibold text-gray-900">Số nhà, tên đường</TableHead>
                <TableHead className="font-semibold text-gray-900">Xã/Phường</TableHead>
                <TableHead className="font-semibold text-gray-900">Quận/Huyện</TableHead>
                <TableHead className="font-semibold text-gray-900">Tỉnh/Thành phố</TableHead>
                <TableHead className="font-semibold text-gray-900">Người đứng đầu cơ sở tiêm chủng</TableHead>
                <TableHead className="text-center font-semibold text-gray-900">Số bàn tiêm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.stt} className="hover:bg-gray-50">
                  <TableCell className="text-center">{row.stt}</TableCell>
                  <TableCell className="font-medium">{row.tenDiemTiem}</TableCell>
                  <TableCell>{row.diaChi}</TableCell>
                  <TableCell>{row.xaPhuong}</TableCell>
                  <TableCell>{row.quanHuyen}</TableCell>
                  <TableCell>{row.tinhThanhPho}</TableCell>
                  <TableCell>{row.nguoiDongDau}</TableCell>
                  <TableCell className="text-center">{row.soBanTiem}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VaccinationLocationTable;