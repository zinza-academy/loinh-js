"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2 } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import Link from "next/link";
import { useEffect } from "react";
import { signinSchema } from "../schemas";

interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const { login, isLoading, error, isError } = useLogin();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    console.log("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <div className="flex min-h-screen relative">
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
                      aria-invalid={!!fieldState.error}
                      aria-describedby={
                        fieldState.error ? `${field.name}-error` : undefined
                      }
                    />
                  </FormControl>
                  <FormMessage
                    id={`${field.name}-error`}
                    className="text-red-500 text-sm"
                  />
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
                      aria-invalid={!!fieldState.error}
                      aria-describedby={
                        fieldState.error ? `${field.name}-error` : undefined
                      }
                    />
                  </FormControl>
                  <FormMessage
                    id={`${field.name}-error`}
                    className="text-red-500 text-sm"
                  />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Link
                className="p-0 h-auto text-sm text-blue-600"
                href={"/account/forgot-password"}
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || !form.formState.isValid}
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

            {isError && (
              <p className="text-red-500 text-sm text-center">
                {typeof error === "string" && error
                  ? error
                  : "Đã có lỗi xảy ra"}
              </p>
            )}

            <p className="text-center text-gray-600">
              Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký!
            </p>

            <Link
              href={"/account/signup"}
              className="w-full text-[#66BB6A] hover:bg-blue-50 border border-[#66BB6A] flex justify-center items-center py-2 rounded-sm"
            >
              Đăng ký tài khoản
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
