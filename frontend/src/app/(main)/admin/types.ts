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
  name: string;
  identityNumber: string;
  createdAt: string;
  vaccineType: VaccineType;
  status: VaccineStatus;
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

// User Management Types
export interface CreateUserParams {
  name: string;
  identityNumber: string;
  gender: string;
  wardId: number;
  birthDate?: string;
  phone?: string;
  email: string;
  password: string;
  role: string;
}

export interface CreateUserResponse {
  id: number;
  name: string;
  identityNumber: string;
  gender: string;
  wardId: number;
  birthDate: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserParams {
  name?: string;
  identityNumber?: string;
  gender?: string;
  wardId?: number;
  birthDate?: string;
  phone?: string;
  role?: string;
  password?: string;
}

export interface UpdateUserResponse {
  id: number;
  name: string;
  identityNumber: string;
  gender: string;
  wardId: number;
  birthDate: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface User {
  id: number;
  identityNumber: string;
  gender: string;
  name: string;
  birthDate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  avatarUrl: string | null;
  wardId: number;
  location: {
    ward: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    province: {
      id: number;
      name: string;
    };
  };
  identity: {
    email: string;
    role: string;
  };
}
