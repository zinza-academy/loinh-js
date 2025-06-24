"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { VaccinationLocation } from "./InjectionPointTab";

interface VaccinationLocationTableProps {
  onRowClick: (location: VaccinationLocation) => void;
}

const VaccinationLocationTable = ({
  onRowClick,
}: VaccinationLocationTableProps) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const tableData: VaccinationLocation[] = [
    {
      id: "1",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 1,
    },
    {
      id: "2",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 3,
    },
    {
      id: "3",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 2,
    },
    {
      id: "4",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 6,
    },
    {
      id: "5",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 5,
    },
    {
      id: "6",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 9,
    },
    {
      id: "7",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 8,
    },
    {
      id: "8",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 81,
    },
    {
      id: "9",
      province: "hanoi",
      address: "42-44 Nghĩa Dũng",
      person: "Nguyễn Thị Kim Liên",
      tableCount: 60,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Tra cứu điểm tiêm theo địa bàn
        </CardTitle>

        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1">
            <Select
              value={selectedProvince}
              onValueChange={setSelectedProvince}
            >
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
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="badinh">Quận Ba Đình</SelectItem>
                <SelectItem value="hoankiem">Quận Hoàn Kiếm</SelectItem>
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
                <TableHead className="text-center font-semibold text-gray-900">
                  STT
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Tên điểm tiêm
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Số nhà, tên đường
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Xã/Phường
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Quận/Huyện
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Tỉnh/Thành phố
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Người đứng đầu cơ sở tiêm chủng
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-900">
                  Số bàn tiêm
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onRowClick(row)}
                >
                  <TableCell className="text-center">{row.id}</TableCell>
                  <TableCell className="font-medium">
                    Bệnh viện Đa khoa Medlatec
                  </TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>Phúc Xá</TableCell>
                  <TableCell>Quận Ba Đình</TableCell>
                  <TableCell>Thành phố Hà Nội</TableCell>
                  <TableCell>{row.person}</TableCell>
                  <TableCell className="text-center">
                    {row.tableCount}
                  </TableCell>
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
