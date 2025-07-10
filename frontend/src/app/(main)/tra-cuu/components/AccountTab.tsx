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

// Define Zod schema for form validation
const formSchema = z
  .object({
    identityNumber: z.string().optional(),
    fullName: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    birthDate: z.date().optional(), // Made optional to avoid validation issues
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

  // Fetch user and location data
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

  // Initialize form with react-hook-form
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
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  // Sync form with fetched user data
  useEffect(() => {
    if (!userData?.data) {
      console.log("userData not available:", userData);
      return;
    }

    console.log("Raw userData:", userData.data);
    console.log("Raw locationData:", locationData?.data);

    // Extract values from userData
    const provinceId = userData.data.location?.province?.id?.toString() || "";
    const districtId = userData.data.location?.district?.id?.toString() || "";
    const wardId = userData.data.location?.ward?.id?.toString() || "";
    const gender = ["MALE", "FEMALE"].includes(userData.data.gender)
      ? userData.data.gender
      : undefined;
    const birthDate = userData.data.birthDate
      ? new Date(userData.data.birthDate)
      : undefined;

    console.log("Extracted values:", {
      identityNumber: userData.data.identityNumber,
      fullName: userData.data.name,
      gender,
      birthDate,
      provinceId,
      districtId,
      wardId,
    });

    // Set form values
    setValue("identityNumber", userData.data.identityNumber || "");
    setValue("fullName", userData.data.name || "");
    setValue("gender", gender as "MALE" | "FEMALE" | undefined);
    setValue("birthDate", birthDate);
    setValue("province", provinceId);
    setValue("district", districtId);
    setValue("ward", wardId);
    setValue("password", "");
    setValue("confirmPassword", "");

    // Log form state immediately after setting values
    console.log("Form values after setValue:", getValues());

    // Log validation results for debugging
    if (locationData?.data) {
      const isProvinceValid = provinceId
        ? locationData.data.some(
            (p: { id: number }) => p.id.toString() === provinceId
          )
        : false;
      const isDistrictValid =
        districtId && isProvinceValid
          ? locationData.data
              .find((p: { id: number }) => p.id.toString() === provinceId)
              ?.districts.some(
                (d: { id: number }) => d.id.toString() === districtId
              )
          : false;
      const isWardValid =
        wardId && isDistrictValid
          ? locationData.data
              .find((p: { id: number }) => p.id.toString() === provinceId)
              ?.districts.find(
                (d: { id: number }) => d.id.toString() === districtId
              )
              ?.wards.some((w: { id: number }) => w.id.toString() === wardId)
          : false;
      console.log("Validation results:", {
        isProvinceValid,
        isDistrictValid,
        isWardValid,
      });
    }
  }, [userData?.data, locationData?.data, setValue, getValues]);

  // Watch province and district
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

  // Reset district and ward when province changes
  useEffect(() => {
    if (!selectedProvince) return;
    setValue("district", "");
    setValue("ward", "");
    console.log("Province changed, reset district and ward:", getValues());
  }, [selectedProvince, setValue, getValues]);

  // Reset ward when district changes
  useEffect(() => {
    if (!selectedDistrict) return;
    setValue("ward", "");
    console.log("District changed, reset ward:", getValues());
  }, [selectedDistrict, setValue, getValues]);

  // Memoize dynamic location options
  const locationOptions = useMemo(() => {
    if (!locationData?.data) return { provinces: [], districts: [], wards: [] };

    const provinces = locationData.data.map(
      (province: { id: number; name: string }) => ({
        value: province.id.toString(),
        label: province.name,
      })
    );

    const districts =
      (selectedProvince &&
        locationData.data
          .find(
            (province: { id: number }) =>
              province.id.toString() === selectedProvince
          )
          ?.districts.map((district: { id: number; name: string }) => ({
            value: district.id.toString(),
            label: district.name,
          }))) ||
      [];

    const wards =
      (selectedProvince &&
        selectedDistrict &&
        locationData.data
          .find(
            (province: { id: number }) =>
              province.id.toString() === selectedProvince
          )
          ?.districts.find(
            (district: { id: number }) =>
              district.id.toString() === selectedDistrict
          )
          ?.wards.map((ward: { id: number; name: string }) => ({
            value: ward.id.toString(),
            label: ward.name,
          }))) ||
      [];

    console.log("locationOptions:", { provinces, districts, wards });
    return { provinces, districts, wards };
  }, [locationData?.data, selectedProvince, selectedDistrict]);

  // Handle form submission for user details
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
      console.log("No changes to submit");
      return;
    }
    await updateUser(userId, updateData);
    console.log("User details updated:", updateData);
  };

  // Handle form submission for password
  const onSubmitPassword = async (data: FormData) => {
    if (!data.password) {
      setError("password", { message: "Vui lòng nhập mật khẩu mới" });
      return;
    }
    clearErrors("root");
    await changePassword({ newPassword: data.password });
    console.log("Password updated successfully");
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  // Handle cancel
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

    setValue("identityNumber", userData?.data.identityNumber || "");
    setValue("fullName", userData?.data.name || "");
    setValue("gender", gender as "MALE" | "FEMALE" | undefined);
    setValue("birthDate", birthDate);
    setValue("province", provinceId);
    setValue("district", districtId);
    setValue("ward", wardId);
    setValue("password", "");
    setValue("confirmPassword", "");

    console.log("Form values after cancel:", getValues());
    clearErrors();
  };

  // Memoize gender options
  const genderOptions = useMemo(
    () => [
      { value: "MALE", label: "Nam" },
      { value: "FEMALE", label: "Nữ" },
    ],
    []
  );

  // Loading and error states
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
              render={() => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        userData?.data.birthDate &&
                        dayjs(userData.data.birthDate).isValid()
                          ? dayjs(userData.data.birthDate).format("DD/MM/YYYY")
                          : ""
                      }
                      className="mt-1"
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
                      onChange={(e) => {
                        field.onChange(e.target.value || "");
                        setValue("district", "");
                        setValue("ward", "");
                      }}
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
                      onChange={(e) => {
                        field.onChange(e.target.value || "");
                        setValue("ward", "");
                      }}
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
