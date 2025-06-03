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
import { useRouter } from "next/navigation";

interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter()
  const form = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log("Signing in with", data);
    // TODO: call your auth handler here
  };

  return (
    <div className="flex min-h-screen">
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
            className="w-full  max-w-[376px] space-y-6"
          >
            <h1 className="text-[31px] font-bold">Đăng nhập vào tài khoản</h1>

            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <p>Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký !</p>

            <Button variant="outline" className="w-full" onClick={() => router.push('/account/signup')}>
              Đăng ký tài khoản
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
