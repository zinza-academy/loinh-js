export interface GetregistVaccinationSuccessResponse {
  id: number;
  healthInsuranceNumber: null | number;
  userId: number;
  priorityGroup: string;
  registrationDate: null | number;
  status: null | number;
  currentJob: null | number;
  currentAddressId: null | number;
  preferredSession: null | string;
  vaccinationSiteId: null | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserParams {
  name?: string;
  identityNumber?: string;
  birthDate?: string;
  gender?: string;
  wardId?: string | number;
}

export interface UpdateUserResponse {
  id: number;
  identityNumber: string;
  gender: string;
  name: string;
  birthDate: null | Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  phone: string | null;
  avatarUrl: string | null;
  wardId: number;
}
