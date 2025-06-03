"use client";

import React from "react";
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

interface SignUpFormValues {
  cccd: string;
  fullName: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  province: string;
  ward: string;
}

export default function SignUpPage() {
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      cccd: "",
      fullName: "",
      email: "",
      password: "",
      dob: "",
      gender: "",
      province: "",
      ward: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Đăng ký với dữ liệu:", data);
    // TODO: gọi API đăng ký ở đây
  };

  return (
    <div className="container flex ">
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
              rules={{ required: "Số CCCD/CMND là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số CCCD/CMND <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Mật khẩu là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mật khẩu <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: "Họ và tên là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Họ và tên <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              rules={{ required: "Ngày sinh là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ngày sinh <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              rules={{ required: "Giới tính là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Giới tính <p className="text-red-500">(*)</p>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              rules={{ required: "Tỉnh/Thành phố là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tỉnh/Thành phố <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      <option value="ha-noi">Hà Nội</option>
                      <option value="ho-chi-minh">Hồ Chí Minh</option>
                      <option value="da-nang">Đà Nẵng</option>
                      {/* thêm các tỉnh khác */}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              rules={{ required: "Xã/Phường là bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Xã/Phường <p className="text-red-500">(*)</p>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Chọn xã/phường</option>
                      <option value="phuong-1">Phường 1</option>
                      <option value="phuong-2">Phường 2</option>
                      {/* thêm các xã/phường */}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
