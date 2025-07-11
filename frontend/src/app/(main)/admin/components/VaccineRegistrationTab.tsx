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
import { useGetRegistVaccinationSuccess } from "../../tra-cuu/hooks/useGetRegistVaccinationSuccess";
import dayjs from "dayjs";
import { GetregistVaccinationSuccessResponse } from "../../tra-cuu/types";
import { useUpdateInjectionRegistration } from "../hooks/useUpdateInjectionRegistration";
import { useCreateInjectionRegistration } from "../hooks/useCreateInjectionRegistration";
import { VaccineStatus, VaccineType } from "../types";

type FormData = {
  name: string;
  identityNumber: string;
  createdAt: string;
  vaccineType: string;
  status: string;
};

function VaccineRegistrationTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistration, setSelectedRegistration] =
    useState<GetregistVaccinationSuccessResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      identityNumber: "",
      createdAt: dayjs().format("DD/MM/YYYY"), // Ngày hiện tại mặc định
      vaccineType: "",
      status: "",
    },
  });

  const vaccineTypeValue = watch("vaccineType");
  const statusValue = watch("status");

  const { data: registVaccinationData } = useGetRegistVaccinationSuccess(1, 10);
  const { updateInjectionRegistration } = useUpdateInjectionRegistration();
  const { createInjectionRegistration } = useCreateInjectionRegistration();

  const handleRowClick = (
    registration: GetregistVaccinationSuccessResponse
  ) => {
    setSelectedRegistration(registration);
    setValue("name", registration.user.name);
    setValue("identityNumber", registration.user.identityNumber);
    setValue("createdAt", dayjs(registration.createdAt).format("DD/MM/YYYY"));
    setValue("vaccineType", registration.vaccineType || "");
    setValue(
      "status",
      registration.status !== null ? String(registration.status) : ""
    );
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedRegistration(null);
    reset();
    setIsModalOpen(false);
  };

  const handleConfirm = async (data: FormData) => {
    if (selectedRegistration) {
      // Cập nhật đăng ký
      await updateInjectionRegistration(String(selectedRegistration.id), {
        vaccineType: data.vaccineType as VaccineType,
        status: data.status as VaccineStatus,
      });
    } else {
      // Tạo mới đăng ký
      await createInjectionRegistration({
        name: data.name,
        identityNumber: data.identityNumber,
        createdAt: dayjs(data.createdAt, "DD/MM/YYYY").toISOString(),
        vaccineType: data.vaccineType as VaccineType,
        status: data.status as VaccineStatus,
      });
    }
    setSelectedRegistration(null);
    reset();
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setSelectedRegistration(null);
    reset({
      name: "",
      identityNumber: "",
      createdAt: dayjs().format("DD/MM/YYYY"),
      vaccineType: "",
      status: "",
    });
    setIsModalOpen(true);
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
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleOpenModal}
                  >
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
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input
                        id="name"
                        {...register("name", {
                          required: "Họ và tên là bắt buộc",
                        })}
                        className="mt-1"
                        disabled={!!selectedRegistration} // Chỉ disabled khi cập nhật
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="identityNumber">CMND/CCCD</Label>
                      <Input
                        id="identityNumber"
                        {...register("identityNumber", {
                          required: "CMND/CCCD là bắt buộc",
                        })}
                        className="mt-1"
                        disabled={!!selectedRegistration} // Chỉ disabled khi cập nhật
                      />
                      {errors.identityNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.identityNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="createdAt">Ngày đăng ký</Label>
                      <Input
                        id="createdAt"
                        {...register("createdAt", {
                          required: "Ngày đăng ký là bắt buộc",
                        })}
                        className="mt-1"
                        disabled // Luôn disabled vì ngày được tự động tạo
                      />
                      {errors.createdAt && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.createdAt.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="vaccineType">Loại vắc xin</Label>
                      <Select
                        value={vaccineTypeValue}
                        onValueChange={(value) =>
                          setValue("vaccineType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ASTRAZENECA">
                            AstraZeneca
                          </SelectItem>
                          <SelectItem value="PFIZER">Pfizer</SelectItem>
                          <SelectItem value="MODERNA">Moderna</SelectItem>
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
                        value={statusValue}
                        onValueChange={(value) => setValue("status", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="APPROVED">APPROVED</SelectItem>
                          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                          <SelectItem value="REJECTED">REJECTED</SelectItem>
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
                  {registVaccinationData?.data?.data.data &&
                    registVaccinationData.data.data.data
                      .filter(
                        (row) =>
                          row.user.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          row.user.identityNumber.includes(searchQuery)
                      )
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(row)}
                        >
                          <TableCell className="text-center">
                            {row.id}
                          </TableCell>
                          <TableCell>{row.user.name}</TableCell>
                          <TableCell>{row.user.identityNumber}</TableCell>
                          <TableCell>
                            {dayjs(row.createdAt).format("DD/MM/YYYY")}
                          </TableCell>
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
