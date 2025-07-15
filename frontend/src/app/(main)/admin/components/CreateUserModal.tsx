"use client";
import React, { useState } from "react";
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
import { District, LocationsResponse, Ward } from "@/types";
import { useCreateUser } from "../hooks/useCreateUser";
import { UserGender } from "@/lib/types/user";
import { UserRole } from "@/app/(auth)/account/types";

const formSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  identityNumber: z.string().min(1, "Số CMND/CCCD là bắt buộc"),
  gender: z.enum(Object.values(UserGender) as [string, ...string[]], {
    errorMap: () => ({ message: "Giới tính là bắt buộc" }),
  }),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  provinceId: z.string().min(1, "Tỉnh/thành phố là bắt buộc"),
  districtId: z.string().min(1, "Quận/huyện là bắt buộc"),
  wardId: z.string().min(1, "Phường/xã là bắt buộc"),
  role: z.enum(Object.values(UserRole) as [string, ...string[]], {
    errorMap: () => ({ message: "Vai trò là bắt buộc" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateUserModal({ open, onOpenChange }: CreateUserModalProps) {
  const { data: locationData } = useGetLocation();
  const { createUser, isLoading } = useCreateUser();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      identityNumber: "",
      gender: UserGender.MALE,
      email: "",
      password: "",
      phone: "",
      birthDate: "",
      provinceId: "",
      districtId: "",
      wardId: "",
      role: UserRole.USER,
    },
  });

  const selectedProvince = watch("provinceId");
  const selectedDistrict = watch("districtId");

  React.useEffect(() => {
    if (selectedProvince) {
      setValue("districtId", "");
      setValue("wardId", "");
      setSelectedProvinceId(selectedProvince);
    }
  }, [selectedProvince, setValue]);

  React.useEffect(() => {
    if (selectedDistrict) {
      setValue("wardId", "");
      setSelectedDistrictId(selectedDistrict);
    }
  }, [selectedDistrict, setValue]);

  const getDistricts = (): District[] => {
    if (!locationData?.data || !selectedProvinceId) return [];
    const province = locationData.data.find(
      (p) => p.id.toString() === selectedProvinceId
    );
    return province?.districts || [];
  };

  const getWards = (): Ward[] => {
    if (!selectedDistrictId) return [];
    const districts = getDistricts();
    const district = districts.find(
      (d) => d.id.toString() === selectedDistrictId
    );
    return district?.wards || [];
  };

  const handleCancel = () => {
    reset({
      name: "",
      identityNumber: "",
      gender: UserGender.MALE,
      email: "",
      password: "",
      phone: "",
      birthDate: "",
      provinceId: "",
      districtId: "",
      wardId: "",
      role: "USER",
    });
    setSelectedProvinceId("");
    setSelectedDistrictId("");
    onOpenChange(false);
  };

  const handleConfirm = async (data: FormData) => {
    try {
      await createUser({
        name: data.name,
        identityNumber: data.identityNumber,
        gender: data.gender,
        email: data.email,
        password: data.password,
        phone: data.phone || "",
        birthDate: data.birthDate || "",
        wardId: Number(data.wardId),
        role: data.role,
      });
      handleCancel();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo người dùng mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleConfirm)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Tên</Label>
              <Input id="name" {...register("name")} placeholder="Nhập tên" />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="identityNumber">Số CMND/CCCD</Label>
              <Input
                id="identityNumber"
                {...register("identityNumber")}
                placeholder="Nhập số CMND/CCCD"
              />
              {errors.identityNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.identityNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="birthDate">Ngày sinh</Label>
              <Input id="birthDate" type="date" {...register("birthDate")} />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                value={watch("gender")}
                onValueChange={(value) =>
                  setValue("gender", value as UserGender)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserGender.MALE}>Nam</SelectItem>
                  <SelectItem value={UserGender.FEMALE}>Nữ</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="role">Vai trò</Label>
              <Select
                value={watch("role")}
                onValueChange={(value) =>
                  setValue("role", value as "ADMIN" | "USER")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Người dùng</SelectItem>
                  <SelectItem value="ADMIN">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="provinceId">Tỉnh/Thành phố</Label>
              <Select
                value={watch("provinceId")}
                onValueChange={(value) => setValue("provinceId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {locationData?.data.map((province: LocationsResponse) => (
                    <SelectItem
                      key={province.id}
                      value={province.id.toString()}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.provinceId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.provinceId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="districtId">Quận/Huyện</Label>
              <Select
                value={watch("districtId")}
                onValueChange={(value) => setValue("districtId", value)}
                disabled={!selectedProvinceId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {getDistricts().map((district: District) => (
                    <SelectItem
                      key={district.id}
                      value={district.id.toString()}
                    >
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.districtId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.districtId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="wardId">Phường/Xã</Label>
              <Select
                value={watch("wardId")}
                onValueChange={(value) => setValue("wardId", value)}
                disabled={!selectedDistrictId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  {getWards().map((ward: Ward) => (
                    <SelectItem key={ward.id} value={ward.id.toString()}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.wardId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.wardId.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang tạo..." : "Tạo người dùng"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserModal;
