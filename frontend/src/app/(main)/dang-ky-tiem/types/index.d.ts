export interface RegistrationFormData {
  priorityGroup: string;
  identityNumber: string;
  profession: string;
  workplace: string;
  currentLocation: string;
  desiredVaccineDate: string;
  desiredVaccineSession: string;
  consent: boolean;
}

export interface VaccinationRegistrationResponse {
  id: number;
  healthInsuranceNumber: string;
  userId: number;
  priorityGroup: string;
  registrationDate: Date;
  status: null;
  currentJob: string;
  currentAddressId: number;
  preferredSession: string;
  vaccinationSiteId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VaccinationRegistrationParams {
  priorityGroup: string;
  healthInsuranceNumber?: string | null;
  currentJob?: string | null;
  currentAddressId?: number | null;
  preferredSession?: string;
  registrationDate?: Date | null;
  vaccinationSiteId?: number | null;
  consent?: boolean;
}
export interface VaccinationRegistrationFormState {
  registrationId?: string;
  priorityGroup: string;
  healthInsuranceNumber?: string | null;
  currentJob?: string | null;
  currentAddressId?: number | null;
  preferredSession?: string;
  registrationDate?: Date | null;
  vaccinationSiteId?: number | null;
  consent?: boolean;
}
