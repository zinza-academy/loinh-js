"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { VaccineRegistration } from "@/lib/types/vaccination.response";

type FormData = {
  fullName: string;
  idNumber: string;
  registrationDate: string;
  vaccineType: string;
  status: string;
};

function VaccineRegistrationTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistration, setSelectedRegistration] =
    useState<VaccineRegistration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      idNumber: "",
      registrationDate: "",
      vaccineType: "",
      status: "",
    },
  });

  const tableData: VaccineRegistration[] = [
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      idNumber: "030012345678",
      registrationDate: "08/09/2021",
      vaccineType: "AstraZeneca",
      status: "Registered",
    },
    {
      id: "2",
      fullName: "Trần Thị B",
      idNumber: "030012345679",
      registrationDate: "09/09/2021",
      vaccineType: "Pfizer",
      status: "Completed",
    },
    {
      id: "3",
      fullName: "Lê Văn C",
      idNumber: "030012345680",
      registrationDate: "10/09/2021",
      vaccineType: "Moderna",
      status: "Pending",
    },
  ];

  const handleRowClick = (registration: VaccineRegistration) => {
    setSelectedRegistration(registration);
    setValue("fullName", registration.fullName);
    setValue("idNumber", registration.idNumber);
    setValue("registrationDate", registration.registrationDate);
    setValue("vaccineType", registration.vaccineType);
    setValue("status", registration.status);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedRegistration(null);
    reset();
    setIsModalOpen(false);
  };

  const handleConfirm = (data: FormData) => {
    // Here you would typically save the updated registration data
    console.log("Form data:", data);
    setSelectedRegistration(null);
    reset();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên hoặc CMND/CCCD"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Danh sách đăng ký tiêm chủng
              </CardTitle>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Thêm đăng ký
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedRegistration
                        ? "Cập nhật đăng ký"
                        : "Thêm đăng ký"}
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit(handleConfirm)}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        id="fullName"
                        {...register("fullName", {
                          required: "Họ và tên là bắt buộc",
                        })}
                        className="mt-1"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="idNumber">CMND/CCCD</Label>
                      <Input
                        id="idNumber"
                        {...register("idNumber", {
                          required: "CMND/CCCD là bắt buộc",
                          pattern: {
                            value: /^\d{12}$/,
                            message: "CMND/CCCD phải là 12 chữ số",
                          },
                        })}
                        className="mt-1"
                      />
                      {errors.idNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.idNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="registrationDate">Ngày đăng ký</Label>
                      <Input
                        id="registrationDate"
                        {...register("registrationDate", {
                          required: "Ngày đăng ký là bắt buộc",
                        })}
                        className="mt-1"
                      />
                      {errors.registrationDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.registrationDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="vaccineType">Loại vắc xin</Label>
                      <Select
                        value={selectedRegistration?.vaccineType || ""}
                        onValueChange={(value) =>
                          setValue("vaccineType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="astrazeneca">
                            AstraZeneca
                          </SelectItem>
                          <SelectItem value="pfizer">Pfizer</SelectItem>
                          <SelectItem value="moderna">Moderna</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        {...register("vaccineType", {
                          required: "Loại vắc xin là bắt buộc",
                        })}
                      />
                      {errors.vaccineType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.vaccineType.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="status">Trạng thái</Label>
                      <Select
                        value={selectedRegistration?.status || ""}
                        onValueChange={(value) => setValue("status", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="registered">Registered</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        {...register("status", {
                          required: "Trạng thái là bắt buộc",
                        })}
                      />
                      {errors.status && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleCancel}
                      >
                        HỦY BỎ
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        XÁC NHẬN
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                      Họ và tên
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      CMND/CCCD
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Ngày đăng ký
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Loại vắc xin
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Trạng thái
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData
                    .filter(
                      (row) =>
                        row.fullName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        row.idNumber.includes(searchQuery)
                    )
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(row)}
                      >
                        <TableCell className="text-center">{row.id}</TableCell>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.idNumber}</TableCell>
                        <TableCell>{row.registrationDate}</TableCell>
                        <TableCell>{row.vaccineType}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default VaccineRegistrationTab;
