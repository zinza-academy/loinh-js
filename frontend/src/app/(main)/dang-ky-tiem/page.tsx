"use client";
import { useState } from "react";
import ProgressStep from "./components/ProgressStep";
import PersonalInfoStep from "./components/PersonalInfoStep";
import VaccinationConsentFormStep from "./components/VaccinationConsentFormStep";
import FinishStep from "./components/FinishStep";

const RegistInjectPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: "Thông tin cá nhân", active: currentStep === 1 },
    { number: 2, title: "Phiếu đồng ý tiêm", active: currentStep === 2 },
    { number: 3, title: "Hoàn thành", active: currentStep === 3 },
  ];

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
