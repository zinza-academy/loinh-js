import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
