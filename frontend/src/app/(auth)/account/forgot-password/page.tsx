"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const form = useForm<ForgotPasswordForm>({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Email>>", data.email);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen container">
      <div className="relative flex-1">
        <Image
          src="/image/background-signin-page.png"
          alt="Background Sign In"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-600 text-[16px]">
              Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để
              đăng ký <span className="text-red-500">(*)</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...form.register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="flex items-center space-x-2 h-9 rounded-[8px] rounded-br-none bg-white text-[#303F9F] hover:text-[#303F9F] hover:bg-gray-200 border-[#303F9F] "
                >
                  <Link href="/">QUAY LẠI</Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-[#303F9F] hover:bg-[#303F9F]/90 px-8 h-9 rounded-[8px] rounded-bl-none"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? "Đang gửi..." : "GỬI"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
