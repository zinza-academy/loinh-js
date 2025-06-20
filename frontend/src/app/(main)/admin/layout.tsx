import React from "react";
import NavigationTabs from "./components/NavigationTabs";

interface AdminLayoutProps {
  children: React.ReactNode;
}
function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <NavigationTabs />
      {children}
    </div>
  );
}

export default AdminLayout;
