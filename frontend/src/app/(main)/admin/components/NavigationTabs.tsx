"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

function NavigationTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Điểm tiêm", path: "/admin/injection-points" },
    { name: "Đăng ký", path: "/admin/vaccine-registration" },
    { name: "Tài liệu", path: "/admin/documents" },
    { name: "User", path: "/admin/users" },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                pathname === tab.path
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600"
              }`}
              onClick={() => router.push(tab.path)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavigationTabs;
