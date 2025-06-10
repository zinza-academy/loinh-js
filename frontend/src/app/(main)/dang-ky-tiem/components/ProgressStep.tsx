import { getVaccinationRegistrationSteps } from "@/lib/utils";
import { useStep } from "../contexts/StepContext";

function ProgressStep() {
  const { currentStep } = useStep();
  const steps = getVaccinationRegistrationSteps(currentStep);
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[12px] ${
                step.active ? "bg-white" : "bg-gray-400"
              }  `}
            >
              {step.number == currentStep ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                    fill="#1976D2"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span className="text-sm mt-2">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-24 h-0.5 bg-gray-300 mx-4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgressStep;
