import React, { Suspense } from "react";
interface LookupLayoutProps {
  children: React.ReactNode;
}

function LookupLayout({ children }: LookupLayoutProps) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}

export default LookupLayout;
