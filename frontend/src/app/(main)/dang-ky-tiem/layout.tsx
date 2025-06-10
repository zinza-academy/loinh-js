import React from "react";
import { StepProvider } from "./contexts/StepContext";

interface RegistInjectLayoutProps {
  children: React.ReactNode;
}
function RegistInjectLayout({ children }: RegistInjectLayoutProps) {
  return (
    <>
      <StepProvider>{children}</StepProvider>
    </>
  );
}

export default RegistInjectLayout;
