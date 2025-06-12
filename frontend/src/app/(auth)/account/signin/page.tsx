"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { onLogin } from "@/services/auth/api";

// Form schema validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Vui lòng nhập email hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/^\S*$/, "Mật khẩu không được chứa khoảng trắng"),
});

interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await onLogin(data.email, data.password);

      if (response.token) {
        localStorage.setItem("token", response.token);
        // Redirect to user page
        router.push("/user");
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message || "Đã có lỗi xảy ra");
      } else {
        setServerError("Đã có lỗi xảy ra");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <div className="relative flex-1">
        <Image
          src="/image/background-signin-page.png"
          alt="Background Sign In"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[376px] space-y-6"
          >
            <h1 className="text-[31px] font-bold">Đăng nhập vào tài khoản</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      disabled={isLoading}
                    />
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-blue-600"
                onClick={() => router.push("/account/forgot-password")}
                disabled={isLoading}
              >
                Quên mật khẩu?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                isLoading || !form.formState.isValid || !form.formState.isDirty
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}

            <p className="text-center text-gray-600">
              Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký!
            </p>

            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => router.push("/account/signup")}
              disabled={isLoading}
            >
              Đăng ký tài khoản
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
