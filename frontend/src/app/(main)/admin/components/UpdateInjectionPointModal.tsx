"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useGetLocation } from "@/hooks/useGetLocation";
import {
  District,
  LocationsResponse,
  VaccinationSitesResponse,
  Ward,
} from "@/types";
import { useUpdateInjection } from "../hooks/useUpdateInjectionPoint";

const formSchema = z.object({
  provinceId: z.string().min(1, "Tỉnh/thành phố là bắt buộc"),
  districtId: z.string().min(1, "Quận/huyện là bắt buộc"),
  wardId: z.string().min(1, "Xã/phường là bắt buộc"),
  name: z.string().min(1, "Tên điểm tiêm là bắt buộc"),
  addressDetail: z.string().min(1, "Địa chỉ là bắt buộc"),
  headOfVaccination: z.string().min(1, "Người đứng đầu là bắt buộc"),
  numberOfInjectionTable: z
    .string()
    .min(1, "Số bàn tiêm là bắt buộc")
    .regex(/^\d+$/, "Số bàn tiêm phải là số nguyên dương"),
});

// Form data type
type FormData = z.infer<typeof formSchema>;

interface UpdateInjectionPointModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLocation: VaccinationSitesResponse | null;
}

function UpdateInjectionPointModal({
  open,
  onOpenChange,
  selectedLocation,
}: UpdateInjectionPointModalProps) {
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const { updateInjectionPoint } = useUpdateInjection();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provinceId: "",
      districtId: "",
      wardId: "",
      name: "",
      addressDetail: "",
      headOfVaccination: "",
      numberOfInjectionTable: "1",
    },
  });

  const wardId = watch("wardId"); // Watch the wardId form value

  const { data: locationData } = useGetLocation();

  // Get unique provinces, districts, and wards
  const provinces = React.useMemo(() => {
    if (!locationData?.data) return [];
    return locationData.data;
  }, [locationData]);

  const districts = React.useMemo(() => {
    if (!locationData?.data || !selectedProvinceId) return [];
    const selectedProvince = locationData.data.find(
      (province: LocationsResponse) =>
        province.id.toString() === selectedProvinceId
    );
    return selectedProvince?.districts || [];
  }, [locationData, selectedProvinceId]);

  const wards = React.useMemo(() => {
    if (!locationData?.data || !selectedDistrictId) return [];
    const selectedProvince = locationData.data.find(
      (province: LocationsResponse) =>
        province.id.toString() === selectedProvinceId
    );
    const selectedDistrict = selectedProvince?.districts.find(
      (district: District) => district.id.toString() === selectedDistrictId
    );
    return selectedDistrict?.wards || [];
  }, [locationData, selectedProvinceId, selectedDistrictId]);

  // Prefill form with selectedLocation data when available
  useEffect(() => {
    if (selectedLocation && open && locationData?.data) {
      const provinceId = selectedLocation.province.id.toString();
      const districtId = selectedLocation.district.id.toString();
      const wardId = selectedLocation.ward.id.toString();

      // Set province and district first
      setSelectedProvinceId(provinceId);
      setSelectedDistrictId(districtId);

      // Set form values
      setValue("provinceId", provinceId);
      setValue("districtId", districtId);
      setValue("wardId", wardId);
      setValue("name", selectedLocation.name);
      setValue("addressDetail", selectedLocation.addressDetail);
      setValue("headOfVaccination", selectedLocation.headOfVaccination);
      setValue(
        "numberOfInjectionTable",
        selectedLocation.numberOfInjectionTable.toString()
      );
    } else {
      // Reset form when no location is selected or modal is closed
      reset({
        provinceId: "",
        districtId: "",
        wardId: "",
        name: "",
        addressDetail: "",
        headOfVaccination: "",
        numberOfInjectionTable: "",
      });
      setSelectedProvinceId("");
      setSelectedDistrictId("");
    }
  }, [selectedLocation, open, locationData, setValue, reset]);

  // Reset wardId when district changes
  useEffect(() => {
    if (
      selectedDistrictId &&
      wardId &&
      !wards.some((ward: Ward) => ward.id.toString() === wardId)
    ) {
      setValue("wardId", "");
    }
  }, [selectedDistrictId, wards, wardId, setValue]);

  // Reset form and close modal
  const handleCancel = () => {
    reset({
      provinceId: "",
      districtId: "",
      wardId: "",
      name: "",
      addressDetail: "",
      headOfVaccination: "",
      numberOfInjectionTable: "",
    });
    setSelectedProvinceId("");
    setSelectedDistrictId("");
    onOpenChange(false);
  };

  // Handle confirm action
  const handleConfirm = async (data: FormData) => {
    try {
      console.log("Form data:", {
        ...data,
        wardId: Number(data.wardId),
        numberOfInjectionTable: data.numberOfInjectionTable,
      });
      if (selectedLocation?.id) {
        updateInjectionPoint(selectedLocation.id.toString(), {
          addressDetail: data.addressDetail,
          name: data.name,
          headOfVaccination: data.headOfVaccination,
          numberOfInjectionTable: data.numberOfInjectionTable,
          wardId: Number(data.wardId),
        });
      } else {
        console.error("No selected location ID provided for update.");
      }
      handleCancel();
    } catch (error) {
      console.error("Error updating vaccination site:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cập Nhật Điểm Tiêm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleConfirm)} className="space-y-4">
          <div>
            <Label htmlFor="provinceId">Tỉnh/thành phố</Label>
            <Select
              value={selectedProvinceId}
              onValueChange={(value) => {
                setSelectedProvinceId(value);
                setSelectedDistrictId("");
                setValue("provinceId", value);
                setValue("districtId", "");
                setValue("wardId", "");
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn tỉnh/thành phố" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province: LocationsResponse) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="hidden"
              {...register("provinceId", {
                required: "Tỉnh/thành phố là bắt buộc",
              })}
            />
            {errors.provinceId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.provinceId.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="districtId">Quận/huyện</Label>
            <Select
              value={selectedDistrictId}
              onValueChange={(value) => {
                setSelectedDistrictId(value);
                setValue("districtId", value);
                setValue("wardId", "");
              }}
              disabled={!selectedProvinceId}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district: District) => (
                  <SelectItem key={district.id} value={district.id.toString()}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("districtId", {
                required: "Quận/huyện là bắt buộc",
              })}
            />
            {errors.districtId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.districtId.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="wardId">Xã/phường</Label>
            <Select
              value={wardId}
              onValueChange={(value) => setValue("wardId", value)}
              disabled={!selectedDistrictId}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn xã/phường" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((ward: Ward) => (
                  <SelectItem key={ward.id} value={ward.id.toString()}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("wardId", { required: "Xã/phường là bắt buộc" })}
            />
            {errors.wardId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.wardId.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="name">Tên điểm tiêm</Label>
            <Input
              id="name"
              placeholder="Bệnh viện Đa khoa Medlatec"
              {...register("name", { required: "Tên điểm tiêm là bắt buộc" })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="addressDetail">Địa chỉ</Label>
            <Input
              id="addressDetail"
              placeholder="Smart City"
              {...register("addressDetail", {
                required: "Địa chỉ là bắt buộc",
              })}
              className="mt-1"
            />
            {errors.addressDetail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.addressDetail.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="headOfVaccination">
              Người đứng đầu cơ sở tiêm chủng
            </Label>
            <Input
              id="headOfVaccination"
              placeholder="Đặng Thái Mai"
              {...register("headOfVaccination", {
                required: "Người đứng đầu là bắt buộc",
              })}
              className="mt-1"
            />
            {errors.headOfVaccination && (
              <p className="text-red-500 text-sm mt-1">
                {errors.headOfVaccination.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="numberOfInjectionTable">Số bàn tiêm</Label>
            <Input
              id="numberOfInjectionTable"
              {...register("numberOfInjectionTable", {
                required: "Số bàn tiêm là bắt buộc",
                min: { value: 1, message: "Số bàn tiêm phải lớn hơn 0" },
              })}
              className="mt-1"
            />
            {errors.numberOfInjectionTable && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfInjectionTable.message}
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
  );
}

export default UpdateInjectionPointModal;
