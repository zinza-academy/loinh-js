"use client";
import React, { createContext, useContext, useState } from "react";
import { StepNumber } from "@/lib/constants/vaccineRegistrationStep";

type StepContextType = {
  currentStep: StepNumber;
  setCurrentStep: React.Dispatch<React.SetStateAction<StepNumber>>;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<StepNumber>(
    StepNumber.PersonalInfo
  );
  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error("useStep must be used within StepProvider");
  return ctx;
}