"use client";
import ProgressStep from "./components/ProgressStep";
import PersonalInfoStep from "./components/PersonalInfoStep";
import VaccinationConsentFormStep from "./components/VaccinationConsentFormStep";
import FinishStep from "./components/FinishStep";
import { StepNumber } from "@/lib/constants/vaccineRegistrationStep";
import { useStep } from "./contexts/StepContext";

const RegistInjectPage = () => {
  const { currentStep } = useStep();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container">
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Tra cứu đăng ký tiêm
          </h1>

          {/* Progress Steps */}
          <ProgressStep />

          {/* Step 1: Personal Information */}
          {currentStep == StepNumber.PersonalInfo && <PersonalInfoStep />}
          {currentStep == StepNumber.ConsentForm && (
            <VaccinationConsentFormStep />
          )}
          {currentStep == StepNumber.Finish && (
            <FinishStep registrationId={"8970230923847230"} />
          )}
        </div>
      </main>
    </div>
  );
};

export default RegistInjectPage;
