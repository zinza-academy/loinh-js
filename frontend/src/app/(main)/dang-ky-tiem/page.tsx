"use client";
import { useState } from "react";
import ProgressStep from "./components/ProgressStep";
import PersonalInfoStep from "./components/PersonalInfoStep";
import VaccinationConsentFormStep from "./components/VaccinationConsentFormStep";
import FinishStep from "./components/FinishStep";
import { StepNumber, StepTitle } from "@/lib/constants/vaccineRegistrationStep";

const RegistInjectPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    StepNumber.PersonalInfo,
    StepNumber.ConsentForm,
    StepNumber.Finish,
  ].map((number) => ({
    number,
    title: StepTitle[number],
    active: currentStep === number,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container">
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Tra cứu đăng ký tiêm
          </h1>

          {/* Progress Steps */}
          <ProgressStep currentStep={currentStep} steps={steps} />

          {/* Step 1: Personal Information */}
          {currentStep == 1 && (
            <PersonalInfoStep onChangeStep={setCurrentStep} />
          )}
          {currentStep == 2 && (
            <VaccinationConsentFormStep onChangeStep={setCurrentStep} />
          )}
          {currentStep == 3 && (
            <FinishStep registrationId={"8970230923847230"} />
          )}
        </div>
      </main>
    </div>
  );
};

export default RegistInjectPage;
