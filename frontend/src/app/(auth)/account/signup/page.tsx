"use client";

import React from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues } from "../types";
import { useRegister } from "../hooks/useRegister";
import { useGetLocation } from "@/hooks/useGetLocation";
import { signupSchema } from "../schemas";

export default function SignUpPage() {
  const { register, isLoading } = useRegister();
  const { data: locationData } = useGetLocation();

  const form = useForm<
    SignUpFormValues & { province: string; district: string }
  >({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      identityNumber: "",
      name: "",
      email: "",
      password: "",
      gender: "",
      province: "",
      district: "",
      wardId: 0,
    },
    mode: "onChange",
  });

  const { setValue, control, trigger } = form;
  const [selectedProvince, selectedDistrict] = useWatch({
    control,
    name: ["province", "district"],
  });

  React.useEffect(() => {
    if (selectedProvince) {
      setValue("district", "");
      setValue("wardId", 0);
      trigger(["district", "wardId"]);
    }
  }, [selectedProvince, setValue, trigger]);

  React.useEffect(() => {
    if (selectedDistrict) {
      setValue("wardId", 0);
      trigger("wardId"); // Revalidate wardId
    }
  }, [selectedDistrict, setValue, trigger]);

  const onSubmit = async (
    data: SignUpFormValues & { province: string; district: string }
  ) => {
    try {
      const { identityNumber, name, email, password, gender, wardId } = data;
      await register({ identityNumber, name, email, password, gender, wardId });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  React.useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <div className="container flex min-h-screen">
      <div className="relative flex-1">
        <Image
          src="/image/background-signin-page.png"
          alt="Background Sign Up"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[376px] space-y-6"
          >
            <h1 className="text-[31px] font-bold">Đăng ký tài khoản</h1>

            <div className="flex justify-between items-center mb-4">
              <p></p>
              <Link
                href={"/account/signin"}
                className="text-[#3F51B5] text-sm flex items-center gap-1 font-semibold hover:underline"
              >
                TIẾP TỤC
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00004 0.333252L5.82504 1.50825L10.475 6.16658H0.333374V7.83325H10.475L5.82504 12.4916L7.00004 13.6666L13.6667 6.99992L7.00004 0.333252Z"
                    fill="#3F51B5"
                  />
                </svg>
              </Link>
            </div>

            <FormField
              control={form.control}
              name="identityNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số CCCD/CMND <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mật khẩu <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Họ và tên <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Giới tính <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                      <option value="OTHER">Khác</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tỉnh/Thành phố <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      {locationData?.data?.map(
                        (province: { id: number; name: string }) => (
                          <option
                            key={province.id}
                            value={province.id.toString()}
                          >
                            {province.name}
                          </option>
                        )
                      )}
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quận/Huyện <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                      disabled={!selectedProvince}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {selectedProvince &&
                        locationData?.data
                          ?.find(
                            (province: { id: number }) =>
                              province.id === Number(selectedProvince)
                          )
                          ?.districts.map(
                            (district: { id: number; name: string }) => (
                              <option
                                key={district.id}
                                value={district.id.toString()}
                              >
                                {district.name}
                              </option>
                            )
                          )}
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Xã/Phường <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                      disabled={!selectedDistrict}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || 0}
                    >
                      <option value={0}>Chọn xã/phường</option>
                      {selectedProvince &&
                        selectedDistrict &&
                        locationData?.data
                          ?.find(
                            (province: { id: number }) =>
                              province.id === Number(selectedProvince)
                          )
                          ?.districts.find(
                            (district: { id: number }) =>
                              district.id === Number(selectedDistrict)
                          )
                          ?.wards.map((ward: { id: number; name: string }) => (
                            <option key={ward.id} value={ward.id}>
                              {ward.name}
                            </option>
                          ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
