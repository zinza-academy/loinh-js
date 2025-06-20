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
import { VaccinationDocument } from "@/lib/types/vaccination.response";

type FormData = {
  documentType: string;
  fullName: string;
  idNumber: string;
  issueDate: string;
  status: string;
};

function DocumentTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] =
    useState<VaccinationDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      documentType: "",
      fullName: "",
      idNumber: "",
      issueDate: "",
      status: "",
    },
  });

  const tableData: VaccinationDocument[] = [
    {
      id: "1",
      documentType: "Certificate",
      fullName: "Nguyễn Văn A",
      idNumber: "030012345678",
      issueDate: "08/09/2021",
      status: "Issued",
    },
    {
      id: "2",
      documentType: "Health Declaration",
      fullName: "Trần Thị B",
      idNumber: "030012345679",
      issueDate: "09/09/2021",
      status: "Pending",
    },
    {
      id: "3",
      documentType: "Certificate",
      fullName: "Lê Văn C",
      idNumber: "030012345680",
      issueDate: "10/09/2021",
      status: "Issued",
    },
  ];

  const handleRowClick = (document: VaccinationDocument) => {
    setSelectedDocument(document);
    setValue("documentType", document.documentType);
    setValue("fullName", document.fullName);
    setValue("idNumber", document.idNumber);
    setValue("issueDate", document.issueDate);
    setValue("status", document.status);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedDocument(null);
    reset();
    setIsModalOpen(false);
  };

  const handleConfirm = (data: FormData) => {
    // Here you would typically save the updated document data
    console.log("Form data:", data);
    setSelectedDocument(null);
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
                Danh sách tài liệu tiêm chủng
              </CardTitle>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Thêm tài liệu
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedDocument ? "Cập nhật tài liệu" : "Thêm tài liệu"}
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit(handleConfirm)}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="documentType">Loại tài liệu</Label>
                      <Select
                        value={selectedDocument?.documentType || ""}
                        onValueChange={(value) =>
                          setValue("documentType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="certificate">
                            Chứng nhận tiêm chủng
                          </SelectItem>
                          <SelectItem value="healthDeclaration">
                            Khai báo y tế
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        {...register("documentType", {
                          required: "Loại tài liệu là bắt buộc",
                        })}
                      />
                      {errors.documentType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.documentType.message}
                        </p>
                      )}
                    </div>
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
                      <Label htmlFor="issueDate">Ngày cấp</Label>
                      <Input
                        id="issueDate"
                        {...register("issueDate", {
                          required: "Ngày cấp là bắt buộc",
                        })}
                        className="mt-1"
                      />
                      {errors.issueDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.issueDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="status">Trạng thái</Label>
                      <Select
                        value={selectedDocument?.status || ""}
                        onValueChange={(value) => setValue("status", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="issued">Issued</SelectItem>
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
                      Loại tài liệu
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Họ và tên
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      CMND/CCCD
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Ngày cấp
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
                        <TableCell>{row.documentType}</TableCell>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.idNumber}</TableCell>
                        <TableCell>{row.issueDate}</TableCell>
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

export default DocumentTab;
