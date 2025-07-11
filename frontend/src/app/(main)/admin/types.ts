export interface CreateInjectionPointParams {
  addressDetail: string;
  name: string;
  headOfVaccination: string;
  numberOfInjectionTable: string;
  wardId: number;
}

export interface CreateInjectionPointResponse {
  addressDetail: string;
  name: string;
  headOfVaccination: string;
  numberOfInjectionTable: string;
  wardId: number;
}

export interface UpdateInjectionPointParams {
  addressDetail: string;
  name: string;
  headOfVaccination: string;
  numberOfInjectionTable: string;
  wardId: number;
}

export interface UpdateInjectionPointResponse {
  addressDetail: string;
  name: string;
  headOfVaccination: string;
  numberOfInjectionTable: string;
  wardId: number;
}

export interface UpdateInjectionRegistrationParams {
  // name: string;
  // identityNumber: string;
  // createdAt: string;
  vaccineType: VaccineType;
  status: VaccineStatus;
}

export interface UpdateInjectionRegistrationResponse {
  id: number;
  healthInsuranceNumber: string;
  userId: number;
  priorityGroup: string;
  registrationDate: Date;
  status: string;
  vaccineType: string;
  currentJob: string;
  currentAddressId: number;
  preferredSession: string;
  vaccinationSiteId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInjectionRegistrationParams {
  
}

export interface CreateInjectionRegistrationResponse {
  id: number;
  healthInsuranceNumber: string;
  userId: number;
  priorityGroup: string;
  registrationDate: Date;
  status: string;
  vaccineType: string;
  currentJob: string;
  currentAddressId: number;
  preferredSession: string;
  vaccinationSiteId: number;
  createdAt: Date;
  updatedAt: Date;
}
export enum VaccineType {
  ASTRAZENECA = "ASTRAZENECA",
  PFIZER = "PFIZER",
  MODERNA = "MODERNA",
}

export enum VaccineStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}
