"use client";

import React from "react";
import NavigationTabs from "./components/NavigationTabs";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}
function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  if (!user || user.role !== "ADMIN") {
    setTimeout(() => {
      router.push("/");
    }, 1000);
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          You do not have permission to access this page.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <NavigationTabs />
      {children}
    </div>
  );
}

export default AdminLayout;
