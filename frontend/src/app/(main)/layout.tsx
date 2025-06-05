import React from "react";
import Header from "@/components/common/Header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;
