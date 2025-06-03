import React, { ReactNode } from "react";

function SingInLayout({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}

export default SingInLayout;
