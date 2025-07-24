"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CertificateTab from "./components/CertificateTab";
import ResultsTab from "./components/ResultsTab";
import AccountTab from "./components/AccountTab";
import { Suspense } from "react";

const LookupContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "certificate";

  const handleTabChange = (newTab: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", newTab);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="bg-white rounded-lg shadow-sm"
        >
          <TabsList className="grid w-full grid-cols-3 border-b border-gray-300 rounded-none h-16 p-0 bg-white">
            <TabsTrigger
              value="certificate"
              className="
              rounded-none
              data-[state=active]:shadow-none
              border-x-0
              border-t-0
              border-b-2 border-transparent 
              pb-4 
              data-[state=active]:border-blue-600 
              data-[state=active]:bg-white 
              data-[state=active]:font-semibold
            "
            >
              Chứng nhận tiêm chủng
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="
              rounded-none
              data-[state=active]:shadow-none
              border-x-0
              border-t-0
              border-b-2 border-transparent 
              pb-4 
              data-[state=active]:border-blue-600
              data-[state=active]:bg-white 
              data-[state=active]:font-semibold
            "
            >
              Kết quả đăng ký
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="
              rounded-none
              data-[state=active]:shadow-none
              border-x-0
              border-t-0
              border-b-2 border-transparent 
              pb-4 
              data-[state=active]:border-blue-600 
              data-[state=active]:bg-white 
              data-[state=active]:font-semibold
            "
            >
              Tài khoản
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificate" className="p-6">
            <CertificateTab />
          </TabsContent>
          <TabsContent value="results" className="p-6">
            <ResultsTab />
          </TabsContent>
          <TabsContent value="account" className="p-6">
            <AccountTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Loading component
const LookupLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang tải...</p>
      </div>
    </div>
  );
};

// Main page component
const LookupPage = () => {
  return (
    <Suspense fallback={<LookupLoading />}>
      <LookupContent />
    </Suspense>
  );
};

export default LookupPage;
