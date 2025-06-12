"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { administrativeData } from "@/lib/constants/administrativeData";

interface SignUpFormValues {
  cccd: string;
  fullName: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  province: string;
  district: string;
  ward: string;
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    cccd: z
      .string()
      .min(1, "Số CCCD/CMND là bắt buộc")
      .regex(/^\d{9}$|^\d{12}$/, "Số CCCD/CMND phải có 9 hoặc 12 số"),
    fullName: z.string().min(1, "Họ và tên là bắt buộc"),
    email: z
      .string()
      .min(1, "Email là bắt buộc")
      .email("Vui lòng nhập email hợp lệ"),
    password: z
      .string()
      .min(1, "Mật khẩu là bắt buộc")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/^\S*$/, "Mật khẩu không được chứa khoảng trắng"),
    dob: z
      .string()
      .min(1, "Ngày sinh là bắt buộc")
      .refine(
        (value) => {
          const today = new Date();
          const dob = new Date(value);
          return dob < today;
        },
        { message: "Ngày sinh không được là tương lai" }
      ),
    gender: z.string().min(1, "Giới tính là bắt buộc"),
    province: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
    district: z.string().min(1, "Quận/Huyện là bắt buộc"),
    ward: z.string().min(1, "Xã/Phường là bắt buộc"),
  });
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cccd: "",
      fullName: "",
      email: "",
      password: "",
      dob: "",
      gender: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  const { watch, setValue } = form;
  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

  // Reset district and ward when province changes
  React.useEffect(() => {
    if (selectedProvince) {
      setValue("district", "");
      setValue("ward", "");
    }
  }, [selectedProvince, setValue]);

  // Reset ward when district changes
  React.useEffect(() => {
    if (selectedDistrict) {
      setValue("ward", "");
    }
  }, [selectedDistrict, setValue]);

  const onSubmit = (data: SignUpFormValues) => {
    setIsLoading(true);
    console.log("Đăng ký với dữ liệu:", data);
    setTimeout(() => {
      setIsLoading(false);
      alert("Đăng ký thành công!");
    }, 1000);
  };

  return (
    <div className="container flex">
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
            className="w-full max-w-[376px] space-y-6 mt-50"
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
              name="cccd"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Số CCCD/CMND <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage className="text-red-500 text-sm">
                      {fieldState.error?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Email <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Mật khẩu <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Họ và tên <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Ngày sinh <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              rules={{ required: "Giới tính là bắt buộc" }}
              render={({ field, fieldState }) => (
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
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field, fieldState }) => (
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
                      {Object.entries(administrativeData).map(
                        ([id, { name }]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        )
                      )}
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field, fieldState }) => (
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
                        Object.entries(
                          administrativeData[selectedProvince]?.districts || {}
                        ).map(([id, { name }]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Xã/Phường <p className="text-red-500 inline">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                      disabled={!selectedDistrict}
                    >
                      <option value="">Chọn xã/phường</option>
                      {selectedProvince &&
                        selectedDistrict &&
                        administrativeData[selectedProvince]?.districts[
                          selectedDistrict
                        ]?.wards.map((ward) => {
                          const [wardId, wardName] = Object.entries(ward)[0];
                          return (
                            <option key={wardId} value={wardId}>
                              {wardName}
                            </option>
                          );
                        })}
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>{" "}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading || !form.formState.isValid || !form.formState.isDirty
              }
            >
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
