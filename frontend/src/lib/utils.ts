import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StepNumber } from "./constants/vaccineRegistrationStep";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTitleFromVaccinationRegistrationStep = (step: StepNumber): string => {
  switch (step) {
    case StepNumber.PersonalInfo:
      return "Thông tin cá nhân";
    case StepNumber.ConsentForm:
      return "Phiếu đồng ý tiêm";
    case StepNumber.Finish:
      return "Hoàn thành";
    default:
      return "";
  }
};

export const getVaccinationRegistrationSteps = (currentStep: StepNumber) => [
  {
    number: StepNumber.PersonalInfo,
    title: getTitleFromVaccinationRegistrationStep(StepNumber.PersonalInfo),
    active: currentStep === StepNumber.PersonalInfo,
  },
  {
    number: StepNumber.ConsentForm,
    title: getTitleFromVaccinationRegistrationStep(StepNumber.ConsentForm),
    active: currentStep === StepNumber.ConsentForm,
  },
  {
    number: StepNumber.Finish,
    title: getTitleFromVaccinationRegistrationStep(StepNumber.Finish),
    active: currentStep === StepNumber.Finish,
  },
];