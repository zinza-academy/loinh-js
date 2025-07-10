import { useEffect, useMemo } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useGetUserDetail } from "../hooks/useGetUserDetail";
import { useAuthStore } from "@/stores/authStore";
import { useGetLocation } from "@/hooks/useGetLocation";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useChangePassword } from "@/app/(auth)/account/hooks/useChangePassword";
import { useUpdateUser } from "../hooks/useUpdateUser";
import dayjs from "dayjs";
import { UpdateUserParams } from "../types";

const formSchema = z
  .object({
    identityNumber: z.string().optional(),
    fullName: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    birthDate: z.date().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const AccountTab = () => {
  const { user } = useAuthStore();
  const userId = user?.id ? String(user.id) : undefined;

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserDetail(userId);
  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useGetLocation();
  const { changePassword, isPending: isChangePasswordPending } =
    useChangePassword();
  const { updateUser, isPending: isUpdateUserPending } = useUpdateUser();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identityNumber: "",
      fullName: "",
      gender: undefined,
      birthDate: undefined,
      province: "",
      district: "",
      ward: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const selectedProvince = useWatch({
    control,
    name: "province",
    defaultValue: "",
  });
  const selectedDistrict = useWatch({
    control,
    name: "district",
    defaultValue: "",
  });

  useEffect(() => {
    if (!userData?.data || !locationData?.data) {
      return;
    }

    const provinceId = userData.data.location?.province?.id?.toString() || "";
    const districtId = userData.data.location?.district?.id?.toString() || "";
    const wardId = userData.data.location?.ward?.id?.toString() || "";
    const gender = ["MALE", "FEMALE"].includes(userData.data.gender)
      ? userData.data.gender
      : undefined;
    const birthDate = userData.data.birthDate
      ? new Date(userData.data.birthDate)
      : undefined;

    reset({
      identityNumber: userData.data.identityNumber || "",
      fullName: userData.data.name || "",
      gender: gender as "MALE" | "FEMALE" | undefined,
      birthDate,
      province: provinceId,
      district: districtId,
      ward: wardId,
      password: "",
      confirmPassword: "",
    });
  }, [userData?.data, locationData?.data, reset, getValues]);

  useEffect(() => {
    if (selectedProvince) {
      const currentDistrict = getValues("district");
      const districtExists = locationData?.data
        .find((p) => p.id.toString() === selectedProvince)
        ?.districts.some((d) => d.id.toString() === currentDistrict);
      if (!districtExists) {
        setValue("district", "");
        setValue("ward", "");
      }
    }
  }, [selectedProvince, setValue, getValues, locationData?.data]);

  useEffect(() => {
    if (selectedDistrict) {
      const currentWard = getValues("ward");
      const wardExists = locationData?.data
        .find((p) => p.id.toString() === selectedProvince)
        ?.districts.find((d) => d.id.toString() === selectedDistrict)
        ?.wards.some((w) => w.id.toString() === currentWard);
      if (!wardExists) {
        setValue("ward", "");
      }
    }
  }, [
    selectedDistrict,
    setValue,
    getValues,
    selectedProvince,
    locationData?.data,
  ]);

  const locationOptions = useMemo(() => {
    if (!locationData?.data) return { provinces: [], districts: [], wards: [] };

    const provinces = locationData.data.map((province) => ({
      value: province.id.toString(),
      label: province.name,
    }));

    const districts = selectedProvince
      ? locationData.data
          .find((p) => p.id.toString() === selectedProvince)
          ?.districts.map((district) => ({
            value: district.id.toString(),
            label: district.name,
          })) || []
      : [];

    const wards = selectedDistrict
      ? locationData.data
          .find((p) => p.id.toString() === selectedProvince)
          ?.districts.find((d) => d.id.toString() === selectedDistrict)
          ?.wards.map((ward) => ({
            value: ward.id.toString(),
            label: ward.name,
          })) || []
      : [];

    return { provinces, districts, wards };
  }, [locationData?.data, selectedProvince, selectedDistrict]);

  const onSubmitUserDetails = async (data: FormData) => {
    clearErrors("root");
    const updateData: UpdateUserParams = {};
    if (data.identityNumber) updateData.identityNumber = data.identityNumber;
    if (data.fullName) updateData.name = data.fullName;
    if (data.gender) updateData.gender = data.gender;
    if (data.birthDate) {
      const birthDate = dayjs(data.birthDate).isValid()
        ? dayjs(data.birthDate).toISOString()
        : undefined;
      if (birthDate) updateData.birthDate = birthDate;
    }
    if (data.ward) updateData.wardId = Number(data.ward);

    if (!userId) {
      setError("root", { message: "Không tìm thấy thông tin người dùng." });
      return;
    }
    if (Object.keys(updateData).length === 0) {
      return;
    }
    await updateUser(userId, updateData);
  };

  const onSubmitPassword = async (data: FormData) => {
    if (!data.password) {
      setError("password", { message: "Vui lòng nhập mật khẩu mới" });
      return;
    }
    clearErrors("root");
    await changePassword({ newPassword: data.password });
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  const handleCancel = () => {
    const provinceId = userData?.data.location?.province?.id?.toString() || "";
    const districtId = userData?.data.location?.district?.id?.toString() || "";
    const wardId = userData?.data.location?.ward?.id?.toString() || "";
    const gender = ["MALE", "FEMALE"].includes(userData?.data?.gender ?? "")
      ? userData?.data?.gender
      : undefined;
    const birthDate = userData?.data.birthDate
      ? new Date(userData.data.birthDate)
      : undefined;

    reset({
      identityNumber: userData?.data.identityNumber || "",
      fullName: userData?.data.name || "",
      gender: gender as "MALE" | "FEMALE" | undefined,
      birthDate,
      province: provinceId,
      district: districtId,
      ward: wardId,
      password: "",
      confirmPassword: "",
    });
    clearErrors();
  };

  const genderOptions = useMemo(
    () => [
      { value: "MALE", label: "Nam" },
      { value: "FEMALE", label: "Nữ" },
    ],
    []
  );

  if (!userId) {
    return (
      <div className="text-center py-4">Đang tải thông tin người dùng...</div>
    );
  }

  if (isUserLoading || isLocationLoading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  if (userError || locationError) {
    return (
      <div className="text-center py-4 text-red-500">
        Lỗi:{" "}
        {userError?.message ||
          locationError?.message ||
          "Không thể tải dữ liệu"}
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Thông tin cá nhân
          </h3>

          {errors.root && (
            <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
          )}

          <form
            onSubmit={handleSubmit(onSubmitUserDetails)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={control}
              name="identityNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số CMND/CCCD/Mã định danh công dân</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      className="mt-1"
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        isUpdateUserPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      className="mt-1"
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        isUpdateUserPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value && dayjs(field.value).isValid()
                          ? dayjs(field.value).format("YYYY-MM-DD")
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined
                        )
                      }
                      className="mt-1"
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        isUpdateUserPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value || undefined)
                      }
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        isUpdateUserPending
                      }
                    >
                      <option value="">Chọn giới tính</option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        !locationOptions.provinces.length ||
                        isUpdateUserPending
                      }
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {locationOptions.provinces.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        !selectedProvince ||
                        !locationOptions.districts.length ||
                        isUpdateUserPending
                      }
                    >
                      <option value="">Chọn quận/huyện</option>
                      {locationOptions.districts.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xã/Phường</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || "")}
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        !selectedDistrict ||
                        !locationOptions.wards.length ||
                        isUpdateUserPending
                      }
                    >
                      <option value="">Chọn xã/phường</option>
                      {locationOptions.wards.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4 mt-6 md:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={
                  isSubmitting ||
                  isUserLoading ||
                  isLocationLoading ||
                  isUpdateUserPending
                }
              >
                HỦY BỎ
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={
                  isSubmitting ||
                  isUserLoading ||
                  isLocationLoading ||
                  isUpdateUserPending
                }
              >
                LƯU
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Mật khẩu</h3>
          <form
            onSubmit={handleSubmit(onSubmitPassword)}
            className="space-y-4 max-w-md"
          >
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value ?? ""}
                      className="mt-1"
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        isChangePasswordPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value ?? ""}
                      className="mt-1"
                      disabled={
                        isSubmitting ||
                        isUserLoading ||
                        isLocationLoading ||
                        isChangePasswordPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={
                  isSubmitting ||
                  isUserLoading ||
                  isLocationLoading ||
                  isChangePasswordPending
                }
              >
                HỦY BỎ
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={
                  isSubmitting ||
                  isUserLoading ||
                  isLocationLoading ||
                  isChangePasswordPending
                }
              >
                LƯU
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default AccountTab;
