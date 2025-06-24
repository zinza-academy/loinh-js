"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import VaccinationLocationTable from "./VaccinationLocationTable";

export type VaccinationLocation = {
  id: string;
  province: string;
  address: string;
  person: string;
  tableCount: number;
};

type FormData = {
  province: string;
  address: string;
  person: string;
  tableCount: string;
};

function InjectionPointTab() {
  const [searchLocation, setSearchLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<VaccinationLocation | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      province: "hanoi",
      address: "",
      person: "",
      tableCount: "1",
    },
  });

  // Handle row click from VaccinationLocationTable
  const handleRowClick = (location: VaccinationLocation) => {
    setSelectedLocation(location);
    setValue("province", location.province);
    setValue("address", location.address);
    setValue("person", location.person);
    setValue("tableCount", location.tableCount.toString());
    setIsModalOpen(true);
  };

  // Reset form and close modal
  const handleCancel = () => {
    setSelectedLocation(null);
    reset({
      province: "hanoi",
      address: "",
      person: "",
      tableCount: "1",
    });
    setIsModalOpen(false);
  };

  // Handle confirm action
  const handleConfirm = (data: FormData) => {
    // Here you would typically save the updated location data
    console.log("Form data:", data);
    setSelectedLocation(null);
    reset({
      province: "hanoi",
      address: "",
      person: "",
      tableCount: "1",
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Điểm tiêm"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Địa chỉ</SelectItem>
                  <SelectItem value="hanoi">Hà Nội</SelectItem>
                  <SelectItem value="hcm">TP. HCM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Danh sách điểm tiêm</h2>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedLocation ? "Cập Nhật Điểm Tiêm" : "Thêm Điểm Tiêm"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(handleConfirm)} className="space-y-4">
                    <div>
                      <Label htmlFor="province">Tỉnh/thành phố</Label>
                      <Select
                        value={selectedLocation?.province || "hanoi"}
                        onValueChange={(value) => setValue("province", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        {...register("province", { required: "Tỉnh/thành phố là bắt buộc" })}
                      />
                      {errors.province && (
                        <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        placeholder="Smart City"
                        {...register("address", { required: "Địa chỉ là bắt buộc" })}
                        className="mt-1"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="person">Người đứng đầu cơ sở tiêm chủng</Label>
                      <Input
                        id="person"
                        placeholder="Đặng Thái Mai"
                        {...register("person", {
                          required: "Người đứng đầu là bắt buộc",
                        })}
                        className="mt-1"
                      />
                      {errors.person && (
                        <p className="text-red-500 text-sm mt-1">{errors.person.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tableCount">Số bàn tiêm</Label>
                      <Input
                        id="tableCount"
                        type="number"
                        {...register("tableCount", {
                          required: "Số bàn tiêm là bắt buộc",
                          min: { value: 1, message: "Số bàn tiêm phải lớn hơn 0" },
                        })}
                        className="mt-1"
                      />
                      {errors.tableCount && (
                        <p className="text-red-500 text-sm mt-1">{errors.tableCount.message}</p>
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
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        XÁC NHẬN
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <VaccinationLocationTable onRowClick={handleRowClick} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default InjectionPointTab;